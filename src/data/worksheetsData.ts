/**
 * 7 Curriculum Worksheets & Official Model Answers
 * Direct digital representation of Teacher Jaidaa Saqer's curriculum worksheets
 */

export interface WorksheetExercise {
  id: string;
  exerciseNumber: string;
  titleEn: string;
  titleAr: string;
  type: 'choice' | 'fill' | 'match' | 'order' | 'correction' | 'true_false' | 'table';
  instructionsEn?: string;
  instructionsAr?: string;
  items: any[];
}

export interface CurriculumWorksheet {
  id: number;
  titleEn: string;
  titleAr: string;
  badge: string;
  pageNumber: number;
  exercises: WorksheetExercise[];
}

export const CURRICULUM_WORKSHEETS: CurriculumWorksheet[] = [
  {
    id: 1,
    titleEn: 'Unit 1: At School - Vocabulary, Listening & Silent "h"',
    titleAr: 'ورقة العمل 1: المفردات المدرسية، الاستماع ولفظ حرف h الصامت',
    badge: 'Worksheet 1 (Page 4)',
    pageNumber: 4,
    exercises: [
      {
        id: 'w1_ex1',
        exerciseNumber: '1',
        titleEn: 'Listen and choose a or b',
        titleAr: 'استمع واختر a أو b',
        type: 'choice',
        items: [
          {
            num: 1,
            questionEn: 'Where are the students studying together?',
            questionAr: 'أين يدرس الطلاب معاً؟',
            optionA: 'classroom (صف دراسي)',
            optionB: 'science lab (مختبر علوم)',
            modelAnswer: 'a',
            explanationAr: 'الصورة تمثل صفاً دراسياً (classroom)'
          },
          {
            num: 2,
            questionEn: 'Where can children play outdoor games?',
            questionAr: 'أين يلعب الأطفال الألعاب في الهواء الطلق؟',
            optionA: 'computer lab (مختبر حاسوب)',
            optionB: 'playground (ساحة لعب)',
            modelAnswer: 'b',
            explanationAr: 'الصورة تمثل ساحة اللعب والأراجيح (playground)'
          },
          {
            num: 3,
            questionEn: 'Where can you read and borrow books quietly?',
            questionAr: 'أين يمكنك قراءة واستعارة الكتب بهدوء؟',
            optionA: 'playground (ساحة لعب)',
            optionB: 'library (مكتبة)',
            modelAnswer: 'b',
            explanationAr: 'الصورة تمثل المكتبة المدرسية والكتب (library)'
          },
          {
            num: 4,
            questionEn: 'Where do students wash their hands?',
            questionAr: 'أين يغسل الطلاب أيديهم؟',
            optionA: 'bathroom (حمّام)',
            optionB: 'classroom (صف دراسي)',
            modelAnswer: 'a',
            explanationAr: 'الصورة تمثل دورة المياه / الحمام (bathroom)'
          },
          {
            num: 5,
            questionEn: 'Where do students conduct science experiments?',
            questionAr: 'أين يقوم الطلاب بإجراء التجارب العلمية؟',
            optionA: 'science lab (مختبر علوم)',
            optionB: 'bathroom (حمّام)',
            modelAnswer: 'a',
            explanationAr: 'الصورة تمثل مختبر العلوم وأدوات التجارب (science lab)'
          },
          {
            num: 6,
            questionEn: 'Where do students use desktop computers and learn coding?',
            questionAr: 'أين يستخدم الطلاب الحواسيب ويتعلمون التكنولوجيا؟',
            optionA: 'computer lab (مختبر حاسوب)',
            optionB: 'science lab (مختبر علوم)',
            modelAnswer: 'a',
            explanationAr: 'الصورة تمثل مختبر الحواسيب وشاشات الكمبيوتر (computer lab)'
          }
        ]
      },
      {
        id: 'w1_ex2',
        exerciseNumber: '2',
        titleEn: 'Listen and number (Classroom Rules)',
        titleAr: 'استمع ورقم (قواعد الصف والسلوك الإيجابي)',
        type: 'match',
        items: [
          { num: 1, textEn: 'Turn off your phone / Leave mobile at home', textAr: 'أغلق هاتفك المحمول', modelOrder: 1, imageLabel: 'هاتف عليه إشارة منع' },
          { num: 2, textEn: 'Be on time / Arrive on time', textAr: 'كن في الوقت المحدد', modelOrder: 2, imageLabel: 'ساعة تدل على الالتزام بالوقت' },
          { num: 3, textEn: 'Keep the place clean', textAr: 'حافظ على نظافة المكان', modelOrder: 3, imageLabel: 'طالب يرمي المهملات في السلة' },
          { num: 4, textEn: 'Raise your hand before speaking', textAr: 'ارفع يدك قبل التحدث', modelOrder: 4, imageLabel: 'طالبة ترفع يدها بأدب في الصف' },
          { num: 5, textEn: 'Be quiet in the classroom', textAr: 'كن هادئاً (Shhh)', modelOrder: 5, imageLabel: 'طالبة تضع إصبعها على فمها لالتزام الهدوء' },
          { num: 6, textEn: 'Speak / Talk when allowed', textAr: 'تحدث عندما يؤذن لك', modelOrder: 6, imageLabel: 'طالب يتحدث بمشاركتهم' }
        ]
      },
      {
        id: 'w1_ex3',
        exerciseNumber: '3',
        titleEn: 'Pronunciation: Silent "h"',
        titleAr: 'لفظ حرف "h" الصامت',
        type: 'table',
        items: [
          { group: 'Group 1 (wh- words)', words: ['what (ماذا)', 'when (متى)', 'why (لماذا)'], rule: 'الحرف h غير ملفوظ بعد w' },
          { group: 'Group 2 (Silent initial h)', words: ['hour (ساعة)', 'honest (صادق)', 'honour (شرف)'], rule: 'الحرف h في بداية الكلمة صامت تماماً' }
        ]
      }
    ]
  },
  {
    id: 2,
    titleEn: 'Unit 1: Education Systems - Britain vs Syria',
    titleAr: 'ورقة العمل 2: المراحل التعليمية ومقارنة بريطانيا وسوريا',
    badge: 'Worksheet 2 (Page 5)',
    pageNumber: 5,
    exercises: [
      {
        id: 'w2_ex1',
        exerciseNumber: '5',
        titleEn: 'Examine the chart and fill in the blanks',
        titleAr: 'افحص الجدول وأكمل الفراغات بحسب العمر والمرحلة',
        type: 'fill',
        items: [
          { letter: 'a', student: 'Lili', age: 4, promptEn: 'Lili is 4 years old, she is in the ______ school.', promptAr: 'ليلي عمرها 4 سنوات، هي في مدرسة ______', modelAnswer: 'nursery', fullAnswer: 'nursery (رياض الأطفال)' },
          { letter: 'b', student: 'Anna', age: 13, promptEn: 'Anna is 13 years old, she is in the ______ school.', promptAr: 'آنا عمرها 13 سنة، هي في المدرسة ______', modelAnswer: 'secondary', fullAnswer: 'secondary (المدرسة الثانوية)' },
          { letter: 'c', student: 'Adam', age: 7, promptEn: 'Adam is 7 years old, he is in the ______ school.', promptAr: 'آدم عمره 7 سنوات، هو في المدرسة ______', modelAnswer: 'basic / primary', fullAnswer: 'basic / primary (المدرسة الابتدائية / الأساسية)' },
          { letter: 'd', student: 'Rasha', age: 17, promptEn: 'Rasha is 17 years old, she is in the ______ school.', promptAr: 'رشا عمرها 17 سنة، هي في المدرسة ______', modelAnswer: 'secondary', fullAnswer: 'secondary (المدرسة الثانوية)' }
        ]
      },
      {
        id: 'w2_ex2',
        exerciseNumber: '6-a',
        titleEn: 'Fill in the chart with the age (Syria vs Britain)',
        titleAr: 'أكمل جدول مقارنة الأعمار بين سوريا وبريطانيا',
        type: 'table',
        items: [
          { stage: 'Nursery (روضة أطفال)', syriaAnswer: '3', britainAnswer: '3', notes: 'كلا البلدين يبدآن في سن 3' },
          { stage: 'Basic / Primary (ابتدائي/أساسي)', syriaAnswer: '6', britainAnswer: '5', notes: 'في بريطانيا يبدأ في 5، وفي سوريا في 6' },
          { stage: 'Secondary (ثانوي)', syriaAnswer: '15', britainAnswer: '11', notes: 'في بريطانيا يبدأ في 11، وفي سوريا في 15' }
        ]
      },
      {
        id: 'w2_ex3',
        exerciseNumber: '6-b',
        titleEn: 'Write True (T) or False (F)',
        titleAr: 'اكتب صح (T) أو خطأ (F)',
        type: 'true_false',
        items: [
          {
            letter: 'a',
            statementEn: 'In Britain, students go to primary school when they are six.',
            statementAr: 'في بريطانيا، يذهب الطلاب إلى المدرسة الابتدائية عندما يكونون في السادسة.',
            modelAnswer: 'F',
            explanationAr: 'خطأ! في بريطانيا يذهبون في سن الخامسة (at age five).'
          },
          {
            letter: 'b',
            statementEn: 'In Syria, students go to nursery school then to basic school.',
            statementAr: 'في سوريا، يذهب الطلاب إلى الروضة ثم إلى المدرسة الأساسية.',
            modelAnswer: 'T',
            explanationAr: 'صحيح! يذهب الأطفال للروضة في 3 سنوات ثم المدرسة الأساسية في سن 6 سنوات.'
          },
          {
            letter: 'c',
            statementEn: 'Both in Britain and Syria, they have to take special exams to go to university.',
            statementAr: 'في كل من بريطانيا وسوريا، يجب عليهم اجتياز امتحانات خاصة للذهاب إلى الجامعة.',
            modelAnswer: 'T',
            explanationAr: 'صحيح! النص يذكر: "they have to take/pass special exams to go to university".'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    titleEn: 'Unit 1: Grammar Hub - have to / has to & Word Order',
    titleAr: 'ورقة العمل 3: قاعدة have to / has to وترتيب الجمل',
    badge: 'Worksheet 3 (Page 6)',
    pageNumber: 6,
    exercises: [
      {
        id: 'w3_ex1',
        exerciseNumber: '7',
        titleEn: 'Circle the correct word',
        titleAr: 'ضع دائرة حول الكلمة الصحيحة',
        type: 'choice',
        items: [
          {
            num: 1,
            sentenceEn: 'What do you (has to / have to) do in the classroom?',
            sentenceAr: 'ماذا يجب عليك أن تفعل في الصف؟',
            options: ['has to', 'have to'],
            modelAnswer: 'have to',
            explanationAr: 'مع الضمير you نستخدم have to دائماً.'
          },
          {
            num: 2,
            sentenceEn: 'We (have to / has to) arrive on time.',
            sentenceAr: 'يجب علينا أن نصل في الوقت المحدد.',
            options: ['have to', 'has to'],
            modelAnswer: 'have to',
            explanationAr: 'مع ضمير الجمع We نستخدم have to.'
          },
          {
            num: 3,
            sentenceEn: 'Do you (has to / have to) do your homework at school?',
            sentenceAr: 'هل يجب عليك أن تحل واجبك في المدرسة؟',
            options: ['has to', 'have to'],
            modelAnswer: 'have to',
            explanationAr: 'في صيغة السؤال مع Do you نستخدم have to.'
          },
          {
            num: 4,
            sentenceEn: "No, we (don't have to / doesn't have to) do our homework at school, we have to do it at home.",
            sentenceAr: 'لا، لا يجب علينا حل واجبنا في المدرسة، بل يجب حله في المنزل.',
            options: ["don't have to", "doesn't have to"],
            modelAnswer: "don't have to",
            explanationAr: 'مع الضمير we ننفي بـ don\'t have to وليس doesn\'t.'
          },
          {
            num: 5,
            sentenceEn: 'Does Nadia (have to / has to) wear a skirt and jacket?',
            sentenceAr: 'هل يجب على نادية ارتداء تنورة وجاكيت؟',
            options: ['have to', 'has to'],
            modelAnswer: 'have to',
            explanationAr: 'بعد فعل العمل Does في السؤال، يعود الفعل لمصدره have to المجرد.'
          },
          {
            num: 6,
            sentenceEn: 'Yes, she has to (wears / wear) a skirt and a jacket.',
            sentenceAr: 'نعم، يجب عليها ارتداء تنورة وجاكيت.',
            options: ['wears', 'wear'],
            modelAnswer: 'wear',
            explanationAr: 'بعد has to يأتي الفعل في المصدر المجرد wear بدون s.'
          }
        ]
      },
      {
        id: 'w3_ex2',
        exerciseNumber: '8',
        titleEn: 'Put the words in the right order',
        titleAr: 'رتب الكلمات لتكوين جمل صحيحة',
        type: 'order',
        items: [
          {
            num: 1,
            scrambled: ['We', 'please', 'have', 'say', 'to', 'thank', 'and', 'you'],
            modelAnswer: 'We have to say "please" and "thank you".',
            translationAr: 'يجب علينا أن نقول "من فضلك" و"شكراً".'
          },
          {
            num: 2,
            scrambled: ["don't", 'to', 'We', 'have', 'homework', 'at', 'do', 'school'],
            modelAnswer: "We don't have to do homework at school.",
            translationAr: 'لا يجب علينا إنجاز الواجب المدرسي في المدرسة.'
          },
          {
            num: 3,
            scrambled: ['you', 'Do', 'follow', 'have', 'instructions', 'to?'],
            modelAnswer: 'Do you have to follow instructions?',
            translationAr: 'هل يجب عليك اتباع التعليمات؟'
          },
          {
            num: 4,
            scrambled: ['has', 'She', 'uniform.', 'wear', 'a', 'to', 'school'],
            modelAnswer: 'She has to wear a uniform to school.',
            translationAr: 'يجب عليها ارتداء الزي المدرسي للمدرسة.'
          }
        ]
      },
      {
        id: 'w3_ex3',
        exerciseNumber: '9',
        titleEn: 'Write your classroom rules',
        titleAr: 'اكتب قواعد صفك المدرسي',
        type: 'fill',
        items: [
          { num: 1, modelAnswer: 'We have to listen to the teacher.', ar: 'يجب علينا الاستماع إلى المعلم.' },
          { num: 2, modelAnswer: 'We have to be quiet in the class.', ar: 'يجب علينا أن نكون هادئين في الصف.' },
          { num: 3, modelAnswer: "We don't have to eat in the class.", ar: 'لا يجب علينا أن نأكل في الصف.' }
        ]
      }
    ]
  },
  {
    id: 4,
    titleEn: 'Unit 1: Matching School Locations & Rules',
    titleAr: 'ورقة العمل 4: مطابقة مواقع المدرسة والأشخاص والقواعد',
    badge: 'Worksheet 4 (Page 7)',
    pageNumber: 7,
    exercises: [
      {
        id: 'w4_ex1',
        exerciseNumber: '3',
        titleEn: 'Listen and match: Where are they?',
        titleAr: 'استمع وصل: أين هم؟',
        type: 'match',
        items: [
          { personNum: 1, person: 'Nader (نادر)', correctPlace: 'computer lab (مختبر الحاسوب)', matchNumber: 2 },
          { personNum: 2, person: 'Majed (ماجد)', correctPlace: 'playground (ساحة اللعب)', matchNumber: 4 },
          { personNum: 3, person: 'Maha (مها)', correctPlace: 'library (المكتبة)', matchNumber: 5 },
          { personNum: 4, person: 'Dana (دانا)', correctPlace: 'classroom (الصف الدراسي)', matchNumber: 3 },
          { personNum: 5, person: 'Lama (لما)', correctPlace: 'science lab (مختبر العلوم)', matchNumber: 1 }
        ]
      },
      {
        id: 'w4_ex2',
        exerciseNumber: '4',
        titleEn: 'Match situations with rules',
        titleAr: 'صل بين الموقف والقاعدة المناسبة له',
        type: 'match',
        items: [
          {
            situationNum: 1,
            situationEn: 'When you have a question,',
            situationAr: 'عندما يكون لديك سؤال،',
            matchLetter: 'c',
            ruleEn: 'you have to raise your hand.',
            ruleAr: 'يجب أن ترفع يدك.'
          },
          {
            situationNum: 2,
            situationEn: 'When you need something,',
            situationAr: 'عندما تحتاج إلى شيء،',
            matchLetter: 'b',
            ruleEn: 'you have to say please and thank you.',
            ruleAr: 'يجب أن تقول من فضلك وشكراً لك.'
          },
          {
            situationNum: 3,
            situationEn: "There's a canteen in the school,",
            situationAr: 'يوجد مقصف في المدرسة،',
            matchLetter: 'd',
            ruleEn: "you don't have to bring a sandwich with you.",
            ruleAr: 'لا يجب عليك إحضار شطيرة معك.'
          },
          {
            situationNum: 4,
            situationEn: "Don't be late.",
            situationAr: 'لا تتأخر.',
            matchLetter: 'a',
            ruleEn: 'You have to come to class on time.',
            ruleAr: 'يجب عليك الحضور إلى الصف في الوقت المحدد.'
          }
        ]
      },
      {
        id: 'w4_ex3',
        exerciseNumber: '5',
        titleEn: 'Put the stages in the right order',
        titleAr: 'رتب المراحل الدراسية بالترتيب الزمني الصحيح',
        type: 'order',
        items: [
          { step: 1, stage: 'Nursery (مرحلة الروضة)' },
          { step: 2, stage: 'Basic (المرحلة الأساسية)' },
          { step: 3, stage: 'Secondary (المرحلة الثانوية)' }
        ]
      }
    ]
  },
  {
    id: 5,
    titleEn: 'Unit 1: Fill in Spaces & Classroom Etiquette',
    titleAr: 'ورقة العمل 5: إكمال الفراغات بمفردات الأماكن وآداب الصف',
    badge: 'Worksheet 5 (Page 8)',
    pageNumber: 8,
    exercises: [
      {
        id: 'w5_ex1',
        exerciseNumber: '1',
        titleEn: 'Fill in the spaces with words in the box',
        titleAr: 'املأ الفراغات بالكلمات المناسبة من الصندوق',
        instructionsEn: 'Box words: classroom, science lab, computer lab, playground, bathroom, library',
        type: 'fill',
        items: [
          {
            letter: 'a',
            sentenceEn: 'I wash my hands in the ______.',
            sentenceAr: 'أغسل يدي في ______.',
            modelAnswer: 'bathroom',
            fullAnswerAr: 'bathroom (الحمام)'
          },
          {
            letter: 'b',
            sentenceEn: 'We do chemical experiments in the ______.',
            sentenceAr: 'نجري تجارب كيميائية في ______.',
            modelAnswer: 'science lab',
            fullAnswerAr: 'science lab (مختبر العلوم)'
          },
          {
            letter: 'c',
            sentenceEn: 'I borrow books from the ______.',
            sentenceAr: 'أستعير الكتب من ______.',
            modelAnswer: 'library',
            fullAnswerAr: 'library (المكتبة)'
          },
          {
            letter: 'd',
            sentenceEn: 'There are sixteen desks in our ______.',
            sentenceAr: 'يوجد ستة عشر مقعداً في ______.',
            modelAnswer: 'classroom',
            fullAnswerAr: 'classroom (صفنا الدراسي)'
          },
          {
            letter: 'e',
            sentenceEn: 'They work on computers in the ______.',
            sentenceAr: 'يعملون على الحواسيب في ______.',
            modelAnswer: 'computer lab',
            fullAnswerAr: 'computer lab (مختبر الحاسوب)'
          },
          {
            letter: 'f',
            sentenceEn: 'We play games in the ______.',
            sentenceAr: 'نلعب الألعاب في ______.',
            modelAnswer: 'playground',
            fullAnswerAr: 'playground (ساحة اللعب)'
          }
        ]
      },
      {
        id: 'w5_ex2',
        exerciseNumber: '2',
        titleEn: 'Read and match with correct visual numbers',
        titleAr: 'اقرأ وصل برقم الصورة المعبرة عن السلوك',
        type: 'match',
        items: [
          { num: 1, ruleEn: 'I have to leave my mobile phone at home.', ruleAr: 'يجب أن أترك هاتفي المحمول في المنزل.', matchedIconNum: 2 },
          { num: 2, ruleEn: 'I have to put my hand up before speaking.', ruleAr: 'يجب أن أرفع يدي قبل التحدث.', matchedIconNum: 5 },
          { num: 3, ruleEn: 'I have to arrive on time.', ruleAr: 'يجب أن أصل في الوقت المحدد.', matchedIconNum: 1 },
          { num: 4, ruleEn: 'I have to be quiet in the classroom.', ruleAr: 'يجب أن أكون هادئاً في الصف.', matchedIconNum: 4 },
          { num: 5, ruleEn: 'I have to keep my classroom clean.', ruleAr: 'يجب أن أحافظ على نظافة صفي.', matchedIconNum: 3 },
          { num: 6, ruleEn: 'I have to say please and thank you.', ruleAr: 'يجب أن أقول من فضلك وشكراً.', matchedIconNum: 6 }
        ]
      }
    ]
  },
  {
    id: 6,
    titleEn: "Unit 1: Ameer's Story & Error Correction",
    titleAr: 'ورقة العمل 6: قصة مدرسة أمير، تصحيح الأخطاء والقواعد',
    badge: 'Worksheet 6 (Page 9)',
    pageNumber: 9,
    exercises: [
      {
        id: 'w6_ex1',
        exerciseNumber: '6-a',
        titleEn: 'Correct the underlined mistakes in the story',
        titleAr: 'صحح الأخطاء التي تحتها خط في النص',
        type: 'correction',
        items: [
          { num: 1, mistake: 'have', modelCorrection: 'has', reasonAr: 'الفاعل Our teacher مفرد، فيأخذ has to وليس have to' },
          { num: 2, mistake: 'tells', modelCorrection: 'tells', reasonAr: 'صحيحة مع ضمير الغائب المفرد' },
          { num: 3, mistake: 'has', modelCorrection: 'have', reasonAr: 'مع الضمير we نستخدم have وليس has' },
          { num: 4, mistake: 'arrives', modelCorrection: 'arrive', reasonAr: 'بعد have to يأتي الفعل مجرداً arrive' },
          { num: 5, mistake: 'walk', modelCorrection: 'to walk', reasonAr: 'يجب إضافة حرف الجر to بعد have: have to walk' },
          { num: 6, mistake: 'has', modelCorrection: 'have', reasonAr: 'بعد don\'t يأتي المصدر have to دائماً' },
          { num: 7, mistake: 'keeps', modelCorrection: 'keep', reasonAr: 'بعد to يأتي الفعل في المصدر keep بدون s' },
          { num: 8, mistake: 'does', modelCorrection: 'do', reasonAr: 'في السؤال مع الضمير you نستخدم do: what do you have to do' }
        ]
      },
      {
        id: 'w6_ex2',
        exerciseNumber: '6-b',
        titleEn: 'Write True (T) or False (F)',
        titleAr: 'اكتب صح (T) أو خطأ (F)',
        type: 'true_false',
        items: [
          { num: 1, statementEn: 'There is a place to eat in.', statementAr: 'يوجد مكان لتناول الطعام (مقصف).', modelAnswer: 'T', explanationAr: 'صحيح! يوجد canteen في المدرسة' },
          { num: 2, statementEn: 'There are only two science labs.', statementAr: 'يوجد مختبران للعلوم فقط.', modelAnswer: 'F', explanationAr: 'خطأ! النص يذكر: three science labs (ثلاثة مختبرات)' },
          { num: 3, statementEn: 'They can read in the library.', statementAr: 'يمكنهم القراءة في المكتبة.', modelAnswer: 'T', explanationAr: 'صحيح! We can read books in the library' },
          { num: 4, statementEn: 'They can run in the classroom.', statementAr: 'يمكنهم الركض في الصف.', modelAnswer: 'F', explanationAr: 'خطأ! غير مسموح بالركض في الصف والممرات' },
          { num: 5, statementEn: 'They have to keep quiet in the library.', statementAr: 'يجب عليهم التزام الهدوء في المكتبة.', modelAnswer: 'T', explanationAr: 'صحيح! they have to keep quiet there' },
          { num: 6, statementEn: 'They have to arrive at school on time.', statementAr: 'يجب عليهم الوصول إلى المدرسة في الوقت المحدد.', modelAnswer: 'T', explanationAr: 'صحيح! We have to arrive at school on time' }
        ]
      },
      {
        id: 'w6_ex3',
        exerciseNumber: '7 & 8',
        titleEn: 'Classroom rules and obligations from the text',
        titleAr: 'قواعد الالتزام وعدم الإلزام المستخرجة من النص',
        type: 'fill',
        items: [
          {
            labelEn: "Two things they don't have to do:",
            labelAr: 'أمران لا يجب عليهم فعلهما:',
            answers: [
              '1. They don\'t have to do their homework at school. (لا يجب إنجاز الواجب في المدرسة)',
              '2. They don\'t have to run in the corridors. (لا يجب الركض في الممرات)'
            ]
          },
          {
            labelEn: 'Four classroom rules they have to do:',
            labelAr: 'أربع قواعد صفية يجب عليهم الالتزام بها:',
            answers: [
              '1. They have to wear the school uniform. (ارتداء الزي المدرسي)',
              '2. They have to arrive at school on time. (الوصول في الوقت المحدد)',
              '3. They have to walk in the corridors. (المشي في الممرات وعدم الركض)',
              '4. They have to keep quiet in the library. (التزام الهدوء في المكتبة)'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 7,
    titleEn: 'Unit 1: Comprehensive Mastery & Exam Sheet',
    titleAr: 'ورقة العمل 7: المراجعة النهائية واختبار الإتقان الشامل',
    badge: 'Worksheet 7 (Full Review)',
    pageNumber: 10,
    exercises: [
      {
        id: 'w7_ex1',
        exerciseNumber: 'Final Mastery 1',
        titleEn: 'Grammar and Vocabulary Challenge',
        titleAr: 'تحدي القواعد والمفردات النهائي',
        type: 'choice',
        items: [
          {
            num: 1,
            questionEn: 'Sami ______ wear glasses when he reads.',
            questionAr: 'سامي ______ ارتداء النظارات عندما يقرأ.',
            options: ['have to', 'has to', 'having to'],
            modelAnswer: 'has to',
            explanationAr: 'سامي مفرد مذكر (He) فيأخذ has to.'
          },
          {
            num: 2,
            questionEn: 'In Britain, children begin primary school at age ______.',
            questionAr: 'في بريطانيا يبدأ الأطفال المدرسة الابتدائية في سن ______.',
            options: ['three', 'five', 'six'],
            modelAnswer: 'five',
            explanationAr: 'في بريطانيا يبدأون في سن 5 سنوات.'
          },
          {
            num: 3,
            questionEn: 'Which word contains a silent "h"?',
            questionAr: 'أي من الكلمات التالية تحتوي على حرف "h" صامت؟',
            options: ['house', 'hour', 'hat'],
            modelAnswer: 'hour',
            explanationAr: 'في كلمة hour لا نلفظ حرف h وتلفظ تماماً ككلمة our.'
          },
          {
            num: 4,
            questionEn: "There's a canteen at school, so we ______ bring food.",
            questionAr: 'يوجد مقصف بالمدرسة لذا نحن ______ إحضار طعام.',
            options: ["don't have to", "doesn't have to", "have to"],
            modelAnswer: "don't have to",
            explanationAr: 'مع we في النفي نستخدم don\'t have to.'
          }
        ]
      },
      {
        id: 'w7_ex2',
        exerciseNumber: 'Final Mastery 2',
        titleEn: 'Complete Sentence Builder',
        titleAr: 'تركيب الجمل التعبيرية النهائية',
        type: 'order',
        items: [
          {
            num: 1,
            scrambled: ['science', 'We', 'have', 'in', 'the', 'science', 'lab.'],
            modelAnswer: 'We have science in the science lab.',
            translationAr: 'لدينا مادة العلوم في مختبر العلوم.'
          },
          {
            num: 2,
            scrambled: ['corridors.', 'walk', 'You', 'have', 'to', 'in', 'the'],
            modelAnswer: 'You have to walk in the corridors.',
            translationAr: 'يجب عليك أن تمشي في الممرات.'
          }
        ]
      }
    ]
  }
];
