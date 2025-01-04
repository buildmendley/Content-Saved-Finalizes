import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, ArrowLeft, Plus, Calendar, Pencil, Trash2, X, Check } from 'lucide-react';
import DashboardHeader from '../components/dashboard/DashboardHeader';

interface Goal {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  notes?: string;
  status: 'active' | 'completed';
}

const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Daily Meditation Practice',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-01'),
    notes: 'Start with 5 minutes, gradually increase to 20 minutes',
    status: 'active'
  },
  {
    id: '2',
    title: 'Journal Writing Habit',
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-04-15'),
    notes: 'Write at least 3 entries per week',
    status: 'active'
  }
];

const GoalSettingPage = () => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [newGoal, setNewGoal] = useState<Partial<Goal>>({
    title: '',
    notes: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'active'
  });

  const handleSaveGoal = () => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === editingGoal.id ? { ...editingGoal } : g));
      setEditingGoal(null);
    } else if (newGoal.title) {
      setGoals([...goals, { ...newGoal, id: Date.now().toString() } as Goal]);
      setNewGoal({
        title: '',
        notes: '',
        startDate: new Date(),
        endDate: new Date(),
        status: 'active'
      });
    }
    setIsModalOpen(false);
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleToggleStatus = (id: string) => {
    setGoals(goals.map(g => 
      g.id === id ? { ...g, status: g.status === 'active' ? 'completed' : 'active' } : g
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-light via-ocean to-ocean-dark p-8">
      <DashboardHeader />
      <div className="max-w-4xl mx-auto">
        <Link to="/dashboard" className="inline-flex items-center text-white mb-8 hover:opacity-80 transition">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-ocean-dark p-3 rounded-xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Goal Setting</h1>
                <p className="text-white/80">Track and manage your personal goals</p>
              </div>
            </div>

            <button 
              onClick={() => {
                setEditingGoal(null);
                setIsModalOpen(true);
              }}
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Goal
            </button>
          </div>

          <div className="space-y-4">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{goal.title}</h3>
                    {goal.notes && (
                      <p className="text-gray-600 mb-4">{goal.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(goal.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        goal.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-ocean-light/30 text-ocean-dark'
                      }`}
                    >
                      {goal.status}
                    </button>
                    <button
                      onClick={() => {
                        setEditingGoal(goal);
                        setIsModalOpen(true);
                      }}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Pencil className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Trash2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {goal.startDate.toLocaleDateString()} - {goal.endDate.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit Goal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                {editingGoal ? 'Edit Goal' : 'New Goal'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingGoal?.title || newGoal.title}
                  onChange={(e) => editingGoal 
                    ? setEditingGoal({ ...editingGoal, title: e.target.value })
                    : setNewGoal({ ...newGoal, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editingGoal?.notes || newGoal.notes}
                  onChange={(e) => editingGoal
                    ? setEditingGoal({ ...editingGoal, notes: e.target.value })
                    : setNewGoal({ ...newGoal, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-dark"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={editingGoal?.startDate.toISOString().split('T')[0] || newGoal.startDate?.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      editingGoal
                        ? setEditingGoal({ ...editingGoal, startDate: date })
                        : setNewGoal({ ...newGoal, startDate: date });
                    }}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={editingGoal?.endDate.toISOString().split('T')[0] || newGoal.endDate?.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      editingGoal
                        ? setEditingGoal({ ...editingGoal, endDate: date })
                        : setNewGoal({ ...newGoal, endDate: date });
                    }}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-dark"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveGoal}
                  className="px-4 py-2 bg-ocean-dark text-white rounded-lg hover:bg-ocean-dark/90 transition flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalSettingPage; 