import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import logo from "@assets/logo_1767381786801.png";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Auto-close menu on scroll to provide a "dismiss on scroll" feel
      if (isOpen && window.scrollY > 50) {
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Remove body scroll lock to allow "scroll to close" behavior
  // but we'll use a backdrop-blur and full opacity to keep it looking clean.

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (href.startsWith("#")) {
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to allow menu closing animation to start
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-lg border-b border-white/5" : "bg-transparent py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 cursor-pointer flex items-center gap-1 group">
            <span className="font-display font-bold text-5xl tracking-tighter transition-colors">
              <span className="text-primary drop-shadow-[0_0_15px_rgba(0,168,150,0.5)]">A</span>
              <span className="text-white text-3xl ml-1">pexora</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.href === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    } else {
                      handleNavClick(link.href);
                    }
                  }}
                  className="text-sm font-medium text-gray-300 hover:text-primary transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("#contact")}
              className="px-6 py-2.5 rounded-full font-semibold text-sm bg-primary text-background hover:bg-white hover:text-primary transition-all duration-300 shadow-[0_0_20px_rgba(0,168,150,0.3)] hover:shadow-[0_0_30px_rgba(0,168,150,0.5)] transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) {
                setIsOpen(false);
              }
            }}
            className="fixed inset-0 z-[60] bg-[#090A0E] md:hidden flex flex-col h-[100dvh] w-screen"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 bg-[#090A0E]">
              <div className="flex items-center gap-1">
                <span className="font-display font-bold text-4xl tracking-tighter">
                  <span className="text-primary">A</span>
                  <span className="text-white text-2xl ml-1">pexora</span>
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 bg-white/5 rounded-xl border border-white/10 text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto py-8 px-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left py-4 text-3xl font-display font-bold text-white/90 hover:text-primary transition-colors flex justify-between items-center group"
                >
                  {link.name}
                  <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-primary" />
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-8"
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full py-5 rounded-2xl bg-primary text-black font-bold text-xl shadow-[0_0_20px_rgba(0,168,150,0.3)]"
                >
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
