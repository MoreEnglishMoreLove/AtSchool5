import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Headphones, 
  FileText, 
  CheckCircle2, 
  MessageSquareQuote, 
  FileCheck2,
  Sparkles
} from 'lucide-react';

export type SectionKey = 
  | 'vocabulary' 
  | 'grammar' 
  | 'listening' 
  | 'reading' 
  | 'quiz' 
  | 'speaking' 
  | 'worksheets';

interface NavigationProps {
  activeSection: SectionKey;
  onSelectSection: (section: SectionKey) => void;
}

interface NavItem {
  key: SectionKey;
  number: number;
  labelAr: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
  isSpecial?: boolean;
}

export const SECTIONS: NavItem[] = [
  {
    key: 'vocabulary',
    number: 1,
    labelAr: 'المفردات ولفظ H الصامت',
    labelEn: 'Vocabulary & Phonics',
    icon: BookOpen
  },
  {
    key: 'grammar',
    number: 2,
    labelAr: 'قواعد have to / has to',
    labelEn: 'Grammar Hub',
    icon: Layers
  },
  {
    key: 'listening',
    number: 3,
    labelAr: 'مختبر الاستماع والمطابقة',
    labelEn: 'Listening Lab',
    icon: Headphones
  },
  {
    key: 'reading',
    number: 4,
    labelAr: 'نصوص القراءة والمقارنة',
    labelEn: 'Reading & Systems',
    icon: FileText
  },
  {
    key: 'quiz',
    number: 5,
    labelAr: 'بنك التمارين التفاعلية',
    labelEn: 'Interactive Exercises',
    icon: CheckCircle2
  },
  {
    key: 'speaking',
    number: 6,
    labelAr: 'استوديو المحادثة والقواعد',
    labelEn: 'Speaking & Rules Maker',
    icon: MessageSquareQuote
  },
  {
    key: 'worksheets',
    number: 7,
    labelAr: 'أوراق عمل المنهاج والحلول (7)',
    labelEn: 'Curriculum Worksheets',
    icon: FileCheck2,
    isSpecial: true
  }
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection
}) => {
  return (
    <nav className="w-full bg-slate-900/90 border-b border-slate-800 sticky top-[69px] z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.key;

            return (
              <button
                key={sec.key}
                onClick={() => onSelectSection(sec.key)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none relative ${
                  isActive
                    ? sec.isSpecial
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-lg shadow-amber-600/30'
                      : 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : sec.isSpecial
                    ? 'bg-amber-950/30 text-amber-300 border border-amber-800/50 hover:bg-amber-900/40'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                }`}
              >
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-300'
                }`}>
                  {sec.number}
                </div>

                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : sec.isSpecial ? 'text-amber-400' : 'text-blue-400'}`} />

                <span>{sec.labelAr}</span>

                {sec.isSpecial && (
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-[10px] font-bold">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>مهم</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
