import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Info, 
  Play, 
  GraduationCap, 
  FlaskConical, 
  Monitor, 
  Sun, 
  Droplets, 
  Utensils, 
  Footprints,
  RotateCcw
} from 'lucide-react';
import { SCHOOL_VOCABULARY, SILENT_H_WORDS, SchoolWord } from '../../data/curriculumData';
import { speechService } from '../../lib/speech';

export const VocabularySection: React.FC = () => {
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [isSlowMode, setIsSlowMode] = useState(false);
  const [currentlySpeaking, setCurrentlySpeaking] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return GraduationCap;
      case 'FlaskConical': return FlaskConical;
      case 'Monitor': return Monitor;
      case 'Sun': return Sun;
      case 'Droplets': return Droplets;
      case 'BookOpen': return BookOpen;
      case 'Utensils': return Utensils;
      case 'Footprints': return Footprints;
      default: return BookOpen;
    }
  };

  const playSpeech = (text: string, id: string) => {
    setCurrentlySpeaking(id);
    speechService.speak(text, {
      rate: isSlowMode ? 0.7 : 0.95,
      onEnd: () => setCurrentlySpeaking(null)
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-blue-950/70 via-slate-900 to-indigo-950/70 p-6 rounded-3xl border border-blue-900/50 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>الوحدة الأولى: At School (في المدرسة) - القسم 1</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">المفردات التفاعلية ولفظ حرف "H" الصامت</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              استمع للنطق الصوتي النقي لكل كلمة ومثال، وتدرّب على تمييز الكلمات التي تحوي حرف H غير ملفوظ.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsSlowMode(!isSlowMode)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              isSlowMode 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isSlowMode ? 'rotate-180' : ''}`} />
            <span>نطق بطيء للمبتدئين: {isSlowMode ? 'مفعّل 🐢' : 'معطّل ⚡'}</span>
          </button>
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>مفردات الأماكن المدرسية (School Places)</span>
          </h3>
          <span className="text-xs text-slate-400">اضغط على أي بطاقة لسماع النطق</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCHOOL_VOCABULARY.map((word) => {
            const Icon = getIcon(word.icon);
            const isSpeaking = currentlySpeaking === word.id;
            const isSentenceSpeaking = currentlySpeaking === `${word.id}_sentence`;

            return (
              <div
                key={word.id}
                className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-4 transition-all hover:shadow-xl hover:shadow-blue-500/5 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>

                    <button
                      onClick={() => playSpeech(word.en, word.id)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        isSpeaking
                          ? 'bg-blue-600 text-white border-blue-400 animate-pulse'
                          : 'bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white border-slate-700'
                      }`}
                      title="استمع للنطق"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-2" dir="ltr">
                    <div className="text-lg font-black text-white capitalize group-hover:text-blue-300 transition-colors">
                      {word.en}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {word.phonetic}
                    </div>
                  </div>

                  <div className="text-sm font-bold text-amber-300/90 mb-3" dir="rtl">
                    {word.ar}
                  </div>
                </div>

                {/* Example Sentence */}
                <div className="pt-3 border-t border-slate-800/80 mt-2">
                  <div className="flex items-start justify-between gap-2" dir="ltr">
                    <p className="text-xs text-slate-300 italic flex-1">
                      "{word.sentenceEn}"
                    </p>
                    <button
                      onClick={() => playSpeech(word.sentenceEn, `${word.id}_sentence`)}
                      className={`p-1 rounded-md text-xs transition-colors ${
                        isSentenceSpeaking ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                      title="استمع للجملة"
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1" dir="rtl">
                    {word.sentenceAr}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phonics & Silent "h" Rule Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Info className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">قاعدة الصوتيات: لفظ حرف "h" الصامت (Silent "h")</h3>
            <p className="text-xs text-slate-400">من ورقة عمل المنهاج الرسمية المعتمدة لدى المعلمة جيداء صقر</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Group 1: Wh- words */}
          <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-blue-400">المجموعة الأولى: بعد حرف W</span>
              <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-md border border-blue-500/20">
                w + h = h صامت
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              عندما يأتي الحرف (h) بعد (w) في أدوات الاستفهام غالباً لا يلفظ أبداً:
            </p>

            <div className="space-y-2">
              {SILENT_H_WORDS.filter(w => ['what', 'when', 'why'].includes(w.id)).map(item => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3" dir="ltr">
                    <button
                      onClick={() => playSpeech(item.word, item.id)}
                      className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                      title="نطق الكلمة"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-bold text-white text-sm">
                        w<span className="text-rose-400 underline font-black">h</span>at
                      </span>
                      <span className="text-xs text-slate-400 ml-2">/wɒt/</span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-amber-300" dir="rtl">
                    {item.translation}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Initial silent h */}
          <div className="bg-slate-950/70 rounded-2xl p-4 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-purple-400">المجموعة الثانية: حرف H في أول الكلمة</span>
              <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-md border border-purple-500/20">
                Initial Silent h
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              في هذه الكلمات الإنجليزية الشهيرة، الحرف الأول (h) لا يُلفظ أبداً:
            </p>

            <div className="space-y-2">
              {SILENT_H_WORDS.filter(w => ['hour', 'honest', 'honour'].includes(w.id)).map(item => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center gap-3" dir="ltr">
                    <button
                      onClick={() => playSpeech(item.word, item.id)}
                      className="p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                      title="نطق الكلمة"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <span className="font-bold text-white text-sm">
                        <span className="text-rose-400 underline font-black">h</span>{item.word.slice(1)}
                      </span>
                      <span className="text-xs text-slate-400 ml-2">
                        {item.word === 'hour' ? '/ˈaʊ.ər/' : item.word === 'honest' ? '/ˈɒn.ɪst/' : '/ˈɒn.ər/'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-amber-300" dir="rtl">
                    {item.translation}
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
