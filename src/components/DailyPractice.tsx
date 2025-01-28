import React, { useState } from 'react';
import { ArrowRight, Check, X, BookOpen } from 'lucide-react';
import type { Verse } from '../types';
import { VerseCard } from './VerseCard';

interface DailyPracticeProps {
  verses: Verse[];
  onComplete: (results: { verseId: string; mastered: boolean }[]) => void;
}

export function DailyPractice({ verses, onComplete }: DailyPracticeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVerse, setShowVerse] = useState(false);
  const [results, setResults] = useState<{ verseId: string; mastered: boolean }[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentVerse = verses[currentIndex];
  const isLastVerse = currentIndex === verses.length - 1;

  const getFeedbackMessage = (verse: Verse, mastered: boolean): string => {
    if (verse.bucket === 'datesOfMonth') {
      return `🌟 Excellent! You've maintained your memorization of "${verse.reference}". Keep up the great work!`;
    }
    
    switch (verse.bucket) {
      case 'daily':
        return `🎉 Congratulations! "${verse.reference}" will move to the Odd/Even Days bucket for spaced repetition.`;
      case 'oddEven':
        return `🎉 Well done! "${verse.reference}" will move to the Days of the Week bucket.`;
      case 'daysOfWeek':
        return `🎉 Amazing progress! "${verse.reference}" will move to the Dates of Month bucket.`;
      default:
        return `🎉 Great job with "${verse.reference}"!`;
    }
  };

  const handleResponse = (mastered: boolean) => {
    const newResults = [
      ...results,
      { verseId: currentVerse.id, mastered }
    ];
    setResults(newResults);
    
    if (mastered) {
      setFeedback(getFeedbackMessage(currentVerse, mastered));
    }
    
    setTimeout(() => {
      if (isLastVerse) {
        onComplete(newResults);
      } else {
        setCurrentIndex(prev => prev + 1);
        setShowVerse(false);
        setFeedback(null);
      }
    }, mastered ? 2000 : 0);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800">Daily Practice</h2>
        <span className="text-sm text-gray-600">
          {currentIndex + 1} of {verses.length} verses
        </span>
      </div>

      <div className="space-y-6">
        {feedback && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
            {feedback}
          </div>
        )}
        
        <VerseCard verse={currentVerse} showText={showVerse} />
        
        <div className="flex flex-col items-center space-y-4">
          {!showVerse ? (
            <button
              onClick={() => setShowVerse(true)}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <BookOpen className="h-5 w-5" />
              <span>Show Verse</span>
            </button>
          ) : (
            <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => handleResponse(false)}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
              >
                <X className="h-5 w-5" />
                <span>Still Learning</span>
              </button>
              <button
                onClick={() => handleResponse(true)}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
              >
                <Check className="h-5 w-5" />
                <span>Mastered</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}