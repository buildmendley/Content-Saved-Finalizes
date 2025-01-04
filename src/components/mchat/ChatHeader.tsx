import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { saveChatDraft } from '../../utils/chatStorage';

interface ChatHeaderProps {
  mode: string;
}

const ChatHeader = ({ mode }: ChatHeaderProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSaveDraft = () => {
    if (saveChatDraft()) {
      // Show success message
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
      successMessage.textContent = 'Chat draft saved successfully!';
      document.body.appendChild(successMessage);
      
      // Remove after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
  };

  const handleClose = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      <div className="bg-ocean-dark/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-white text-2xl font-bold mb-1">Ana</h1>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-white/90 text-sm font-medium">{mode}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleSaveDraft}
                className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                <span className="text-sm">Save Draft</span>
              </button>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              End Chat Session?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to end this chat session? Any unsaved progress will be lost.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <Link 
                to="/ana" 
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                End Session
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;