// This is a small subset of verses for demonstration. In production, this would be a complete database.
export const kjvVerses = {
  "Genesis 1:1": "In the beginning God created the heaven and the earth.",
  "John 3:16": "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  "Psalm 23:1": "The LORD is my shepherd; I shall not want.",
  "Philippians 4:13": "I can do all things through Christ which strengtheneth me.",
  "Romans 8:28": "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
  "Proverbs 3:5-6": "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
  "Isaiah 40:31": "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
  "Matthew 6:33": "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
  "2 Timothy 3:16": "All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:",
  "1 John 1:9": "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."
} as const;

export type KJVReference = keyof typeof kjvVerses;