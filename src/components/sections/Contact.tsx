'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Section, { SectionHeader } from '@/components/Section';
import contentConfig from '@/config/contentConfig';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual implementation)
    // For now, this opens the default email client
    const subject = `Portfolio Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:${contentConfig.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    }, 1000);
  };

  return (
    <Section id="contact" background="elevated">
      <div className="section-container">
        <SectionHeader
          title={contentConfig.contact.title}
          subtitle={contentConfig.contact.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="glass rounded-xl p-8 space-y-6"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-text-primary mb-2"
                >
                  {contentConfig.contact.formFields.name.label}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder={contentConfig.contact.formFields.name.placeholder}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-text-primary mb-2"
                >
                  {contentConfig.contact.formFields.email.label}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder={contentConfig.contact.formFields.email.placeholder}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-text-primary mb-2"
                >
                  {contentConfig.contact.formFields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder={contentConfig.contact.formFields.message.placeholder}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
                  isSubmitting
                    ? 'bg-text-tertiary cursor-not-allowed'
                    : submitStatus === 'success'
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting
                  ? 'Sending...'
                  : submitStatus === 'success'
                  ? 'Message Sent!'
                  : 'Send Message'}
              </motion.button>

              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </motion.form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Direct Contact
              </h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${contentConfig.personal.email}`}
                  className="flex items-start group"
                >
                  <svg
                    className="w-5 h-5 text-accent-cyan mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-text-tertiary text-xs mb-1">Email</p>
                    <p className="text-text-primary group-hover:text-accent-cyan transition-colors text-sm">
                      {contentConfig.personal.email}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${contentConfig.personal.phone}`}
                  className="flex items-start group"
                >
                  <svg
                    className="w-5 h-5 text-accent-cyan mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-text-tertiary text-xs mb-1">Phone</p>
                    <p className="text-text-primary group-hover:text-accent-cyan transition-colors text-sm">
                      {contentConfig.personal.phone}
                    </p>
                  </div>
                </a>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 text-accent-cyan mr-3 mt-0.5 flex-shrink-0"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-text-tertiary text-xs mb-1">Location</p>
                    <p className="text-text-primary text-sm">
                      {contentConfig.personal.location}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Connect Online
              </h3>
              <div className="space-y-3">
                <a
                  href={contentConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 hover:border-accent-cyan/30 border border-white/10 transition-all group"
                >
                  <svg
                    className="w-5 h-5 text-text-secondary group-hover:text-accent-cyan mr-3 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-text-primary group-hover:text-accent-cyan text-sm font-medium transition-colors">
                    LinkedIn
                  </span>
                </a>

                <a
                  href={contentConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 hover:border-accent-cyan/30 border border-white/10 transition-all group"
                >
                  <svg
                    className="w-5 h-5 text-text-secondary group-hover:text-accent-cyan mr-3 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-text-primary group-hover:text-accent-cyan text-sm font-medium transition-colors">
                    GitHub
                  </span>
                </a>

                <a
                  href={contentConfig.social.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-white/5 hover:bg-white/10 hover:border-accent-cyan/30 border border-white/10 transition-all group"
                >
                  <svg
                    className="w-5 h-5 text-text-secondary group-hover:text-accent-cyan mr-3 transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                  <span className="text-text-primary group-hover:text-accent-cyan text-sm font-medium transition-colors">
                    Medium
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Response Time Note */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass rounded-xl p-6"
            >
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-accent-teal mr-3 mt-0.5 flex-shrink-0"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-text-secondary text-sm leading-relaxed">
                  I typically respond within 24 hours. For urgent opportunities, feel free to call me directly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
