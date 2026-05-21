import { useRef, useState } from 'react';
import { Check, FileUp, Loader2, X } from 'lucide-react';
import type { AiConfig } from '@/lib/ai-config';
import {
  createResumeBackup,
  parseResumeBackupText,
  type ResumeBackup,
} from '@/lib/resume-backup';
import { importCopy } from '@/lib/i18n';
import type { ResumeConfig, ResumeData } from '@/types/resume';
import type { ResumeImportSummary } from '@/lib/resume-import';

interface ImportPreview {
  data: ResumeData;
  summary: ResumeImportSummary;
}

interface ResumeImportPanelProps {
  aiConfig: AiConfig;
  data: ResumeData;
  config: ResumeConfig;
  language: ResumeConfig['language'];
  onApply: (data: ResumeData) => void;
  onRestore: (data: ResumeData, config: ResumeConfig) => void;
  onClose: () => void;
}

export function ResumeImportPanel({
  aiConfig,
  data,
  config,
  language,
  onApply,
  onRestore,
  onClose,
}: ResumeImportPanelProps) {
  const t = importCopy[language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [backupPreview, setBackupPreview] = useState<ResumeBackup | null>(null);
  const [error, setError] = useState('');
  const [backupError, setBackupError] = useState('');
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
        setError(payload.error || t.importFailed);
        return;
      }

      setPreview(payload);
    } catch {
      setError(t.importFailed);
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

  const exportBackup = () => {
    const backup = createResumeBackup(data, config);
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `prologue-resume-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importBackup = async (fileToImport: File | null) => {
    setBackupPreview(null);
    setBackupError('');
    if (!fileToImport) return;

    const parsed = parseResumeBackupText(await fileToImport.text());
    if (!parsed.ok) {
      setBackupError(parsed.error);
      return;
    }

    setBackupPreview(parsed.backup);
  };

  const applyBackup = () => {
    if (!backupPreview) return;
    onRestore(backupPreview.data, backupPreview.config);
    setBackupPreview(null);
    if (backupInputRef.current) backupInputRef.current.value = '';
  };

  return (
    <section className="border-t border-[#F0F0EB] bg-white p-4 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1A1A1A]">
            {t.title}
          </h2>
          <p className="mt-2 text-xs leading-5 text-[#666]">
            {t.body}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-[#8C8C85] transition-colors hover:text-[#1A1A1A]"
          aria-label={t.closeLabel}
        >
          <X size={16} />
        </button>
      </div>

      <div className="mt-4 grid gap-3">
        <label className="flex cursor-pointer items-center justify-between gap-3 border border-[#E5E5E0] bg-[#F9F9F7] px-4 py-3 text-xs text-[#555] transition-colors hover:bg-white">
          <span className="truncate">{file ? file.name : t.chooseFile}</span>
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
            {t.apiKeyRequired}
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
                <div className="text-[9px] uppercase tracking-widest text-[#8C8C85]">{t.roles}</div>
              </div>
              <div className="border border-[#E5E5E0] bg-white py-2">
                <div className="text-sm font-semibold">{preview.summary.educationCount}</div>
                <div className="text-[9px] uppercase tracking-widest text-[#8C8C85]">{t.schools}</div>
              </div>
              <div className="border border-[#E5E5E0] bg-white py-2">
                <div className="text-sm font-semibold">{preview.summary.projectCount}</div>
                <div className="text-[9px] uppercase tracking-widest text-[#8C8C85]">{t.projects}</div>
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
            {t.parse}
          </button>
          <button
            type="button"
            onClick={applyPreview}
            disabled={!preview}
            className="flex flex-1 items-center justify-center gap-2 border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#1A1A1A] hover:text-white disabled:cursor-not-allowed disabled:border-[#D9D9D3] disabled:text-[#A8A8A0]"
          >
            <Check size={14} />
            {t.apply}
          </button>
        </div>

        <div className="mt-3 border-t border-[#F0F0EB] pt-5">
          <h3 className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1A1A1A]">
            {t.jsonBackup}
          </h3>
          <p className="mt-2 text-xs leading-5 text-[#666]">
            {t.jsonBody}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={exportBackup}
              className="border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors hover:bg-[#1A1A1A] hover:text-white"
            >
              {t.exportJson}
            </button>
            <label className="cursor-pointer border border-[#E5E5E0] py-3 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-[#555] transition-colors hover:border-black hover:text-black">
              {t.importJson}
              <input
                ref={backupInputRef}
                type="file"
                accept=".json,application/json"
                className="sr-only"
                onChange={event => void importBackup(event.target.files?.[0] ?? null)}
              />
            </label>
          </div>

          {backupError && <p className="mt-3 text-xs leading-5 text-red-600">{backupError}</p>}

          {backupPreview && (
            <div className="mt-4 border border-[#E5E5E0] bg-[#F9F9F7] p-4">
              <div className="text-sm font-semibold text-[#1A1A1A]">
                {backupPreview.data.personalInfo.name || t.untitledCandidate}
              </div>
              <div className="mt-1 text-xs text-[#666]">
                {t.backupFrom} {new Date(backupPreview.exportedAt).toLocaleString()}
              </div>
              <div className="mt-3 text-xs leading-5 text-[#666]">
                {t.backupSummary(
                  backupPreview.data.experience.length,
                  backupPreview.data.projects.length,
                  backupPreview.config.template
                )}
              </div>
              <button
                type="button"
                onClick={applyBackup}
                className="mt-4 flex w-full items-center justify-center gap-2 bg-[#1A1A1A] py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-black"
              >
                <Check size={14} />
                {t.restoreBackup}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
