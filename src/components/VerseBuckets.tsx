import React, { useState } from 'react';
import { Calendar, Hash, Repeat2, Star, ChevronRight, ChevronLeft, Plus } from 'lucide-react';
import type { Verse, BibleTranslation } from '../types';
import { VerseCard } from './VerseCard';
import { AddVerseModal } from './AddVerseModal';

interface VerseBucketsProps {
  verses: Verse[];
  currentDate: Date;
  onAddVerse?: (verse: Omit<Verse, 'id' | 'dateAdded' | 'mastered' | 'bucket'>) => void;
}

export function VerseBuckets({ verses, currentDate, onAddVerse }: VerseBucketsProps) {
  const [selectedDay, setSelectedDay] = useState<number>(currentDate.getDay());
  const [selectedDate, setSelectedDate] = useState<number>(currentDate.getDate());
  const [showAddModal, setShowAddModal] = useState(false);
  
  const dayOfMonth = currentDate.getDate();
  const dayOfWeek = currentDate.getDay();
  const isOddDay = dayOfMonth % 2 === 1;

  const dailyVerses = verses.filter(verse => verse.bucket === 'daily');
  const oddEvenVerses = verses.filter(verse => verse.bucket === 'oddEven');
  const dayOfWeekVerses = verses.filter(verse => verse.bucket === 'daysOfWeek');
  const dateOfMonthVerses = verses.filter(verse => verse.bucket === 'datesOfMonth');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handlePrevDay = () => {
    setSelectedDay((prev) => (prev - 1 + 7) % 7);
  };

  const handleNextDay = () => {
    setSelectedDay((prev) => (prev + 1) % 7);
  };

  const handlePrevDate = () => {
    setSelectedDate((prev) => (prev - 1 + 31) % 31 + 1);
  };

  const handleNextDate = () => {
    setSelectedDate((prev) => (prev % 31) + 1);
  };

  const handleAddVerse = (verseData: { reference: string; text: string; translation: BibleTranslation }) => {
    onAddVerse?.(verseData);
    setShowAddModal(false);
  };

  const buckets = [
    {
      name: 'Daily',
      icon: Star,
      verses: dailyVerses,
      description: 'New verses being learned',
      current: true,
      canAdd: true,
    },
    {
      name: 'Odd/Even Days',
      icon: Repeat2,
      verses: oddEvenVerses.filter(verse => 
        (isOddDay && verse.bucketPosition === 1) || (!isOddDay && verse.bucketPosition === 2)
      ),
      allVerses: oddEvenVerses,
      description: `Verses for ${isOddDay ? 'odd' : 'even'} days`,
      current: true,
    },
    {
      name: 'Days of Week',
      icon: Calendar,
      verses: dayOfWeekVerses.filter(verse => verse.bucketPosition === selectedDay),
      allVerses: dayOfWeekVerses,
      description: `Verses for ${daysOfWeek[selectedDay]}`,
      current: selectedDay === dayOfWeek,
      navigation: {
        prev: handlePrevDay,
        next: handleNextDay,
        label: daysOfWeek[selectedDay],
      },
    },
    {
      name: 'Dates of Month',
      icon: Hash,
      verses: dateOfMonthVerses.filter(verse => verse.bucketPosition === selectedDate),
      allVerses: dateOfMonthVerses,
      description: `Verses for day ${selectedDate}`,
      current: selectedDate === dayOfMonth,
      navigation: {
        prev: handlePrevDate,
        next: handleNextDate,
        label: `Day ${selectedDate}`,
      },
    },
  ];

  return (
    <div className="space-y-8">
      {buckets.map(bucket => (
        <section key={bucket.name} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <bucket.icon className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-800">{bucket.name}</h2>
              {'allVerses' in bucket && (
                <span className="text-sm text-gray-500">
                  ({bucket.verses.length} today / {bucket.allVerses.length} total)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {bucket.canAdd && onAddVerse && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1 px-3 py-1 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  Add Verse
                </button>
              )}
              {'navigation' in bucket && bucket.navigation && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={bucket.navigation.prev}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="text-sm font-medium min-w-[100px] text-center">
                    {bucket.navigation.label}
                  </span>
                  <button
                    onClick={bucket.navigation.next}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {bucket.description}
            {!bucket.current && ' (viewing different day)'}
          </p>
          {bucket.verses.length > 0 ? (
            <div className="space-y-4">
              {bucket.verses.map(verse => (
                <VerseCard key={verse.id} verse={verse} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">No verses in this bucket</p>
          )}
        </section>
      ))}

      {showAddModal && (
        <AddVerseModal
          onAdd={handleAddVerse}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}