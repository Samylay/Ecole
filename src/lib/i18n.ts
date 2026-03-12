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
    faq: string;
    about: string;
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
  faq: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
    cta: string;
    ctaDesc: string;
    ctaButton: string;
  };
  about: {
    title: string;
    subtitle: string;
    mission: string;
    missionDesc: string;
    values: { title: string; desc: string }[];
    valuesTitle: string;
    team: string;
    teamDesc: string;
    teamRoles: { role: string; desc: string }[];
    cta: string;
    ctaDesc: string;
    ctaButton: string;
    statsTitle: string;
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
      faq: "FAQ",
      about: "À propos",
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
    faq: {
      title: "Questions fréquemment posées",
      subtitle: "Trouvez les réponses aux questions les plus courantes sur Layaida",
      items: [
        { q: "Comment s'inscrire sur Layaida ?", a: "L'inscription est simple et rapide. Cliquez sur le bouton \"Inscription\" en haut de la page, remplissez le formulaire avec votre nom, email et mot de passe, et votre compte sera créé instantanément. Vous pouvez aussi vous inscrire avec votre compte Google." },
        { q: "Est-ce que Layaida est gratuit ?", a: "Oui, Layaida est entièrement gratuit ! Tous les cours, vidéos, quiz et documents sont accessibles sans aucun frais. Notre mission est de rendre l'éducation de qualité accessible à tous." },
        { q: "Quelles matières sont disponibles ?", a: "Nous proposons actuellement des cours en mathématiques, physique et biologie pour les niveaux collège et lycée. Chaque matière comprend des cours structurés avec des vidéos, des exercices pratiques et des documents à télécharger." },
        { q: "Comment suivre ma progression ?", a: "Votre tableau de bord personnel affiche votre progression en temps réel. Vous pouvez voir les leçons terminées, le temps d'étude accumulé, votre série d'étude quotidienne et votre progression globale pour chaque cours." },
        { q: "Puis-je étudier en plusieurs langues ?", a: "Absolument ! Layaida est une plateforme multilingue. Vous pouvez basculer entre le français, l'anglais et l'arabe à tout moment grâce au sélecteur de langue dans la barre de navigation." },
        { q: "Y a-t-il des certificats ?", a: "Oui, vous recevez un certificat de réussite lorsque vous terminez un cours. Ce certificat atteste de votre achèvement du programme et peut être téléchargé en format PDF." },
        { q: "Comment contacter le support ?", a: "Vous pouvez nous contacter via la page de contact accessible depuis le pied de page. Notre équipe de support répond généralement dans les 24 heures. Vous pouvez aussi nous écrire directement par email." },
        { q: "À quelle fréquence de nouveaux cours sont-ils ajoutés ?", a: "Nous ajoutons régulièrement de nouveaux cours et mettons à jour le contenu existant. Notre équipe pédagogique travaille continuellement pour enrichir notre catalogue avec des cours pertinents et de qualité." },
        { q: "Puis-je télécharger les supports de cours ?", a: "Oui, chaque cours propose des documents PDF que vous pouvez télécharger et consulter hors ligne. Ces documents incluent des résumés de cours, des exercices supplémentaires et des fiches de révision." },
        { q: "Quels appareils sont supportés ?", a: "Layaida est accessible depuis n'importe quel appareil disposant d'un navigateur web : ordinateurs, tablettes et smartphones. La plateforme est entièrement responsive et s'adapte à toutes les tailles d'écran." },
      ],
      cta: "Vous avez d'autres questions ?",
      ctaDesc: "Rejoignez Layaida dès maintenant et commencez votre parcours d'apprentissage gratuitement.",
      ctaButton: "Commencer gratuitement",
    },
    about: {
      title: "À propos de Layaida",
      subtitle: "Découvrez notre mission et nos valeurs",
      mission: "Notre Mission",
      missionDesc: "Layaida a pour mission de démocratiser l'accès à une éducation de qualité pour tous les élèves du collège et du lycée. Nous croyons que chaque étudiant mérite des ressources pédagogiques excellentes, accessibles gratuitement et dans sa langue maternelle. Notre plateforme offre des cours structurés, des vidéos explicatives, des quiz interactifs et des documents téléchargeables pour accompagner chaque élève vers la réussite scolaire.",
      valuesTitle: "Nos Valeurs",
      values: [
        { title: "Accessibilité", desc: "L'éducation de qualité doit être accessible à tous, partout et à tout moment, sans barrière financière ni géographique." },
        { title: "Qualité", desc: "Nos cours sont conçus par des enseignants expérimentés et respectent les programmes scolaires officiels pour garantir un apprentissage efficace." },
        { title: "Multilinguisme", desc: "Nous proposons nos contenus en français, anglais et arabe pour servir une communauté d'apprenants diverse et multiculturelle." },
        { title: "Innovation", desc: "Nous utilisons les dernières technologies éducatives pour offrir une expérience d'apprentissage interactive, engageante et personnalisée." },
      ],
      team: "Notre Équipe",
      teamDesc: "Layaida est portée par une équipe passionnée de professionnels dédiés à l'éducation et à la technologie.",
      teamRoles: [
        { role: "Fondateurs & Direction", desc: "Visionnaires passionnés par l'éducation accessible, ils guident la stratégie et la croissance de la plateforme." },
        { role: "Équipe Pédagogique", desc: "Enseignants expérimentés qui conçoivent, révisent et enrichissent les cours pour garantir la qualité du contenu." },
        { role: "Développeurs", desc: "Ingénieurs talentueux qui construisent et améliorent la plateforme pour offrir la meilleure expérience utilisateur." },
        { role: "Support & Communauté", desc: "Équipe dédiée à l'accompagnement des étudiants et à l'animation de la communauté Layaida." },
      ],
      cta: "Rejoignez l'aventure Layaida",
      ctaDesc: "Commencez votre parcours d'apprentissage dès aujourd'hui et rejoignez des milliers d'étudiants qui réussissent avec Layaida.",
      ctaButton: "S'inscrire gratuitement",
      statsTitle: "Layaida en chiffres",
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
      faq: "FAQ",
      about: "About",
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
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to the most common questions about Layaida",
      items: [
        { q: "How do I sign up for Layaida?", a: "Signing up is quick and easy. Click the \"Sign Up\" button at the top of the page, fill in the form with your name, email, and password, and your account will be created instantly. You can also sign up using your Google account." },
        { q: "Is Layaida free?", a: "Yes, Layaida is completely free! All courses, videos, quizzes, and documents are accessible at no cost. Our mission is to make quality education accessible to everyone." },
        { q: "What subjects are available?", a: "We currently offer courses in mathematics, physics, and biology for middle and high school levels. Each subject includes structured courses with videos, practical exercises, and downloadable documents." },
        { q: "How can I track my progress?", a: "Your personal dashboard displays your progress in real-time. You can see completed lessons, accumulated study time, your daily study streak, and your overall progress for each course." },
        { q: "Can I study in multiple languages?", a: "Absolutely! Layaida is a multilingual platform. You can switch between French, English, and Arabic at any time using the language selector in the navigation bar." },
        { q: "Are there certificates?", a: "Yes, you receive a certificate of completion when you finish a course. This certificate confirms your completion of the program and can be downloaded as a PDF." },
        { q: "How do I contact support?", a: "You can reach us through the contact page accessible from the footer. Our support team typically responds within 24 hours. You can also write to us directly by email." },
        { q: "How often are new courses added?", a: "We regularly add new courses and update existing content. Our educational team works continuously to enrich our catalog with relevant, high-quality courses." },
        { q: "Can I download course materials?", a: "Yes, each course offers PDF documents that you can download and view offline. These documents include course summaries, additional exercises, and revision sheets." },
        { q: "What devices are supported?", a: "Layaida is accessible from any device with a web browser: computers, tablets, and smartphones. The platform is fully responsive and adapts to all screen sizes." },
      ],
      cta: "Still have questions?",
      ctaDesc: "Join Layaida now and start your learning journey for free.",
      ctaButton: "Get started for free",
    },
    about: {
      title: "About Layaida",
      subtitle: "Discover our mission and values",
      mission: "Our Mission",
      missionDesc: "Layaida's mission is to democratize access to quality education for all middle and high school students. We believe every student deserves excellent educational resources, freely accessible and in their native language. Our platform offers structured courses, explanatory videos, interactive quizzes, and downloadable documents to support every student on their path to academic success.",
      valuesTitle: "Our Values",
      values: [
        { title: "Accessibility", desc: "Quality education should be accessible to everyone, everywhere, and at any time, without financial or geographical barriers." },
        { title: "Quality", desc: "Our courses are designed by experienced teachers and follow official school curricula to ensure effective learning." },
        { title: "Multilingualism", desc: "We offer our content in French, English, and Arabic to serve a diverse and multicultural community of learners." },
        { title: "Innovation", desc: "We use the latest educational technologies to deliver an interactive, engaging, and personalized learning experience." },
      ],
      team: "Our Team",
      teamDesc: "Layaida is driven by a passionate team of professionals dedicated to education and technology.",
      teamRoles: [
        { role: "Founders & Leadership", desc: "Visionaries passionate about accessible education, guiding the platform's strategy and growth." },
        { role: "Educational Team", desc: "Experienced teachers who design, review, and enrich courses to ensure content quality." },
        { role: "Developers", desc: "Talented engineers who build and improve the platform to deliver the best user experience." },
        { role: "Support & Community", desc: "A dedicated team supporting students and nurturing the Layaida community." },
      ],
      cta: "Join the Layaida adventure",
      ctaDesc: "Start your learning journey today and join thousands of students succeeding with Layaida.",
      ctaButton: "Sign up for free",
      statsTitle: "Layaida in numbers",
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
      faq: "الأسئلة الشائعة",
      about: "حول",
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
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "اعثر على إجابات للأسئلة الأكثر شيوعاً حول لعيدة",
      items: [
        { q: "كيف أسجل في لعيدة؟", a: "التسجيل سهل وسريع. انقر على زر \"إنشاء حساب\" في أعلى الصفحة، واملأ النموذج باسمك وبريدك الإلكتروني وكلمة المرور، وسيتم إنشاء حسابك فوراً. يمكنك أيضاً التسجيل باستخدام حساب جوجل الخاص بك." },
        { q: "هل لعيدة مجانية؟", a: "نعم، لعيدة مجانية بالكامل! جميع الدروس والفيديوهات والاختبارات والوثائق متاحة بدون أي تكلفة. مهمتنا هي جعل التعليم الجيد متاحاً للجميع." },
        { q: "ما هي المواد المتاحة؟", a: "نقدم حالياً دروساً في الرياضيات والفيزياء والأحياء لمستويات المتوسط والثانوي. تتضمن كل مادة دروساً منظمة مع فيديوهات وتمارين عملية ووثائق قابلة للتحميل." },
        { q: "كيف أتابع تقدمي؟", a: "تعرض لوحة التحكم الشخصية تقدمك في الوقت الحقيقي. يمكنك رؤية الدروس المكتملة ووقت الدراسة المتراكم وسلسلة دراستك اليومية وتقدمك العام في كل دورة." },
        { q: "هل يمكنني الدراسة بعدة لغات؟", a: "بالتأكيد! لعيدة منصة متعددة اللغات. يمكنك التبديل بين الفرنسية والإنجليزية والعربية في أي وقت باستخدام محدد اللغة في شريط التنقل." },
        { q: "هل توجد شهادات؟", a: "نعم، تحصل على شهادة إتمام عند إنهاء دورة. تؤكد هذه الشهادة إكمالك للبرنامج ويمكن تحميلها بصيغة PDF." },
        { q: "كيف أتواصل مع الدعم؟", a: "يمكنك التواصل معنا عبر صفحة الاتصال المتاحة من أسفل الصفحة. يستجيب فريق الدعم عادة خلال 24 ساعة. يمكنك أيضاً مراسلتنا مباشرة عبر البريد الإلكتروني." },
        { q: "كم مرة تُضاف دورات جديدة؟", a: "نضيف بانتظام دورات جديدة ونحدث المحتوى الحالي. يعمل فريقنا التعليمي باستمرار لإثراء كتالوجنا بدورات ذات جودة عالية وذات صلة." },
        { q: "هل يمكنني تحميل مواد الدورة؟", a: "نعم، تقدم كل دورة وثائق PDF يمكنك تحميلها والاطلاع عليها بدون اتصال. تتضمن هذه الوثائق ملخصات الدروس وتمارين إضافية وأوراق مراجعة." },
        { q: "ما الأجهزة المدعومة؟", a: "لعيدة متاحة من أي جهاز يحتوي على متصفح ويب: حواسيب، أجهزة لوحية وهواتف ذكية. المنصة متجاوبة بالكامل وتتكيف مع جميع أحجام الشاشات." },
      ],
      cta: "لديك أسئلة أخرى؟",
      ctaDesc: "انضم إلى لعيدة الآن وابدأ رحلة التعلم مجاناً.",
      ctaButton: "ابدأ مجاناً",
    },
    about: {
      title: "حول لعيدة",
      subtitle: "اكتشف مهمتنا وقيمنا",
      mission: "مهمتنا",
      missionDesc: "تتمثل مهمة لعيدة في تسهيل الوصول إلى تعليم جيد لجميع طلاب المتوسط والثانوي. نؤمن بأن كل طالب يستحق موارد تعليمية ممتازة، متاحة مجاناً وبلغته الأم. توفر منصتنا دروساً منظمة وفيديوهات توضيحية واختبارات تفاعلية ووثائق قابلة للتحميل لمرافقة كل طالب نحو النجاح الدراسي.",
      valuesTitle: "قيمنا",
      values: [
        { title: "إمكانية الوصول", desc: "يجب أن يكون التعليم الجيد متاحاً للجميع، في كل مكان وفي أي وقت، بدون حواجز مالية أو جغرافية." },
        { title: "الجودة", desc: "صُممت دروسنا من قبل معلمين ذوي خبرة وتتبع المناهج الدراسية الرسمية لضمان تعلم فعّال." },
        { title: "تعدد اللغات", desc: "نقدم محتوانا بالفرنسية والإنجليزية والعربية لخدمة مجتمع متنوع ومتعدد الثقافات من المتعلمين." },
        { title: "الابتكار", desc: "نستخدم أحدث التقنيات التعليمية لتقديم تجربة تعلم تفاعلية وجذابة وشخصية." },
      ],
      team: "فريقنا",
      teamDesc: "يقود لعيدة فريق شغوف من المحترفين المكرسين للتعليم والتكنولوجيا.",
      teamRoles: [
        { role: "المؤسسون والإدارة", desc: "أصحاب رؤية شغوفون بالتعليم المتاح، يوجهون استراتيجية ونمو المنصة." },
        { role: "الفريق التعليمي", desc: "معلمون ذوو خبرة يصممون ويراجعون ويثرون الدروس لضمان جودة المحتوى." },
        { role: "المطورون", desc: "مهندسون موهوبون يبنون ويحسنون المنصة لتقديم أفضل تجربة مستخدم." },
        { role: "الدعم والمجتمع", desc: "فريق مخصص لدعم الطلاب وتنشيط مجتمع لعيدة." },
      ],
      cta: "انضم إلى مغامرة لعيدة",
      ctaDesc: "ابدأ رحلة التعلم اليوم وانضم إلى آلاف الطلاب الذين ينجحون مع لعيدة.",
      ctaButton: "سجل مجاناً",
      statsTitle: "لعيدة بالأرقام",
    },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}

export type { TranslationKeys };
