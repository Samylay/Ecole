export type Subject = "math" | "physics" | "biology";

export type Level = "middle" | "high";

export type Lesson = {
  id: string;
  title: { fr: string; en: string; ar: string };
  duration: string;
  videoUrl: string;
  description: { fr: string; en: string; ar: string };
  documents?: { name: string; url: string }[];
};

export type Chapter = {
  id: string;
  title: { fr: string; en: string; ar: string };
  lessons: Lesson[];
};

export type QuizQuestion = {
  id: string;
  question: { fr: string; en: string; ar: string };
  options: { fr: string; en: string; ar: string }[];
  correctIndex: number;
  explanation: { fr: string; en: string; ar: string };
  lessonId: string; // the lesson the explanation links back to
};

export type Course = {
  id: string;
  subject: Subject;
  level: Level;
  title: { fr: string; en: string; ar: string };
  description: { fr: string; en: string; ar: string };
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
    bio: { fr: string; en: string; ar: string };
  };
  totalLessons: number;
  totalHours: number;
  studentCount: number;
  rating: number;
  chapters: Chapter[];
};

// "Nord Campus" subject tokens: bg = soft tint, text = deep (AA on tint), accent = solid.
// New subject = new oklch hue in globals.css (chimie 55, info 210, …) + a row here.
export const subjectColors: Record<Subject, { bg: string; text: string; accent: string; stroke: string }> = {
  math: { bg: "bg-math-soft", text: "text-math-deep dark:text-math", accent: "bg-math", stroke: "text-math" },
  physics: { bg: "bg-physics-soft", text: "text-physics-deep dark:text-physics", accent: "bg-physics", stroke: "text-physics" },
  biology: { bg: "bg-biology-soft", text: "text-biology-deep dark:text-biology", accent: "bg-biology", stroke: "text-biology" },
};

export const subjectIcons: Record<Subject, string> = {
  math: "π",
  physics: "⚛",
  biology: "🧬",
};

