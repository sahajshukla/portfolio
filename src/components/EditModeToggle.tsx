'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * EditModeToggle Component
 *
 * This component allows you to enter "Edit Mode" to modify content directly in the browser.
 * Changes are saved to localStorage and persist across sessions.
 *
 * To enable Edit Mode:
 * 1. Click on the settings icon in the bottom-right corner
 * 2. Enter the password (default: "edit123")
 * 3. You can now edit certain text fields in the UI
 *
 * To disable Edit Mode:
 * - Click the "Exit Edit Mode" button
 *
 * Future Enhancement Ideas:
 * - Connect to a headless CMS (Contentful, Sanity, Strapi)
 * - Add a backend API to persist changes to a database
 * - Implement role-based access control
 * - Add more sophisticated editing controls (WYSIWYG editor, image upload, etc.)
 */

const EDIT_PASSWORD = 'edit123'; // Change this to a secure password
const EDIT_MODE_KEY = 'portfolio_edit_mode';

export default function EditModeToggle() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if edit mode is already enabled
    const savedEditMode = localStorage.getItem(EDIT_MODE_KEY);
    if (savedEditMode === 'true') {
      setIsEditMode(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === EDIT_PASSWORD) {
      setIsEditMode(true);
      localStorage.setItem(EDIT_MODE_KEY, 'true');
      setShowPasswordPrompt(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  const handleExitEditMode = () => {
    setIsEditMode(false);
    localStorage.setItem(EDIT_MODE_KEY, 'false');
  };

  return (
    <>
      {/* Edit Mode Indicator (when active) */}
      {isEditMode && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="glass rounded-lg px-4 py-3 flex items-center space-x-3 shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-text-primary text-sm font-medium">
              Edit Mode Active
            </span>
            <button
              onClick={handleExitEditMode}
              className="ml-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded transition-colors"
            >
              Exit
            </button>
          </div>
        </motion.div>
      )}

      {/* Settings Button (when not in edit mode) */}
      {!isEditMode && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowPasswordPrompt(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-accent-cyan text-background rounded-full shadow-glow-cyan hover:shadow-xl transition-all"
          aria-label="Enter Edit Mode"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </motion.button>
      )}

      {/* Password Prompt Modal */}
      <AnimatePresence>
        {showPasswordPrompt && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowPasswordPrompt(false);
                setPassword('');
                setError('');
              }}
              className="fixed inset-0 bg-black/70 z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="glass rounded-xl p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold gradient-text mb-2">
                  Enter Edit Mode
                </h3>
                <p className="text-text-secondary text-sm mb-6">
                  Enter the password to enable content editing.
                </p>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter password"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:border-transparent transition-all"
                      autoFocus
                    />
                    {error && (
                      <p className="text-red-400 text-sm mt-2">{error}</p>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-accent-cyan text-background font-semibold rounded-lg hover:scale-105 transition-transform"
                    >
                      Unlock
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordPrompt(false);
                        setPassword('');
                        setError('');
                      }}
                      className="flex-1 px-6 py-3 glass hover:bg-white/10 text-text-primary font-semibold rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

                <p className="text-text-tertiary text-xs mt-6">
                  Default password: <code className="bg-white/10 px-2 py-1 rounded">edit123</code>
                  <br />
                  Change this in <code className="bg-white/10 px-2 py-1 rounded">EditModeToggle.tsx</code>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
