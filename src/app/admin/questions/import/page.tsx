'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Upload, Download, ArrowLeft, CheckCircle2, FileSpreadsheet, AlertCircle } from 'lucide-react';

const sampleCsv = `questionText,optionA,optionB,optionC,optionD,correctAnswer,explanation,difficulty,topic
"What is the tenure of the Comptroller and Auditor General (CAG) of India?","5 Years or 62 Years of age","6 Years or 65 Years of age","4 Years or 60 Years of age","5 Years or 65 Years of age","B","Article 148: The CAG holds office for 6 years or until reaching 65 years.","EASY","Indian Polity"
"If a train running at 72 km/h crosses a pole in 15 seconds, what is the length of the train?","250 m","300 m","350 m","400 m","B","Speed = 72 * (5/18) = 20 m/s. Length = Speed * Time = 20 * 15 = 300 meters.","MEDIUM","Speed Time Distance"`;

export default function BulkQuestionImportPage() {
  const router = useRouter();
  const [csvText, setCsvText] = useState(sampleCsv);
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const downloadSampleTemplate = () => {
    const blob = new Blob([sampleCsv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'govtprep_question_bank_template.csv';
    a.click();
  };

  const parseAndUpload = async () => {
    setLoading(true);
    setStatusMsg('');

    try {
      // Split lines and parse CSV simple parser
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setStatusMsg('Error: Please provide at least one row of question data.');
        setLoading(false);
        return;
      }

      const questions = [];
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Match quotes or commas
        const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        if (matches && matches.length >= 6) {
          const clean = matches.map((m) => m.replace(/^"|"$/g, '').trim());
          questions.push({
            questionText: clean[0],
            optionA: clean[1],
            optionB: clean[2],
            optionC: clean[3] || '',
            optionD: clean[4] || '',
            correctAnswer: clean[5] || 'A',
            explanation: clean[6] || '',
            difficulty: clean[7] || 'MEDIUM',
            topic: clean[8] || 'General',
          });
        }
      }

      const res = await fetch('/api/admin/questions/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMsg(`Success: ${data.importedCount} questions successfully added to the Question Bank!`);
        setTimeout(() => {
          router.push('/admin/questions');
          router.refresh();
        }, 1500);
      } else {
        setStatusMsg(`Error: ${data.error || 'Failed to import'}`);
      }
    } catch (err) {
      setStatusMsg('Error processing CSV text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/questions"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Bulk Data Import
            </span>
            <h1 className="text-xl font-black text-white">Import Questions via CSV / Excel</h1>
          </div>
        </div>

        <button
          onClick={downloadSampleTemplate}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" /> Download Sample Template (.CSV)
        </button>
      </div>

      {statusMsg && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
            statusMsg.startsWith('Success')
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : 'bg-rose-950/60 border-rose-800 text-rose-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-300 mb-1">
            Paste CSV Data or Edit Questions:
          </label>
          <textarea
            rows={10}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl text-xs font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
          ></textarea>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
          <span className="text-slate-500 text-[11px]">
            Format: questionText, optionA, optionB, optionC, optionD, correctAnswer, explanation, difficulty, topic
          </span>
          <button
            onClick={parseAndUpload}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {loading ? 'Processing...' : 'Upload & Import to Question Bank'}
          </button>
        </div>
      </div>

    </div>
  );
}
