import { Bold, Italic, List, Link } from 'lucide-react';
import React, { useRef } from 'react';

export function MarkdownInput({ 
  value, 
  onChange, 
  placeholder, 
  className = "h-24" 
}: { 
  value: string, 
  onChange: (v: string) => void, 
  placeholder?: string,
  className?: string
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="flex flex-col border border-[#EBEBE6] rounded-md bg-transparent overflow-hidden">
      <div className="flex items-center gap-1 border-b border-[#EBEBE6] px-2 py-1 bg-[#F9F9F7]">
        <button type="button" onClick={() => insertText('**', '**')} className="p-1 hover:bg-[#EBEBE6] rounded text-[#4A4A45]" title="Bold">
          <Bold size={12} />
        </button>
        <button type="button" onClick={() => insertText('*', '*')} className="p-1 hover:bg-[#EBEBE6] rounded text-[#4A4A45]" title="Italic">
          <Italic size={12} />
        </button>
        <button type="button" onClick={() => insertText('- ')} className="p-1 hover:bg-[#EBEBE6] rounded text-[#4A4A45]" title="List">
          <List size={12} />
        </button>
        <button type="button" onClick={() => insertText('[', '](url)')} className="p-1 hover:bg-[#EBEBE6] rounded text-[#4A4A45]" title="Link">
          <Link size={12} />
        </button>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-white text-sm border-none focus:ring-0 resize-none p-3 placeholder-[#A1A19A] outline-none ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
}
