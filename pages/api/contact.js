import nodemailer from 'nodemailer';

// Helper function to sanitize input for HTML contexts
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;', // or &apos;
    '/': '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return input.replace(reg, (match) => (map[match]));
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Basic validation for presence
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Trim inputs
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Validate that trimmed inputs are not empty
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({ error: 'All fields are required and cannot be empty after trimming.' });
    }
    
    // Length validation
    const MAX_NAME_LENGTH = 100;
    const MAX_EMAIL_LENGTH = 254; // Standard max email length
    const MAX_MESSAGE_LENGTH = 5000;

    if (trimmedName.length > MAX_NAME_LENGTH) {
      return res.status(400).json({ error: `Name cannot exceed ${MAX_NAME_LENGTH} characters.` });
    }
    if (trimmedEmail.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({ error: `Email cannot exceed ${MAX_EMAIL_LENGTH} characters.` });
    }
    if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.` });
    }

    // Email format validation (updated TLD length)
    if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Invalid email format.' });
    }

    // Sanitize inputs for HTML content (text content for email body and subject will use raw trimmed values)
    const saneNameForHTML = sanitizeInput(trimmedName);
    const saneMessageForHTML = sanitizeInput(trimmedMessage);
    const saneEmailForHTMLDisplay = sanitizeInput(trimmedEmail);

    // Check for required environment variables and validate them
    const requiredEnvVars = [
      'EMAIL_SERVER_HOST',
      'EMAIL_SERVER_USER', // Also used as fallback for FROM address
      'EMAIL_SERVER_PASS',
      'EMAIL_TO',
    ];
    const configIssues = [];
    requiredEnvVars.forEach(v => {
      if (!process.env[v]) {
        configIssues.push(`${v} is missing`);
      }
    });

    let emailServerPort = 587; // Default port
    if (process.env.EMAIL_SERVER_PORT) {
        const parsedPort = parseInt(process.env.EMAIL_SERVER_PORT, 10);
        if (isNaN(parsedPort) || parsedPort <= 0 || parsedPort > 65535) {
            configIssues.push(`EMAIL_SERVER_PORT (invalid value: ${process.env.EMAIL_SERVER_PORT}, must be a number 1-65535)`);
        } else {
            emailServerPort = parsedPort;
        }
    }

    const secureEnv = process.env.EMAIL_SERVER_SECURE;
    if (secureEnv !== undefined && secureEnv !== 'true' && secureEnv !== 'false') {
        configIssues.push(`EMAIL_SERVER_SECURE (invalid value: ${secureEnv}, must be 'true' or 'false')`);
    }

    if (configIssues.length > 0) {
      console.error(`Critical email configuration errors: ${configIssues.join('; ')}`);
      return res.status(500).json({ error: 'Email server configuration is incomplete or invalid. Please contact the administrator.' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: emailServerPort,
      secure: process.env.EMAIL_SERVER_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });

    const mailData = {
      from: {
        name: trimmedName, // Nodemailer handles special characters in names for headers
        address: process.env.EMAIL_FROM_ADDRESS || process.env.EMAIL_SERVER_USER,
      },
      to: process.env.EMAIL_TO,
      replyTo: trimmedEmail, // Raw email address
      subject: `New Contact Form Submission from ${trimmedName} - hueneu Website`, // Raw name for subject
      text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nMessage: ${trimmedMessage}`, // Raw inputs for text part
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
               <h2 style="color: #A3B18A;">New Contact Form Submission</h2>
               <p><strong>Name:</strong> ${saneNameForHTML}</p>
               <p><strong>Email:</strong> <a href="mailto:${trimmedEmail}">${saneEmailForHTMLDisplay}</a></p>
               <p><strong>Message:</strong></p>
               <p style="white-space: pre-wrap;">${saneMessageForHTML}</p>
               <hr style="border: none; border-top: 1px solid #DAD7CD; margin: 20px 0;">
               <p style="font-size: 0.9em; color: #3A3B3C;">This message was sent from the hueneu website contact form.</p>
             </div>`,
    };

    try {
      await transporter.sendMail(mailData);
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      let errorMessage = 'Failed to send message. Please try again later.';
      if (error.code === 'EAUTH') {
        errorMessage = 'Email server authentication failed. Check server credentials.';
      } else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND' || error.code === 'ETIMEDOUT') {
        errorMessage = 'Could not connect to email server. Please contact the administrator.';
      }
      return res.status(500).json({ error: errorMessage });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
