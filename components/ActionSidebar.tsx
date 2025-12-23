import React from 'react';
import { Activity, Calendar, PhoneCall, HelpCircle } from 'lucide-react';

interface ActionSidebarProps {
  onBook: () => void;
}

const SidebarItem: React.FC<{ icon: any; label: string; onClick?: (e: React.MouseEvent) => void; href?: string; variant?: 'primary' | 'danger' }> = ({ icon: Icon, label, onClick, href, variant = 'primary' }) => {
  const baseClasses = "flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 group relative";
  const colorClasses = variant === 'danger' 
    ? "bg-brand-heart/10 text-brand-heart hover:bg-brand-heart hover:text-white" 
    : "bg-white text-brand-slate hover:bg-brand-primary hover:text-white shadow-sm border border-brand-soft";

  const content = (
    <>
      <div className="shrink-0">
        <Icon size={22} />
      </div>
      <span className="font-bold text-sm whitespace-nowrap opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 absolute left-14 bg-inherit px-4 py-2 rounded-xl shadow-lg border border-inherit">
        {label}
      </span>
    </>
  );

  if (href && !href.startsWith('#')) {
    return <a href={href} className={baseClasses + " " + colorClasses}>{content}</a>;
  }

  return (
    <button 
      onClick={(e) => {
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const id = href.substring(1);
          const element = document.getElementById(id);
          if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        } else if (onClick) {
          onClick(e);
        }
      }} 
      className={baseClasses + " " + colorClasses}
    >
      {content}
    </button>
  );
};

const ActionSidebar: React.FC<ActionSidebarProps> = ({ onBook }) => {
  return (
    <aside className="fixed left-6 top-1/2 -translate-y-1/2 z-[40] hidden lg:flex flex-col gap-4 p-2">
      <SidebarItem 
        icon={Calendar} 
        label="Quick Book" 
        onClick={() => onBook()} 
      />
      <SidebarItem 
        icon={Activity} 
        label="AI Triage" 
        href="#ai-checker" 
      />
      <SidebarItem 
        icon={HelpCircle} 
        label="Services" 
        href="#services" 
      />
      <div className="h-px bg-brand-soft w-8 mx-auto my-2" />
      <SidebarItem 
        icon={PhoneCall} 
        label="Emergency Line" 
        href="tel:+2348161502448"
        variant="danger"
      />
    </aside>
  );
};

export default ActionSidebar;