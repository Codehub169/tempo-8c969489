import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Email format validation (simple)
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Create a transporter object using SMTP transport
    // User must set these environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587', 10),
      secure: process.env.EMAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER, // generated ethereal user
        pass: process.env.EMAIL_SERVER_PASS, // generated ethereal password
      },
      tls: {
        // do not fail on invalid certs if running locally or with self-signed certs
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });

    // Email data
    const mailData = {
      from: `"${name}" <${process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_SERVER_USER}>`, // sender address (use a generic from if needed)
      to: process.env.EMAIL_TO, // list of receivers
      replyTo: email,
      subject: `New Contact Form Submission from ${name} - hueneu Website`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
               <h2 style="color: #A3B18A;">New Contact Form Submission</h2>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
               <p><strong>Message:</strong></p>
               <p style="white-space: pre-wrap;">${message}</p>
               <hr style="border: none; border-top: 1px solid #DAD7CD; margin: 20px 0;">
               <p style="font-size: 0.9em; color: #3A3B3C;">This message was sent from the hueneu website contact form.</p>
             </div>`,
    };

    try {
      await transporter.sendMail(mailData);
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      // Check for specific error types if needed, e.g., authentication failure
      if (error.code === 'EAUTH') {
        return res.status(500).json({ error: 'Email server authentication failed. Check server credentials.' });
      }
      return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
