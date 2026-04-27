"use client";

import { useState } from "react";
import NDAForm from "@/app/components/NDAForm";
import NDAPreview from "@/app/components/NDAPreview";
import { NDAFormData, defaultFormData } from "@/app/lib/ndaTypes";
import { generateNDAMarkdown, downloadMarkdown } from "@/app/lib/ndaGenerator";

export default function Home() {
  const [formData, setFormData] = useState<NDAFormData>(defaultFormData);
  const markdown = generateNDAMarkdown(formData);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Mutual NDA Creator</h1>
            <p className="text-sm text-gray-500">
              Powered by{" "}
              <a
                href="https://commonpaper.com"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Common Paper
              </a>{" "}
              · CC BY 4.0
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => downloadMarkdown(formData)}
              className="rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Download .md
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 print:block">
        {/* Form panel */}
        <aside className="bg-white rounded-lg border border-gray-200 p-6 print:hidden">
          <h2 className="text-base font-semibold text-gray-900 mb-5">
            Agreement Details
          </h2>
          <NDAForm data={formData} onChange={setFormData} />
        </aside>

        {/* Preview panel */}
        <section className="bg-white rounded-lg border border-gray-200 p-8 print:border-none print:p-0 print:rounded-none">
          <div className="flex items-center justify-between mb-5 print:hidden">
            <h2 className="text-base font-semibold text-gray-900">Preview</h2>
            <span className="text-xs text-gray-400">Updates as you type</span>
          </div>
          <NDAPreview markdown={markdown} />
        </section>
      </div>
    </div>
  );
}
