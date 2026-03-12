"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/CourseCard";
import { useLocale } from "@/lib/locale-context";
import { courses, subjectColors, subjectIcons, Subject } from "@/lib/data";
import Link from "next/link";
import { useState } from "react";

const subjects: Subject[] = ["math", "physics", "biology"];

const featureIcons = [
  "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
];

const testimonials = [
  {
    name: "Alice W.",
    role: { fr: "Lycéenne, Terminale", en: "High School Senior", ar: "طالبة ثانوية" },
    text: {
      fr: "Grâce à Layaida, j'ai amélioré ma moyenne en maths de 4 points. Les vidéos sont claires et les quiz m'aident à retenir.",
      en: "Thanks to Layaida, I improved my math average by 4 points. The videos are clear and the quizzes help me retain information.",
      ar: "بفضل لعيدة، تحسن معدلي في الرياضيات بـ 4 نقاط. الفيديوهات واضحة والاختبارات تساعدني على الحفظ.",
    },
    rating: 5,
  },
  {
    name: "Tom K.",
    role: { fr: "Collégien, 3ème", en: "Middle Schooler", ar: "طالب متوسط" },
    text: {
      fr: "La physique me semblait impossible avant. Maintenant je comprends les lois de Newton et j'ai eu 16/20 au dernier contrôle !",
      en: "Physics seemed impossible before. Now I understand Newton's laws and I scored 16/20 on my last test!",
      ar: "كانت الفيزياء تبدو مستحيلة. الآن أفهم قوانين نيوتن وحصلت على 16/20 في آخر اختبار!",
    },
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: { fr: "Lycéenne, Première", en: "High School Junior", ar: "طالبة ثانوية" },
    text: {
      fr: "J'adore le fait que les cours soient en 3 langues. Je peux étudier en arabe et vérifier ma compréhension en français.",
      en: "I love that courses are in 3 languages. I can study in Arabic and verify my understanding in French.",
      ar: "أحب أن الدروس بثلاث لغات. أستطيع الدراسة بالعربية والتحقق من فهمي بالفرنسية.",
    },
    rating: 4,
  },
  {
    name: "Mike R.",
    role: { fr: "Lycéen, Terminale", en: "High School Senior", ar: "طالب ثانوي" },
    text: {
      fr: "Les exercices interactifs m'ont permis de mieux comprendre la biologie. Je me sens beaucoup plus confiant pour mes examens.",
      en: "The interactive exercises helped me understand biology much better. I feel so much more confident for my exams.",
      ar: "التمارين التفاعلية ساعدتني على فهم البيولوجيا بشكل أفضل. أشعر بثقة أكبر بكثير لامتحاناتي.",
    },
    rating: 5,
  },
  {
    name: "Lisa T.",
    role: { fr: "Collégienne, 4ème", en: "Middle Schooler", ar: "طالبة متوسط" },
    text: {
      fr: "Cette plateforme a changé ma façon d'étudier. Les cours sont bien structurés et je peux apprendre à mon propre rythme.",
      en: "This platform changed the way I study. The courses are well structured and I can learn at my own pace.",
      ar: "غيّرت هذه المنصة طريقتي في الدراسة. الدروس منظمة جيداً وأستطيع التعلم بالسرعة التي تناسبني.",
    },
    rating: 5,
  },
  {
    name: "David H.",
    role: { fr: "Lycéen, Première", en: "High School Junior", ar: "طالب ثانوي" },
    text: {
      fr: "Les professeurs expliquent vraiment bien. J'ai enfin réussi à comprendre les maths grâce aux vidéos détaillées.",
      en: "The teachers explain things really well. I finally managed to understand math thanks to the detailed videos.",
      ar: "المعلمون يشرحون بشكل ممتاز. أخيراً تمكنت من فهم الرياضيات بفضل الفيديوهات المفصلة.",
    },
    rating: 4,
  },
];

export default function HomePage() {
  const { t, locale } = useLocale();
  const [activeSubject, setActiveSubject] = useState<Subject | "all">("all");

  const filteredCourses =
    activeSubject === "all" ? courses : courses.filter((c) => c.subject === activeSubject);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main id="main-content" className="flex-grow">

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-3xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.home.hero.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-indigo-100 leading-relaxed">
              {t.home.hero.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                {t.home.hero.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20"
              >
                {t.nav.signUp}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "12K+", label: t.home.stats.students },
              { value: "50+", label: t.home.stats.courses },
              { value: "500+", label: t.home.stats.lessons },
              { value: "20+", label: t.home.stats.teachers },
            ].map((stat, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}>
                <div className="text-3xl md:text-4xl font-bold text-indigo-600">{stat.value}</div>
                <div className="text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">{t.home.subjects}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => {
            const colors = subjectColors[subject];
            const icon = subjectIcons[subject];
            const count = courses.filter((c) => c.subject === subject).length;
            return (
              <Link
                key={subject}
                href={`/courses?subject=${subject}`}
                className={`${colors.bg} rounded-xl p-6 text-left hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-gray-200`}
              >
                <span className="text-4xl">{icon}</span>
                <h3 className={`text-xl font-bold ${colors.text} mt-3`}>{t.subjects[subject]}</h3>
                <p className="text-gray-500 mt-1">
                  {count} {t.course.lessons}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular Courses */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t.home.popularCourses}</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveSubject("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeSubject === "all" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.home.viewAll}
            </button>
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setActiveSubject(subject)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSubject === subject
                    ? `${subjectColors[subject].accent} text-white`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {subjectIcons[subject]} {t.subjects[subject]}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, i) => (
            <div key={course.id} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/courses" className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            {t.home.viewAll}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">{t.home.whyUs}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.home.whyUsItems.map((item, i) => (
              <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}>
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={featureIcons[i]} />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">{t.home.howItWorks}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.home.howItWorksSteps.map((step, i) => (
            <div key={i} className="relative text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}>
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {i + 1}
              </div>
              {i < t.home.howItWorksSteps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-indigo-200" />
              )}
              <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">{t.home.testimonials}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s`, animationFillMode: "both" }}>
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-4 h-4 ${star <= test.rating ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{test.text[locale]}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {test.name[0]}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{test.name}</p>
                  <p className="text-xs text-gray-500">{test.role[locale]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">{t.home.hero.title}</h2>
          <p className="text-indigo-100 mb-8 text-lg">{t.home.hero.subtitle}</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors text-lg">
            {t.nav.signUp}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
