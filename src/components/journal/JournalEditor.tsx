import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Mic, Image, Send } from 'lucide-react';
import { useJournalStore } from '../../stores/journalStore';

interface JournalEditorProps {
  onClose: () => void;
}

const JournalEditor = ({ onClose }: JournalEditorProps) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('😊');
  const [images, setImages] = useState<{ src: string; timestamp: Date }[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addEntry } = useJournalStore();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, {
          src: reader.result as string,
          timestamp: new Date()
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Voice recording functionality would go here
  };

  const handleSave = () => {
    if (!content.trim()) return;

    const title = content.split('\n')[0] || 'Untitled Entry';
    addEntry({
      id: crypto.randomUUID(),
      title,
      content,
      mood,
      images,
      timestamp: Date.now(),
      lastModified: Date.now()
    });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">New Journal Entry</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Mood Selection */}
          <div className="flex gap-4">
            {['😊', '😐', '😔', '😡', '😨'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => setMood(emoji)}
                className={`text-2xl hover:scale-110 transition ${mood === emoji ? 'scale-110 transform' : ''}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Journal Input */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:border-ocean focus:ring-1 focus:ring-ocean resize-none"
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={image.src}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={handleVoiceRecord}
                className={`p-2 rounded-full transition ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600 hover:text-gray-900"
              >
                <Image className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <button
              onClick={handleSave}
              className="bg-ocean-dark text-white px-6 py-2 rounded-lg hover:bg-ocean transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Save Entry
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JournalEditor;