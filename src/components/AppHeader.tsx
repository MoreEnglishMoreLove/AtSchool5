import React from 'react';
import { Sparkles, Clock, LogOut, ShieldCheck, User, Volume2, Award } from 'lucide-react';
import { StudentAuth } from '../types';
import { TEACHER_NAME, SUBSCRIPTION_DAYS } from '../lib/security';

interface AppHeaderProps {
  auth: StudentAuth;
  daysRemaining: number;
  onLogout: () => void;
  onOpenAdmin: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  auth,
  daysRemaining,
  onLogout,
  onOpenAdmin
}) => {
  // Calculate percentage of 180 days
  const percentRemaining = Math.max(0, Math.min(100, Math.round((daysRemaining / SUBSCRIPTION_DAYS) * 100)));

  return (
    <header className="sticky top-0 z-40 bg-[#09122c]/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Brand & Teacher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-wide font-['Plus_Jakarta_Sans',sans-serif] text-white">
                    MORE ENGLISH <span className="text-blue-400">MORE LOVE</span>
                  </h1>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>بإشراف وتدريس المعلمة {TEACHER_NAME}</span>
                </div>
              </div>
            </div>

            {/* Quick Gate for Teacher */}
            <button
              onClick={onOpenAdmin}
              className="md:hidden p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs"
              title="لوحة تحكم المعلمة"
            >
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </button>
          </div>

          {/* Student Status & Subscription Countdown */}
          <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Student Name Chip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400">الطالب المشترك:</div>
                <div className="font-bold text-white max-w-[130px] truncate">{auth.studentName}</div>
              </div>
            </div>

            {/* Subscription Days Remaining */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-xs">
              <Clock className="w-4 h-4 text-emerald-400 animate-spin-slow" />
              <div>
                <div className="text-[10px] text-emerald-300/80">صلاحية الاشتراك:</div>
                <div className="font-bold text-emerald-400">
                  متبقي {daysRemaining} يوم ({percentRemaining}%)
                </div>
              </div>
            </div>

            {/* Teacher Button (Desktop) */}
            <button
              onClick={onOpenAdmin}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-all text-xs cursor-pointer"
              title="لوحة تحكم المعلمة"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>بوابة المعلمة</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 text-rose-300 hover:text-rose-100 transition-all text-xs cursor-pointer"
              title="تسجيل الخروج وقفل التطبيق"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">قفل التطبيق</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
