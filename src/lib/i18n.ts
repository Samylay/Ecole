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

// Arabic stats/timers use Arabic-Indic digits per the design spec.
export function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar" : locale).format(value);
}

type TranslationKeys = {
  common: {
    search: string;
    cancel: string;
    close: string;
    back: string;
    skip: string;
    next: string;
    previous: string;
    continue: string;
    save: string;
    loading: string;
    seeAll: string;
    retry: string;
    min: string;
    of: string;
    and: string;
    skipToContent: string;
    mainNav: string;
    languageLabel: string;
    selectLanguage: string;
    openMenu: string;
    closeMenu: string;
    delete: string;
    lockedContent: string;
  };
  nav: {
    home: string;
    courses: string;
    myCourses: string;
    dashboard: string;
    profile: string;
    signIn: string;
    signUp: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
      searchPlaceholder: string;
    };
    subjects: string;
    subjectsSubtitle: string;
    popularCourses: string;
    viewAll: string;
    coursesCount: string;
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
    startFirstLesson: string;
    continueLearning: string;
    progress: string;
    completed: string;
    documents: string;
    downloadPdf: string;
    downloaded: string;
    whatYouWillLearn: string;
    prerequisite: string;
    preview: string;
    previewVideo: string;
    chapters: string;
    reviews: string;
    ratings: string;
    quiz: string;
    free: string;
    enrolledToast: string;
  };
  lesson: {
    next: string;
    previous: string;
    markComplete: string;
    markedComplete: string;
    resources: string;
    backToCourse: string;
    about: string;
    myNotes: string;
    addNote: string;
    notePlaceholder: string;
    noNotes: string;
    noDocuments: string;
    completedToast: string;
    autoAdvance: string;
    stayHere: string;
    chaptersDrawer: string;
    courseProgress: string;
    courseCompleteTitle: string;
    courseCompleteBody: string;
  };
  quiz: {
    title: string;
    questionOf: string;
    validate: string;
    nextQuestion: string;
    seeResults: string;
    correct: string;
    incorrect: string;
    explanation: string;
    backToLesson: string;
    results: string;
    yourScore: string;
    replay: string;
    exitTitle: string;
    exitBody: string;
    exitConfirm: string;
    exitCancel: string;
    reviewAnswers: string;
    noQuiz: string;
    startQuiz: string;
    perfect: string;
    goodJob: string;
    keepGoing: string;
  };
  onboarding: {
    step: string;
    classTitle: string;
    classSubtitle: string;
    subjectsTitle: string;
    subjectsSubtitle: string;
    goalTitle: string;
    goalSubtitle: string;
    goalLight: string;
    goalLightDesc: string;
    goalRegular: string;
    goalRegularDesc: string;
    goalIntense: string;
    goalIntenseDesc: string;
    reminders: string;
    remindersDesc: string;
    start: string;
    welcomeToast: string;
    lessonsPerWeek: string;
  };
  dashboard: {
    greeting: string;
    streakDays: string;
    resume: string;
    resumeSubtitle: string;
    weeklyGoal: string;
    lessonsThisWeek: string;
    subjectProgress: string;
    recommended: string;
    weeklyActivity: string;
    streakTitle: string;
    streakSubtitle: string;
    noActivity: string;
    exploreCatalog: string;
    startACourse: string;
  };
  catalog: {
    title: string;
    filters: string;
    subject: string;
    levelLabel: string;
    allLevels: string;
    duration: string;
    durationShort: string;
    durationMedium: string;
    durationLong: string;
    rating: string;
    ratingMin: string;
    resultsCount: string;
    clearFilters: string;
    showResults: string;
    noResultsTitle: string;
    noResultsBody: string;
    searchPlaceholder: string;
  };
  myCourses: {
    title: string;
    inProgress: string;
    completedTab: string;
    resume: string;
    emptyInProgressTitle: string;
    emptyInProgressBody: string;
    emptyCompletedTitle: string;
    emptyCompletedBody: string;
    browseCatalog: string;
    lessonsDone: string;
  };
  profile: {
    title: string;
    account: string;
    language: string;
    theme: string;
    themeLight: string;
    themeDark: string;
    themeSystem: string;
    notifications: string;
    notificationsDesc: string;
    weeklyGoalSetting: string;
    weeklyGoalDesc: string;
    password: string;
    changePassword: string;
    currentPassword: string;
    newPassword: string;
    savedToast: string;
    memberSince: string;
    preferences: string;
    security: string;
  };
  teacher: {
    coursesBy: string;
    students: string;
    rating: string;
    courses: string;
    follow: string;
    following: string;
    about: string;
  };
  parent: {
    title: string;
    subtitle: string;
    weeklyActivity: string;
    lessonsCompleted: string;
    timeSpent: string;
    bySubject: string;
    recentActivity: string;
    summaryTitle: string;
    noActivityYet: string;
    completedLesson: string;
    passedQuiz: string;
    enrolledIn: string;
  };
  states: {
    notFoundTitle: string;
    notFoundBody: string;
    notFoundCta: string;
    offlineBanner: string;
    offlineDocsHint: string;
    errorTitle: string;
    errorBody: string;
    errorRetry: string;
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
  grades: {
    sixieme: string;
    cinquieme: string;
    quatrieme: string;
    troisieme: string;
    seconde: string;
    premiere: string;
    terminale: string;
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
    iAmStudent: string;
    iAmStudentDesc: string;
    iAmParent: string;
    iAmParentDesc: string;
    strengthWeak: string;
    strengthMedium: string;
    strengthStrong: string;
    testimonial: string;
    testimonialAuthor: string;
    signInTitle: string;
    signUpTitle: string;
    whoAreYou: string;
  };
  footer: {
    about: string;
    contact: string;
    terms: string;
    privacy: string;
    tagline: string;
  };
  certificate: {
    title: string;
    presentedTo: string;
    completionStatement: string;
    instructor: string;
    issuedOn: string;
    print: string;
    back: string;
    viewCertificate: string;
    notCompletedTitle: string;
    notCompletedBody: string;
    goToCourse: string;
  };
};

