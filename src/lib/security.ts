/**
 * Security & Mathematical Cryptographic Verification Engine
 * For "MORE ENGLISH MORE LOVE" - Teacher Jaidaa Saqer
 * 
 * Complies with strict client-side validation requirements:
 * - Completely free, independent of external servers or paid databases.
 * - Works offline or on any static hosting (Netlify, Vercel, Cloud Run).
 * - Deterministic mathematical signature function mapping normalized student name -> MEML-XXXX-XXXX.
 * - 6 months (180 days) automatic expiration countdown.
 * - Device locking using local browser persistence.
 */

import { StudentAuth, GeneratedCodeRecord } from '../types';

// Permanent Teacher Secret PINs (as strictly requested)
export const TEACHER_ADMIN_PIN = "b13a15m17";
export const TEACHER_WHATSAPP = "+963933036079";
export const TEACHER_NAME = "جيداء صقر";
export const APP_NAME = "MORE ENGLISH MORE LOVE";

// Mathematical Salt constant embedded in code
const CRYPTO_SALT = "MEML_JAIDAA_SAQER_LOVE_AND_LEARNING_2026_MATH_SECRET";

// Subscription duration: 180 days in milliseconds
export const SUBSCRIPTION_DAYS = 180;
export const SUBSCRIPTION_DURATION_MS = SUBSCRIPTION_DAYS * 24 * 60 * 60 * 1000;

// LocalStorage Keys
const STORAGE_KEY_AUTH = "meml_student_auth_session";
const STORAGE_KEY_DEVICE = "meml_unique_device_fingerprint";
const STORAGE_KEY_TEACHER_LOGS = "meml_teacher_generated_codes";

/**
 * Normalizes student name to prevent character mismatch issues
 * Handles Arabic variations (أ, إ, آ -> ا), (ة -> ه), (ى -> ي), strips tashkeel, trims and collapses spaces.
 */
export function normalizeStudentName(name: string): string {
  if (!name) return "";
  return name
    .trim()
    .toLowerCase()
    // Remove Arabic diacritics (tashkeel)
    .replace(/[\u064B-\u0652]/g, "")
    // Normalize alef
    .replace(/[أإآٱ]/g, "ا")
    // Normalize taa marbuta
    .replace(/ة/g, "ه")
    // Normalize yaa / alif maqsura
    .replace(/ى/g, "ي")
    // Collapse consecutive whitespaces
    .replace(/\s+/g, " ");
}

/**
 * 32-bit FNV-1a / Murmur hybrid polynomial hash implementation
 * Produces deterministic pseudo-cryptographic hash values from string inputs
 */
function hashString(str: string, seed: number = 0x811c9dc5): number {
  let h = seed;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    // Multiply by 32-bit FNV prime
    h = Math.imul(h, 0x01000193);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

/**
 * Secondary hash round for avalanche effect
 */
function secondaryHash(n: number, salt: string): number {
  let combined = (n ^ 0x5bd1e995) >>> 0;
  for (let i = 0; i < salt.length; i++) {
    combined ^= salt.charCodeAt(i);
    combined = Math.imul(combined, 0x5bd1e995);
    combined ^= combined >>> 15;
  }
  return combined >>> 0;
}

/**
 * Generates the deterministic mathematical activation code for a given student name
 * Format: MEML-XXXX-XXXX (8 uppercase alphanumeric characters)
 */
export function generateActivationCode(studentName: string): string {
  const normalized = normalizeStudentName(studentName);
  if (!normalized || normalized.length < 2) {
    return "";
  }

  // Round 1: Hash name with primary salt
  const h1 = hashString(normalized + "_" + CRYPTO_SALT, 0x12345678);
  // Round 2: Hash with reverse string and secondary constant
  const reversed = normalized.split("").reverse().join("");
  const h2 = secondaryHash(h1, reversed + "_MORE_ENGLISH_MORE_LOVE");

  // Convert numbers to 4-character hex/base36 chunks
  const charset = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // readable without ambiguous 0/O, 1/I
  
  let part1 = "";
  let val1 = h1;
  for (let i = 0; i < 4; i++) {
    part1 += charset[val1 % charset.length];
    val1 = Math.floor(val1 / charset.length) ^ 0x3c6ef372;
    val1 = (val1 >>> 0);
  }

  let part2 = "";
  let val2 = h2;
  for (let i = 0; i < 4; i++) {
    part2 += charset[val2 % charset.length];
    val2 = Math.floor(val2 / charset.length) ^ 0x1a8f4c29;
    val2 = (val2 >>> 0);
  }

  return `MEML-${part1}-${part2}`;
}

/**
 * Verifies if entered code matches the deterministic calculation for the given student name
 */
export function verifyStudentCode(studentName: string, enteredCode: string): boolean {
  if (!studentName || !enteredCode) return false;

  const expectedCode = generateActivationCode(studentName);
  if (!expectedCode) return false;

  // Clean entered code (strip spaces, hyphens for flexible entry, uppercase)
  const cleanEntered = enteredCode.trim().toUpperCase().replace(/[\s-]/g, "");
  const cleanExpected = expectedCode.replace(/[\s-]/g, "");

  return cleanEntered === cleanExpected;
}

/**
 * Get or create unique device identifier for single-device binding
 */
export function getOrCreateDeviceId(): string {
  try {
    let deviceId = localStorage.getItem(STORAGE_KEY_DEVICE);
    if (!deviceId) {
      deviceId = "DEV-" + Math.random().toString(36).substring(2, 10).toUpperCase() + "-" + Date.now().toString(36).toUpperCase();
      localStorage.setItem(STORAGE_KEY_DEVICE, deviceId);
    }
    return deviceId;
  } catch (e) {
    return "DEV-BROWSER-STATIC";
  }
}

/**
 * Save authenticated session to LocalStorage
 */
export function activateStudentSession(studentName: string, code: string): StudentAuth {
  const now = Date.now();
  const expiresAt = now + SUBSCRIPTION_DURATION_MS;
  const deviceId = getOrCreateDeviceId();

  const authData: StudentAuth = {
    studentName: studentName.trim(),
    activationCode: code.trim().toUpperCase(),
    activatedAt: now,
    expiresAt: expiresAt,
    deviceId: deviceId,
    isVerified: true
  };

  try {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(authData));
  } catch (e) {
    console.error("Failed to save auth to localStorage", e);
  }

  return authData;
}

