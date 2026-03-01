import React from "react";
import { CheckCircle, AlertTriangle } from "lucide-react";
import type { NotificationState } from "../types";

interface ToastNotificationProps {
  notification: NotificationState;
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  notification,
}) => {
  if (!notification) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 duration-300 ${
        notification.type === "success"
          ? "bg-emerald-900 text-white border-emerald-700"
          : "bg-red-900 text-white border-red-700"
      }`}
    >
      {notification.type === "success" ? (
        <CheckCircle size={18} />
      ) : (
        <AlertTriangle size={18} />
      )}
      <span className="font-semibold text-sm">{notification.message}</span>
    </div>
  );
};

export default ToastNotification;
