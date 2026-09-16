/**
 * Curriculum Data for Unit 1: "At School" (في المدرسة)
 * Based on Teacher Jaidaa Saqer's official curriculum worksheets
 */

export interface SchoolWord {
  id: string;
  en: string;
  ar: string;
  phonetic: string;
  category: 'place' | 'rule' | 'stage';
  icon: string;
  sentenceEn: string;
  sentenceAr: string;
}

export const SCHOOL_VOCABULARY: SchoolWord[] = [
  {
    id: 'classroom',
    en: 'classroom',
    ar: 'صف دراسي',
    phonetic: '/ˈklɑːs.ruːm/',
    category: 'place',
    icon: 'GraduationCap',
    sentenceEn: 'There are sixteen desks in our classroom.',
    sentenceAr: 'يوجد ستة عشر مكتباً في صفنا الدراسي.'
  },
  {
    id: 'science_lab',
    en: 'science lab',
    ar: 'مختبر علوم',
    phonetic: '/ˈsaɪ.əns læb/',
    category: 'place',
    icon: 'FlaskConical',
    sentenceEn: 'We do chemical experiments in the science lab.',
    sentenceAr: 'نقوم بتجارب كيميائية في مختبر العلوم.'
  },
  {
    id: 'computer_lab',
    en: 'computer lab',
    ar: 'مختبر حاسوب',
    phonetic: '/kəmˈpjuː.tər læb/',
    category: 'place',
    icon: 'Monitor',
    sentenceEn: 'They work on computers in the computer lab.',
    sentenceAr: 'يعملون على الحواسيب في مختبر الحاسوب.'
  },
  {
    id: 'playground',
    en: 'playground',
    ar: 'ساحة لعب / باحة',
    phonetic: '/ˈpleɪ.ɡraʊnd/',
    category: 'place',
    icon: 'Sun',
    sentenceEn: 'We play games in the playground.',
    sentenceAr: 'نلعب الألعاب في ساحة اللعب.'
  },
  {
    id: 'bathroom',
    en: 'bathroom',
    ar: 'حمّام',
    phonetic: '/ˈbɑːθ.ruːm/',
    category: 'place',
    icon: 'Droplets',
    sentenceEn: 'I wash my hands in the bathroom.',
    sentenceAr: 'أغسل يدي في الحمام.'
  },
  {
    id: 'library',
    en: 'library',
    ar: 'مكتبة',
    phonetic: '/ˈlaɪ.brər.i/',
    category: 'place',
    icon: 'BookOpen',
    sentenceEn: 'I borrow books from the library.',
    sentenceAr: 'أستعير الكتب من المكتبة.'
  },
  {
    id: 'canteen',
    en: 'canteen',
    ar: 'مقصف مدرسي',
    phonetic: '/kænˈtiːn/',
    category: 'place',
    icon: 'Utensils',
    sentenceEn: "There is a canteen in the school, you don't have to bring a sandwich.",
    sentenceAr: 'يوجد مقصف في المدرسة، لا يجب عليك إحضار شطيرة معك.'
  },
  {
    id: 'corridor',
    en: 'corridor',
    ar: 'ممر',
    phonetic: '/ˈkɒr.ɪ.dɔːr/',
    category: 'place',
    icon: 'Footprints',
    sentenceEn: "Don't run in the corridor, you have to walk.",
    sentenceAr: 'لا تركض في الممر، يجب أن تمشي.'
  }
];

export interface SilentWord {
  id: string;
  word: string;
  translation: string;
  silentLetter: string;
  ruleExplanationEn: string;
  ruleExplanationAr: string;
  example: string;
}

