"use client";

import { useQuery } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { getSharedBrain } from "../services/contentServices";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import {
  SharedContentCard,
  SharedContentCardProps,
} from "../components/SharedContentCard";

export default function SharedBrain() {
  const { brainId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sharedBrain", brainId],
    queryFn: () => getSharedBrain(brainId!),
    enabled: !!brainId,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error || (data && "error" in data)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Brain className="w-24 h-24 text-gray-400 mb-4" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-800 mb-2"
        >
          Oops! Access Denied
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600"
        >
          You don't have access to this brain. The share link may be invalid or
          sharing is disabled.
        </motion.p>
      </div>
    );
  }

  if (!data || !data.content || data.content.length === 0) {
    return (
      <div className="text-center">
        No data available for this shared brain.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-6 text-center">
        {data.username}'s Shared Brain
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.content.map((item: SharedContentCardProps) => (
          <SharedContentCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
