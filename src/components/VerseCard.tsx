import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Edit2 } from 'lucide-react';
import type { Verse } from '../types';

interface VerseCardProps {
  verse: Verse;
  showText?: boolean;
  onMastered?: (id: string) => void;
}

export function VerseCard({ verse, showText = true, onMastered }: VerseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{verse.reference}</h3>
            <span className="text-sm font-medium text-indigo-600">{verse.translation}</span>
          </div>
          
          {(showText || isExpanded) && (
            <p className="mt-3 text-gray-600 leading-relaxed">{verse.text}</p>
          )}
          
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span>Added {new Date(verse.dateAdded).toLocaleDateString()}</span>
            {verse.lastPracticed && (
              <span>Last practiced {new Date(verse.lastPracticed).toLocaleDateString()}</span>
            )}
          </div>
        </div>
        
        <div className="flex sm:flex-col items-center gap-2">
          {!showText && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label={isExpanded ? "Collapse verse" : "Expand verse"}
            >
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>
          )}
          
          <button 
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Edit verse"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          
          {onMastered && !verse.mastered && (
            <button
              onClick={() => onMastered(verse.id)}
              className="w-full sm:w-auto px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
            >
              Mark Mastered
            </button>
          )}
        </div>
      </div>
    </div>
  );
}