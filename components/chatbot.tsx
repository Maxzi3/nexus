"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setMessages((prev) => [
      ...prev,
      "Please email us at support@yourcompany.com for assistance.",
    ]);
    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Chat Window */}
      {open && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 flex flex-col shadow-xl z-50">
          <div className="p-4 border-b bg-primary text-primary-foreground font-semibold">
            Customer Support
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <p className="text-sm bg-muted p-3 rounded-lg max-w-xs">
              Hello! How can we help you today?
            </p>
            {messages.map((msg, i) =>
              i % 2 === 0 ? (
                <p
                  key={i}
                  className="text-sm bg-primary text-primary-foreground p-3 rounded-lg max-w-xs ml-auto"
                >
                  {msg}
                </p>
              ) : (
                <p key={i} className="text-sm bg-muted p-3 rounded-lg max-w-xs">
                  {msg}
                </p>
              )
            )}
          </div>

          <div className="p-4 border-t flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        </Card>
      )}
    </>
  );
}
