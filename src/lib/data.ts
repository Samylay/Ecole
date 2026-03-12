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

export type Instructor = {
  id: string;
  name: string;
  avatar: string;
  bio: { fr: string; en: string; ar: string };
  expertise: Subject;
  courseCount: number;
  studentCount: number;
  rating: number;
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
  instructorId: string;
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
  math: "\u03C0",
  physics: "\u269B",
  biology: "\u{1F9EC}",
};

export const instructors: Instructor[] = [
  {
    id: "john-smith",
    name: "Pr. John Smith",
    avatar: "JS",
    bio: {
      fr: "Professeur de mathématiques avec 15 ans d'expérience dans l'enseignement au collège et au lycée. Passionné par la pédagogie et les nouvelles méthodes d'apprentissage, il rend les mathématiques accessibles à tous.",
      en: "Mathematics teacher with 15 years of experience teaching middle and high school. Passionate about pedagogy and new learning methods, he makes mathematics accessible to everyone.",
      ar: "أستاذ رياضيات بخبرة 15 سنة في التدريس بالمتوسط والثانوي. شغوف بالبيداغوجيا وطرق التعلم الحديثة، يجعل الرياضيات في متناول الجميع.",
    },
    expertise: "math",
    courseCount: 3,
    studentCount: 5730,
    rating: 4.8,
  },
  {
    id: "robert-johnson",
    name: "Pr. Robert Johnson",
    avatar: "RJ",
    bio: {
      fr: "Agrégé de mathématiques et spécialiste en analyse et en algèbre avancée. Il prépare les élèves aux concours et examens avec rigueur et clarté, rendant les concepts complexes simples à comprendre.",
      en: "Mathematics professor specializing in analysis and advanced algebra. He prepares students for competitions and exams with rigor and clarity, making complex concepts simple to understand.",
      ar: "أستاذ رياضيات متخصص في التحليل والجبر المتقدم. يحضر الطلاب للمسابقات والامتحانات بدقة ووضوح، ويجعل المفاهيم المعقدة سهلة الفهم.",
    },
    expertise: "math",
    courseCount: 2,
    studentCount: 3390,
    rating: 4.7,
  },
  {
    id: "jane-doe",
    name: "Dr. Jane Doe",
    avatar: "JD",
    bio: {
      fr: "Docteure en physique avec 10 ans d'enseignement. Spécialisée en mécanique et électricité, elle utilise des expériences pratiques pour illustrer les concepts théoriques.",
      en: "PhD in Physics with 10 years of teaching experience. Specialized in mechanics and electricity, she uses practical experiments to illustrate theoretical concepts.",
      ar: "دكتورة في الفيزياء بخبرة 10 سنوات في التدريس. متخصصة في الميكانيكا والكهرباء، تستخدم التجارب العملية لتوضيح المفاهيم النظرية.",
    },
    expertise: "physics",
    courseCount: 3,
    studentCount: 6180,
    rating: 4.9,
  },
  {
    id: "emily-davis",
    name: "Pr. Emily Davis",
    avatar: "ED",
    bio: {
      fr: "Professeure de biologie passionnée par la pédagogie et la vulgarisation scientifique. Avec 12 ans d'expérience, elle rend la biologie vivante grâce à des cours interactifs et des illustrations détaillées.",
      en: "Biology teacher passionate about pedagogy and science communication. With 12 years of experience, she brings biology to life through interactive lessons and detailed illustrations.",
      ar: "أستاذة أحياء شغوفة بالبيداغوجيا والتبسيط العلمي. بخبرة 12 سنة، تجعل الأحياء حية من خلال دروس تفاعلية ورسوم توضيحية مفصلة.",
    },
    expertise: "biology",
    courseCount: 3,
    studentCount: 5680,
    rating: 4.8,
  },
];

