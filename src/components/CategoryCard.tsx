import React from 'react';
import {
  Building2,
  Coins,
  GraduationCap,
  Briefcase,
  Rocket,
  FileText,
  Car,
  Landmark,
  HeartPulse,
  BookOpen,
  Wrench,
  Globe,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { CategoryInfo } from '../types/service';

interface CategoryCardProps {
  category: CategoryInfo;
  count: number;
  onClick: () => void;
  href?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  count,
  onClick,
  href,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Rocket': return <Rocket className="w-5 h-5 text-purple-600 dark:text-purple-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
      case 'Car': return <Car className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-red-600 dark:text-red-400" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-violet-600 dark:text-violet-400" />;
      case 'Wrench': return <Wrench className="w-5 h-5 text-orange-600 dark:text-orange-400" />;
      case 'Globe': return <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      default: return <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
    }
  };

  const targetUrl = href || (
    category.id === 'state-services' ? '/states' :
    category.id === 'scholarships' ? '/scholarships' :
    category.id === 'schemes' ? '/schemes' :
    category.id === 'jobs' ? '/jobs' :
    category.id === 'documents' ? '/documents' :
    `/services?cat=${category.id}`
  );

  return (
    <a
      href={targetUrl}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="group p-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-150 cursor-pointer flex flex-col justify-between focus-visible:outline-2 focus-visible:outline-indigo-600 text-left no-underline"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
            {getIcon(category.iconName)}
          </div>
          <span className="text-xs font-mono tabular-nums text-slate-400 dark:text-slate-500">
            {count} {category.id === 'state-services' ? 'States/UTs' : 'Portals'}
          </span>
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {category.title}
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {category.shortDescription}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
        <span>Explore category</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </a>
  );
};
