export type BibleTranslation = 'KJV' | 'NIV' | 'ESV' | 'NASB' | 'NLT';

export type BucketType = 'daily' | 'oddEven' | 'daysOfWeek' | 'datesOfMonth';

export interface Verse {
  id: string;
  reference: string;
  text: string;
  translation: BibleTranslation;
  dateAdded: string;
  lastPracticed?: string;
  mastered: boolean;
  bucket: BucketType;
  bucketPosition?: number; // For odd/even (1-2), days (1-7), dates (1-31)
  notes?: string;
}

export interface User {
  id: string;
  name: string;
  streak: number;
  lastPracticeDate?: string;
}