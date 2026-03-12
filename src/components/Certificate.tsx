"use client";

import { useLocale } from "@/lib/locale-context";
import { useProgress } from "@/lib/progress-context";

interface CertificateProps {
  courseName: string;
  studentName: string;
  completionDate: string;
  courseId: string;
}

export function Certificate({
  courseName,
  studentName,
  completionDate,
  courseId,
}: CertificateProps) {
  const { t } = useLocale();
  const { addNotification } = useProgress();

  const handleDownload = () => {
    addNotification(t.course.certificateDesc, "success");
  };

  return (
    <div className="animate-fade-in">
      {/* Certificate card */}
      <div className="relative bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl border-2 border-indigo-500/40 overflow-hidden print:border-indigo-600 print:bg-white">
        {/* Decorative corner elements */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-indigo-500/30 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-indigo-500/30 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-indigo-500/30 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-indigo-500/30 rounded-br-2xl" />

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative px-8 py-10 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-indigo-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-1 print:text-gray-900">
            {t.course.certificate}
          </h2>
          <div className="w-16 h-0.5 bg-indigo-500 mx-auto mb-6" />

          {/* Student name */}
          <p className="text-gray-400 text-sm mb-1 print:text-gray-600">
            {t.course.certificateDesc}
          </p>
          <p className="text-2xl font-semibold text-indigo-400 mb-4 print:text-indigo-600">
            {studentName}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-gray-600" />
            <svg
              className="w-4 h-4 text-indigo-500/50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <div className="w-12 h-px bg-gray-600" />
          </div>

          {/* Course name */}
          <p className="text-lg font-medium text-white mb-6 print:text-gray-900">
            {courseName}
          </p>

          {/* Completion date */}
          <div className="inline-flex items-center gap-2 bg-gray-700/50 rounded-full px-4 py-2 print:bg-gray-100">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-300 print:text-gray-700">
              {completionDate}
            </span>
          </div>

          {/* Course ID watermark */}
          <p className="text-xs text-gray-600 mt-6">ID: {courseId}</p>
        </div>
      </div>

      {/* Download button (hidden in print) */}
      <div className="mt-4 flex justify-center print:hidden">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all active:scale-[0.97]"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {t.course.downloadCertificate}
        </button>
      </div>
    </div>
  );
}
