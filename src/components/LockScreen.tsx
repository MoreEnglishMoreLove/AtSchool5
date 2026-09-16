import React, { useState } from 'react';
import { Lock, Sparkles, MessageCircle, ShieldCheck, ArrowLeft, KeyRound, User, AlertCircle, Award } from 'lucide-react';
import { 
  verifyStudentCode, 
  activateStudentSession, 
  getStudentRequestWhatsAppUrl, 
  TEACHER_NAME, 
  TEACHER_WHATSAPP,
  SUBSCRIPTION_DAYS 
} from '../lib/security';
import { StudentAuth } from '../types';

interface LockScreenProps {
  onAuthenticated: (auth: StudentAuth) => void;
  onOpenAdmin: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onAuthenticated, onOpenAdmin }) => {
  const [studentName, setStudentName] = useState('');
  const [activationCode, setActivationCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = studentName.trim();
    const trimmedCode = activationCode.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setError('الرجاء كتابة اسمك الكامل المعتمد لدى المعلمة (كلمتان على الأقل).');
      return;
    }

    if (!trimmedCode) {
      setError('الرجاء إدخال كود التفعيل السري الخاص بك.');
      return;
    }

    setIsActivating(true);

    setTimeout(() => {
      const isValid = verifyStudentCode(trimmedName, trimmedCode);

      if (isValid) {
        const session = activateStudentSession(trimmedName, trimmedCode);
        onAuthenticated(session);
      } else {
        setError('كود التفعيل غير متطابق مع اسم الطالب. تأكد من كتابة الاسم تماماً كما سجلته المعلمة جيداء صقر، أو تواصل معها لتوليد كود جديد.');
        setIsActivating(false);
      }
    }, 400);
  };

  const whatsAppUrl = getStudentRequestWhatsAppUrl(studentName);

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Bar with Teacher Portal Access */}
      <header className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs tracking-wider font-semibold text-slate-300">منظومة التعلم الذكية 2026</span>
        </div>

        <button
          id="btn-teacher-portal-gate"
          type="button"
          onClick={onOpenAdmin}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 hover:bg-blue-950/80 border border-slate-700/60 hover:border-blue-500/50 text-xs text-slate-300 hover:text-white transition-all shadow-sm"
          title="دخول لوحة تحكم المعلمة بالرمز السري"
        >
          <KeyRound className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
          <span>بوابة المعلمة جيداء صقر</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-xl mx-auto px-4 py-6 relative z-10 flex flex-col items-center">
        {/* Branding Hero */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl shadow-blue-500/20 border border-blue-400/30">
            <Sparkles className="w-8 h-8 text-amber-300 animate-bounce" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase drop-shadow-md mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
            MORE ENGLISH <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">MORE LOVE</span>
          </h1>

          <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-bold text-amber-300/90 mb-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>بإشراف وتدريس المعلمة {TEACHER_NAME}</span>
          </div>

          <p className="text-sm text-slate-400 max-w-md mx-auto">
            تطبيق تعليمي تفاعلي شامل للمنهاج، مقفل بنظام التشفير الرياضي الحصري لضمان تجربة تعليمية مخصصة لكل طالب.
          </p>
        </div>

        {/* Lock Screen Activation Card */}
        <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">تسجيل الدخول وتفعيل الحساب</h2>
                <p className="text-xs text-slate-400">صلاحية التفعيل: {SUBSCRIPTION_DAYS} يوماً (6 أشهر كاملة)</p>
              </div>
            </div>

            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
              جهاز واحد
            </span>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">{error}</div>
            </div>
          )}

          <form onSubmit={handleActivate} className="space-y-4">
            {/* Student Full Name Input */}
            <div>
              <label htmlFor="student-name-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                اسم الطالب الكامل (كما سجلته المعلمة):
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="student-name-input"
                  type="text"
                  required
                  placeholder="مثال: أحمد عبد الله"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-slate-950/70 border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
                />
              </div>
            </div>

            {/* Student Code Input */}
            <div>
              <label htmlFor="activation-code-input" className="block text-xs font-semibold text-slate-300 mb-1.5">
                كود التفعيل السري (MEML-XXXX-XXXX):
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  id="activation-code-input"
                  type="text"
                  required
                  placeholder="MEML-XXXX-XXXX"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                  className="w-full pr-10 pl-4 py-3 bg-slate-950/70 border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-white font-mono placeholder-slate-500 text-sm outline-none transition-all tracking-wider"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Activate Button */}
            <button
              id="btn-activate-account"
              type="submit"
              disabled={isActivating}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isActivating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>جاري التحقق الرياضي من الكود...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  <span>تفعيل الحساب والدخول للمنهاج</span>
                  <ArrowLeft className="w-4 h-4 mr-1" />
                </>
              )}
            </button>
          </form>

          {/* WhatsApp Direct Request Section */}
          <div className="mt-6 pt-5 border-t border-slate-800/80">
            <div className="bg-slate-950/50 rounded-2xl p-4 border border-slate-800">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">كيف أحصل على كود تفعيل؟</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    تواصل مباشرة مع المعلمة <span className="text-slate-200 font-semibold">{TEACHER_NAME}</span> عبر واتساب لتوليد كود حصري باسمك يفتح على هاتفك لمدة 6 أشهر.
                  </p>
                </div>
              </div>

              <a
                id="btn-whatsapp-request"
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>طلب الكود عبر واتساب للمعلمة ({TEACHER_WHATSAPP})</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full max-w-4xl mx-auto px-4 py-4 text-center text-xs text-slate-500 relative z-10">
        <p>جميع حقوق المحتوى التعليمي والتصميم محفوظة © {new Date().getFullYear()} للمعلّمة {TEACHER_NAME}.</p>
      </footer>
    </div>
  );
};
