import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DailyPractice } from './components/DailyPractice';
import { VerseBuckets } from './components/VerseBuckets';
import type { Verse, User } from './types';

// Move to environment variables in production
const STORAGE_KEY = 'scripture_memory_data';

function App() {
  const [user, setUser] = useState<User>({
    id: crypto.randomUUID(),
    name: 'Guest User',
    streak: 0,
    lastPracticeDate: null,
  });

  const [verses, setVerses] = useState<Verse[]>([]);
  const [isPracticing, setIsPracticing] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.user) setUser(parsed.user);
        if (parsed.verses) setVerses(parsed.verses);
      }
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
    }
  }, []);

  // Persist data
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, verses }));
  }, [user, verses]);

  // Check and update streak
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    if (user.lastPracticeDate) {
      const lastPractice = new Date(user.lastPracticeDate);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastPractice.toLocaleDateString() === yesterday.toLocaleDateString()) {
        setUser(prev => ({
          ...prev,
          lastPracticeDate: today,
          streak: prev.streak + 1,
        }));
      } else if (lastPractice.toLocaleDateString() !== today) {
        setUser(prev => ({
          ...prev,
          streak: 0,
        }));
      }
    }
  }, []);

  const currentDate = new Date();

  const todaysVerses = verses.filter(verse => {
    const dayOfMonth = currentDate.getDate();
    const dayOfWeek = currentDate.getDay();
    const isOddDay = dayOfMonth % 2 === 1;

    return (
      verse.bucket === 'daily' ||
      (verse.bucket === 'oddEven' &&
        ((isOddDay && verse.bucketPosition === 1) || (!isOddDay && verse.bucketPosition === 2))) ||
      (verse.bucket === 'daysOfWeek' && verse.bucketPosition === dayOfWeek) ||
      (verse.bucket === 'datesOfMonth' && verse.bucketPosition === dayOfMonth)
    );
  });

  const handleAddVerse = (verseData: Omit<Verse, 'id' | 'dateAdded' | 'mastered' | 'bucket'>) => {
    const newVerse: Verse = {
      ...verseData,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
      mastered: false,
      bucket: 'daily',
    };

    setVerses(prev => [...prev, newVerse]);
  };

  const handlePracticeComplete = (results: { verseId: string; mastered: boolean }[]) => {
    const today = new Date().toLocaleDateString();

    setVerses(prev => prev.map(verse => {
      const result = results.find(r => r.verseId === verse.id);
      if (!result) return verse;

      const now = new Date();
      let updatedVerse = {
        ...verse,
        lastPracticed: now.toISOString(),
      };

      if (result.mastered) {
        switch (verse.bucket) {
          case 'daily':
            updatedVerse = {
              ...updatedVerse,
              bucket: 'oddEven',
              bucketPosition: now.getDate() % 2 === 1 ? 2 : 1,
              mastered: true,
            };
            break;
          case 'oddEven':
            updatedVerse = {
              ...updatedVerse,
              bucket: 'daysOfWeek',
              bucketPosition: (now.getDay() + 1) % 7,
            };
            break;
          case 'daysOfWeek':
            updatedVerse = {
              ...updatedVerse,
              bucket: 'datesOfMonth',
              bucketPosition: (now.getDate() % 31) + 1,
            };
            break;
          case 'datesOfMonth':
            // Keep in the same bucket, just update lastPracticed
            break;
        }
      }

      return updatedVerse;
    }));

    // Update user's practice date and streak
    setUser(prev => ({
      ...prev,
      lastPracticeDate: today,
    }));

    setIsPracticing(false);
  };

  const handleUpdateProfile = (name: string) => {
    setUser(prev => ({
      ...prev,
      name,
    }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        user={user}
        onUpdateProfile={handleUpdateProfile}
        onReset={handleReset}
      />

      <main className="container mx-auto px-4 py-6 sm:py-8 max-w-3xl">
        {isPracticing ? (
          <DailyPractice
            verses={todaysVerses}
            onComplete={handlePracticeComplete}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Today's Verses</h1>
              {todaysVerses.length > 0 && (
                <button
                  onClick={() => setIsPracticing(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Start Practice
                </button>
              )}
            </div>
            <VerseBuckets
              verses={verses}
              currentDate={currentDate}
              onAddVerse={handleAddVerse}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
