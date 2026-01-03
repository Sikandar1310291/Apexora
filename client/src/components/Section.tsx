import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  darker?: boolean;
}

export function Section({ id, className = "", children, darker = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden section-padding ${
        darker ? "bg-black/20" : "bg-transparent"
      } ${className}`}
    >
      <div className="container-width relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Decorative background elements */}
      {darker && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[100px]" />
        </div>
      )}
    </section>
  );
}

export function SectionHeader({ title, subtitle, align = "center" }: { title: string, subtitle?: string, align?: "left" | "center" | "right" }) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : align === "left" ? "text-left" : "text-right"}`}>
      <motion.h2 
        className="text-3xl md:text-5xl font-display font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-white">{title.split(" ")[0]}</span>
        {title.split(" ").length > 1 && (
          <span className="text-gradient"> {title.split(" ").slice(1).join(" ")}</span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p 
          className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {subtitle}
        </motion.p>
      )}
      <div className={`h-1 w-20 bg-primary mt-6 rounded-full ${align === "center" ? "mx-auto" : "ml-0"}`} />
    </div>
  );
}
