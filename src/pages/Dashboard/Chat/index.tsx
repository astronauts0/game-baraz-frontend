import React, { useState, useEffect, useRef, useMemo } from "react";
import { ArrowLeft, Lock, Clock } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import type { ChatMessage } from "@/types";
import { Button } from "@/components/ui/button";
import { INITIAL_ORDERS } from "@/constants";
import ContainerDiv from "@/components/shared/ContainerDiv";

import { ChatSidebar } from "./components/ChatSidebar";
import { ChatBubble, SystemMessage } from "./components/ChatBubble";
import { ChatInput } from "./components/ChatInput";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "sys-1",
    sender: "system",
    text: "Secure channel established. Order protected by Escrow.",
    timestamp: "System",
    type: "text",
  },
  {
    id: "msg-1",
    sender: "other",
    text: "Hi there! I see you ordered the asset. Thanks for the purchase!",
    timestamp: "10:05 AM",
    type: "text",
    read: true,
  },
  {
    id: "msg-2",
    sender: "me",
    text: "Hello! Yes, looking forward to it. When can you deliver?",
    timestamp: "10:12 AM",
    type: "text",
    read: true,
  },
];

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const order = useMemo(() => {
    return INITIAL_ORDERS.find((o) => o.id === id);
  }, [id]);

  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial scroll to bottom
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
    // A small delay hack to ensure layout shift happens if there are images
    const timeout = setTimeout(scrollToBottom, 150);
    return () => clearTimeout(timeout);
  }, [messages]);

  const addMessage = (msg: ChatMessage) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
      read: false,
    };
    addMessage(newMessage);

    // Simulate counterparty reply
    setTimeout(() => {
      addMessage({
        id: `msg-${Date.now() + 1}`,
        sender: "other",
        text: "I am preparing it now. Please give me about 5 minutes.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
        read: true, // we pretend it's read since we just received it
      });

      // Mark user message as read
      setMessages((prev) =>
        prev.map((m) => (m.id === newMessage.id ? { ...m, read: true } : m)),
      );
    }, 2500);
  };

  const handleSendFile = (file: File) => {
    // Fake file upload handler
    const isImage = file.type.startsWith("image/");
    const localUrl = URL.createObjectURL(file);

    const newMsg: ChatMessage = {
      id: `file-${Date.now()}`,
      sender: "me",
      text: "",
      fileName: file.name,
      fileUrl: localUrl,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: isImage ? "image" : "file",
      read: false,
    };
    addMessage(newMsg);
  };

  if (!order) {
    return (
      <ContainerDiv className="py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif">Channel Not Found</h2>
        <p className="text-slate-500">
          The chat session you are looking for does not exist or has been
          closed.
        </p>
        <Button
          onClick={() => navigate("/dashboard/orders")}
          className="px-6 py-2 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
        >
          Back to Orders
        </Button>
      </ContainerDiv>
    );
  }

  return (
    <ContainerDiv className="py-10 sm:py-20">
      <div className="h-[calc(100vh-140px)] min-h-[600px] flex flex-col animate-in fade-in duration-500">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
          <div className="flex items-center flex-wrap gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate(`/dashboard/orders/${order.id}`)}
              className="rounded-full shadow-sm hover:shadow-md transition-shadow"
            >
              <ArrowLeft size={18} />
            </Button>
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-xl font-bold tracking-tight">
                  Secure Comm Link
                </h1>
                <Badge className="bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <Lock size={10} /> Encrypted
                </Badge>
              </div>
              <p className="text-slate-500 text-xs mt-0.5 font-medium">
                Reference: #{order.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline">
              <Clock size={14} />
              <span>Auto-close in 24h</span>
            </Badge>
          </div>
        </div>

        <div className="flex gap-6 flex-1 min-h-0 bg-slate-50 rounded-2xl p-4 shadow-inner border">
          {/* Left Sidebar: Transaction Context (Hidden on mobile) */}
          <div className="hidden lg:block w-80 xl:w-96 shrink-0 h-full">
            <ChatSidebar order={order} />
          </div>

          {/* Right Area: Chat Interface */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden relative">
            {/* Header (Mobile ONLY context fallback) */}
            <div className="lg:hidden p-3 border-b flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                  {order.counterparty.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">
                    {order.counterparty}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-medium line-clamp-1">
                    {order.assetName}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-50/50">
              <div className="p-4 sm:p-6 space-y-6">
                {messages.map((msg) => {
                  if (msg.sender === "system") {
                    return <SystemMessage key={msg.id} message={msg} />;
                  }
                  return (
                    <ChatBubble
                      key={msg.id}
                      message={msg}
                      counterpartyName={order.counterparty}
                    />
                  );
                })}
                <div ref={messagesEndRef} className="h-4" />
              </div>
            </ScrollArea>

            {/* Input Area */}
            {order.status === "Cancelled" || order.status === "Completed" ? (
              <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-sm font-semibold text-slate-500">
                This order channel is permanently closed.
              </div>
            ) : (
              <div className="z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  onSendFile={handleSendFile}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </ContainerDiv>
  );
};

export default ChatPage;
