import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Volume2, 
  Sparkles, 
  CheckSquare, 
  Plus, 
  Trash2, 
  Printer, 
  Award,
  Users,
  Smile,
  ShieldAlert
} from 'lucide-react';
import { speechService } from '../../lib/speech';
import { TEACHER_NAME } from '../../lib/security';

export const SpeakingSection: React.FC = () => {
  // Dialogue turns
  const dialogues = [
    {
      id: 1,
      speakerA: 'Ahmad',
      textA: 'Do we have to wear a school uniform?',
      arA: 'هل يجب علينا ارتداء الزي المدرسي؟',
      speakerB: 'Sami',
      textB: 'Yes, we do. We have to wear it every school day.',
      arB: 'نعم، يجب علينا ذلك. علينا ارتداؤه في كل يوم مدرسي.'
    },
    {
      id: 2,
      speakerA: 'Lina',
      textA: 'Do you have to bring lunch from home?',
      arA: 'هل يجب عليك إحضار الغداء من المنزل؟',
      speakerB: 'Nour',
      textB: "No, we don't have to bring lunch. There is a canteen at school.",
      arB: 'لا، لا يجب علينا إحضار الغداء. يوجد مقصف في المدرسة.'
    },
    {
      id: 3,
      speakerA: 'Kareem',
      textA: 'What do we have to do in the library?',
      arA: 'ماذا يجب علينا أن نفعل في المكتبة؟',
      speakerB: 'Omar',
      textB: 'We have to keep quiet and return books on time.',
      arB: 'يجب علينا التزام الهدوء وإعادة الكتب في موعدها.'
    }
  ];

  // Custom Rules Maker
  const [customRules, setCustomRules] = useState([
    { id: 1, type: 'have', text: 'arrive at school on time', isCustom: false },
    { id: 2, type: 'have', text: 'listen carefully to the teacher', isCustom: false },
    { id: 3, type: 'have', text: 'turn off mobile phones during class', isCustom: false },
    { id: 4, type: 'dont', text: 'do homework during break time', isCustom: false },
    { id: 5, type: 'dont', text: 'bring expensive items to school', isCustom: false }
  ]);

  const [newRuleText, setNewRuleText] = useState('');
  const [newRuleType, setNewRuleType] = useState<'have' | 'dont'>('have');

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleText.trim()) return;

    setCustomRules(prev => [
      ...prev,
      {
        id: Date.now(),
        type: newRuleType,
        text: newRuleText.trim(),
        isCustom: true
      }
    ]);
    setNewRuleText('');
  };

  const handleDeleteRule = (id: number) => {
    setCustomRules(prev => prev.filter(r => r.id !== id));
  };

  const speak = (text: string) => {
    speechService.speak(text, { rate: 0.9 });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-950/80 via-slate-900 to-blue-950/80 p-6 rounded-3xl border border-teal-800/50 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-bold mb-2">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>الوحدة الأولى: Speaking & Classroom Rules - القسم 6</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">استوديو المحادثة وصانع قواعد الصف</h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          تدرّب على المحادثات الإنجليزية اليومية واستمع لنطق كلا الطرفين، وقم بإنشاء وطباعة لوحة قواعد الصف الخاصة بك.
        </p>
      </div>

      {/* Speaking Studio Dialogues */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
          <Users className="w-5 h-5 text-teal-400" />
          <h3 className="text-base sm:text-lg font-bold text-white">
            محادثات المدرسة التفاعلية (Interactive School Dialogues)
          </h3>
        </div>

        <div className="space-y-4">
          {dialogues.map(d => (
            <div key={d.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              {/* Speaker A */}
              <div className="flex items-start justify-between gap-3" dir="ltr">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-300 flex items-center justify-center text-xs font-bold mt-0.5">
                    {d.speakerA[0]}
                  </div>
                  <div>
                    <div className="text-[11px] text-blue-400 font-bold">{d.speakerA}:</div>
                    <div className="text-sm font-semibold text-white">{d.textA}</div>
                    <div className="text-xs text-slate-400 mt-0.5" dir="rtl">{d.arA}</div>
                  </div>
                </div>

                <button
                  onClick={() => speak(d.textA)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-all"
                  title="استمع للمتحدث"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Speaker B */}
              <div className="flex items-start justify-between gap-3 pt-2 border-t border-slate-800/60" dir="ltr">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-600/20 text-teal-300 flex items-center justify-center text-xs font-bold mt-0.5">
                    {d.speakerB[0]}
                  </div>
                  <div>
                    <div className="text-[11px] text-teal-400 font-bold">{d.speakerB}:</div>
                    <div className="text-sm font-semibold text-emerald-300">{d.textB}</div>
                    <div className="text-xs text-slate-400 mt-0.5" dir="rtl">{d.arB}</div>
                  </div>
                </div>

                <button
                  onClick={() => speak(d.textB)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-300 hover:text-white transition-all"
                  title="استمع للمتحدث"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Classroom Rules Maker & Printable Poster */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>صانع لوحة قواعد الصف (Our Classroom Rules Maker)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              أضف قواعد جديدة واستمع لنطقها، ثم يمكنك طباعة الملصق بتوقيع المعلمة {TEACHER_NAME}.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الملصق (Print)</span>
          </button>
        </div>

        {/* Add Rule Form */}
        <form onSubmit={handleAddRule} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 mb-6">
          <div className="text-xs font-bold text-slate-300 mb-3">إضافة قاعدة جديدة إلى اللوحة:</div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <select
              value={newRuleType}
              onChange={(e) => setNewRuleType(e.target.value as 'have' | 'dont')}
              className="w-full sm:w-48 px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none"
            >
              <option value="have">We have to (يجب علينا)</option>
              <option value="dont">We don't have to (لا يجب علينا)</option>
            </select>

            <input
              type="text"
              placeholder="اكتب الفعل بالإنجليزية، مثلاً: speak English quietly in class..."
              value={newRuleText}
              onChange={(e) => setNewRuleText(e.target.value)}
              className="flex-1 w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-teal-500 font-mono"
              dir="ltr"
            />

            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة للقائمة</span>
            </button>
          </div>
        </form>

        {/* Active Poster Canvas */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-slate-950 to-blue-950/40 border-2 border-dashed border-teal-500/40 relative">
          <div className="text-center mb-6">
            <div className="text-xs font-bold text-teal-400 tracking-wider uppercase mb-1">
              MORE ENGLISH MORE LOVE - CLASSROOM POSTER
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white font-['Plus_Jakarta_Sans',sans-serif]">
              OUR OFFICIAL SCHOOL RULES
            </h4>
            <div className="text-xs text-amber-300 font-bold mt-1">
              Supervised by Teacher: {TEACHER_NAME}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Have to Column */}
            <div className="space-y-2">
              <div className="text-xs font-black text-emerald-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <CheckSquare className="w-4 h-4" />
                <span>We HAVE TO (الأشياء الملزمة):</span>
              </div>

              {customRules.filter(r => r.type === 'have').map((r, i) => (
                <div 
                  key={r.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800"
                  dir="ltr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-xs text-white font-semibold">We have to {r.text}.</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speak(`We have to ${r.text}.`)}
                      className="p-1 rounded-md text-slate-400 hover:text-white"
                      title="استمع"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {r.isCustom && (
                      <button
                        onClick={() => handleDeleteRule(r.id)}
                        className="p-1 rounded-md text-slate-500 hover:text-rose-400"
                        title="حذف"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Don't have to Column */}
            <div className="space-y-2">
              <div className="text-xs font-black text-sky-400 flex items-center gap-1.5 pb-2 border-b border-slate-800">
                <Smile className="w-4 h-4" />
                <span>We DON'T HAVE TO (غير إلزامي):</span>
              </div>

              {customRules.filter(r => r.type === 'dont').map((r, i) => (
                <div 
                  key={r.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800"
                  dir="ltr"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-xs text-white font-semibold">We don't have to {r.text}.</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speak(`We don't have to ${r.text}.`)}
                      className="p-1 rounded-md text-slate-400 hover:text-white"
                      title="استمع"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    {r.isCustom && (
                      <button
                        onClick={() => handleDeleteRule(r.id)}
                        className="p-1 rounded-md text-slate-500 hover:text-rose-400"
                        title="حذف"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