export const SILENT_H_WORDS: SilentWord[] = [
  {
    id: 'what',
    word: 'what',
    translation: 'ماذا',
    silentLetter: 'h',
    ruleExplanationEn: 'The letter "h" is silent after "w"',
    ruleExplanationAr: 'حرف "h" صامت بعد حرف "w"',
    example: 'What do you have in your bag?'
  },
  {
    id: 'when',
    word: 'when',
    translation: 'متى',
    silentLetter: 'h',
    ruleExplanationEn: 'The letter "h" is silent after "w"',
    ruleExplanationAr: 'حرف "h" صامت بعد حرف "w"',
    example: 'When does the lesson start?'
  },
  {
    id: 'why',
    word: 'why',
    translation: 'لماذا',
    silentLetter: 'h',
    ruleExplanationEn: 'The letter "h" is silent after "w"',
    ruleExplanationAr: 'حرف "h" صامت بعد حرف "w"',
    example: 'Why are you smiling?'
  },
  {
    id: 'hour',
    word: 'hour',
    translation: 'ساعة (60 دقيقة)',
    silentLetter: 'h',
    ruleExplanationEn: 'Initial "h" is silent, pronounced like "our"',
    ruleExplanationAr: 'حرف "h" في بداية الكلمة صامت تماماً وتُلفظ مثل "our"',
    example: 'We study for one hour.'
  },
  {
    id: 'honest',
    word: 'honest',
    translation: 'صادق / أمين',
    silentLetter: 'h',
    ruleExplanationEn: 'Initial "h" is silent',
    ruleExplanationAr: 'حرف "h" في بداية الكلمة صامت',
    example: 'He is an honest student.'
  },
  {
    id: 'honour',
    word: 'honour',
    translation: 'شرف / احترام',
    silentLetter: 'h',
    ruleExplanationEn: 'Initial "h" is silent',
    ruleExplanationAr: 'حرف "h" في بداية الكلمة صامت',
    example: 'It is an honour to meet you.'
  }
];

export interface GrammarRule {
  id: string;
  titleEn: string;
  titleAr: string;
  pronouns: string[];
  form: string;
  formAr: string;
  explanationAr: string;
  affirmativeExample: { en: string; ar: string };
  negativeExample: { en: string; ar: string };
  questionExample: { 
    qEn: string; 
    qAr: string; 
    yesEn: string; 
    yesAr: string; 
    noEn: string; 
    noAr: string; 
  };
}

export const GRAMMAR_HAVE_TO_RULES: GrammarRule[] = [
  {
    id: 'have_to',
    titleEn: 'have to (الالتزام والضرورة)',
    titleAr: 'استخدام have to مع ضمائر الجمع والضمير أنا',
    pronouns: ['I', 'we', 'they', 'you'],
    form: 'have to + base verb',
    formAr: 'have to + الفعل بالمصدر المجرد',
    explanationAr: 'نستخدم have to للتعبير عن واجب أو التزام وقواعد يجب على الشخص الالتزام بها.',
    affirmativeExample: {
      en: 'I have to listen to the teacher.',
      ar: 'يجب عليّ الاستماع إلى المعلم.'
    },
    negativeExample: {
      en: "You don't have to bring a sandwich with you. There's a canteen here.",
      ar: 'لا يجب عليك إحضار شطيرة معك، يوجد مقصف هنا.'
    },
    questionExample: {
      qEn: 'Do we have to wear a school uniform?',
      qAr: 'هل يجب علينا ارتداء زي مدرسي؟',
      yesEn: 'Yes, we do.',
      yesAr: 'نعم، يجب علينا ذلك.',
      noEn: "No, we don't.",
      noAr: 'لا، لا يجب علينا ذلك.'
    }
  },
  {
    id: 'has_to',
    titleEn: 'has to (الالتزام للمفرد الغائب)',
    titleAr: 'استخدام has to مع ضمائر المفرد الغائب',
    pronouns: ['He', 'she', 'it'],
    form: 'has to + base verb',
    formAr: 'has to + الفعل بالمصدر المجرد',
    explanationAr: 'نستخدم has to مع المفرد الغائب (هو / هي / هو لغير العاقل). وعند النفي نستخدم doesn\'t have to.',
    affirmativeExample: {
      en: 'He has to listen to the teacher.',
      ar: 'يجب عليه الاستماع إلى المعلم.'
    },
    negativeExample: {
      en: "He doesn't have to bring a sandwich with him.",
      ar: 'لا يجب عليه إحضار شطيرة معه.'
    },
    questionExample: {
      qEn: 'Does she have to wear a school uniform?',
      qAr: 'هل يجب عليها ارتداء زي مدرسي؟',
      yesEn: 'Yes, she does.',
      yesAr: 'نعم، يجب عليها ذلك.',
      noEn: "No, she doesn't.",
      noAr: 'لا، لا يجب عليها ذلك.'
    }
  }
];

