'use client';

import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Terminal, Sparkles, ShieldCheck } from 'lucide-react';

export default function ApiDocsPage() {
  useEffect(() => {
    // Inject Swagger UI bundle and stylesheet dynamically
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui.css';
    document.head.appendChild(link);

    const scriptBundle = document.createElement('script');
    scriptBundle.src = 'https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-bundle.js';
    scriptBundle.async = true;

    const scriptPreset = document.createElement('script');
    scriptPreset.src = 'https://unpkg.com/swagger-ui-dist@5.18.2/swagger-ui-standalone-preset.js';
    scriptPreset.async = true;

    scriptBundle.onload = () => {
      if ((window as any).SwaggerUIBundle) {
        (window as any).SwaggerUIBundle({
          url: '/api/docs/spec',
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [
            (window as any).SwaggerUIBundle.presets.apis,
            (window as any).SwaggerUIBundle.SwaggerUIStandalonePreset,
          ],
          plugins: [(window as any).SwaggerUIBundle.plugins.DownloadUrl],
          layout: 'StandaloneLayout',
        });
      }
    };

    document.body.appendChild(scriptBundle);
    document.body.appendChild(scriptPreset);

    return () => {
      try {
        document.head.removeChild(link);
        document.body.removeChild(scriptBundle);
        document.body.removeChild(scriptPreset);
      } catch {
        // Ignore cleanup error
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 py-4 px-4 sm:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Return to Home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm">
                API
              </div>
              <div>
                <h1 className="text-base font-bold flex items-center gap-2">
                  GovtPrep & TechPrep REST API Docs
                  <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                    OpenAPI 3.0
                  </span>
                </h1>
                <p className="text-xs text-slate-400">Interactive Swagger Explorer & Request Console</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/docs/spec"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Raw JSON Spec</span>
            </a>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow transition-colors"
            >
              Back to Portal
            </Link>
          </div>
        </div>
      </header>

      {/* Swagger Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-8">
          <div id="swagger-ui" className="swagger-container" />
        </div>
      </main>
    </div>
  );
}
