import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Instagram, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';

// ContactSection: Provides a contact form styled as a personal note/letter.
// Includes social media links and an optional link to a services deck.
// Handles form submission and displays success/error messages.
const ContactSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ submitting: false, success: null, error: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, success: null, error: null });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus({ submitting: false, success: 'Your story is on its way!', error: null });
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        const errorData = await response.json();
        setFormStatus({ submitting: false, success: null, error: errorData.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
      setFormStatus({ submitting: false, success: null, error: 'Network error. Please check your connection.' });
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const inputStyles = "w-full bg-lightNeutral/50 border-2 border-primary/30 rounded-md p-3 focus:border-accent focus:ring-accent focus:ring-1 transition-colors duration-200 placeholder-text/50 text-text resize-none";
  const labelStyles = "block text-sm font-medium text-primary mb-1";

  return (
    <section id="contact" ref={ref} className="py-20 md:py-32 bg-background text-text">
      <motion.div 
        className="container mx-auto px-6 md:px-8 max-w-2xl"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <h2 className="text-4xl md:text-5xl font-display font-semibold text-primary text-center mb-6">Let’s Work Together</h2>
        <p className="text-lg md:text-xl text-center text-text/80 mb-12 md:mb-16">Have a story to tell or a vision to bring to life? Send a note. We're all ears (and eyes!).</p>

        <form onSubmit={handleSubmit} className="bg-lightNeutral p-8 md:p-12 rounded-lg shadow-strong space-y-6 relative transform perspective-1000 rotate-x-0 md:hover:rotate-x-[2deg] transition-transform duration-500 ease-out" style={{ transformStyle: 'preserve-3d' }}>
          <div>
            <label htmlFor="name" className={labelStyles}>Your Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className={inputStyles} placeholder="What should we call you?" />
          </div>
          <div>
            <label htmlFor="email" className={labelStyles}>Your Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={inputStyles} placeholder="Where can we reach you?" />
          </div>
          <div>
            <label htmlFor="message" className={labelStyles}>Your Story / Idea</label>
            <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows="6" required className={inputStyles} placeholder="Tell us about your project, your dreams, or just say hello..."></textarea>
          </div>
          
          {formStatus.success && (
            <div className="flex items-center text-success bg-success/10 p-3 rounded-md">
              <CheckCircle2 className="w-5 h-5 mr-2" /> {formStatus.success}
            </div>
          )}
          {formStatus.error && (
            <div className="flex items-center text-error bg-error/10 p-3 rounded-md">
              <AlertTriangle className="w-5 h-5 mr-2" /> {formStatus.error}
            </div>
          )}

          <div className="text-center pt-4">
            <motion.button 
              type="submit" 
              disabled={formStatus.submitting}
              className="bg-accent text-white font-medium py-3 px-8 rounded-md text-lg hover:bg-opacity-90 transition-all duration-200 ease-out focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-lightNeutral disabled:opacity-70 flex items-center justify-center mx-auto group shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {formStatus.submitting ? 'Sending...' : 'Let’s design your story'}
              <Send className="w-5 h-5 ml-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </motion.button>
          </div>
        </form>

        <div className="mt-16 text-center">
          <p className="text-text/70 mb-4">Connect with us or explore more:</p>
          <div className="flex justify-center items-center space-x-6">
            <a href="https://instagram.com/hueneu_" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition-colors duration-200 flex items-center group">
              <Instagram className="w-7 h-7 mr-2" /> 
              <span className='font-medium group-hover:underline'>@hueneu_</span>
            </a>
            {/* Optional: Link to a services deck */}
            <a href="/placeholder-services-deck.pdf" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition-colors duration-200 flex items-center group">
              <FileText className="w-7 h-7 mr-2" /> 
              <span className='font-medium group-hover:underline'>Our Services Deck</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
