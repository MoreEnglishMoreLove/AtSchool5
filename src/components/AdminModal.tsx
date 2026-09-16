import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  Copy, 
  Check, 
  MessageCircle, 
  UserPlus, 
  History, 
  Search, 
  Trash2, 
  Sparkles,
  AlertTriangle,
  Lock,
  Calendar,
  Share2
} from 'lucide-react';
import { 
  verifyAdminPin, 
  generateActivationCode, 
  saveTeacherGeneratedCode, 
  getTeacherGeneratedCodes, 
  deleteTeacherCodeRecord,
  getTeacherSendCodeWhatsAppUrl,
  TEACHER_NAME,
  TEACHER_ADMIN_PIN,
  SUBSCRIPTION_DAYS
} from '../lib/security';
import { GeneratedCodeRecord } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Generator states
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [notes, setNotes] = useState('');

  // History & search
  const [history, setHistory] = useState<GeneratedCodeRecord[]>(() => getTeacherGeneratedCodes());
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError(null);

    if (verifyAdminPin(enteredPin)) {
      setIsAdminUnlocked(true);
      setHistory(getTeacherGeneratedCodes());
      setPinError(null);
    } else {
      setPinError('الرمز السري غير صحيح. الرجاء إدخال الرمز الدائم المصرح للمعلمة.');
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || studentName.trim().length < 2) {
      return;
    }

    const code = generateActivationCode(studentName);
    setGeneratedCode(code);
    setCopiedCode(false);

    // Save to local history
    const newRecord = saveTeacherGeneratedCode(studentName, code, notes);
    setHistory(getTeacherGeneratedCodes());
  };

  const handleCopy = (text: string, isMain: boolean = false, id?: string) => {
    navigator.clipboard.writeText(text);
    if (isMain) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
    if (id) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm('هل أنتِ متأكدة من حذف هذا السجل من القائمة؟')) {
      const updated = deleteTeacherCodeRecord(id);
      setHistory(updated);
    }
  };

  const filteredHistory = history.filter(item => 
    item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">لوحة تحكم وتوليد الأكواد - المعلمة {TEACHER_NAME}</h2>
              <p className="text-xs text-slate-400">نظام التحقق الرياضي المستقل (صالحة لمدة {SUBSCRIPTION_DAYS} يوماً)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!isAdminUnlocked ? (
          /* PIN Entry Screen */
          <div className="p-8 max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">تسجيل دخول المعلمة</h3>
            <p className="text-xs text-slate-400 mb-6">
              هذه المنطقة مخصصة للمعلمة <span className="text-slate-200 font-semibold">{TEACHER_NAME}</span> فقط لإصدار أكواد التفعيل المعتمدة.
            </p>

            {pinError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 text-right">
                  أدخلي الرمز السري الخاص بالمعلمة (Admin PIN):
                </label>
                <input
                  type="password"
                  required
                  placeholder="•••••••••"
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-center font-mono text-lg tracking-widest focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  dir="ltr"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
              >
                تأكيد الدخول للوحة التحكم
              </button>
            </form>
          </div>
        ) : (
          /* Unlocked Admin Dashboard */
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Top Stat Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">إجمالي الأكواد الصادرة</div>
                  <div className="text-lg font-black text-white">{history.length} كود</div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">مدة صلاحية الكود</div>
                  <div className="text-lg font-black text-emerald-400">6 أشهر (180 يوماً)</div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">نوع الخوارزمية</div>
                  <div className="text-xs font-bold text-purple-300">رياضية مستقلة (Offline)</div>
                </div>
              </div>
            </div>

            {/* Code Generator Section */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>توليد كود تفعيل فوري باسم الطالب:</span>
              </h3>

              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      اسم الطالب الكامل:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: سارة المحمود"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      رقم هاتف الطالب (اختياري للإرسال المباشر):
                    </label>
                    <input
                      type="tel"
                      placeholder="مثال: +9639xxxxxxxx"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm outline-none focus:border-blue-500 font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>توليد الكود المشفر الآن</span>
                  </button>
                </div>
              </form>

              {/* Generated Result Box */}
              {generatedCode && (
                <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-600/40 animate-fadeIn">
                  <div className="text-xs text-blue-300 font-semibold mb-1">
                    كود التفعيل الحصري للطالب ({studentName}):
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-blue-500/30">
                    <div className="text-xl sm:text-2xl font-black font-mono tracking-widest text-amber-300" dir="ltr">
                      {generatedCode}
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleCopy(generatedCode, true)}
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode ? 'تم النسخ!' : 'نسخ الكود'}</span>
                      </button>

                      <a
                        href={getTeacherSendCodeWhatsAppUrl(studentName, generatedCode, studentPhone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>إرسال عبر واتساب</span>
                      </a>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">
                    💡 بمجرد إدخال هذا الكود مع اسم الطالب في هاتفه، سيفتح المنهاج فوراً ومحلياً لمدة 180 يوماً دون الحاجة لأي اتصال بالإنترنت للتحقق.
                  </p>
                </div>
              )}
            </div>

            {/* History Table */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-bold text-white">سجل الأكواد التي تم توليدها مسبقاً ({history.length}):</h3>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="بحث باسم الطالب أو الكود..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-8 pl-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {filteredHistory.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs">
                  لا توجد أكواد مطابقة في السجل حتى الآن.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2 px-3">اسم الطالب</th>
                        <th className="py-2 px-3">كود التفعيل</th>
                        <th className="py-2 px-3">تاريخ الإصدار</th>
                        <th className="py-2 px-3 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {filteredHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-2.5 px-3 font-semibold text-white">{item.studentName}</td>
                          <td className="py-2.5 px-3 font-mono text-amber-300 tracking-wider" dir="ltr">{item.code}</td>
                          <td className="py-2.5 px-3 text-slate-400">
                            {new Date(item.createdAt).toLocaleDateString('ar-EG', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-2.5 px-3">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleCopy(item.code, false, item.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-all"
                                title="نسخ الكود"
                              >
                                {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>

                              <a
                                href={getTeacherSendCodeWhatsAppUrl(item.studentName, item.code)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white transition-all"
                                title="إرسال عبر واتساب"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>

                              <button
                                onClick={() => handleDeleteRecord(item.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-400 hover:text-white transition-all"
                                title="حذف من السجل"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
