"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { Toaster, toast } from "sonner";
import Dialog, { DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Button from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "../services";
import config from "../config";

interface ShareBrainProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemCount?: number;
  onShare?: () => Promise<string>;
}

export default function ShareBrain(
  {
    open,
    onOpenChange,
    itemCount = 0,
    onShare = async () => {
      const res = await axiosClient.post("/brain/share", {
        share: true,
      });
      return res.data.link;
    },
  }: ShareBrainProps = {
    open: false,
    onOpenChange: () => {},
    itemCount: 0,
  }
) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const { mutate, isPaused: isSharing } = useMutation({
    mutationFn: onShare,
    onSuccess: (res) => {
      setShareUrl(`${config.frontEndUrl}/b/brain/${res}`);
      toast.success("Brain shared successfully!");
    },
    onError: () => {
      toast.error("Failed to share brain. Please try again.");
    },
  });

  const handleShare = async () => {
    try {
      await mutate();
    } catch (error) {
      toast.error("Failed to share brain. Please try again.");
    }
  };

  const handleCopy = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Dialog.Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden">
          <div className="px-6 py-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                Share Your Second Brain
              </DialogTitle>
            </DialogHeader>

            <div className="mt-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                Share your entire collection of notes, documents, tweets, and
                videos with others. They&apos;ll be able to import your content
                into their own Second Brain.
              </p>

              {shareUrl ? (
                <div className="mt-4 animate-fade-in">
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="shrink-0"
                      startIcon={<Copy className="h-4 w-4" />}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  startIcon={<Copy size={17} />}
                  className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleShare}
                  isLoading={isSharing}
                  text="Share Brain"
                />
              )}

              <div className="mt-4 text-center text-sm text-gray-500">
                {itemCount} {itemCount === 1 ? "item" : "items"} will be shared
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog.Dialog>
    </>
  );
}
