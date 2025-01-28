import React, { useState, useMemo } from 'react';
import { X, Search, BookOpen } from 'lucide-react';
import type { BibleTranslation } from '../types';
import { kjvVerses, type KJVReference } from '../data/kjvVerses';

interface AddVerseModalProps {
  onAdd: (verse: { reference: string; text: string; translation: BibleTranslation }) => void;
  onClose: () => void;
}

export function AddVerseModal({ onAdd, onClose }: AddVerseModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReference, setSelectedReference] = useState<KJVReference | ''>('');
  const [customText, setCustomText] = useState('');
  const [translation, setTranslation] = useState<BibleTranslation>('KJV');
  const [isCustomVerse, setIsCustomVerse] = useState(false);

  const filteredVerses = useMemo(() => {
    if (!searchTerm) return [];
    const searchLower = searchTerm.toLowerCase();
    return Object.entries(kjvVerses)
      .filter(([reference, text]) => 
        reference.toLowerCase().includes(searchLower) || 
        text.toLowerCase().includes(searchLower)
      )
      .slice(0, 5); // Limit to 5 results for better UX
  }, [searchTerm]);

  const handleVerseSelect = (reference: KJVReference) => {
    setSelectedReference(reference);
    setSearchTerm(reference);
    if (translation === 'KJV') {
      setCustomText(kjvVerses[reference]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reference = isCustomVerse ? searchTerm : selectedReference;
    const text = isCustomVerse || translation !== 'KJV' ? customText : kjvVerses[selectedReference as KJVReference];
    
    if (reference && text) {
      onAdd({ reference, text, translation });
    }
  };

  const handleTranslationChange = (newTranslation: BibleTranslation) => {
    setTranslation(newTranslation);
    if (newTranslation !== 'KJV') {
      setIsCustomVerse(true);
      setCustomText('');
    } else if (selectedReference) {
      setIsCustomVerse(false);
      setCustomText(kjvVerses[selectedReference]);
    }
  };

  const translations: BibleTranslation[] = ['KJV', 'NIV', 'ESV', 'NASB', 'NLT'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Add New Verse</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="translation" className="block text-sm font-medium text-gray-700 mb-1">
              Translation
            </label>
            <select
              id="translation"
              value={translation}
              onChange={(e) => handleTranslationChange(e.target.value as BibleTranslation)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              {translations.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <label htmlFor="reference" className="block text-sm font-medium text-gray-700 mb-1">
              Reference
            </label>
            <div className="relative">
              <input
                type="text"
                id="reference"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., John 3:16"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-10"
                required
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            {translation === 'KJV' && filteredVerses.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                {filteredVerses.map(([reference, text]) => (
                  <button
                    key={reference}
                    type="button"
                    onClick={() => handleVerseSelect(reference as KJVReference)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                  >
                    <div className="font-medium text-gray-900">{reference}</div>
                    <div className="text-sm text-gray-500 truncate">{text}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
              Verse Text
            </label>
            <div className="relative">
              <textarea
                id="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
                placeholder={translation === 'KJV' ? "Select a verse from the search above or enter custom text" : "Enter verse text"}
              />
              {translation === 'KJV' && selectedReference && !isCustomVerse && (
                <BookOpen className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>

          {translation === 'KJV' && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="customVerse"
                checked={isCustomVerse}
                onChange={(e) => setIsCustomVerse(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="customVerse" className="ml-2 text-sm text-gray-600">
                Enter custom KJV verse text
              </label>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Add Verse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}