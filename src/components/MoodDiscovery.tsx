import React from 'react';
import { MoodType } from '../types';

interface MoodDiscoveryProps {
  selectedMood: MoodType | 'all';
  onSelectMood: (mood: MoodType | 'all') => void;
}

const MOODS: { type: MoodType; label: string; labelHi: string; icon: string }[] = [
  { type: 'love', label: 'Love', labelHi: 'इश्क़', icon: '❤️' },
  { type: 'sad', label: 'Sad', labelHi: 'उदासी', icon: '💔' },
  { type: 'dard', label: 'Dard', labelHi: 'दर्द', icon: '🥀' },
  { type: 'lonely', label: 'Lonely', labelHi: 'तन्हाई', icon: '🌙' },
  { type: 'hope', label: 'Hope', labelHi: 'उम्मीद', icon: '✨' },
  { type: 'attitude', label: 'Attitude', labelHi: 'तेवर', icon: '🔥' },
  { type: 'romantic', label: 'Romantic', labelHi: 'रोमांस', icon: '🌸' },
  { type: 'friendship', label: 'Friendship', labelHi: 'दोस्ती', icon: '🤝' },
  { type: 'life', label: 'Life', labelHi: 'ज़िंदगी', icon: '🌿' },
];

export const MoodDiscovery: React.FC<MoodDiscoveryProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <section className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="font-serif text-2xl font-bold text-[#2A201A] dark:text-[#F3ECE4]">
            Explore by Mood • मिज़ाज के अनुसार अल्फ़ाज़
          </h3>
          <p className="text-xs text-[#7B6E63] dark:text-[#A89D92]">
            Select a sentiment to filter Shayari, poetry and thoughts
          </p>
        </div>

        {selectedMood !== 'all' && (
          <button
            onClick={() => onSelectMood('all')}
            className="text-xs font-medium text-[#8D6527] dark:text-[#D4AF37] hover:underline self-start sm:self-auto"
          >
            Show All Moods (सभी देखें)
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectMood('all')}
          className={`shrink-0 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            selectedMood === 'all'
              ? 'bg-[#8D6527] text-white shadow-xs'
              : 'bg-[#F2ECE1] dark:bg-[#251E19] text-[#4A3E36] dark:text-[#C5BCB3] hover:bg-[#EAE1D3] dark:hover:bg-[#302720]'
          }`}
        >
          All Moods
        </button>

        {MOODS.map((m) => {
          const isActive = selectedMood === m.type;
          return (
            <button
              key={m.type}
              onClick={() => onSelectMood(m.type)}
              className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#8D6527] text-white shadow-xs'
                  : 'bg-[#F2ECE1] dark:bg-[#251E19] text-[#4A3E36] dark:text-[#C5BCB3] hover:bg-[#EAE1D3] dark:hover:bg-[#302720]'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label} ({m.labelHi})</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
