"use client";

import { useProgress, NotificationType } from "@/lib/progress-context";

const typeStyles: Record<NotificationType, string> = {
  success: "bg-green-600",
  info: "bg-blue-600",
  warning: "bg-yellow-500",
  error: "bg-red-600",
};

const typeIcons: Record<NotificationType, string> = {
  success: "M5 13l4 4L19 7",
  info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  warning: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z",
  error: "M6 18L18 6M6 6l12 12",
};

export function NotificationToast() {
  const { notifications, dismissNotification } = useProgress();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`${typeStyles[notif.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in`}
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={typeIcons[notif.type]} />
          </svg>
          <span className="text-sm font-medium flex-1">{notif.message}</span>
          <button onClick={() => dismissNotification(notif.id)} className="text-white/70 hover:text-white">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
