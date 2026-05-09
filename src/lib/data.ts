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

export const subjectColors: Record<Subject, { bg: string; text: string; accent: string }> = {
  math: { bg: "bg-blue-50", text: "text-blue-700", accent: "bg-blue-600" },
  physics: { bg: "bg-purple-50", text: "text-purple-700", accent: "bg-purple-600" },
  biology: { bg: "bg-green-50", text: "text-green-700", accent: "bg-green-600" },
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Découvrez les concepts fondamentaux de l'algèbre.",
              en: "Discover the fundamental concepts of algebra.",
              ar: "اكتشف المفاهيم الأساسية للجبر.",
            },
            documents: [{ name: "intro-algebre.pdf", url: "#" }],
          },
          {
            id: "l2",
            title: { fr: "Variables et constantes", en: "Variables and Constants", ar: "المتغيرات والثوابت" },
            duration: "15:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Techniques pour résoudre des équations du premier degré.",
              en: "Techniques for solving first-degree equations.",
              ar: "تقنيات لحل معادلات الدرجة الأولى.",
            },
            documents: [{ name: "equations-exercices.pdf", url: "#" }],
          },
          {
            id: "l5",
            title: { fr: "Équations avec fractions", en: "Equations with Fractions", ar: "معادلات بالكسور" },
            duration: "22:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Résoudre un système par substitution d'une variable.",
              en: "Solve a system by substituting one variable.",
              ar: "حل النظام بتعويض متغير.",
            },
            documents: [{ name: "systemes-methode.pdf", url: "#" }],
          },
          {
            id: "l8",
            title: { fr: "Méthode par élimination", en: "Elimination Method", ar: "طريقة الحذف" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Techniques pour résoudre et représenter des inégalités.",
              en: "Techniques to solve and represent inequalities.",
              ar: "تقنيات لحل المتراجحات وتمثيلها.",
            },
            documents: [{ name: "inegalites-exercices.pdf", url: "#" }],
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
            documents: [{ name: "pythagore-resume.pdf", url: "#" }],
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
            documents: [{ name: "cercle-formules.pdf", url: "#" }],
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
            documents: [{ name: "geometrie-problemes.pdf", url: "#" }],
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
            documents: [{ name: "graphiques-exercices.pdf", url: "#" }],
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
            documents: [{ name: "mesures-cours.pdf", url: "#" }],
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
            documents: [{ name: "probabilites-intro.pdf", url: "#" }],
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
            documents: [{ name: "cercle-trigo.pdf", url: "#" }],
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
            documents: [{ name: "fonctions-trigo.pdf", url: "#" }],
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
            documents: [{ name: "equations-trigo-exercices.pdf", url: "#" }],
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
        ar: "دكتورة في الفيزياء، 10 سنوات تدريس",
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
            documents: [{ name: "cinematique-formules.pdf", url: "#" }],
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
            documents: [{ name: "newton-exercices.pdf", url: "#" }],
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
            documents: [{ name: "travail-energie.pdf", url: "#" }],
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
              ar: "الطاقة الكامنة الثقالية وانحفاظ الطاقة.",
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
        ar: "دكتورة في الفيزياء، 10 سنوات تدريس",
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
            documents: [{ name: "loi-ohm-resume.pdf", url: "#" }],
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
            documents: [{ name: "circuits-exercices.pdf", url: "#" }],
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
        ar: "دكتورة في الفيزياء، 10 سنوات تدريس",
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
            documents: [{ name: "propagation-lumiere.pdf", url: "#" }],
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
            documents: [{ name: "reflexion-lois.pdf", url: "#" }],
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
            documents: [{ name: "cellules-schema.pdf", url: "#" }],
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
            documents: [{ name: "mitose-schema.pdf", url: "#" }],
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
    title: { fr: "Écologie et environnement", en: "Ecology and Environment", ar: "علم البيئة والمحيط" },
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
            documents: [{ name: "chaines-alimentaires.pdf", url: "#" }],
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
            documents: [{ name: "biodiversite-rapport.pdf", url: "#" }],
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
            documents: [{ name: "systeme-digestif.pdf", url: "#" }],
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
            documents: [{ name: "coeur-circulation.pdf", url: "#" }],
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
    title: { fr: "Génétique et hérédité", en: "Genetics and Heredity", ar: "علم الوراثة والتوارث" },
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
            documents: [{ name: "mendel-lois.pdf", url: "#" }],
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
            documents: [{ name: "croisements-exercices.pdf", url: "#" }],
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
            documents: [{ name: "adn-structure.pdf", url: "#" }],
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
