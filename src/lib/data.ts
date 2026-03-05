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
  math: "\u03C0",
  physics: "\u269B",
  biology: "\u{1F9EC}",
};

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
      name: "Pr. Karim Benali",
      avatar: "/avatars/karim.svg",
      bio: {
        fr: "Professeur de math\u00e9matiques avec 15 ans d'exp\u00e9rience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "\u0623\u0633\u062A\u0627\u0630 \u0631\u064A\u0627\u0636\u064A\u0627\u062A \u0628\u062E\u0628\u0631\u0629 15 \u0633\u0646\u0629",
      },
    },
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
      name: "Pr. Karim Benali",
      avatar: "/avatars/karim.svg",
      bio: {
        fr: "Professeur de math\u00e9matiques avec 15 ans d'exp\u00e9rience",
        en: "Mathematics teacher with 15 years of experience",
        ar: "\u0623\u0633\u062A\u0627\u0630 \u0631\u064A\u0627\u0636\u064A\u0627\u062A \u0628\u062E\u0628\u0631\u0629 15 \u0633\u0646\u0629",
      },
    },
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
      name: "Dr. Amina Tazi",
      avatar: "/avatars/amina.svg",
      bio: {
        fr: "Docteure en physique, 10 ans d'enseignement",
        en: "PhD in Physics, 10 years of teaching",
        ar: "\u062F\u0643\u062A\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621\u060C 10 \u0633\u0646\u0648\u0627\u062A \u062A\u062F\u0631\u064A\u0633",
      },
    },
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
      name: "Dr. Amina Tazi",
      avatar: "/avatars/amina.svg",
      bio: {
        fr: "Docteure en physique, 10 ans d'enseignement",
        en: "PhD in Physics, 10 years of teaching",
        ar: "\u062F\u0643\u062A\u0648\u0631\u0629 \u0641\u064A \u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621\u060C 10 \u0633\u0646\u0648\u0627\u062A \u062A\u062F\u0631\u064A\u0633",
      },
    },
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
      name: "Pr. Fatima Zahra",
      avatar: "/avatars/fatima.svg",
      bio: {
        fr: "Professeure de biologie, passionn\u00e9e par la p\u00e9dagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "\u0623\u0633\u062A\u0627\u0630\u0629 \u0623\u062D\u064A\u0627\u0621\u060C \u0634\u063A\u0648\u0641\u0629 \u0628\u0627\u0644\u0628\u064A\u062F\u0627\u063A\u0648\u062C\u064A\u0627",
      },
    },
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
      name: "Pr. Fatima Zahra",
      avatar: "/avatars/fatima.svg",
      bio: {
        fr: "Professeure de biologie, passionn\u00e9e par la p\u00e9dagogie",
        en: "Biology teacher, passionate about pedagogy",
        ar: "\u0623\u0633\u062A\u0627\u0630\u0629 \u0623\u062D\u064A\u0627\u0621\u060C \u0634\u063A\u0648\u0641\u0629 \u0628\u0627\u0644\u0628\u064A\u062F\u0627\u063A\u0648\u062C\u064A\u0627",
      },
    },
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
