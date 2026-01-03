import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
  stats?: string;
  subServices?: string[];
}

export function ServiceCard({ title, description, icon, index, stats, subServices }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayServices = isExpanded ? subServices : subServices?.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-panel p-8 rounded-[2.5rem] border border-white/10 hover:border-primary/30 transition-all group relative overflow-hidden flex flex-col h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {stats && (
        <div className="flex justify-center mb-8 relative">
          <div className="relative w-24 h-24">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-white/10"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={251.2}
                strokeDashoffset={251.2 * (1 - parseInt(stats) / 100)}
                className="text-primary transition-all duration-1000 group-hover:drop-shadow-[0_0_8px_rgba(0,168,150,0.5)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white/20 group-hover:text-primary transition-colors">
                {icon}
              </div>
              <span className="text-lg font-bold text-white mt-0.5">{stats}</span>
            </div>
          </div>
        </div>
      )}

      {!stats && (
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
          <div className="text-primary w-8 h-8">
            {icon}
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors text-center">{title}</h3>
      <p className="text-muted-foreground mb-6 line-clamp-3 text-center">
        {description}
      </p>

      {subServices && (
        <ul className="space-y-3 mb-8 flex-grow">
          {displayServices?.map((sub, i) => (
            <motion.li 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={sub} 
              className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              {sub}
            </motion.li>
          ))}
        </ul>
      )}

      {subServices && subServices.length > 4 && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary text-sm font-bold flex items-center gap-2 group/btn mt-auto justify-center hover:underline"
        >
          {isExpanded ? "Show Less" : `Show More (${subServices.length - 4} more)`}
        </button>
      )}
    </motion.div>
  );
}