const translations: Record<Locale, TranslationKeys> = {
  fr: {
    common: {
      search: "Rechercher",
      cancel: "Annuler",
      close: "Fermer",
      back: "Retour",
      skip: "Passer",
      next: "Suivant",
      previous: "Précédent",
      continue: "Continuer",
      save: "Enregistrer",
      loading: "Chargement…",
      seeAll: "Voir tout",
      retry: "Réessayer",
      min: "min",
      of: "sur",
      and: "et",
      skipToContent: "Aller au contenu",
      mainNav: "Navigation principale",
      languageLabel: "Langue",
      selectLanguage: "Choisir la langue",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      delete: "Supprimer",
      lockedContent: "Contenu verrouillé",
    },
    nav: {
      home: "Accueil",
      courses: "Cours",
      myCourses: "Mes cours",
      dashboard: "Tableau de bord",
      profile: "Profil",
      signIn: "Connexion",
      signUp: "Inscription",
    },
    home: {
      hero: {
        title: "Apprends mieux, réussis plus",
        subtitle:
          "Des leçons en vidéo par de vrais profs, des exercices corrigés et un suivi de progression — en français, anglais et arabe.",
        cta: "Explorer les cours",
        searchPlaceholder: "Cherche un cours, un chapitre, une notion…",
      },
      subjects: "Matières",
      subjectsSubtitle: "Choisis ta matière et avance à ton rythme",
      popularCourses: "Cours populaires",
      viewAll: "Voir tout",
      coursesCount: "cours",
      stats: {
        students: "Étudiants",
        courses: "Cours",
        lessons: "Leçons",
        teachers: "Enseignants",
      },
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
      startFirstLesson: "Commencer la leçon 1",
      continueLearning: "Reprendre",
      progress: "Progression",
      completed: "Terminé",
      documents: "Documents",
      downloadPdf: "Télécharger PDF",
      downloaded: "Téléchargé, disponible hors ligne",
      whatYouWillLearn: "Ce que tu vas apprendre",
      prerequisite: "Prérequis",
      preview: "Aperçu",
      previewVideo: "Vidéo de présentation",
      chapters: "Chapitres",
      reviews: "Avis",
      ratings: "notes",
      quiz: "Quiz",
      free: "Gratuit",
      enrolledToast: "Tu es inscrit·e ! Bon apprentissage 🎉",
    },
    lesson: {
      next: "Suivant",
      previous: "Précédent",
      markComplete: "Marquer comme terminée",
      markedComplete: "Terminée",
      resources: "Ressources",
      backToCourse: "Retour au cours",
      about: "À propos",
      myNotes: "Mes notes",
      addNote: "Ajouter une note",
      notePlaceholder: "Note liée à ce moment de la vidéo…",
      noNotes: "Pas encore de notes. Écris ta première note pendant la vidéo.",
      noDocuments: "Aucun document pour cette leçon.",
      completedToast: "Leçon terminée, bravo !",
      autoAdvance: "Leçon suivante dans 5 s…",
      stayHere: "Rester ici",
      chaptersDrawer: "Chapitres",
      courseProgress: "Progression du cours",
      courseCompleteTitle: "Cours terminé !",
      courseCompleteBody: "Tu as terminé toutes les leçons de ce cours. Bravo pour ton travail !",
    },
    quiz: {
      title: "Quiz",
      questionOf: "Question",
      validate: "Valider",
      nextQuestion: "Question suivante",
      seeResults: "Voir les résultats",
      correct: "Bonne réponse !",
      incorrect: "Pas tout à fait…",
      explanation: "Explication",
      backToLesson: "Revoir la leçon",
      results: "Résultats",
      yourScore: "Ton score",
      replay: "Rejouer",
      exitTitle: "Quitter le quiz ?",
      exitBody: "Ta progression dans ce quiz ne sera pas enregistrée.",
      exitConfirm: "Quitter",
      exitCancel: "Continuer le quiz",
      reviewAnswers: "Revue des questions",
      noQuiz: "Pas de quiz pour ce chapitre.",
      startQuiz: "Lancer le quiz",
      perfect: "Sans faute, impressionnant !",
      goodJob: "Bien joué, continue comme ça !",
      keepGoing: "Revois la leçon et retente ta chance.",
    },
    onboarding: {
      step: "Étape",
      classTitle: "En quelle classe es-tu ?",
      classSubtitle: "On adapte les cours à ton programme.",
      subjectsTitle: "Quelles matières t'intéressent ?",
      subjectsSubtitle: "Tu peux en choisir plusieurs.",
      goalTitle: "Ton objectif hebdo ?",
      goalSubtitle: "Un rythme régulier vaut mieux qu'un marathon.",
      goalLight: "Léger",
      goalLightDesc: "2 leçons / semaine",
      goalRegular: "Régulier",
      goalRegularDesc: "4 leçons / semaine",
      goalIntense: "Intensif",
      goalIntenseDesc: "7 leçons / semaine",
      reminders: "Rappels",
      remindersDesc: "Un petit rappel pour garder le rythme.",
      start: "C'est parti !",
      welcomeToast: "Bienvenue sur Layaida ! Ton espace est prêt.",
      lessonsPerWeek: "leçons / semaine",
    },
    dashboard: {
      greeting: "Salut",
      streakDays: "jours d'affilée",
      resume: "Reprendre",
      resumeSubtitle: "Reprends là où tu t'es arrêté",
      weeklyGoal: "Objectif de la semaine",
      lessonsThisWeek: "leçons cette semaine",
      subjectProgress: "Par matière",
      recommended: "Recommandé pour toi",
      weeklyActivity: "Activité de la semaine",
      streakTitle: "Série en cours",
      streakSubtitle: "Continue chaque jour pour garder ta série.",
      noActivity: "Aucune activité pour l'instant.",
      exploreCatalog: "Explorer le catalogue",
      startACourse: "Commence un cours pour voir ta progression ici.",
    },
    catalog: {
      title: "Catalogue",
      filters: "Filtres",
      subject: "Matière",
      levelLabel: "Niveau",
      allLevels: "Tous",
      duration: "Durée",
      durationShort: "Moins de 5 h",
      durationMedium: "5 à 10 h",
      durationLong: "Plus de 10 h",
      rating: "Note",
      ratingMin: "et plus",
      resultsCount: "résultats",
      clearFilters: "Effacer les filtres",
      showResults: "Afficher les résultats",
      noResultsTitle: "Aucun cours ne correspond",
      noResultsBody: "Essaie d'élargir tes filtres ou de chercher autre chose.",
      searchPlaceholder: "Rechercher un cours…",
    },
    myCourses: {
      title: "Mes cours",
      inProgress: "En cours",
      completedTab: "Terminés",
      resume: "Reprendre",
      emptyInProgressTitle: "Aucun cours en cours",
      emptyInProgressBody: "Inscris-toi à un cours pour le retrouver ici.",
      emptyCompletedTitle: "Aucun cours terminé",
      emptyCompletedBody: "Termine toutes les leçons d'un cours et il apparaîtra ici.",
      browseCatalog: "Parcourir le catalogue",
      lessonsDone: "leçons terminées",
    },
    profile: {
      title: "Profil & réglages",
      account: "Compte",
      language: "Langue",
      theme: "Thème",
      themeLight: "Clair",
      themeDark: "Sombre",
      themeSystem: "Système",
      notifications: "Notifications",
      notificationsDesc: "Rappels d'objectif et nouveautés des cours suivis.",
      weeklyGoalSetting: "Objectif hebdo",
      weeklyGoalDesc: "Nombre de leçons visées par semaine.",
      password: "Mot de passe",
      changePassword: "Changer le mot de passe",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      savedToast: "Réglages enregistrés",
      memberSince: "Membre depuis",
      preferences: "Préférences",
      security: "Sécurité",
    },
    teacher: {
      coursesBy: "Cours de",
      students: "étudiants",
      rating: "note moyenne",
      courses: "cours",
      follow: "Suivre",
      following: "Suivi ✓",
      about: "À propos",
    },
    parent: {
      title: "Espace parent",
      subtitle: "Suivi en lecture seule de l'activité de ton enfant.",
      weeklyActivity: "Cette semaine",
      lessonsCompleted: "leçons terminées",
      timeSpent: "temps d'étude",
      bySubject: "Par matière",
      recentActivity: "Activité récente",
      summaryTitle: "En résumé",
      noActivityYet: "Pas encore d'activité cette semaine.",
      completedLesson: "a terminé la leçon",
      passedQuiz: "a réussi le quiz",
      enrolledIn: "s'est inscrit·e à",
    },
    states: {
      notFoundTitle: "Cette page a séché les cours",
      notFoundBody: "On n'a pas trouvé ce que tu cherches. Elle a peut-être changé d'adresse.",
      notFoundCta: "Retour à l'accueil",
      offlineBanner: "Tu es hors ligne — certaines fonctions sont limitées.",
      offlineDocsHint: "Les documents téléchargés restent disponibles.",
      errorTitle: "Quelque chose s'est mal passé",
      errorBody: "Une erreur inattendue est survenue. Réessaie dans un instant.",
      errorRetry: "Réessayer",
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
    grades: {
      sixieme: "6ᵉ",
      cinquieme: "5ᵉ",
      quatrieme: "4ᵉ",
      troisieme: "3ᵉ",
      seconde: "Seconde",
      premiere: "Première",
      terminale: "Terminale",
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
      invalidCredentials: "Email ou mot de passe incorrect",
      missingFields: "Veuillez remplir tous les champs",
      emailTaken: "Cet email est déjà utilisé",
      weakPassword: "Le mot de passe doit contenir au moins 6 caractères",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      signupSuccess: "Compte créé avec succès !",
      welcome: "Bienvenue",
      logout: "Déconnexion",
      loginToAccess: "Connecte-toi pour accéder aux cours",
      iAmStudent: "Je suis élève",
      iAmStudentDesc: "Je veux suivre des cours et progresser.",
      iAmParent: "Je suis parent",
      iAmParentDesc: "Je veux suivre la progression de mon enfant.",
      strengthWeak: "Faible",
      strengthMedium: "Moyen",
      strengthStrong: "Solide",
      testimonial:
        "« Les schémas m'ont enfin fait comprendre le coefficient directeur. Les PDF d'exercices sont super utiles avant un contrôle. »",
      testimonialAuthor: "Lina, 3ᵉ",
      signInTitle: "Content de te revoir",
      signUpTitle: "Crée ton compte",
      whoAreYou: "Qui es-tu ?",
    },
    footer: {
      about: "À propos",
      contact: "Contact",
      terms: "Conditions",
      privacy: "Confidentialité",
      tagline: "La plateforme d'apprentissage pour réussir",
    },
    certificate: {
      title: "Certificat de réussite",
      presentedTo: "Décerné à",
      completionStatement: "a terminé avec succès le cours",
      instructor: "Formateur",
      issuedOn: "Délivré le",
      print: "Imprimer / Télécharger en PDF",
      back: "Retour au cours",
      viewCertificate: "Voir le certificat",
      notCompletedTitle: "Certificat non disponible",
      notCompletedBody: "Termine toutes les leçons de ce cours pour débloquer ton certificat.",
      goToCourse: "Aller au cours",
    },
  },
  en: {
    common: {
      search: "Search",
      cancel: "Cancel",
      close: "Close",
      back: "Back",
      skip: "Skip",
      next: "Next",
      previous: "Previous",
      continue: "Continue",
      save: "Save",
      loading: "Loading…",
      seeAll: "See all",
      retry: "Retry",
      min: "min",
      of: "of",
      and: "and",
      skipToContent: "Skip to content",
      mainNav: "Main navigation",
      languageLabel: "Language",
      selectLanguage: "Select language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      delete: "Delete",
      lockedContent: "Locked content",
    },
    nav: {
      home: "Home",
      courses: "Courses",
      myCourses: "My courses",
      dashboard: "Dashboard",
      profile: "Profile",
      signIn: "Sign in",
      signUp: "Sign up",
    },
    home: {
      hero: {
        title: "Learn better, achieve more",
        subtitle:
          "Video lessons by real teachers, corrected exercises and progress tracking — in French, English and Arabic.",
        cta: "Explore courses",
        searchPlaceholder: "Search a course, a chapter, a concept…",
      },
      subjects: "Subjects",
      subjectsSubtitle: "Pick your subject and learn at your own pace",
      popularCourses: "Popular courses",
      viewAll: "View all",
      coursesCount: "courses",
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
      startLearning: "Start",
      startFirstLesson: "Start lesson 1",
      continueLearning: "Resume",
      progress: "Progress",
      completed: "Completed",
      documents: "Documents",
      downloadPdf: "Download PDF",
      downloaded: "Downloaded, available offline",
      whatYouWillLearn: "What you'll learn",
      prerequisite: "Prerequisite",
      preview: "Preview",
      previewVideo: "Preview video",
      chapters: "Chapters",
      reviews: "Reviews",
      ratings: "ratings",
      quiz: "Quiz",
      free: "Free",
      enrolledToast: "You're enrolled! Happy learning 🎉",
    },
    lesson: {
      next: "Next",
      previous: "Previous",
      markComplete: "Mark as complete",
      markedComplete: "Completed",
      resources: "Resources",
      backToCourse: "Back to course",
      about: "About",
      myNotes: "My notes",
      addNote: "Add a note",
      notePlaceholder: "Note tied to this moment in the video…",
      noNotes: "No notes yet. Write your first note while watching.",
      noDocuments: "No documents for this lesson.",
      completedToast: "Lesson completed, well done!",
      autoAdvance: "Next lesson in 5s…",
      stayHere: "Stay here",
      chaptersDrawer: "Chapters",
      courseProgress: "Course progress",
      courseCompleteTitle: "Course completed!",
      courseCompleteBody: "You've finished every lesson in this course. Great work!",
    },
    quiz: {
      title: "Quiz",
      questionOf: "Question",
      validate: "Check",
      nextQuestion: "Next question",
      seeResults: "See results",
      correct: "Correct!",
      incorrect: "Not quite…",
      explanation: "Explanation",
      backToLesson: "Review the lesson",
      results: "Results",
      yourScore: "Your score",
      replay: "Play again",
      exitTitle: "Leave the quiz?",
      exitBody: "Your progress in this quiz won't be saved.",
      exitConfirm: "Leave",
      exitCancel: "Keep going",
      reviewAnswers: "Question review",
      noQuiz: "No quiz for this chapter.",
      startQuiz: "Start the quiz",
      perfect: "Flawless, impressive!",
      goodJob: "Nice work, keep it up!",
      keepGoing: "Review the lesson and try again.",
    },
    onboarding: {
      step: "Step",
      classTitle: "What grade are you in?",
      classSubtitle: "We adapt courses to your curriculum.",
      subjectsTitle: "Which subjects interest you?",
      subjectsSubtitle: "You can pick several.",
      goalTitle: "Your weekly goal?",
      goalSubtitle: "A steady pace beats a marathon.",
      goalLight: "Light",
      goalLightDesc: "2 lessons / week",
      goalRegular: "Regular",
      goalRegularDesc: "4 lessons / week",
      goalIntense: "Intense",
      goalIntenseDesc: "7 lessons / week",
      reminders: "Reminders",
      remindersDesc: "A small nudge to keep the rhythm.",
      start: "Let's go!",
      welcomeToast: "Welcome to Layaida! Your space is ready.",
      lessonsPerWeek: "lessons / week",
    },
    dashboard: {
      greeting: "Hi",
      streakDays: "days in a row",
      resume: "Resume",
      resumeSubtitle: "Pick up where you left off",
      weeklyGoal: "This week's goal",
      lessonsThisWeek: "lessons this week",
      subjectProgress: "By subject",
      recommended: "Recommended for you",
      weeklyActivity: "This week's activity",
      streakTitle: "Current streak",
      streakSubtitle: "Come back every day to keep your streak.",
      noActivity: "No activity yet.",
      exploreCatalog: "Explore the catalog",
      startACourse: "Start a course to see your progress here.",
    },
    catalog: {
      title: "Catalog",
      filters: "Filters",
      subject: "Subject",
      levelLabel: "Level",
      allLevels: "All",
      duration: "Duration",
      durationShort: "Under 5h",
      durationMedium: "5 to 10h",
      durationLong: "Over 10h",
      rating: "Rating",
      ratingMin: "and up",
      resultsCount: "results",
      clearFilters: "Clear filters",
      showResults: "Show results",
      noResultsTitle: "No course matches",
      noResultsBody: "Try widening your filters or searching for something else.",
      searchPlaceholder: "Search a course…",
    },
    myCourses: {
      title: "My courses",
      inProgress: "In progress",
      completedTab: "Completed",
      resume: "Resume",
      emptyInProgressTitle: "No course in progress",
      emptyInProgressBody: "Enroll in a course to find it here.",
      emptyCompletedTitle: "No completed course",
      emptyCompletedBody: "Finish every lesson of a course and it will show up here.",
      browseCatalog: "Browse the catalog",
      lessonsDone: "lessons done",
    },
    profile: {
      title: "Profile & settings",
      account: "Account",
      language: "Language",
      theme: "Theme",
      themeLight: "Light",
      themeDark: "Dark",
      themeSystem: "System",
      notifications: "Notifications",
      notificationsDesc: "Goal reminders and updates from courses you follow.",
      weeklyGoalSetting: "Weekly goal",
      weeklyGoalDesc: "Number of lessons you aim for each week.",
      password: "Password",
      changePassword: "Change password",
      currentPassword: "Current password",
      newPassword: "New password",
      savedToast: "Settings saved",
      memberSince: "Member since",
      preferences: "Preferences",
      security: "Security",
    },
    teacher: {
      coursesBy: "Courses by",
      students: "students",
      rating: "average rating",
      courses: "courses",
      follow: "Follow",
      following: "Following ✓",
      about: "About",
    },
    parent: {
      title: "Parent space",
      subtitle: "Read-only view of your child's activity.",
      weeklyActivity: "This week",
      lessonsCompleted: "lessons completed",
      timeSpent: "study time",
      bySubject: "By subject",
      recentActivity: "Recent activity",
      summaryTitle: "In short",
      noActivityYet: "No activity yet this week.",
      completedLesson: "completed the lesson",
      passedQuiz: "passed the quiz",
      enrolledIn: "enrolled in",
    },
    states: {
      notFoundTitle: "This page skipped class",
      notFoundBody: "We couldn't find what you're looking for. It may have moved.",
      notFoundCta: "Back to home",
      offlineBanner: "You're offline — some features are limited.",
      offlineDocsHint: "Downloaded documents remain available.",
      errorTitle: "Something went wrong",
      errorBody: "An unexpected error occurred. Try again in a moment.",
      errorRetry: "Retry",
    },
    subjects: {
      math: "Mathematics",
      physics: "Physics",
      biology: "Biology",
    },
    levels: {
      middle: "Middle school",
      high: "High school",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
    },
    grades: {
      sixieme: "6th grade",
      cinquieme: "7th grade",
      quatrieme: "8th grade",
      troisieme: "9th grade",
      seconde: "10th grade",
      premiere: "11th grade",
      terminale: "12th grade",
    },
    auth: {
      signIn: "Sign in",
      signUp: "Sign up",
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
      iAmStudent: "I'm a student",
      iAmStudentDesc: "I want to take courses and make progress.",
      iAmParent: "I'm a parent",
      iAmParentDesc: "I want to follow my child's progress.",
      strengthWeak: "Weak",
      strengthMedium: "Medium",
      strengthStrong: "Strong",
      testimonial:
        "“The diagrams finally made me understand slope. The exercise PDFs are so useful before a test.”",
      testimonialAuthor: "Lina, 9th grade",
      signInTitle: "Good to see you again",
      signUpTitle: "Create your account",
      whoAreYou: "Who are you?",
    },
    footer: {
      about: "About",
      contact: "Contact",
      terms: "Terms",
      privacy: "Privacy",
      tagline: "The learning platform for success",
    },
    certificate: {
      title: "Certificate of Completion",
      presentedTo: "Presented to",
      completionStatement: "has successfully completed the course",
      instructor: "Instructor",
      issuedOn: "Issued on",
      print: "Print / Download as PDF",
      back: "Back to course",
      viewCertificate: "View certificate",
      notCompletedTitle: "Certificate not available",
      notCompletedBody: "Finish every lesson in this course to unlock your certificate.",
      goToCourse: "Go to course",
    },
  },
  ar: {
    common: {
      search: "بحث",
      cancel: "إلغاء",
      close: "إغلاق",
      back: "رجوع",
      skip: "تخطّي",
      next: "التالي",
      previous: "السابق",
      continue: "متابعة",
      save: "حفظ",
      loading: "جارٍ التحميل…",
      seeAll: "عرض الكل",
      retry: "إعادة المحاولة",
      min: "د",
      of: "من",
      and: "و",
      skipToContent: "الانتقال إلى المحتوى",
      mainNav: "التنقل الرئيسي",
      languageLabel: "اللغة",
      selectLanguage: "اختيار اللغة",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
      delete: "حذف",
      lockedContent: "محتوى مُقفل",
    },
    nav: {
      home: "الرئيسية",
      courses: "الدروس",
      myCourses: "دروسي",
      dashboard: "لوحة التحكم",
      profile: "الملف الشخصي",
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
    },
    home: {
      hero: {
        title: "تعلّم أفضل، أنجز أكثر",
        subtitle:
          "دروس فيديو من أساتذة حقيقيين، تمارين مصححة ومتابعة للتقدم — بالفرنسية والإنجليزية والعربية.",
        cta: "استكشف الدروس",
        searchPlaceholder: "ابحث عن درس، فصل، أو مفهوم…",
      },
      subjects: "المواد",
      subjectsSubtitle: "اختر مادتك وتقدّم على إيقاعك",
      popularCourses: "الدروس الشائعة",
      viewAll: "عرض الكل",
      coursesCount: "دروس",
      stats: {
        students: "طلاب",
        courses: "دروس",
        lessons: "حصص",
        teachers: "أساتذة",
      },
    },
    course: {
      lessons: "حصص",
      hours: "ساعات",
      students: "طلاب",
      level: "المستوى",
      instructor: "الأستاذ",
      description: "الوصف",
      curriculum: "البرنامج",
      enrollFree: "سجّل مجاناً",
      enrolled: "مسجّل",
      startLearning: "ابدأ",
      startFirstLesson: "ابدأ الحصة 1",
      continueLearning: "استأنف",
      progress: "التقدم",
      completed: "مكتمل",
      documents: "الوثائق",
      downloadPdf: "تحميل PDF",
      downloaded: "تم التحميل، متاح دون اتصال",
      whatYouWillLearn: "ماذا ستتعلم",
      prerequisite: "المتطلبات",
      preview: "معاينة",
      previewVideo: "فيديو تعريفي",
      chapters: "الفصول",
      reviews: "التقييمات",
      ratings: "تقييم",
      quiz: "اختبار",
      free: "مجاني",
      enrolledToast: "تم تسجيلك! تعلّماً ممتعاً 🎉",
    },
    lesson: {
      next: "التالي",
      previous: "السابق",
      markComplete: "علّم كمكتملة",
      markedComplete: "مكتملة",
      resources: "الموارد",
      backToCourse: "العودة للدرس",
      about: "حول",
      myNotes: "ملاحظاتي",
      addNote: "أضف ملاحظة",
      notePlaceholder: "ملاحظة مرتبطة بهذه اللحظة من الفيديو…",
      noNotes: "لا ملاحظات بعد. اكتب أول ملاحظة أثناء المشاهدة.",
      noDocuments: "لا وثائق لهذه الحصة.",
      completedToast: "أكملت الحصة، أحسنت!",
      autoAdvance: "الحصة التالية بعد 5 ثوانٍ…",
      stayHere: "ابقَ هنا",
      chaptersDrawer: "الفصول",
      courseProgress: "تقدم الدرس",
      courseCompleteTitle: "أتممت الدرس!",
      courseCompleteBody: "أنهيت كل حصص هذا الدرس. أحسنت صنعاً!",
    },
    quiz: {
      title: "اختبار",
      questionOf: "السؤال",
      validate: "تحقق",
      nextQuestion: "السؤال التالي",
      seeResults: "عرض النتائج",
      correct: "إجابة صحيحة!",
      incorrect: "ليس تماماً…",
      explanation: "الشرح",
      backToLesson: "راجع الحصة",
      results: "النتائج",
      yourScore: "نتيجتك",
      replay: "أعد المحاولة",
      exitTitle: "مغادرة الاختبار؟",
      exitBody: "لن يتم حفظ تقدمك في هذا الاختبار.",
      exitConfirm: "مغادرة",
      exitCancel: "متابعة الاختبار",
      reviewAnswers: "مراجعة الأسئلة",
      noQuiz: "لا اختبار لهذا الفصل.",
      startQuiz: "ابدأ الاختبار",
      perfect: "بدون أخطاء، مذهل!",
      goodJob: "أحسنت، واصل هكذا!",
      keepGoing: "راجع الحصة وحاول مجدداً.",
    },
    onboarding: {
      step: "الخطوة",
      classTitle: "في أي صف أنت؟",
      classSubtitle: "نكيّف الدروس مع برنامجك.",
      subjectsTitle: "ما المواد التي تهمك؟",
      subjectsSubtitle: "يمكنك اختيار أكثر من مادة.",
      goalTitle: "هدفك الأسبوعي؟",
      goalSubtitle: "الإيقاع المنتظم أفضل من الماراثون.",
      goalLight: "خفيف",
      goalLightDesc: "حصتان / أسبوع",
      goalRegular: "منتظم",
      goalRegularDesc: "4 حصص / أسبوع",
      goalIntense: "مكثف",
      goalIntenseDesc: "7 حصص / أسبوع",
      reminders: "التذكيرات",
      remindersDesc: "تذكير صغير للحفاظ على الإيقاع.",
      start: "هيا بنا!",
      welcomeToast: "مرحباً بك في العيايدة! مساحتك جاهزة.",
      lessonsPerWeek: "حصص / أسبوع",
    },
    dashboard: {
      greeting: "أهلاً",
      streakDays: "أيام متتالية",
      resume: "استأنف",
      resumeSubtitle: "استأنف من حيث توقفت",
      weeklyGoal: "هدف هذا الأسبوع",
      lessonsThisWeek: "حصص هذا الأسبوع",
      subjectProgress: "حسب المادة",
      recommended: "مقترح لك",
      weeklyActivity: "نشاط الأسبوع",
      streakTitle: "السلسلة الحالية",
      streakSubtitle: "عُد كل يوم للحفاظ على سلسلتك.",
      noActivity: "لا نشاط بعد.",
      exploreCatalog: "استكشف الفهرس",
      startACourse: "ابدأ درساً لترى تقدمك هنا.",
    },
    catalog: {
      title: "الفهرس",
      filters: "التصفية",
      subject: "المادة",
      levelLabel: "المستوى",
      allLevels: "الكل",
      duration: "المدة",
      durationShort: "أقل من 5 س",
      durationMedium: "5 إلى 10 س",
      durationLong: "أكثر من 10 س",
      rating: "التقييم",
      ratingMin: "فما فوق",
      resultsCount: "نتيجة",
      clearFilters: "مسح التصفية",
      showResults: "عرض النتائج",
      noResultsTitle: "لا درس يطابق بحثك",
      noResultsBody: "جرّب توسيع التصفية أو البحث عن شيء آخر.",
      searchPlaceholder: "ابحث عن درس…",
    },
    myCourses: {
      title: "دروسي",
      inProgress: "قيد التقدم",
      completedTab: "مكتملة",
      resume: "استأنف",
      emptyInProgressTitle: "لا درس قيد التقدم",
      emptyInProgressBody: "سجّل في درس لتجده هنا.",
      emptyCompletedTitle: "لا درس مكتمل",
      emptyCompletedBody: "أكمل كل حصص درس ما وسيظهر هنا.",
      browseCatalog: "تصفّح الفهرس",
      lessonsDone: "حصة مكتملة",
    },
    profile: {
      title: "الملف والإعدادات",
      account: "الحساب",
      language: "اللغة",
      theme: "المظهر",
      themeLight: "فاتح",
      themeDark: "داكن",
      themeSystem: "النظام",
      notifications: "الإشعارات",
      notificationsDesc: "تذكيرات الهدف ومستجدات الدروس المتابَعة.",
      weeklyGoalSetting: "الهدف الأسبوعي",
      weeklyGoalDesc: "عدد الحصص المستهدفة كل أسبوع.",
      password: "كلمة المرور",
      changePassword: "تغيير كلمة المرور",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      savedToast: "تم حفظ الإعدادات",
      memberSince: "عضو منذ",
      preferences: "التفضيلات",
      security: "الأمان",
    },
    teacher: {
      coursesBy: "دروس",
      students: "طلاب",
      rating: "متوسط التقييم",
      courses: "دروس",
      follow: "متابعة",
      following: "متابَع ✓",
      about: "حول",
    },
    parent: {
      title: "مساحة الوالدين",
      subtitle: "عرض للقراءة فقط لنشاط طفلك.",
      weeklyActivity: "هذا الأسبوع",
      lessonsCompleted: "حصة مكتملة",
      timeSpent: "وقت الدراسة",
      bySubject: "حسب المادة",
      recentActivity: "النشاط الأخير",
      summaryTitle: "باختصار",
      noActivityYet: "لا نشاط بعد هذا الأسبوع.",
      completedLesson: "أكمل(ت) الحصة",
      passedQuiz: "نجح(ت) في اختبار",
      enrolledIn: "سجّل(ت) في",
    },
    states: {
      notFoundTitle: "هذه الصفحة تغيّبت عن الدرس",
      notFoundBody: "لم نجد ما تبحث عنه. ربما تغيّر عنوانها.",
      notFoundCta: "العودة للرئيسية",
      offlineBanner: "أنت غير متصل — بعض الميزات محدودة.",
      offlineDocsHint: "الوثائق المحمّلة تبقى متاحة.",
      errorTitle: "حدث خطأ ما",
      errorBody: "وقع خطأ غير متوقع. حاول مجدداً بعد قليل.",
      errorRetry: "إعادة المحاولة",
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
    grades: {
      sixieme: "الأولى متوسط",
      cinquieme: "الثانية متوسط",
      quatrieme: "الثالثة متوسط",
      troisieme: "الرابعة متوسط",
      seconde: "الأولى ثانوي",
      premiere: "الثانية ثانوي",
      terminale: "الثالثة ثانوي",
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
      invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      missingFields: "يرجى ملء جميع الحقول",
      emailTaken: "هذا البريد الإلكتروني مستخدم بالفعل",
      weakPassword: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
      passwordMismatch: "كلمتا المرور غير متطابقتين",
      signupSuccess: "تم إنشاء الحساب بنجاح!",
      welcome: "مرحباً",
      logout: "تسجيل الخروج",
      loginToAccess: "سجل الدخول للوصول إلى الدروس",
      iAmStudent: "أنا تلميذ",
      iAmStudentDesc: "أريد متابعة الدروس والتقدم.",
      iAmParent: "أنا وليّ أمر",
      iAmParentDesc: "أريد متابعة تقدم طفلي.",
      strengthWeak: "ضعيفة",
      strengthMedium: "متوسطة",
      strengthStrong: "قوية",
      testimonial: "« الرسوم البيانية جعلتني أفهم الميل أخيراً. ملفات التمارين مفيدة جداً قبل الفرض. »",
      testimonialAuthor: "لينا، الرابعة متوسط",
      signInTitle: "سعداء بعودتك",
      signUpTitle: "أنشئ حسابك",
      whoAreYou: "من أنت؟",
    },
    footer: {
      about: "حول",
      contact: "اتصل بنا",
      terms: "الشروط",
      privacy: "الخصوصية",
      tagline: "منصة التعلم للنجاح",
    },
    certificate: {
      title: "شهادة إتمام",
      presentedTo: "مُمنوحة إلى",
      completionStatement: "أتمّ بنجاح دورة",
      instructor: "الأستاذ",
      issuedOn: "تاريخ الإصدار",
      print: "طباعة / تحميل كملف PDF",
      back: "العودة إلى الدورة",
      viewCertificate: "عرض الشهادة",
      notCompletedTitle: "الشهادة غير متوفرة",
      notCompletedBody: "أنهِ جميع حصص هذه الدورة لفتح شهادتك.",
      goToCourse: "الذهاب إلى الدورة",
    },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}

export type { TranslationKeys };
