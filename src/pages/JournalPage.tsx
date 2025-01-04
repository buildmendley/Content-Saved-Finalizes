import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Calendar } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import JournalGrid from '../components/journal/JournalGrid';
import JournalEditor from '../components/journal/JournalEditor';
import { useJournalStore } from '../stores/journalStore';

const JournalPage = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { entries } = useJournalStore();

  const filteredEntries = entries.filter(entry => 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-light via-ocean to-ocean-dark">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              to="/dashboard" 
              className="flex items-center text-white mb-4 hover:opacity-80 transition"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white">Journal</h1>
            <p className="text-white/80">Capture your thoughts and feelings</p>
          </div>

          {/* Search and Add */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
            </div>
            <button
              onClick={() => setShowEditor(true)}
              className="bg-white/10 text-white p-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>New Entry</span>
            </button>
          </div>
        </div>

        {/* Journal Grid */}
        <JournalGrid entries={filteredEntries} />

        {/* Journal Editor Modal */}
        {showEditor && (
          <JournalEditor onClose={() => setShowEditor(false)} />
        )}
      </main>
    </div>
  );
};

export default JournalPage;