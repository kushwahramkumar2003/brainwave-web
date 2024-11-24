import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";
import Button from "./ui/button";

interface CommandResponseProps {
  content: string;
  showCopy?: boolean;
}

export function CommandResponse({
  content,
  showCopy = true,
}: CommandResponseProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy. Please try again.");
    }
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      <SyntaxHighlighter
        language="bash"
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          borderRadius: "0.5rem",
          fontSize: "0.9rem",
        }}
      >
        {content}
      </SyntaxHighlighter>
      {showCopy && (
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="absolute top-2 right-2 bg-opacity-80 hover:bg-opacity-100 transition-all"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
}
