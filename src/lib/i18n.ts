export type Locale = "fr" | "en" | "ar";

export const locales: Locale[] = ["fr", "en", "ar"];
export const defaultLocale: Locale = "fr";

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية",
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
    dashboard: string;
    signIn: string;
    signUp: string;
    signOut: string;
    search: string;
    instructors: string;
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
    whyUs: string;
    whyUsItems: { title: string; desc: string }[];
    testimonials: string;
    howItWorks: string;
    howItWorksSteps: { title: string; desc: string }[];
    stats: {
      students: string;
      courses: string;
      lessons: string;
      teachers: string;
    };
  };
  courses: {
    title: string;
    subtitle: string;
    allSubjects: string;
    allLevels: string;
    sortBy: string;
    popular: string;
    newest: string;
    rating: string;
    showing: string;
    results: string;
    noResults: string;
    noResultsDesc: string;
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
    reviews: string;
    writeReview: string;
    submitReview: string;
    reviewPlaceholder: string;
    relatedCourses: string;
    prerequisites: string;
    whatYouLearn: string;
    notFound: string;
    goHome: string;
    certificate: string;
    certificateDesc: string;
    downloadCertificate: string;
  };
  lesson: {
    next: string;
    previous: string;
    markComplete: string;
    markedComplete: string;
    resources: string;
    backToCourse: string;
    notes: string;
    notesPlaceholder: string;
    saveNote: string;
    noteSaved: string;
    notFound: string;
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
    passwordWeak: string;
    passwordMedium: string;
    passwordStrong: string;
    passwordsNoMatch: string;
    emailInvalid: string;
    required: string;
    showPassword: string;
    rememberMe: string;
  };
  dashboard: {
    title: string;
    welcome: string;
    overview: string;
    enrolledCourses: string;
    lessonsCompleted: string;
    timeSpent: string;
    streak: string;
    days: string;
    overallProgress: string;
    continueLearning: string;
    noActivity: string;
    exploreCourses: string;
    recentActivity: string;
  };
  footer: {
    about: string;
    contact: string;
    terms: string;
    privacy: string;
    tagline: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    back: string;
    of: string;
    enrollSuccess: string;
    lessonCompleted: string;
    welcomeBack: string;
  };
  instructor: {
    title: string;
    bio: string;
    courses: string;
    students: string;
    rating: string;
    viewProfile: string;
    expertise: string;
    allInstructors: string;
  };
};

