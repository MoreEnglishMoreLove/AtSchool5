export interface StudentAuth {
  studentName: string;
  activationCode: string;
  activatedAt: number;
  expiresAt: number;
  deviceId: string;
  isVerified: boolean;
}

export interface GeneratedCodeRecord {
  id: string;
  studentName: string;
  code: string;
  createdAt: number;
  expiresAt: number;
  notes?: string;
}

export interface VocabularyWord {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  category: string;
  exampleSentence: string;
  exampleTranslation: string;
  iconName: string;
  silentLetterRule?: string;
}

export interface GrammarRuleItem {
  subject: string;
  verbForm: 'have to' | 'has to';
  ruleArabic: string;
  examples: {
    en: string;
    ar: string;
    audioText?: string;
  }[];
  questions: {
    question: string;
    questionAr: string;
    positiveAnswer: string;
    positiveAnswerAr: string;
    negativeAnswer: string;
    negativeAnswerAr: string;
  }[];
  negatives: {
    en: string;
    ar: string;
  }[];
}

export interface ListeningExerciseItem {
  id: number;
  audioPrompt: string;
  promptAr: string;
  options: {
    label: 'a' | 'b';
    titleEn: string;
    titleAr: string;
    imageType: string;
  }[];
  correctAnswer: 'a' | 'b';
}

export interface EtiquetteItem {
  id: number;
  en: string;
  ar: string;
  correctNumber: number;
  iconType: string;
}

export interface MatchPersonItem {
  id: number;
  personName: string;
  personNameAr: string;
  correctPlaceId: number;
  avatarIndex: number;
}

export interface SchoolPlaceItem {
  id: number;
  nameEn: string;
  nameAr: string;
  iconType: string;
}

export interface MatchRuleItem {
  id: number;
  clauseEn: string;
  clauseAr: string;
  continuationEn: string;
  continuationAr: string;
  optionKey: 'a' | 'b' | 'c' | 'd';
}

export interface WorksheetData {
  id: number;
  titleEn: string;
  titleAr: string;
  description: string;
  unit: string;
  pageNumber: number;
  sections: {
    sectionNumber: number;
    titleEn: string;
    titleAr: string;
    type: 'multiple-choice' | 'fill-blanks' | 'matching' | 'reading-table' | 'error-correction' | 'word-order' | 'rules-writing';
    items: any[];
  }[];
}
