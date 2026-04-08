"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "¡Hola! 👋 Soy el asistente de Disstands. ¿En qué puedo ayudarte? Pregúntame sobre nuestros pavimentos, moquetas, precios o servicios.",
};

export function ChatBubble() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      // Send only user/assistant messages (exclude welcome if it was the only one)
      const apiMessages = updated.filter((_, i) => i > 0 || updated[0].role === "user");
      const toSend = apiMessages.length > 0 ? apiMessages : [userMsg];

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toSend }),
      });

      if (!res.ok) throw new Error("Error");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, ha ocurrido un error. Puedes contactarnos en info@disstands.com o al +34 937 29 78 58.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 left-4 z-50 flex h-[28rem] w-[22rem] flex-col overflow-hidden rounded-2xl border border-brand-gray bg-white shadow-2xl sm:bottom-24 sm:left-6 sm:h-[32rem] sm:w-[24rem]">
          {/* Header */}
          <div className="flex items-center gap-3 bg-brand-black px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white font-[var(--font-heading)]">
                Disstands
              </p>
              <p className="text-xs text-white/60">Asistente virtual</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-brand-red text-white"
                      : "rounded-bl-md bg-brand-cream text-brand-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-brand-cream px-4 py-3 text-sm text-brand-gray-dark">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Escribiendo…
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-brand-gray bg-white px-3 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje…"
                className="flex-1 rounded-xl border border-brand-gray bg-brand-cream px-3.5 py-2.5 text-sm text-brand-black placeholder:text-brand-gray-dark focus:border-brand-red focus:outline-none"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white transition-colors hover:bg-brand-red-dark disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating bubble button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red shadow-lg transition-all hover:scale-105 hover:bg-brand-red-dark sm:bottom-6 sm:left-6"
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>
    </>
  );
}
