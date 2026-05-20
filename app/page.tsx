'use client';

import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FormSection } from '@/components/FormSection';
import { PreviewSection } from '@/components/PreviewSection';
import { ResumeData, ResumeConfig } from '@/types/resume';
import { Download, LayoutTemplate, Palette, Type, Eye, Edit2 } from 'lucide-react';

const initialData: ResumeData = {
  personalInfo: {
    name: 'Jane Doe',
    title: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    github: 'github.com/janedoe',
    linkedin: 'linkedin.com/in/janedoe',
    website: 'janedoe.dev'
  },
  summary: 'Passionate software engineer with 5+ years of experience building scalable web applications. Strong expertise in React, Node.js, and cloud architecture. Dedicated to delivering high-quality code and improving team efficiency.',
  experience: [
    {
      id: '1',
      company: 'Tech Solutions Inc.',
      role: 'Senior Software Engineer',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: '- Architected and developed a microservices-based application serving 1M+ active users.\\n- Mentored junior developers and led code reviews.\\n- Improved CI/CD pipeline, reducing deployment time by 40%.'
    },
    {
      id: '2',
      company: 'Web Innovations LLC',
      role: 'Full Stack Developer',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      description: '- Built responsive front-end interfaces using React and Redux.\\n- Designed RESTful APIs in Node.js and Express.\\n- Optimized database queries, improving page load speeds by 25%.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      startDate: 'Sep 2014',
      endDate: 'May 2018',
      description: 'Graduated with Honors. Coursework included Data Structures, Algorithms, and Distributed Systems.'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'OpenSource Dashboard',
      description: 'An open-source analytics dashboard built with Next.js and Tailwind CSS used by 500+ developers.',
      link: 'github.com/janedoe/dashboard'
    }
  ],
  skills: 'JavaScript, TypeScript, React, Next.js, Node.js, Python, AWS, Docker'
};

const initialConfig: ResumeConfig = {
  themeColor: '#0f172a',
  fontFamily: 'font-sans',
  template: 'modern',
  language: 'en',
  showIcons: false,
  sectionTitles: {
    summary: 'Profile',
    experience: 'Experience',
    education: 'Education',
    projects: 'Projects',
    skills: 'Skills',
  },
  visibleSections: {
    summary: true,
    experience: true,
    education: true,
    projects: true,
    skills: true,
  }
};

const navItems = [
  { id: 'design', label: 'Design' },
  { id: 'personal', label: 'Personal' },
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
];

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(initialData);
  const [config, setConfig] = useState<ResumeConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [activeNav, setActiveNav] = useState('design');
  
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#F5F5F0] overflow-hidden font-sans text-[#1A1A1A]">
      {/* Mobile Tab Navigation */}
      <div className="md:hidden flex border-b border-[#D9D9D3] bg-white shrink-0">
        <button 
          onClick={() => setActiveTab('edit')} 
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'border-b-2 border-black text-black' : 'text-[#8C8C85]'}`}
        >
          <Edit2 size={14} /> Editor
        </button>
        <button 
          onClick={() => setActiveTab('preview')} 
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'border-b-2 border-black text-black' : 'text-[#8C8C85]'}`}
        >
          <Eye size={14} /> Preview
        </button>
      </div>

      {/* Left Configuration Panel */}
      <aside className={`w-full md:w-[600px] xl:w-[650px] h-full border-r border-[#D9D9D3] bg-white shadow-sm flex-col shrink-0 ${activeTab === 'edit' ? 'flex' : 'hidden md:flex'}`}>
        <header className="p-4 md:p-6 border-b border-[#F0F0EB] shrink-0 bg-white z-10">
          <h1 className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold text-[#8C8C85] mb-1">Resume Engine</h1>
          <p className="text-lg md:text-xl font-serif italic text-[#333]">Editorial Suite</p>
        </header>

        <div className="flex-1 overflow-hidden flex flex-row">
          {/* Menu Column */}
          <div className="w-[120px] md:w-[160px] bg-[#F9F9F7] border-r border-[#E5E5E0] overflow-y-auto shrink-0 flex flex-col py-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`text-left px-4 md:px-6 py-4 text-[10px] font-bold uppercase tracking-widest transition-colors border-l-2
                  ${activeNav === item.id 
                    ? 'border-black text-black bg-white' 
                    : 'border-transparent text-[#8C8C85] hover:text-black hover:bg-[#F5F5F0]'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Details Column */}
          <div className="flex-1 overflow-y-auto bg-white p-4 md:p-8">
            <FormSection activeNav={activeNav} data={data} setData={setData} config={config} setConfig={setConfig} />
          </div>
        </div>

        <footer className="p-4 md:p-6 bg-[#F9F9F7] border-t border-[#F0F0EB] flex gap-3 shrink-0">
          <button className="flex-1 py-3 border border-black text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-[#1A1A1A] hover:text-white transition-colors">Share</button>
          <button 
            onClick={() => reactToPrintFn()}
            className="flex-1 py-3 bg-[#1A1A1A] text-white text-[10px] md:text-[11px] uppercase tracking-[0.15em] font-bold hover:bg-black transition-colors"
          >
            Export PDF
          </button>
        </footer>
      </aside>

      {/* Right PDF Preview Panel */}
      <main className={`flex-1 h-full flex-col items-center justify-start p-2 md:p-8 overflow-y-auto overflow-x-hidden relative ${activeTab === 'preview' ? 'flex' : 'hidden md:flex'}`}>
        <div className="absolute inset-0 bg-[#E6E6E1] z-0 pointer-events-none"></div>
        <div className="w-full flex justify-center py-4 md:py-0 z-10">
          <div className="scale-[0.45] sm:scale-[0.6] md:scale-75 xl:scale-95 2xl:scale-100 transform origin-top transition-transform shrink-0">
            <PreviewSection contentRef={contentRef} data={data} config={config} />
          </div>
        </div>
      </main>
    </div>
  );
}