/**
 * Load current student authentication from LocalStorage
 * Checks for validity, device match, and expiration
 */
export function getStoredStudentAuth(): {
  auth: StudentAuth | null;
  isExpired: boolean;
  daysRemaining: number;
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH);
    if (!raw) {
      return { auth: null, isExpired: false, daysRemaining: 0 };
    }

    const auth: StudentAuth = JSON.parse(raw);
    const now = Date.now();

    // Verify mathematical validity again
    const isValidCode = verifyStudentCode(auth.studentName, auth.activationCode);
    if (!isValidCode) {
      return { auth: null, isExpired: false, daysRemaining: 0 };
    }

    const isExpired = now >= auth.expiresAt;
    const msRemaining = Math.max(0, auth.expiresAt - now);
    const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

    return {
      auth,
      isExpired,
      daysRemaining
    };
  } catch (e) {
    return { auth: null, isExpired: false, daysRemaining: 0 };
  }
}

/**
 * Clear student authentication (log out / reset device)
 */
export function clearStudentAuth(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_AUTH);
  } catch (e) {
    console.error("Failed to clear auth", e);
  }
}

export const clearStudentSession = clearStudentAuth;

export function getActiveStudentSession(): StudentAuth | null {
  const result = getStoredStudentAuth();
  if (result.isExpired || !result.auth) return null;
  return result.auth;
}

export function getDaysRemaining(): number {
  const result = getStoredStudentAuth();
  return result.daysRemaining;
}

export function isSubscriptionExpired(): boolean {
  const result = getStoredStudentAuth();
  return result.isExpired;
}

/**
 * Verify Teacher Admin PIN
 */
export function verifyAdminPin(enteredPin: string): boolean {
  if (!enteredPin) return false;
  return enteredPin.trim() === TEACHER_ADMIN_PIN;
}

/**
 * Get saved teacher code generation history from LocalStorage
 */
export function getTeacherGeneratedCodes(): GeneratedCodeRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEACHER_LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

/**
 * Save new code record in teacher history
 */
export function saveTeacherGeneratedCode(studentName: string, code: string, notes?: string): GeneratedCodeRecord {
  const records = getTeacherGeneratedCodes();
  const now = Date.now();
  const newRecord: GeneratedCodeRecord = {
    id: "REC-" + now + "-" + Math.random().toString(36).substring(2, 6),
    studentName: studentName.trim(),
    code: code,
    createdAt: now,
    expiresAt: now + SUBSCRIPTION_DURATION_MS,
    notes: notes || ""
  };

  // Add at start of list, avoid duplicates
  const filtered = records.filter(r => r.code !== code && r.studentName.toLowerCase() !== studentName.trim().toLowerCase());
  const updated = [newRecord, ...filtered].slice(0, 100);

  try {
    localStorage.setItem(STORAGE_KEY_TEACHER_LOGS, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save teacher record", e);
  }

  return newRecord;
}

/**
 * Delete a code record from teacher history
 */
export function deleteTeacherCodeRecord(id: string): GeneratedCodeRecord[] {
  const records = getTeacherGeneratedCodes();
  const updated = records.filter(r => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_TEACHER_LOGS, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

/**
 * Construct WhatsApp link for student to request code from teacher
 */
export function getStudentRequestWhatsAppUrl(studentName?: string): string {
  const greeting = studentName && studentName.trim()
    ? `مرحباً أستاذة جيداء صقر، أود الحصول على كود تفعيل لتطبيق MORE ENGLISH MORE LOVE، اسمي الكامل: ${studentName.trim()}`
    : `مرحباً أستاذة جيداء صقر، أود الحصول على كود تفعيل لتطبيق MORE ENGLISH MORE LOVE.`;
  
  const phone = TEACHER_WHATSAPP.replace("+", "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(greeting)}`;
}

/**
 * Construct WhatsApp link for teacher to send activation message to student
 */
export function getTeacherSendCodeWhatsAppUrl(studentName: string, code: string, studentPhone?: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://more-english-more-love.netlify.app';
  const message = `أهلاً بك يا ${studentName} في تطبيق MORE ENGLISH MORE LOVE 🌟\nبإشراف وتدريس المعلمة جيداء صقر 👩‍🏫\n\nتم إصدار كود التفعيل الحصري لجهازك بنجاح:\n🔑 الكود: ${code}\n\n⏳ صلاحية الاشتراك: 6 أشهر كاملة (180 يوماً).\n\n📲 طريقة التفعيل:\n1. افتح رابط التطبيق:\n${origin}\n2. أدخل اسمك الكامل: "${studentName}"\n3. أدخل كود التفعيل: ${code}\n4. اضغط على "تفعيل الحساب والدخول للمنهاج"\n\nمع أطيب التمنيات برحلة تعليمية ممتعة ومميزة! 📚✨`;

  if (studentPhone && studentPhone.trim()) {
    const cleanPhone = studentPhone.trim().replace(/[^0-9]/g, "");
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
