import React, { useRef, useEffect, useState } from "react";
import {
  MoreVertical,
  Lock,
  FileText,
  CheckCircle,
  Paperclip,
  Send,
  ShieldAlert,
} from "lucide-react";
import type { Dispute, DisputeMessage } from "@/types";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface DisputeChatAreaProps {
  dispute: Dispute | undefined;
  onSendMessage: (disputeId: string, text: string) => void;
}

export const DisputeChatArea: React.FC<DisputeChatAreaProps> = ({
  dispute,
  onSendMessage,
}) => {
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dispute?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() && dispute) {
      onSendMessage(dispute.id, messageInput);
      setMessageInput("");
    }
  };

  if (!dispute) {
    return (
      <Card>
        <ShieldAlert size={48} className="mb-4 text-slate-200" />
        <p className="font-bold">No Case Selected</p>
        <p className="text-sm mt-1 text-slate-500">
          Select a dispute from the sidebar to view details.
        </p>
      </Card>
    );
  }

  return (
    <Card className="w-full flex-1 pt-0">
      {/* Case Header */}
      <div className="p-4 border-b  flex justify-between items-center bg-slate-50/50/50">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold">{dispute.reason}</h2>
            <span className="px-2 py-0.5 bg-slate-200 text-slate-600 text-[10px] font-mono rounded">
              Order: {dispute.orderId}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Case opened on {dispute.dateOpened}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 bg-white border border-slate-200  rounded-lg text-slate-500">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <ScrollArea className="flex-1 bg-slate-50/30/10">
        <div ref={messagesEndRef} className="p-6 space-y-6">
          {/* Initial System Message */}
          <div className="flex justify-center">
            <div className="bg-slate-100 border border-slate-200 px-4 py-2 rounded-full text-xs flex items-center gap-2">
              <Lock size={12} /> This conversation is secure and monitored by
              GameBazaar Support.
            </div>
          </div>

          {(dispute.messages || []).map((msg: DisputeMessage) => (
            <div
              key={msg.id || Math.random()}
              className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] space-y-1 ${msg.sender === "User" ? "items-end flex flex-col" : "items-start flex flex-col"}`}
              >
                <div className="flex items-center gap-2 px-1">
                  <span className="text-[10px] font-bold uppercase">
                    {msg.sender}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {msg.timestamp}
                  </span>
                </div>
                <div
                  className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.sender === "User"
                      ? "bg-slate-900 text-white rounded-tr-none"
                      : msg.sender === "System"
                        ? "bg-slate-100 border border-slate-200 w-full text-center italic"
                        : "bg-white border border-slate-200  rounded-tl-none",
                  )}
                >
                  {msg.text}

                  {msg.isEvidence && (
                    <div className="mt-3 p-3 bg-black/5 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-black/10">
                      <div className="p-2 bg-black/5 rounded">
                        <FileText size={16} />
                      </div>
                      <div className="text-xs overflow-hidden">
                        <p className="font-bold truncate">
                          evidence_screenshot.png
                        </p>
                        <p className="opacity-70">1.2 MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 bg-white border-t ">
        {dispute.status === "Resolved" || dispute.status === "Closed" ? (
          <div className="p-4 bg-slate-50 border  rounded-xl text-center">
            <p className="text-sm font-bold text-slate-500 flex items-center justify-center gap-2">
              <CheckCircle size={16} /> This case has been marked as{" "}
              {dispute.status}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <button
              type="button"
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl"
              title="Attach Evidence"
            >
              <Paperclip size={20} />
            </button>
            <div className="flex-1 bg-slate-50 border  rounded-xl focus-within:ring-2 focus-within:ring-red-100 focus-within:border-red-400 transition-all">
              <textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
                placeholder="Type your message here..."
                className="w-full bg-transparent p-3 text-sm focus:outline-none resize-none max-h-32 min-h-[48px]"
                rows={1}
              />
            </div>
            <button
              type="submit"
              disabled={!messageInput.trim()}
              className="p-3 bg-black text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
            >
              <Send size={18} />
            </button>
          </form>
        )}
      </div>
    </Card>
  );
};
