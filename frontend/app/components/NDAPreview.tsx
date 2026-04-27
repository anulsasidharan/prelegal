"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  markdown: string;
}

export default function NDAPreview({ markdown }: Props) {
  return (
    <div
      id="nda-preview"
      className="prose prose-sm max-w-none text-gray-900
        prose-headings:font-bold prose-headings:text-gray-900
        prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
        prose-table:text-xs prose-td:py-1 prose-th:py-1
        prose-hr:my-6"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
