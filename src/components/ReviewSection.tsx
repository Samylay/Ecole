"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

type Review = {
  id: string;
  name: string;
  rating: number;
  date: string;
  comment: { fr: string; en: string; ar: string };
};

const mockReviews: Review[] = [
  {
    id: "r1",
    name: "Youssef M.",
    rating: 5,
    date: "2025-11-15",
    comment: {
      fr: "Excellent cours ! Les explications sont claires et les exercices bien choisis. J'ai beaucoup progressé grâce à ce cours.",
      en: "Excellent course! The explanations are clear and the exercises well chosen. I have improved a lot thanks to this course.",
      ar: "دورة ممتازة! الشروحات واضحة والتمارين مختارة بعناية. لقد تقدمت كثيراً بفضل هذا الدرس.",
    },
  },
  {
    id: "r2",
    name: "Sara B.",
    rating: 4,
    date: "2025-10-28",
    comment: {
      fr: "Très bon contenu pédagogique. J'aurais aimé plus d'exercices pratiques, mais dans l'ensemble c'est très bien.",
      en: "Very good educational content. I would have liked more practical exercises, but overall it's very good.",
      ar: "محتوى تعليمي جيد جداً. كنت أتمنى المزيد من التمارين العملية، لكن بشكل عام ممتاز.",
    },
  },
  {
    id: "r3",
    name: "Ahmed K.",
    rating: 5,
    date: "2025-09-10",
    comment: {
      fr: "Le meilleur cours que j'ai trouvé en ligne. Le professeur explique de manière très pédagogique et les vidéos sont de qualité.",
      en: "The best course I've found online. The teacher explains in a very pedagogical way and the videos are high quality.",
      ar: "أفضل درس وجدته على الإنترنت. الأستاذ يشرح بطريقة بيداغوجية رائعة والفيديوهات عالية الجودة.",
    },
  },
  {
    id: "r4",
    name: "Lina T.",
    rating: 4,
    date: "2025-08-22",
    comment: {
      fr: "Cours bien structuré avec une progression logique. Les documents PDF sont un vrai plus. Je recommande vivement.",
      en: "Well-structured course with logical progression. The PDF documents are a real plus. I highly recommend it.",
      ar: "درس منظم جيداً مع تقدم منطقي. وثائق PDF إضافة حقيقية. أنصح به بشدة.",
    },
  },
];

const avatarColors = [
  "bg-indigo-600",
  "bg-rose-500",
  "bg-emerald-600",
  "bg-amber-500",
];

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${
            star <= rating ? "text-yellow-400" : "text-gray-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function StarPicker({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (r: number) => void;
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="transition-transform hover:scale-110"
        >
          <svg
            className={`w-7 h-7 ${
              star <= (hover || rating) ? "text-yellow-400" : "text-gray-200"
            } transition-colors`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

export function ReviewSection() {
  const { locale, t } = useLocale();

  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || newComment.trim() === "") return;

    const newReview: Review = {
      id: `user-${Date.now()}`,
      name: "You",
      rating: newRating,
      date: new Date().toISOString().split("T")[0],
      comment: {
        fr: newComment,
        en: newComment,
        ar: newComment,
      },
    };

    setReviews((prev) => [newReview, ...prev]);
    setNewRating(0);
    setNewComment("");
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0";

  return (
    <div className="animate-fade-in-up">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          {t.course.reviews} ({reviews.length})
        </h2>
        <div className="flex items-center gap-2">
          <StarRating rating={Math.round(parseFloat(averageRating))} size="md" />
          <span className="text-lg font-semibold text-gray-900">{averageRating}</span>
        </div>
      </div>

      {/* Write a Review Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {t.course.writeReview}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <StarPicker rating={newRating} onChange={setNewRating} />
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t.course.reviewPlaceholder}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
          />
          <button
            type="submit"
            disabled={newRating === 0 || newComment.trim() === ""}
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.course.submitReview}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-gray-200 p-5 animate-fade-in-up"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className={`w-10 h-10 ${
                  avatarColors[index % avatarColors.length]
                } text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0`}
              >
                {review.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-gray-900 text-sm">
                    {review.name}
                  </span>
                  <span className="text-xs text-gray-400 flex-shrink-0">
                    {review.date}
                  </span>
                </div>
                <div className="mb-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {review.comment[locale]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
