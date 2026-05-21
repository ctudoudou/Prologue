import { ResumeData, ResumeConfig } from '@/types/resume';
import React from 'react';
import Markdown from 'react-markdown';
import { Mail, Phone, MapPin, GitBranch, LinkIcon, Globe, type LucideIcon } from 'lucide-react';

const isHidden = (data: ResumeData, field: string) => data.personalInfo.hiddenFields?.includes(field);

interface PreviewSectionProps {
  data: ResumeData;
  config: ResumeConfig;
}

export function PreviewSection({ data, config }: PreviewSectionProps) {
  const fontClass = config.fontFamily.includes('Noto') ? '' : config.fontFamily;
  const fontStyle = config.fontFamily.includes('Noto') ? { fontFamily: config.fontFamily } : {};

  return (
    <div 
      className="bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] mx-auto overflow-hidden relative" 
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      <div 
        className={`w-full h-full bg-white ${fontClass} relative z-10 flex flex-col`}
        style={fontStyle}
      >
        {config.template === 'modern' && <ModernTemplate data={data} config={config} />}
        {config.template === 'classic' && <ClassicTemplate data={data} config={config} />}
        {config.template === 'minimal' && <MinimalTemplate data={data} config={config} />}
        {config.template === 'creative' && <CreativeTemplate data={data} config={config} />}
        {config.template === 'professional' && <ProfessionalTemplate data={data} config={config} />}
      </div>
      
      {/* Editorial Decorative Element (Background) */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#F5F5F0] z-0 opacity-50 pointer-events-none"></div>
    </div>
  );
}

// Helper for rendering contact fields with optional icons
const ContactField = ({ icon: Icon, value, showIcon, link }: { icon: LucideIcon, value: string, showIcon: boolean, link?: string }) => {
  if (!value) return null;
  const content = (
    <span className="flex items-center gap-1.5 break-all">
      {showIcon && <Icon size={12} className="shrink-0" />}
      <span>{value}</span>
    </span>
  );
  if (link) return <a href={link} className="hover:underline">{content}</a>;
  return content;
};

// -----------------------------------------------------------------------------
// TEMPLATES
// -----------------------------------------------------------------------------

function ModernTemplate({ data, config }: { data: ResumeData, config: ResumeConfig }) {
  const { themeColor, sectionTitles, visibleSections, showIcons } = config;

  return (
    <div className="flex flex-col h-full min-h-[297mm] p-12 bg-transparent text-[#1A1A1A]">
      <header className="relative z-10 mb-10">
        <div className="flex items-center gap-6">
          {data.personalInfo.photo && (
            <img src={data.personalInfo.photo} alt={data.personalInfo.name} className="w-24 h-24 rounded-full object-cover shadow-sm bg-gray-100" />
          )}
          <div>
            <h2 
              className="font-serif text-5xl mb-2 leading-none tracking-tight" 
              style={{ color: themeColor === '#1A1A1A' ? '#1A1A1A' : themeColor }}
            >
              {data.personalInfo.name.split(' ').map((n, i, arr) => <React.Fragment key={i}>{n}{i < arr.length - 1 && <br/>}</React.Fragment>)}
            </h2>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-[12px] uppercase tracking-[0.2em] font-bold" style={{ color: themeColor === '#1A1A1A' ? '#8C8C85' : themeColor }}>{data.personalInfo.title}</p>
              <div className="h-[1px] flex-1 opacity-20" style={{ backgroundColor: themeColor }}></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex gap-10">
        <div className="w-[180px] space-y-8 flex-shrink-0">
          <section>
            <div className="text-[11px] leading-relaxed space-y-2">
              {!isHidden(data, 'email') && <ContactField icon={Mail} value={data.personalInfo.email} showIcon={showIcons} />}
              {!isHidden(data, 'phone') && <ContactField icon={Phone} value={data.personalInfo.phone} showIcon={showIcons} />}
              {!isHidden(data, 'location') && <ContactField icon={MapPin} value={data.personalInfo.location} showIcon={showIcons} />}
              {!isHidden(data, 'website') && <ContactField icon={Globe} value={data.personalInfo.website} showIcon={showIcons} />}
              {!isHidden(data, 'github') && <ContactField icon={GitBranch} value={data.personalInfo.github} showIcon={showIcons} />}
              {!isHidden(data, 'linkedin') && <ContactField icon={LinkIcon} value={data.personalInfo.linkedin} showIcon={showIcons} />}
            </div>
          </section>

          {data.personalInfo.customFields && data.personalInfo.customFields.length > 0 && (
            <section>
               <div className="text-[11px] leading-relaxed break-all space-y-2 mt-4">
                 {data.personalInfo.customFields.map((field) => (
                   <div key={field.id}>
                     <span className="block font-bold text-[10px] uppercase mb-0.5" style={{ color: themeColor }}>{field.label}</span>
                     <span className="block">{field.value}</span>
                   </div>
                 ))}
               </div>
            </section>
          )}

          {visibleSections.skills && data.skills && (
            <section>
              <h3 className="text-[10px] uppercase tracking-widest font-black mb-3 border-b pb-1" style={{ borderColor: themeColor }}>{sectionTitles.skills}</h3>
              <div className="text-[11px] space-y-1.5 list-none markdown-body prose prose-sm prose-p:my-1 prose-ul:my-1 w-full">
                <Markdown>{data.skills}</Markdown>
              </div>
            </section>
          )}
        </div>

        <div className="flex-1 space-y-10">
          {visibleSections.summary && data.summary && (
            <section>
              <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold mb-4" style={{ color: themeColor === '#1A1A1A' ? '#8C8C85' : themeColor }}>{sectionTitles.summary}</h3>
              <div className="text-[13px] font-serif leading-relaxed opacity-90 border-l-2 pl-4 markdown-body text-[#4A4A45]" style={{ borderColor: themeColor }}>
                <Markdown>{data.summary}</Markdown>
              </div>
            </section>
          )}

          {visibleSections.experience && data.experience.length > 0 && (
            <section>
              <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold mb-4" style={{ color: themeColor === '#1A1A1A' ? '#8C8C85' : themeColor }}>{sectionTitles.experience}</h3>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-serif italic font-bold text-[#1A1A1A]">{exp.company}</h4>
                      <span className="text-[10px] font-mono uppercase text-[#A1A19A]">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <p className="text-[12px] font-bold text-[#4A4A45] mb-2">{exp.role}</p>
                    <div className="text-[12px] leading-relaxed text-[#4A4A45] whitespace-pre-wrap markdown-body">
                      <Markdown>{exp.description}</Markdown>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibleSections.education && data.education.length > 0 && (
            <section>
              <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold mb-4" style={{ color: themeColor === '#1A1A1A' ? '#8C8C85' : themeColor }}>{sectionTitles.education}</h3>
              <div className="space-y-6">
                {data.education.map(ed => (
                  <div key={ed.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-serif italic font-bold text-[#1A1A1A]">{ed.school}</h4>
                      <span className="text-[10px] font-mono uppercase text-[#A1A19A]">{ed.startDate} — {ed.endDate}</span>
                    </div>
                    <p className="text-[12px] font-bold text-[#4A4A45] mb-1">{ed.degree}</p>
                    {ed.description && <div className="text-[12px] leading-relaxed text-[#4A4A45] whitespace-pre-wrap markdown-body"><Markdown>{ed.description}</Markdown></div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibleSections.projects && data.projects.length > 0 && (
            <section>
              <h3 className="text-[11px] uppercase tracking-[0.15em] font-bold mb-4" style={{ color: themeColor === '#1A1A1A' ? '#8C8C85' : themeColor }}>{sectionTitles.projects}</h3>
              <div className="space-y-6">
                {data.projects.map(proj => (
                  <div key={proj.id}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h4 className="text-sm font-serif italic font-bold text-[#1A1A1A]">{proj.name}</h4>
                      {proj.link && <span className="text-[10px] font-mono text-[#A1A19A] break-all">{proj.link}</span>}
                    </div>
                    <div className="text-[12px] leading-relaxed text-[#4A4A45] whitespace-pre-wrap markdown-body"><Markdown>{proj.description}</Markdown></div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      
      <footer className="mt-auto pt-6 border-t flex justify-between items-center" style={{ borderColor: themeColor === '#1A1A1A' ? '#F0F0EB' : themeColor + '40' }}>
        <span className="text-[9px] tracking-widest uppercase font-bold text-[#D9D9D3]">{data.personalInfo.name} Portfolio</span>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D9D9D3]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D9D9D3]"></div>
        </div>
      </footer>
    </div>
  );
}


function ClassicTemplate({ data, config }: { data: ResumeData, config: ResumeConfig }) {
  const { themeColor, sectionTitles, visibleSections, showIcons } = config;

  return (
    <div className="p-12 min-h-[297mm] bg-white">
      {/* Header */}
      <div className="text-center mb-8 border-b-2 pb-6" style={{ borderColor: themeColor }}>
        {data.personalInfo.photo && (
          <div className="flex justify-center mb-4">
             <img src={data.personalInfo.photo} alt={data.personalInfo.name} className="w-24 h-24 rounded-full object-cover border-4" style={{ borderColor: themeColor }} />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2 text-gray-900 font-serif">{data.personalInfo.name}</h1>
        <h2 className="text-xl font-medium mb-3 text-gray-700" style={{ color: themeColor }}>{data.personalInfo.title}</h2>
        
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-gray-600">
          {!isHidden(data, 'email') && <ContactField icon={Mail} value={data.personalInfo.email} showIcon={showIcons} />}
          {!isHidden(data, 'phone') && <ContactField icon={Phone} value={data.personalInfo.phone} showIcon={showIcons} />}
          {!isHidden(data, 'location') && <ContactField icon={MapPin} value={data.personalInfo.location} showIcon={showIcons} />}
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-gray-600 mt-1">
          {!isHidden(data, 'linkedin') && <ContactField icon={LinkIcon} value={data.personalInfo.linkedin} showIcon={showIcons} />}
          {!isHidden(data, 'github') && <ContactField icon={GitBranch} value={data.personalInfo.github} showIcon={showIcons} />}
          {!isHidden(data, 'website') && <ContactField icon={Globe} value={data.personalInfo.website} showIcon={showIcons} />}
        </div>

        {data.personalInfo.customFields && data.personalInfo.customFields.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-gray-600 mt-1">
            {data.personalInfo.customFields.map((field, index) => (
              <React.Fragment key={field.id}>
                <span>{field.label}: {field.value}</span>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      {visibleSections.summary && data.summary && (
        <div className="mb-6">
          <div className="text-[13.5px] leading-relaxed text-gray-700 text-justify markdown-body"><Markdown>{data.summary}</Markdown></div>
        </div>
      )}

      {/* Experience */}
      {visibleSections.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-900 border-b" style={{ borderColor: themeColor }}>{sectionTitles.experience}</h3>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-end mb-1">
                  <h4 className="text-[15px] font-bold text-gray-900">{exp.role}</h4>
                  <span className="text-sm font-medium text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</div>
                <div className="text-[13px] leading-relaxed text-gray-700 whitespace-pre-wrap ml-4 markdown-body">
                  <Markdown>{exp.description}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {visibleSections.education && data.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-900 border-b" style={{ borderColor: themeColor }}>{sectionTitles.education}</h3>
          <div className="space-y-4">
            {data.education.map(ed => (
              <div key={ed.id}>
                <div className="flex justify-between items-end mb-1">
                  <h4 className="text-[15px] font-bold text-gray-900">{ed.degree}</h4>
                  <span className="text-sm font-medium text-gray-600">{ed.startDate} - {ed.endDate}</span>
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: themeColor }}>{ed.school}</div>
                {ed.description && <div className="text-[13px] text-gray-700 ml-4 markdown-body"><Markdown>{ed.description}</Markdown></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {visibleSections.projects && data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-900 border-b" style={{ borderColor: themeColor }}>{sectionTitles.projects}</h3>
          <div className="space-y-4">
            {data.projects.map(proj => (
              <div key={proj.id}>
                <div className="flex justify-between items-end mb-1">
                  <h4 className="text-[15px] font-bold text-gray-900">{proj.name}</h4>
                  {proj.link && <span className="text-sm font-medium text-gray-600">{proj.link}</span>}
                </div>
                <div className="text-[13px] leading-relaxed text-gray-700 whitespace-pre-wrap ml-4 markdown-body">
                  <Markdown>{proj.description}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {visibleSections.skills && data.skills && (
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider mb-3 text-gray-900 border-b" style={{ borderColor: themeColor }}>{sectionTitles.skills}</h3>
          <div className="text-[13.5px] leading-relaxed text-gray-700 markdown-body">
            <Markdown>{data.skills}</Markdown>
          </div>
        </div>
      )}
    </div>
  );
}


function MinimalTemplate({ data, config }: { data: ResumeData, config: ResumeConfig }) {
  const { themeColor, sectionTitles, visibleSections, showIcons } = config;

  return (
    <div className="p-12 min-h-[297mm] bg-white">
      {/* Header */}
      <div className="grid grid-cols-[1fr_2fr] gap-8 mb-12">
        <div className="flex flex-col gap-4">
          {data.personalInfo.photo && (
            <img src={data.personalInfo.photo} alt={data.personalInfo.name} className="w-16 h-16 rounded-md object-cover bg-gray-50" />
          )}
          <div>
            <h1 className="text-3xl font-light mb-1 text-gray-900">{data.personalInfo.name}</h1>
            <h2 className="text-sm font-medium uppercase tracking-widest text-gray-500">{data.personalInfo.title}</h2>
          </div>
        </div>
        <div className="text-[11px] text-gray-500 uppercase tracking-wider flex justify-end flex-wrap gap-y-2 gap-x-6">
          <div className="flex flex-col gap-1 items-end">
            {!isHidden(data, 'email') && <ContactField icon={Mail} value={data.personalInfo.email} showIcon={showIcons} />}
            {!isHidden(data, 'phone') && <ContactField icon={Phone} value={data.personalInfo.phone} showIcon={showIcons} />}
            {data.personalInfo.customFields?.map(f => (
               <span key={f.id}>{f.label}: {f.value}</span>
            ))}
          </div>
          <div className="flex flex-col gap-1 items-end">
            {!isHidden(data, 'location') && <ContactField icon={MapPin} value={data.personalInfo.location} showIcon={showIcons} />}
            {!isHidden(data, 'linkedin') && <ContactField icon={LinkIcon} value={data.personalInfo.linkedin} showIcon={showIcons} />}
            {!isHidden(data, 'github') && <ContactField icon={GitBranch} value={data.personalInfo.github} showIcon={showIcons} />}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-8">
        {/* Left Column */}
        <div className="space-y-10">
          {visibleSections.summary && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ color: themeColor }}>{sectionTitles.summary}</h3>
              <div className="text-xs leading-relaxed text-gray-600 markdown-body"><Markdown>{data.summary}</Markdown></div>
            </div>
          )}

          {visibleSections.skills && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4" style={{ color: themeColor }}>{sectionTitles.skills}</h3>
              <div className="flex flex-col gap-1.5 markdown-body">
                <Markdown>{data.skills}</Markdown>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {visibleSections.experience && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6" style={{ color: themeColor }}>{sectionTitles.experience}</h3>
              <div className="space-y-8">
                {data.experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-sm font-bold text-gray-900">{exp.company}</h4>
                      <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{exp.startDate} — {exp.endDate}</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-700 mb-3">{exp.role}</div>
                    <div className="text-xs leading-relaxed text-gray-600 whitespace-pre-wrap ml-1 markdown-body">
                      <Markdown>{exp.description}</Markdown>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {visibleSections.education && (
            <div>
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6" style={{ color: themeColor }}>{sectionTitles.education}</h3>
               <div className="space-y-6">
                  {data.education.map(ed => (
                    <div key={ed.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-sm font-bold text-gray-900">{ed.school}</h4>
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{ed.startDate} — {ed.endDate}</span>
                      </div>
                      <div className="text-xs font-semibold text-gray-700 mb-2">{ed.degree}</div>
                      {ed.description && <div className="text-xs leading-relaxed text-gray-600 ml-1 markdown-body"><Markdown>{ed.description}</Markdown></div>}
                    </div>
                  ))}
              </div>
            </div>
          )}
          
          {visibleSections.projects && data.projects && data.projects.length > 0 && (
            <div>
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6" style={{ color: themeColor }}>{sectionTitles.projects}</h3>
               <div className="space-y-6">
                  {data.projects.map(proj => (
                    <div key={proj.id}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-sm font-bold text-gray-900">{proj.name}</h4>
                        {proj.link && <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{proj.link}</span>}
                      </div>
                      <div className="text-xs leading-relaxed text-gray-600 ml-1 markdown-body"><Markdown>{proj.description}</Markdown></div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// NEW TEMPLATES
// -----------------------------------------------------------------------------

function CreativeTemplate({ data, config }: { data: ResumeData, config: ResumeConfig }) {
  const { themeColor, sectionTitles, visibleSections, showIcons } = config;

  return (
    <div className="h-full min-h-[297mm] bg-[#FAFAFA] flex flex-col">
      <div className="w-full text-white p-12 relative overflow-hidden" style={{ backgroundColor: themeColor }}>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
         <div className="flex justify-between items-end relative z-10">
           <div className="flex items-center gap-6">
             {data.personalInfo.photo && (
               <img src={data.personalInfo.photo} alt={data.personalInfo.name} className="w-28 h-28 rounded-xl object-cover shadow-lg border-2 border-white/20" />
             )}
             <div>
               <h1 className="text-5xl font-black mb-2 tracking-tight">{data.personalInfo.name}</h1>
               <h2 className="text-xl font-medium opacity-90">{data.personalInfo.title}</h2>
             </div>
           </div>
           <div className="text-right text-[11px] opacity-90 space-y-1.5 flex flex-col items-end">
              {!isHidden(data, 'email') && <ContactField icon={Mail} value={data.personalInfo.email} showIcon={showIcons} />}
              {!isHidden(data, 'phone') && <ContactField icon={Phone} value={data.personalInfo.phone} showIcon={showIcons} />}
              {!isHidden(data, 'location') && <ContactField icon={MapPin} value={data.personalInfo.location} showIcon={showIcons} />}
              {!isHidden(data, 'website') && <ContactField icon={Globe} value={data.personalInfo.website} showIcon={showIcons} />}
           </div>
         </div>
      </div>
      
      <div className="flex-1 p-12 grid grid-cols-[2fr_1fr] gap-12">
        <div className="space-y-10">
          {visibleSections.summary && data.summary && (
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: themeColor }}>
                <span className="w-8 h-1 rounded-full" style={{ backgroundColor: themeColor }}></span> {sectionTitles.summary}
              </h3>
              <div className="text-sm leading-relaxed text-gray-700 markdown-body">
                <Markdown>{data.summary}</Markdown>
              </div>
            </section>
          )}

          {visibleSections.experience && data.experience.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: themeColor }}>
                <span className="w-8 h-1 rounded-full" style={{ backgroundColor: themeColor }}></span> {sectionTitles.experience}
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[11px] before:w-[2px] before:bg-gray-200 pl-8">
                {data.experience.map((exp, idx) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute w-6 h-6 rounded-full border-4 border-white -left-8 top-0 shadow-sm" style={{ backgroundColor: themeColor }}></div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-base font-bold text-gray-900">{exp.role}</h4>
                          <h5 className="text-sm font-medium" style={{ color: themeColor }}>{exp.company}</h5>
                        </div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-2 markdown-body">
                        <Markdown>{exp.description}</Markdown>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {visibleSections.education && data.education.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: themeColor }}>
                <span className="w-8 h-1 rounded-full" style={{ backgroundColor: themeColor }}></span> {sectionTitles.education}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {data.education.map(ed => (
                  <div key={ed.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 border-l-4" style={{ borderLeftColor: themeColor }}>
                    <h4 className="text-base font-bold text-gray-900">{ed.degree}</h4>
                    <h5 className="text-sm font-medium mt-1 mb-2" style={{ color: themeColor }}>{ed.school}</h5>
                    <span className="text-xs font-medium text-gray-500 block mb-2">{ed.startDate} - {ed.endDate}</span>
                    {ed.description && <div className="text-sm text-gray-600 markdown-body"><Markdown>{ed.description}</Markdown></div>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: themeColor }}>
               Links
            </h3>
            <div className="space-y-4">
              {!isHidden(data, 'linkedin') && <ContactField icon={LinkIcon} value={data.personalInfo.linkedin} showIcon={showIcons} link={data.personalInfo.linkedin} />}
              {!isHidden(data, 'github') && <ContactField icon={GitBranch} value={data.personalInfo.github} showIcon={showIcons} link={data.personalInfo.github} />}
              {data.personalInfo.customFields?.map(f => (
                <div key={f.id} className="flex flex-col">
                  <span className="text-xs font-bold text-gray-400 uppercase">{f.label}</span>
                  <span className="text-sm">{f.value}</span>
                </div>
              ))}
            </div>
          </section>

          {visibleSections.skills && data.skills && (
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: themeColor }}>
                 {sectionTitles.skills}
              </h3>
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 markdown-body prose prose-sm">
                <Markdown>{data.skills}</Markdown>
              </div>
            </section>
          )}

          {visibleSections.projects && data.projects.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: themeColor }}>
                 {sectionTitles.projects}
              </h3>
              <div className="space-y-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <h4 className="text-base font-bold text-gray-900">{proj.name}</h4>
                    {proj.link && <a href={proj.link} className="text-xs text-blue-500 hover:underline mb-2 block">{proj.link}</a>}
                    <div className="text-sm text-gray-600 markdown-body">
                      <Markdown>{proj.description}</Markdown>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfessionalTemplate({ data, config }: { data: ResumeData, config: ResumeConfig }) {
  const { themeColor, sectionTitles, visibleSections, showIcons } = config;

  return (
    <div className="p-12 min-h-[297mm] bg-white border-t-8" style={{ borderColor: themeColor }}>
      <div className="flex justify-between items-center mb-8 border-b-2 pb-6 border-gray-100">
        <div className="flex items-center gap-6">
          {data.personalInfo.photo && (
            <img src={data.personalInfo.photo} alt={data.personalInfo.name} className="w-20 h-20 rounded-md object-cover shadow-sm bg-gray-50 border" />
          )}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1" style={{ color: themeColor }}>{data.personalInfo.name.toUpperCase()}</h1>
            <h2 className="text-xl text-gray-600 font-medium tracking-wide">{data.personalInfo.title}</h2>
          </div>
        </div>
        <div className="text-right text-xs md:text-sm text-gray-600 space-y-1">
          {!isHidden(data, 'email') && <div className="flex justify-end"><ContactField icon={Mail} value={data.personalInfo.email} showIcon={showIcons} /></div>}
          {!isHidden(data, 'phone') && <div className="flex justify-end"><ContactField icon={Phone} value={data.personalInfo.phone} showIcon={showIcons} /></div>}
          {!isHidden(data, 'location') && <div className="flex justify-end"><ContactField icon={MapPin} value={data.personalInfo.location} showIcon={showIcons} /></div>}
          {!isHidden(data, 'linkedin') && <div className="flex justify-end"><ContactField icon={LinkIcon} value={data.personalInfo.linkedin} showIcon={showIcons} /></div>}
          {!isHidden(data, 'github') && <div className="flex justify-end"><ContactField icon={GitBranch} value={data.personalInfo.github} showIcon={showIcons} /></div>}
        </div>
      </div>

      {visibleSections.summary && data.summary && (
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-2 border-b-2 pb-1 inline-block" style={{ borderBottomColor: themeColor }}>{sectionTitles.summary}</h3>
          <div className="text-[14px] leading-relaxed text-gray-700 markdown-body"><Markdown>{data.summary}</Markdown></div>
        </div>
      )}

      {visibleSections.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4 border-b-2 pb-1 inline-block" style={{ borderBottomColor: themeColor }}>{sectionTitles.experience}</h3>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-gray-900">{exp.role}</h4>
                  <span className="text-sm font-semibold text-gray-600">{exp.startDate} - {exp.endDate}</span>
                </div>
                <h5 className="text-sm font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</h5>
                <div className="text-[13.5px] leading-relaxed text-gray-700 markdown-body">
                  <Markdown>{exp.description}</Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {visibleSections.education && data.education.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4 border-b-2 pb-1 inline-block" style={{ borderBottomColor: themeColor }}>{sectionTitles.education}</h3>
          <div className="space-y-4">
            {data.education.map(ed => (
              <div key={ed.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-base font-bold text-gray-900">{ed.degree}</h4>
                  <span className="text-sm font-semibold text-gray-600">{ed.startDate} - {ed.endDate}</span>
                </div>
                <h5 className="text-sm font-semibold mb-1" style={{ color: themeColor }}>{ed.school}</h5>
                {ed.description && <div className="text-[13.5px] text-gray-700 markdown-body"><Markdown>{ed.description}</Markdown></div>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {visibleSections.skills && data.skills && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4 border-b-2 pb-1 inline-block" style={{ borderBottomColor: themeColor }}>{sectionTitles.skills}</h3>
            <div className="text-[13.5px] leading-relaxed text-gray-700 markdown-body">
              <Markdown>{data.skills}</Markdown>
            </div>
          </div>
        )}

        {visibleSections.projects && data.projects && data.projects.length > 0 && (
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-800 mb-4 border-b-2 pb-1 inline-block" style={{ borderBottomColor: themeColor }}>{sectionTitles.projects}</h3>
            <div className="space-y-4">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-[14px] font-bold text-gray-900">{proj.name}</h4>
                  </div>
                  {proj.link && <a href={proj.link} className="text-xs text-blue-600 hover:underline mb-1 block">{proj.link}</a>}
                  <div className="text-[13px] leading-relaxed text-gray-700 markdown-body">
                    <Markdown>{proj.description}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
