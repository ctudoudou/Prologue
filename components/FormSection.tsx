import { ResumeData, ResumeConfig, Experience, Education, Project, CustomField } from '@/types/resume';
import { Sparkles, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { MarkdownInput } from './MarkdownInput';
import type { AiConfig } from '@/lib/ai-config';
import type { EnhanceFieldType } from '@/lib/enhance';
import { formCopy } from '@/lib/i18n';

interface FormSectionProps {
  activeNav: string;
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  config: ResumeConfig;
  setConfig: React.Dispatch<React.SetStateAction<ResumeConfig>>;
  aiConfig: AiConfig;
  language: ResumeConfig['language'];
}

const templateOptions: ResumeConfig['template'][] = [
  'modern',
  'minimal',
  'classic',
  'creative',
  'professional',
];

export function FormSection({ activeNav, data, setData, config, setConfig, aiConfig, language }: FormSectionProps) {
  const [enhancingInfo, setEnhancingInfo] = useState<{ field: string, id?: string } | null>(null);
  const t = formCopy[language];

  const updatePersonalInfo = (field: keyof typeof data.personalInfo, value: string | CustomField[] | string[]) => {
    setData({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const toggleHiddenField = (field: string) => {
    const hidden = data.personalInfo.hiddenFields || [];
    if (hidden.includes(field)) {
      updatePersonalInfo('hiddenFields', hidden.filter(f => f !== field));
    } else {
      updatePersonalInfo('hiddenFields', [...hidden, field]);
    }
  };

  const addCustomField = () => {
    const fields = data.personalInfo.customFields || [];
    updatePersonalInfo('customFields', [...fields, { id: Date.now().toString(), label: t.newField, value: '' }]);
  };

  const updateCustomField = (id: string, key: keyof CustomField, value: string) => {
    const fields = data.personalInfo.customFields || [];
    updatePersonalInfo('customFields', fields.map(f => f.id === id ? { ...f, [key]: value } : f));
  };

  const removeCustomField = (id: string) => {
    const fields = data.personalInfo.customFields || [];
    updatePersonalInfo('customFields', fields.filter(f => f.id !== id));
  };

  const handleEnhance = async (text: string, fieldType: EnhanceFieldType, fieldName: string, id?: string) => {
    if (!text.trim()) return;
    
    setEnhancingInfo({ field: fieldName, id });
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, fieldType, aiConfig }),
      });
      
      const resultData = await response.json();
      if (resultData.result) {
        if (fieldType === 'summary') {
          setData(current => ({ ...current, summary: resultData.result }));
        } else if (fieldType === 'experience' && id) {
          setData(current => ({
            ...current,
            experience: current.experience.map(exp => 
              exp.id === id ? { ...exp, description: resultData.result } : exp
            )
          }));
        }
      }
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setEnhancingInfo(null);
    }
  };

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...data.experience,
        { id: Date.now().toString(), company: '', role: '', startDate: '', endDate: '', description: '' }
      ]
    });
  };

  const removeExperience = (id: string) => {
    setData({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setData({
      ...data,
      experience: data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const addEducation = () => setData({ ...data, education: [...data.education, { id: Date.now().toString(), school: '', degree: '', startDate: '', endDate: '', description: '' }]});
  const removeEducation = (id: string) => setData({ ...data, education: data.education.filter(ed => ed.id !== id) });
  const updateEducation = (id: string, field: keyof Education, value: string) => setData({ ...data, education: data.education.map(ed => ed.id === id ? { ...ed, [field]: value } : ed) });

  const addProject = () => setData({ ...data, projects: [...data.projects, { id: Date.now().toString(), name: '', description: '', link: '' }]});
  const removeProject = (id: string) => setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
  const updateProject = (id: string, field: keyof Project, value: string) => setData({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });

  return (
    <div className="flex flex-col space-y-8 animate-in fade-in duration-300">
      {/* -------------------- DESIGN TAB -------------------- */}
      {activeNav === 'design' && (
        <>
          <section>
            <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block text-[#1A1A1A]">{t.designTemplate}</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {templateOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setConfig({ ...config, template: t })}
                  className={`h-16 rounded-sm flex items-center justify-center text-[10px] uppercase tracking-widest cursor-pointer transition-colors ${
                    config.template === t
                      ? 'bg-[#1A1A1A] border-2 border-black text-white'
                      : 'border border-[#E5E5E0] text-[#8C8C85] hover:bg-[#F9F9F7]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          <section>
            <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block text-[#1A1A1A]">{t.colorPalette}</label>
            <div className="flex flex-wrap gap-3">
              {[ '#1A1A1A', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#FF6321' ].map(color => (
                <button
                  key={color}
                  onClick={() => setConfig({ ...config, themeColor: color })}
                  className={`w-6 h-6 rounded-full border-2 ${config.themeColor === color ? 'border-black scale-110' : 'border-transparent hover:scale-105'} transition-all`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </section>

          <section>
            <label className="text-[10px] uppercase tracking-widest font-bold mb-4 block text-[#1A1A1A]">{t.typography}</label>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                { id: 'font-sans', label: 'Sans' },
                { id: 'font-serif', label: 'Serif' },
                { id: 'font-mono', label: 'Mono' },
                { id: "'Noto Sans SC', sans-serif", label: 'SC (中)' },
                { id: "'Noto Sans TC', sans-serif", label: 'TC (繁)' },
                { id: "'Noto Sans JP', sans-serif", label: 'JP (日)' },
                { id: "'Noto Sans KR', sans-serif", label: 'KR (韩)' }
              ].map(font => (
                <button
                  key={font.id}
                  onClick={() => setConfig({...config, fontFamily: font.id})}
                  className={`py-3 text-[10px] uppercase tracking-widest border rounded-sm transition-colors ${config.fontFamily === font.id ? 'bg-[#1A1A1A] border-black text-white' : 'border-[#E5E5E0] text-[#8C8C85] hover:bg-[#F9F9F7]'}`}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {/* -------------------- PERSONAL INFO TAB -------------------- */}
      {activeNav === 'personal' && (
        <section className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <label className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]">{t.personalDetails}</label>
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] cursor-pointer">
              <input type="checkbox" checked={config.showIcons} onChange={e => setConfig({ ...config, showIcons: e.target.checked })} className="rounded-sm outline-none" />
              {t.showIcons}
            </label>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4 py-2">
              {data.personalInfo.photo ? (
                <div className="w-16 h-16 rounded-full overflow-hidden border border-[#D9D9D3] shrink-0 relative group">
                  <img src={data.personalInfo.photo} alt={t.photo} className="w-full h-full object-cover" />
                  <button onClick={() => updatePersonalInfo('photo', '')} className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-[#EBEBE6] border border-[#D9D9D3] flex items-center justify-center shrink-0">
                  <span className="text-[10px] uppercase font-bold text-[#A1A19A]">{t.photo}</span>
                </div>
              )}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={t.photoPlaceholder}
                  value={data.personalInfo.photo || ''}
                  onChange={e => updatePersonalInfo('photo', e.target.value)}
                  className="w-full border-b border-[#D9D9D3] focus:border-black outline-none py-1 text-sm bg-transparent transition-colors"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <InputField label={t.fullName} value={data.personalInfo.name} onChange={v => updatePersonalInfo('name', v)} />
              <InputField label={t.title} value={data.personalInfo.title} onChange={v => updatePersonalInfo('title', v)} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ToggleableInputField field="email" label={t.email} value={data.personalInfo.email} onChange={v => updatePersonalInfo('email', v)} isHidden={(data.personalInfo.hiddenFields || []).includes('email')} onToggle={() => toggleHiddenField('email')} showLabel={t.showField} hideLabel={t.hideField} />
              <ToggleableInputField field="phone" label={t.phone} value={data.personalInfo.phone} onChange={v => updatePersonalInfo('phone', v)} isHidden={(data.personalInfo.hiddenFields || []).includes('phone')} onToggle={() => toggleHiddenField('phone')} showLabel={t.showField} hideLabel={t.hideField} />
            </div>
            <ToggleableInputField field="location" label={t.location} value={data.personalInfo.location} onChange={v => updatePersonalInfo('location', v)} isHidden={(data.personalInfo.hiddenFields || []).includes('location')} onToggle={() => toggleHiddenField('location')} showLabel={t.showField} hideLabel={t.hideField} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <ToggleableInputField field="github" label="GitHub" value={data.personalInfo.github} onChange={v => updatePersonalInfo('github', v)} isHidden={(data.personalInfo.hiddenFields || []).includes('github')} onToggle={() => toggleHiddenField('github')} showLabel={t.showField} hideLabel={t.hideField} />
              <ToggleableInputField field="linkedin" label="LinkedIn" value={data.personalInfo.linkedin} onChange={v => updatePersonalInfo('linkedin', v)} isHidden={(data.personalInfo.hiddenFields || []).includes('linkedin')} onToggle={() => toggleHiddenField('linkedin')} showLabel={t.showField} hideLabel={t.hideField} />
              <ToggleableInputField field="website" label={t.website} value={data.personalInfo.website} onChange={v => updatePersonalInfo('website', v)} isHidden={(data.personalInfo.hiddenFields || []).includes('website')} onToggle={() => toggleHiddenField('website')} showLabel={t.showField} hideLabel={t.hideField} />
            </div>
          </div>
          
          {/* Custom Fields */}
          {(data.personalInfo.customFields || []).length > 0 && (
            <div className="mt-8 space-y-4 pt-4 border-t border-[#F0F0EB]">
              <label className="text-[10px] uppercase tracking-widest font-bold block text-[#1A1A1A]">{t.customFields}</label>
              <div className="space-y-4">
                {(data.personalInfo.customFields || []).map(f => (
                  <div key={f.id} className="flex gap-2 items-center">
                    <input 
                      className="border-b border-[#D9D9D3] focus:border-black outline-none py-1 text-[10px] font-bold uppercase tracking-widest bg-transparent w-24"
                      value={f.label}
                      onChange={e => updateCustomField(f.id, 'label', e.target.value)}
                    />
                    <input 
                      className="border-b border-[#D9D9D3] focus:border-black outline-none py-1 text-sm bg-transparent flex-1"
                      value={f.value}
                      onChange={e => updateCustomField(f.id, 'value', e.target.value)}
                    />
                    <button onClick={() => removeCustomField(f.id)} className="text-[#A1A19A] hover:text-red-500 p-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button onClick={addCustomField} className="w-full mt-4 py-3 border border-dashed border-[#D9D9D3] rounded-sm text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] hover:bg-[#F9F9F7] transition-colors flex items-center justify-center gap-2">
            <Plus size={14} /> {t.addCustomField}
          </button>
        </section>
      )}

      {/* -------------------- SUMMARY TAB -------------------- */}
      {activeNav === 'summary' && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <input 
              value={config.sectionTitles.summary} 
              onChange={e => setConfig({ ...config, sectionTitles: { ...config.sectionTitles, summary: e.target.value } })}
              className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] outline-none border-b border-transparent focus:border-[#D9D9D3] bg-transparent"
             />
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] cursor-pointer">
              <input type="checkbox" checked={config.visibleSections.summary} onChange={e => setConfig({ ...config, visibleSections: { ...config.visibleSections, summary: e.target.checked } })} className="rounded-sm outline-none" />
              {t.visible}
            </label>
          </div>
          <div className="bg-[#F9F9F7] p-4 rounded-lg border border-[#EBEBE6]">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">{t.summaryRefiner}</label>
              <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[8px] rounded-full">AI</span>
            </div>
            <div className="bg-white p-1 rounded border border-[#EBEBE6]">
              <MarkdownInput
                value={data.summary}
                onChange={v => setData({ ...data, summary: v })}
                placeholder={t.summaryPlaceholder}
              />
            </div>
            <EnhanceButton 
              onClick={() => handleEnhance(data.summary, 'summary', 'summary')} 
              isEnhancing={enhancingInfo?.field === 'summary'} 
              enhanceLabel={t.enhance}
              enhancingLabel={t.enhancing}
            />
          </div>
        </section>
      )}

      {/* -------------------- EXPERIENCE TAB -------------------- */}
      {activeNav === 'experience' && (
        <section className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <input 
              value={config.sectionTitles.experience} 
              onChange={e => setConfig({ ...config, sectionTitles: { ...config.sectionTitles, experience: e.target.value } })}
              className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] outline-none border-b border-transparent focus:border-[#D9D9D3] bg-transparent"
             />
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] cursor-pointer">
              <input type="checkbox" checked={config.visibleSections.experience} onChange={e => setConfig({ ...config, visibleSections: { ...config.visibleSections, experience: e.target.checked } })} className="rounded-sm outline-none" />
              {t.visible}
            </label>
          </div>
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="relative group space-y-4 pt-4 border-t border-[#F0F0EB] first:border-0 first:pt-0">
                <button 
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-0 right-0 text-[#A1A19A] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField label={t.company} value={exp.company} onChange={v => updateExperience(exp.id, 'company', v)} />
                  <InputField label={t.role} value={exp.role} onChange={v => updateExperience(exp.id, 'role', v)} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField label={t.startDate} value={exp.startDate} onChange={v => updateExperience(exp.id, 'startDate', v)} />
                  <InputField label={t.endDate} value={exp.endDate} onChange={v => updateExperience(exp.id, 'endDate', v)} />
                </div>
                <div className="bg-[#F9F9F7] p-3 rounded-lg border border-[#EBEBE6]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C85]">{t.description}</span>
                    <span className="px-2 py-0.5 bg-[#1A1A1A] text-white text-[8px] rounded-full">AI</span>
                  </div>
                  <div className="bg-white rounded border border-[#EBEBE6]">
                    <MarkdownInput
                      value={exp.description}
                      onChange={v => updateExperience(exp.id, 'description', v)}
                      className="h-32"
                    />
                  </div>
                  <EnhanceButton 
                    onClick={() => handleEnhance(exp.description, 'experience', 'experience', exp.id)} 
                    isEnhancing={enhancingInfo?.field === 'experience' && enhancingInfo.id === exp.id} 
                    enhanceLabel={t.enhance}
                    enhancingLabel={t.enhancing}
                  />
                </div>
              </div>
            ))}
            <button onClick={addExperience} className="w-full py-3 border border-[#D9D9D3] rounded-sm text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] hover:bg-[#F9F9F7] transition-colors flex items-center justify-center gap-2">
              <Plus size={14} /> {t.addExperience}
            </button>
          </div>
        </section>
      )}

      {/* -------------------- EDUCATION TAB -------------------- */}
      {activeNav === 'education' && (
        <section className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <input 
              value={config.sectionTitles.education} 
              onChange={e => setConfig({ ...config, sectionTitles: { ...config.sectionTitles, education: e.target.value } })}
              className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] outline-none border-b border-transparent focus:border-[#D9D9D3] bg-transparent"
             />
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] cursor-pointer">
              <input type="checkbox" checked={config.visibleSections.education} onChange={e => setConfig({ ...config, visibleSections: { ...config.visibleSections, education: e.target.checked } })} className="rounded-sm outline-none" />
              {t.visible}
            </label>
          </div>
          <div className="space-y-8">
            {data.education.map((ed) => (
              <div key={ed.id} className="relative group space-y-4 pt-4 border-t border-[#F0F0EB] first:border-0 first:pt-0">
                <button 
                  onClick={() => removeEducation(ed.id)}
                  className="absolute top-0 right-0 text-[#A1A19A] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField label={t.school} value={ed.school} onChange={v => updateEducation(ed.id, 'school', v)} />
                  <InputField label={t.degree} value={ed.degree} onChange={v => updateEducation(ed.id, 'degree', v)} />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField label={t.startDate} value={ed.startDate} onChange={v => updateEducation(ed.id, 'startDate', v)} />
                  <InputField label={t.endDate} value={ed.endDate} onChange={v => updateEducation(ed.id, 'endDate', v)} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] opacity-80">{t.description}</label>
                  <MarkdownInput
                    value={ed.description}
                    onChange={v => updateEducation(ed.id, 'description', v)}
                    className="h-24"
                  />
                </div>
              </div>
            ))}
            <button onClick={addEducation} className="w-full py-3 border border-[#D9D9D3] rounded-sm text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] hover:bg-[#F9F9F7] transition-colors flex items-center justify-center gap-2">
              <Plus size={14} /> {t.addEducation}
            </button>
          </div>
        </section>
      )}

      {/* -------------------- PROJECTS TAB -------------------- */}
      {activeNav === 'projects' && (
        <section className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <input 
              value={config.sectionTitles.projects} 
              onChange={e => setConfig({ ...config, sectionTitles: { ...config.sectionTitles, projects: e.target.value } })}
              className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] outline-none border-b border-transparent focus:border-[#D9D9D3] bg-transparent"
             />
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] cursor-pointer">
              <input type="checkbox" checked={config.visibleSections.projects} onChange={e => setConfig({ ...config, visibleSections: { ...config.visibleSections, projects: e.target.checked } })} className="rounded-sm outline-none" />
              {t.visible}
            </label>
          </div>
          <div className="space-y-8">
            {data.projects.map((proj) => (
              <div key={proj.id} className="relative group space-y-4 pt-4 border-t border-[#F0F0EB] first:border-0 first:pt-0">
                <button 
                  onClick={() => removeProject(proj.id)}
                  className="absolute top-0 right-0 text-[#A1A19A] hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <InputField label={t.projectName} value={proj.name} onChange={v => updateProject(proj.id, 'name', v)} />
                  <InputField label={t.projectLink} value={proj.link} onChange={v => updateProject(proj.id, 'link', v)} />
                </div>
                <div className="bg-[#F9F9F7] p-3 rounded-lg border border-[#EBEBE6]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#8C8C85]">{t.description}</span>
                  </div>
                  <div className="bg-white rounded border border-[#EBEBE6]">
                    <MarkdownInput
                      value={proj.description}
                      onChange={v => updateProject(proj.id, 'description', v)}
                      className="h-24"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addProject} className="w-full py-3 border border-[#D9D9D3] rounded-sm text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] hover:bg-[#F9F9F7] transition-colors flex items-center justify-center gap-2">
              <Plus size={14} /> {t.addProject}
            </button>
          </div>
        </section>
      )}

      {/* -------------------- SKILLS TAB -------------------- */}
      {activeNav === 'skills' && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <input 
              value={config.sectionTitles.skills} 
              onChange={e => setConfig({ ...config, sectionTitles: { ...config.sectionTitles, skills: e.target.value } })}
              className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] outline-none border-b border-transparent focus:border-[#D9D9D3] bg-transparent"
             />
            <label className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8C8C85] cursor-pointer">
              <input type="checkbox" checked={config.visibleSections.skills} onChange={e => setConfig({ ...config, visibleSections: { ...config.visibleSections, skills: e.target.checked } })} className="rounded-sm outline-none" />
              {t.visible}
            </label>
          </div>
          <MarkdownInput
            value={data.skills || ''}
            onChange={v => setData({ ...data, skills: v })}
            placeholder={t.skillsPlaceholder}
            className="h-48"
          />
        </section>
      )}
    </div>
  );
}

// Subcomponents

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest font-bold mb-1.5 block text-[#1A1A1A] opacity-80">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border-b border-[#D9D9D3] focus:border-black outline-none py-1 text-sm bg-transparent transition-colors"
      />
    </div>
  );
}

function ToggleableInputField({ label, value, onChange, isHidden, onToggle, showLabel, hideLabel }: { field: string, label: string, value: string, onChange: (v: string) => void, isHidden: boolean, onToggle: () => void, showLabel: string, hideLabel: string }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <label className={`text-[10px] uppercase tracking-widest font-bold block text-[#1A1A1A] ${isHidden ? 'opacity-40' : 'opacity-80'}`}>{label}</label>
        <button onClick={onToggle} className={`p-0.5 rounded ${isHidden ? 'text-gray-400' : 'text-blue-600 hover:bg-gray-100'} transition-colors`} title={isHidden ? showLabel : hideLabel}>
          {isHidden ? <EyeOff size={12} /> : <Eye size={12} />}
        </button>
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={isHidden}
        className={`w-full border-b border-[#D9D9D3] focus:border-black outline-none py-1 text-sm bg-transparent transition-colors ${isHidden ? 'opacity-40 cursor-not-allowed text-gray-400' : ''}`}
      />
    </div>
  );
}

function EnhanceButton({ onClick, isEnhancing, enhanceLabel, enhancingLabel }: { onClick: () => void, isEnhancing: boolean, enhanceLabel: string, enhancingLabel: string }) {
  return (
    <button
      onClick={onClick}
      disabled={isEnhancing}
      className="w-full mt-3 bg-[#3D3D38] hover:bg-black text-white text-[11px] py-2 rounded transition-colors uppercase tracking-widest font-bold disabled:opacity-50 flex justify-center items-center gap-2"
    >
      {isEnhancing ? (
        <>
          <Sparkles size={12} className="animate-pulse" />
          {enhancingLabel}
        </>
      ) : (
        enhanceLabel
      )}
    </button>
  );
}
