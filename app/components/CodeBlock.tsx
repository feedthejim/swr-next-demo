"use client";
import { useState } from "react";

interface CodeBlockProps {
  title: string;
  code: string;
}

export function CodeBlock({ title, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
        <span className="text-gray-300 text-sm font-mono">{title}</span>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm">
          <code className="text-gray-300 whitespace-pre font-mono leading-relaxed">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}