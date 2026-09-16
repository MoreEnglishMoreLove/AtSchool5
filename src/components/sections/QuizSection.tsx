import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  Award, 
  Check, 
  X, 
  HelpCircle,
  Move,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TEACHER_NAME } from '../../lib/security';

export const QuizSection: React.FC = () => {
  // Exercise 1: Circle the correct word
  const grammarChoices = [
    {
      id: 1,
      promptEn: 'What do you ______ do in the classroom?',
      promptAr: 'ماذا يجب عليك أن تفعل في الصف؟',
      options: ['have to', 'has to'],
      correct: 'have to',
      explanation: 'مع الضمير you نستخدم have to دائماً'
    },
    {
      id: 2,
      promptEn: 'We ______ arrive on time.',
      promptAr: 'يجب علينا أن نصل في الوقت المحدد.',
      options: ['have to', 'has to'],
      correct: 'have to',
      explanation: 'مع ضمير الجمع We نستخدم have to'
    },
    {
      id: 3,
      promptEn: 'Do you ______ do your homework at school?',
      promptAr: 'هل يجب عليك حل واجبك في المدرسة؟',
      options: ['have to', 'has to'],
      correct: 'have to',
      explanation: 'في صيغة السؤال مع Do you نستخدم have to'
    },
    {
      id: 4,
      promptEn: "No, we ______ do our homework at school.",
      promptAr: 'لا، لا يجب علينا حل واجبنا في المدرسة.',
      options: ["don't have to", "doesn't have to"],
      correct: "don't have to",
      explanation: 'مع الضمير we ننفي بـ don\'t have to'
    },
    {
      id: 5,
      promptEn: 'Does Nadia ______ wear a skirt and a jacket?',
      promptAr: 'هل يجب على نادية ارتداء تنورة وجاكيت؟',
      options: ['have to', 'has to'],
      correct: 'have to',
      explanation: 'بعد فعل العمل Does في السؤال، يعود الفعل لمصدره have to'
    },
    {
      id: 6,
      promptEn: 'Yes, she has to ______ a skirt and a jacket.',
      promptAr: 'نعم، يجب عليها ارتداء تنورة وجاكيت.',
      options: ['wear', 'wears'],
      correct: 'wear',
      explanation: 'بعد has to يأتي الفعل في المصدر المجرد wear بدون s'
    }
  ];

  const [selectedChoices, setSelectedChoices] = useState<Record<number, string>>({});
  const [showChoicesResult, setShowChoicesResult] = useState(false);

  // Exercise 2: Word Order
  const scrambledSentences = [
    {
      id: 1,
      words: ['We', 'have', 'to', 'say', '"please"', 'and', '"thank you".'],
      shuffled: ['"thank you".', 'We', 'say', 'to', 'and', 'have', '"please"'],
      translation: 'يجب علينا أن نقول "من فضلك" و"شكراً".'
    },
    {
      id: 2,
      words: ['We', "don't", 'have', 'to', 'do', 'homework', 'at', 'school.'],
      shuffled: ['at', 'We', 'do', 'school.', 'have', "don't", 'homework', 'to'],
      translation: 'لا يجب علينا إنجاز الواجب في المدرسة.'
    },
    {
      id: 3,
      words: ['Do', 'you', 'have', 'to', 'follow', 'instructions?'],
      shuffled: ['follow', 'Do', 'instructions?', 'to', 'you', 'have'],
      translation: 'هل يجب عليك اتباع التعليمات؟'
    }
  ];

  const [orderedWords, setOrderedWords] = useState<Record<number, string[]>>({
    1: [],
    2: [],
    3: []
  });
  const [showOrderResults, setShowOrderResults] = useState(false);

  const handleSelectChoice = (questionId: number, option: string) => {
    setSelectedChoices(prev => ({ ...prev, [questionId]: option }));
  };

  const handleAddWord = (sentenceId: number, word: string) => {
    setOrderedWords(prev => {
      const current = prev[sentenceId] || [];
      return { ...prev, [sentenceId]: [...current, word] };
    });
  };

  const handleRemoveWord = (sentenceId: number, index: number) => {
    setOrderedWords(prev => {
      const current = [...(prev[sentenceId] || [])];
      current.splice(index, 1);
      return { ...prev, [sentenceId]: current };
    });
  };

  const checkAll = () => {
    setShowChoicesResult(true);
    setShowOrderResults(true);

    let score = 0;
    grammarChoices.forEach(q => {
      if (selectedChoices[q.id] === q.correct) score++;
    });

    scrambledSentences.forEach(s => {
      const user = (orderedWords[s.id] || []).join(' ');
      const target = s.words.join(' ');
      if (user === target) score++;
    });

    if (score >= 6) {
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
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 p-6 rounded-3xl border border-purple-800/50 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-bold mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>الوحدة الأولى: Interactive Quiz Bank - القسم 5</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">بنك التمارين التفاعلية والاختبارات الفورية</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          تمارين الاختيار من متعدد وتركيب الجمل التفاعلي من ورقة العمل رقم 3 المعتمدة لدى المعلمة {TEACHER_NAME}.
        </p>
      </div>

      {/* Part 1: Circle the correct word */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-purple-400">التمرين الأول (ورقة عمل 3 - تمرين 7):</span>
            <h3 className="text-lg font-black text-white">Circle the correct word (اختر الكلمة الصحيحة)</h3>
          </div>
          <button
            onClick={() => {
              setSelectedChoices({});
              setShowChoicesResult(false);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة الحل</span>
          </button>
        </div>

        <div className="space-y-4">
          {grammarChoices.map((q) => {
            const userPick = selectedChoices[q.id];
            const isCorrect = userPick === q.correct;

            return (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="text-sm font-bold text-white mb-1" dir="ltr">
                      <span className="text-purple-400 font-mono mr-2">#{q.id}</span>
                      {q.promptEn}
                    </div>
                    <div className="text-xs text-slate-400">{q.promptAr}</div>
                  </div>

                  {showChoicesResult && (
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                    }`}>
                      {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>{isCorrect ? 'صحيح' : `الصواب: ${q.correct}`}</span>
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2" dir="ltr">
                  {q.options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleSelectChoice(q.id, opt)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer font-mono ${
                        userPick === opt
                          ? showChoicesResult
                            ? isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-purple-600 text-white shadow-md'
                          : showChoicesResult && opt === q.correct
                          ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {showChoicesResult && (
                  <p className="text-[11px] text-slate-400 mt-2">💡 التفسير: {q.explanation}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Put words in right order */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-amber-400">التمرين الثاني (ورقة عمل 3 - تمرين 8):</span>
            <h3 className="text-lg font-black text-white">Put the words in the right order (رتب الكلمات)</h3>
            <p className="text-xs text-slate-400 mt-1">اضغط على الكلمات بالترتيب الصحيح لبناء الجملة النحوية السليمة:</p>
          </div>
          <button
            onClick={() => {
              setOrderedWords({ 1: [], 2: [], 3: [] });
              setShowOrderResults(false);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة الترتيب</span>
          </button>
        </div>

        <div className="space-y-6">
          {scrambledSentences.map(s => {
            const currentSelected = orderedWords[s.id] || [];
            const remainingWords = s.shuffled.filter((w, i) => {
              const usedCount = currentSelected.filter(x => x === w).length;
              const totalInShuffled = s.shuffled.slice(0, i + 1).filter(x => x === w).length;
              return totalInShuffled > usedCount;
            });
            const targetSentence = s.words.join(' ');
            const currentSentence = currentSelected.join(' ');
            const isCorrect = currentSentence === targetSentence;

            return (
              <div key={s.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-xs text-slate-400 mb-2" dir="rtl">
                  الجملة {s.id}: <span className="text-amber-300 font-semibold">{s.translation}</span>
                </div>

                {/* Built Sentence Container */}
                <div className="min-h-[48px] p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 mb-3 flex flex-wrap items-center gap-1.5" dir="ltr">
                  {currentSelected.length === 0 ? (
                    <span className="text-xs text-slate-500 italic">اضغط على الكلمات أدناه للترتيب هنا...</span>
                  ) : (
                    currentSelected.map((w, idx) => (
                      <button
                        key={`${w}-${idx}`}
                        onClick={() => handleRemoveWord(s.id, idx)}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-rose-600 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        title="اضغط للحذف"
                      >
                        <span>{w}</span>
                        <span className="text-[10px] opacity-70">✕</span>
                      </button>
                    ))
                  )}
                </div>

                {/* Available Words Pool */}
                <div className="flex flex-wrap gap-1.5 mb-2" dir="ltr">
                  {s.shuffled.map((w, idx) => {
                    const isUsed = currentSelected.filter(x => x === w).length >= s.shuffled.filter(x => x === w).length;

                    return (
                      <button
                        key={`${w}-${idx}`}
                        disabled={isUsed}
                        onClick={() => handleAddWord(s.id, w)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isUsed
                            ? 'opacity-30 bg-slate-800 text-slate-500 cursor-not-allowed'
                            : 'bg-slate-800 hover:bg-blue-700 text-slate-200 hover:text-white border border-slate-700'
                        }`}
                      >
                        {w}
                      </button>
                    );
                  })}
                </div>

                {showOrderResults && (
                  <div className={`mt-2 p-2 rounded-lg text-xs font-bold ${isCorrect ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                    {isCorrect ? 'ترتيب سليم وممتاز! ✓' : `الصواب: ${targetSentence}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={checkAll}
          className="py-3 px-8 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black text-sm shadow-xl shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
        >
          <Trophy className="w-5 h-5 text-amber-300" />
          <span>تصحيح التمارين وحساب النتيجة النهائية</span>
        </button>
      </div>
    </div>
  );
};
