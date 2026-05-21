import { useRef, useState } from 'react';
import { Check, FileUp, Loader2, X } from 'lucide-react';
import type { AiConfig } from '@/lib/ai-config';
import type { ResumeData } from '@/types/resume';
import type { ResumeImportSummary } from '@/lib/resume-import';

interface ImportPreview {
  data: ResumeData;
  summary: ResumeImportSummary;
}

interface ResumeImportPanelProps {
  aiConfig: AiConfig;
  onApply: (data: ResumeData) => void;
  onClose: () => void;
}

export function ResumeImportPanel({ aiConfig, onApply, onClose }: ResumeImportPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [error, setError] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const canImport = Boolean(file && aiConfig.apiKey.trim() && !isImporting);

  const handleImport = async () => {
    if (!file) return;

    setError('');
    setPreview(null);
    setIsImporting(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('aiConfig', JSON.stringify(aiConfig));

      const response = await fetch('/api/import/resume', {
        method: 'POST',
        body: formData,
      });
      const payload = await response.json();

      if (!response.ok) {
        setError(payload.error || 'Resume import failed');
        return;
      }

      setPreview(payload);
    } catch {
      setError('Resume import failed');
    } finally {
      setIsImporting(false);
    }
  };

  const applyPreview = () => {
    if (!preview) return;
    onApply(preview.data);
    setPreview(null);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <section className="border-t border-[#F0F0EB] bg-white p-4 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1A1A1A]">
            Import Resume
          </h2>
          <p className="mt-2 text-xs leading-5 text-[#666]">
            Upload Markdown or PDF. AI will parse it for review before replacing this resume.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#8C8C85] transition-colors hover:text-[#1A1A1A]"
          aria-label="Close import panel"
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        <label className="flex cursor-pointer items-center justify-between gap-3 border border-[#E5E5E0] bg-[#F9F9F7] px-4 py-3 text-xs text-[#555] transition-colors hover:bg-white">
          <span className="truncate">{file ? file.name : 'Choose .md, .markdown, or .pdf'}</span>
          <FileUp size={16} className="shrink-0" />
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,.pdf,application/pdf,text/markdown,text/plain"
            className="sr-only"
            onChange={event => {
              setFile(event.target.files?.[0] ?? null);
              setPreview(null);
              setError('');
            }}
          />
        </label>

        {!aiConfig.apiKey.trim() && (
          <p className="text-xs leading-5 text-[#8A4B20]">
            Add an API key in Design / AI Service before AI import.
          </p>
        )}

        {error && <p className="text-xs leading-5 text-red-600">{error}</p>}

        {preview && (
          <div className="border border-[#E5E5E0] bg-[#F9F9F7] p-4">
            <div className="text-sm font-semibold text-[#1A1A1A]">{preview.summary.name}</div>
            <div className="mt-1 text-xs text-[#666]">{preview.summary.title}</div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="border border-[#E5E5E0] bg-white py-2">
                <div className="text-sm font-semibold">{preview.summary.experienceCount}</div>
                <div className="text-[9px] uppercase tracking-widest text-[#8C8C85]">Roles</div>
              </div>
              <div className="border border-[#E5E5E0] bg-white py-2">
                <div className="text-sm font-semibold">{preview.summary.educationCount}</div>
                <div className="text-[9px] uppercase tracking-widest text-[#8C8C85]">Schools</div>
              </div>
              <div className="border border-[#E5E5E0] bg-white py-2">
                <div className="text-sm font-semibold">{preview.summary.projectCount}</div>
                <div className="text-[9px] uppercase tracking-widest text-[#8C8C85]">Projects</div>
              </div>
            </div>
            {preview.summary.skillsPreview.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {preview.summary.skillsPreview.map(skill => (
                  <span key={skill} className="border border-[#E5E5E0] bg-white px-2 py-1 text-[10px] text-[#555]">
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleImport}
            disabled={!canImport}
            className="flex flex-1 items-center justify-center gap-2 bg-[#1A1A1A] py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#D9D9D3]"
          >
            {isImporting ? <Loader2 size={14} className="animate-spin" /> : <FileUp size={14} />}
            Parse
          </button>
          <button
            type="button"
            onClick={applyPreview}
            disabled={!preview}
            className="flex flex-1 items-center justify-center gap-2 border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#1A1A1A] hover:text-white disabled:cursor-not-allowed disabled:border-[#D9D9D3] disabled:text-[#A8A8A0]"
          >
            <Check size={14} />
            Apply
          </button>
        </div>
      </div>
    </section>
  );
}
