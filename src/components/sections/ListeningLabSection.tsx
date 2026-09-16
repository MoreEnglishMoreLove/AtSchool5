import React, { useState } from 'react';
import { 
  Headphones, 
  Volume2, 
  Check, 
  X, 
  Sparkles, 
  RotateCcw, 
  ArrowLeft,
  Award,
  Users
} from 'lucide-react';
import { speechService } from '../../lib/speech';
import confetti from 'canvas-confetti';

export const ListeningLabSection: React.FC = () => {
  // Exercise 1: Listen and choose a or b
  const exercise1Items = [
    {
      id: 1,
      spokenText: 'classroom',
      contextSentence: 'Students are sitting at their desks in the classroom.',
      optionA: { label: 'classroom', ar: 'صف دراسي' },
      optionB: { label: 'science lab', ar: 'مختبر علوم' },
      correct: 'a'
    },
    {
      id: 2,
      spokenText: 'playground',
      contextSentence: 'Children are running and playing in the school playground.',
      optionA: { label: 'computer lab', ar: 'مختبر حاسوب' },
      optionB: { label: 'playground', ar: 'ساحة لعب' },
      correct: 'b'
    },
    {
      id: 3,
      spokenText: 'library',
      contextSentence: 'We read and borrow interesting books from the library.',
      optionA: { label: 'playground', ar: 'ساحة لعب' },
      optionB: { label: 'library', ar: 'مكتبة' },
      correct: 'b'
    },
    {
      id: 4,
      spokenText: 'bathroom',
      contextSentence: 'Please wash your hands in the bathroom.',
      optionA: { label: 'bathroom', ar: 'حمّام' },
      optionB: { label: 'classroom', ar: 'صف دراسي' },
      correct: 'a'
    },
    {
      id: 5,
      spokenText: 'science lab',
      contextSentence: 'We conduct safe science experiments in the science lab.',
      optionA: { label: 'science lab', ar: 'مختبر علوم' },
      optionB: { label: 'bathroom', ar: 'حمّام' },
      correct: 'a'
    },
    {
      id: 6,
      spokenText: 'computer lab',
      contextSentence: 'We learn typing and research in the computer lab.',
      optionA: { label: 'computer lab', ar: 'مختبر حاسوب' },
      optionB: { label: 'science lab', ar: 'مختبر علوم' },
      correct: 'a'
    }
  ];

  const [selectedAnswers1, setSelectedAnswers1] = useState<Record<number, 'a' | 'b'>>({});
  const [showResults1, setShowResults1] = useState(false);

  // Exercise 2: Where are they?
  const people = [
    { id: 'nader', nameEn: 'Nader', nameAr: 'نادر', correctPlace: 'computer lab', spoken: 'Nader is working in the computer lab.' },
    { id: 'majed', nameEn: 'Majed', nameAr: 'ماجد', correctPlace: 'playground', spoken: 'Majed is playing in the playground.' },
    { id: 'maha', nameEn: 'Maha', nameAr: 'مها', correctPlace: 'library', spoken: 'Maha is reading in the library.' },
    { id: 'dana', nameEn: 'Dana', nameAr: 'دانا', correctPlace: 'classroom', spoken: 'Dana is taking notes in the classroom.' },
    { id: 'lama', nameEn: 'Lama', nameAr: 'لما', correctPlace: 'science lab', spoken: 'Lama is observing chemicals in the science lab.' }
  ];

  const places = [
    { id: 'computer lab', labelEn: 'computer lab', labelAr: 'مختبر حاسوب' },
    { id: 'playground', labelEn: 'playground', labelAr: 'ساحة لعب' },
    { id: 'library', labelEn: 'library', labelAr: 'مكتبة' },
    { id: 'classroom', labelEn: 'classroom', labelAr: 'صف دراسي' },
    { id: 'science lab', labelEn: 'science lab', labelAr: 'مختبر علوم' }
  ];

  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [showResults2, setShowResults2] = useState(false);

  // Sound handler
  const playAudio = (text: string) => {
    speechService.speak(text, { rate: 0.9 });
  };

  const handleSelectAnswer1 = (itemId: number, choice: 'a' | 'b') => {
    setSelectedAnswers1(prev => ({ ...prev, [itemId]: choice }));
  };

  const checkExercise1 = () => {
    setShowResults1(true);
    const score = exercise1Items.reduce((acc, item) => {
      return acc + (selectedAnswers1[item.id] === item.correct ? 1 : 0);
    }, 0);

    if (score >= 5) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const checkExercise2 = () => {
    setShowResults2(true);
    const correctCount = people.reduce((acc, p) => {
      return acc + (matchedPairs[p.id] === p.correctPlace ? 1 : 0);
    }, 0);

    if (correctCount === people.length) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-950/80 via-slate-900 to-blue-950/80 p-6 rounded-3xl border border-sky-800/50 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-bold mb-2">
          <Headphones className="w-3.5 h-3.5" />
          <span>الوحدة الأولى: Listening & Matching Lab - القسم 3</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">مختبر الاستماع التفاعلي والمطابقة</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          استمع للأسئلة الصوتية بنطق إنجليزي نقي، واختر الإجابة الصحيحة أو طابق بين الطلاب وأماكن تواجدهم في المدرسة.
        </p>
      </div>

      {/* Exercise 1: Listen and choose a or b */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold text-sky-400">التمرين الأول (من ورقة عمل 1):</div>
            <h3 className="text-lg font-black text-white">Listen and choose a or b (استمع واختر a أو b)</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedAnswers1({});
                setShowResults1(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة البدء</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exercise1Items.map((item) => {
            const userChoice = selectedAnswers1[item.id];
            const isCorrect = userChoice === item.correct;

            return (
              <div
                key={item.id}
                className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-xl bg-blue-600/20 text-blue-300 flex items-center justify-center font-black text-xs">
                      #{item.id}
                    </span>

                    <button
                      onClick={() => playAudio(item.spokenText)}
                      className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>استمع للكلمة</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {/* Option A */}
                    <button
                      onClick={() => handleSelectAnswer1(item.id, 'a')}
                      className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                        userChoice === 'a'
                          ? showResults1
                            ? item.correct === 'a'
                              ? 'bg-emerald-950/70 border-emerald-500 text-white'
                              : 'bg-rose-950/70 border-rose-500 text-white'
                            : 'bg-blue-600 border-blue-400 text-white shadow-md'
                          : showResults1 && item.correct === 'a'
                          ? 'bg-emerald-950/50 border-emerald-500/80 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">a. {item.optionA.label}</span>
                        {showResults1 && item.correct === 'a' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{item.optionA.ar}</div>
                    </button>

                    {/* Option B */}
                    <button
                      onClick={() => handleSelectAnswer1(item.id, 'b')}
                      className={`p-3 rounded-xl border text-right transition-all cursor-pointer ${
                        userChoice === 'b'
                          ? showResults1
                            ? item.correct === 'b'
                              ? 'bg-emerald-950/70 border-emerald-500 text-white'
                              : 'bg-rose-950/70 border-rose-500 text-white'
                            : 'bg-blue-600 border-blue-400 text-white shadow-md'
                          : showResults1 && item.correct === 'b'
                          ? 'bg-emerald-950/50 border-emerald-500/80 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">b. {item.optionB.label}</span>
                        {showResults1 && item.correct === 'b' && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{item.optionB.ar}</div>
                    </button>
                  </div>
                </div>

                {showResults1 && (
                  <div className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-between ${
                    isCorrect ? 'bg-emerald-900/40 text-emerald-300' : 'bg-rose-900/40 text-rose-300'
                  }`}>
                    <span>{isCorrect ? 'إجابة صحيحة وممتازة! 🎉' : `الإجابة الصحيحة هي: (${item.correct})`}</span>
                    <button
                      onClick={() => playAudio(item.contextSentence)}
                      className="text-[11px] underline opacity-90 hover:opacity-100"
                    >
                      سماع الجملة كاملة
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={checkExercise1}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>تصحيح التمرين الأول</span>
          </button>
        </div>
      </div>

      {/* Exercise 2: Listen and match "Where are they?" */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="text-xs font-bold text-amber-400">التمرين الثاني (من ورقة عمل 4):</div>
            <h3 className="text-lg font-black text-white">Listen and match: Where are they? (أين هم؟)</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              استمع للمقطع الصوتي لكل طالب، وحدد المكان المدرسي الذي يتواجد فيه حالياً:
            </p>
          </div>

          <button
            onClick={() => {
              setMatchedPairs({});
              setShowResults2(false);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة التوصيل</span>
          </button>
        </div>

        <div className="space-y-3">
          {people.map((p, idx) => {
            const currentSelected = matchedPairs[p.id];
            const isCorrect = currentSelected === p.correctPlace;

            return (
              <div 
                key={p.id}
                className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-300 flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span className="text-base">{p.nameEn}</span>
                      <span className="text-xs text-slate-400 font-normal">({p.nameAr})</span>
                    </div>
                    <button
                      onClick={() => playAudio(p.spoken)}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-0.5"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>استمع للمقطع الصوتي</span>
                    </button>
                  </div>
                </div>

                {/* Places Selector */}
                <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                  {places.map((place) => {
                    const isSelected = currentSelected === place.id;

                    return (
                      <button
                        key={place.id}
                        onClick={() => setMatchedPairs(prev => ({ ...prev, [p.id]: place.id }))}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? showResults2
                              ? isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                              : 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {place.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={checkExercise2}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>تحقق من مطابقة الأماكن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
