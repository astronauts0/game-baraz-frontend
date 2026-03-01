import React, { useRef, useState } from "react";
import { Send, Paperclip, X, SmilePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendFile?: (file: File) => void;
  disabled?: boolean;
}

const QUICK_REPLIES = [
  "Sure, give me a few minutes.",
  "Can you share the details?",
  "Payment is in escrow, please proceed.",
  "Delivery confirmed, thank you!",
];

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendFile,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || disabled) return;
    onSendMessage(trimmed);
    setInputValue("");
    setShowQuickReplies(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onSendFile) return;
    onSendFile(file);
    e.target.value = "";
  };

  const handleQuickReply = (text: string) => {
    onSendMessage(text);
    setShowQuickReplies(false);
  };

  return (
    <div className="p-4 bg-white border-t border-slate-100">
      {/* Quick Replies */}
      {showQuickReplies && (
        <div className="mb-3 flex flex-wrap gap-2">
          {QUICK_REPLIES.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => handleQuickReply(reply)}
              className="px-3 py-1.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-full hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
            >
              {reply}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowQuickReplies(false)}
            className="px-2 py-1.5 text-xs text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        {/* Attach file */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-100 transition-all disabled:opacity-40"
          title="Attach File"
        >
          <Paperclip size={18} />
        </button>

        {/* Quick reply toggle */}
        <button
          type="button"
          onClick={() => setShowQuickReplies((v) => !v)}
          disabled={disabled}
          className={cn(
            "p-2.5 rounded-xl border transition-all disabled:opacity-40",
            showQuickReplies
              ? "bg-primary/10 border-primary/20 text-primary"
              : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:bg-slate-100",
          )}
          title="Quick Replies"
        >
          <SmilePlus size={18} />
        </button>

        {/* Text area */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all overflow-hidden">
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputValue}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="Type a secure message... (Enter to send)"
            className="w-full bg-transparent px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none"
            style={{ maxHeight: "120px", overflowY: "auto" }}
          />
        </div>

        {/* Send */}
        <button
          type="submit"
          disabled={!inputValue.trim() || disabled}
          className="p-3 rounded-xl bg-slate-900 text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all active:scale-95"
          title="Send Message"
        >
          <Send size={18} />
        </button>
      </form>

      {/* Footer note */}
      <p className="text-center text-[10px] text-slate-400 mt-2.5 flex items-center justify-center gap-1">
        🔒 End-to-end encrypted · Don't share credentials until payment is
        verified
      </p>
    </div>
  );
};