export const courses: Course[] = [
  {
    id: "math-algebra-101",
    subject: "math",
    level: "middle",
    title: {
      fr: "Alg\u00e8bre - Les bases",
      en: "Algebra - The Basics",
      ar: "\u0627\u0644\u062C\u0628\u0631 - \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0627\u062A",
    },
    description: {
      fr: "Ma\u00eetrisez les fondamentaux de l'alg\u00e8bre : \u00e9quations, expressions et fonctions. Ce cours vous donne les outils essentiels pour r\u00e9ussir en math\u00e9matiques.",
      en: "Master the fundamentals of algebra: equations, expressions, and functions. This course gives you the essential tools to succeed in mathematics.",
      ar: "\u0623\u062A\u0642\u0646 \u0623\u0633\u0627\u0633\u064A\u0627\u062A \u0627\u0644\u062C\u0628\u0631: \u0627\u0644\u0645\u0639\u0627\u062F\u0644\u0627\u062A \u0648\u0627\u0644\u062A\u0639\u0627\u0628\u064A\u0631 \u0648\u0627\u0644\u062F\u0648\u0627\u0644. \u064A\u0645\u0646\u062D\u0643 \u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633 \u0627\u0644\u0623\u062F\u0648\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u0646\u062C\u0627\u062D \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0627\u062A.",
    },
    thumbnail: "/thumbnails/math-algebra.svg",
    instructor: {
      name: "Pr. John Smith",
      avatar: "/avatars/john.svg",
      bio: {
        fr: "Professeur de math\u00e9matiques avec 15 ans d'exp\u00e9rience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "\u0623\u0633\u062A\u0627\u0630 \u0631\u064A\u0627\u0636\u064A\u0627\u062A \u0628\u062E\u0628\u0631\u0629 15 \u0633\u0646\u0629",
      },
    },
    instructorId: "john-smith",
    totalLessons: 12,
    totalHours: 8,
    studentCount: 2340,
    rating: 4.8,
    chapters: [
      {
        id: "ch1",
        title: {
          fr: "Introduction \u00e0 l'alg\u00e8bre",
          en: "Introduction to Algebra",
          ar: "\u0645\u0642\u062F\u0645\u0629 \u0641\u064A \u0627\u0644\u062C\u0628\u0631",
        },
        lessons: [
          {
            id: "l1",
            title: {
              fr: "Qu'est-ce que l'alg\u00e8bre ?",
              en: "What is Algebra?",
              ar: "\u0645\u0627 \u0647\u0648 \u0627\u0644\u062C\u0628\u0631\u061F",
            },
            duration: "12:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "D\u00e9couvrez les concepts fondamentaux de l'alg\u00e8bre et pourquoi c'est important.",
              en: "Discover the fundamental concepts of algebra and why it matters.",
              ar: "\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u062C\u0628\u0631 \u0648\u0644\u0645\u0627\u0630\u0627 \u0647\u0648 \u0645\u0647\u0645.",
            },
            documents: [{ name: "intro-algebre.pdf", url: "#" }],
          },
          {
            id: "l2",
            title: {
              fr: "Variables et constantes",
              en: "Variables and Constants",
              ar: "\u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0648\u0627\u0644\u062B\u0648\u0627\u0628\u062A",
            },
            duration: "15:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Apprenez \u00e0 diff\u00e9rencier les variables des constantes.",
              en: "Learn to differentiate variables from constants.",
              ar: "\u062A\u0639\u0644\u0645 \u0627\u0644\u062A\u0641\u0631\u064A\u0642 \u0628\u064A\u0646 \u0627\u0644\u0645\u062A\u063A\u064A\u0631\u0627\u062A \u0648\u0627\u0644\u062B\u0648\u0627\u0628\u062A.",
            },
          },
          {
            id: "l3",
            title: {
              fr: "Expressions alg\u00e9briques",
              en: "Algebraic Expressions",
              ar: "\u0627\u0644\u062A\u0639\u0627\u0628\u064A\u0631 \u0627\u0644\u062C\u0628\u0631\u064A\u0629",
            },
            duration: "18:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Ma\u00eetrisez la construction et la simplification d'expressions alg\u00e9briques.",
              en: "Master building and simplifying algebraic expressions.",
              ar: "\u0623\u062A\u0642\u0646 \u0628\u0646\u0627\u0621 \u0648\u062A\u0628\u0633\u064A\u0637 \u0627\u0644\u062A\u0639\u0627\u0628\u064A\u0631 \u0627\u0644\u062C\u0628\u0631\u064A\u0629.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: {
          fr: "\u00c9quations du premier degr\u00e9",
          en: "First-Degree Equations",
          ar: "\u0645\u0639\u0627\u062F\u0644\u0627\u062A \u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0648\u0644\u0649",
        },
        lessons: [
          {
            id: "l4",
            title: {
              fr: "R\u00e9soudre une \u00e9quation simple",
              en: "Solving a Simple Equation",
              ar: "\u062D\u0644 \u0645\u0639\u0627\u062F\u0644\u0629 \u0628\u0633\u064A\u0637\u0629",
            },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Techniques pour r\u00e9soudre des \u00e9quations du premier degr\u00e9.",
              en: "Techniques for solving first-degree equations.",
              ar: "\u062A\u0642\u0646\u064A\u0627\u062A \u0644\u062D\u0644 \u0645\u0639\u0627\u062F\u0644\u0627\u062A \u0627\u0644\u062F\u0631\u062C\u0629 \u0627\u0644\u0623\u0648\u0644\u0649.",
            },
            documents: [{ name: "equations-exercices.pdf", url: "#" }],
          },
          {
            id: "l5",
            title: {
              fr: "\u00c9quations avec fractions",
              en: "Equations with Fractions",
              ar: "\u0645\u0639\u0627\u062F\u0644\u0627\u062A \u0628\u0627\u0644\u0643\u0633\u0648\u0631",
            },
            duration: "22:15",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Apprenez \u00e0 r\u00e9soudre des \u00e9quations contenant des fractions.",
              en: "Learn to solve equations containing fractions.",
              ar: "\u062A\u0639\u0644\u0645 \u062D\u0644 \u0627\u0644\u0645\u0639\u0627\u062F\u0644\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u062D\u062A\u0648\u064A \u0639\u0644\u0649 \u0643\u0633\u0648\u0631.",
            },
          },
        ],
      },
    ],
  },
  {
    id: "math-geometry-201",
    subject: "math",
    level: "high",
    title: {
      fr: "G\u00e9om\u00e9trie - Figures et th\u00e9or\u00e8mes",
      en: "Geometry - Figures and Theorems",
      ar: "\u0627\u0644\u0647\u0646\u062F\u0633\u0629 - \u0627\u0644\u0623\u0634\u0643\u0627\u0644 \u0648\u0627\u0644\u0646\u0638\u0631\u064A\u0627\u062A",
    },
    description: {
      fr: "Explorez la g\u00e9om\u00e9trie euclidienne : triangles, cercles, th\u00e9or\u00e8me de Pythagore et Thal\u00e8s.",
      en: "Explore Euclidean geometry: triangles, circles, Pythagorean and Thales' theorems.",
      ar: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0647\u0646\u062F\u0633\u0629 \u0627\u0644\u0625\u0642\u0644\u064A\u062F\u064A\u0629: \u0627\u0644\u0645\u062B\u0644\u062B\u0627\u062A\u060C \u0627\u0644\u062F\u0648\u0627\u0626\u0631\u060C \u0646\u0638\u0631\u064A\u0629 \u0641\u064A\u062B\u0627\u063A\u0648\u0631\u0633 \u0648\u0637\u0627\u0644\u064A\u0633.",
    },
    thumbnail: "/thumbnails/math-geometry.svg",
    instructor: {
      name: "Pr. John Smith",
      avatar: "/avatars/john.svg",
      bio: {
        fr: "Professeur de math\u00e9matiques avec 15 ans d'exp\u00e9rience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "\u0623\u0633\u062A\u0627\u0630 \u0631\u064A\u0627\u0636\u064A\u0627\u062A \u0628\u062E\u0628\u0631\u0629 15 \u0633\u0646\u0629",
      },
    },
    instructorId: "robert-johnson",
    totalLessons: 10,
    totalHours: 7,
    studentCount: 1890,
    rating: 4.7,
    chapters: [
      {
        id: "ch1",
        title: {
          fr: "Les triangles",
          en: "Triangles",
          ar: "\u0627\u0644\u0645\u062B\u0644\u062B\u0627\u062A",
        },
        lessons: [
          {
            id: "l1",
            title: {
              fr: "Types de triangles",
              en: "Types of Triangles",
              ar: "\u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u062B\u0644\u062B\u0627\u062A",
            },
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Classification des triangles par c\u00f4t\u00e9s et par angles.",
              en: "Classifying triangles by sides and angles.",
              ar: "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u0645\u062B\u0644\u062B\u0627\u062A \u062D\u0633\u0628 \u0627\u0644\u0623\u0636\u0644\u0627\u0639 \u0648\u0627\u0644\u0632\u0648\u0627\u064A\u0627.",
            },
          },
          {
            id: "l2",
            title: {
              fr: "Th\u00e9or\u00e8me de Pythagore",
              en: "Pythagorean Theorem",
              ar: "\u0646\u0638\u0631\u064A\u0629 \u0641\u064A\u062B\u0627\u063A\u0648\u0631\u0633",
            },
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre et appliquer le th\u00e9or\u00e8me de Pythagore.",
              en: "Understanding and applying the Pythagorean theorem.",
              ar: "\u0641\u0647\u0645 \u0648\u062A\u0637\u0628\u064A\u0642 \u0646\u0638\u0631\u064A\u0629 \u0641\u064A\u062B\u0627\u063A\u0648\u0631\u0633.",
            },
            documents: [{ name: "pythagore-resume.pdf", url: "#" }],
          },
        ],
      },
    ],
  },
  {
    id: "physics-mechanics-101",
    subject: "physics",
    level: "high",
    title: {
      fr: "M\u00e9canique - Mouvement et forces",
      en: "Mechanics - Motion and Forces",
      ar: "\u0627\u0644\u0645\u064A\u0643\u0627\u0646\u064A\u0643\u0627 - \u0627\u0644\u062D\u0631\u0643\u0629 \u0648\u0627\u0644\u0642\u0648\u0649",
    },
    description: {
      fr: "Comprendre les lois du mouvement, la gravit\u00e9 et les forces fondamentales. De Newton \u00e0 la cin\u00e9matique.",
      en: "Understand the laws of motion, gravity, and fundamental forces. From Newton to kinematics.",
      ar: "\u0641\u0647\u0645 \u0642\u0648\u0627\u0646\u064A\u0646 \u0627\u0644\u062D\u0631\u0643\u0629 \u0648\u0627\u0644\u062C\u0627\u0630\u0628\u064A\u0629 \u0648\u0627\u0644\u0642\u0648\u0649 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629. \u0645\u0646 \u0646\u064A\u0648\u062A\u0646 \u0625\u0644\u0649 \u0627\u0644\u0643\u064A\u0646\u0645\u0627\u062A\u064A\u0643\u0627.",
    },
    thumbnail: "/thumbnails/physics-mechanics.svg",
    instructor: {
      name: "Dr. Jane Doe",
      avatar: "/avatars/jane.svg",
      bio: {
        fr: "Docteure en physique, 10 ans d'enseignement",
        en: "PhD in Physics, 10 years of teaching",
        ar: "\u062F\u0643\u062A\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621\u060C 10 \u0633\u0646\u0648\u0627\u062A \u062A\u062F\u0631\u064A\u0633",
      },
    },
    instructorId: "jane-doe",
    totalLessons: 15,
    totalHours: 10,
    studentCount: 3120,
    rating: 4.9,
    chapters: [
      {
        id: "ch1",
        title: {
          fr: "Cin\u00e9matique",
          en: "Kinematics",
          ar: "\u0627\u0644\u0643\u064A\u0646\u0645\u0627\u062A\u064A\u0643\u0627",
        },
        lessons: [
          {
            id: "l1",
            title: {
              fr: "Position, vitesse et acc\u00e9l\u00e9ration",
              en: "Position, Velocity, and Acceleration",
              ar: "\u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0633\u0631\u0639\u0629 \u0648\u0627\u0644\u062A\u0633\u0627\u0631\u0639",
            },
            duration: "18:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Les grandeurs fondamentales du mouvement.",
              en: "The fundamental quantities of motion.",
              ar: "\u0627\u0644\u0643\u0645\u064A\u0627\u062A \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629 \u0644\u0644\u062D\u0631\u0643\u0629.",
            },
            documents: [{ name: "cinematique-formules.pdf", url: "#" }],
          },
          {
            id: "l2",
            title: {
              fr: "Mouvement rectiligne uniforme",
              en: "Uniform Linear Motion",
              ar: "\u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0633\u062A\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0646\u062A\u0638\u0645\u0629",
            },
            duration: "16:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "\u00c9tudier le mouvement \u00e0 vitesse constante.",
              en: "Study motion at constant velocity.",
              ar: "\u062F\u0631\u0627\u0633\u0629 \u0627\u0644\u062D\u0631\u0643\u0629 \u0628\u0633\u0631\u0639\u0629 \u062B\u0627\u0628\u062A\u0629.",
            },
          },
        ],
      },
      {
        id: "ch2",
        title: {
          fr: "Les lois de Newton",
          en: "Newton's Laws",
          ar: "\u0642\u0648\u0627\u0646\u064A\u0646 \u0646\u064A\u0648\u062A\u0646",
        },
        lessons: [
          {
            id: "l3",
            title: {
              fr: "Premi\u00e8re loi de Newton",
              en: "Newton's First Law",
              ar: "\u0642\u0627\u0646\u0648\u0646 \u0646\u064A\u0648\u062A\u0646 \u0627\u0644\u0623\u0648\u0644",
            },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Le principe d'inertie expliqu\u00e9 simplement.",
              en: "The principle of inertia explained simply.",
              ar: "\u0645\u0628\u062F\u0623 \u0627\u0644\u0642\u0635\u0648\u0631 \u0627\u0644\u0630\u0627\u062A\u064A \u0628\u0634\u0631\u062D \u0645\u0628\u0633\u0637.",
            },
          },
          {
            id: "l4",
            title: {
              fr: "F = ma : La deuxi\u00e8me loi",
              en: "F = ma: The Second Law",
              ar: "F = ma: \u0627\u0644\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u062B\u0627\u0646\u064A",
            },
            duration: "22:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre la relation entre force, masse et acc\u00e9l\u00e9ration.",
              en: "Understanding the relationship between force, mass, and acceleration.",
              ar: "\u0641\u0647\u0645 \u0627\u0644\u0639\u0644\u0627\u0642\u0629 \u0628\u064A\u0646 \u0627\u0644\u0642\u0648\u0629 \u0648\u0627\u0644\u0643\u062A\u0644\u0629 \u0648\u0627\u0644\u062A\u0633\u0627\u0631\u0639.",
            },
            documents: [{ name: "newton-exercices.pdf", url: "#" }],
          },
        ],
      },
    ],
  },
  {
    id: "physics-electricity-101",
    subject: "physics",
    level: "middle",
    title: {
      fr: "\u00c9lectricit\u00e9 - Circuits et courant",
      en: "Electricity - Circuits and Current",
      ar: "\u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 - \u0627\u0644\u062F\u0648\u0627\u0626\u0631 \u0648\u0627\u0644\u062A\u064A\u0627\u0631",
    },
    description: {
      fr: "D\u00e9couvrez les bases de l'\u00e9lectricit\u00e9 : tension, intensit\u00e9, r\u00e9sistance et loi d'Ohm.",
      en: "Discover the basics of electricity: voltage, current, resistance, and Ohm's law.",
      ar: "\u0627\u0643\u062A\u0634\u0641 \u0623\u0633\u0627\u0633\u064A\u0627\u062A \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621: \u0627\u0644\u062C\u0647\u062F\u060C \u0627\u0644\u062A\u064A\u0627\u0631\u060C \u0627\u0644\u0645\u0642\u0627\u0648\u0645\u0629 \u0648\u0642\u0627\u0646\u0648\u0646 \u0623\u0648\u0645.",
    },
    thumbnail: "/thumbnails/physics-electricity.svg",
    instructor: {
      name: "Dr. Jane Doe",
      avatar: "/avatars/jane.svg",
      bio: {
        fr: "Docteure en physique, 10 ans d'enseignement",
        en: "PhD in Physics, 10 years of teaching",
        ar: "\u062F\u0643\u062A\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621\u060C 10 \u0633\u0646\u0648\u0627\u062A \u062A\u062F\u0631\u064A\u0633",
      },
    },
    instructorId: "jane-doe",
    totalLessons: 8,
    totalHours: 5,
    studentCount: 1560,
    rating: 4.6,
    chapters: [
      {
        id: "ch1",
        title: {
          fr: "Les bases de l'\u00e9lectricit\u00e9",
          en: "Electricity Basics",
          ar: "\u0623\u0633\u0627\u0633\u064A\u0627\u062A \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621",
        },
        lessons: [
          {
            id: "l1",
            title: {
              fr: "Qu'est-ce que le courant \u00e9lectrique ?",
              en: "What is Electric Current?",
              ar: "\u0645\u0627 \u0647\u0648 \u0627\u0644\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A\u061F",
            },
            duration: "13:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Introduction au courant \u00e9lectrique et aux circuits.",
              en: "Introduction to electric current and circuits.",
              ar: "\u0645\u0642\u062F\u0645\u0629 \u0641\u064A \u0627\u0644\u062A\u064A\u0627\u0631 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A \u0648\u0627\u0644\u062F\u0648\u0627\u0626\u0631.",
            },
          },
          {
            id: "l2",
            title: {
              fr: "La loi d'Ohm",
              en: "Ohm's Law",
              ar: "\u0642\u0627\u0646\u0648\u0646 \u0623\u0648\u0645",
            },
            duration: "17:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre la relation U = R \u00d7 I.",
              en: "Understanding the relationship V = R \u00d7 I.",
              ar: "\u0641\u0647\u0645 \u0627\u0644\u0639\u0644\u0627\u0642\u0629 U = R \u00d7 I.",
            },
            documents: [{ name: "loi-ohm-resume.pdf", url: "#" }],
          },
        ],
      },
    ],
  },
  {
    id: "biology-cells-101",
    subject: "biology",
    level: "middle",
    title: {
      fr: "La cellule - Unit\u00e9 du vivant",
      en: "The Cell - Unit of Life",
      ar: "\u0627\u0644\u062E\u0644\u064A\u0629 - \u0648\u062D\u062F\u0629 \u0627\u0644\u062D\u064A\u0627\u0629",
    },
    description: {
      fr: "D\u00e9couvrez la structure cellulaire, les organites et les fonctions vitales de la cellule.",
      en: "Discover cell structure, organelles, and vital cell functions.",
      ar: "\u0627\u0643\u062A\u0634\u0641 \u0628\u0646\u064A\u0629 \u0627\u0644\u062E\u0644\u064A\u0629 \u0648\u0627\u0644\u0639\u0636\u064A\u0627\u062A \u0648\u0627\u0644\u0648\u0638\u0627\u0626\u0641 \u0627\u0644\u062D\u064A\u0648\u064A\u0629 \u0644\u0644\u062E\u0644\u064A\u0629.",
    },
    thumbnail: "/thumbnails/biology-cells.svg",
    instructor: {
      name: "Pr. Emily Davis",
      avatar: "/avatars/emily.svg",
      bio: {
        fr: "Professeure de biologie, passionn\u00e9e par la p\u00e9dagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "\u0623\u0633\u062A\u0627\u0630\u0629 \u0623\u062D\u064A\u0627\u0621\u060C \u0634\u063A\u0648\u0641\u0629 \u0628\u0627\u0644\u0628\u064A\u062F\u0627\u063A\u0648\u062C\u064A\u0627",
      },
    },
    instructorId: "emily-davis",
    totalLessons: 10,
    totalHours: 6,
    studentCount: 2780,
    rating: 4.8,
    chapters: [
      {
        id: "ch1",
        title: {
          fr: "Structure de la cellule",
          en: "Cell Structure",
          ar: "\u0628\u0646\u064A\u0629 \u0627\u0644\u062E\u0644\u064A\u0629",
        },
        lessons: [
          {
            id: "l1",
            title: {
              fr: "Cellule animale vs v\u00e9g\u00e9tale",
              en: "Animal vs Plant Cell",
              ar: "\u0627\u0644\u062E\u0644\u064A\u0629 \u0627\u0644\u062D\u064A\u0648\u0627\u0646\u064A\u0629 \u0645\u0642\u0627\u0628\u0644 \u0627\u0644\u0646\u0628\u0627\u062A\u064A\u0629",
            },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comparer les deux types de cellules eucaryotes.",
              en: "Compare the two types of eukaryotic cells.",
              ar: "\u0645\u0642\u0627\u0631\u0646\u0629 \u0646\u0648\u0639\u064A \u0627\u0644\u062E\u0644\u0627\u064A\u0627 \u062D\u0642\u064A\u0642\u064A\u0629 \u0627\u0644\u0646\u0648\u0627\u0629.",
            },
            documents: [{ name: "cellules-schema.pdf", url: "#" }],
          },
          {
            id: "l2",
            title: {
              fr: "Le noyau et l'ADN",
              en: "The Nucleus and DNA",
              ar: "\u0627\u0644\u0646\u0648\u0627\u0629 \u0648\u0627\u0644\u062D\u0645\u0636 \u0627\u0644\u0646\u0648\u0648\u064A",
            },
            duration: "19:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Le r\u00f4le du noyau et de l'information g\u00e9n\u00e9tique.",
              en: "The role of the nucleus and genetic information.",
              ar: "\u062F\u0648\u0631 \u0627\u0644\u0646\u0648\u0627\u0629 \u0648\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0627\u0644\u0648\u0631\u0627\u062B\u064A\u0629.",
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
    title: {
      fr: "\u00c9cologie et environnement",
      en: "Ecology and Environment",
      ar: "\u0639\u0644\u0645 \u0627\u0644\u0628\u064A\u0626\u0629 \u0648\u0627\u0644\u0645\u062D\u064A\u0637",
    },
    description: {
      fr: "\u00c9tudiez les \u00e9cosyst\u00e8mes, la biodiversit\u00e9 et l'impact de l'homme sur l'environnement.",
      en: "Study ecosystems, biodiversity, and human impact on the environment.",
      ar: "\u0627\u062F\u0631\u0633 \u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629 \u0648\u0627\u0644\u062A\u0646\u0648\u0639 \u0627\u0644\u0628\u064A\u0648\u0644\u0648\u062C\u064A \u0648\u062A\u0623\u062B\u064A\u0631 \u0627\u0644\u0625\u0646\u0633\u0627\u0646 \u0639\u0644\u0649 \u0627\u0644\u0628\u064A\u0626\u0629.",
    },
    thumbnail: "/thumbnails/biology-ecology.svg",
    instructor: {
      name: "Pr. Emily Davis",
      avatar: "/avatars/emily.svg",
      bio: {
        fr: "Professeure de biologie, passionn\u00e9e par la p\u00e9dagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "\u0623\u0633\u062A\u0627\u0630\u0629 \u0623\u062D\u064A\u0627\u0621\u060C \u0634\u063A\u0648\u0641\u0629 \u0628\u0627\u0644\u0628\u064A\u062F\u0627\u063A\u0648\u062C\u064A\u0627",
      },
    },
    instructorId: "emily-davis",
    totalLessons: 12,
    totalHours: 8,
    studentCount: 1450,
    rating: 4.7,
    chapters: [
      {
        id: "ch1",
        title: {
          fr: "Les \u00e9cosyst\u00e8mes",
          en: "Ecosystems",
          ar: "\u0627\u0644\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0628\u064A\u0626\u064A\u0629",
        },
        lessons: [
          {
            id: "l1",
            title: {
              fr: "Qu'est-ce qu'un \u00e9cosyst\u00e8me ?",
              en: "What is an Ecosystem?",
              ar: "\u0645\u0627 \u0647\u0648 \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u064A\u0626\u064A\u061F",
            },
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "D\u00e9finition et composants d'un \u00e9cosyst\u00e8me.",
              en: "Definition and components of an ecosystem.",
              ar: "\u062A\u0639\u0631\u064A\u0641 \u0648\u0645\u0643\u0648\u0646\u0627\u062A \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u064A\u0626\u064A.",
            },
          },
          {
            id: "l2",
            title: {
              fr: "Cha\u00eenes alimentaires",
              en: "Food Chains",
              ar: "\u0633\u0644\u0627\u0633\u0644 \u063A\u0630\u0627\u0626\u064A\u0629",
            },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: {
              fr: "Comprendre les relations trophiques dans un \u00e9cosyst\u00e8me.",
              en: "Understanding trophic relationships in an ecosystem.",
              ar: "\u0641\u0647\u0645 \u0627\u0644\u0639\u0644\u0627\u0642\u0627\u062A \u0627\u0644\u063A\u0630\u0627\u0626\u064A\u0629 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0628\u064A\u0626\u064A.",
            },
            documents: [{ name: "chaines-alimentaires.pdf", url: "#" }],
          },
        ],
      },
    ],
  },
  {
    id: "math-calculus-201",
    subject: "math",
    level: "high",
    title: {
      fr: "Introduction au calcul",
      en: "Introduction to Calculus",
      ar: "مقدمة في التفاضل والتكامل",
    },
    description: {
      fr: "Découvrez les bases du calcul différentiel et intégral : limites, dérivées et primitives. Un cours essentiel pour les sciences.",
      en: "Discover the basics of differential and integral calculus: limits, derivatives, and antiderivatives. An essential course for science.",
      ar: "اكتشف أساسيات التفاضل والتكامل: النهايات والمشتقات والتكاملات. درس أساسي للعلوم.",
    },
    thumbnail: "/thumbnails/math-calculus.svg",
    instructor: {
      name: "Pr. John Smith",
      avatar: "/avatars/john.svg",
      bio: {
        fr: "Professeur de mathématiques avec 15 ans d'expérience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "أستاذ رياضيات بخبرة 15 سنة",
      },
    },
    instructorId: "john-smith",
    totalLessons: 14,
    totalHours: 9,
    studentCount: 1500,
    rating: 4.8,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Limites et continuité", en: "Limits and Continuity", ar: "النهايات والاتصال" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Notion de limite", en: "The Concept of a Limit", ar: "مفهوم النهاية" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Comprendre intuitivement la notion de limite.", en: "Intuitively understand the concept of a limit.", ar: "فهم مفهوم النهاية بشكل حدسي." },
            documents: [{ name: "limites-intro.pdf", url: "#" }],
          },
          {
            id: "l2",
            title: { fr: "Calcul de limites", en: "Computing Limits", ar: "حساب النهايات" },
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Techniques pour calculer les limites de fonctions.", en: "Techniques for computing limits of functions.", ar: "تقنيات لحساب نهايات الدوال." },
          },
          {
            id: "l3",
            title: { fr: "Continuité d'une fonction", en: "Continuity of a Function", ar: "اتصال الدالة" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Définir et vérifier la continuité d'une fonction.", en: "Define and verify the continuity of a function.", ar: "تعريف والتحقق من اتصال الدالة." },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Dérivation", en: "Differentiation", ar: "الاشتقاق" },
        lessons: [
          {
            id: "l4",
            title: { fr: "Définition de la dérivée", en: "Definition of the Derivative", ar: "تعريف المشتقة" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "La dérivée comme taux de variation instantané.", en: "The derivative as an instantaneous rate of change.", ar: "المشتقة كمعدل تغير لحظي." },
            documents: [{ name: "derivees-formules.pdf", url: "#" }],
          },
          {
            id: "l5",
            title: { fr: "Règles de dérivation", en: "Differentiation Rules", ar: "قواعد الاشتقاق" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Apprenez les règles de dérivation : produit, quotient, composition.", en: "Learn differentiation rules: product, quotient, chain rule.", ar: "تعلم قواعد الاشتقاق: الضرب، القسمة، التركيب." },
          },
        ],
      },
    ],
  },
  {
    id: "math-statistics-101",
    subject: "math",
    level: "middle",
    title: {
      fr: "Statistiques - Les bases",
      en: "Statistics - The Basics",
      ar: "الإحصاء - الأساسيات",
    },
    description: {
      fr: "Apprenez à collecter, organiser et interpréter des données. Moyenne, médiane, diagrammes et probabilités de base.",
      en: "Learn to collect, organize, and interpret data. Mean, median, charts, and basic probability.",
      ar: "تعلم جمع وتنظيم وتفسير البيانات. المتوسط، الوسيط، الرسوم البيانية والاحتمالات الأساسية.",
    },
    thumbnail: "/thumbnails/math-statistics.svg",
    instructor: {
      name: "Pr. Robert Johnson",
      avatar: "/avatars/robert.svg",
      bio: {
        fr: "Spécialiste en analyse et algèbre avancée",
        en: "Specialist in analysis and advanced algebra",
        ar: "متخصص في التحليل والجبر المتقدم",
      },
    },
    instructorId: "robert-johnson",
    totalLessons: 10,
    totalHours: 6,
    studentCount: 1500,
    rating: 4.6,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Collecte et organisation", en: "Data Collection and Organization", ar: "جمع وتنظيم البيانات" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Types de données", en: "Types of Data", ar: "أنواع البيانات" },
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Données qualitatives vs quantitatives.", en: "Qualitative vs quantitative data.", ar: "بيانات نوعية مقابل كمية." },
          },
          {
            id: "l2",
            title: { fr: "Tableaux et diagrammes", en: "Tables and Charts", ar: "الجداول والرسوم البيانية" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Représenter les données avec des tableaux et diagrammes.", en: "Represent data with tables and charts.", ar: "تمثيل البيانات بالجداول والرسوم البيانية." },
            documents: [{ name: "diagrammes-exemples.pdf", url: "#" }],
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Mesures statistiques", en: "Statistical Measures", ar: "المقاييس الإحصائية" },
        lessons: [
          {
            id: "l3",
            title: { fr: "Moyenne et médiane", en: "Mean and Median", ar: "المتوسط والوسيط" },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Calculer et interpréter la moyenne et la médiane.", en: "Calculate and interpret mean and median.", ar: "حساب وتفسير المتوسط والوسيط." },
          },
          {
            id: "l4",
            title: { fr: "Introduction aux probabilités", en: "Introduction to Probability", ar: "مقدمة في الاحتمالات" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Les bases de la probabilité et les événements aléatoires.", en: "Basics of probability and random events.", ar: "أساسيات الاحتمالات والأحداث العشوائية." },
            documents: [{ name: "probabilites-intro.pdf", url: "#" }],
          },
        ],
      },
    ],
  },
  {
    id: "physics-optics-201",
    subject: "physics",
    level: "high",
    title: {
      fr: "Optique - Lumière et vision",
      en: "Optics - Light and Vision",
      ar: "البصريات - الضوء والرؤية",
    },
    description: {
      fr: "Explorez la nature de la lumière, la réflexion, la réfraction et les lentilles. De l'optique géométrique à la vision humaine.",
      en: "Explore the nature of light, reflection, refraction, and lenses. From geometric optics to human vision.",
      ar: "استكشف طبيعة الضوء، الانعكاس، الانكسار والعدسات. من البصريات الهندسية إلى الرؤية البشرية.",
    },
    thumbnail: "/thumbnails/physics-optics.svg",
    instructor: {
      name: "Dr. Jane Doe",
      avatar: "/avatars/jane.svg",
      bio: {
        fr: "Docteure en physique, 10 ans d'enseignement",
        en: "PhD in Physics, 10 years of teaching",
        ar: "دكتورة في الفيزياء، 10 سنوات تدريس",
      },
    },
    instructorId: "jane-doe",
    totalLessons: 12,
    totalHours: 7,
    studentCount: 1500,
    rating: 4.7,
    chapters: [
      {
        id: "ch1",
        title: { fr: "La lumière", en: "Light", ar: "الضوء" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Nature de la lumière", en: "Nature of Light", ar: "طبيعة الضوء" },
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Onde ou particule ? Comprendre la double nature de la lumière.", en: "Wave or particle? Understanding the dual nature of light.", ar: "موجة أم جسيم؟ فهم الطبيعة المزدوجة للضوء." },
            documents: [{ name: "lumiere-intro.pdf", url: "#" }],
          },
          {
            id: "l2",
            title: { fr: "Réflexion et miroirs", en: "Reflection and Mirrors", ar: "الانعكاس والمرايا" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Les lois de la réflexion et les types de miroirs.", en: "Laws of reflection and types of mirrors.", ar: "قوانين الانعكاس وأنواع المرايا." },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "Réfraction et lentilles", en: "Refraction and Lenses", ar: "الانكسار والعدسات" },
        lessons: [
          {
            id: "l3",
            title: { fr: "Loi de Snell-Descartes", en: "Snell's Law", ar: "قانون سنيل" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Comprendre la réfraction de la lumière.", en: "Understanding the refraction of light.", ar: "فهم انكسار الضوء." },
          },
          {
            id: "l4",
            title: { fr: "Les lentilles convergentes", en: "Converging Lenses", ar: "العدسات المحدبة" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Formation d'images par les lentilles convergentes.", en: "Image formation by converging lenses.", ar: "تكوين الصور بالعدسات المحدبة." },
            documents: [{ name: "lentilles-exercices.pdf", url: "#" }],
          },
        ],
      },
    ],
  },
  {
    id: "biology-genetics-201",
    subject: "biology",
    level: "high",
    title: {
      fr: "Génétique et hérédité",
      en: "Genetics and Heredity",
      ar: "الوراثة والجينات",
    },
    description: {
      fr: "Découvrez les lois de Mendel, la structure de l'ADN et les mécanismes de l'hérédité. De la génétique classique à la biologie moléculaire.",
      en: "Discover Mendel's laws, DNA structure, and the mechanisms of heredity. From classical genetics to molecular biology.",
      ar: "اكتشف قوانين مندل وبنية الحمض النووي وآليات الوراثة. من الوراثة الكلاسيكية إلى البيولوجيا الجزيئية.",
    },
    thumbnail: "/thumbnails/biology-genetics.svg",
    instructor: {
      name: "Pr. Emily Davis",
      avatar: "/avatars/emily.svg",
      bio: {
        fr: "Professeure de biologie, passionnée par la pédagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "أستاذة أحياء، شغوفة بالبيداغوجيا",
      },
    },
    instructorId: "emily-davis",
    totalLessons: 12,
    totalHours: 8,
    studentCount: 1200,
    rating: 4.9,
    chapters: [
      {
        id: "ch1",
        title: { fr: "Les bases de la génétique", en: "Genetics Basics", ar: "أساسيات الوراثة" },
        lessons: [
          {
            id: "l1",
            title: { fr: "Les lois de Mendel", en: "Mendel's Laws", ar: "قوانين مندل" },
            duration: "20:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Comprendre les lois fondamentales de l'hérédité.", en: "Understanding the fundamental laws of heredity.", ar: "فهم القوانين الأساسية للوراثة." },
            documents: [{ name: "mendel-resume.pdf", url: "#" }],
          },
          {
            id: "l2",
            title: { fr: "Gènes et allèles", en: "Genes and Alleles", ar: "الجينات والأليلات" },
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Distinguer les gènes dominants et récessifs.", en: "Distinguish between dominant and recessive genes.", ar: "التمييز بين الجينات السائدة والمتنحية." },
          },
        ],
      },
      {
        id: "ch2",
        title: { fr: "ADN et expression génétique", en: "DNA and Gene Expression", ar: "الحمض النووي والتعبير الجيني" },
        lessons: [
          {
            id: "l3",
            title: { fr: "Structure de l'ADN", en: "DNA Structure", ar: "بنية الحمض النووي" },
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "La double hélice et les bases azotées.", en: "The double helix and nitrogenous bases.", ar: "اللولب المزدوج والقواعد النيتروجينية." },
          },
          {
            id: "l4",
            title: { fr: "De l'ADN aux protéines", en: "From DNA to Proteins", ar: "من الحمض النووي إلى البروتينات" },
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: { fr: "Transcription et traduction : comment l'ADN code les protéines.", en: "Transcription and translation: how DNA encodes proteins.", ar: "النسخ والترجمة: كيف يشفر الحمض النووي البروتينات." },
            documents: [{ name: "adn-proteines.pdf", url: "#" }],
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

export function getInstructor(id: string): Instructor | undefined {
  return instructors.find((i) => i.id === id);
}

export function getCoursesByInstructor(instructorId: string): Course[] {
  return courses.filter((c) => c.instructorId === instructorId);
}
