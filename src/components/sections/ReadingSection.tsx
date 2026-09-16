import React, { useState } from 'react';
import { 
  FileText, 
  Volume2, 
  Check, 
  X, 
  HelpCircle, 
  Sparkles, 
  Globe, 
  BookOpen, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { speechService } from '../../lib/speech';
import confetti from 'canvas-confetti';

export const ReadingSection: React.FC = () => {
  // Reading 1: Britain vs Syria
  const [activeTab, setActiveTab] = useState<'britain_syria' | 'ameer_story'>('britain_syria');

  // Fill in blanks answers
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({});
  const [showFillResults, setShowFillResults] = useState(false);

  // True / False answers
  const [tfAnswers, setTfAnswers] = useState<Record<string, 'T' | 'F'>>({});
  const [showTfResults, setShowTfResults] = useState(false);

  // Ameer errors check
  const [errorCorrections, setErrorCorrections] = useState<Record<number, string>>({});
  const [showCorrectionResults, setShowCorrectionResults] = useState(false);

  const speak = (text: string) => {
    speechService.speak(text, { rate: 0.9 });
  };

  const britainSyriaText = `In Britain, children go to nursery school when they are three. All children have to go to primary school when they are five and then to secondary school when they are eleven. They have to take special exams when they are eighteen to go to university.

However, in Syria children go to nursery school at the age of three. All children have to go to the basic school when they are six. Then they begin the secondary school at age of fifteen. In order to go to university, they have to pass special exams.`;

  const ameerText = `Hi. I am Ameer. My new school is very big. It has a big playground, a big library, three computer labs, twenty classrooms, three science labs, four bathrooms and a canteen. It's my first day. Our teacher has to read the roll call and tells us that we have to wear our school uniform. We have to arrive at school on time. We can play in the playground, but we have to walk in the corridors. We don't have to do our homework at school. We can read books in the library but we have to keep quiet there. What about you, what do you have to do in your classroom?`;

  const fillItems = [
    { key: 'lili', name: 'Lili', age: 4, correct: 'nursery', prompt: 'Lili is 4 years old, she is in the ________ school.' },
    { key: 'anna', name: 'Anna', age: 13, correct: 'secondary', prompt: 'Anna is 13 years old, she is in the ________ school.' },
    { key: 'adam', name: 'Adam', age: 7, correct: 'basic', prompt: 'Adam is 7 years old, he is in the ________ (basic / primary) school.' },
    { key: 'rasha', name: 'Rasha', age: 17, correct: 'secondary', prompt: 'Rasha is 17 years old, she is in the ________ school.' }
  ];

  const tfItems = [
    {
      id: 'tf1',
      statementEn: 'In Britain, students go to primary school when they are six.',
      statementAr: 'في بريطانيا، يذهب الطلاب للمدرسة الابتدائية في سن السادسة.',
      correct: 'F',
      explanation: 'خطأ! في بريطانيا يبدأون في سن الخامسة (at age five).'
    },
    {
      id: 'tf2',
      statementEn: 'In Syria, students go to nursery school then to basic school.',
      statementAr: 'في سوريا، يذهب الطلاب إلى الروضة ثم إلى المدرسة الأساسية.',
      correct: 'T',
      explanation: 'صحيح! يذهبون للروضة في 3 سنوات ثم الأساسية في 6 سنوات.'
    },
    {
      id: 'tf3',
      statementEn: 'Both in Britain and Syria, they have to take special exams to go to university.',
      statementAr: 'في كل من بريطانيا وسوريا، يجب عليهم اجتياز امتحانات خاصة للذهاب للجامعة.',
      correct: 'T',
      explanation: 'صحيح! كلا النظامين يتطلبان امتحانات خاصة لدخول الجامعة.'
    }
  ];

  const ameerErrorsList = [
    { id: 1, wrong: 'have', correct: 'has', explanation: 'الفاعل Our teacher مفرد يأخذ has to' },
    { id: 3, wrong: 'has', correct: 'have', explanation: 'الضمير we جمع يأخذ have to' },
    { id: 4, wrong: 'arrives', correct: 'arrive', explanation: 'بعد have to يأتي المصدر مجرداً' },
    { id: 5, wrong: 'walk', correct: 'to walk', explanation: 'الصيغة الصحيحة هي have to walk' },
    { id: 6, wrong: 'has', correct: 'have', explanation: 'بعد النفي don\'t نضع المصدر have' },
    { id: 7, wrong: 'keeps', correct: 'keep', explanation: 'بعد to يأتي الفعل مجرداً keep' },
    { id: 8, wrong: 'does', correct: 'do', explanation: 'في السؤال مع you نستخدم do' }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-blue-950/80 p-6 rounded-3xl border border-emerald-800/50 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>الوحدة الأولى: Reading & Comprehension - القسم 4</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">نصوص القراءة والفهم والاستيعاب</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          نصوص القراءة الأصلية مع المقارنة بين النظامين التعليميين في بريطانيا وسوريا، واكتشاف الأخطاء النحوية وتصحيحها.
        </p>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('britain_syria')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'britain_syria'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>نص 1: مقارنة سوريا وبريطانيا (School Ages)</span>
          </button>

          <button
            onClick={() => setActiveTab('ameer_story')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'ameer_story'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>نص 2: مدرسة أمير وتصحيح الأخطاء (Ameer's Story)</span>
          </button>
        </div>
      </div>

      {activeTab === 'britain_syria' ? (
        /* Reading 1 Content */
        <div className="space-y-6">
          {/* Text Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <span>النص القرائي: School Stages in Britain and Syria</span>
              </h3>
              <button
                onClick={() => speak(britainSyriaText)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>قراءة النص كاملاً بالإنجليزية</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800 font-sans" dir="ltr">
                <div className="font-bold text-sky-300 mb-2">🇬🇧 In Britain:</div>
                <p className="text-slate-200 mb-3">
                  Children go to nursery school when they are <span className="font-bold text-amber-300">three</span>. 
                  All children have to go to primary school when they are <span className="font-bold text-amber-300">five</span> and 
                  then to secondary school when they are <span className="font-bold text-amber-300">eleven</span>. 
                  They have to take special exams when they are eighteen to go to university.
                </p>
                <div className="font-bold text-emerald-300 mb-2">🇸🇾 In Syria:</div>
                <p className="text-slate-200">
                  Children go to nursery school at the age of <span className="font-bold text-amber-300">three</span>. 
                  All children have to go to the basic school when they are <span className="font-bold text-amber-300">six</span>. 
                  Then they begin secondary school at the age of <span className="font-bold text-amber-300">fifteen</span>. 
                  In order to go to university, they have to pass special exams.
                </p>
              </div>

              {/* Summary Comparison Table from Worksheet 2 */}
              <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
                <div className="font-bold text-amber-300 mb-3 text-sm">جدول مقارنة الأعمار المعتمد من ورقة العمل:</div>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-700 text-slate-300">
                        <th className="py-2 px-2">المرحلة الدراسية</th>
                        <th className="py-2 px-2 text-center text-emerald-400">🇸🇾 سوريا</th>
                        <th className="py-2 px-2 text-center text-sky-400">🇬🇧 بريطانيا</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="py-2 px-2 font-semibold">Nursery (الروضة)</td>
                        <td className="py-2 px-2 text-center font-bold text-amber-300">3 سنوات</td>
                        <td className="py-2 px-2 text-center font-bold text-amber-300">3 سنوات</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-semibold">Basic / Primary (الابتدائي)</td>
                        <td className="py-2 px-2 text-center font-bold text-emerald-300">6 سنوات</td>
                        <td className="py-2 px-2 text-center font-bold text-sky-300">5 سنوات</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-2 font-semibold">Secondary (الثانوي)</td>
                        <td className="py-2 px-2 text-center font-bold text-emerald-300">15 سنة</td>
                        <td className="py-2 px-2 text-center font-bold text-sky-300">11 سنة</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tasks: Fill blanks */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4">
              تمرين 5 (ورقة عمل 2): أكمل المرحلة المناسبة لعمر كل طالب (nursery / basic / secondary):
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fillItems.map((item) => {
                const userVal = fillAnswers[item.key] || '';
                const isCorrect = userVal.toLowerCase().trim() === item.correct;

                return (
                  <div key={item.key} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-amber-300">{item.name} ({item.age} years old)</span>
                      {showFillResults && (
                        <span className={`px-2 py-0.5 rounded-md font-bold ${isCorrect ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                          {isCorrect ? 'صحيح ✓' : `الحل: ${item.correct}`}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {(['nursery', 'basic', 'secondary'] as const).map(opt => (
                        <button
                          key={opt}
                          onClick={() => setFillAnswers(prev => ({ ...prev, [item.key]: opt }))}
                          className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            userVal === opt
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowFillResults(true)}
                className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                تأكيد الإجابات
              </button>
            </div>
          </div>

          {/* True / False */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4">
              تمرين 6-b (ورقة عمل 2): اكتب صح (T) أو خطأ (F):
            </h3>

            <div className="space-y-3 text-xs">
              {tfItems.map(item => {
                const userChoice = tfAnswers[item.id];
                const isCorrect = userChoice === item.correct;

                return (
                  <div key={item.id} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="font-bold text-white mb-1" dir="ltr">{item.statementEn}</div>
                      <div className="text-slate-400">{item.statementAr}</div>
                      {showTfResults && (
                        <div className={`mt-1.5 text-[11px] font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {item.explanation}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setTfAnswers(prev => ({ ...prev, [item.id]: 'T' }))}
                        className={`w-10 h-10 rounded-xl font-black transition-all cursor-pointer ${
                          userChoice === 'T' ? 'bg-emerald-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        T
                      </button>
                      <button
                        onClick={() => setTfAnswers(prev => ({ ...prev, [item.id]: 'F' }))}
                        className={`w-10 h-10 rounded-xl font-black transition-all cursor-pointer ${
                          userChoice === 'F' ? 'bg-rose-600 text-white' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        F
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowTfResults(true)}
                className="py-2 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                تحقق من صحة العبارات
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Reading 2: Ameer's Story & Error Correction */
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span>قصة مدرسة أمير (Ameer's New School) - من ورقة عمل 6</span>
              </h3>
              <button
                onClick={() => speak(ameerText)}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>استمع للقصة كاملة</span>
              </button>
            </div>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans mb-6" dir="ltr">
              Hi. I am Ameer. My new school is very big. It has a big playground, a big library, three computer labs, twenty classrooms, three science labs, four bathrooms and a canteen. It's my first day. 
              Our teacher <span className="text-rose-400 underline font-bold">have</span> to read the roll call and tells us that we <span className="text-rose-400 underline font-bold">has</span> to wear our school uniform. 
              We have to <span className="text-rose-400 underline font-bold">arrives</span> at school on time. 
              We can play in the playground, but we have <span className="text-rose-400 underline font-bold">walk</span> in the corridors. 
              We don't <span className="text-rose-400 underline font-bold">has</span> to do our homework at school. 
              We can read books in the library but we have to <span className="text-rose-400 underline font-bold">keeps</span> quiet there. 
              What about you, what <span className="text-rose-400 underline font-bold">does</span> you have to do in your classroom?
            </div>

            <div className="text-xs font-bold text-amber-300 mb-3">
              معمل تصحيح الأخطاء النحوية الثمانية (Correct the underlined mistakes):
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {ameerErrorsList.map(err => {
                const userVal = errorCorrections[err.id] || '';
                const isCorrect = userVal.toLowerCase().trim() === err.correct;

                return (
                  <div key={err.id} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-mono text-rose-400 font-bold" dir="ltr">
                        الخطأ: "{err.wrong}"
                      </div>
                      {showCorrectionResults && (
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${isCorrect ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                          {isCorrect ? 'صحيح ✓' : `الصواب: ${err.correct}`}
                        </span>
                      )}
                    </div>

                    <input
                      type="text"
                      placeholder={`اكتب التصحيح الصحيح لـ ${err.wrong}...`}
                      value={userVal}
                      onChange={(e) => setErrorCorrections(prev => ({ ...prev, [err.id]: e.target.value }))}
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-xs outline-none focus:border-blue-500"
                      dir="ltr"
                    />

                    {showCorrectionResults && (
                      <p className="text-[11px] text-slate-400 mt-1.5" dir="rtl">
                        💡 {err.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowCorrectionResults(true)}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                تصحيح أخطاء النص
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
