import React, { useState, useEffect } from 'react';
import { 
  getActiveStudentSession, 
  getDaysRemaining, 
  isSubscriptionExpired, 
  clearStudentSession,
  TEACHER_NAME,
  TEACHER_WHATSAPP
} from './lib/security';
import { StudentAuth } from './types';
import { LockScreen } from './components/LockScreen';
import { AdminModal } from './components/AdminModal';
import { AppHeader } from './components/AppHeader';
import { Navigation, SectionKey } from './components/Navigation';
import { VocabularySection } from './components/sections/VocabularySection';
import { GrammarSection } from './components/sections/GrammarSection';
import { ListeningLabSection } from './components/sections/ListeningLabSection';
import { ReadingSection } from './components/sections/ReadingSection';
import { QuizSection } from './components/sections/QuizSection';
import { SpeakingSection } from './components/sections/SpeakingSection';
import { WorksheetsSection } from './components/sections/WorksheetsSection';
import { MessageCircle, Heart, ShieldAlert } from 'lucide-react';

export default function App() {
  const [auth, setAuth] = useState<StudentAuth | null>(() => getActiveStudentSession());
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('vocabulary');
  const [daysRemaining, setDaysRemaining] = useState(() => getDaysRemaining());
  const [expired, setExpired] = useState(() => isSubscriptionExpired());

  // Check expiration periodically
  useEffect(() => {
    const checkExpiration = () => {
      const isExp = isSubscriptionExpired();
      setExpired(isExp);
      setDaysRemaining(getDaysRemaining());
      if (isExp && auth) {
        clearStudentSession();
        setAuth(null);
      }
    };

    const interval = setInterval(checkExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [auth]);

  const handleAuthenticated = (newSession: StudentAuth) => {
    setAuth(newSession);
    setDaysRemaining(getDaysRemaining());
    setExpired(false);
  };

  const handleLogout = () => {
    if (confirm('هل أنت متأكد من تسجيل الخروج وقفل المنهاج على هذا الجهاز؟')) {
      clearStudentSession();
      setAuth(null);
    }
  };

  // If not logged in or session expired -> show Lock Screen
  if (!auth || expired) {
    return (
      <>
        <LockScreen 
          onAuthenticated={handleAuthenticated} 
          onOpenAdmin={() => setIsAdminOpen(true)} 
        />
        <AdminModal 
          isOpen={isAdminOpen} 
          onClose={() => setIsAdminOpen(false)} 
        />
      </>
    );
  }

  // Active Authenticated App
  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background ambient gradient glow */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Sticky Header */}
      <AppHeader
        auth={auth}
        daysRemaining={daysRemaining}
        onLogout={handleLogout}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Sticky Section Navigation */}
      <Navigation
        activeSection={activeSection}
        onSelectSection={setActiveSection}
      />

      {/* Main Learning Hub Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 relative z-10">
        {activeSection === 'vocabulary' && <VocabularySection />}
        {activeSection === 'grammar' && <GrammarSection />}
        {activeSection === 'listening' && <ListeningLabSection />}
        {activeSection === 'reading' && <ReadingSection />}
        {activeSection === 'quiz' && <QuizSection />}
        {activeSection === 'speaking' && <SpeakingSection />}
        {activeSection === 'worksheets' && <WorksheetsSection />}
      </main>

      {/* Teacher Admin Modal */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Footer */}
      <footer className="w-full bg-slate-950/90 border-t border-slate-800/80 py-6 text-slate-400 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">MORE ENGLISH MORE LOVE</span>
            <span>•</span>
            <span className="text-amber-400">بإشراف وتدريس المعلمة {TEACHER_NAME}</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${TEACHER_WHATSAPP.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>واتساب المعلمة: {TEACHER_WHATSAPP}</span>
            </a>

            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              بوابة المعلمة
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