export interface SchoolStage {
  stageEn: string;
  stageAr: string;
  grades: string;
  ageSyria: number;
  ageBritain: number;
}

export const SCHOOL_STAGES: SchoolStage[] = [
  {
    stageEn: 'Nursery',
    stageAr: 'روضة أطفال',
    grades: 'KG.1 - 2 - 3',
    ageSyria: 3,
    ageBritain: 3
  },
  {
    stageEn: 'Basic / Primary',
    stageAr: 'التعليم الأساسي / الابتدائي',
    grades: 'Grades 1 - 9 (Syria) / Primary 5-11 (Britain)',
    ageSyria: 6,
    ageBritain: 5
  },
  {
    stageEn: 'Secondary',
    stageAr: 'التعليم الثانوي',
    grades: 'Grades 10 - 11 - 12 (Syria) / Secondary 11-18 (Britain)',
    ageSyria: 15,
    ageBritain: 11
  }
];

export interface AmeerStoryError {
  id: number;
  wrongWord: string;
  correctWord: string;
  explanationAr: string;
  contextSentence: string;
}

export const AMEER_STORY_ERRORS: AmeerStoryError[] = [
  {
    id: 1,
    wrongWord: 'have',
    correctWord: 'has',
    explanationAr: 'الفاعل "Our teacher" مفرد، لذا نستخدم has to وليس have to',
    contextSentence: 'Our teacher have to read the roll call...'
  },
  {
    id: 2,
    wrongWord: 'tells',
    correctWord: 'tells',
    explanationAr: 'الفعل tells صحيح مع المفرد الغائب (معلمنا يخبرنا)',
    contextSentence: '...and tells us that we...'
  },
  {
    id: 3,
    wrongWord: 'has',
    correctWord: 'have',
    explanationAr: 'الضمير we جمع، لذا نستخدم have to وليس has to',
    contextSentence: '...that we has to wear our school uniform.'
  },
  {
    id: 4,
    wrongWord: 'arrives',
    correctWord: 'arrive',
    explanationAr: 'بعد have to يأتي الفعل دائماً في المصدر المجرد (arrive) بدون s',
    contextSentence: 'We have to arrives at school on time.'
  },
  {
    id: 5,
    wrongWord: 'walk',
    correctWord: 'to walk',
    explanationAr: 'يجب أن يتبع have بحرف الجر to متبوعاً بالمصدر: have to walk',
    contextSentence: '...but we have walk in the corridors.'
  },
  {
    id: 6,
    wrongWord: 'has',
    correctWord: 'have',
    explanationAr: 'بعد don\'t يأتي المصدر have to دائماً حتى لو كان الفاعل مفرداً أو جمعاً',
    contextSentence: "We don't has to do our homework at school."
  },
  {
    id: 7,
    wrongWord: 'keeps',
    correctWord: 'keep',
    explanationAr: 'بعد have to يأتي الفعل مجرداً (keep) وليس keeps',
    contextSentence: '...but we have to keeps quiet there.'
  },
  {
    id: 8,
    wrongWord: 'does',
    correctWord: 'do',
    explanationAr: 'مع الضمير you في صيغة السؤال نستخدم do وليس does',
    contextSentence: '...what does you have to do in your classroom?'
  }
];

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/MoreEnglishMoreLove/',
  youtube: 'https://www.youtube.com/@MoreEnglishMoreLove',
  instagram: 'https://www.instagram.com/moreenglishmorelove/',
  telegram: 'https://t.me/moreenglishmorelove',
  whatsapp: 'https://wa.me/963933036079',
  phoneFormatted: '+963 933 036 079',
  teacherName: 'جيداء صقر',
  teacherTitle: 'T. Jaidaa Saqer in English'
};
