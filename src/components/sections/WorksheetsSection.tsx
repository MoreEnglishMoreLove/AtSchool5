import React, { useState } from 'react';
import { 
  FileCheck2, 
  Eye, 
  EyeOff, 
  Printer, 
  Check, 
  Sparkles, 
  Award, 
  Volume2,
  BookOpen
} from 'lucide-react';
import { CURRICULUM_WORKSHEETS, CurriculumWorksheet, WorksheetExercise } from '../../data/worksheetsData';
import { TEACHER_NAME } from '../../lib/security';
import { speechService } from '../../lib/speech';

export const WorksheetsSection: React.FC = () => {
  const [selectedWorksheetId, setSelectedWorksheetId] = useState(1);
  const [showModelAnswers, setShowModelAnswers] = useState(false);
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});

  const currentWorksheet: CurriculumWorksheet = 
    CURRICULUM_WORKSHEETS.find(w => w.id === selectedWorksheetId) || CURRICULUM_WORKSHEETS[0];

  const handleInputChange = (key: string, value: string) => {
    setUserInputs(prev => ({ ...prev, [key]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const speak = (text: string) => {
    speechService.speak(text, { rate: 0.9 });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-blue-950/80 p-6 rounded-3xl border border-amber-800/50 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold mb-2">
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>أوراق عمل المنهاج الرسمية المعتمدة - القسم 7</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              أوراق عمل المنهاج السبعة والحلول النموذجية
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              أوراق العمل السبع الأصلية المعتمدة لدى المعلمة {TEACHER_NAME}، مع إمكانية الحل والتفاعل وإظهار الحلول النموذجية المفسرة.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModelAnswers(!showModelAnswers)}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                showModelAnswers
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {showModelAnswers ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showModelAnswers ? 'إخفاء الحلول النموذجية' : 'عرض الحل النموذجي'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-2 sm:px-3.5 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="طباعة ورقة العمل"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">طباعة ورقة العمل</span>
            </button>
          </div>
        </div>

        {/* Worksheets Tabs 1 to 7 */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
          {CURRICULUM_WORKSHEETS.map(w => {
            const isSelected = selectedWorksheetId === w.id;

            return (
              <button
                key={w.id}
                onClick={() => {
                  setSelectedWorksheetId(w.id);
                  setShowModelAnswers(false);
                }}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                    : 'bg-slate-950/70 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}>
                  {w.id}
                </span>
                <span>{w.titleAr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Worksheet Document */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Document Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>إشراف وتدريس: المعلمة {TEACHER_NAME}</span>
            </div>
            <h3 className="text-xl font-black text-white">{currentWorksheet.titleAr}</h3>
            <div className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
              {currentWorksheet.titleEn}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-bold">
              الصف السادس
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
              {currentWorksheet.badge}
            </span>
          </div>
        </div>

        {/* Exercises Content */}
        <div className="py-6 space-y-8">
          {currentWorksheet.exercises.map((ex: WorksheetExercise, exIndex: number) => (
            <div key={ex.id} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
              
              {/* Exercise Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
                <div>
                  <div className="text-xs font-bold text-blue-400 mb-0.5">
                    تمرين رقم {ex.exerciseNumber}:
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                    <span>{ex.titleAr}</span>
                  </h4>
                  <div className="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                    {ex.titleEn}
                  </div>
                </div>

                {ex.instructionsAr && (
                  <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                    {ex.instructionsAr}
                  </span>
                )}
              </div>

              {/* Items Render */}
              <div className="space-y-4">
                {ex.items.map((item: any, itemIndex: number) => {
                  const itemKey = `${currentWorksheet.id}-${ex.id}-${item.id || item.num || itemIndex}`;
                  const userVal = userInputs[itemKey] || '';
                  const modelAns = item.modelAnswer || item.correctAnswer || item.answer;

                  // Extract prompt text in English and Arabic
                  const promptTextEn = item.questionEn || item.sentenceEn || item.ruleEn || item.word || item.studentEn || item.itemEn || item.en;
                  const promptTextAr = item.questionAr || item.sentenceAr || item.ruleAr || item.meaningAr || item.ar;

                  return (
                    <div 
                      key={itemKey}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1" dir="ltr">
                            <span className="text-xs font-black text-amber-400">
                              {item.num || itemIndex + 1}.
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-white">
                              {promptTextEn}
                            </span>
                            {promptTextEn && (
                              <button
                                onClick={() => speak(promptTextEn)}
                                className="p-1 rounded text-slate-400 hover:text-white"
                                title="استمع للنطق"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>

                          {promptTextAr && (
                            <div className="text-xs text-slate-400 mr-5" dir="rtl">
                              {promptTextAr}
                            </div>
                          )}
                        </div>

                        {/* Interactive Options or text inputs */}
                        <div className="w-full sm:w-auto">
                          {item.optionA && item.optionB ? (
                            <div className="flex flex-wrap gap-1.5" dir="ltr">
                              <button
                                onClick={() => handleInputChange(itemKey, 'a')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  userVal === 'a' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                              >
                                {item.optionA}
                              </button>
                              <button
                                onClick={() => handleInputChange(itemKey, 'b')}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  userVal === 'b' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                              >
                                {item.optionB}
                              </button>
                            </div>
                          ) : item.options ? (
                            <div className="flex flex-wrap gap-1.5" dir="ltr">
                              {item.options.map((opt: string) => (
                                <button
                                  key={opt}
                                  onClick={() => handleInputChange(itemKey, opt)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                    userVal === opt ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <input
                              type="text"
                              placeholder="اكتب إجابتك..."
                              value={userVal}
                              onChange={(e) => handleInputChange(itemKey, e.target.value)}
                              className="w-full sm:w-60 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white outline-none focus:border-blue-500 font-mono"
                              dir="ltr"
                            />
                          )}
                        </div>
                      </div>

                      {/* Model Answer Drawer */}
                      {showModelAnswers && modelAns && (
                        <div className="mt-3 p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-xs animate-fadeIn">
                          <div className="flex items-center gap-2 font-bold text-emerald-300 mb-1" dir="ltr">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>الحل المعتمد: <strong className="text-white underline">{modelAns}</strong></span>
                          </div>
                          {item.explanationAr && (
                            <div className="text-[11px] text-emerald-200/90 leading-relaxed mt-1" dir="rtl">
                              💡 توضيح المعلمة جيداء صقر: {item.explanationAr}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div>منهاج اللغة الإنجليزية التفاعلي - الصف السادس / الوحدة الأولى</div>
          <div className="text-amber-400 font-semibold">بإشراف وتدريس المعلمة {TEACHER_NAME}</div>
        </div>

      </div>
    </div>
  );
};
