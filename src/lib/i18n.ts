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
    admin: string;
    studio: string;
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
  mastery: {
    title: string;
    overall: string;
    decouvert: string;
    entraine: string;
    maitrise: string;
    notStarted: string;
  };
  live: {
    joinLive: string;
    scheduledFor: string;
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
    previewPdf: string;
    hidePreview: string;
    exercisesTitle: string;
    exercisesDone: string;
  };
  video: {
    play: string;
    pause: string;
    speed: string;
    quality: string;
    automatic: string;
    captions: string;
    captionsOn: string;
    captionsOff: string;
    fullscreen: string;
    shortcuts: string;
    transcript: string;
    transcriptLoading: string;
    transcriptUnavailableTitle: string;
    transcriptUnavailableBody: string;
    highlightAsNote: string;
  };
  notes: {
    title: string;
    subtitle: string;
    allCourses: string;
    allChapters: string;
    courseFilter: string;
    chapterFilter: string;
    emptyTitle: string;
    emptyBody: string;
    emptyAction: string;
    openNote: string;
    quoteLabel: string;
    fromTranscript: string;
    viewAll: string;
  };
  qa: {
    questions: string;
    askQuestion: string;
    questionPlaceholder: string;
    publishQuestion: string;
    firstQuestion: string;
    reply: string;
    replyPlaceholder: string;
    publishReply: string;
    acceptedAnswer: string;
    acceptAnswer: string;
    teacher: string;
    unansweredOnly: string;
    loadMore: string;
    loading: string;
    loadError: string;
    retry: string;
    noUnanswered: string;
    charactersRemaining: string;
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
    lessonResultsTitle: string;
    inCourse: string;
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
    passwordChangedToast: string;
    passwordChangedOthersToast: string;
    savedToast: string;
    memberSince: string;
    preferences: string;
    security: string;
  };
  dataSaver: {
    title: string;
    description: string;
    active: string;
    installTitle: string;
    installDescription: string;
    install: string;
    dismiss: string;
  };
  devices: {
    title: string;
    description: string;
    current: string;
    unknownDevice: string;
    unknownIp: string;
    lastSeen: string;
    connectedAt: string;
    disconnect: string;
    disconnectedToast: string;
    loadError: string;
    emptyTitle: string;
    emptyBody: string;
    refresh: string;
  };
  admin: {
    title: string;
    subtitle: string;
    createStudent: string;
    studentName: string;
    studentEmail: string;
    course: string;
    amount: string;
    amountHint: string;
    createAndRecord: string;
    pendingPayments: string;
    noPendingTitle: string;
    noPendingBody: string;
    markPaid: string;
    studentCreatedToast: string;
    paymentCreatedToast: string;
    paymentPaidToast: string;
    activationMailWarning: string;
    emailTaken: string;
    invalidForm: string;
    requestFailed: string;
    cash: string;
    pending: string;
    activationSubject: string;
    activationText: string;
  };
  studio: {
    title: string;
    subtitle: string;
    myCourses: string;
    newCourse: string;
    noCoursesTitle: string;
    noCoursesBody: string;
    courseIdLabel: string;
    courseIdHint: string;
    subject: string;
    level: string;
    levelMiddle: string;
    levelHigh: string;
    thumbnail: string;
    instructorName: string;
    instructorAvatar: string;
    instructorBio: string;
    courseTitle: string;
    courseDescription: string;
    save: string;
    create: string;
    archive: string;
    archiveTitle: string;
    archiveBody: string;
    cancel: string;
    confirm: string;
    chapters: string;
    addChapter: string;
    chapterTitleLabel: string;
    lessons: string;
    addLesson: string;
    lessonTitleLabel: string;
    duration: string;
    videoUrl: string;
    lessonDescription: string;
    position: string;
    liveSection: string;
    liveUrl: string;
    liveUrlHint: string;
    liveSchedule: string;
    deleteChapter: string;
    deleteChapterBody: string;
    deleteLesson: string;
    deleteLessonBody: string;
    savedToast: string;
    createdToast: string;
    deletedToast: string;
    archivedToast: string;
    requestFailed: string;
    invalidForm: string;
    idLocked: string;
    noChapters: string;
    subjectMath: string;
    subjectPhysics: string;
    subjectBiology: string;
    emptyEditorTitle: string;
    emptyEditorBody: string;
    archivedBadge: string;
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
    magicLink: string;
    magicLinkSent: string;
    magicLinkError: string;
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
  review: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyBody: string;
    doneTitle: string;
    doneBody: string;
    reviewAgain: string;
    backToDashboard: string;
    dashboardCardTitle: string;
    dashboardCardBody: string;
  };
  examPrep: {
    title: string;
    subtitle: string;
    chooseLevelTitle: string;
    middleExam: string;
    highExam: string;
    startExam: string;
    timeLeft: string;
    submitExam: string;
    noQuestionsTitle: string;
    noQuestionsBody: string;
    resultsTitle: string;
    timeUp: string;
    backToDashboard: string;
    retry: string;
    dashboardCardTitle: string;
    dashboardCardBody: string;
  };
  legal: {
    lastUpdated: string;
    backToHome: string;
    terms: {
      pageTitle: string;
      intro: string;
      s1Title: string;
      s1Body: string;
      s2Title: string;
      s2Body: string;
      s3Title: string;
      s3Body: string;
      s4Title: string;
      s4Body: string;
      s5Title: string;
      s5Body: string;
      s6Title: string;
      s6Body: string;
      s7Title: string;
      s7Body: string;
      s8Title: string;
      s8Body: string;
      s9Title: string;
      s9Body: string;
    };
    privacy: {
      pageTitle: string;
      intro: string;
      s1Title: string;
      s1Body: string;
      s2Title: string;
      s2Body: string;
      s3Title: string;
      s3Body: string;
      s4Title: string;
      s4Body: string;
      s5Title: string;
      s5Body: string;
      s6Title: string;
      s6Body: string;
      s7Title: string;
      s7Body: string;
      s8Title: string;
      s8Body: string;
      s9Title: string;
      s9Body: string;
      s10Title: string;
      s10Body: string;
    };
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
      admin: "Administration",
      studio: "Espace prof",
      signIn: "Connexion",
      signUp: "Inscription",
    },
    admin: {
      title: "Administration",
      subtitle: "Crée les comptes élèves et confirme les paiements en espèces.",
      createStudent: "Nouveau compte élève",
      studentName: "Nom complet",
      studentEmail: "Adresse e-mail",
      course: "Cours",
      amount: "Montant (DA)",
      amountHint: "Le montant est enregistré en centimes.",
      createAndRecord: "Créer le compte et le paiement",
      pendingPayments: "Paiements en attente",
      noPendingTitle: "Aucun paiement en attente",
      noPendingBody: "Crée un compte élève avec un paiement pour le voir ici.",
      markPaid: "Marquer payé",
      studentCreatedToast: "Compte élève créé.",
      paymentCreatedToast: "Paiement en espèces enregistré.",
      paymentPaidToast: "Paiement confirmé et accès au cours accordé.",
      activationMailWarning: "L'accès est accordé, mais l'e-mail d'activation n'a pas pu être envoyé.",
      emailTaken: "Cette adresse e-mail est déjà utilisée.",
      invalidForm: "Vérifie le nom, l'adresse e-mail et le montant.",
      requestFailed: "L'opération a échoué. Réessaie.",
      cash: "Espèces",
      pending: "En attente",
      activationSubject: "Active ton compte Layaida",
      activationText: "Salam {name} !\n\nTon inscription est confirmée. Active ton compte avec ce lien valable 24 heures :\n{link}\n\nCe lien est personnel et à usage unique.\n\n— Layaida",
    },
    studio: {
      title: "Espace prof",
      subtitle: "Crée et modifie tes cours, chapitres et leçons dans les trois langues.",
      myCourses: "Mes cours",
      newCourse: "Nouveau cours",
      noCoursesTitle: "Aucun cours pour l'instant",
      noCoursesBody: "Crée ton premier cours pour commencer à publier des leçons.",
      courseIdLabel: "Identifiant",
      courseIdHint: "Minuscules et tirets, par exemple math-algebre-101. Non modifiable ensuite.",
      subject: "Matière",
      level: "Niveau",
      levelMiddle: "Collège",
      levelHigh: "Lycée",
      thumbnail: "Vignette (chemin)",
      instructorName: "Nom de l'enseignant",
      instructorAvatar: "Avatar (chemin)",
      instructorBio: "Biographie",
      courseTitle: "Titre du cours",
      courseDescription: "Description",
      save: "Enregistrer",
      create: "Créer",
      archive: "Archiver",
      archiveTitle: "Archiver ce cours ?",
      archiveBody: "Le cours disparaît de ta liste. Rien n'est supprimé définitivement.",
      cancel: "Annuler",
      confirm: "Confirmer",
      chapters: "Chapitres",
      addChapter: "Ajouter un chapitre",
      chapterTitleLabel: "Titre du chapitre",
      lessons: "Leçons",
      addLesson: "Ajouter une leçon",
      lessonTitleLabel: "Titre de la leçon",
      duration: "Durée",
      videoUrl: "URL de la vidéo",
      lessonDescription: "Description de la leçon",
      position: "Ordre",
      liveSection: "Session en direct",
      liveUrl: "Lien Google Meet",
      liveUrlHint: "Uniquement un lien meet.google.com. Visible seulement par les élèves inscrits.",
      liveSchedule: "Date et heure",
      deleteChapter: "Supprimer le chapitre",
      deleteChapterBody: "Le chapitre et ses leçons seront supprimés.",
      deleteLesson: "Supprimer la leçon",
      deleteLessonBody: "Cette leçon sera supprimée.",
      savedToast: "Modifications enregistrées.",
      createdToast: "Créé.",
      deletedToast: "Supprimé.",
      archivedToast: "Cours archivé.",
      requestFailed: "L'opération a échoué. Réessaie.",
      invalidForm: "Remplis les trois langues et les champs obligatoires.",
      idLocked: "Identifiant figé après création.",
      noChapters: "Aucun chapitre. Ajoute le premier.",
      subjectMath: "Mathématiques",
      subjectPhysics: "Physique",
      subjectBiology: "Biologie",
      emptyEditorTitle: "Choisis un cours",
      emptyEditorBody: "Sélectionne un cours à gauche ou crée-en un nouveau.",
      archivedBadge: "Archivé",
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
    mastery: {
      title: "Maîtrise",
      overall: "Maîtrise globale",
      decouvert: "Découvert",
      entraine: "Entraîné",
      maitrise: "Maîtrisé",
      notStarted: "Pas encore commencé",
    },
    live: {
      joinLive: "Rejoindre le live",
      scheduledFor: "Prévu le {date}",
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
      previewPdf: "Aperçu",
      hidePreview: "Masquer l'aperçu",
      exercisesTitle: "Exercices de la fiche",
      exercisesDone: "terminés",
    },
    video: {
      play: "Lire",
      pause: "Pause",
      speed: "Vitesse de lecture",
      quality: "Qualité vidéo",
      automatic: "Auto",
      captions: "Sous-titres",
      captionsOn: "Activer les sous-titres",
      captionsOff: "Désactiver les sous-titres",
      fullscreen: "Plein écran",
      shortcuts: "Commandes vidéo. Espace : lecture, J : reculer, L : avancer, F : plein écran",
      transcript: "Transcription",
      transcriptLoading: "Chargement de la transcription…",
      transcriptUnavailableTitle: "Transcription indisponible",
      transcriptUnavailableBody: "Cette vidéo ne fournit pas encore de transcription dans cette langue.",
      highlightAsNote: "Enregistrer ce passage dans mes notes",
    },
    notes: {
      title: "Mes notes",
      subtitle: "Retrouve tes notes de cours et reprends la vidéo au bon moment.",
      allCourses: "Tous les cours",
      allChapters: "Tous les chapitres",
      courseFilter: "Filtrer par cours",
      chapterFilter: "Filtrer par chapitre",
      emptyTitle: "Aucune note ici",
      emptyBody: "Ajoute une note pendant une leçon pour la retrouver sur cette page.",
      emptyAction: "Voir mes cours",
      openNote: "Ouvrir la note dans la leçon",
      quoteLabel: "Extrait de la transcription",
      fromTranscript: "Passage enregistré. Complète ta note si nécessaire.",
      viewAll: "Voir toutes mes notes",
    },
    qa: {
      questions: "Questions",
      askQuestion: "Poser une question",
      questionPlaceholder: "Que veux-tu clarifier dans cette leçon ?",
      publishQuestion: "Publier",
      firstQuestion: "Pose la première question sur cette leçon.",
      reply: "Répondre",
      replyPlaceholder: "Écris une réponse claire…",
      publishReply: "Publier la réponse",
      acceptedAnswer: "Réponse acceptée",
      acceptAnswer: "Accepter cette réponse",
      teacher: "Prof",
      unansweredOnly: "Sans réponse",
      loadMore: "Charger plus",
      loading: "Chargement des questions…",
      loadError: "Impossible de charger les questions.",
      retry: "Réessayer",
      noUnanswered: "Toutes les questions affichées ont une réponse.",
      charactersRemaining: "{count} caractères restants",
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
      lessonResultsTitle: "Leçons",
      inCourse: "Dans",
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
      passwordChangedToast: "Mot de passe modifié",
      passwordChangedOthersToast: "Mot de passe modifié. Tes autres appareils ont été déconnectés.",
      savedToast: "Réglages enregistrés",
      memberSince: "Membre depuis",
      preferences: "Préférences",
      security: "Sécurité",
    },
    dataSaver: {
      title: "Économie de données",
      description: "Limite les vidéos à 360p, allège les miniatures et désactive la lecture automatique.",
      active: "Mode économie de données",
      installTitle: "Installer Layaida",
      installDescription: "Ajoute Layaida à ton écran d’accueil pour y accéder plus vite.",
      install: "Installer",
      dismiss: "Plus tard",
    },
    devices: {
      title: "Appareils connectés",
      description: "Les sessions actuellement ouvertes sur ton compte.",
      current: "Cet appareil",
      unknownDevice: "Appareil inconnu",
      unknownIp: "Adresse IP inconnue",
      lastSeen: "Dernière activité",
      connectedAt: "Connecté le",
      disconnect: "Déconnecter",
      disconnectedToast: "Appareil déconnecté",
      loadError: "Impossible de charger les appareils.",
      emptyTitle: "Aucun appareil à afficher",
      emptyBody: "Actualise la liste pour vérifier tes sessions actives.",
      refresh: "Actualiser",
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
      magicLink: "Recevoir un lien de connexion",
      magicLinkSent: "Lien envoyé ! Vérifie ta boîte mail.",
      magicLinkError: "Impossible d'envoyer le lien pour le moment.",
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
    review: {
      title: "Réviser",
      subtitle: "Reprends les questions ratées, tous chapitres confondus.",
      emptyTitle: "Rien à réviser",
      emptyBody: "Toutes tes réponses de quiz sont correctes pour l'instant — bien joué !",
      doneTitle: "Session terminée",
      doneBody: "Tu as revu toutes les questions en attente.",
      reviewAgain: "Revoir les questions restantes",
      backToDashboard: "Retour au tableau de bord",
      dashboardCardTitle: "À réviser",
      dashboardCardBody: "question(s) de quiz à revoir",
    },
    examPrep: {
      title: "Examen blanc",
      subtitle: "Un examen chronométré à partir des quiz de tes chapitres, par niveau.",
      chooseLevelTitle: "Choisis un niveau",
      middleExam: "Brevet blanc (Collège)",
      highExam: "Bac blanc (Lycée)",
      startExam: "Commencer l'examen",
      timeLeft: "Temps restant",
      submitExam: "Terminer l'examen",
      noQuestionsTitle: "Aucune question disponible",
      noQuestionsBody: "Il n'y a pas encore de quiz pour ce niveau.",
      resultsTitle: "Résultats de l'examen",
      timeUp: "Temps écoulé ! Ton examen a été soumis automatiquement.",
      backToDashboard: "Retour au tableau de bord",
      retry: "Refaire un examen",
      dashboardCardTitle: "Examen blanc",
      dashboardCardBody: "Entraîne-toi en conditions chronométrées",
    },
    legal: {
      lastUpdated: "Dernière mise à jour : 30 août 2026",
      backToHome: "Retour à l'accueil",
      terms: {
        pageTitle: "Conditions générales d'utilisation",
        intro:
          "Les présentes conditions générales d'utilisation (CGU) régissent l'accès et l'utilisation de la plateforme Layaida, un service d'apprentissage en ligne destiné aux élèves de collège et de lycée ainsi qu'à leurs parents. En créant un compte ou en utilisant le site, vous acceptez ces conditions.",
        s1Title: "1. Objet du service",
        s1Body:
          "Layaida propose des cours en ligne (vidéos, documents, quiz) organisés par matière, chapitre et leçon, ainsi qu'un suivi de progression, des certificats de fin de cours et un espace de questions-réponses avec les enseignants. Le service est accessible en français, en anglais et en arabe.",
        s2Title: "2. Comptes utilisateurs",
        s2Body:
          "L'accès à la majorité des fonctionnalités nécessite la création d'un compte (élève, parent, enseignant ou administrateur). Un compte peut être créé directement par l'utilisateur via le formulaire d'inscription, ou créé par un membre du personnel de Layaida pour le compte d'un élève, notamment dans le cadre d'une inscription payante gérée manuellement. Vous êtes responsable de la confidentialité de votre mot de passe et de toute activité effectuée depuis votre compte.",
        s3Title: "3. Élèves mineurs",
        s3Body:
          "Layaida s'adresse en priorité à des élèves mineurs. Le formulaire d'inscription en ligne ne demande actuellement ni date de naissance ni pièce justificative et ne vérifie donc pas l'âge de l'utilisateur. Il appartient au parent ou au représentant légal d'un mineur de s'assurer que celui-ci n'utilise le service qu'avec son autorisation, et de superviser son utilisation. Lorsqu'un compte est créé par le personnel de Layaida à la suite d'une inscription encadrée (paiement, établissement partenaire), l'accord du parent ou représentant légal est recueilli en amont, en dehors du site, au moment de cette inscription.",
        s4Title: "4. Contenu et propriété intellectuelle",
        s4Body:
          "Les cours, textes, vidéos, documents et éléments graphiques du site sont la propriété de Layaida ou de ses partenaires enseignants, sauf mention contraire. Vous pouvez consulter et télécharger les contenus mis à votre disposition dans le cadre de votre usage personnel et non commercial. Toute reproduction, diffusion ou revente sans autorisation est interdite.",
        s5Title: "5. Paiement",
        s5Body:
          "Certains cours peuvent faire l'objet d'un accès payant. Les modalités de paiement en vigueur au moment de l'inscription vous sont communiquées directement ; à ce jour, le règlement s'effectue de façon manuelle (hors ligne) et l'accès au cours est activé par un membre du personnel une fois le paiement constaté. Aucune donnée de carte bancaire n'est saisie ou stockée sur le site.",
        s6Title: "6. Disponibilité du service",
        s6Body:
          "Layaida est un service en développement continu ; certaines fonctionnalités ou certains contenus peuvent évoluer, être ajoutés ou retirés sans préavis. Le service est fourni « en l'état », sans garantie de disponibilité permanente ; des interruptions ponctuelles pour maintenance sont possibles.",
        s7Title: "7. Résiliation",
        s7Body:
          "Vous pouvez cesser d'utiliser le service à tout moment. Layaida peut suspendre ou supprimer un compte en cas d'usage abusif, frauduleux ou contraire aux présentes conditions. Vous pouvez demander la clôture de votre compte et la suppression de vos données en nous contactant (voir la politique de confidentialité).",
        s8Title: "8. Responsabilité",
        s8Body:
          "Layaida s'efforce de fournir un contenu pédagogique fiable mais ne garantit pas l'absence d'erreur dans les cours ou exercices. L'utilisation du service se fait sous votre responsabilité ; Layaida ne saurait être tenu responsable des dommages indirects résultant de son utilisation.",
        s9Title: "9. Droit applicable et contact",
        s9Body:
          "Les présentes CGU sont principalement destinées à un usage en Algérie et rédigées en conséquence ; les utilisateurs résidant dans l'Union européenne bénéficient par ailleurs des droits décrits dans notre politique de confidentialité. Pour toute question relative à ces conditions, contactez-nous via la page Contact du site.",
      },
      privacy: {
        pageTitle: "Politique de confidentialité",
        intro:
          "Cette politique explique quelles données Layaida collecte, pourquoi, et comment elles sont protégées. Layaida est un projet indépendant, auto-hébergé, sans lien avec un groupe publicitaire ou un tiers commercial.",
        s1Title: "1. Responsable du traitement",
        s1Body:
          "Layaida est édité et exploité à titre indépendant. Pour toute question relative à vos données personnelles, vous pouvez nous contacter via la page Contact du site.",
        s2Title: "2. Données que nous collectons",
        s2Body:
          "À l'inscription : votre nom, votre adresse e-mail et un mot de passe (haché, jamais stocké en clair). En cours d'utilisation : votre progression pédagogique (cours suivis, leçons terminées, position de lecture des vidéos, réponses aux quiz, documents téléchargés, notes personnelles). Si vous posez une question à un enseignant : le contenu de cette question et de sa réponse. En cas d'inscription payante : les informations de paiement manuel enregistrées par le personnel (montant, moyen, statut) — aucune donnée bancaire n'est saisie sur le site. Nous ne collectons ni date de naissance ni donnée de santé.",
        s3Title: "3. Pourquoi nous les utilisons",
        s3Body:
          "Ces données sont utilisées uniquement pour faire fonctionner le service : créer et sécuriser votre compte, afficher et sauvegarder votre progression, générer vos certificats, gérer les questions-réponses et, le cas échéant, suivre une inscription payante. Elles ne sont jamais utilisées à des fins publicitaires.",
        s4Title: "4. Élèves mineurs et consentement parental",
        s4Body:
          "Layaida est conçu pour des élèves mineurs. Nous ne mettons pas en œuvre aujourd'hui de mécanisme technique de recueil ou de vérification du consentement parental au moment de l'inscription en ligne ; c'est au parent ou représentant légal qu'il revient d'autoriser et de superviser l'utilisation du service par l'enfant. Lorsqu'un compte est créé par notre personnel dans le cadre d'une inscription encadrée (paiement, établissement), l'accord du parent est recueilli en amont, hors du site. Un parent souhaitant faire vérifier, modifier ou supprimer les données de son enfant peut nous contacter à tout moment.",
        s5Title: "5. Cookies et traceurs",
        s5Body:
          "Layaida n'utilise aucun outil d'analyse d'audience (pas de Google Analytics ni équivalent), aucun cookie publicitaire et aucun cookie tiers. Le seul cookie déposé est un cookie de session strictement nécessaire (layaida_session), qui vous garde connecté pendant 30 jours ; il ne sert pas à vous suivre sur d'autres sites et ne nécessite pas de bandeau de consentement, car il est strictement nécessaire au fonctionnement du service.",
        s6Title: "6. Sécurité",
        s6Body:
          "Votre mot de passe est haché (scrypt) et n'est jamais stocké en clair. Les sessions utilisent un cookie sécurisé, accessible uniquement au serveur (httpOnly). Les tentatives de connexion sont limitées en nombre pour limiter les attaques automatisées, et les échanges avec le site sont chiffrés (HTTPS).",
        s7Title: "7. Durée de conservation",
        s7Body:
          "Vos données sont conservées tant que votre compte est actif. Il n'existe pas aujourd'hui de suppression automatique après une durée d'inactivité ; vous pouvez demander la suppression de votre compte et de vos données à tout moment en nous contactant, la demande étant alors traitée manuellement.",
        s8Title: "8. Partage avec des tiers",
        s8Body:
          "Vos données sont hébergées sur une infrastructure serveur exploitée par l'éditeur de Layaida (auto-hébergement), et ne sont ni vendues ni transmises à des tiers à des fins commerciales. Les vidéos de cours sont actuellement hébergées sur YouTube (lecture intégrée) ; leur visionnage peut donc impliquer un échange technique avec YouTube/Google selon les conditions de ce service, indépendantes de Layaida.",
        s9Title: "9. Vos droits",
        s9Body:
          "Si vous résidez dans l'Union européenne, le règlement général sur la protection des données (RGPD) vous donne le droit d'accéder à vos données, de les faire rectifier ou supprimer, de vous opposer à leur traitement ou d'en demander la portabilité. Ces mêmes possibilités (accès, rectification, suppression) sont offertes à tous les utilisateurs de Layaida, quel que soit leur pays de résidence, sur simple demande.",
        s10Title: "10. Contact",
        s10Body:
          "Pour exercer ces droits ou pour toute question sur cette politique, contactez-nous via la page Contact du site.",
      },
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
      admin: "Admin",
      studio: "Teacher studio",
      signIn: "Sign in",
      signUp: "Sign up",
    },
    admin: {
      title: "Administration",
      subtitle: "Create student accounts and confirm cash payments.",
      createStudent: "New student account",
      studentName: "Full name",
      studentEmail: "Email address",
      course: "Course",
      amount: "Amount (DZD)",
      amountHint: "The amount is stored in centimes.",
      createAndRecord: "Create account and payment",
      pendingPayments: "Pending payments",
      noPendingTitle: "No pending payments",
      noPendingBody: "Create a student account with a payment to see it here.",
      markPaid: "Mark paid",
      studentCreatedToast: "Student account created.",
      paymentCreatedToast: "Cash payment recorded.",
      paymentPaidToast: "Payment confirmed and course access granted.",
      activationMailWarning: "Access was granted, but the activation email could not be sent.",
      emailTaken: "This email address is already in use.",
      invalidForm: "Check the name, email address, and amount.",
      requestFailed: "The operation failed. Try again.",
      cash: "Cash",
      pending: "Pending",
      activationSubject: "Activate your Layaida account",
      activationText: "Salam {name}!\n\nYour registration is confirmed. Activate your account with this link, valid for 24 hours:\n{link}\n\nThis link is personal and can only be used once.\n\n— Layaida",
    },
    studio: {
      title: "Teacher studio",
      subtitle: "Create and edit your courses, chapters and lessons in all three languages.",
      myCourses: "My courses",
      newCourse: "New course",
      noCoursesTitle: "No courses yet",
      noCoursesBody: "Create your first course to start publishing lessons.",
      courseIdLabel: "Identifier",
      courseIdHint: "Lowercase and dashes, e.g. math-algebra-101. Cannot be changed later.",
      subject: "Subject",
      level: "Level",
      levelMiddle: "Middle school",
      levelHigh: "High school",
      thumbnail: "Thumbnail (path)",
      instructorName: "Instructor name",
      instructorAvatar: "Avatar (path)",
      instructorBio: "Biography",
      courseTitle: "Course title",
      courseDescription: "Description",
      save: "Save",
      create: "Create",
      archive: "Archive",
      archiveTitle: "Archive this course?",
      archiveBody: "The course leaves your list. Nothing is permanently deleted.",
      cancel: "Cancel",
      confirm: "Confirm",
      chapters: "Chapters",
      addChapter: "Add a chapter",
      chapterTitleLabel: "Chapter title",
      lessons: "Lessons",
      addLesson: "Add a lesson",
      lessonTitleLabel: "Lesson title",
      duration: "Duration",
      videoUrl: "Video URL",
      lessonDescription: "Lesson description",
      position: "Order",
      liveSection: "Live session",
      liveUrl: "Google Meet link",
      liveUrlHint: "meet.google.com links only. Visible to enrolled students only.",
      liveSchedule: "Date and time",
      deleteChapter: "Delete chapter",
      deleteChapterBody: "The chapter and its lessons will be deleted.",
      deleteLesson: "Delete lesson",
      deleteLessonBody: "This lesson will be deleted.",
      savedToast: "Changes saved.",
      createdToast: "Created.",
      deletedToast: "Deleted.",
      archivedToast: "Course archived.",
      requestFailed: "The request failed. Try again.",
      invalidForm: "Fill in all three languages and the required fields.",
      idLocked: "Identifier is fixed after creation.",
      noChapters: "No chapters yet. Add the first one.",
      subjectMath: "Mathematics",
      subjectPhysics: "Physics",
      subjectBiology: "Biology",
      emptyEditorTitle: "Pick a course",
      emptyEditorBody: "Select a course on the left or create a new one.",
      archivedBadge: "Archived",
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
    mastery: {
      title: "Mastery",
      overall: "Overall mastery",
      decouvert: "Discovered",
      entraine: "Trained",
      maitrise: "Mastered",
      notStarted: "Not started yet",
    },
    live: {
      joinLive: "Join live session",
      scheduledFor: "Scheduled for {date}",
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
      previewPdf: "Preview",
      hidePreview: "Hide preview",
      exercisesTitle: "Worksheet exercises",
      exercisesDone: "done",
    },
    video: {
      play: "Play",
      pause: "Pause",
      speed: "Playback speed",
      quality: "Video quality",
      automatic: "Auto",
      captions: "Captions",
      captionsOn: "Turn captions on",
      captionsOff: "Turn captions off",
      fullscreen: "Full screen",
      shortcuts: "Video controls. Space: play, J: rewind, L: forward, F: full screen",
      transcript: "Transcript",
      transcriptLoading: "Loading transcript…",
      transcriptUnavailableTitle: "Transcript unavailable",
      transcriptUnavailableBody: "This video does not yet provide a transcript in this language.",
      highlightAsNote: "Save this passage to my notes",
    },
    notes: {
      title: "My notes",
      subtitle: "Find your course notes and resume the video at the right moment.",
      allCourses: "All courses",
      allChapters: "All chapters",
      courseFilter: "Filter by course",
      chapterFilter: "Filter by chapter",
      emptyTitle: "No notes here",
      emptyBody: "Add a note during a lesson to find it on this page.",
      emptyAction: "View my courses",
      openNote: "Open note in lesson",
      quoteLabel: "Transcript excerpt",
      fromTranscript: "Passage saved. Add your own note when ready.",
      viewAll: "View all my notes",
    },
    qa: {
      questions: "Questions",
      askQuestion: "Ask a question",
      questionPlaceholder: "What would you like clarified in this lesson?",
      publishQuestion: "Post",
      firstQuestion: "Ask the first question about this lesson.",
      reply: "Reply",
      replyPlaceholder: "Write a clear answer…",
      publishReply: "Post answer",
      acceptedAnswer: "Accepted answer",
      acceptAnswer: "Accept this answer",
      teacher: "Teacher",
      unansweredOnly: "Unanswered",
      loadMore: "Load more",
      loading: "Loading questions…",
      loadError: "Questions could not be loaded.",
      retry: "Try again",
      noUnanswered: "Every question shown has an answer.",
      charactersRemaining: "{count} characters remaining",
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
      lessonResultsTitle: "Lessons",
      inCourse: "In",
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
      passwordChangedToast: "Password changed",
      passwordChangedOthersToast: "Password changed. Your other devices have been signed out.",
      savedToast: "Settings saved",
      memberSince: "Member since",
      preferences: "Preferences",
      security: "Security",
    },
    dataSaver: {
      title: "Data saver",
      description: "Limits videos to 360p, uses lighter thumbnails, and turns off autoplay.",
      active: "Data saver mode",
      installTitle: "Install Layaida",
      installDescription: "Add Layaida to your home screen for quicker access.",
      install: "Install",
      dismiss: "Not now",
    },
    devices: {
      title: "Connected devices",
      description: "Sessions currently open on your account.",
      current: "This device",
      unknownDevice: "Unknown device",
      unknownIp: "Unknown IP address",
      lastSeen: "Last active",
      connectedAt: "Connected on",
      disconnect: "Sign out",
      disconnectedToast: "Device signed out",
      loadError: "Unable to load devices.",
      emptyTitle: "No devices to show",
      emptyBody: "Refresh the list to check your active sessions.",
      refresh: "Refresh",
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
      magicLink: "Email me a login link",
      magicLinkSent: "Link sent! Check your inbox.",
      magicLinkError: "Could not send the link right now.",
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
    review: {
      title: "Review",
      subtitle: "Retry the questions you got wrong, across every chapter.",
      emptyTitle: "Nothing to review",
      emptyBody: "All your quiz answers are correct for now — nice work!",
      doneTitle: "Session complete",
      doneBody: "You've reviewed every pending question.",
      reviewAgain: "Review remaining questions",
      backToDashboard: "Back to dashboard",
      dashboardCardTitle: "To review",
      dashboardCardBody: "quiz question(s) to revisit",
    },
    examPrep: {
      title: "Mock exam",
      subtitle: "A timed exam assembled from your chapter quizzes, by grade level.",
      chooseLevelTitle: "Choose a level",
      middleExam: "Mock brevet (Middle school)",
      highExam: "Mock bac (High school)",
      startExam: "Start exam",
      timeLeft: "Time left",
      submitExam: "Submit exam",
      noQuestionsTitle: "No questions available",
      noQuestionsBody: "There are no quizzes for this level yet.",
      resultsTitle: "Exam results",
      timeUp: "Time's up! Your exam was submitted automatically.",
      backToDashboard: "Back to dashboard",
      retry: "Take another exam",
      dashboardCardTitle: "Mock exam",
      dashboardCardBody: "Practice under timed conditions",
    },
    legal: {
      lastUpdated: "Last updated: August 30, 2026",
      backToHome: "Back to home",
      terms: {
        pageTitle: "Terms of Service",
        intro:
          "These Terms of Service govern access to and use of the Layaida platform, an online learning service for middle- and high-school students and their parents. By creating an account or using the site, you accept these terms.",
        s1Title: "1. What Layaida is",
        s1Body:
          "Layaida offers online courses (videos, documents, quizzes) organized by subject, chapter and lesson, along with progress tracking, completion certificates, and a question-and-answer space with teachers. The service is available in French, English and Arabic.",
        s2Title: "2. Accounts",
        s2Body:
          "Most features require an account (student, parent, teacher or admin). An account can be created directly by the user through the sign-up form, or created by a Layaida staff member on a student's behalf, in particular as part of a manually managed paid enrollment. You are responsible for keeping your password confidential and for any activity carried out from your account.",
        s3Title: "3. Minor students",
        s3Body:
          "Layaida is aimed primarily at minors. The online sign-up form does not currently ask for a date of birth or any proof of age, and therefore does not verify a user's age. It is the parent's or legal guardian's responsibility to ensure a minor only uses the service with their permission, and to supervise that use. Where an account is created by Layaida staff as part of a supervised enrollment (payment, partner school), the parent's or legal guardian's agreement is obtained beforehand, outside the site, at the time of that enrollment.",
        s4Title: "4. Content and intellectual property",
        s4Body:
          "Courses, text, videos, documents and graphic elements on the site belong to Layaida or its teaching partners, unless stated otherwise. You may view and download content made available to you for your personal, non-commercial use. Reproducing, redistributing or reselling it without permission is prohibited.",
        s5Title: "5. Payment",
        s5Body:
          "Some courses may require paid access. The payment terms in effect at the time of enrollment are communicated to you directly; as of today, payment is handled manually (offline) and course access is activated by a staff member once payment is confirmed. No card payment data is entered or stored on the site.",
        s6Title: "6. Service availability",
        s6Body:
          "Layaida is under continuous development; features or content may change, be added, or be removed without notice. The service is provided \"as is\", with no guarantee of permanent availability; occasional interruptions for maintenance are possible.",
        s7Title: "7. Termination",
        s7Body:
          "You may stop using the service at any time. Layaida may suspend or delete an account in case of abusive or fraudulent use, or use contrary to these terms. You may request the closure of your account and the deletion of your data by contacting us (see the privacy policy).",
        s8Title: "8. Liability",
        s8Body:
          "Layaida strives to provide reliable educational content but does not guarantee that courses or exercises are free of errors. Use of the service is at your own risk; Layaida is not liable for indirect damages resulting from its use.",
        s9Title: "9. Governing law and contact",
        s9Body:
          "These terms are primarily intended for use in Algeria and are written accordingly; users residing in the European Union also benefit from the rights described in our privacy policy. For any question about these terms, contact us via the site's Contact page.",
      },
      privacy: {
        pageTitle: "Privacy Policy",
        intro:
          "This policy explains what data Layaida collects, why, and how it is protected. Layaida is an independent, self-hosted project with no ties to an advertising group or commercial third party.",
        s1Title: "1. Data controller",
        s1Body:
          "Layaida is published and operated independently. For any question about your personal data, you can contact us via the site's Contact page.",
        s2Title: "2. Data we collect",
        s2Body:
          "At sign-up: your name, email address, and a password (hashed, never stored in plain text). While using the service: your learning progress (courses followed, lessons completed, video playback position, quiz answers, downloaded documents, personal notes). If you ask a teacher a question: the content of that question and its answer. For a paid enrollment: the manual payment information recorded by staff (amount, method, status) — no card data is entered on the site. We do not collect date of birth or health data.",
        s3Title: "3. Why we use it",
        s3Body:
          "This data is used only to run the service: creating and securing your account, showing and saving your progress, generating your certificates, running the question-and-answer feature and, where relevant, tracking a paid enrollment. It is never used for advertising purposes.",
        s4Title: "4. Minor students and parental consent",
        s4Body:
          "Layaida is designed for minor students. We do not currently implement a technical mechanism to collect or verify parental consent at online sign-up; it is the parent's or legal guardian's responsibility to authorize and supervise their child's use of the service. Where an account is created by our staff as part of a supervised enrollment (payment, school), the parent's agreement is obtained beforehand, outside the site. A parent who wants to review, correct or delete their child's data can contact us at any time.",
        s5Title: "5. Cookies and trackers",
        s5Body:
          "Layaida uses no audience-analytics tool (no Google Analytics or equivalent), no advertising cookie, and no third-party cookie. The only cookie set is a strictly necessary session cookie (layaida_session) that keeps you signed in for 30 days; it is not used to track you across other sites and does not require a consent banner, since it is strictly necessary for the service to work.",
        s6Title: "6. Security",
        s6Body:
          "Your password is hashed (scrypt) and never stored in plain text. Sessions use a secure cookie accessible only to the server (httpOnly). Login attempts are rate-limited to reduce automated attacks, and traffic to the site is encrypted (HTTPS).",
        s7Title: "7. Data retention",
        s7Body:
          "Your data is kept for as long as your account is active. There is currently no automatic deletion after a period of inactivity; you can request deletion of your account and data at any time by contacting us, and the request is then handled manually.",
        s8Title: "8. Sharing with third parties",
        s8Body:
          "Your data is hosted on server infrastructure operated by Layaida's publisher (self-hosted), and is neither sold nor passed to third parties for commercial purposes. Course videos are currently hosted on YouTube (embedded playback); watching them may therefore involve a technical exchange with YouTube/Google under that service's own terms, independent of Layaida.",
        s9Title: "9. Your rights",
        s9Body:
          "If you reside in the European Union, the General Data Protection Regulation (GDPR) gives you the right to access your data, have it corrected or deleted, object to its processing, or request its portability. The same options (access, correction, deletion) are offered to all Layaida users regardless of country of residence, on simple request.",
        s10Title: "10. Contact",
        s10Body:
          "To exercise these rights or for any question about this policy, contact us via the site's Contact page.",
      },
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
      admin: "الإدارة",
      studio: "فضاء الأستاذ",
      signIn: "تسجيل الدخول",
      signUp: "إنشاء حساب",
    },
    admin: {
      title: "الإدارة",
      subtitle: "أنشئ حسابات الطلاب وأكّد الدفعات النقدية.",
      createStudent: "حساب طالب جديد",
      studentName: "الاسم الكامل",
      studentEmail: "البريد الإلكتروني",
      course: "الدرس",
      amount: "المبلغ (دج)",
      amountHint: "يُسجّل المبلغ بالسنتيم.",
      createAndRecord: "إنشاء الحساب والدفعة",
      pendingPayments: "الدفعات المعلّقة",
      noPendingTitle: "لا توجد دفعات معلّقة",
      noPendingBody: "أنشئ حساب طالب مع دفعة ليظهر هنا.",
      markPaid: "تأكيد الدفع",
      studentCreatedToast: "تم إنشاء حساب الطالب.",
      paymentCreatedToast: "تم تسجيل الدفعة النقدية.",
      paymentPaidToast: "تم تأكيد الدفع ومنح الوصول إلى الدرس.",
      activationMailWarning: "تم منح الوصول، لكن تعذّر إرسال بريد التفعيل.",
      emailTaken: "هذا البريد الإلكتروني مستخدم بالفعل.",
      invalidForm: "تحقق من الاسم والبريد الإلكتروني والمبلغ.",
      requestFailed: "فشلت العملية. حاول مرة أخرى.",
      cash: "نقداً",
      pending: "معلّقة",
      activationSubject: "فعّل حسابك في العيايدة",
      activationText: "السلام عليكم {name}!\n\nتم تأكيد تسجيلك. فعّل حسابك عبر هذا الرابط الصالح لمدة 24 ساعة:\n{link}\n\nهذا الرابط شخصي ويُستخدم مرة واحدة فقط.\n\n— العيايدة",
    },
    studio: {
      title: "فضاء الأستاذ",
      subtitle: "أنشئ دروسك وفصولك وحصصك وعدّلها باللغات الثلاث.",
      myCourses: "دروسي",
      newCourse: "درس جديد",
      noCoursesTitle: "لا توجد دروس بعد",
      noCoursesBody: "أنشئ درسك الأول لتبدأ بنشر الحصص.",
      courseIdLabel: "المعرّف",
      courseIdHint: "حروف صغيرة وشرطات، مثل math-algebra-101. لا يمكن تغييره لاحقاً.",
      subject: "المادة",
      level: "المستوى",
      levelMiddle: "المتوسط",
      levelHigh: "الثانوي",
      thumbnail: "الصورة المصغّرة (المسار)",
      instructorName: "اسم الأستاذ",
      instructorAvatar: "الصورة الشخصية (المسار)",
      instructorBio: "نبذة",
      courseTitle: "عنوان الدرس",
      courseDescription: "الوصف",
      save: "حفظ",
      create: "إنشاء",
      archive: "أرشفة",
      archiveTitle: "أرشفة هذا الدرس؟",
      archiveBody: "سيختفي الدرس من قائمتك. لا شيء يُحذف نهائياً.",
      cancel: "إلغاء",
      confirm: "تأكيد",
      chapters: "الفصول",
      addChapter: "أضف فصلاً",
      chapterTitleLabel: "عنوان الفصل",
      lessons: "الحصص",
      addLesson: "أضف حصة",
      lessonTitleLabel: "عنوان الحصة",
      duration: "المدة",
      videoUrl: "رابط الفيديو",
      lessonDescription: "وصف الحصة",
      position: "الترتيب",
      liveSection: "بث مباشر",
      liveUrl: "رابط Google Meet",
      liveUrlHint: "روابط meet.google.com فقط. يراها الطلبة المسجّلون وحدهم.",
      liveSchedule: "التاريخ والوقت",
      deleteChapter: "حذف الفصل",
      deleteChapterBody: "سيُحذف الفصل وكل حصصه.",
      deleteLesson: "حذف الحصة",
      deleteLessonBody: "ستُحذف هذه الحصة.",
      savedToast: "تم حفظ التعديلات.",
      createdToast: "تم الإنشاء.",
      deletedToast: "تم الحذف.",
      archivedToast: "تمت أرشفة الدرس.",
      requestFailed: "فشلت العملية. أعد المحاولة.",
      invalidForm: "املأ اللغات الثلاث والحقول المطلوبة.",
      idLocked: "المعرّف ثابت بعد الإنشاء.",
      noChapters: "لا توجد فصول. أضف الأول.",
      subjectMath: "الرياضيات",
      subjectPhysics: "الفيزياء",
      subjectBiology: "علوم الحياة",
      emptyEditorTitle: "اختر درساً",
      emptyEditorBody: "اختر درساً من القائمة أو أنشئ درساً جديداً.",
      archivedBadge: "مؤرشف",
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
    mastery: {
      title: "الإتقان",
      overall: "الإتقان العام",
      decouvert: "مُكتشَف",
      entraine: "مُتدرَّب عليه",
      maitrise: "مُتقَن",
      notStarted: "لم يبدأ بعد",
    },
    live: {
      joinLive: "انضم إلى البث المباشر",
      scheduledFor: "موعد البث: {date}",
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
      previewPdf: "معاينة",
      hidePreview: "إخفاء المعاينة",
      exercisesTitle: "تمارين الفيشة",
      exercisesDone: "منجزة",
    },
    video: {
      play: "تشغيل",
      pause: "إيقاف مؤقت",
      speed: "سرعة التشغيل",
      quality: "جودة الفيديو",
      automatic: "تلقائي",
      captions: "الترجمة",
      captionsOn: "تشغيل الترجمة",
      captionsOff: "إيقاف الترجمة",
      fullscreen: "ملء الشاشة",
      shortcuts: "أوامر الفيديو. المسافة: تشغيل، J: رجوع، L: تقديم، F: ملء الشاشة",
      transcript: "النص المكتوب",
      transcriptLoading: "جارٍ تحميل النص…",
      transcriptUnavailableTitle: "النص غير متاح",
      transcriptUnavailableBody: "لا يوفر هذا الفيديو نصاً مكتوباً بهذه اللغة حالياً.",
      highlightAsNote: "احفظ هذا المقطع في ملاحظاتي",
    },
    notes: {
      title: "ملاحظاتي",
      subtitle: "راجع ملاحظات دروسك واستأنف الفيديو من اللحظة المناسبة.",
      allCourses: "كل الدروس",
      allChapters: "كل الفصول",
      courseFilter: "تصفية حسب الدرس",
      chapterFilter: "تصفية حسب الفصل",
      emptyTitle: "لا توجد ملاحظات هنا",
      emptyBody: "أضف ملاحظة أثناء الحصة لتجدها في هذه الصفحة.",
      emptyAction: "عرض دروسي",
      openNote: "افتح الملاحظة في الحصة",
      quoteLabel: "مقطع من النص",
      fromTranscript: "تم حفظ المقطع. أضف ملاحظتك عند الحاجة.",
      viewAll: "عرض كل ملاحظاتي",
    },
    qa: {
      questions: "الأسئلة",
      askQuestion: "اطرح سؤالاً",
      questionPlaceholder: "ما الذي تريد توضيحه في هذه الحصة؟",
      publishQuestion: "نشر",
      firstQuestion: "اطرح أول سؤال حول هذه الحصة.",
      reply: "أجب",
      replyPlaceholder: "اكتب إجابة واضحة…",
      publishReply: "نشر الإجابة",
      acceptedAnswer: "إجابة مقبولة",
      acceptAnswer: "اعتمد هذه الإجابة",
      teacher: "أستاذ",
      unansweredOnly: "بدون إجابة",
      loadMore: "تحميل المزيد",
      loading: "جارٍ تحميل الأسئلة…",
      loadError: "تعذّر تحميل الأسئلة.",
      retry: "حاول مجدداً",
      noUnanswered: "كل الأسئلة المعروضة لها إجابة.",
      charactersRemaining: "متبقٍ {count} حرفاً",
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
      lessonResultsTitle: "الدروس",
      inCourse: "في",
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
      passwordChangedToast: "تم تغيير كلمة المرور",
      passwordChangedOthersToast: "تم تغيير كلمة المرور. تم تسجيل الخروج من أجهزتك الأخرى.",
      savedToast: "تم حفظ الإعدادات",
      memberSince: "عضو منذ",
      preferences: "التفضيلات",
      security: "الأمان",
    },
    dataSaver: {
      title: "توفير البيانات",
      description: "يحدّ الفيديوهات بدقة 360p ويستخدم صورًا مصغرة أخف ويوقف التشغيل التلقائي.",
      active: "وضع توفير البيانات",
      installTitle: "ثبّت العيايدة",
      installDescription: "أضف العيايدة إلى شاشتك الرئيسية للوصول إليها بسرعة.",
      install: "تثبيت",
      dismiss: "لاحقًا",
    },
    devices: {
      title: "الأجهزة المتصلة",
      description: "الجلسات المفتوحة حاليًا على حسابك.",
      current: "هذا الجهاز",
      unknownDevice: "جهاز غير معروف",
      unknownIp: "عنوان IP غير معروف",
      lastSeen: "آخر نشاط",
      connectedAt: "تم الاتصال في",
      disconnect: "تسجيل الخروج",
      disconnectedToast: "تم تسجيل خروج الجهاز",
      loadError: "تعذّر تحميل الأجهزة.",
      emptyTitle: "لا توجد أجهزة لعرضها",
      emptyBody: "حدّث القائمة للتحقق من جلساتك النشطة.",
      refresh: "تحديث",
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
      magicLink: "أرسل لي رابط تسجيل الدخول",
      magicLinkSent: "تم الإرسال! تحقّق من بريدك.",
      magicLinkError: "تعذّر إرسال الرابط الآن.",
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
    review: {
      title: "مراجعة",
      subtitle: "أعد الإجابة على الأسئلة التي أخطأت فيها، من كل الفصول.",
      emptyTitle: "لا شيء للمراجعة",
      emptyBody: "كل إجاباتك في الاختبارات صحيحة حالياً — أحسنت!",
      doneTitle: "انتهت الجلسة",
      doneBody: "راجعت كل الأسئلة المعلّقة.",
      reviewAgain: "مراجعة الأسئلة المتبقية",
      backToDashboard: "العودة إلى لوحة التحكم",
      dashboardCardTitle: "للمراجعة",
      dashboardCardBody: "سؤال (أسئلة) اختبار للمراجعة",
    },
    examPrep: {
      title: "امتحان تجريبي",
      subtitle: "امتحان محدد بوقت يُجمع من اختبارات فصولك، حسب المستوى.",
      chooseLevelTitle: "اختر مستوى",
      middleExam: "امتحان تجريبي للبروفيه (المتوسط)",
      highExam: "امتحان تجريبي للبكالوريا (الثانوي)",
      startExam: "ابدأ الامتحان",
      timeLeft: "الوقت المتبقي",
      submitExam: "إنهاء الامتحان",
      noQuestionsTitle: "لا توجد أسئلة متاحة",
      noQuestionsBody: "لا توجد اختبارات لهذا المستوى بعد.",
      resultsTitle: "نتائج الامتحان",
      timeUp: "انتهى الوقت! تم إرسال امتحانك تلقائياً.",
      backToDashboard: "العودة إلى لوحة التحكم",
      retry: "إجراء امتحان آخر",
      dashboardCardTitle: "امتحان تجريبي",
      dashboardCardBody: "تدرّب في ظروف محددة بوقت",
    },
    legal: {
      lastUpdated: "آخر تحديث: 30 غشت 2026",
      backToHome: "العودة إلى الصفحة الرئيسية",
      terms: {
        pageTitle: "الشروط العامة للاستخدام",
        intro:
          "تنظّم هذه الشروط العامة للاستخدام الوصول إلى منصة لعيايدة واستخدامها، وهي خدمة تعليمية عبر الإنترنت موجّهة لتلاميذ المتوسط والثانوي وأولياء أمورهم. بإنشائك حسابًا أو استخدامك للموقع، فإنك توافق على هذه الشروط.",
        s1Title: "1. موضوع الخدمة",
        s1Body:
          "تقدّم لعيايدة دروسًا عبر الإنترنت (فيديوهات، وثائق، اختبارات) منظّمة حسب المادة والفصل والدرس، إضافة إلى تتبّع للتقدّم، وشهادات إتمام الدروس، وفضاء لطرح الأسئلة على الأساتذة والإجابة عنها. الخدمة متاحة باللغات الفرنسية والإنجليزية والعربية.",
        s2Title: "2. الحسابات",
        s2Body:
          "يتطلّب الوصول إلى معظم الميزات إنشاء حساب (تلميذ، ولي أمر، أستاذ أو مسؤول). يمكن إنشاء الحساب مباشرة من طرف المستخدم عبر استمارة التسجيل، أو من طرف أحد موظفي لعيايدة نيابة عن التلميذ، خاصة في إطار تسجيل مؤدى عنه يُدار يدويًا. أنت مسؤول عن سرّية كلمة مرورك وعن أي نشاط يتم من حسابك.",
        s3Title: "3. التلاميذ القاصرون",
        s3Body:
          "توجَّه لعيايدة أساسًا لتلاميذ قاصرين. لا تطلب استمارة التسجيل عبر الإنترنت حاليًا تاريخ الميلاد ولا أي وثيقة إثبات، وبالتالي لا تتحقق من سنّ المستخدم. يقع على عاتق الولي أو الممثل القانوني للقاصر التأكد من أنه لا يستخدم الخدمة إلا بإذنه، والإشراف على استخدامه لها. عندما يُنشئ موظفو لعيايدة حسابًا في إطار تسجيل مؤطَّر (دفع، مؤسسة شريكة)، تُجمع موافقة الولي أو الممثل القانوني مسبقًا، خارج الموقع، عند ذلك التسجيل.",
        s4Title: "4. المحتوى والملكية الفكرية",
        s4Body:
          "الدروس والنصوص والفيديوهات والوثائق والعناصر الرسومية على الموقع ملك للعيايدة أو لشركائها من الأساتذة، ما لم يُذكر خلاف ذلك. يمكنك الاطلاع على المحتوى المتاح لك وتحميله للاستخدام الشخصي غير التجاري. يُمنع أي نسخ أو نشر أو إعادة بيع دون إذن.",
        s5Title: "5. الدفع",
        s5Body:
          "قد يخضع الوصول إلى بعض الدروس للدفع. تُبلَّغ بشروط الدفع المعمول بها وقت التسجيل مباشرة؛ وحتى اليوم، يتم الدفع يدويًا (خارج الموقع)، ويُفعَّل الوصول إلى الدرس من طرف أحد الموظفين بعد التأكد من الدفع. لا تُدخَل أو تُخزَّن أي بيانات بطاقة بنكية على الموقع.",
        s6Title: "6. توفر الخدمة",
        s6Body:
          "لعيايدة خدمة قيد التطوير المستمر؛ قد تتغيّر بعض الميزات أو المحتويات أو تُضاف أو تُحذف دون إشعار مسبق. تُقدَّم الخدمة \"كما هي\"، دون ضمان لتوفرها الدائم؛ وقد تحدث انقطاعات مؤقتة لأغراض الصيانة.",
        s7Title: "7. إنهاء الاستخدام",
        s7Body:
          "يمكنك التوقف عن استخدام الخدمة في أي وقت. يجوز للعيايدة تعليق أو حذف حساب في حال الاستخدام التعسفي أو الاحتيالي أو المخالف لهذه الشروط. يمكنك طلب إغلاق حسابك وحذف بياناتك بالتواصل معنا (انظر سياسة الخصوصية).",
        s8Title: "8. المسؤولية",
        s8Body:
          "تسعى لعيايدة لتقديم محتوى تربوي موثوق، لكنها لا تضمن خلوّ الدروس أو التمارين من الأخطاء. استخدامك للخدمة على مسؤوليتك الخاصة؛ ولا تتحمّل لعيايدة مسؤولية الأضرار غير المباشرة الناتجة عن استخدامها.",
        s9Title: "9. القانون المعمول به والتواصل",
        s9Body:
          "صُممت هذه الشروط أساسًا للاستخدام في الجزائر وحُرِّرت وفقًا لذلك؛ ويستفيد المستخدمون المقيمون في الاتحاد الأوروبي إضافة إلى ذلك من الحقوق الموضحة في سياسة الخصوصية الخاصة بنا. لأي سؤال بخصوص هذه الشروط، تواصل معنا عبر صفحة اتصل بنا في الموقع.",
      },
      privacy: {
        pageTitle: "سياسة الخصوصية",
        intro:
          "توضّح هذه السياسة البيانات التي تجمعها لعيايدة، ولماذا، وكيف تتم حمايتها. لعيايدة مشروع مستقل، مستضاف ذاتيًا، ولا صلة له بأي مجموعة إعلانية أو طرف تجاري ثالث.",
        s1Title: "1. الجهة المسؤولة عن المعالجة",
        s1Body:
          "تُنشر لعيايدة وتُدار بشكل مستقل. لأي سؤال يخص بياناتك الشخصية، يمكنك التواصل معنا عبر صفحة اتصل بنا في الموقع.",
        s2Title: "2. البيانات التي نجمعها",
        s2Body:
          "عند التسجيل: اسمك، عنوان بريدك الإلكتروني، وكلمة مرور (مشفّرة تجزئةً، لا تُخزَّن أبدًا في صورة واضحة). أثناء الاستخدام: تقدّمك التعليمي (الدروس المتابَعة، الدروس المكتملة، موضع تشغيل الفيديو، إجابات الاختبارات، الوثائق المحمَّلة، ملاحظاتك الشخصية). إذا طرحت سؤالًا على أستاذ: محتوى ذلك السؤال وإجابته. في حالة تسجيل مؤدى عنه: معلومات الدفع اليدوي التي يسجّلها الموظفون (المبلغ، الوسيلة، الحالة) — لا تُدخَل أي بيانات بنكية على الموقع. لا نجمع تاريخ الميلاد ولا بيانات صحية.",
        s3Title: "3. لماذا نستخدمها",
        s3Body:
          "تُستخدم هذه البيانات فقط لتشغيل الخدمة: إنشاء حسابك وتأمينه، عرض تقدّمك وحفظه، إصدار شهاداتك، إدارة الأسئلة والأجوبة، ومتابعة تسجيل مؤدى عنه عند الاقتضاء. لا تُستخدم أبدًا لأغراض إعلانية.",
        s4Title: "4. التلاميذ القاصرون وموافقة الولي",
        s4Body:
          "صُممت لعيايدة لتلاميذ قاصرين. لا نطبّق حاليًا آلية تقنية لجمع أو التحقق من موافقة الولي عند التسجيل عبر الإنترنت؛ ويقع على عاتق الولي أو الممثل القانوني الإذن بإشراف الطفل على استخدام الخدمة. عندما يُنشئ موظفونا حسابًا في إطار تسجيل مؤطَّر (دفع، مؤسسة)، تُجمع موافقة الولي مسبقًا خارج الموقع. يمكن لأي ولي يرغب في الاطلاع على بيانات طفله أو تصحيحها أو حذفها التواصل معنا في أي وقت.",
        s5Title: "5. ملفات تعريف الارتباط وأدوات التتبع",
        s5Body:
          "لا تستخدم لعيايدة أي أداة لتحليل الجمهور (لا Google Analytics ولا ما يعادلها)، ولا أي كوكيز إعلانية، ولا أي كوكيز من طرف ثالث. الكوكيز الوحيدة المستخدمة هي كوكيز الجلسة الضرورية حصرًا (layaida_session)، التي تُبقيك متصلًا لمدة 30 يومًا؛ لا تُستخدم لتتبعك عبر مواقع أخرى ولا تتطلب لافتة موافقة، لأنها ضرورية حصرًا لعمل الخدمة.",
        s6Title: "6. الأمان",
        s6Body:
          "تُشفَّر كلمة مرورك تجزئةً (scrypt) ولا تُخزَّن أبدًا في صورة واضحة. تستخدم الجلسات كوكيز آمنة لا يمكن الوصول إليها إلا من الخادم (httpOnly). عدد محاولات تسجيل الدخول محدود للحد من الهجمات الآلية، وتُشفَّر التبادلات مع الموقع (HTTPS).",
        s7Title: "7. مدة الاحتفاظ بالبيانات",
        s7Body:
          "تُحفَظ بياناتك طالما كان حسابك نشطًا. لا يوجد حاليًا حذف تلقائي بعد فترة من عدم النشاط؛ يمكنك طلب حذف حسابك وبياناتك في أي وقت بالتواصل معنا، وتُعالَج الطلب حينها يدويًا.",
        s8Title: "8. المشاركة مع أطراف ثالثة",
        s8Body:
          "تُستضاف بياناتك على بنية تحتية للخوادم يديرها ناشر لعيايدة (استضافة ذاتية)، ولا تُباع ولا تُنقَل إلى أطراف ثالثة لأغراض تجارية. تُستضاف فيديوهات الدروس حاليًا على يوتيوب (تشغيل مضمَّن)؛ لذا قد تنطوي مشاهدتها على تبادل تقني مع يوتيوب/غوغل وفق شروط تلك الخدمة، وهي مستقلة عن لعيايدة.",
        s9Title: "9. حقوقك",
        s9Body:
          "إذا كنت مقيمًا في الاتحاد الأوروبي، تخوّلك اللائحة العامة لحماية البيانات (RGPD) الحق في الوصول إلى بياناتك وتصحيحها أو حذفها، والاعتراض على معالجتها، أو طلب نقلها. تُتاح هذه الخيارات نفسها (الوصول، التصحيح، الحذف) لجميع مستخدمي لعيايدة أيًا كان بلد إقامتهم، بناءً على طلب بسيط.",
        s10Title: "10. التواصل",
        s10Body:
          "لممارسة هذه الحقوق أو لأي سؤال حول هذه السياسة، تواصل معنا عبر صفحة اتصل بنا في الموقع.",
      },
    },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}

export type { TranslationKeys };