export const courses: Course[] = [
  {
    id: "math-algebra-101",
    subject: "math",
    level: "middle",
    title: { fr: "Algèbre - Les bases", en: "Algebra - The Basics", ar: "الجبر - الأساسيات" },
    description: {
      fr: "Maîtrisez les fondamentaux de l'algèbre : équations, expressions et fonctions.",
      en: "Master the fundamentals of algebra: equations, expressions, and functions.",
      ar: "أتقن أساسيات الجبر: المعادلات والتعابير والدوال.",
    },
    thumbnail: "/thumbnails/math-algebra.svg",
    instructor: {
      name: "Pr. Karim Benali",
      avatar: "/avatars/karim.svg",
      bio: {
        fr: "Professeur de mathématiques avec 15 ans d'expérience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "أستاذ رياضيات بخبرة 15 سنة",
      },
    },
    totalLessons: 10,
    totalHours: 7,
    studentCount: 2340,
    rating: 4.8,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Introduction à l'algèbre", en: "Introduction to Algebra", ar: "مقدمة في الجبر" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Qu'est-ce que l'algèbre ?", en: "What is Algebra?", ar: "ما هو الجبر؟" },
            duration: "12:30",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Découvrez les concepts fondamentaux de l'algèbre.",
              en: "Discover the fundamental concepts of algebra.",
              ar: "اكتشف المفاهيم الأساسية للجبر.",
            },
            documents: [{ name: "intro-algebre.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l2",
            title: { fr: "Variables et constantes", en: "Variables and Constants", ar: "المتغيرات والثوابت" },
            duration: "15:45",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Apprenez à différencier les variables des constantes.",
              en: "Learn to differentiate variables from constants.",
              ar: "تعلم التفريق بين المتغيرات والثوابت.",
            },
          },
          {
            id: "l3",
            title: { fr: "Expressions algébriques", en: "Algebraic Expressions", ar: "التعابير الجبرية" },
            duration: "18:20",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Maîtrisez la construction et la simplification d'expressions algébriques.",
              en: "Master building and simplifying algebraic expressions.",
              ar: "أتقن بناء وتبسيط التعابير الجبرية.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Équations du premier degré", en: "First-Degree Equations", ar: "معادلات الدرجة الأولى" },
        lessons: [
          {
            id: "l4",
            title: { fr: "Résoudre une équation simple", en: "Solving a Simple Equation", ar: "حل معادلة بسيطة" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Techniques pour résoudre des équations du premier degré.",
              en: "Techniques for solving first-degree equations.",
              ar: "تقنيات لحل معادلات الدرجة الأولى.",
            },
            documents: [{ name: "equations-exercices.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l5",
            title: { fr: "Équations avec fractions", en: "Equations with Fractions", ar: "معادلات بالكسور" },
            duration: "22:15",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Apprenez à résoudre des équations contenant des fractions.",
              en: "Learn to solve equations containing fractions.",
              ar: "تعلم حل المعادلات التي تحتوي على كسور.",
            },
          },
        ],
      },
      {
        id: "ch3",
        title: { fr: "Systèmes d'équations", en: "Systems of Equations", ar: "أنظمة المعادلات" },
        lessons: [
          {
            id: "l6",
            title: { fr: "Introduction aux systèmes", en: "Introduction to Systems", ar: "مقدمة في الأنظمة" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Comprendre ce qu'est un système d'équations à deux inconnues.",
              en: "Understanding a system of two equations with two unknowns.",
              ar: "فهم نظام معادلتين بمجهولين.",
            },
          },
          {
            id: "l7",
            title: { fr: "Méthode par substitution", en: "Substitution Method", ar: "طريقة التعويض" },
            duration: "20:30",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Résoudre un système par substitution d'une variable.",
              en: "Solve a system by substituting one variable.",
              ar: "حل النظام بتعويض متغير.",
            },
            documents: [{ name: "systemes-methode.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l8",
            title: { fr: "Méthode par élimination", en: "Elimination Method", ar: "طريقة الحذف" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Résoudre un système en éliminant une variable par combinaison.",
              en: "Solve a system by eliminating a variable through combination.",
              ar: "حل النظام بحذف متغير بالتركيب.",
            },
          },
        ],
      },
      {
        id: "ch4",
        title: { fr: "Inégalités", en: "Inequalities", ar: "المتراجحات" },
        lessons: [
          {
            id: "l9",
            title: { fr: "Introduction aux inégalités", en: "Introduction to Inequalities", ar: "مقدمة في المتراجحات" },
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Les symboles < > ≤ ≥ et leur sens mathématique.",
              en: "The symbols < > ≤ ≥ and their mathematical meaning.",
              ar: "الرموز < > ≤ ≥ ومعناها الرياضي.",
            },
          },
          {
            id: "l10",
            title: { fr: "Résoudre des inégalités", en: "Solving Inequalities", ar: "حل المتراجحات" },
            duration: "19:00",
            videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ", // ILLUSTRATIVE placeholder (Big Buck Bunny, CC-BY) pending real Algèbre video production — see ROADMAP P3-T2
            description: {
              fr: "Techniques pour résoudre et représenter des inégalités.",
              en: "Techniques to solve and represent inequalities.",
              ar: "تقنيات لحل المتراجحات وتمثيلها.",
            },
            documents: [{ name: "inegalites-exercices.pdf", url: "/documents/placeholder.pdf" }],
          },
        ],
      },
    ],
  },
  {
    id: "math-geometry-201",
    subject: "math",
    level: "high",
    title: { fr: "Géométrie - Figures et théorèmes", en: "Geometry - Figures and Theorems", ar: "الهندسة - الأشكال والنظريات" },
    description: {
      fr: "Explorez la géométrie euclidienne : triangles, cercles, théorème de Pythagore et Thalès.",
      en: "Explore Euclidean geometry: triangles, circles, Pythagorean and Thales' theorems.",
      ar: "استكشف الهندسة الإقليدية: المثلثات، الدوائر، نظرية فيثاغورس وطاليس.",
    },
    thumbnail: "/thumbnails/math-geometry.svg",
    instructor: {
      name: "Pr. Karim Benali",
      avatar: "/avatars/karim.svg",
      bio: {
        fr: "Professeur de mathématiques avec 15 ans d'expérience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "أستاذ رياضيات بخبرة 15 سنة",
      },
    },
    totalLessons: 7,
    totalHours: 6,
    studentCount: 1890,
    rating: 4.7,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Les triangles", en: "Triangles", ar: "المثلثات" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Types de triangles", en: "Types of Triangles", ar: "أنواع المثلثات" },
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Classification des triangles par côtés et par angles.",
              en: "Classifying triangles by sides and angles.",
              ar: "تصنيف المثلثات حسب الأضلاع والزوايا.",
            },
          },
          {
            id: "l2",
            title: { fr: "Théorème de Pythagore", en: "Pythagorean Theorem", ar: "نظرية فيثاغورس" },
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre et appliquer le théorème de Pythagore.",
              en: "Understanding and applying the Pythagorean theorem.",
              ar: "فهم وتطبيق نظرية فيثاغورس.",
            },
            documents: [{ name: "pythagore-resume.pdf", url: "/documents/placeholder.pdf" }],
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Les cercles", en: "Circles", ar: "الدوائر" },
        lessons: [
          {
            id: "l3",
            title: { fr: "Le cercle et ses éléments", en: "The Circle and Its Elements", ar: "الدائرة وعناصرها" },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Rayon, diamètre, corde, arc : les composants fondamentaux.",
              en: "Radius, diameter, chord, arc: the fundamental components.",
              ar: "النصف قطر، القطر، الوتر، القوس: المكونات الأساسية.",
            },
          },
          {
            id: "l4",
            title: { fr: "Aire et périmètre", en: "Area and Perimeter", ar: "المساحة والمحيط" },
            duration: "18:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Calculer l'aire et le périmètre d'un cercle avec π.",
              en: "Calculate the area and perimeter of a circle using π.",
              ar: "حساب مساحة ومحيط الدائرة باستخدام π.",
            },
            documents: [{ name: "cercle-formules.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l5",
            title: { fr: "Théorème de Thalès", en: "Thales' Theorem", ar: "نظرية طاليس" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Appliquer le théorème de Thalès pour calculer des longueurs.",
              en: "Apply Thales' theorem to calculate lengths.",
              ar: "تطبيق نظرية طاليس لحساب الأطوال.",
            },
          },
        ],
      },
      {
        id: "ch3",
        title: { fr: "Applications géométriques", en: "Geometric Applications", ar: "التطبيقات الهندسية" },
        lessons: [
          {
            id: "l6",
            title: { fr: "Constructions géométriques", en: "Geometric Constructions", ar: "الإنشاءات الهندسية" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Utiliser la règle et le compas pour des constructions précises.",
              en: "Use ruler and compass for precise constructions.",
              ar: "استخدام المسطرة والبرجل للإنشاءات الدقيقة.",
            },
          },
          {
            id: "l7",
            title: { fr: "Problèmes de géométrie", en: "Geometry Problems", ar: "مسائل هندسية" },
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Résoudre des problèmes complexes combinant plusieurs théorèmes.",
              en: "Solve complex problems combining multiple theorems.",
              ar: "حل مسائل معقدة تجمع عدة نظريات.",
            },
            documents: [{ name: "geometrie-problemes.pdf", url: "/documents/placeholder.pdf" }],
          },
        ],
      },
    ],
  },
  {
    id: "math-statistics-102",
    subject: "math",
    level: "middle",
    title: { fr: "Statistiques et probabilités", en: "Statistics and Probability", ar: "الإحصاء والاحتمالات" },
    description: {
      fr: "Apprenez à collecter, organiser et interpréter des données. Initiation aux probabilités.",
      en: "Learn to collect, organize, and interpret data. Introduction to probability.",
      ar: "تعلم جمع البيانات وتنظيمها وتفسيرها. مقدمة في الاحتمالات.",
    },
    thumbnail: "/thumbnails/math-statistics.svg",
    instructor: {
      name: "Pr. Karim Benali",
      avatar: "/avatars/karim.svg",
      bio: {
        fr: "Professeur de mathématiques avec 15 ans d'expérience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "أستاذ رياضيات بخبرة 15 سنة",
      },
    },
    totalLessons: 6,
    totalHours: 4,
    studentCount: 1120,
    rating: 4.6,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Collecte et organisation des données", en: "Data Collection and Organization", ar: "جمع البيانات وتنظيمها" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Introduction aux statistiques", en: "Introduction to Statistics", ar: "مقدمة في الإحصاء" },
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Qu'est-ce que la statistique et pourquoi est-elle utile ?",
              en: "What is statistics and why is it useful?",
              ar: "ما هو الإحصاء ولماذا هو مفيد؟",
            },
          },
          {
            id: "l2",
            title: { fr: "Tableaux et graphiques", en: "Tables and Graphs", ar: "الجداول والرسوم البيانية" },
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Représenter des données sous forme de tableaux, histogrammes et diagrammes.",
              en: "Represent data as tables, histograms, and diagrams.",
              ar: "تمثيل البيانات على شكل جداول ومدرجات تكرارية ومخططات.",
            },
            documents: [{ name: "graphiques-exercices.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l3",
            title: { fr: "Fréquences et pourcentages", en: "Frequencies and Percentages", ar: "التكرارات والنسب المئوية" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Calculer les fréquences relatives et les pourcentages d'une série.",
              en: "Calculate relative frequencies and percentages of a dataset.",
              ar: "حساب التكرارات النسبية والنسب المئوية لسلسلة بيانات.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Mesures statistiques", en: "Statistical Measures", ar: "المقاييس الإحصائية" },
        lessons: [
          {
            id: "l4",
            title: { fr: "Moyenne et médiane", en: "Mean and Median", ar: "المتوسط والوسيط" },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Calculer et interpréter la moyenne arithmétique et la médiane.",
              en: "Calculate and interpret the arithmetic mean and median.",
              ar: "حساب وتفسير المتوسط الحسابي والوسيط.",
            },
            documents: [{ name: "mesures-cours.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l5",
            title: { fr: "Mode et étendue", en: "Mode and Range", ar: "المنوال والمدى" },
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Identifier le mode et calculer l'étendue d'une série statistique.",
              en: "Identify the mode and calculate the range of a dataset.",
              ar: "تحديد المنوال وحساب المدى لسلسلة إحصائية.",
            },
          },
          {
            id: "l6",
            title: { fr: "Introduction aux probabilités", en: "Introduction to Probability", ar: "مقدمة في الاحتمالات" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre la notion de probabilité avec des expériences aléatoires simples.",
              en: "Understand probability through simple random experiments.",
              ar: "فهم مفهوم الاحتمال من خلال تجارب عشوائية بسيطة.",
            },
            documents: [{ name: "probabilites-intro.pdf", url: "/documents/placeholder.pdf" }],
          },
        ],
      },
    ],
  },
  {
    id: "math-trigonometry-301",
    subject: "math",
    level: "high",
    title: { fr: "Trigonométrie", en: "Trigonometry", ar: "حساب المثلثات" },
    description: {
      fr: "Maîtrisez le cercle trigonométrique, les fonctions sinus, cosinus et tangente et leurs applications.",
      en: "Master the trigonometric circle, sine, cosine, and tangent functions and their applications.",
      ar: "أتقن الدائرة المثلثية ودوال الجيب وجيب التمام والظل وتطبيقاتها.",
    },
    thumbnail: "/thumbnails/math-trigonometry.svg",
    instructor: {
      name: "Pr. Karim Benali",
      avatar: "/avatars/karim.svg",
      bio: {
        fr: "Professeur de mathématiques avec 15 ans d'expérience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "أستاذ رياضيات بخبرة 15 سنة",
      },
    },
    totalLessons: 8,
    totalHours: 6,
    studentCount: 980,
    rating: 4.7,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Le cercle trigonométrique", en: "The Trigonometric Circle", ar: "الدائرة المثلثية" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Angles et radians", en: "Angles and Radians", ar: "الزوايا والراديان" },
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Convertir entre degrés et radians, comprendre la mesure des angles.",
              en: "Convert between degrees and radians, understand angle measurement.",
              ar: "التحويل بين الدرجات والراديان وفهم قياس الزوايا.",
            },
          },
          {
            id: "l2",
            title: { fr: "Le cercle unité", en: "The Unit Circle", ar: "دائرة الوحدة" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Placer des angles sur le cercle unité et lire les coordonnées.",
              en: "Place angles on the unit circle and read coordinates.",
              ar: "وضع الزوايا على دائرة الوحدة وقراءة الإحداثيات.",
            },
            documents: [{ name: "cercle-trigo.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l3",
            title: { fr: "Cosinus et sinus d'un angle", en: "Cosine and Sine of an Angle", ar: "جيب التمام والجيب لزاوية" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Définir cos(x) et sin(x) à partir du cercle trigonométrique.",
              en: "Define cos(x) and sin(x) from the trigonometric circle.",
              ar: "تعريف cos(x) و sin(x) من الدائرة المثلثية.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Fonctions trigonométriques", en: "Trigonometric Functions", ar: "الدوال المثلثية" },
        lessons: [
          {
            id: "l4",
            title: { fr: "Fonction cosinus", en: "Cosine Function", ar: "دالة جيب التمام" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Étude de la fonction cosinus : représentation, période et propriétés.",
              en: "Study of the cosine function: representation, period, and properties.",
              ar: "دراسة دالة جيب التمام: التمثيل والدورة والخصائص.",
            },
          },
          {
            id: "l5",
            title: { fr: "Fonction sinus", en: "Sine Function", ar: "دالة الجيب" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Étude de la fonction sinus : représentation, période et symétries.",
              en: "Study of the sine function: representation, period, and symmetries.",
              ar: "دراسة دالة الجيب: التمثيل والدورة والتناظرات.",
            },
            documents: [{ name: "fonctions-trigo.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l6",
            title: { fr: "Fonction tangente", en: "Tangent Function", ar: "دالة الظل" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Définition et représentation de la fonction tangente.",
              en: "Definition and representation of the tangent function.",
              ar: "تعريف وتمثيل دالة الظل.",
            },
          },
        ],
      },
      {
        id: "ch3",
        title: { fr: "Applications", en: "Applications", ar: "التطبيقات" },
        lessons: [
          {
            id: "l7",
            title: { fr: "Équations trigonométriques", en: "Trigonometric Equations", ar: "المعادلات المثلثية" },
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Résoudre des équations de la forme sin(x) = a et cos(x) = a.",
              en: "Solve equations of the form sin(x) = a and cos(x) = a.",
              ar: "حل معادلات من الشكل sin(x) = a و cos(x) = a.",
            },
            documents: [{ name: "equations-trigo-exercices.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l8",
            title: { fr: "Problèmes de géométrie", en: "Geometry Problems", ar: "مسائل هندسية" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Utiliser la trigonométrie pour résoudre des problèmes de géométrie plane.",
              en: "Use trigonometry to solve plane geometry problems.",
              ar: "استخدام المثلثات لحل مسائل الهندسة المستوية.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "physics-mechanics-101",
    subject: "physics",
    level: "high",
    title: { fr: "Mécanique - Mouvement et forces", en: "Mechanics - Motion and Forces", ar: "الميكانيكا - الحركة والقوى" },
    description: {
      fr: "Comprendre les lois du mouvement, la gravité et les forces fondamentales. De Newton à la cinématique.",
      en: "Understand the laws of motion, gravity, and fundamental forces. From Newton to kinematics.",
      ar: "فهم قوانين الحركة والجاذبية والقوى الأساسية. من نيوتن إلى الكينماتيكا.",
    },
    thumbnail: "/thumbnails/physics-mechanics.svg",
    instructor: {
      name: "Dr. Amina Tazi",
      avatar: "/avatars/amina.svg",
      bio: {
        fr: "Docteure en physique, 10 ans d'enseignement",
        en: "PhD in Physics, 10 years of teaching",
        ar: "دكتورة في الفيزياء، بخبرة 10 سنوات في التدريس",
      },
    },
    totalLessons: 7,
    totalHours: 8,
    studentCount: 3120,
    rating: 4.9,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Cinématique", en: "Kinematics", ar: "الكينماتيكا" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Position, vitesse et accélération", en: "Position, Velocity, and Acceleration", ar: "الموقع والسرعة والتسارع" },
            duration: "18:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les grandeurs fondamentales du mouvement.",
              en: "The fundamental quantities of motion.",
              ar: "الكميات الأساسية للحركة.",
            },
            documents: [{ name: "cinematique-formules.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l2",
            title: { fr: "Mouvement rectiligne uniforme", en: "Uniform Linear Motion", ar: "الحركة المستقيمة المنتظمة" },
            duration: "16:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Étudier le mouvement à vitesse constante.",
              en: "Study motion at constant velocity.",
              ar: "دراسة الحركة بسرعة ثابتة.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Les lois de Newton", en: "Newton's Laws", ar: "قوانين نيوتن" },
        lessons: [
          {
            id: "l3",
            title: { fr: "Première loi de Newton", en: "Newton's First Law", ar: "قانون نيوتن الأول" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Le principe d'inertie expliqué simplement.",
              en: "The principle of inertia explained simply.",
              ar: "مبدأ القصور الذاتي بشرح مبسط.",
            },
          },
          {
            id: "l4",
            title: { fr: "F = ma : La deuxième loi", en: "F = ma: The Second Law", ar: "F = ma: القانون الثاني" },
            duration: "22:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre la relation entre force, masse et accélération.",
              en: "Understanding the relationship between force, mass, and acceleration.",
              ar: "فهم العلاقة بين القوة والكتلة والتسارع.",
            },
            documents: [{ name: "newton-exercices.pdf", url: "/documents/placeholder.pdf" }],
          },
        ],
      },
      {
        id: "ch3",
        title: { fr: "Énergie et travail", en: "Energy and Work", ar: "الطاقة والشغل" },
        lessons: [
          {
            id: "l5",
            title: { fr: "Travail d'une force", en: "Work of a Force", ar: "شغل قوة" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Calculer le travail effectué par une force sur un déplacement.",
              en: "Calculate the work done by a force over a displacement.",
              ar: "حساب الشغل الذي تنجزه قوة على إزاحة.",
            },
            documents: [{ name: "travail-energie.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l6",
            title: { fr: "Énergie cinétique", en: "Kinetic Energy", ar: "الطاقة الحركية" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Définition et calcul de l'énergie cinétique d'un objet en mouvement.",
              en: "Definition and calculation of the kinetic energy of a moving object.",
              ar: "تعريف وحساب الطاقة الحركية لجسم متحرك.",
            },
          },
          {
            id: "l7",
            title: { fr: "Énergie potentielle", en: "Potential Energy", ar: "الطاقة الكامنة" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "L'énergie potentielle gravitationnelle et la conservation de l'énergie.",
              en: "Gravitational potential energy and conservation of energy.",
              ar: "الطاقة الكامنة الثقالية وحفظ الطاقة.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "physics-electricity-101",
    subject: "physics",
    level: "middle",
    title: { fr: "Électricité - Circuits et courant", en: "Electricity - Circuits and Current", ar: "الكهرباء - الدوائر والتيار" },
    description: {
      fr: "Découvrez les bases de l'électricité : tension, intensité, résistance et loi d'Ohm.",
      en: "Discover the basics of electricity: voltage, current, resistance, and Ohm's law.",
      ar: "اكتشف أساسيات الكهرباء: الجهد، التيار، المقاومة وقانون أوم.",
    },
    thumbnail: "/thumbnails/physics-electricity.svg",
    instructor: {
      name: "Dr. Amina Tazi",
      avatar: "/avatars/amina.svg",
      bio: {
        fr: "Docteure en physique, 10 ans d'enseignement",
        en: "PhD in Physics, 10 years of teaching",
        ar: "دكتورة في الفيزياء، بخبرة 10 سنوات في التدريس",
      },
    },
    totalLessons: 5,
    totalHours: 4,
    studentCount: 1560,
    rating: 4.6,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Les bases de l'électricité", en: "Electricity Basics", ar: "أساسيات الكهرباء" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Qu'est-ce que le courant électrique ?", en: "What is Electric Current?", ar: "ما هو التيار الكهربائي؟" },
            duration: "13:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Introduction au courant électrique et aux circuits.",
              en: "Introduction to electric current and circuits.",
              ar: "مقدمة في التيار الكهربائي والدوائر.",
            },
          },
          {
            id: "l2",
            title: { fr: "La loi d'Ohm", en: "Ohm's Law", ar: "قانون أوم" },
            duration: "17:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre la relation U = R × I.",
              en: "Understanding the relationship V = R × I.",
              ar: "فهم العلاقة U = R × I.",
            },
            documents: [{ name: "loi-ohm-resume.pdf", url: "/documents/placeholder.pdf" }],
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Circuits électriques", en: "Electrical Circuits", ar: "الدوائر الكهربائية" },
        lessons: [
          {
            id: "l3",
            title: { fr: "Circuits en série", en: "Series Circuits", ar: "دوائر التوالي" },
            duration: "17:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Analyser un circuit en série : courant, tension et résistances.",
              en: "Analyze a series circuit: current, voltage, and resistors.",
              ar: "تحليل دائرة التوالي: التيار والجهد والمقاومات.",
            },
          },
          {
            id: "l4",
            title: { fr: "Circuits en parallèle", en: "Parallel Circuits", ar: "دوائر التوازي" },
            duration: "19:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Analyser un circuit en parallèle et calculer les résistances équivalentes.",
              en: "Analyze a parallel circuit and calculate equivalent resistances.",
              ar: "تحليل دائرة التوازي وحساب المقاومات المكافئة.",
            },
            documents: [{ name: "circuits-exercices.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l5",
            title: { fr: "Puissance électrique", en: "Electrical Power", ar: "القدرة الكهربائية" },
            duration: "21:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Calculer la puissance consommée par un appareil électrique.",
              en: "Calculate the power consumed by an electrical device.",
              ar: "حساب القدرة المستهلكة من جهاز كهربائي.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "physics-optics-102",
    subject: "physics",
    level: "middle",
    title: { fr: "Optique - La lumière", en: "Optics - Light", ar: "البصريات - الضوء" },
    description: {
      fr: "Explorez la nature de la lumière, la réflexion, la réfraction et les lentilles.",
      en: "Explore the nature of light, reflection, refraction, and lenses.",
      ar: "استكشف طبيعة الضوء والانعكاس والانكسار والعدسات.",
    },
    thumbnail: "/thumbnails/physics-optics.svg",
    instructor: {
      name: "Dr. Amina Tazi",
      avatar: "/avatars/amina.svg",
      bio: {
        fr: "Docteure en physique, 10 ans d'enseignement",
        en: "PhD in Physics, 10 years of teaching",
        ar: "دكتورة في الفيزياء، بخبرة 10 سنوات في التدريس",
      },
    },
    totalLessons: 6,
    totalHours: 4,
    studentCount: 870,
    rating: 4.5,
    chapters: [
      {
        id: "ch1",
        title: { fr: "La lumière", en: "Light", ar: "الضوء" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Nature de la lumière", en: "Nature of Light", ar: "طبيعة الضوء" },
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "La lumière : onde ou particule ? Vitesse et spectre lumineux.",
              en: "Light: wave or particle? Speed and light spectrum.",
              ar: "الضوء: موجة أم جسيم؟ السرعة والطيف الضوئي.",
            },
          },
          {
            id: "l2",
            title: { fr: "Propagation rectiligne", en: "Rectilinear Propagation", ar: "الانتشار المستقيم" },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "La lumière se propage en ligne droite : ombres et pénombres.",
              en: "Light travels in straight lines: shadows and penumbras.",
              ar: "ينتشر الضوء في خط مستقيم: الظل والظل الجزئي.",
            },
            documents: [{ name: "propagation-lumiere.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l3",
            title: { fr: "Sources lumineuses", en: "Light Sources", ar: "المصادر الضوئية" },
            duration: "13:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Sources primaires et secondaires, lumière cohérente et incohérente.",
              en: "Primary and secondary sources, coherent and incoherent light.",
              ar: "المصادر الأولية والثانوية، الضوء المتماسك وغير المتماسك.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Réflexion et réfraction", en: "Reflection and Refraction", ar: "الانعكاس والانكسار" },
        lessons: [
          {
            id: "l4",
            title: { fr: "Lois de la réflexion", en: "Laws of Reflection", ar: "قوانين الانعكاس" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Angle d'incidence égal à l'angle de réflexion. Miroirs plans.",
              en: "Angle of incidence equals angle of reflection. Plane mirrors.",
              ar: "زاوية السقوط تساوي زاوية الانعكاس. المرايا المستوية.",
            },
            documents: [{ name: "reflexion-lois.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l5",
            title: { fr: "Réfraction de la lumière", en: "Refraction of Light", ar: "انكسار الضوء" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "La loi de Snell-Descartes et l'indice de réfraction.",
              en: "Snell-Descartes law and the refractive index.",
              ar: "قانون سنيل-ديكارت ومعامل الانكسار.",
            },
          },
          {
            id: "l6",
            title: { fr: "Lentilles et prismes", en: "Lenses and Prisms", ar: "العدسات والمنشورات" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Lentilles convergentes et divergentes, décomposition de la lumière blanche.",
              en: "Converging and diverging lenses, decomposition of white light.",
              ar: "العدسات المقربة والمبعدة، تحليل الضوء الأبيض.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "biology-cells-101",
    subject: "biology",
    level: "middle",
    title: { fr: "La cellule - Unité du vivant", en: "The Cell - Unit of Life", ar: "الخلية - وحدة الحياة" },
    description: {
      fr: "Découvrez la structure cellulaire, les organites et les fonctions vitales de la cellule.",
      en: "Discover cell structure, organelles, and vital cell functions.",
      ar: "اكتشف بنية الخلية والعضيات والوظائف الحيوية للخلية.",
    },
    thumbnail: "/thumbnails/biology-cells.svg",
    instructor: {
      name: "Pr. Fatima Zahra",
      avatar: "/avatars/fatima.svg",
      bio: {
        fr: "Professeure de biologie, passionnée par la pédagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "أستاذة أحياء، شغوفة بالبيداغوجيا",
      },
    },
    totalLessons: 5,
    totalHours: 4,
    studentCount: 2780,
    rating: 4.8,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Structure de la cellule", en: "Cell Structure", ar: "بنية الخلية" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Cellule animale vs végétale", en: "Animal vs Plant Cell", ar: "الخلية الحيوانية مقابل النباتية" },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comparer les deux types de cellules eucaryotes.",
              en: "Compare the two types of eukaryotic cells.",
              ar: "مقارنة نوعي الخلايا حقيقية النواة.",
            },
            documents: [{ name: "cellules-schema.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l2",
            title: { fr: "Le noyau et l'ADN", en: "The Nucleus and DNA", ar: "النواة والحمض النووي" },
            duration: "19:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Le rôle du noyau et de l'information génétique.",
              en: "The role of the nucleus and genetic information.",
              ar: "دور النواة والمعلومات الوراثية.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Division cellulaire", en: "Cell Division", ar: "انقسام الخلية" },
        lessons: [
          {
            id: "l3",
            title: { fr: "La mitose", en: "Mitosis", ar: "الانقسام المتساوي" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les quatre phases de la mitose et leur rôle dans la croissance.",
              en: "The four phases of mitosis and their role in growth.",
              ar: "المراحل الأربع للانقسام المتساوي ودوره في النمو.",
            },
            documents: [{ name: "mitose-schema.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l4",
            title: { fr: "La méiose", en: "Meiosis", ar: "الانقسام المنصف" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "La méiose et la formation des gamètes.",
              en: "Meiosis and the formation of gametes.",
              ar: "الانقسام المنصف وتكوين الأمشاج.",
            },
          },
          {
            id: "l5",
            title: { fr: "Cycle cellulaire", en: "Cell Cycle", ar: "دورة الخلية" },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les phases du cycle cellulaire : interphase, mitose et cytocinèse.",
              en: "Phases of the cell cycle: interphase, mitosis, and cytokinesis.",
              ar: "مراحل دورة الخلية: الطور البيني والانقسام والانتواء.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "biology-ecology-201",
    subject: "biology",
    level: "high",
    title: { fr: "Écologie et environnement", en: "Ecology and Environment", ar: "علم البيئة" },
    description: {
      fr: "Étudiez les écosystèmes, la biodiversité et l'impact de l'homme sur l'environnement.",
      en: "Study ecosystems, biodiversity, and human impact on the environment.",
      ar: "ادرس الأنظمة البيئية والتنوع البيولوجي وتأثير الإنسان على البيئة.",
    },
    thumbnail: "/thumbnails/biology-ecology.svg",
    instructor: {
      name: "Pr. Fatima Zahra",
      avatar: "/avatars/fatima.svg",
      bio: {
        fr: "Professeure de biologie, passionnée par la pédagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "أستاذة أحياء، شغوفة بالبيداغوجيا",
      },
    },
    totalLessons: 5,
    totalHours: 5,
    studentCount: 1450,
    rating: 4.7,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Les écosystèmes", en: "Ecosystems", ar: "الأنظمة البيئية" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Qu'est-ce qu'un écosystème ?", en: "What is an Ecosystem?", ar: "ما هو النظام البيئي؟" },
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Définition et composants d'un écosystème.",
              en: "Definition and components of an ecosystem.",
              ar: "تعريف ومكونات النظام البيئي.",
            },
          },
          {
            id: "l2",
            title: { fr: "Chaînes alimentaires", en: "Food Chains", ar: "سلاسل غذائية" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre les relations trophiques dans un écosystème.",
              en: "Understanding trophic relationships in an ecosystem.",
              ar: "فهم العلاقات الغذائية في النظام البيئي.",
            },
            documents: [{ name: "chaines-alimentaires.pdf", url: "/documents/placeholder.pdf" }],
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Perturbations et conservation", en: "Disturbances and Conservation", ar: "الاضطرابات والحفاظ" },
        lessons: [
          {
            id: "l3",
            title: { fr: "Pollution et impact humain", en: "Pollution and Human Impact", ar: "التلوث والأثر البشري" },
            duration: "17:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les différents types de pollution et leurs effets sur les écosystèmes.",
              en: "The different types of pollution and their effects on ecosystems.",
              ar: "أنواع التلوث المختلفة وآثارها على الأنظمة البيئية.",
            },
          },
          {
            id: "l4",
            title: { fr: "Biodiversité menacée", en: "Threatened Biodiversity", ar: "التنوع البيولوجي المهدد" },
            duration: "19:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les espèces en danger et les causes de l'extinction.",
              en: "Endangered species and the causes of extinction.",
              ar: "الأنواع المهددة وأسباب الانقراض.",
            },
            documents: [{ name: "biodiversite-rapport.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l5",
            title: { fr: "Développement durable", en: "Sustainable Development", ar: "التنمية المستدامة" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les principes du développement durable et les actions de conservation.",
              en: "Principles of sustainable development and conservation actions.",
              ar: "مبادئ التنمية المستدامة وإجراءات الحفاظ على البيئة.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "biology-human-body-102",
    subject: "biology",
    level: "middle",
    title: { fr: "Le corps humain", en: "The Human Body", ar: "جسم الإنسان" },
    description: {
      fr: "Explorez les grands systèmes du corps humain : digestion, circulation, respiration et immunité.",
      en: "Explore the major systems of the human body: digestion, circulation, respiration, and immunity.",
      ar: "استكشف الأجهزة الكبرى لجسم الإنسان: الهضم والدورة الدموية والتنفس والمناعة.",
    },
    thumbnail: "/thumbnails/biology-human.svg",
    instructor: {
      name: "Pr. Fatima Zahra",
      avatar: "/avatars/fatima.svg",
      bio: {
        fr: "Professeure de biologie, passionnée par la pédagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "أستاذة أحياء، شغوفة بالبيداغوجيا",
      },
    },
    totalLessons: 6,
    totalHours: 5,
    studentCount: 2100,
    rating: 4.8,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Systèmes principaux", en: "Main Systems", ar: "الأجهزة الرئيسية" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Le système digestif", en: "The Digestive System", ar: "الجهاز الهضمي" },
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "De la bouche à l'intestin : comment le corps transforme les aliments.",
              en: "From mouth to intestine: how the body transforms food.",
              ar: "من الفم إلى الأمعاء: كيف يحول الجسم الغذاء.",
            },
            documents: [{ name: "systeme-digestif.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l2",
            title: { fr: "Le système nerveux", en: "The Nervous System", ar: "الجهاز العصبي" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Le cerveau, la moelle épinière et les neurones.",
              en: "The brain, spinal cord, and neurons.",
              ar: "الدماغ والحبل الشوكي والخلايا العصبية.",
            },
          },
          {
            id: "l3",
            title: { fr: "Le système musculo-squelettique", en: "The Musculoskeletal System", ar: "الجهاز العضلي الهيكلي" },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les os, les muscles et les articulations : comment le corps bouge.",
              en: "Bones, muscles, and joints: how the body moves.",
              ar: "العظام والعضلات والمفاصل: كيف يتحرك الجسم.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Circulation et respiration", en: "Circulation and Respiration", ar: "الدورة الدموية والتنفس" },
        lessons: [
          {
            id: "l4",
            title: { fr: "Le cœur et la circulation", en: "The Heart and Circulation", ar: "القلب والدورة الدموية" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comment le cœur pompe le sang à travers le corps.",
              en: "How the heart pumps blood through the body.",
              ar: "كيف يضخ القلب الدم في جميع أنحاء الجسم.",
            },
            documents: [{ name: "coeur-circulation.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l5",
            title: { fr: "Le système respiratoire", en: "The Respiratory System", ar: "الجهاز التنفسي" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les poumons et les échanges gazeux.",
              en: "The lungs and gas exchange.",
              ar: "الرئتان وتبادل الغازات.",
            },
          },
          {
            id: "l6",
            title: { fr: "Le système immunitaire", en: "The Immune System", ar: "الجهاز المناعي" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comment le corps se défend contre les maladies.",
              en: "How the body defends against diseases.",
              ar: "كيف يدافع الجسم ضد الأمراض.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "biology-genetics-301",
    subject: "biology",
    level: "high",
    title: { fr: "Génétique et hérédité", en: "Genetics and Heredity", ar: "علم الوراثة" },
    description: {
      fr: "Explorez les lois de Mendel, la structure de l'ADN et les mécanismes de l'hérédité.",
      en: "Explore Mendel's laws, DNA structure, and the mechanisms of heredity.",
      ar: "استكشف قوانين مندل وبنية الحمض النووي وآليات الوراثة.",
    },
    thumbnail: "/thumbnails/biology-genetics.svg",
    instructor: {
      name: "Pr. Fatima Zahra",
      avatar: "/avatars/fatima.svg",
      bio: {
        fr: "Professeure de biologie, passionnée par la pédagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "أستاذة أحياء، شغوفة بالبيداغوجيا",
      },
    },
    totalLessons: 6,
    totalHours: 5,
    studentCount: 1340,
    rating: 4.9,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Génétique mendélienne", en: "Mendelian Genetics", ar: "علم الوراثة المندلي" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Les lois de Mendel", en: "Mendel's Laws", ar: "قوانين مندل" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les expériences fondatrices de Mendel sur les petits pois.",
              en: "Mendel's founding experiments on pea plants.",
              ar: "تجارب مندل الأساسية على نبات البازلاء.",
            },
            documents: [{ name: "mendel-lois.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l2",
            title: { fr: "Dominance et récessivité", en: "Dominance and Recessivity", ar: "السيادة والتنحي" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre les gènes dominants et récessifs.",
              en: "Understanding dominant and recessive genes.",
              ar: "فهم الجينات السائدة والمتنحية.",
            },
          },
          {
            id: "l3",
            title: { fr: "Croisements génétiques", en: "Genetic Crosses", ar: "التهجينات الجينية" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Utiliser le tableau de Punnett pour prédire la descendance.",
              en: "Use Punnett squares to predict offspring.",
              ar: "استخدام مربع بانيت للتنبؤ بالنسل.",
            },
            documents: [{ name: "croisements-exercices.pdf", url: "/documents/placeholder.pdf" }],
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "ADN et hérédité moléculaire", en: "DNA and Molecular Heredity", ar: "الحمض النووي والوراثة الجزيئية" },
        lessons: [
          {
            id: "l4",
            title: { fr: "Structure de l'ADN", en: "DNA Structure", ar: "بنية الحمض النووي" },
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "La double hélice d'ADN et les bases azotées.",
              en: "The DNA double helix and nitrogenous bases.",
              ar: "اللولب المزدوج للحمض النووي والقواعد النيتروجينية.",
            },
            documents: [{ name: "adn-structure.pdf", url: "/documents/placeholder.pdf" }],
          },
          {
            id: "l5",
            title: { fr: "Réplication et transcription", en: "Replication and Transcription", ar: "التضاعف والنسخ" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comment l'ADN se copie et comment l'ARN est synthétisé.",
              en: "How DNA copies itself and how RNA is synthesized.",
              ar: "كيف يتضاعف الحمض النووي وكيف يتم تصنيع الحمض الريبوزي.",
            },
          },
          {
            id: "l6",
            title: { fr: "Mutations génétiques", en: "Genetic Mutations", ar: "الطفرات الجينية" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les types de mutations et leurs conséquences sur l'organisme.",
              en: "Types of mutations and their consequences for the organism.",
              ar: "أنواع الطفرات وعواقبها على الكائن الحي.",
            },
          },
        ],
      },
    ],
  },
];

export function getCourse(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getCoursesBySubject(subject: Subject): Course[] {
  return courses.filter((c) => c.subject === subject);
}

export function getLesson(courseId: string, lessonId: string) {
  const course = getCourse(courseId);
  if (!course) return null;
  for (const chapter of course.chapters) {
    const lesson = chapter.lessons.find((l) => l.id === lessonId);
    if (lesson) return { lesson, chapter, course };
  }
  return null;
}

export function getAllLessons(course: Course): Lesson[] {
  return course.chapters.flatMap((ch) => ch.lessons);
}

// ——— Chapter quizzes (mock) — keyed by courseId then chapterId ———

export const quizzes: Record<string, Record<string, QuizQuestion[]>> = {
  "math-algebra-101": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Dans l'expression 3x + 5, que représente x ?",
          en: "In the expression 3x + 5, what does x represent?",
          ar: "في التعبير 3x + 5، ماذا يمثل x؟",
        },
        options: [
          { fr: "Une constante", en: "A constant", ar: "ثابت" },
          { fr: "Une variable", en: "A variable", ar: "متغير" },
          { fr: "Un coefficient", en: "A coefficient", ar: "معامل" },
          { fr: "Une équation", en: "An equation", ar: "معادلة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "x est une variable : sa valeur peut changer. 3 est le coefficient et 5 la constante.",
          en: "x is a variable: its value can change. 3 is the coefficient and 5 the constant.",
          ar: "x متغير: قيمته يمكن أن تتغير. 3 هو المعامل و5 هو الثابت.",
        },
        lessonId: "l2",
      },
      {
        id: "q2",
        question: {
          fr: "Simplifie : 2x + 3x",
          en: "Simplify: 2x + 3x",
          ar: "بسّط: 2x + 3x",
        },
        options: [
          { fr: "5x", en: "5x", ar: "5x" },
          { fr: "6x", en: "6x", ar: "6x" },
          { fr: "5x²", en: "5x²", ar: "5x²" },
          { fr: "x⁵", en: "x⁵", ar: "x⁵" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "On additionne les coefficients des termes semblables : 2 + 3 = 5, donc 5x.",
          en: "Add the coefficients of like terms: 2 + 3 = 5, so 5x.",
          ar: "نجمع معاملات الحدود المتشابهة: 2 + 3 = 5، إذن 5x.",
        },
        lessonId: "l3",
      },
      {
        id: "q3",
        question: {
          fr: "Laquelle de ces écritures est une expression algébrique ?",
          en: "Which of these is an algebraic expression?",
          ar: "أي من هذه الكتابات تعبير جبري؟",
        },
        options: [
          { fr: "7 = 7", en: "7 = 7", ar: "7 = 7" },
          { fr: "4y − 2", en: "4y − 2", ar: "4y − 2" },
          { fr: "≤", en: "≤", ar: "≤" },
          { fr: "3 < 5", en: "3 < 5", ar: "3 < 5" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "4y − 2 combine une variable, un coefficient et une constante sans signe d'égalité : c'est une expression.",
          en: "4y − 2 combines a variable, a coefficient and a constant with no equals sign: it's an expression.",
          ar: "4y − 2 يجمع متغيراً ومعاملاً وثابتاً دون علامة مساواة: إنه تعبير.",
        },
        lessonId: "l3",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Résous : x + 7 = 12",
          en: "Solve: x + 7 = 12",
          ar: "حل: x + 7 = 12",
        },
        options: [
          { fr: "x = 5", en: "x = 5", ar: "x = 5" },
          { fr: "x = 19", en: "x = 19", ar: "x = 19" },
          { fr: "x = −5", en: "x = −5", ar: "x = −5" },
          { fr: "x = 7", en: "x = 7", ar: "x = 7" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "On soustrait 7 des deux côtés : x = 12 − 7 = 5.",
          en: "Subtract 7 from both sides: x = 12 − 7 = 5.",
          ar: "نطرح 7 من الطرفين: x = 12 − 7 = 5.",
        },
        lessonId: "l4",
      },
      {
        id: "q2",
        question: {
          fr: "Résous : x/3 = 4",
          en: "Solve: x/3 = 4",
          ar: "حل: x/3 = 4",
        },
        options: [
          { fr: "x = 12", en: "x = 12", ar: "x = 12" },
          { fr: "x = 4/3", en: "x = 4/3", ar: "x = 4/3" },
          { fr: "x = 7", en: "x = 7", ar: "x = 7" },
          { fr: "x = 1", en: "x = 1", ar: "x = 1" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "On multiplie les deux côtés par 3 : x = 4 × 3 = 12.",
          en: "Multiply both sides by 3: x = 4 × 3 = 12.",
          ar: "نضرب الطرفين في 3: x = 4 × 3 = 12.",
        },
        lessonId: "l5",
      },
      {
        id: "q3",
        question: {
          fr: "2x − 4 = 10. Quelle est la première étape la plus simple ?",
          en: "2x − 4 = 10. What's the simplest first step?",
          ar: "2x − 4 = 10. ما أبسط خطوة أولى؟",
        },
        options: [
          { fr: "Diviser par 2", en: "Divide by 2", ar: "القسمة على 2" },
          { fr: "Ajouter 4 des deux côtés", en: "Add 4 to both sides", ar: "إضافة 4 للطرفين" },
          { fr: "Soustraire 10", en: "Subtract 10", ar: "طرح 10" },
          { fr: "Multiplier par x", en: "Multiply by x", ar: "الضرب في x" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "On isole d'abord le terme en x : 2x = 14, puis on divise par 2 pour trouver x = 7.",
          en: "First isolate the x term: 2x = 14, then divide by 2 to get x = 7.",
          ar: "نعزل أولاً حد x: أي 2x = 14، ثم نقسم على 2 لنجد x = 7.",
        },
        lessonId: "l4",
      },
    ],
    ch3: [
      {
        id: "q1",
        question: {
          fr: "Un système d'équations à deux inconnues possède deux équations. Que cherche-t-on à trouver ?",
          en: "A system of equations with two unknowns has two equations. What are we trying to find?",
          ar: "نظام معادلتين بمجهولين يحتوي على معادلتين. ماذا نبحث عنه؟",
        },
        options: [
          { fr: "Une seule valeur", en: "A single value", ar: "قيمة واحدة" },
          { fr: "Le couple (x, y) qui vérifie les deux équations", en: "The pair (x, y) that satisfies both equations", ar: "الزوج (x, y) الذي يحقق المعادلتين" },
          { fr: "La somme des deux équations", en: "The sum of the two equations", ar: "مجموع المعادلتين" },
          { fr: "Le produit des deux équations", en: "The product of the two equations", ar: "جداء المعادلتين" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Résoudre un système, c'est trouver le couple (x, y) qui satisfait simultanément les deux équations.",
          en: "Solving a system means finding the pair (x, y) that satisfies both equations at once.",
          ar: "حل النظام يعني إيجاد الزوج (x, y) الذي يحقق المعادلتين في آن واحد.",
        },
        lessonId: "l6",
      },
      {
        id: "q2",
        question: {
          fr: "Système : y = 2x et x + y = 9. Par substitution, que devient la deuxième équation ?",
          en: "System: y = 2x and x + y = 9. By substitution, what does the second equation become?",
          ar: "النظام: y = 2x و x + y = 9. بالتعويض، ماذا تصبح المعادلة الثانية؟",
        },
        options: [
          { fr: "x + 2x = 9", en: "x + 2x = 9", ar: "x + 2x = 9" },
          { fr: "2x + 9 = x", en: "2x + 9 = x", ar: "2x + 9 = x" },
          { fr: "x − 2x = 9", en: "x − 2x = 9", ar: "x − 2x = 9" },
          { fr: "x = 9", en: "x = 9", ar: "x = 9" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "On remplace y par 2x dans la deuxième équation : x + 2x = 9, soit 3x = 9 donc x = 3.",
          en: "Replace y with 2x in the second equation: x + 2x = 9, so 3x = 9 and x = 3.",
          ar: "نعوض y بـ 2x في المعادلة الثانية: x + 2x = 9، إذن 3x = 9 وبالتالي x = 3.",
        },
        lessonId: "l7",
      },
      {
        id: "q3",
        question: {
          fr: "Système : x + y = 10 et x − y = 2. En additionnant les deux équations, on obtient…",
          en: "System: x + y = 10 and x − y = 2. Adding the two equations gives…",
          ar: "النظام: x + y = 10 و x − y = 2. بجمع المعادلتين نحصل على…",
        },
        options: [
          { fr: "2x = 12", en: "2x = 12", ar: "2x = 12" },
          { fr: "2y = 12", en: "2y = 12", ar: "2y = 12" },
          { fr: "x = 8", en: "x = 8", ar: "x = 8" },
          { fr: "2x = 8", en: "2x = 8", ar: "2x = 8" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "Les termes en y s'éliminent : (x + y) + (x − y) = 10 + 2, soit 2x = 12, donc x = 6.",
          en: "The y terms cancel out: (x + y) + (x − y) = 10 + 2, so 2x = 12, giving x = 6.",
          ar: "تُحذف حدود y: (x + y) + (x − y) = 10 + 2، إذن 2x = 12، وبالتالي x = 6.",
        },
        lessonId: "l8",
      },
    ],
    ch4: [
      {
        id: "q1",
        question: {
          fr: "Que signifie le symbole ≤ ?",
          en: "What does the symbol ≤ mean?",
          ar: "ماذا يعني الرمز ≤؟",
        },
        options: [
          { fr: "Strictement inférieur", en: "Strictly less than", ar: "أصغر تماماً" },
          { fr: "Inférieur ou égal", en: "Less than or equal to", ar: "أصغر أو يساوي" },
          { fr: "Supérieur ou égal", en: "Greater than or equal to", ar: "أكبر أو يساوي" },
          { fr: "Différent de", en: "Not equal to", ar: "لا يساوي" },

        ],
        correctIndex: 1,
        explanation: {
          fr: "≤ signifie « inférieur ou égal à » : la valeur peut être égale à la borne.",
          en: "≤ means “less than or equal to”: the value can equal the bound.",
          ar: "≤ يعني « أصغر أو يساوي »: يمكن أن تساوي القيمة الحد.",
        },
        lessonId: "l9",
      },
      {
        id: "q2",
        question: {
          fr: "Que se passe-t-il quand on multiplie les deux côtés d'une inégalité par un nombre négatif ?",
          en: "What happens when you multiply both sides of an inequality by a negative number?",
          ar: "ماذا يحدث عند ضرب طرفي متراجحة في عدد سالب؟",
        },
        options: [
          { fr: "Rien ne change", en: "Nothing changes", ar: "لا شيء يتغير" },
          { fr: "Le sens de l'inégalité s'inverse", en: "The inequality sign flips", ar: "تنعكس جهة المتراجحة" },
          { fr: "L'inégalité devient une égalité", en: "The inequality becomes an equality", ar: "تصبح المتراجحة مساواة" },
          { fr: "L'inégalité disparaît", en: "The inequality disappears", ar: "تختفي المتراجحة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Multiplier ou diviser par un nombre négatif inverse le sens de l'inégalité.",
          en: "Multiplying or dividing by a negative number flips the direction of the inequality.",
          ar: "الضرب أو القسمة على عدد سالب يعكس جهة المتراجحة.",
        },
        lessonId: "l10",
      },
      {
        id: "q3",
        question: {
          fr: "Résous : −2x > 6",
          en: "Solve: −2x > 6",
          ar: "حل: −2x > 6",
        },
        options: [
          { fr: "x > −3", en: "x > −3", ar: "x > −3" },
          { fr: "x < −3", en: "x < −3", ar: "x < −3" },
          { fr: "x > 3", en: "x > 3", ar: "x > 3" },
          { fr: "x < 3", en: "x < 3", ar: "x < 3" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "On divise par −2 et on inverse le sens : x < 6 / (−2) = −3.",
          en: "Divide by −2 and flip the sign: x < 6 / (−2) = −3.",
          ar: "نقسم على −2 ونعكس الجهة: x < 6 / (−2) = −3.",
        },
        lessonId: "l10",
      },
    ],
  },
  "physics-mechanics-101": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Quelle grandeur mesure la variation de la vitesse dans le temps ?",
          en: "Which quantity measures how velocity changes over time?",
          ar: "أي كمية تقيس تغير السرعة مع الزمن؟",
        },
        options: [
          { fr: "La position", en: "Position", ar: "الموقع" },
          { fr: "L'accélération", en: "Acceleration", ar: "التسارع" },
          { fr: "La masse", en: "Mass", ar: "الكتلة" },
          { fr: "La distance", en: "Distance", ar: "المسافة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "L'accélération est la variation de la vitesse par unité de temps (m/s²).",
          en: "Acceleration is the change in velocity per unit of time (m/s²).",
          ar: "التسارع هو تغير السرعة لكل وحدة زمن (م/ث²).",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "En mouvement rectiligne uniforme, la vitesse est…",
          en: "In uniform linear motion, velocity is…",
          ar: "في الحركة المستقيمة المنتظمة، السرعة…",
        },
        options: [
          { fr: "croissante", en: "increasing", ar: "متزايدة" },
          { fr: "constante", en: "constant", ar: "ثابتة" },
          { fr: "nulle", en: "zero", ar: "معدومة" },
          { fr: "décroissante", en: "decreasing", ar: "متناقصة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "« Uniforme » signifie que la vitesse ne change pas : même direction, même valeur.",
          en: "“Uniform” means the velocity doesn't change: same direction, same value.",
          ar: "« منتظمة » تعني أن السرعة لا تتغير: نفس الاتجاه ونفس القيمة.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Un objet parcourt 100 m en 20 s à vitesse constante. Sa vitesse est…",
          en: "An object covers 100 m in 20 s at constant speed. Its speed is…",
          ar: "جسم يقطع 100 م في 20 ث بسرعة ثابتة. سرعته…",
        },
        options: [
          { fr: "2 m/s", en: "2 m/s", ar: "2 م/ث" },
          { fr: "5 m/s", en: "5 m/s", ar: "5 م/ث" },
          { fr: "20 m/s", en: "20 m/s", ar: "20 م/ث" },
          { fr: "120 m/s", en: "120 m/s", ar: "120 م/ث" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "v = d / t = 100 / 20 = 5 m/s.",
          en: "v = d / t = 100 / 20 = 5 m/s.",
          ar: "ع = م / ز = 100 / 20 = 5 م/ث.",
        },
        lessonId: "l2",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Selon la première loi de Newton (principe d'inertie), un objet au repos…",
          en: "According to Newton's first law (principle of inertia), an object at rest…",
          ar: "حسب قانون نيوتن الأول (مبدأ القصور الذاتي)، الجسم الساكن…",
        },
        options: [
          { fr: "accélère spontanément", en: "spontaneously accelerates", ar: "يتسارع تلقائياً" },
          { fr: "reste au repos sauf force extérieure", en: "stays at rest unless acted on by an external force", ar: "يبقى ساكناً ما لم تؤثر عليه قوة خارجية" },
          { fr: "se met toujours en mouvement", en: "always starts moving", ar: "يتحرك دائماً" },
          { fr: "perd de la masse", en: "loses mass", ar: "يفقد كتلته" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le principe d'inertie dit qu'un objet garde son état de repos ou de mouvement rectiligne uniforme tant qu'aucune force extérieure ne s'exerce sur lui.",
          en: "The principle of inertia states an object keeps its state of rest or uniform motion unless an external force acts on it.",
          ar: "ينص مبدأ القصور الذاتي على أن الجسم يحافظ على سكونه أو حركته المستقيمة المنتظمة ما لم تؤثر عليه قوة خارجية.",
        },
        lessonId: "l3",
      },
      {
        id: "q2",
        question: {
          fr: "D'après F = ma, si on double la masse à force constante, l'accélération…",
          en: "According to F = ma, if mass doubles at constant force, acceleration…",
          ar: "حسب F = ma، إذا تضاعفت الكتلة عند قوة ثابتة، فإن التسارع…",
        },
        options: [
          { fr: "double", en: "doubles", ar: "يتضاعف" },
          { fr: "est divisée par deux", en: "is halved", ar: "ينقسم على اثنين" },
          { fr: "ne change pas", en: "stays the same", ar: "لا يتغير" },
          { fr: "devient nulle", en: "becomes zero", ar: "يصبح معدوماً" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "a = F / m : si m double et F reste constante, a est divisée par deux.",
          en: "a = F / m: if m doubles and F stays constant, a is halved.",
          ar: "a = F / m: إذا تضاعفت m وبقيت F ثابتة، ينقسم a على اثنين.",
        },
        lessonId: "l4",
      },
      {
        id: "q3",
        question: {
          fr: "Une force de 10 N accélère une masse de 2 kg. Quelle est l'accélération ?",
          en: "A 10 N force accelerates a 2 kg mass. What is the acceleration?",
          ar: "قوة قدرها 10 نيوتن تسارع كتلة قدرها 2 كغ. ما هو التسارع؟",
        },
        options: [
          { fr: "2 m/s²", en: "2 m/s²", ar: "2 م/ث²" },
          { fr: "5 m/s²", en: "5 m/s²", ar: "5 م/ث²" },
          { fr: "20 m/s²", en: "20 m/s²", ar: "20 م/ث²" },
          { fr: "0.2 m/s²", en: "0.2 m/s²", ar: "0.2 م/ث²" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "a = F / m = 10 / 2 = 5 m/s².",
          en: "a = F / m = 10 / 2 = 5 m/s².",
          ar: "a = F / m = 10 / 2 = 5 م/ث².",
        },
        lessonId: "l4",
      },
    ],
    ch3: [
      {
        id: "q1",
        question: {
          fr: "Le travail d'une force s'exprime en…",
          en: "The work of a force is expressed in…",
          ar: "يُعبَّر عن شغل قوة بـ…",
        },
        options: [
          { fr: "Newtons (N)", en: "Newtons (N)", ar: "نيوتن (N)" },
          { fr: "Joules (J)", en: "Joules (J)", ar: "جول (J)" },
          { fr: "Watts (W)", en: "Watts (W)", ar: "واط (W)" },
          { fr: "mètres (m)", en: "meters (m)", ar: "متر (m)" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le travail (force × déplacement) se mesure en Joules, l'unité d'énergie.",
          en: "Work (force × displacement) is measured in Joules, the unit of energy.",
          ar: "يُقاس الشغل (القوة × الإزاحة) بالجول، وهي وحدة الطاقة.",
        },
        lessonId: "l5",
      },
      {
        id: "q2",
        question: {
          fr: "L'énergie cinétique d'un objet dépend de…",
          en: "The kinetic energy of an object depends on…",
          ar: "تعتمد الطاقة الحركية لجسم على…",
        },
        options: [
          { fr: "sa couleur", en: "its color", ar: "لونه" },
          { fr: "sa masse et sa vitesse", en: "its mass and velocity", ar: "كتلته وسرعته" },
          { fr: "sa température", en: "its temperature", ar: "درجة حرارته" },
          { fr: "son volume uniquement", en: "its volume only", ar: "حجمه فقط" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "L'énergie cinétique vaut ½mv² : elle dépend de la masse et du carré de la vitesse.",
          en: "Kinetic energy is ½mv²: it depends on mass and the square of velocity.",
          ar: "الطاقة الحركية تساوي ½mv²: تعتمد على الكتلة ومربع السرعة.",
        },
        lessonId: "l6",
      },
      {
        id: "q3",
        question: {
          fr: "L'énergie potentielle gravitationnelle augmente quand…",
          en: "Gravitational potential energy increases when…",
          ar: "تزداد الطاقة الكامنة الثقالية عندما…",
        },
        options: [
          { fr: "l'objet descend", en: "the object goes down", ar: "ينزل الجسم" },
          { fr: "l'objet monte en altitude", en: "the object rises in altitude", ar: "يرتفع الجسم" },
          { fr: "l'objet ralentit", en: "the object slows down", ar: "يبطئ الجسم" },
          { fr: "l'objet reste immobile au sol", en: "the object stays still on the ground", ar: "يبقى الجسم ساكناً على الأرض" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "L'énergie potentielle gravitationnelle (mgh) augmente avec la hauteur h.",
          en: "Gravitational potential energy (mgh) increases with height h.",
          ar: "تزداد الطاقة الكامنة الثقالية (mgh) مع الارتفاع h.",
        },
        lessonId: "l7",
      },
    ],
  },
  "biology-cells-101": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Quel organite est présent dans la cellule végétale mais pas dans la cellule animale ?",
          en: "Which organelle is present in plant cells but not animal cells?",
          ar: "أي عضية توجد في الخلية النباتية ولا توجد في الخلية الحيوانية؟",
        },
        options: [
          { fr: "Le noyau", en: "The nucleus", ar: "النواة" },
          { fr: "Le chloroplaste", en: "The chloroplast", ar: "البلاستيدة الخضراء" },
          { fr: "La membrane", en: "The membrane", ar: "الغشاء" },
          { fr: "Le cytoplasme", en: "The cytoplasm", ar: "السيتوبلازم" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Les chloroplastes (photosynthèse) et la paroi cellulaire sont propres à la cellule végétale.",
          en: "Chloroplasts (photosynthesis) and the cell wall are specific to plant cells.",
          ar: "البلاستيدات الخضراء (التمثيل الضوئي) والجدار الخلوي خاصان بالخلية النباتية.",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Où se trouve l'ADN dans une cellule eucaryote ?",
          en: "Where is DNA located in a eukaryotic cell?",
          ar: "أين يوجد الحمض النووي في الخلية حقيقية النواة؟",
        },
        options: [
          { fr: "Dans le cytoplasme", en: "In the cytoplasm", ar: "في السيتوبلازم" },
          { fr: "Dans le noyau", en: "In the nucleus", ar: "في النواة" },
          { fr: "Dans la membrane", en: "In the membrane", ar: "في الغشاء" },
          { fr: "Hors de la cellule", en: "Outside the cell", ar: "خارج الخلية" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le noyau contient l'ADN, support de l'information génétique.",
          en: "The nucleus contains DNA, the carrier of genetic information.",
          ar: "تحتوي النواة على الحمض النووي، حامل المعلومات الوراثية.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Quel est le rôle de la membrane plasmique ?",
          en: "What is the role of the plasma membrane?",
          ar: "ما دور الغشاء البلازمي؟",
        },
        options: [
          { fr: "Fabriquer l'énergie", en: "Produce energy", ar: "إنتاج الطاقة" },
          {
            fr: "Contrôler les échanges avec l'extérieur",
            en: "Control exchanges with the outside",
            ar: "التحكم في التبادلات مع الخارج",
          },
          { fr: "Stocker l'ADN", en: "Store DNA", ar: "تخزين الحمض النووي" },
          { fr: "Digérer les aliments", en: "Digest food", ar: "هضم الطعام" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La membrane délimite la cellule et filtre ce qui entre et sort.",
          en: "The membrane bounds the cell and filters what goes in and out.",
          ar: "يحدّ الغشاء الخلية ويرشّح ما يدخل ويخرج.",
        },
        lessonId: "l1",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Combien de cellules filles produit une mitose ?",
          en: "How many daughter cells does mitosis produce?",
          ar: "كم خلية بنت ينتج الانقسام المتساوي؟",
        },
        options: [
          { fr: "1", en: "1", ar: "1" },
          { fr: "2 identiques", en: "2 identical cells", ar: "2 متطابقتين" },
          { fr: "4 différentes", en: "4 different cells", ar: "4 مختلفة" },
          { fr: "0", en: "0", ar: "0" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La mitose produit 2 cellules filles génétiquement identiques à la cellule mère, utile pour la croissance.",
          en: "Mitosis produces 2 daughter cells genetically identical to the parent cell, used for growth.",
          ar: "ينتج الانقسام المتساوي خليتين بنتين متطابقتين وراثياً مع الخلية الأم، وهو مفيد للنمو.",
        },
        lessonId: "l3",
      },
      {
        id: "q2",
        question: {
          fr: "Quel est le rôle principal de la méiose ?",
          en: "What is the main role of meiosis?",
          ar: "ما الدور الرئيسي للانقسام المنصف؟",
        },
        options: [
          { fr: "Faire grandir un tissu", en: "Grow tissue", ar: "تنمية نسيج" },
          { fr: "Réparer une blessure", en: "Repair a wound", ar: "إصلاح جرح" },
          { fr: "Former les gamètes (cellules reproductrices)", en: "Form gametes (reproductive cells)", ar: "تكوين الأمشاج (الخلايا التناسلية)" },
          { fr: "Digérer les nutriments", en: "Digest nutrients", ar: "هضم المغذيات" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "La méiose produit des gamètes (ovules, spermatozoïdes) avec la moitié du nombre de chromosomes.",
          en: "Meiosis produces gametes (eggs, sperm) with half the number of chromosomes.",
          ar: "ينتج الانقسام المنصف الأمشاج (البويضات والحيوانات المنوية) بنصف عدد الصبغيات.",
        },
        lessonId: "l4",
      },
      {
        id: "q3",
        question: {
          fr: "Quelles sont les grandes étapes du cycle cellulaire ?",
          en: "What are the main phases of the cell cycle?",
          ar: "ما هي المراحل الكبرى لدورة الخلية؟",
        },
        options: [
          { fr: "Interphase, mitose, cytocinèse", en: "Interphase, mitosis, cytokinesis", ar: "الطور البيني، الانقسام، الانتواء" },
          { fr: "Digestion, respiration, excrétion", en: "Digestion, respiration, excretion", ar: "الهضم، التنفس، الإخراج" },
          { fr: "Réflexion, réfraction, diffraction", en: "Reflection, refraction, diffraction", ar: "الانعكاس، الانكسار، الحيود" },
          { fr: "Naissance, croissance, mort", en: "Birth, growth, death", ar: "الولادة، النمو، الموت" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "Le cycle cellulaire alterne l'interphase (croissance, réplication de l'ADN), la mitose (division du noyau) et la cytocinèse (division du cytoplasme).",
          en: "The cell cycle alternates interphase (growth, DNA replication), mitosis (nuclear division), and cytokinesis (cytoplasm division).",
          ar: "تتناوب دورة الخلية بين الطور البيني (النمو وتضاعف الحمض النووي) والانقسام المتساوي (انقسام النواة) والانتواء (انقسام السيتوبلازم).",
        },
        lessonId: "l5",
      },
    ],
  },
  "math-geometry-201": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Un triangle avec trois côtés de longueurs différentes est appelé…",
          en: "A triangle with three sides of different lengths is called…",
          ar: "المثلث الذي أضلاعه الثلاثة مختلفة الأطوال يسمى…",
        },
        options: [
          { fr: "isocèle", en: "isosceles", ar: "متساوي الساقين" },
          { fr: "équilatéral", en: "equilateral", ar: "متساوي الأضلاع" },
          { fr: "scalène", en: "scalene", ar: "مختلف الأضلاع" },
          { fr: "rectangle", en: "right", ar: "قائم الزاوية" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "Un triangle scalène a trois côtés de longueurs toutes différentes.",
          en: "A scalene triangle has three sides that are all different lengths.",
          ar: "المثلث المختلف الأضلاع له ثلاثة أضلاع كلها مختلفة الطول.",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Un triangle rectangle a un côté de 3 cm et un autre de 4 cm formant l'angle droit. Quelle est la longueur de l'hypoténuse ?",
          en: "A right triangle has legs of 3 cm and 4 cm. What is the length of the hypotenuse?",
          ar: "مثلث قائم الزاوية له ضلعان قائمان طولهما 3 سم و4 سم. ما طول الوتر؟",
        },
        options: [
          { fr: "5 cm", en: "5 cm", ar: "5 سم" },
          { fr: "7 cm", en: "7 cm", ar: "7 سم" },
          { fr: "12 cm", en: "12 cm", ar: "12 سم" },
          { fr: "25 cm", en: "25 cm", ar: "25 سم" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "Pythagore : hyp² = 3² + 4² = 9 + 16 = 25, donc hyp = 5 cm.",
          en: "Pythagoras: hyp² = 3² + 4² = 9 + 16 = 25, so hyp = 5 cm.",
          ar: "فيثاغورس: الوتر² = 3² + 4² = 9 + 16 = 25، إذن الوتر = 5 سم.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Le théorème de Pythagore s'applique à…",
          en: "The Pythagorean theorem applies to…",
          ar: "تُطبَّق نظرية فيثاغورس على…",
        },
        options: [
          { fr: "tout triangle", en: "any triangle", ar: "أي مثلث" },
          { fr: "un triangle rectangle uniquement", en: "a right triangle only", ar: "المثلث القائم فقط" },
          { fr: "un cercle", en: "a circle", ar: "دائرة" },
          { fr: "un carré uniquement", en: "a square only", ar: "المربع فقط" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le théorème de Pythagore relie les côtés d'un triangle rectangle : il ne s'applique qu'à ce cas.",
          en: "The Pythagorean theorem relates the sides of a right triangle: it only applies to that case.",
          ar: "تربط نظرية فيثاغورس بين أضلاع المثلث القائم: لا تُطبَّق إلا على هذه الحالة.",
        },
        lessonId: "l2",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Comment appelle-t-on un segment reliant le centre d'un cercle à un point du cercle ?",
          en: "What is a segment connecting a circle's center to a point on the circle called?",
          ar: "ماذا يسمى القطعة التي تصل مركز الدائرة بنقطة عليها؟",
        },
        options: [
          { fr: "Le diamètre", en: "The diameter", ar: "القطر" },
          { fr: "Le rayon", en: "The radius", ar: "نصف القطر" },
          { fr: "La corde", en: "The chord", ar: "الوتر" },
          { fr: "L'arc", en: "The arc", ar: "القوس" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le rayon relie le centre à un point du cercle ; le diamètre traverse le cercle de part en part (2 rayons).",
          en: "The radius connects the center to a point on the circle; the diameter crosses the whole circle (2 radii).",
          ar: "نصف القطر يصل المركز بنقطة على الدائرة؛ القطر يعبر الدائرة بأكملها (نصفا قطر).",
        },
        lessonId: "l3",
      },
      {
        id: "q2",
        question: {
          fr: "Quelle est l'aire d'un cercle de rayon 4 cm (π ≈ 3,14) ?",
          en: "What is the area of a circle with radius 4 cm (π ≈ 3.14)?",
          ar: "ما مساحة دائرة نصف قطرها 4 سم (π ≈ 3.14)؟",
        },
        options: [
          { fr: "≈ 12,56 cm²", en: "≈ 12.56 cm²", ar: "≈ 12.56 سم²" },
          { fr: "≈ 25,12 cm²", en: "≈ 25.12 cm²", ar: "≈ 25.12 سم²" },
          { fr: "≈ 50,24 cm²", en: "≈ 50.24 cm²", ar: "≈ 50.24 سم²" },
          { fr: "≈ 16 cm²", en: "≈ 16 cm²", ar: "≈ 16 سم²" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "Aire = πr² = 3,14 × 4² = 3,14 × 16 ≈ 50,24 cm².",
          en: "Area = πr² = 3.14 × 4² = 3.14 × 16 ≈ 50.24 cm².",
          ar: "المساحة = πr² = 3.14 × 4² = 3.14 × 16 ≈ 50.24 سم².",
        },
        lessonId: "l4",
      },
      {
        id: "q3",
        question: {
          fr: "Le théorème de Thalès permet de calculer…",
          en: "Thales' theorem allows you to calculate…",
          ar: "تتيح نظرية طاليس حساب…",
        },
        options: [
          { fr: "des angles uniquement", en: "angles only", ar: "الزوايا فقط" },
          { fr: "des longueurs dans des configurations de droites parallèles", en: "lengths in configurations with parallel lines", ar: "أطوال في أشكال ذات مستقيمات متوازية" },
          { fr: "des aires de cercles", en: "circle areas", ar: "مساحات الدوائر" },
          { fr: "des volumes", en: "volumes", ar: "الحجوم" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Thalès relie les longueurs de segments coupés par des droites parallèles, très utile pour calculer une longueur manquante.",
          en: "Thales relates the lengths of segments cut by parallel lines, useful for finding a missing length.",
          ar: "تربط نظرية طاليس بين أطوال القطع المقطوعة بمستقيمات متوازية، وهي مفيدة لحساب طول مجهول.",
        },
        lessonId: "l5",
      },
    ],
    ch3: [
      {
        id: "q1",
        question: {
          fr: "Quels outils utilise-t-on pour des constructions géométriques précises ?",
          en: "What tools are used for precise geometric constructions?",
          ar: "ما الأدوات المستخدمة للإنشاءات الهندسية الدقيقة؟",
        },
        options: [
          { fr: "La règle et le compas", en: "Ruler and compass", ar: "المسطرة والبرجل" },
          { fr: "La calculatrice uniquement", en: "A calculator only", ar: "الآلة الحاسبة فقط" },
          { fr: "Un rapporteur cassé", en: "A broken protractor", ar: "منقلة مكسورة" },
          { fr: "Aucun outil", en: "No tools", ar: "بدون أدوات" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "La règle (non graduée) et le compas permettent des constructions géométriques exactes.",
          en: "The (ungraduated) ruler and compass allow exact geometric constructions.",
          ar: "تسمح المسطرة (غير المدرجة) والبرجل بإنشاءات هندسية دقيقة.",
        },
        lessonId: "l6",
      },
      {
        id: "q2",
        question: {
          fr: "Pour résoudre un problème géométrique complexe, il est utile de…",
          en: "To solve a complex geometry problem, it helps to…",
          ar: "لحل مسألة هندسية معقدة، من المفيد…",
        },
        options: [
          { fr: "deviner la réponse", en: "guess the answer", ar: "تخمين الجواب" },
          { fr: "combiner plusieurs théorèmes (Pythagore, Thalès…)", en: "combine several theorems (Pythagoras, Thales…)", ar: "الجمع بين عدة نظريات (فيثاغورس، طاليس…)" },
          { fr: "ignorer les données", en: "ignore the given data", ar: "تجاهل المعطيات" },
          { fr: "changer les unités au hasard", en: "randomly change units", ar: "تغيير الوحدات عشوائياً" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Les problèmes complexes combinent souvent plusieurs théorèmes pour arriver à la solution.",
          en: "Complex problems often combine several theorems to reach the solution.",
          ar: "غالباً ما تجمع المسائل المعقدة عدة نظريات للوصول إلى الحل.",
        },
        lessonId: "l7",
      },
      {
        id: "q3",
        question: {
          fr: "Un triangle équilatéral a tous ses angles égaux à…",
          en: "An equilateral triangle has all angles equal to…",
          ar: "المثلث متساوي الأضلاع له زوايا كلها تساوي…",
        },
        options: [
          { fr: "90°", en: "90°", ar: "90°" },
          { fr: "45°", en: "45°", ar: "45°" },
          { fr: "60°", en: "60°", ar: "60°" },
          { fr: "120°", en: "120°", ar: "120°" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "La somme des angles d'un triangle vaut 180° ; répartie également, chaque angle vaut 60°.",
          en: "The angles of a triangle sum to 180°; split equally, each angle is 60°.",
          ar: "مجموع زوايا المثلث 180°؛ موزعة بالتساوي، كل زاوية تساوي 60°.",
        },
        lessonId: "l6",
      },
    ],
  },
  "math-statistics-102": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "À quoi sert la statistique ?",
          en: "What is statistics used for?",
          ar: "لماذا يستخدم الإحصاء؟",
        },
        options: [
          { fr: "À résoudre des équations", en: "To solve equations", ar: "لحل المعادلات" },
          { fr: "À collecter, organiser et interpréter des données", en: "To collect, organize, and interpret data", ar: "لجمع البيانات وتنظيمها وتفسيرها" },
          { fr: "À dessiner des figures géométriques", en: "To draw geometric figures", ar: "لرسم أشكال هندسية" },
          { fr: "À mesurer des angles", en: "To measure angles", ar: "لقياس الزوايا" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La statistique permet de collecter, organiser et interpréter des données pour en tirer des informations utiles.",
          en: "Statistics lets you collect, organize, and interpret data to draw useful conclusions.",
          ar: "يتيح الإحصاء جمع البيانات وتنظيمها وتفسيرها لاستخلاص معلومات مفيدة.",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Quel outil visuel représente le mieux la répartition de données par catégories ?",
          en: "Which visual tool best represents the distribution of data by category?",
          ar: "أي أداة بصرية تمثل توزيع البيانات حسب الفئات بشكل أفضل؟",
        },
        options: [
          { fr: "Un histogramme ou diagramme", en: "A histogram or diagram", ar: "مدرج تكراري أو مخطط" },
          { fr: "Une phrase", en: "A sentence", ar: "جملة" },
          { fr: "Une équation", en: "An equation", ar: "معادلة" },
          { fr: "Un angle", en: "An angle", ar: "زاوية" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "Les histogrammes et diagrammes rendent visuelle la répartition de données par catégories.",
          en: "Histograms and diagrams make the distribution of data by category visual.",
          ar: "تجعل المدرجات التكرارية والمخططات توزيع البيانات حسب الفئات مرئياً.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Sur 20 élèves, 5 ont eu la note maximale. Quelle est la fréquence relative en pourcentage ?",
          en: "Out of 20 students, 5 got the top grade. What is the relative frequency as a percentage?",
          ar: "من بين 20 تلميذاً، حصل 5 على العلامة القصوى. ما التكرار النسبي بالنسبة المئوية؟",
        },
        options: [
          { fr: "5%", en: "5%", ar: "5%" },
          { fr: "20%", en: "20%", ar: "20%" },
          { fr: "25%", en: "25%", ar: "25%" },
          { fr: "50%", en: "50%", ar: "50%" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "Fréquence relative = 5 / 20 = 0,25, soit 25%.",
          en: "Relative frequency = 5 / 20 = 0.25, i.e. 25%.",
          ar: "التكرار النسبي = 5 / 20 = 0.25، أي 25%.",
        },
        lessonId: "l3",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Comment calcule-t-on la moyenne arithmétique d'une série ?",
          en: "How do you calculate the arithmetic mean of a dataset?",
          ar: "كيف يُحسب المتوسط الحسابي لسلسلة؟",
        },
        options: [
          { fr: "En prenant la valeur la plus fréquente", en: "By taking the most frequent value", ar: "بأخذ القيمة الأكثر تكراراً" },
          { fr: "En divisant la somme des valeurs par leur nombre", en: "By dividing the sum of values by their count", ar: "بقسمة مجموع القيم على عددها" },
          { fr: "En prenant la valeur du milieu", en: "By taking the middle value", ar: "بأخذ القيمة الوسطى" },
          { fr: "En soustrayant le minimum du maximum", en: "By subtracting the minimum from the maximum", ar: "بطرح الأدنى من الأقصى" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La moyenne arithmétique est la somme de toutes les valeurs divisée par leur nombre.",
          en: "The arithmetic mean is the sum of all values divided by their count.",
          ar: "المتوسط الحسابي هو مجموع كل القيم مقسوماً على عددها.",
        },
        lessonId: "l4",
      },
      {
        id: "q2",
        question: {
          fr: "Quel est le mode d'une série de notes : 10, 12, 12, 14, 16 ?",
          en: "What is the mode of the grade series: 10, 12, 12, 14, 16?",
          ar: "ما منوال سلسلة العلامات: 10، 12، 12، 14، 16؟",
        },
        options: [
          { fr: "10", en: "10", ar: "10" },
          { fr: "12", en: "12", ar: "12" },
          { fr: "14", en: "14", ar: "14" },
          { fr: "16", en: "16", ar: "16" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le mode est la valeur la plus fréquente : 12 apparaît deux fois, plus que les autres.",
          en: "The mode is the most frequent value: 12 appears twice, more than the others.",
          ar: "المنوال هو القيمة الأكثر تكراراً: 12 يظهر مرتين، أكثر من غيره.",
        },
        lessonId: "l5",
      },
      {
        id: "q3",
        question: {
          fr: "Si on lance une pièce équilibrée, quelle est la probabilité d'obtenir « pile » ?",
          en: "If you flip a fair coin, what is the probability of getting heads?",
          ar: "عند رمي قطعة نقود متوازنة، ما احتمال الحصول على « وجه »؟",
        },
        options: [
          { fr: "0", en: "0", ar: "0" },
          { fr: "1/4", en: "1/4", ar: "1/4" },
          { fr: "1/2", en: "1/2", ar: "1/2" },
          { fr: "1", en: "1", ar: "1" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "Une pièce a deux issues équiprobables (pile ou face), donc la probabilité de chacune est 1/2.",
          en: "A coin has two equally likely outcomes (heads or tails), so each has probability 1/2.",
          ar: "لقطعة النقود نتيجتان متساويتان في الاحتمال (وجه أو ظهر)، لذا احتمال كل منهما 1/2.",
        },
        lessonId: "l6",
      },
    ],
  },
  "math-trigonometry-301": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Combien de radians y a-t-il dans un tour complet (360°) ?",
          en: "How many radians are in a full turn (360°)?",
          ar: "كم راديان في دورة كاملة (360°)؟",
        },
        options: [
          { fr: "π", en: "π", ar: "π" },
          { fr: "2π", en: "2π", ar: "2π" },
          { fr: "π/2", en: "π/2", ar: "π/2" },
          { fr: "360π", en: "360π", ar: "360π" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Un tour complet correspond à 2π radians, soit 360°.",
          en: "A full turn corresponds to 2π radians, i.e. 360°.",
          ar: "الدورة الكاملة تقابل 2π راديان، أي 360°.",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Sur le cercle unité, quel est le rayon ?",
          en: "On the unit circle, what is the radius?",
          ar: "على دائرة الوحدة، ما نصف القطر؟",
        },
        options: [
          { fr: "0", en: "0", ar: "0" },
          { fr: "1", en: "1", ar: "1" },
          { fr: "π", en: "π", ar: "π" },
          { fr: "2", en: "2", ar: "2" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le cercle unité a par définition un rayon égal à 1.",
          en: "The unit circle has, by definition, a radius equal to 1.",
          ar: "دائرة الوحدة نصف قطرها يساوي 1 حسب التعريف.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Sur le cercle trigonométrique, cos(x) et sin(x) correspondent à…",
          en: "On the trigonometric circle, cos(x) and sin(x) correspond to…",
          ar: "على الدائرة المثلثية، يقابل cos(x) و sin(x)…",
        },
        options: [
          { fr: "la longueur du rayon", en: "the length of the radius", ar: "طول نصف القطر" },
          { fr: "l'abscisse et l'ordonnée du point associé à l'angle", en: "the x- and y-coordinates of the point associated with the angle", ar: "الإحداثي السيني والصادي للنقطة المرتبطة بالزاوية" },
          { fr: "le périmètre du cercle", en: "the circle's perimeter", ar: "محيط الدائرة" },
          { fr: "l'aire du cercle", en: "the circle's area", ar: "مساحة الدائرة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Pour un angle x, le point correspondant sur le cercle unité a pour coordonnées (cos(x), sin(x)).",
          en: "For an angle x, the corresponding point on the unit circle has coordinates (cos(x), sin(x)).",
          ar: "لزاوية x، للنقطة المقابلة على دائرة الوحدة إحداثيات (cos(x), sin(x)).",
        },
        lessonId: "l3",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Quelle est la période de la fonction cosinus ?",
          en: "What is the period of the cosine function?",
          ar: "ما دورة دالة جيب التمام؟",
        },
        options: [
          { fr: "π", en: "π", ar: "π" },
          { fr: "2π", en: "2π", ar: "2π" },
          { fr: "π/2", en: "π/2", ar: "π/2" },
          { fr: "4π", en: "4π", ar: "4π" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La fonction cosinus se répète tous les 2π : c'est sa période.",
          en: "The cosine function repeats every 2π: that's its period.",
          ar: "تتكرر دالة جيب التمام كل 2π: وهي دورتها.",
        },
        lessonId: "l4",
      },
      {
        id: "q2",
        question: {
          fr: "La fonction sinus est-elle symétrique par rapport à l'origine ?",
          en: "Is the sine function symmetric about the origin?",
          ar: "هل دالة الجيب متناظرة بالنسبة للمبدأ؟",
        },
        options: [
          { fr: "Oui, elle est impaire : sin(−x) = −sin(x)", en: "Yes, it's odd: sin(−x) = −sin(x)", ar: "نعم، إنها فردية: sin(−x) = −sin(x)" },
          { fr: "Non, elle est paire", en: "No, it's even", ar: "لا، إنها زوجية" },
          { fr: "Elle n'a aucune symétrie", en: "It has no symmetry", ar: "ليس لها أي تناظر" },
          { fr: "Elle est symétrique par rapport à l'axe des y", en: "It's symmetric about the y-axis", ar: "متناظرة بالنسبة لمحور y" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "sin est une fonction impaire : sin(−x) = −sin(x), symétrique par rapport à l'origine.",
          en: "sin is an odd function: sin(−x) = −sin(x), symmetric about the origin.",
          ar: "الجيب دالة فردية: sin(−x) = −sin(x)، متناظرة بالنسبة للمبدأ.",
        },
        lessonId: "l5",
      },
      {
        id: "q3",
        question: {
          fr: "La tangente d'un angle est définie comme…",
          en: "The tangent of an angle is defined as…",
          ar: "يُعرَّف ظل زاوية بأنه…",
        },
        options: [
          { fr: "sin(x) + cos(x)", en: "sin(x) + cos(x)", ar: "sin(x) + cos(x)" },
          { fr: "sin(x) / cos(x)", en: "sin(x) / cos(x)", ar: "sin(x) / cos(x)" },
          { fr: "cos(x) / sin(x)", en: "cos(x) / sin(x)", ar: "cos(x) / sin(x)" },
          { fr: "sin(x) × cos(x)", en: "sin(x) × cos(x)", ar: "sin(x) × cos(x)" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "tan(x) = sin(x) / cos(x), non définie quand cos(x) = 0.",
          en: "tan(x) = sin(x) / cos(x), undefined when cos(x) = 0.",
          ar: "tan(x) = sin(x) / cos(x)، غير معرّفة عندما cos(x) = 0.",
        },
        lessonId: "l6",
      },
    ],
    ch3: [
      {
        id: "q1",
        question: {
          fr: "Combien de solutions a l'équation sin(x) = 0,5 sur [0, 2π[ ?",
          en: "How many solutions does sin(x) = 0.5 have on [0, 2π[?",
          ar: "كم حلاً لمعادلة sin(x) = 0.5 على [0, 2π[؟",
        },
        options: [
          { fr: "0", en: "0", ar: "0" },
          { fr: "1", en: "1", ar: "1" },
          { fr: "2", en: "2", ar: "2" },
          { fr: "4", en: "4", ar: "4" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "sin(x) = 0,5 a deux solutions sur un tour complet (π/6 et 5π/6), car le sinus atteint la même valeur en deux points symétriques.",
          en: "sin(x) = 0.5 has two solutions over a full turn (π/6 and 5π/6), since sine reaches the same value at two symmetric points.",
          ar: "لمعادلة sin(x) = 0.5 حلان في دورة كاملة (π/6 و5π/6)، لأن الجيب يبلغ نفس القيمة في نقطتين متناظرتين.",
        },
        lessonId: "l7",
      },
      {
        id: "q2",
        question: {
          fr: "Pour résoudre un problème de géométrie plane avec des angles, quelle branche des mathématiques utilise-t-on ?",
          en: "To solve a plane geometry problem involving angles, which branch of math is used?",
          ar: "لحل مسألة في الهندسة المستوية تتضمن زوايا، أي فرع من الرياضيات يُستخدم؟",
        },
        options: [
          { fr: "L'algèbre linéaire", en: "Linear algebra", ar: "الجبر الخطي" },
          { fr: "La trigonométrie", en: "Trigonometry", ar: "حساب المثلثات" },
          { fr: "Les statistiques", en: "Statistics", ar: "الإحصاء" },
          { fr: "L'arithmétique modulaire", en: "Modular arithmetic", ar: "الحساب النمطي" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La trigonométrie relie angles et longueurs, indispensable pour ces problèmes géométriques.",
          en: "Trigonometry links angles and lengths, essential for these geometry problems.",
          ar: "يربط حساب المثلثات بين الزوايا والأطوال، وهو ضروري لهذه المسائل الهندسية.",
        },
        lessonId: "l8",
      },
      {
        id: "q3",
        question: {
          fr: "cos(0) est égal à…",
          en: "cos(0) equals…",
          ar: "cos(0) يساوي…",
        },
        options: [
          { fr: "0", en: "0", ar: "0" },
          { fr: "1", en: "1", ar: "1" },
          { fr: "−1", en: "−1", ar: "−1" },
          { fr: "π", en: "π", ar: "π" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "À l'angle 0, le point sur le cercle unité est (1, 0), donc cos(0) = 1.",
          en: "At angle 0, the point on the unit circle is (1, 0), so cos(0) = 1.",
          ar: "عند الزاوية 0، تكون النقطة على دائرة الوحدة (1, 0)، إذن cos(0) = 1.",
        },
        lessonId: "l7",
      },
    ],
  },
  "physics-electricity-101": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Le courant électrique est un déplacement de…",
          en: "Electric current is a flow of…",
          ar: "التيار الكهربائي هو انتقال…",
        },
        options: [
          { fr: "chaleur", en: "heat", ar: "الحرارة" },
          { fr: "charges électriques", en: "electric charges", ar: "الشحنات الكهربائية" },
          { fr: "lumière", en: "light", ar: "الضوء" },
          { fr: "sons", en: "sound", ar: "الصوت" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le courant électrique est un déplacement ordonné de charges électriques (électrons) dans un circuit.",
          en: "Electric current is an ordered flow of electric charges (electrons) in a circuit.",
          ar: "التيار الكهربائي هو انتقال منظم للشحنات الكهربائية (الإلكترونات) في دائرة.",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Selon la loi d'Ohm U = R × I, si R = 10 Ω et I = 2 A, que vaut U ?",
          en: "According to Ohm's law U = R × I, if R = 10 Ω and I = 2 A, what is U?",
          ar: "حسب قانون أوم U = R × I، إذا كانت R = 10 Ω و I = 2 A، فما قيمة U؟",
        },
        options: [
          { fr: "5 V", en: "5 V", ar: "5 V" },
          { fr: "12 V", en: "12 V", ar: "12 V" },
          { fr: "20 V", en: "20 V", ar: "20 V" },
          { fr: "0.2 V", en: "0.2 V", ar: "0.2 V" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "U = R × I = 10 × 2 = 20 V.",
          en: "U = R × I = 10 × 2 = 20 V.",
          ar: "U = R × I = 10 × 2 = 20 V.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Dans la loi d'Ohm, que représente la lettre R ?",
          en: "In Ohm's law, what does the letter R represent?",
          ar: "في قانون أوم، ماذا يمثل الحرف R؟",
        },
        options: [
          { fr: "La tension", en: "Voltage", ar: "الجهد" },
          { fr: "L'intensité", en: "Current", ar: "التيار" },
          { fr: "La résistance", en: "Resistance", ar: "المقاومة" },
          { fr: "La puissance", en: "Power", ar: "القدرة" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "R représente la résistance électrique, mesurée en ohms (Ω).",
          en: "R represents electrical resistance, measured in ohms (Ω).",
          ar: "يمثل R المقاومة الكهربائية، وتُقاس بالأوم (Ω).",
        },
        lessonId: "l2",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Dans un circuit en série, l'intensité du courant est…",
          en: "In a series circuit, the current is…",
          ar: "في دائرة التوالي، شدة التيار…",
        },
        options: [
          { fr: "différente à chaque point", en: "different at every point", ar: "مختلفة في كل نقطة" },
          { fr: "la même en tout point du circuit", en: "the same at every point in the circuit", ar: "نفسها في كل نقطة من الدائرة" },
          { fr: "nulle", en: "zero", ar: "معدومة" },
          { fr: "infinie", en: "infinite", ar: "لانهائية" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "En série, il n'y a qu'un seul chemin pour le courant : l'intensité est la même partout.",
          en: "In series, there is only one path for the current: the intensity is the same everywhere.",
          ar: "في التوالي، هناك مسار واحد فقط للتيار: الشدة نفسها في كل مكان.",
        },
        lessonId: "l3",
      },
      {
        id: "q2",
        question: {
          fr: "Dans un circuit en parallèle, la tension aux bornes de chaque branche est…",
          en: "In a parallel circuit, the voltage across each branch is…",
          ar: "في دائرة التوازي، الجهد بين طرفي كل فرع…",
        },
        options: [
          { fr: "la même pour toutes les branches", en: "the same for every branch", ar: "نفسه لكل الفروع" },
          { fr: "différente selon la longueur du fil", en: "different depending on wire length", ar: "مختلف حسب طول السلك" },
          { fr: "toujours nulle", en: "always zero", ar: "دائماً معدوم" },
          { fr: "divisée entre les branches", en: "split between branches", ar: "موزع بين الفروع" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "En parallèle, toutes les branches partagent la même tension aux bornes.",
          en: "In parallel, all branches share the same voltage across their terminals.",
          ar: "في التوازي، تتشارك كل الفروع نفس الجهد بين طرفيها.",
        },
        lessonId: "l4",
      },
      {
        id: "q3",
        question: {
          fr: "La puissance électrique P consommée par un appareil se calcule par…",
          en: "The electrical power P consumed by a device is calculated by…",
          ar: "تُحسب القدرة الكهربائية P التي يستهلكها جهاز بـ…",
        },
        options: [
          { fr: "P = U + I", en: "P = U + I", ar: "P = U + I" },
          { fr: "P = U × I", en: "P = U × I", ar: "P = U × I" },
          { fr: "P = U / I", en: "P = U / I", ar: "P = U / I" },
          { fr: "P = U − I", en: "P = U − I", ar: "P = U − I" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La puissance électrique est le produit de la tension par l'intensité : P = U × I (en Watts).",
          en: "Electrical power is the product of voltage and current: P = U × I (in Watts).",
          ar: "القدرة الكهربائية هي جداء الجهد في التيار: P = U × I (بالواط).",
        },
        lessonId: "l5",
      },
    ],
  },
  "physics-optics-102": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "La vitesse de la lumière dans le vide est d'environ…",
          en: "The speed of light in a vacuum is approximately…",
          ar: "سرعة الضوء في الفراغ تقارب…",
        },
        options: [
          { fr: "300 000 km/s", en: "300,000 km/s", ar: "300 000 كم/ث" },
          { fr: "300 km/s", en: "300 km/s", ar: "300 كم/ث" },
          { fr: "3 000 km/s", en: "3,000 km/s", ar: "3 000 كم/ث" },
          { fr: "30 000 000 km/s", en: "30,000,000 km/s", ar: "30 000 000 كم/ث" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "La lumière se propage dans le vide à environ 300 000 km/s (c ≈ 3×10⁸ m/s).",
          en: "Light travels in a vacuum at about 300,000 km/s (c ≈ 3×10⁸ m/s).",
          ar: "ينتشر الضوء في الفراغ بسرعة تقارب 300 000 كم/ث (c ≈ 3×10⁸ م/ث).",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Une ombre se forme parce que la lumière…",
          en: "A shadow forms because light…",
          ar: "يتشكل الظل لأن الضوء…",
        },
        options: [
          { fr: "se propage en ligne droite et est bloquée par un objet opaque", en: "travels in a straight line and is blocked by an opaque object", ar: "ينتشر في خط مستقيم ويُحجب بجسم معتم" },
          { fr: "change de couleur", en: "changes color", ar: "يغيّر لونه" },
          { fr: "ralentit dans l'air", en: "slows down in air", ar: "يبطئ في الهواء" },
          { fr: "disparaît la nuit", en: "disappears at night", ar: "يختفي ليلاً" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "La propagation rectiligne de la lumière explique pourquoi un objet opaque crée une ombre nette.",
          en: "The rectilinear propagation of light explains why an opaque object casts a sharp shadow.",
          ar: "يفسر الانتشار المستقيم للضوء لماذا يشكّل جسم معتم ظلاً واضحاً.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Le Soleil est un exemple de source lumineuse…",
          en: "The Sun is an example of a … light source.",
          ar: "الشمس مثال على مصدر ضوئي…",
        },
        options: [
          { fr: "secondaire", en: "secondary", ar: "ثانوي" },
          { fr: "primaire", en: "primary", ar: "أولي" },
          { fr: "artificielle", en: "artificial", ar: "اصطناعي" },
          { fr: "inexistante", en: "nonexistent", ar: "غير موجود" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Une source primaire produit sa propre lumière, comme le Soleil ou une ampoule.",
          en: "A primary source produces its own light, like the Sun or a light bulb.",
          ar: "المصدر الأولي ينتج ضوءه بنفسه، مثل الشمس أو مصباح.",
        },
        lessonId: "l3",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Selon la loi de la réflexion, l'angle d'incidence est…",
          en: "According to the law of reflection, the angle of incidence is…",
          ar: "حسب قانون الانعكاس، زاوية السقوط…",
        },
        options: [
          { fr: "toujours nul", en: "always zero", ar: "دائماً معدومة" },
          { fr: "égal à l'angle de réflexion", en: "equal to the angle of reflection", ar: "تساوي زاوية الانعكاس" },
          { fr: "toujours 90°", en: "always 90°", ar: "دائماً 90°" },
          { fr: "le double de l'angle de réflexion", en: "double the angle of reflection", ar: "ضعف زاوية الانعكاس" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La loi de la réflexion stipule que l'angle d'incidence est toujours égal à l'angle de réflexion.",
          en: "The law of reflection states the angle of incidence always equals the angle of reflection.",
          ar: "ينص قانون الانعكاس على أن زاوية السقوط تساوي دائماً زاوية الانعكاس.",
        },
        lessonId: "l4",
      },
      {
        id: "q2",
        question: {
          fr: "La réfraction se produit quand la lumière…",
          en: "Refraction occurs when light…",
          ar: "يحدث الانكسار عندما…",
        },
        options: [
          { fr: "reste dans le même milieu", en: "stays in the same medium", ar: "يبقى الضوء في نفس الوسط" },
          { fr: "change de milieu (air vers eau, par exemple)", en: "changes medium (e.g. air to water)", ar: "يغير الضوء الوسط (من الهواء إلى الماء مثلاً)" },
          { fr: "s'éteint", en: "goes out", ar: "ينطفئ الضوء" },
          { fr: "devient sonore", en: "becomes sound", ar: "يتحول إلى صوت" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La réfraction est le changement de direction de la lumière lorsqu'elle passe d'un milieu à un autre, décrit par la loi de Snell-Descartes.",
          en: "Refraction is the change in direction of light as it passes from one medium to another, described by Snell-Descartes' law.",
          ar: "الانكسار هو تغير اتجاه الضوء عند انتقاله من وسط إلى آخر، ويصفه قانون سنيل-ديكارت.",
        },
        lessonId: "l5",
      },
      {
        id: "q3",
        question: {
          fr: "Une lentille convergente fait que des rayons parallèles…",
          en: "A converging lens makes parallel rays…",
          ar: "العدسة المقربة تجعل الأشعة المتوازية…",
        },
        options: [
          { fr: "se croisent en un point (le foyer)", en: "meet at a point (the focus)", ar: "تتقاطع في نقطة (البؤرة)" },
          { fr: "s'écartent davantage", en: "spread out further", ar: "تتباعد أكثر" },
          { fr: "restent parallèles", en: "stay parallel", ar: "تبقى متوازية" },
          { fr: "disparaissent", en: "disappear", ar: "تختفي" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "Une lentille convergente fait converger les rayons lumineux parallèles vers un point unique, le foyer.",
          en: "A converging lens makes parallel light rays converge to a single point, the focus.",
          ar: "تجعل العدسة المقربة الأشعة الضوئية المتوازية تتقارب نحو نقطة واحدة، هي البؤرة.",
        },
        lessonId: "l6",
      },
    ],
  },
  "biology-ecology-201": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Un écosystème est constitué…",
          en: "An ecosystem consists of…",
          ar: "يتكون النظام البيئي من…",
        },
        options: [
          { fr: "d'êtres vivants uniquement", en: "living things only", ar: "الكائنات الحية فقط" },
          { fr: "d'un milieu physique uniquement", en: "the physical environment only", ar: "الوسط الفيزيائي فقط" },
          { fr: "des êtres vivants et de leur milieu physique en interaction", en: "living things and their physical environment interacting", ar: "الكائنات الحية ووسطها الفيزيائي في تفاعل" },
          { fr: "de roches uniquement", en: "rocks only", ar: "الصخور فقط" },
        ],
        correctIndex: 2,
        explanation: {
          fr: "Un écosystème réunit une communauté d'êtres vivants et leur environnement physique, en interaction constante.",
          en: "An ecosystem combines a community of living things and their physical environment, constantly interacting.",
          ar: "يجمع النظام البيئي مجتمعاً من الكائنات الحية ووسطها الفيزيائي في تفاعل مستمر.",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Dans une chaîne alimentaire, qui est le producteur primaire ?",
          en: "In a food chain, who is the primary producer?",
          ar: "في سلسلة غذائية، من هو المنتج الأولي؟",
        },
        options: [
          { fr: "Le lion", en: "The lion", ar: "الأسد" },
          { fr: "La plante verte (photosynthèse)", en: "The green plant (photosynthesis)", ar: "النبات الأخضر (التمثيل الضوئي)" },
          { fr: "Le champignon décomposeur", en: "The decomposer fungus", ar: "الفطر المحلل" },
          { fr: "L'herbivore", en: "The herbivore", ar: "آكل الأعشاب" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Les plantes vertes produisent leur propre matière organique par photosynthèse : elles sont à la base de la chaîne alimentaire.",
          en: "Green plants produce their own organic matter through photosynthesis: they are at the base of the food chain.",
          ar: "تنتج النباتات الخضراء مادتها العضوية بنفسها عبر التمثيل الضوئي: فهي قاعدة السلسلة الغذائية.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Que mange un consommateur secondaire dans une chaîne alimentaire ?",
          en: "What does a secondary consumer eat in a food chain?",
          ar: "ماذا يأكل المستهلك الثانوي في سلسلة غذائية؟",
        },
        options: [
          { fr: "Des plantes uniquement", en: "Plants only", ar: "النباتات فقط" },
          { fr: "Des consommateurs primaires (herbivores)", en: "Primary consumers (herbivores)", ar: "المستهلكين الأوليين (آكلي الأعشاب)" },
          { fr: "Rien, il ne mange pas", en: "Nothing, it doesn't eat", ar: "لا شيء، فهو لا يأكل" },
          { fr: "Uniquement de la lumière solaire", en: "Only sunlight", ar: "ضوء الشمس فقط" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Un consommateur secondaire (carnivore) se nourrit des consommateurs primaires (herbivores).",
          en: "A secondary consumer (carnivore) feeds on primary consumers (herbivores).",
          ar: "يتغذى المستهلك الثانوي (آكل اللحوم) على المستهلكين الأوليين (آكلي الأعشاب).",
        },
        lessonId: "l2",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Quel type de pollution affecte particulièrement les océans ?",
          en: "Which type of pollution particularly affects oceans?",
          ar: "أي نوع من التلوث يؤثر بشكل خاص على المحيطات؟",
        },
        options: [
          { fr: "La pollution plastique", en: "Plastic pollution", ar: "التلوث بالبلاستيك" },
          { fr: "La pollution sonore uniquement", en: "Noise pollution only", ar: "التلوث الضوضائي فقط" },
          { fr: "Aucune pollution ne touche les océans", en: "No pollution affects oceans", ar: "لا يوجد تلوث يمس المحيطات" },
          { fr: "La pollution lumineuse uniquement", en: "Light pollution only", ar: "التلوث الضوئي فقط" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "La pollution plastique s'accumule massivement dans les océans et menace la faune marine.",
          en: "Plastic pollution accumulates massively in oceans and threatens marine wildlife.",
          ar: "يتراكم التلوث بالبلاستيك بكثافة في المحيطات ويهدد الحياة البحرية.",
        },
        lessonId: "l3",
      },
      {
        id: "q2",
        question: {
          fr: "Quelle est une cause majeure de l'extinction des espèces aujourd'hui ?",
          en: "What is a major cause of species extinction today?",
          ar: "ما أحد الأسباب الرئيسية لانقراض الأنواع اليوم؟",
        },
        options: [
          { fr: "La destruction des habitats naturels", en: "Destruction of natural habitats", ar: "تدمير الموائل الطبيعية" },
          { fr: "Trop de biodiversité", en: "Too much biodiversity", ar: "الكثير من التنوع البيولوجي" },
          { fr: "Trop d'écosystèmes protégés", en: "Too many protected ecosystems", ar: "الكثير من الأنظمة البيئية المحمية" },
          { fr: "L'absence de prédateurs", en: "Absence of predators", ar: "غياب المفترسات" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "La destruction des habitats naturels (déforestation, urbanisation) est l'une des principales causes d'extinction.",
          en: "Destruction of natural habitats (deforestation, urbanization) is one of the main causes of extinction.",
          ar: "يعد تدمير الموائل الطبيعية (إزالة الغابات، التمدن) من الأسباب الرئيسية للانقراض.",
        },
        lessonId: "l4",
      },
      {
        id: "q3",
        question: {
          fr: "Le développement durable cherche à concilier…",
          en: "Sustainable development seeks to balance…",
          ar: "تسعى التنمية المستدامة إلى التوفيق بين…",
        },
        options: [
          { fr: "économie, société et environnement", en: "economy, society, and environment", ar: "الاقتصاد والمجتمع والبيئة" },
          { fr: "uniquement le profit à court terme", en: "only short-term profit", ar: "الربح قصير المدى فقط" },
          { fr: "la pollution et la croissance", en: "pollution and growth", ar: "التلوث والنمو" },
          { fr: "aucun de ces éléments", en: "none of these", ar: "لا شيء مما سبق" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "Le développement durable vise un équilibre entre développement économique, bien-être social et préservation de l'environnement.",
          en: "Sustainable development aims for a balance between economic growth, social well-being, and environmental preservation.",
          ar: "تهدف التنمية المستدامة إلى تحقيق توازن بين النمو الاقتصادي والرفاه الاجتماعي والحفاظ على البيئة.",
        },
        lessonId: "l5",
      },
    ],
  },
  "biology-human-body-102": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Où commence la digestion des aliments ?",
          en: "Where does food digestion begin?",
          ar: "أين تبدأ عملية هضم الطعام؟",
        },
        options: [
          { fr: "Dans l'estomac", en: "In the stomach", ar: "في المعدة" },
          { fr: "Dans la bouche", en: "In the mouth", ar: "في الفم" },
          { fr: "Dans l'intestin", en: "In the intestine", ar: "في الأمعاء" },
          { fr: "Dans le foie", en: "In the liver", ar: "في الكبد" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "La digestion commence dans la bouche avec la mastication et la salive.",
          en: "Digestion begins in the mouth with chewing and saliva.",
          ar: "يبدأ الهضم في الفم بالمضغ واللعاب.",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Quel organe du système nerveux coordonne les décisions et les mouvements du corps ?",
          en: "Which organ of the nervous system coordinates decisions and body movements?",
          ar: "أي عضو في الجهاز العصبي ينسق القرارات وحركات الجسم؟",
        },
        options: [
          { fr: "Le cœur", en: "The heart", ar: "القلب" },
          { fr: "Le cerveau", en: "The brain", ar: "الدماغ" },
          { fr: "Le poumon", en: "The lung", ar: "الرئة" },
          { fr: "L'estomac", en: "The stomach", ar: "المعدة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le cerveau, via les neurones et la moelle épinière, coordonne les décisions et les mouvements.",
          en: "The brain, via neurons and the spinal cord, coordinates decisions and movements.",
          ar: "ينسق الدماغ، عبر الخلايا العصبية والحبل الشوكي، القرارات والحركات.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "Que permettent les articulations ?",
          en: "What do joints allow?",
          ar: "ماذا تتيح المفاصل؟",
        },
        options: [
          { fr: "La digestion des aliments", en: "Food digestion", ar: "هضم الطعام" },
          { fr: "Le mouvement entre deux os", en: "Movement between two bones", ar: "الحركة بين عظمتين" },
          { fr: "La circulation du sang", en: "Blood circulation", ar: "الدورة الدموية" },
          { fr: "La respiration", en: "Breathing", ar: "التنفس" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Les articulations relient deux os et permettent le mouvement du squelette.",
          en: "Joints connect two bones and allow the skeleton to move.",
          ar: "تصل المفاصل بين عظمتين وتتيح حركة الهيكل العظمي.",
        },
        lessonId: "l3",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "Quel organe pompe le sang dans tout le corps ?",
          en: "Which organ pumps blood throughout the body?",
          ar: "أي عضو يضخ الدم في جميع أنحاء الجسم؟",
        },
        options: [
          { fr: "Le foie", en: "The liver", ar: "الكبد" },
          { fr: "Le cœur", en: "The heart", ar: "القلب" },
          { fr: "Le rein", en: "The kidney", ar: "الكلية" },
          { fr: "L'estomac", en: "The stomach", ar: "المعدة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le cœur est une pompe musculaire qui fait circuler le sang dans tout l'organisme.",
          en: "The heart is a muscular pump that circulates blood throughout the body.",
          ar: "القلب مضخة عضلية تُجري الدم في كامل الجسم.",
        },
        lessonId: "l4",
      },
      {
        id: "q2",
        question: {
          fr: "Où se déroulent les échanges gazeux (O₂/CO₂) dans le système respiratoire ?",
          en: "Where do gas exchanges (O₂/CO₂) occur in the respiratory system?",
          ar: "أين تحدث تبادلات الغازات (O₂/CO₂) في الجهاز التنفسي؟",
        },
        options: [
          { fr: "Dans la trachée", en: "In the trachea", ar: "في القصبة الهوائية" },
          { fr: "Dans les alvéoles pulmonaires", en: "In the pulmonary alveoli", ar: "في الأسناخ الرئوية" },
          { fr: "Dans le nez", en: "In the nose", ar: "في الأنف" },
          { fr: "Dans le larynx", en: "In the larynx", ar: "في الحنجرة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Les échanges gazeux ont lieu dans les alvéoles pulmonaires, où l'oxygène passe dans le sang et le CO₂ en sort.",
          en: "Gas exchange happens in the pulmonary alveoli, where oxygen enters the blood and CO₂ leaves it.",
          ar: "تحدث تبادلات الغازات في الأسناخ الرئوية، حيث يدخل الأكسجين إلى الدم ويخرج منه ثاني أكسيد الكربون.",
        },
        lessonId: "l5",
      },
      {
        id: "q3",
        question: {
          fr: "Le rôle principal du système immunitaire est de…",
          en: "The main role of the immune system is to…",
          ar: "الدور الرئيسي للجهاز المناعي هو…",
        },
        options: [
          { fr: "digérer les aliments", en: "digest food", ar: "هضم الطعام" },
          { fr: "défendre le corps contre les agents pathogènes", en: "defend the body against pathogens", ar: "الدفاع عن الجسم ضد مسببات الأمراض" },
          { fr: "pomper le sang", en: "pump blood", ar: "ضخ الدم" },
          { fr: "transporter l'oxygène", en: "transport oxygen", ar: "نقل الأكسجين" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le système immunitaire protège l'organisme en identifiant et en détruisant les agents pathogènes (virus, bactéries).",
          en: "The immune system protects the body by identifying and destroying pathogens (viruses, bacteria).",
          ar: "يحمي الجهاز المناعي الجسم بتحديد وتدمير مسببات الأمراض (الفيروسات والبكتيريا).",
        },
        lessonId: "l6",
      },
    ],
  },
  "biology-genetics-301": {
    ch1: [
      {
        id: "q1",
        question: {
          fr: "Sur quelle plante Mendel a-t-il mené ses expériences fondatrices ?",
          en: "Which plant did Mendel use for his founding experiments?",
          ar: "على أي نبات أجرى مندل تجاربه التأسيسية؟",
        },
        options: [
          { fr: "Le blé", en: "Wheat", ar: "القمح" },
          { fr: "Le petit pois", en: "The pea plant", ar: "البازلاء" },
          { fr: "Le maïs", en: "Corn", ar: "الذرة" },
          { fr: "La tomate", en: "The tomato", ar: "الطماطم" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Mendel a étudié l'hérédité en croisant des plants de petits pois aux caractères variés.",
          en: "Mendel studied heredity by crossing pea plants with varied traits.",
          ar: "درس مندل الوراثة بتهجين نباتات البازلاء ذات الصفات المتنوعة.",
        },
        lessonId: "l1",
      },
      {
        id: "q2",
        question: {
          fr: "Un allèle dominant s'exprime…",
          en: "A dominant allele is expressed…",
          ar: "يُعبَّر عن الأليل السائد…",
        },
        options: [
          { fr: "seulement à l'état homozygote", en: "only in the homozygous state", ar: "فقط في حالة التماثل الزيجوتي" },
          { fr: "même en présence d'un seul exemplaire", en: "even with just one copy present", ar: "حتى مع وجود نسخة واحدة منه" },
          { fr: "jamais", en: "never", ar: "أبداً" },
          { fr: "uniquement chez les femelles", en: "only in females", ar: "فقط عند الإناث" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Un allèle dominant masque l'allèle récessif et s'exprime dès qu'il est présent, même en un seul exemplaire.",
          en: "A dominant allele masks the recessive allele and is expressed as soon as it is present, even as a single copy.",
          ar: "يحجب الأليل السائد الأليل المتنحي ويُعبَّر عنه بمجرد وجوده، حتى في نسخة واحدة.",
        },
        lessonId: "l2",
      },
      {
        id: "q3",
        question: {
          fr: "À quoi sert un tableau de Punnett ?",
          en: "What is a Punnett square used for?",
          ar: "ما فائدة مربع بانيت؟",
        },
        options: [
          { fr: "Mesurer la taille des cellules", en: "Measure cell size", ar: "قياس حجم الخلايا" },
          { fr: "Prédire les combinaisons possibles chez la descendance", en: "Predict possible offspring combinations", ar: "التنبؤ بالتركيبات الممكنة لدى النسل" },
          { fr: "Calculer l'âge d'un organisme", en: "Calculate an organism's age", ar: "حساب عمر كائن حي" },
          { fr: "Observer l'ADN au microscope", en: "Observe DNA under a microscope", ar: "مراقبة الحمض النووي تحت المجهر" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "Le tableau de Punnett croise les allèles des parents pour prédire les génotypes possibles de la descendance.",
          en: "The Punnett square crosses parental alleles to predict the offspring's possible genotypes.",
          ar: "يقاطع مربع بانيت أليلات الأبوين للتنبؤ بالأنماط الجينية الممكنة للنسل.",
        },
        lessonId: "l3",
      },
    ],
    ch2: [
      {
        id: "q1",
        question: {
          fr: "L'ADN a la forme d'une…",
          en: "DNA has the shape of a…",
          ar: "للحمض النووي شكل…",
        },
        options: [
          { fr: "sphère", en: "sphere", ar: "كرة" },
          { fr: "double hélice", en: "double helix", ar: "لولب مزدوج" },
          { fr: "ligne droite simple", en: "single straight line", ar: "خط مستقيم بسيط" },
          { fr: "étoile", en: "star", ar: "نجمة" },
        ],
        correctIndex: 1,
        explanation: {
          fr: "L'ADN est composé de deux brins enroulés en double hélice, reliés par des bases azotées.",
          en: "DNA is made of two strands wound into a double helix, connected by nitrogenous bases.",
          ar: "يتكون الحمض النووي من شريطين ملتفين على شكل لولب مزدوج، مرتبطين بقواعد نيتروجينية.",
        },
        lessonId: "l4",
      },
      {
        id: "q2",
        question: {
          fr: "La réplication de l'ADN permet…",
          en: "DNA replication allows…",
          ar: "يتيح تضاعف الحمض النووي…",
        },
        options: [
          { fr: "de copier l'ADN avant la division cellulaire", en: "copying DNA before cell division", ar: "نسخ الحمض النووي قبل انقسام الخلية" },
          { fr: "de détruire l'ADN", en: "destroying DNA", ar: "تدمير الحمض النووي" },
          { fr: "de fabriquer des protéines directement", en: "directly making proteins", ar: "تصنيع البروتينات مباشرة" },
          { fr: "de changer le nombre de chromosomes", en: "changing the chromosome number", ar: "تغيير عدد الصبغيات" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "La réplication copie l'ADN pour que chaque nouvelle cellule reçoive une copie complète du matériel génétique.",
          en: "Replication copies DNA so each new cell receives a full copy of the genetic material.",
          ar: "يقوم التضاعف بنسخ الحمض النووي حتى تحصل كل خلية جديدة على نسخة كاملة من المادة الوراثية.",
        },
        lessonId: "l5",
      },
      {
        id: "q3",
        question: {
          fr: "Une mutation génétique est…",
          en: "A genetic mutation is…",
          ar: "الطفرة الجينية هي…",
        },
        options: [
          { fr: "un changement dans la séquence d'ADN", en: "a change in the DNA sequence", ar: "تغير في تسلسل الحمض النووي" },
          { fr: "une maladie contagieuse uniquement", en: "only a contagious disease", ar: "مرض معدٍ فقط" },
          { fr: "un type de cellule", en: "a type of cell", ar: "نوع من الخلايا" },
          { fr: "une méthode de reproduction", en: "a method of reproduction", ar: "طريقة تكاثر" },
        ],
        correctIndex: 0,
        explanation: {
          fr: "Une mutation est une modification de la séquence d'ADN, qui peut être neutre, bénéfique ou nuisible.",
          en: "A mutation is a change in the DNA sequence, which can be neutral, beneficial, or harmful.",
          ar: "الطفرة هي تغير في تسلسل الحمض النووي، يمكن أن يكون محايداً أو مفيداً أو ضاراً.",
        },
        lessonId: "l6",
      },
    ],
  },
};

export function getQuiz(courseId: string, chapterId: string): QuizQuestion[] | null {
  return quizzes[courseId]?.[chapterId] ?? null;
}

export function chapterHasQuiz(courseId: string, chapterId: string): boolean {
  return Boolean(quizzes[courseId]?.[chapterId]);
}

// ——— Course extras: learning outcomes, prerequisites, reviews (mock) ———

export type Review = {
  author: string;
  rating: number;
  text: { fr: string; en: string; ar: string };
  date: string;
};

type CourseExtras = {
  outcomes: { fr: string; en: string; ar: string }[];
  prerequisiteId?: string;
  reviews: Review[];
};

const defaultOutcomes: CourseExtras["outcomes"] = [
  {
    fr: "Comprendre les notions clés du chapitre, pas à pas",
    en: "Understand the chapter's key concepts, step by step",
    ar: "فهم المفاهيم الأساسية للفصل خطوة بخطوة",
  },
  {
    fr: "T'entraîner avec des exercices corrigés en vidéo",
    en: "Practice with video-corrected exercises",
    ar: "التدرب بتمارين مصححة بالفيديو",
  },
  {
    fr: "Préparer tes contrôles avec les fiches PDF",
    en: "Prepare for tests with the PDF sheets",
    ar: "التحضير للفروض بملفات PDF",
  },
  {
    fr: "Valider chaque chapitre avec un quiz",
    en: "Validate each chapter with a quiz",
    ar: "التحقق من كل فصل باختبار",
  },
];

const courseExtras: Record<string, Partial<CourseExtras>> = {
  "math-algebra-101": {
    outcomes: [
      {
        fr: "Traduire un problème en expression algébrique",
        en: "Translate a problem into an algebraic expression",
        ar: "ترجمة مسألة إلى تعبير جبري",
      },
      {
        fr: "Résoudre des équations du premier degré avec méthode",
        en: "Solve first-degree equations methodically",
        ar: "حل معادلات الدرجة الأولى بمنهجية",
      },
      {
        fr: "Maîtriser les systèmes d'équations (substitution, élimination)",
        en: "Master systems of equations (substitution, elimination)",
        ar: "إتقان أنظمة المعادلات (التعويض والحذف)",
      },
      {
        fr: "Résoudre et représenter des inégalités",
        en: "Solve and represent inequalities",
        ar: "حل المتراجحات وتمثيلها",
      },
    ],
    reviews: [
      {
        author: "Lina M.",
        rating: 5,
        text: {
          fr: "Les schémas m'ont enfin fait comprendre les équations. Les PDF sont super utiles avant un contrôle.",
          en: "The diagrams finally made me understand equations. The PDFs are so useful before a test.",
          ar: "الرسوم جعلتني أفهم المعادلات أخيراً. ملفات PDF مفيدة جداً قبل الفرض.",
        },
        date: "2026-05-14",
      },
      {
        author: "Yanis B.",
        rating: 5,
        text: {
          fr: "Le prof explique doucement et refait chaque exemple. J'ai remonté ma moyenne de 3 points.",
          en: "The teacher explains calmly and reworks every example. My average went up 3 points.",
          ar: "الأستاذ يشرح بهدوء ويعيد كل مثال. ارتفع معدلي بثلاث نقاط.",
        },
        date: "2026-04-02",
      },
      {
        author: "Sara K.",
        rating: 4,
        text: {
          fr: "Très clair. J'aurais aimé encore plus d'exercices sur les systèmes.",
          en: "Very clear. I'd have liked even more exercises on systems.",
          ar: "واضح جداً. كنت أتمنى تمارين أكثر عن الأنظمة.",
        },
        date: "2026-03-19",
      },
    ],
  },
  "math-geometry-201": {
    prerequisiteId: "math-algebra-101",
    outcomes: [
      {
        fr: "Identifier les propriétés des triangles, quadrilatères et cercles",
        en: "Identify the properties of triangles, quadrilaterals and circles",
        ar: "تحديد خصائص المثلثات والرباعيات والدوائر",
      },
      {
        fr: "Démontrer avec les théorèmes de Pythagore et de Thalès",
        en: "Prove statements using the Pythagorean and Thales theorems",
        ar: "البرهنة باستعمال نظريتي فيثاغورس وطاليس",
      },
      {
        fr: "Calculer aires et périmètres de figures composées",
        en: "Calculate the area and perimeter of composite figures",
        ar: "حساب مساحات ومحيطات الأشكال المركبة",
      },
      {
        fr: "Construire une figure géométrique à partir d'un énoncé",
        en: "Construct a geometric figure from a written statement",
        ar: "إنشاء شكل هندسي انطلاقاً من نص المسألة",
      },
    ],
    reviews: [
      {
        author: "Nadia F.",
        rating: 5,
        text: {
          fr: "Le prof Benali rend les démonstrations logiques, pas juste à apprendre par cœur.",
          en: "Pr. Benali makes the proofs feel logical, not just something to memorize.",
          ar: "الأستاذ بنعلي يجعل البراهين منطقية وليست مجرد حفظ.",
        },
        date: "2026-05-02",
      },
      {
        author: "Omar T.",
        rating: 4,
        text: {
          fr: "Bon rythme, un peu rapide sur Thalès mais les fiches PDF rattrapent ça.",
          en: "Good pace, a bit fast on Thales but the PDF sheets make up for it.",
          ar: "إيقاع جيد، سريع قليلاً في نظرية طاليس لكن ملفات PDF تعوض ذلك.",
        },
        date: "2026-03-27",
      },
    ],
  },
  "math-statistics-102": {
    outcomes: [
      {
        fr: "Organiser des données avec tableaux et graphiques",
        en: "Organize data using tables and charts",
        ar: "تنظيم المعطيات بجداول ورسوم بيانية",
      },
      {
        fr: "Calculer moyenne, médiane et écart-type d'une série",
        en: "Calculate the mean, median and standard deviation of a series",
        ar: "حساب المتوسط والوسيط والانحراف المعياري لسلسلة",
      },
      {
        fr: "Calculer une probabilité simple ou conditionnelle",
        en: "Calculate a simple or conditional probability",
        ar: "حساب احتمال بسيط أو شرطي",
      },
      {
        fr: "Interpréter un résultat statistique dans un contexte réel",
        en: "Interpret a statistical result in a real-world context",
        ar: "تفسير نتيجة إحصائية في سياق واقعي",
      },
    ],
    reviews: [
      {
        author: "Camille R.",
        rating: 5,
        text: {
          fr: "Les probabilités enfin claires grâce aux exemples avec des dés et des cartes.",
          en: "Probability finally made sense thanks to the dice and card examples.",
          ar: "أصبحت الاحتمالات واضحة أخيراً بفضل أمثلة النرد والأوراق.",
        },
        date: "2026-04-18",
      },
      {
        author: "Yassine H.",
        rating: 4,
        text: {
          fr: "Très utile pour le brevet, j'aurais aimé un exercice de synthèse en plus.",
          en: "Very useful for the exam, I'd have liked one more synthesis exercise.",
          ar: "مفيد جداً للامتحان، كنت أتمنى تمريناً تركيبياً إضافياً.",
        },
        date: "2026-02-11",
      },
    ],
  },
  "math-trigonometry-301": {
    prerequisiteId: "math-geometry-201",
    outcomes: [
      {
        fr: "Utiliser sinus, cosinus et tangente dans un triangle rectangle",
        en: "Use sine, cosine and tangent in a right triangle",
        ar: "استعمال الجيب وجيب التمام والظل في مثلث قائم الزاوية",
      },
      {
        fr: "Convertir entre degrés et radians",
        en: "Convert between degrees and radians",
        ar: "التحويل بين الدرجات والراديان",
      },
      {
        fr: "Lire et tracer le cercle trigonométrique",
        en: "Read and sketch the trigonometric (unit) circle",
        ar: "قراءة ورسم الدائرة المثلثية",
      },
      {
        fr: "Résoudre une équation trigonométrique simple",
        en: "Solve a simple trigonometric equation",
        ar: "حل معادلة مثلثية بسيطة",
      },
    ],
    reviews: [
      {
        author: "Ines D.",
        rating: 5,
        text: {
          fr: "Le cercle trigonométrique animé a tout changé, je visualise enfin les angles.",
          en: "The animated unit circle changed everything — I finally visualize the angles.",
          ar: "الدائرة المثلثية المتحركة غيّرت كل شيء، أصبحت أتخيل الزوايا أخيراً.",
        },
        date: "2026-05-09",
      },
      {
        author: "Karim S.",
        rating: 4,
        text: {
          fr: "Exigeant mais bien expliqué, indispensable avant la trigonométrie du lycée.",
          en: "Demanding but well explained — essential before high-school trigonometry.",
          ar: "صعب لكن مشروح جيداً، ضروري قبل حساب المثلثات في الثانوي.",
        },
        date: "2026-03-30",
      },
    ],
  },
  "physics-mechanics-101": {
    outcomes: [
      {
        fr: "Décrire un mouvement avec vitesse et trajectoire",
        en: "Describe a motion using speed and trajectory",
        ar: "وصف حركة باستعمال السرعة والمسار",
      },
      {
        fr: "Appliquer les lois de Newton à des situations concrètes",
        en: "Apply Newton's laws to concrete situations",
        ar: "تطبيق قوانين نيوتن على حالات ملموسة",
      },
      {
        fr: "Représenter les forces qui s'exercent sur un objet",
        en: "Represent the forces acting on an object",
        ar: "تمثيل القوى المؤثرة على جسم",
      },
      {
        fr: "Calculer le travail et l'énergie mécanique",
        en: "Calculate work and mechanical energy",
        ar: "حساب الشغل والطاقة الميكانيكية",
      },
    ],
    reviews: [
      {
        author: "Sofia L.",
        rating: 5,
        text: {
          fr: "La Dre Tazi utilise plein d'exemples du quotidien, ça rend la mécanique concrète.",
          en: "Dr. Tazi uses lots of everyday examples, which makes mechanics feel concrete.",
          ar: "الدكتورة تازي تستعمل أمثلة يومية كثيرة، مما يجعل الميكانيكا ملموسة.",
        },
        date: "2026-04-25",
      },
      {
        author: "Adam Z.",
        rating: 5,
        text: {
          fr: "Les schémas de forces sont hyper clairs, j'ai compris Newton en une vidéo.",
          en: "The force diagrams are super clear, I understood Newton in one video.",
          ar: "رسوم القوى واضحة جداً، فهمت قوانين نيوتن في فيديو واحد.",
        },
        date: "2026-03-08",
      },
    ],
  },
  "physics-electricity-101": {
    outcomes: [
      {
        fr: "Distinguer circuit série et circuit dérivation",
        en: "Distinguish series circuits from parallel circuits",
        ar: "التمييز بين الدارة على التوالي والدارة على التوازي",
      },
      {
        fr: "Appliquer la loi d'Ohm pour calculer tension, intensité et résistance",
        en: "Apply Ohm's law to calculate voltage, current and resistance",
        ar: "تطبيق قانون أوم لحساب التوتر والشدة والمقاومة",
      },
      {
        fr: "Lire et dessiner un schéma électrique normalisé",
        en: "Read and draw a standard circuit diagram",
        ar: "قراءة ورسم مخطط كهربائي معياري",
      },
      {
        fr: "Adopter les bons réflexes de sécurité électrique",
        en: "Adopt correct electrical safety habits",
        ar: "اتباع قواعد السلامة الكهربائية الصحيحة",
      },
    ],
    reviews: [
      {
        author: "Lucas P.",
        rating: 4,
        text: {
          fr: "La loi d'Ohm expliquée avec une analogie de tuyau d'eau, très efficace.",
          en: "Ohm's law explained with a water-pipe analogy — very effective.",
          ar: "قانون أوم مشروح بتشبيه أنبوب الماء، فعّال جداً.",
        },
        date: "2026-05-01",
      },
      {
        author: "Nour B.",
        rating: 5,
        text: {
          fr: "Les schémas de circuits sont propres et les exercices progressifs.",
          en: "The circuit diagrams are clean and the exercises build up nicely.",
          ar: "المخططات واضحة والتمارين متدرجة بشكل جيد.",
        },
        date: "2026-02-20",
      },
    ],
  },
  "physics-optics-102": {
    prerequisiteId: "physics-mechanics-101",
    outcomes: [
      {
        fr: "Expliquer la propagation rectiligne de la lumière",
        en: "Explain the rectilinear propagation of light",
        ar: "شرح الانتشار المستقيمي للضوء",
      },
      {
        fr: "Construire l'image formée par une lentille convergente",
        en: "Construct the image formed by a converging lens",
        ar: "إنشاء الصورة المتكونة عبر عدسة مجمّعة",
      },
      {
        fr: "Distinguer réflexion et réfraction de la lumière",
        en: "Distinguish light reflection from refraction",
        ar: "التمييز بين انعكاس الضوء وانكساره",
      },
      {
        fr: "Relier les phénomènes optiques au fonctionnement de l'œil",
        en: "Connect optical phenomena to how the eye works",
        ar: "ربط الظواهر الضوئية بعمل العين",
      },
    ],
    reviews: [
      {
        author: "Manel A.",
        rating: 5,
        text: {
          fr: "Les tracés de rayons lumineux sont animés, ça change tout pour comprendre les lentilles.",
          en: "The light-ray diagrams are animated, which makes lenses so much easier to grasp.",
          ar: "رسوم الأشعة الضوئية متحركة، وهذا يسهّل فهم العدسات كثيراً.",
        },
        date: "2026-04-12",
      },
      {
        author: "Rayan M.",
        rating: 4,
        text: {
          fr: "Chapitre court mais dense, il faut revoir les vidéos deux fois.",
          en: "Short but dense chapter — worth watching the videos twice.",
          ar: "فصل قصير لكنه كثيف، يستحق مشاهدة الفيديوهات مرتين.",
        },
        date: "2026-01-30",
      },
    ],
  },
  "biology-cells-101": {
    outcomes: [
      {
        fr: "Nommer les organites de la cellule et leur rôle",
        en: "Name the cell's organelles and their role",
        ar: "تسمية عضيات الخلية ودورها",
      },
      {
        fr: "Comparer cellule animale et cellule végétale",
        en: "Compare an animal cell to a plant cell",
        ar: "مقارنة الخلية الحيوانية والخلية النباتية",
      },
      {
        fr: "Décrire les étapes de la division cellulaire",
        en: "Describe the stages of cell division",
        ar: "وصف مراحل الانقسام الخلوي",
      },
      {
        fr: "Utiliser un microscope et interpréter une observation",
        en: "Use a microscope and interpret an observation",
        ar: "استعمال المجهر وتفسير الملاحظة",
      },
    ],
    reviews: [
      {
        author: "Zineb K.",
        rating: 5,
        text: {
          fr: "Les schémas de cellules sont magnifiques et bien légendés.",
          en: "The cell diagrams are beautiful and clearly labeled.",
          ar: "رسوم الخلايا جميلة ومُعنونة بوضوح.",
        },
        date: "2026-05-06",
      },
      {
        author: "Hugo V.",
        rating: 4,
        text: {
          fr: "Très pédagogue, mais j'aurais aimé une vidéo au microscope réel.",
          en: "Very pedagogical, though I'd have liked footage from a real microscope.",
          ar: "تربوي جداً، لكن كنت أتمنى فيديو حقيقياً بالمجهر.",
        },
        date: "2026-03-15",
      },
    ],
  },
  "biology-ecology-201": {
    prerequisiteId: "biology-cells-101",
    outcomes: [
      {
        fr: "Décrire les relations entre êtres vivants dans un écosystème",
        en: "Describe how living things interact within an ecosystem",
        ar: "وصف العلاقات بين الكائنات الحية داخل نظام بيئي",
      },
      {
        fr: "Expliquer une chaîne et un réseau alimentaire",
        en: "Explain a food chain and a food web",
        ar: "شرح السلسلة والشبكة الغذائية",
      },
      {
        fr: "Analyser l'impact humain sur un milieu naturel",
        en: "Analyze human impact on a natural environment",
        ar: "تحليل تأثير الإنسان على وسط طبيعي",
      },
      {
        fr: "Proposer des gestes concrets pour préserver la biodiversité",
        en: "Suggest concrete actions to preserve biodiversity",
        ar: "اقتراح إجراءات ملموسة للحفاظ على التنوع البيولوجي",
      },
    ],
    reviews: [
      {
        author: "Salma E.",
        rating: 5,
        text: {
          fr: "Cours très concret, avec des exemples de forêts et rivières près de chez moi.",
          en: "Very concrete course, with examples of forests and rivers near where I live.",
          ar: "درس ملموس جداً بأمثلة عن غابات وأنهار قريبة من منزلي.",
        },
        date: "2026-04-29",
      },
      {
        author: "Mathis G.",
        rating: 4,
        text: {
          fr: "J'ai adoré le chapitre sur les réseaux alimentaires, bien illustré.",
          en: "I loved the food-web chapter, really well illustrated.",
          ar: "أحببت فصل الشبكات الغذائية، موضح بشكل جيد.",
        },
        date: "2026-02-14",
      },
    ],
  },
  "biology-human-body-102": {
    outcomes: [
      {
        fr: "Situer les grands systèmes du corps humain et leur fonction",
        en: "Locate the body's major systems and their function",
        ar: "تحديد الأجهزة الكبرى لجسم الإنسان ووظيفتها",
      },
      {
        fr: "Expliquer le trajet de l'air et du sang dans l'organisme",
        en: "Explain the path of air and blood through the body",
        ar: "شرح مسار الهواء والدم داخل الجسم",
      },
      {
        fr: "Décrire le rôle du système digestif dans la nutrition",
        en: "Describe the digestive system's role in nutrition",
        ar: "وصف دور الجهاز الهضمي في التغذية",
      },
      {
        fr: "Relier hygiène de vie et bon fonctionnement du corps",
        en: "Connect lifestyle habits to how well the body functions",
        ar: "ربط نمط الحياة الصحي بحسن سير الجسم",
      },
    ],
    reviews: [
      {
        author: "Aya R.",
        rating: 5,
        text: {
          fr: "La Pre Zahra explique le corps humain simplement, j'ai adoré le chapitre circulation.",
          en: "Pr. Zahra explains the human body simply, I loved the circulation chapter.",
          ar: "الأستاذة زهراء تشرح جسم الإنسان ببساطة، أحببت فصل الدورة الدموية.",
        },
        date: "2026-05-11",
      },
      {
        author: "Noah C.",
        rating: 5,
        text: {
          fr: "Les animations du système respiratoire sont bluffantes de clarté.",
          en: "The respiratory system animations are impressively clear.",
          ar: "رسوم الجهاز التنفسي المتحركة واضحة بشكل مذهل.",
        },
        date: "2026-03-22",
      },
    ],
  },
  "biology-genetics-301": {
    outcomes: [
      {
        fr: "Expliquer ce qu'est un gène et un chromosome",
        en: "Explain what a gene and a chromosome are",
        ar: "شرح ماهية المورثة والصبغي",
      },
      {
        fr: "Construire et lire un arbre généalogique",
        en: "Build and read a family (pedigree) tree",
        ar: "إنشاء وقراءة شجرة نسب",
      },
      {
        fr: "Prévoir la transmission d'un caractère héréditaire simple",
        en: "Predict the transmission of a simple hereditary trait",
        ar: "توقع انتقال صفة وراثية بسيطة",
      },
      {
        fr: "Distinguer information génétique et environnement",
        en: "Distinguish genetic information from environmental factors",
        ar: "التمييز بين المعلومة الوراثية والعامل البيئي",
      },
    ],
    reviews: [
      {
        author: "Chaimae O.",
        rating: 5,
        text: {
          fr: "La double hélice enfin comprise grâce aux schémas 3D.",
          en: "I finally understood the double helix thanks to the 3D diagrams.",
          ar: "فهمت اللولب المزدوج أخيراً بفضل الرسوم ثلاثية الأبعاد.",
        },
        date: "2026-05-03",
      },
      {
        author: "Ethan F.",
        rating: 4,
        text: {
          fr: "Chapitre exigeant mais les exemples d'arbres généalogiques aident beaucoup.",
          en: "Demanding chapter, but the pedigree-tree examples help a lot.",
          ar: "فصل صعب لكن أمثلة أشجار النسب تساعد كثيراً.",
        },
        date: "2026-02-27",
      },
    ],
  },
};

export function getCourseExtras(courseId: string): CourseExtras {
  const extras = courseExtras[courseId] ?? {};
  return {
    outcomes: extras.outcomes ?? defaultOutcomes,
    prerequisiteId: extras.prerequisiteId,
    reviews: extras.reviews ?? [],
  };
}

// ——— Teachers (derived from course instructors) ———

export function teacherSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/^(pr|dr|mme|m)\.?\s+/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getTeacher(slug: string) {
  const taught = courses.filter((c) => teacherSlug(c.instructor.name) === slug);
  if (taught.length === 0) return null;
  const { instructor } = taught[0];
  const studentCount = taught.reduce((sum, c) => sum + c.studentCount, 0);
  const rating = taught.reduce((sum, c) => sum + c.rating, 0) / taught.length;
  return { instructor, courses: taught, studentCount, rating };
}
