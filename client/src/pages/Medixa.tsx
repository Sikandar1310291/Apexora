import { motion, AnimatePresence } from "framer-motion";
import { Download, ShieldCheck, Phone, CreditCard, CheckCircle, ArrowLeft, Pill, Activity, Terminal, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import * as React from "react";

export default function Medixa() {
  const screenshots = [
    "/medixa/Screenshot (419).png",
    "/medixa/Screenshot (422).png",
    "/medixa/Screenshot (424).png",
    "/medixa/Screenshot (426).png",
    "/medixa/Screenshot 2026-04-04 162054.png"
  ];

  const features = [
    "Complete Inventory Management",
    "Smart Billing & Invoicing",
    "Prescription Tracking",
    "Expiry Date Notifications",
    "Supplier & Batch Management",
    "Real-time Sales Analytics",
    "Custom Reporting Tools",
    "Multi-user Support"
  ];

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % screenshots.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + screenshots.length) % screenshots.length);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "ArrowRight") setActiveIndex((activeIndex + 1) % screenshots.length);
      if (e.key === "ArrowLeft") setActiveIndex((activeIndex - 1 + screenshots.length) % screenshots.length);
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[100px]" />
        </div>

        <div className="container-width relative z-10">
          <Link href="/">
            <motion.button 
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </motion.button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" />
                OFFICIAL SOFTWARE RELEASE
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-none mb-6">
                Medixa <span className="text-primary tracking-tighter">SaaS</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                The ultimate Windows-based pharmacy management solution. Streamline your operations, manage inventory with precision, and scale your pharmaceutical business with our professional SaaS platform.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="/medixa/Medixa_Setup_v1.7.exe" 
                    download
                    className="px-8 py-4 rounded-2xl bg-primary text-background font-bold text-lg flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,168,150,0.3)] group"
                  >
                    <Download className="w-6 h-6 group-hover:bounce" />
                    Download Medixa v1.7
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 p-3 rounded-xl border border-white/10 max-w-sm">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <p>If your browser flags the file as "uncommon," click <b>Keep</b>. Our software is verified safe but is currently building domain reputation.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-panel p-2 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={screenshots[0]} 
                  alt="Medixa Dashboard" 
                  className="w-full h-auto rounded-[1.5rem] cursor-zoom-in"
                  onClick={() => setActiveIndex(0)}
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl border border-primary/30 bg-background/80 backdrop-blur-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Activity className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Status</div>
                    <div className="text-lg font-bold text-white">Production Ready</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing & Licensing Section */}
      <Section id="medixa-pricing" darker>
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Transparent Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Investment in your business's efficiency. Professional tools for professional pharmacists.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Installation Fee */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-10 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <CreditCard className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold text-muted-foreground mb-4 uppercase tracking-[0.2em]">Installation Fee</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-display font-black text-white">20,000</span>
                <span className="text-primary font-bold">PKR</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-gray-400">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                  One-time Software Setup
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                  Database Configuration
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                  Initial Staff Training
                </li>
              </ul>
            </motion.div>

            {/* Monthly Subscription */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass-panel p-10 rounded-[2.5rem] border border-primary/30 bg-primary/5 relative overflow-hidden group shadow-[0_0_40px_rgba(0,168,150,0.1)]"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-16 h-16" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">Recommended</div>
              <h3 className="text-xl font-bold text-muted-foreground mb-4 uppercase tracking-[0.2em]">Monthly Subscription</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-display font-black text-white">2,000</span>
                <span className="text-primary font-bold">PKR</span>
              </div>
              <ul className="space-y-4 mb-8 text-white/80">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                  Cloud Backup Access
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                  Continuous Security Updates
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                  24/7 Technical Support
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Contact for License */}
          <div className="mt-20 glass-panel p-10 rounded-[3rem] border border-white/10 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-8">To check details or acquire your official license, contact our licensing department directly.</p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <a 
                href="tel:+923104222105" 
                className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group w-full md:w-auto"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground uppercase font-black">Call/WhatsApp</div>
                  <div className="text-2xl font-display font-bold text-white">+92 310 4222105</div>
                </div>
              </a>
              <a 
                href="tel:+923286010100" 
                className="inline-flex items-center gap-4 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all group w-full md:w-auto"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="text-secondary w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground uppercase font-black">Alternative</div>
                  <div className="text-2xl font-display font-bold text-white">+92 328 6010100</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      <Section id="gallery">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Visual Interface</h2>
            <p className="text-muted-foreground">Modern, intuitive, and designed for high-speed pharmaceutical workflows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {screenshots.slice(1).map((src, i) => (
               <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-2 rounded-2xl border border-white/5 overflow-hidden group cursor-zoom-in h-48"
                onClick={() => setActiveIndex(i + 1)}
              >
                <img 
                  src={src} 
                  alt={`Medixa Interface ${i + 2}`} 
                  className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Verification / Trust Section */}
      <Section id="medixa-trust" darker>
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Verified & Secure</h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Medixa uses industry-standard encryption and security protocols to ensure your pharmacy data remains private and protected. Our SaaS model includes automatic cloud syncing, so you never lose a single record.
              </p>
              <div className="space-y-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <CheckCircle className="text-primary w-4 h-4" />
                    </div>
                    <span className="font-medium">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-center flex-col p-4 text-center">
                        <ShieldCheck className="w-10 h-10 text-primary mb-2" />
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Secure</span>
                    </div>
                    <div className="aspect-square rounded-2xl bg-secondary/5 border border-secondary/20 flex items-center justify-center flex-col p-4 text-center">
                        <Activity className="w-10 h-10 text-secondary mb-2" />
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Reliable</span>
                    </div>
                    <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-col p-4 text-center">
                        <Terminal className="w-10 h-10 text-muted-foreground mb-2" />
                        <span className="text-xs font-bold uppercase tracking-widest">Optimized</span>
                    </div>
                    <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-col p-4 text-center">
                        <Pill className="w-10 h-10 text-muted-foreground mb-2" />
                        <span className="text-xs font-bold uppercase tracking-widest">Specialized</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-muted-foreground font-medium">Developed with Excellence by <span className="text-primary font-bold">Apexora Solutions</span></p>
      </footer>

      {/* Interactive Modal Slider */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setActiveIndex(null)}
          >
            <button 
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button 
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hover:scale-110 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={screenshots[activeIndex]} 
                alt="Medixa Full Software Interface" 
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow- [0_0_50px_rgba(0,168,150,0.2)]"
              />
              <div className="absolute -bottom-10 left-0 right-0 text-center text-white/50 text-sm font-medium">
                Image {activeIndex + 1} of {screenshots.length} • Use Arrow Keys to Navigate
              </div>
            </motion.div>

            <button 
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all hover:scale-110 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
