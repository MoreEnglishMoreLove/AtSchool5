import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle, 
  HelpCircle, 
  Volume2, 
  ArrowRight, 
  Sparkles,
  BookMarked,
  RotateCcw
} from 'lucide-react';
import { GRAMMAR_HAVE_TO_RULES } from '../../data/curriculumData';
import { speechService } from '../../lib/speech';

export const GrammarSection: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<'I' | 'We' | 'They' | 'You' | 'He' | 'She' | 'Nadia'>('We');
  const [selectedAction, setSelectedAction] = useState('arrive on time');

  const actions = [
    { en: 'arrive on time', ar: 'الوصول في الوقت المحدد' },
    { en: 'listen to the teacher', ar: 'الاستماع إلى المعلم' },
    { en: 'wear a school uniform', ar: 'ارتداء الزي المدرسي' },
    { en: 'do homework at home', ar: 'حل الواجب في المنزل' },
    { en: 'keep quiet in the library', ar: 'التزام الهدوء في المكتبة' }
  ];

  const isSingularThirdPerson = ['He', 'She', 'Nadia'].includes(selectedSubject);
  const correctModal = isSingularThirdPerson ? 'has to' : 'have to';
  const correctNegative = isSingularThirdPerson ? "doesn't have to" : "don't have to";
  const questionAux = isSingularThirdPerson ? 'Does' : 'Do';

  const affirmativeSentence = `${selectedSubject} ${correctModal} ${selectedAction}.`;
  const negativeSentence = `${selectedSubject} ${correctNegative} ${selectedAction}.`;
  const questionSentence = `${questionAux} ${selectedSubject.toLowerCase()} have to ${selectedAction}?`;
  const yesAnswer = isSingularThirdPerson ? `Yes, ${selectedSubject.toLowerCase()} does.` : `Yes, ${selectedSubject.toLowerCase()} do.`;
  const noAnswer = isSingularThirdPerson ? `No, ${selectedSubject.toLowerCase()} doesn't.` : `No, ${selectedSubject.toLowerCase()} don't.`;

  const speak = (text: string) => {
    speechService.speak(text, { rate: 0.9 });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-blue-950/80 p-6 rounded-3xl border border-indigo-800/50 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>الوحدة الأولى: LET'S LEARN - القسم 2</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">قاعدة الإلزام والضرورة: (have to / has to)</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          شرح تفصيلي معتمد من ورقة عمل المعلمة جيداء صقر، يوضح الفرق بين have to و has to في الإثبات والنفي والسؤال.
        </p>
      </div>

      {/* Grammar Rule Cards from Worksheet 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* have to card */}
        <div className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
              الجمع والضمير (أنا)
            </span>
            <span className="text-2xl font-black text-blue-400 font-mono">have to</span>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-4" dir="ltr">
            <div className="text-xs text-slate-400 mb-1">الضمائر التي تأخذ have to:</div>
            <div className="text-base font-black text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-300">I</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-300">we</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-300">they</span>
              <span className="px-2 py-0.5 rounded-md bg-blue-600/20 text-blue-300">you</span>
              <span className="text-slate-400 text-xs">+ have to + base verb</span>
            </div>
          </div>

          <div className="space-y-3 text-xs" dir="ltr">
            {/* Example 1 */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start justify-between">
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>I have to listen to the teacher.</span>
                </div>
                <div className="text-slate-400 mt-1" dir="rtl">يجب عليّ الاستماع إلى المعلم.</div>
              </div>
              <button 
                onClick={() => speak("I have to listen to the teacher.")}
                className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white transition-all"
                title="استمع"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Question Example */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start justify-between">
              <div>
                <div className="font-bold text-sky-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>Do we have to wear a school uniform?</span>
                </div>
                <div className="text-slate-300 text-[11px] mt-1 font-mono">
                  Yes, we do. / No, we don't.
                </div>
                <div className="text-slate-400 mt-1" dir="rtl">هل يجب علينا ارتداء زي مدرسي؟ نعم / لا</div>
              </div>
              <button 
                onClick={() => speak("Do we have to wear a school uniform? Yes, we do. No, we don't.")}
                className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white transition-all"
                title="استمع"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Negative Example */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start justify-between">
              <div>
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>You don't have to bring a sandwich with you.</span>
                </div>
                <div className="text-slate-400 mt-1" dir="rtl">لا يجب عليك إحضار شطيرة معك. يوجد مقصف هنا.</div>
              </div>
              <button 
                onClick={() => speak("You don't have to bring a sandwich with you. There's a canteen here.")}
                className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white transition-all"
                title="استمع"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* has to card */}
        <div className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20">
              المفرد الغائب
            </span>
            <span className="text-2xl font-black text-purple-400 font-mono">has to</span>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-4" dir="ltr">
            <div className="text-xs text-slate-400 mb-1">الضمائر التي تأخذ has to:</div>
            <div className="text-base font-black text-white flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-purple-600/20 text-purple-300">He</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-600/20 text-purple-300">she</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-600/20 text-purple-300">it</span>
              <span className="text-slate-400 text-xs">+ has to + base verb</span>
            </div>
          </div>

          <div className="space-y-3 text-xs" dir="ltr">
            {/* Example 1 */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start justify-between">
              <div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>He has to listen to the teacher.</span>
                </div>
                <div className="text-slate-400 mt-1" dir="rtl">يجب عليه الاستماع إلى المعلم.</div>
              </div>
              <button 
                onClick={() => speak("He has to listen to the teacher.")}
                className="p-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white transition-all"
                title="استمع"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Question Example */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start justify-between">
              <div>
                <div className="font-bold text-purple-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Does she have to wear a school uniform?</span>
                </div>
                <div className="text-slate-300 text-[11px] mt-1 font-mono">
                  Yes, she does. / No, she doesn't.
                </div>
                <div className="text-slate-400 mt-1" dir="rtl">هل يجب عليها ارتداء زي مدرسي؟ نعم / لا</div>
              </div>
              <button 
                onClick={() => speak("Does she have to wear a school uniform? Yes, she does. No, she doesn't.")}
                className="p-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white transition-all"
                title="استمع"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Negative Example */}
            <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start justify-between">
              <div>
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>He doesn't have to bring a sandwich with him.</span>
                </div>
                <div className="text-slate-400 mt-1" dir="rtl">لا يجب عليه إحضار شطيرة معه. يوجد مقصف هنا.</div>
              </div>
              <button 
                onClick={() => speak("He doesn't have to bring a sandwich with him. There's a canteen here.")}
                className="p-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white transition-all"
                title="استمع"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Sentence Lab */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-black text-white">مختبر تركيب الجمل التفاعلي (Interactive Sentence Builder)</h3>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          اختاري الفاعل والفعل لتشاهدي كيف يغيّر التطبيق الصيغة تلقائياً مع قواعد النفي والسؤال والنطق الصحيح:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Subject selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">1. اختاري الفاعل (Subject):</label>
            <div className="flex flex-wrap gap-2">
              {(['I', 'We', 'They', 'You', 'He', 'She', 'Nadia'] as const).map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSubject === sub
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Action selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">2. اختاري الالتزام (Action):</label>
            <div className="space-y-1.5">
              {actions.map((act) => (
                <button
                  key={act.en}
                  onClick={() => setSelectedAction(act.en)}
                  className={`w-full text-right p-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    selectedAction === act.en
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20'
                      : 'bg-slate-950/60 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span dir="ltr" className="font-mono">{act.en}</span>
                  <span className="text-[11px] opacity-80">{act.ar}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generated Live Outcomes */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="text-xs text-amber-300 font-bold flex items-center gap-2">
            <BookMarked className="w-4 h-4" />
            <span>النتائج النحوية المركبة تلقائياً:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs" dir="ltr">
            {/* Affirmative */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mb-1">
                  ✓ Affirmative (الإثبات)
                </span>
                <p className="text-sm font-bold text-white">
                  {selectedSubject}{' '}
                  <span className="text-emerald-400 underline">{correctModal}</span>{' '}
                  {selectedAction}.
                </p>
              </div>
              <button
                onClick={() => speak(affirmativeSentence)}
                className="mt-3 flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer w-fit"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>نطق الجملة</span>
              </button>
            </div>

            {/* Negative */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-rose-400 font-bold uppercase tracking-wider block mb-1">
                  ✕ Negative (النفي)
                </span>
                <p className="text-sm font-bold text-white">
                  {selectedSubject}{' '}
                  <span className="text-rose-400 underline">{correctNegative}</span>{' '}
                  {selectedAction}.
                </p>
              </div>
              <button
                onClick={() => speak(negativeSentence)}
                className="mt-3 flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer w-fit"
              >
                <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                <span>نطق النفي</span>
              </button>
            </div>

            {/* Question */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider block mb-1">
                  ? Question & Answers (السؤال والجواب)
                </span>
                <p className="text-sm font-bold text-white mb-1">
                  <span className="text-blue-400 underline">{questionAux}</span>{' '}
                  {selectedSubject.toLowerCase()} have to {selectedAction}?
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {yesAnswer} / {noAnswer}
                </p>
              </div>
              <button
                onClick={() => speak(`${questionSentence} ${yesAnswer} ${noAnswer}`)}
                className="mt-3 flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 py-1.5 px-2.5 rounded-lg transition-colors cursor-pointer w-fit"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                <span>نطق السؤال</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
