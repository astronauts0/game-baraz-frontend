import React from "react";
import { CheckCheck, Check, Info, FileText } from "lucide-react";
import type { ChatMessage } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChatBubbleProps {
  message: ChatMessage;
  counterpartyName: string;
}

interface SystemMessageProps {
  message: ChatMessage;
}

export const SystemMessage: React.FC<SystemMessageProps> = ({ message }) => (
  <div className="flex justify-center">
    <Badge variant="outline">
      <Info size={10} className="shrink-0" />
      {message.text}
    </Badge>
  </div>
);

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  counterpartyName,
}) => {
  const isMe = message.sender === "me";

  return (
    <div
      className={cn(
        "flex items-end gap-2.5 animate-in fade-in slide-in-from-bottom-1 duration-200",
        isMe ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        title={isMe ? "You" : counterpartyName}
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold shadow-sm mb-1",
          isMe
            ? "bg-slate-900 text-white"
            : "bg-linear-to-br from-primary to-violet-600 text-white",
        )}
      >
        {isMe ? "ME" : counterpartyName.charAt(0).toUpperCase()}
      </div>

      {/* Bubble + metadata */}
      <div
        className={cn(
          "max-w-[72%] sm:max-w-[60%]",
          isMe ? "items-end" : "items-start",
          "flex flex-col gap-1",
        )}
      >
        {/* File / Image special rendering */}
        {message.type === "file" && (
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-2xl border text-sm shadow-sm",
              isMe
                ? "bg-slate-900 text-white border-slate-800 rounded-tr-none"
                : "bg-white text-slate-700 border-slate-200 rounded-tl-none",
            )}
          >
            <div
              className={cn(
                "p-2 rounded-lg",
                isMe ? "bg-white/10" : "bg-slate-100",
              )}
            >
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <p className="font-semibold truncate">
                {message.fileName ?? "Attachment"}
              </p>
              <p
                className={cn(
                  "text-[10px]",
                  isMe ? "text-white/60" : "text-slate-400",
                )}
              >
                File attachment
              </p>
            </div>
          </div>
        )}

        {message.type === "image" && message.fileUrl && (
          <div
            className={cn(
              "rounded-2xl overflow-hidden border shadow-sm",
              isMe ? "rounded-tr-none" : "rounded-tl-none",
            )}
          >
            <img
              src={message.fileUrl}
              alt="Shared image"
              className="max-w-full max-h-48 object-cover"
            />
            {message.text && (
              <p
                className={cn(
                  "px-3 pb-2 pt-2 text-sm",
                  isMe ? "bg-slate-900 text-white" : "bg-white text-slate-700",
                )}
              >
                {message.text}
              </p>
            )}
          </div>
        )}

        {/* Text bubble */}
        {message.type !== "image" && message.type !== "file" && (
          <div
            className={cn(
              "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
              isMe
                ? "bg-slate-900 text-white rounded-tr-none"
                : "bg-white border border-slate-200 text-slate-700 rounded-tl-none",
            )}
          >
            {message.text}
          </div>
        )}

        {/* Timestamp + read receipt */}
        <div
          className={cn(
            "flex items-center gap-1 text-[10px] text-slate-400",
            isMe ? "flex-row-reverse" : "flex-row",
          )}
        >
          <span>{message.timestamp}</span>
          {isMe && (
            <>
              {message.read ? (
                <CheckCheck size={12} className="text-emerald-500" />
              ) : (
                <Check size={12} className="text-slate-400" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
