"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Loader2,
  Terminal,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { toast } from "sonner";
import Button from "./ui/button";
import Input from "./ui/input";
import { axiosClient } from "../services";
import { useMutation } from "@tanstack/react-query";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  feedback?: "positive" | "negative" | null;
}

interface Command {
  key: string;
  description: string;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const aiChat = async (input: { query: string }) => {
  const response = await axiosClient.post(`brain/query`, input);
  return response.data;
};

const parseCommands = (response: string): Command[] => {
  const lines = response.split("\n").filter((line) => line.trim() !== "");
  const commands: Command[] = [];

  for (let i = 0; i < lines.length; i += 2) {
    if (i + 1 < lines.length) {
      commands.push({
        key: lines[i].trim(),
        description: lines[i + 1].trim(),
      });
    }
  }

  return commands;
};

export function AIChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const { mutate } = useMutation({
    mutationFn: aiChat,
    onSuccess: (res) => {
      const commands = parseCommands(res.response);
      const formattedContent = commands
        .map((cmd) => `${cmd.key}\n${cmd.description}`)
        .join("\n\n");

      const aiMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: formattedContent,
        timestamp: new Date(),
        feedback: null,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
      }, 1000);

      toast.success("Response received!");
    },
    onError: (error) => {
      setIsLoading(false);
      setIsTyping(false);
      toast.error("Failed to get response. Please try again.");
      console.error("Error:", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    mutate({ query: input });
  };

  const handleFeedback = (
    messageId: string,
    feedback: "positive" | "negative"
  ) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? { ...msg, feedback: msg.feedback === feedback ? null : feedback }
          : msg
      )
    );
    toast.success(`Feedback ${feedback} recorded!`);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        onClick={toggleSidebar}
        variant="secondary"
        className="relative group"
      >
        <Sparkles className="h-5 w-5 group-hover:rotate-45 transition-transform" />
        {messages.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {messages.length}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-50 w-[500px] bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl rounded-l-xl"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Terminal className="h-6 w-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Brainwave AI</h2>
              </div>
              <Button
                onClick={toggleSidebar}
                variant="ghost"
                className="hover:bg-gray-700 rounded-full"
              >
                <X className="h-5 w-5 text-gray-300" />
              </Button>
            </div>

            {/* Chat Messages Container */}
            <div
              ref={chatContainerRef}
              className="h-[calc(100vh-200px)] overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-200"
                    }`}
                  >
                    {message.content}

                    {message.role === "assistant" && (
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleFeedback(message.id, "positive")
                            }
                            className={` ${
                              message.feedback === "positive"
                                ? "text-green-500"
                                : "text-gray-400"
                            }`}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleFeedback(message.id, "negative")
                            }
                            className={`${
                              message.feedback === "negative"
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                  <p className="text-sm text-gray-300 ml-2">
                    Processing your request...
                  </p>
                </div>
              )}
              {isTyping && <TypingIndicator />}
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-gray-700 p-4"
            >
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  disabled={isLoading}
                  name="message"
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!input.trim() || isLoading}
                  endIcon={
                    isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )
                  }
                >
                  {isLoading ? "Sending..." : "Send"}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-1">
      <motion.div
        className="h-2 w-2 rounded-full bg-blue-400"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.div
        className="h-2 w-2 rounded-full bg-blue-400"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
      />
      <motion.div
        className="h-2 w-2 rounded-full bg-blue-400"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
      />
    </div>
  );
};
