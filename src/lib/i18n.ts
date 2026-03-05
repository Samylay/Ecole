export type Locale = "fr" | "en" | "ar";

export const locales: Locale[] = ["fr", "en", "ar"];
export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Fran\u00e7ais",
  en: "English",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
};

export const localeDirection: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  en: "ltr",
  ar: "rtl",
};

type TranslationKeys = {
  nav: {
    home: string;
    courses: string;
    myCourses: string;
    signIn: string;
    signUp: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    subjects: string;
    popularCourses: string;
    viewAll: string;
    stats: {
      students: string;
      courses: string;
      lessons: string;
      teachers: string;
    };
  };
  course: {
    lessons: string;
    hours: string;
    students: string;
    level: string;
    instructor: string;
    description: string;
    curriculum: string;
    enrollFree: string;
    enrolled: string;
    startLearning: string;
    continueLearning: string;
    progress: string;
    completed: string;
    documents: string;
    downloadPdf: string;
  };
  lesson: {
    next: string;
    previous: string;
    markComplete: string;
    markedComplete: string;
    resources: string;
    backToCourse: string;
  };
  subjects: {
    math: string;
    physics: string;
    biology: string;
  };
  levels: {
    middle: string;
    high: string;
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  auth: {
    signIn: string;
    signUp: string;
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;
    orContinueWith: string;
    google: string;
    invalidCredentials: string;
    missingFields: string;
    emailTaken: string;
    weakPassword: string;
    passwordMismatch: string;
    signupSuccess: string;
    welcome: string;
    logout: string;
    loginToAccess: string;
  };
  footer: {
    about: string;
    contact: string;
    terms: string;
    privacy: string;
    tagline: string;
  };
};

const translations: Record<Locale, TranslationKeys> = {
  fr: {
    nav: {
      home: "Accueil",
      courses: "Cours",
      myCourses: "Mes Cours",
      signIn: "Connexion",
      signUp: "Inscription",
    },
    home: {
      hero: {
        title: "Apprends mieux, r\u00e9ussis plus",
        subtitle:
          "Des cours de qualit\u00e9 en maths, physique et biologie pour le coll\u00e8ge et le lyc\u00e9e. Vid\u00e9os, exercices et documents pour r\u00e9ussir tes examens.",
        cta: "Explorer les cours",
      },
      subjects: "Mati\u00e8res",
      popularCourses: "Cours populaires",
      viewAll: "Voir tout",
      stats: {
        students: "\u00c9tudiants",
        courses: "Cours",
        lessons: "Le\u00e7ons",
        teachers: "Enseignants",
      },
    },
    course: {
      lessons: "le\u00e7ons",
      hours: "heures",
      students: "\u00e9tudiants",
      level: "Niveau",
      instructor: "Enseignant",
      description: "Description",
      curriculum: "Programme",
      enrollFree: "S'inscrire gratuitement",
      enrolled: "Inscrit",
      startLearning: "Commencer",
      continueLearning: "Continuer",
      progress: "Progression",
      completed: "Termin\u00e9",
      documents: "Documents",
      downloadPdf: "T\u00e9l\u00e9charger PDF",
    },
    lesson: {
      next: "Suivant",
      previous: "Pr\u00e9c\u00e9dent",
      markComplete: "Marquer comme termin\u00e9",
      markedComplete: "Termin\u00e9 \u2713",
      resources: "Ressources",
      backToCourse: "Retour au cours",
    },
    subjects: {
      math: "Math\u00e9matiques",
      physics: "Physique",
      biology: "Biologie",
    },
    levels: {
      middle: "Coll\u00e8ge",
      high: "Lyc\u00e9e",
      beginner: "D\u00e9butant",
      intermediate: "Interm\u00e9diaire",
      advanced: "Avanc\u00e9",
    },
    auth: {
      signIn: "Connexion",
      signUp: "Inscription",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      fullName: "Nom complet",
      forgotPassword: "Mot de passe oubli\u00e9 ?",
      noAccount: "Pas encore de compte ?",
      hasAccount: "D\u00e9j\u00e0 un compte ?",
      orContinueWith: "Ou continuer avec",
      google: "Google",
      invalidCredentials: "Email ou mot de passe incorrect",
      missingFields: "Veuillez remplir tous les champs",
      emailTaken: "Cet email est d\u00e9j\u00e0 utilis\u00e9",
      weakPassword: "Le mot de passe doit contenir au moins 6 caract\u00e8res",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      signupSuccess: "Compte cr\u00e9\u00e9 avec succ\u00e8s !",
      welcome: "Bienvenue",
      logout: "D\u00e9connexion",
      loginToAccess: "Connectez-vous pour acc\u00e9der aux cours",
    },
    footer: {
      about: "\u00c0 propos",
      contact: "Contact",
      terms: "Conditions",
      privacy: "Confidentialit\u00e9",
      tagline: "La plateforme d'apprentissage pour r\u00e9ussir",
    },
  },
  en: {
    nav: {
      home: "Home",
      courses: "Courses",
      myCourses: "My Courses",
      signIn: "Sign In",
      signUp: "Sign Up",
    },
    home: {
      hero: {
        title: "Learn better, achieve more",
        subtitle:
          "Quality courses in math, physics, and biology for middle and high school. Videos, exercises, and documents to ace your exams.",
        cta: "Explore courses",
      },
      subjects: "Subjects",
      popularCourses: "Popular Courses",
      viewAll: "View all",
      stats: {
        students: "Students",
        courses: "Courses",
        lessons: "Lessons",
        teachers: "Teachers",
      },
    },
    course: {
      lessons: "lessons",
      hours: "hours",
      students: "students",
      level: "Level",
      instructor: "Instructor",
      description: "Description",
      curriculum: "Curriculum",
      enrollFree: "Enroll for free",
      enrolled: "Enrolled",
      startLearning: "Start learning",
      continueLearning: "Continue",
      progress: "Progress",
      completed: "Completed",
      documents: "Documents",
      downloadPdf: "Download PDF",
    },
    lesson: {
      next: "Next",
      previous: "Previous",
      markComplete: "Mark as complete",
      markedComplete: "Completed \u2713",
      resources: "Resources",
      backToCourse: "Back to course",
    },
    subjects: {
      math: "Mathematics",
      physics: "Physics",
      biology: "Biology",
    },
    levels: {
      middle: "Middle School",
      high: "High School",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm password",
      fullName: "Full name",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      orContinueWith: "Or continue with",
      google: "Google",
      invalidCredentials: "Invalid email or password",
      missingFields: "Please fill in all fields",
      emailTaken: "This email is already taken",
      weakPassword: "Password must be at least 6 characters",
      passwordMismatch: "Passwords do not match",
      signupSuccess: "Account created successfully!",
      welcome: "Welcome",
      logout: "Log out",
      loginToAccess: "Sign in to access courses",
    },
    footer: {
      about: "About",
      contact: "Contact",
      terms: "Terms",
      privacy: "Privacy",
      tagline: "The learning platform for success",
    },
  },
  ar: {
    nav: {
      home: "\u0627\u0644\u0631\u0626\u064A\u0633\u064A\u0629",
      courses: "\u0627\u0644\u062F\u0631\u0648\u0633",
      myCourses: "\u062F\u0631\u0648\u0633\u064A",
      signIn: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
      signUp: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628",
    },
    home: {
      hero: {
        title: "\u062A\u0639\u0644\u0651\u0645 \u0623\u0641\u0636\u0644\u060C \u0623\u0646\u062C\u0632 \u0623\u0643\u062B\u0631",
        subtitle:
          "\u062F\u0631\u0648\u0633 \u0639\u0627\u0644\u064A\u0629 \u0627\u0644\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0627\u062A \u0648\u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621 \u0648\u0627\u0644\u0623\u062D\u064A\u0627\u0621 \u0644\u0644\u0645\u062A\u0648\u0633\u0637 \u0648\u0627\u0644\u062B\u0627\u0646\u0648\u064A. \u0641\u064A\u062F\u064A\u0648\u0647\u0627\u062A\u060C \u062A\u0645\u0627\u0631\u064A\u0646 \u0648\u0648\u062B\u0627\u0626\u0642 \u0644\u0644\u0646\u062C\u0627\u062D \u0641\u064A \u0627\u0645\u062A\u062D\u0627\u0646\u0627\u062A\u0643.",
        cta: "\u0627\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u062F\u0631\u0648\u0633",
      },
      subjects: "\u0627\u0644\u0645\u0648\u0627\u062F",
      popularCourses: "\u0627\u0644\u062F\u0631\u0648\u0633 \u0627\u0644\u0634\u0627\u0626\u0639\u0629",
      viewAll: "\u0639\u0631\u0636 \u0627\u0644\u0643\u0644",
      stats: {
        students: "\u0637\u0644\u0627\u0628",
        courses: "\u062F\u0631\u0648\u0633",
        lessons: "\u062D\u0635\u0635",
        teachers: "\u0623\u0633\u0627\u062A\u0630\u0629",
      },
    },
    course: {
      lessons: "\u062D\u0635\u0635",
      hours: "\u0633\u0627\u0639\u0627\u062A",
      students: "\u0637\u0644\u0627\u0628",
      level: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649",
      instructor: "\u0627\u0644\u0623\u0633\u062A\u0627\u0630",
      description: "\u0627\u0644\u0648\u0635\u0641",
      curriculum: "\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C",
      enrollFree: "\u0633\u062C\u0644 \u0645\u062C\u0627\u0646\u0627\u064B",
      enrolled: "\u0645\u0633\u062C\u0644",
      startLearning: "\u0627\u0628\u062F\u0623 \u0627\u0644\u062A\u0639\u0644\u0645",
      continueLearning: "\u0627\u0633\u062A\u0645\u0631",
      progress: "\u0627\u0644\u062A\u0642\u062F\u0645",
      completed: "\u0645\u0643\u062A\u0645\u0644",
      documents: "\u0627\u0644\u0648\u062B\u0627\u0626\u0642",
      downloadPdf: "\u062A\u062D\u0645\u064A\u0644 PDF",
    },
    lesson: {
      next: "\u0627\u0644\u062A\u0627\u0644\u064A",
      previous: "\u0627\u0644\u0633\u0627\u0628\u0642",
      markComplete: "\u0639\u0644\u0651\u0645 \u0643\u0645\u0643\u062A\u0645\u0644",
      markedComplete: "\u0645\u0643\u062A\u0645\u0644 \u2713",
      resources: "\u0627\u0644\u0645\u0648\u0627\u0631\u062F",
      backToCourse: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u0644\u062F\u0631\u0633",
    },
    subjects: {
      math: "\u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0627\u062A",
      physics: "\u0627\u0644\u0641\u064A\u0632\u064A\u0627\u0621",
      biology: "\u0627\u0644\u0623\u062D\u064A\u0627\u0621",
    },
    levels: {
      middle: "\u0627\u0644\u0645\u062A\u0648\u0633\u0637",
      high: "\u0627\u0644\u062B\u0627\u0646\u0648\u064A",
      beginner: "\u0645\u0628\u062A\u062F\u0626",
      intermediate: "\u0645\u062A\u0648\u0633\u0637",
      advanced: "\u0645\u062A\u0642\u062F\u0645",
    },
    auth: {
      signIn: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
      signUp: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628",
      email: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
      password: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
      confirmPassword: "\u062A\u0623\u0643\u064A\u062F \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
      fullName: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644",
      forgotPassword: "\u0646\u0633\u064A\u062A \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u061F",
      noAccount: "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F",
      hasAccount: "\u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628 \u0628\u0627\u0644\u0641\u0639\u0644\u061F",
      orContinueWith: "\u0623\u0648 \u062A\u0627\u0628\u0639 \u0628\u0640",
      google: "\u062C\u0648\u062C\u0644",
      invalidCredentials: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629",
      missingFields: "\u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u062C\u0645\u064A\u0639 \u0627\u0644\u062D\u0642\u0648\u0644",
      emailTaken: "\u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0645\u0633\u062A\u062E\u062F\u0645 \u0628\u0627\u0644\u0641\u0639\u0644",
      weakPassword: "\u064A\u062C\u0628 \u0623\u0646 \u062A\u062A\u0643\u0648\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0645\u0646 6 \u0623\u062D\u0631\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",
      passwordMismatch: "\u0643\u0644\u0645\u062A\u0627 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0645\u062A\u0637\u0627\u0628\u0642\u062A\u064A\u0646",
      signupSuccess: "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062D\u0633\u0627\u0628 \u0628\u0646\u062C\u0627\u062D!",
      welcome: "\u0645\u0631\u062D\u0628\u0627",
      logout: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C",
      loginToAccess: "\u0633\u062C\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u0627\u0644\u062F\u0631\u0648\u0633",
    },
    footer: {
      about: "\u062D\u0648\u0644",
      contact: "\u0627\u062A\u0635\u0644 \u0628\u0646\u0627",
      terms: "\u0627\u0644\u0634\u0631\u0648\u0637",
      privacy: "\u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629",
      tagline: "\u0645\u0646\u0635\u0629 \u0627\u0644\u062A\u0639\u0644\u0645 \u0644\u0644\u0646\u062C\u0627\u062D",
    },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}

export type { TranslationKeys };
