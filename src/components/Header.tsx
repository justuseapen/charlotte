import React, { useState } from 'react';
import { BookOpen, Calendar, Trophy, Settings } from 'lucide-react';
import { ProfileModal } from './ProfileModal';

interface HeaderProps {
  user: { name: string; streak: number };
  onUpdateProfile: (name: string) => void;
  onReset: () => void;
}

export function Header({ user, onUpdateProfile, onReset }: HeaderProps) {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <header className="bg-indigo-700 text-white p-4 shadow-lg">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />
            <h1 className="text-xl sm:text-2xl font-bold">Charlotte</h1>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-300" />
              <span className="text-sm sm:text-base font-semibold">{user.streak} day streak</span>
            </div>

            <button
              onClick={() => setShowProfileModal(true)}
              className="flex items-center space-x-2 hover:bg-indigo-600 rounded-lg px-3 py-1 transition-colors"
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                {user.name[0].toUpperCase()}
              </div>
              <span className="text-sm sm:text-base font-medium">{user.name}</span>
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </header>

      {showProfileModal && (
        <ProfileModal
          user={user}
          onUpdateProfile={onUpdateProfile}
          onReset={onReset}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </>
  );
}