const translations: Record<Locale, TranslationKeys> = {
  fr: {
    nav: {
      home: "Accueil",
      courses: "Cours",
      myCourses: "Mes Cours",
      dashboard: "Tableau de bord",
      signIn: "Connexion",
      signUp: "Inscription",
      signOut: "Déconnexion",
      search: "Rechercher des cours...",
      instructors: "Enseignants",
    },
    home: {
      hero: {
        title: "Apprends mieux, réussis plus",
        subtitle:
          "Des cours de qualité en maths, physique et biologie pour le collège et le lycée. Vidéos, exercices et documents pour réussir tes examens.",
        cta: "Explorer les cours",
      },
      subjects: "Matières",
      popularCourses: "Cours populaires",
      viewAll: "Voir tout",
      whyUs: "Pourquoi Layaida ?",
      whyUsItems: [
        { title: "Cours structurés", desc: "Programme organisé par chapitre avec progression claire" },
        { title: "Quiz interactifs", desc: "Testez vos connaissances après chaque leçon" },
        { title: "Multilingue", desc: "Contenu disponible en français, anglais et arabe" },
        { title: "Suivi de progression", desc: "Suivez votre avancement en temps réel" },
      ],
      testimonials: "Ce que disent nos étudiants",
      howItWorks: "Comment ça marche ?",
      howItWorksSteps: [
        { title: "Inscrivez-vous", desc: "Créez votre compte gratuitement en quelques secondes" },
        { title: "Choisissez un cours", desc: "Explorez notre catalogue et inscrivez-vous au cours de votre choix" },
        { title: "Apprenez à votre rythme", desc: "Suivez les vidéos, complétez les quiz et téléchargez les documents" },
      ],
      stats: {
        students: "Étudiants",
        courses: "Cours",
        lessons: "Leçons",
        teachers: "Enseignants",
      },
    },
    courses: {
      title: "Tous les cours",
      subtitle: "Explorez notre catalogue de cours pour le collège et le lycée",
      allSubjects: "Toutes les matières",
      allLevels: "Tous les niveaux",
      sortBy: "Trier par",
      popular: "Populaire",
      newest: "Récent",
      rating: "Note",
      showing: "Affichage de",
      results: "résultats",
      noResults: "Aucun cours trouvé",
      noResultsDesc: "Essayez de modifier vos filtres",
    },
    course: {
      lessons: "leçons",
      hours: "heures",
      students: "étudiants",
      level: "Niveau",
      instructor: "Enseignant",
      description: "Description",
      curriculum: "Programme",
      enrollFree: "S'inscrire gratuitement",
      enrolled: "Inscrit",
      startLearning: "Commencer",
      continueLearning: "Continuer",
      progress: "Progression",
      completed: "Terminé",
      documents: "Documents",
      downloadPdf: "Télécharger PDF",
      reviews: "Avis",
      writeReview: "Écrire un avis",
      submitReview: "Publier",
      reviewPlaceholder: "Partagez votre expérience avec ce cours...",
      relatedCourses: "Cours similaires",
      prerequisites: "Prérequis",
      whatYouLearn: "Ce que vous apprendrez",
      notFound: "Cours introuvable",
      goHome: "Retour à l'accueil",
      certificate: "Certificat de réussite",
      certificateDesc: "Félicitations ! Vous avez terminé ce cours.",
      downloadCertificate: "Télécharger le certificat",
    },
    lesson: {
      next: "Suivant",
      previous: "Précédent",
      markComplete: "Marquer comme terminé",
      markedComplete: "Terminé ✓",
      resources: "Ressources",
      backToCourse: "Retour au cours",
      notes: "Mes notes",
      notesPlaceholder: "Prenez des notes pour cette leçon...",
      saveNote: "Enregistrer",
      noteSaved: "Note enregistrée",
      notFound: "Leçon introuvable",
    },
    subjects: {
      math: "Mathématiques",
      physics: "Physique",
      biology: "Biologie",
    },
    levels: {
      middle: "Collège",
      high: "Lycée",
      beginner: "Débutant",
      intermediate: "Intermédiaire",
      advanced: "Avancé",
    },
    auth: {
      signIn: "Connexion",
      signUp: "Inscription",
      email: "Email",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      fullName: "Nom complet",
      forgotPassword: "Mot de passe oublié ?",
      noAccount: "Pas encore de compte ?",
      hasAccount: "Déjà un compte ?",
      orContinueWith: "Ou continuer avec",
      google: "Google",
      passwordWeak: "Faible",
      passwordMedium: "Moyen",
      passwordStrong: "Fort",
      passwordsNoMatch: "Les mots de passe ne correspondent pas",
      emailInvalid: "Email invalide",
      required: "Ce champ est requis",
      showPassword: "Afficher le mot de passe",
      rememberMe: "Se souvenir de moi",
    },
    dashboard: {
      title: "Tableau de bord",
      welcome: "Bienvenue",
      overview: "Aperçu",
      enrolledCourses: "Cours inscrits",
      lessonsCompleted: "Leçons terminées",
      timeSpent: "Temps d'étude",
      streak: "Série d'étude",
      days: "jours",
      overallProgress: "Progression globale",
      continueLearning: "Continuer l'apprentissage",
      noActivity: "Commencez à apprendre pour voir votre progression !",
      exploreCourses: "Explorer les cours",
      recentActivity: "Activité récente",
    },
    footer: {
      about: "À propos",
      contact: "Contact",
      terms: "Conditions",
      privacy: "Confidentialité",
      tagline: "La plateforme d'apprentissage pour réussir",
    },
    common: {
      loading: "Chargement...",
      error: "Une erreur est survenue",
      retry: "Réessayer",
      cancel: "Annuler",
      save: "Enregistrer",
      delete: "Supprimer",
      edit: "Modifier",
      close: "Fermer",
      back: "Retour",
      of: "sur",
      enrollSuccess: "Inscription réussie !",
      lessonCompleted: "Leçon terminée !",
      welcomeBack: "Bon retour",
    },
    instructor: {
      title: "Nos enseignants",
      bio: "Biographie",
      courses: "Cours",
      students: "Étudiants",
      rating: "Évaluation",
      viewProfile: "Voir le profil",
      expertise: "Expertise",
      allInstructors: "Tous les enseignants",
    },
  },
  en: {
    nav: {
      home: "Home",
      courses: "Courses",
      myCourses: "My Courses",
      dashboard: "Dashboard",
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      search: "Search courses...",
      instructors: "Instructors",
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
      whyUs: "Why Layaida?",
      whyUsItems: [
        { title: "Structured courses", desc: "Organized curriculum with clear progression" },
        { title: "Interactive quizzes", desc: "Test your knowledge after each lesson" },
        { title: "Multilingual", desc: "Content available in French, English, and Arabic" },
        { title: "Progress tracking", desc: "Track your advancement in real-time" },
      ],
      testimonials: "What our students say",
      howItWorks: "How it works",
      howItWorksSteps: [
        { title: "Sign up", desc: "Create your free account in seconds" },
        { title: "Choose a course", desc: "Browse our catalog and enroll in the course of your choice" },
        { title: "Learn at your pace", desc: "Watch videos, complete quizzes, and download materials" },
      ],
      stats: {
        students: "Students",
        courses: "Courses",
        lessons: "Lessons",
        teachers: "Teachers",
      },
    },
    courses: {
      title: "All Courses",
      subtitle: "Explore our course catalog for middle and high school",
      allSubjects: "All subjects",
      allLevels: "All levels",
      sortBy: "Sort by",
      popular: "Popular",
      newest: "Newest",
      rating: "Rating",
      showing: "Showing",
      results: "results",
      noResults: "No courses found",
      noResultsDesc: "Try adjusting your filters",
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
      reviews: "Reviews",
      writeReview: "Write a review",
      submitReview: "Submit",
      reviewPlaceholder: "Share your experience with this course...",
      relatedCourses: "Related courses",
      prerequisites: "Prerequisites",
      whatYouLearn: "What you'll learn",
      notFound: "Course not found",
      goHome: "Go home",
      certificate: "Certificate of completion",
      certificateDesc: "Congratulations! You have completed this course.",
      downloadCertificate: "Download certificate",
    },
    lesson: {
      next: "Next",
      previous: "Previous",
      markComplete: "Mark as complete",
      markedComplete: "Completed ✓",
      resources: "Resources",
      backToCourse: "Back to course",
      notes: "My notes",
      notesPlaceholder: "Take notes for this lesson...",
      saveNote: "Save",
      noteSaved: "Note saved",
      notFound: "Lesson not found",
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
      passwordWeak: "Weak",
      passwordMedium: "Medium",
      passwordStrong: "Strong",
      passwordsNoMatch: "Passwords do not match",
      emailInvalid: "Invalid email",
      required: "This field is required",
      showPassword: "Show password",
      rememberMe: "Remember me",
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome",
      overview: "Overview",
      enrolledCourses: "Enrolled Courses",
      lessonsCompleted: "Lessons Completed",
      timeSpent: "Study Time",
      streak: "Study Streak",
      days: "days",
      overallProgress: "Overall Progress",
      continueLearning: "Continue Learning",
      noActivity: "Start learning to see your progress here!",
      exploreCourses: "Explore Courses",
      recentActivity: "Recent Activity",
    },
    footer: {
      about: "About",
      contact: "Contact",
      terms: "Terms",
      privacy: "Privacy",
      tagline: "The learning platform for success",
    },
    common: {
      loading: "Loading...",
      error: "An error occurred",
      retry: "Retry",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      back: "Back",
      of: "of",
      enrollSuccess: "Successfully enrolled!",
      lessonCompleted: "Lesson completed!",
      welcomeBack: "Welcome back",
    },
    instructor: {
      title: "Our Instructors",
      bio: "Biography",
      courses: "Courses",
      students: "Students",
      rating: "Rating",
      viewProfile: "View Profile",
      expertise: "Expertise",
      allInstructors: "All Instructors",
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      courses: "الدروس",
      myCourses: "دروسي",
      dashboard: "لوحة التحكم",
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      signOut: "تسجيل الخروج",
      search: "ابحث عن دروس...",
      instructors: "الأساتذة",
    },
    home: {
      hero: {
        title: "تعلّم أفضل، أنجز أكثر",
        subtitle:
          "دروس عالية الجودة في الرياضيات والفيزياء والأحياء للمتوسط والثانوي. فيديوهات، تمارين ووثائق للنجاح في امتحاناتك.",
        cta: "استكشف الدروس",
      },
      subjects: "المواد",
      popularCourses: "الدروس الشائعة",
      viewAll: "عرض الكل",
      whyUs: "لماذا لعيدة؟",
      whyUsItems: [
        { title: "دروس منظمة", desc: "برنامج منظم بفصول مع تقدم واضح" },
        { title: "اختبارات تفاعلية", desc: "اختبر معرفتك بعد كل حصة" },
        { title: "متعدد اللغات", desc: "محتوى متاح بالفرنسية والإنجليزية والعربية" },
        { title: "تتبع التقدم", desc: "تابع تقدمك في الوقت الحقيقي" },
      ],
      testimonials: "ماذا يقول طلابنا",
      howItWorks: "كيف يعمل؟",
      howItWorksSteps: [
        { title: "سجّل حسابك", desc: "أنشئ حسابك المجاني في ثوانٍ" },
        { title: "اختر دورة", desc: "تصفح كتالوجنا وسجّل في الدورة التي تختارها" },
        { title: "تعلّم بوتيرتك", desc: "شاهد الفيديوهات، أكمل الاختبارات وحمّل المستندات" },
      ],
      stats: {
        students: "طلاب",
        courses: "دروس",
        lessons: "حصص",
        teachers: "أساتذة",
      },
    },
    courses: {
      title: "جميع الدروس",
      subtitle: "استكشف كتالوج الدروس للمتوسط والثانوي",
      allSubjects: "جميع المواد",
      allLevels: "جميع المستويات",
      sortBy: "ترتيب حسب",
      popular: "شائع",
      newest: "الأحدث",
      rating: "التقييم",
      showing: "عرض",
      results: "نتائج",
      noResults: "لا توجد دروس",
      noResultsDesc: "حاول تعديل عوامل التصفية",
    },
    course: {
      lessons: "حصص",
      hours: "ساعات",
      students: "طلاب",
      level: "المستوى",
      instructor: "الأستاذ",
      description: "الوصف",
      curriculum: "البرنامج",
      enrollFree: "سجل مجاناً",
      enrolled: "مسجل",
      startLearning: "ابدأ التعلم",
      continueLearning: "استمر",
      progress: "التقدم",
      completed: "مكتمل",
      documents: "الوثائق",
      downloadPdf: "تحميل PDF",
      reviews: "التقييمات",
      writeReview: "اكتب تقييماً",
      submitReview: "نشر",
      reviewPlaceholder: "شارك تجربتك مع هذا الدرس...",
      relatedCourses: "دروس مشابهة",
      prerequisites: "المتطلبات السابقة",
      whatYouLearn: "ماذا ستتعلم",
      notFound: "الدرس غير موجود",
      goHome: "العودة للرئيسية",
      certificate: "شهادة إتمام",
      certificateDesc: "تهانينا! لقد أكملت هذا الدرس.",
      downloadCertificate: "تحميل الشهادة",
    },
    lesson: {
      next: "التالي",
      previous: "السابق",
      markComplete: "علّم كمكتمل",
      markedComplete: "مكتمل ✓",
      resources: "الموارد",
      backToCourse: "العودة للدرس",
      notes: "ملاحظاتي",
      notesPlaceholder: "دوّن ملاحظاتك لهذه الحصة...",
      saveNote: "حفظ",
      noteSaved: "تم حفظ الملاحظة",
      notFound: "الحصة غير موجودة",
    },
    subjects: {
      math: "الرياضيات",
      physics: "الفيزياء",
      biology: "الأحياء",
    },
    levels: {
      middle: "المتوسط",
      high: "الثانوي",
      beginner: "مبتدئ",
      intermediate: "متوسط",
      advanced: "متقدم",
    },
    auth: {
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      fullName: "الاسم الكامل",
      forgotPassword: "نسيت كلمة المرور؟",
      noAccount: "ليس لديك حساب؟",
      hasAccount: "لديك حساب بالفعل؟",
      orContinueWith: "أو تابع بـ",
      google: "جوجل",
      passwordWeak: "ضعيف",
      passwordMedium: "متوسط",
      passwordStrong: "قوي",
      passwordsNoMatch: "كلمات المرور غير متطابقة",
      emailInvalid: "بريد إلكتروني غير صالح",
      required: "هذا الحقل مطلوب",
      showPassword: "إظهار كلمة المرور",
      rememberMe: "تذكرني",
    },
    dashboard: {
      title: "لوحة التحكم",
      welcome: "مرحباً",
      overview: "نظرة عامة",
      enrolledCourses: "الدروس المسجلة",
      lessonsCompleted: "الحصص المكتملة",
      timeSpent: "وقت الدراسة",
      streak: "سلسلة الدراسة",
      days: "أيام",
      overallProgress: "التقدم الإجمالي",
      continueLearning: "واصل التعلم",
      noActivity: "ابدأ التعلم لرؤية تقدمك هنا!",
      exploreCourses: "استكشف الدروس",
      recentActivity: "النشاط الأخير",
    },
    footer: {
      about: "حول",
      contact: "اتصل بنا",
      terms: "الشروط",
      privacy: "الخصوصية",
      tagline: "منصة التعلم للنجاح",
    },
    common: {
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      retry: "إعادة المحاولة",
      cancel: "إلغاء",
      save: "حفظ",
      delete: "حذف",
      edit: "تعديل",
      close: "إغلاق",
      back: "رجوع",
      of: "من",
      enrollSuccess: "تم التسجيل بنجاح!",
      lessonCompleted: "تم إكمال الحصة!",
      welcomeBack: "مرحباً بعودتك",
    },
    instructor: {
      title: "أساتذتنا",
      bio: "السيرة الذاتية",
      courses: "الدورات",
      students: "الطلاب",
      rating: "التقييم",
      viewProfile: "عرض الملف الشخصي",
      expertise: "التخصص",
      allInstructors: "جميع الأساتذة",
    },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}

export type { TranslationKeys };
