export type QuizQuestion = {
  id: string;
  question: { fr: string; en: string; ar: string };
  options: { fr: string; en: string; ar: string }[];
  correctIndex: number;
  explanation: { fr: string; en: string; ar: string };
};

export type Quiz = {
  lessonId: string;
  courseId: string;
  questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
  {
    courseId: "math-algebra-101",
    lessonId: "l1",
    questions: [
      {
        id: "q1",
        question: {
          fr: "Quel est le résultat de l'expression 3x + 2x ?",
          en: "What is the result of the expression 3x + 2x?",
          ar: "ما هي نتيجة التعبير 3x + 2x؟",
        },
        options: [
          { fr: "5x", en: "5x", ar: "5x" },
          { fr: "6x", en: "6x", ar: "6x" },
          { fr: "5x²", en: "5x²", ar: "5x²" },
          { fr: "6", en: "6", ar: "6" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "On additionne les coefficients des termes semblables : 3 + 2 = 5, donc 3x + 2x = 5x.",
          en: "We add the coefficients of like terms: 3 + 2 = 5, so 3x + 2x = 5x.",
          ar: "نجمع معاملات الحدود المتشابهة: 3 + 2 = 5، إذن 3x + 2x = 5x.",
        },
      },
      {
        id: "q2",
        question: {
          fr: "Qu'est-ce qu'une variable en algèbre ?",
          en: "What is a variable in algebra?",
          ar: "ما هو المتغير في الجبر؟",
        },
        options: [
          { fr: "Un nombre fixe", en: "A fixed number", ar: "عدد ثابت" },
          { fr: "Un symbole représentant une valeur inconnue", en: "A symbol representing an unknown value", ar: "رمز يمثل قيمة مجهولة" },
          { fr: "Une opération mathématique", en: "A mathematical operation", ar: "عملية رياضية" },
          { fr: "Un type d'équation", en: "A type of equation", ar: "نوع من المعادلات" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Une variable est un symbole (souvent une lettre) qui représente une valeur inconnue ou qui peut changer.",
          en: "A variable is a symbol (often a letter) that represents an unknown value or one that can change.",
          ar: "المتغير هو رمز (غالبًا حرف) يمثل قيمة مجهولة أو قيمة يمكن أن تتغير.",
        },
      },
      {
        id: "q3",
        question: {
          fr: "Simplifiez : 4a + 3b - 2a + b",
          en: "Simplify: 4a + 3b - 2a + b",
          ar: "بسّط: 4a + 3b - 2a + b",
        },
        options: [
          { fr: "2a + 4b", en: "2a + 4b", ar: "2a + 4b" },
          { fr: "6a + 4b", en: "6a + 4b", ar: "6a + 4b" },
          { fr: "2a + 2b", en: "2a + 2b", ar: "2a + 2b" },
          { fr: "6ab", en: "6ab", ar: "6ab" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "On regroupe les termes semblables : (4a - 2a) + (3b + b) = 2a + 4b.",
          en: "Group like terms: (4a - 2a) + (3b + b) = 2a + 4b.",
          ar: "نجمع الحدود المتشابهة: (4a - 2a) + (3b + b) = 2a + 4b.",
        },
      },
    ],
  },
  {
    courseId: "physics-mechanics-101",
    lessonId: "l1",
    questions: [
      {
        id: "q1",
        question: {
          fr: "Quelle est l'unité SI de la vitesse ?",
          en: "What is the SI unit of velocity?",
          ar: "ما هي وحدة السرعة في النظام الدولي؟",
        },
        options: [
          { fr: "km/h", en: "km/h", ar: "كم/ساعة" },
          { fr: "m/s", en: "m/s", ar: "م/ث" },
          { fr: "m/s²", en: "m/s²", ar: "م/ث²" },
          { fr: "N", en: "N", ar: "نيوتن" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "L'unité SI de la vitesse est le mètre par seconde (m/s).",
          en: "The SI unit of velocity is meters per second (m/s).",
          ar: "وحدة السرعة في النظام الدولي هي المتر في الثانية (م/ث).",
        },
      },
      {
        id: "q2",
        question: {
          fr: "L'accélération mesure :",
          en: "Acceleration measures:",
          ar: "التسارع يقيس:",
        },
        options: [
          { fr: "La distance parcourue", en: "The distance traveled", ar: "المسافة المقطوعة" },
          { fr: "La variation de la vitesse", en: "The change in velocity", ar: "تغير السرعة" },
          { fr: "La masse d'un objet", en: "The mass of an object", ar: "كتلة الجسم" },
          { fr: "La force appliquée", en: "The applied force", ar: "القوة المطبقة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "L'accélération mesure la variation de la vitesse par unité de temps (Δv/Δt).",
          en: "Acceleration measures the change in velocity per unit of time (Δv/Δt).",
          ar: "التسارع يقيس تغير السرعة لكل وحدة زمن (Δv/Δt).",
        },
      },
    ],
  },
  {
    courseId: "biology-cells-101",
    lessonId: "l1",
    questions: [
      {
        id: "q1",
        question: {
          fr: "Quel organite est présent dans la cellule végétale mais pas dans la cellule animale ?",
          en: "Which organelle is present in plant cells but not in animal cells?",
          ar: "أي عضية موجودة في الخلية النباتية وليست في الخلية الحيوانية؟",
        },
        options: [
          { fr: "Mitochondrie", en: "Mitochondria", ar: "الميتوكوندريا" },
          { fr: "Chloroplaste", en: "Chloroplast", ar: "البلاستيدة الخضراء" },
          { fr: "Noyau", en: "Nucleus", ar: "النواة" },
          { fr: "Ribosome", en: "Ribosome", ar: "الريبوسوم" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le chloroplaste est l'organite responsable de la photosynthèse, présent uniquement dans les cellules végétales.",
          en: "The chloroplast is the organelle responsible for photosynthesis, found only in plant cells.",
          ar: "البلاستيدة الخضراء هي العضية المسؤولة عن التمثيل الضوئي، وتوجد فقط في الخلايا النباتية.",
        },
      },
      {
        id: "q2",
        question: {
          fr: "Quelle est la fonction principale de la membrane cellulaire ?",
          en: "What is the main function of the cell membrane?",
          ar: "ما هي الوظيفة الرئيسية للغشاء الخلوي؟",
        },
        options: [
          { fr: "Produire de l'énergie", en: "Produce energy", ar: "إنتاج الطاقة" },
          { fr: "Stocker l'ADN", en: "Store DNA", ar: "تخزين الحمض النووي" },
          { fr: "Contrôler les échanges avec l'extérieur", en: "Control exchanges with the outside", ar: "التحكم في التبادلات مع الخارج" },
          { fr: "Synthétiser les protéines", en: "Synthesize proteins", ar: "تصنيع البروتينات" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "La membrane cellulaire est semi-perméable et contrôle les échanges de substances entre la cellule et son environnement.",
          en: "The cell membrane is semi-permeable and controls the exchange of substances between the cell and its environment.",
          ar: "الغشاء الخلوي شبه منفذ ويتحكم في تبادل المواد بين الخلية وبيئتها.",
        },
      },
    ],
  },
];

export function getQuiz(courseId: string, lessonId: string): Quiz | undefined {
  return quizzes.find((q) => q.courseId === courseId && q.lessonId === lessonId);
}
