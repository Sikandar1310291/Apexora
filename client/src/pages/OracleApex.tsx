import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Code, Zap, Shield, Clock, Phone, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";

const benefits = [
  { icon: <Zap className="w-6 h-6 text-primary" />, title: "38x Faster Development", desc: "Oracle APEX low-code platform delivers enterprise apps 38x faster than traditional development." },
  { icon: <Shield className="w-6 h-6 text-primary" />, title: "Enterprise-Grade Security", desc: "Built on Oracle Database — the world's most secure and reliable database engine." },
  { icon: <Clock className="w-6 h-6 text-primary" />, title: "7-Day Delivery", desc: "Fixed timelines, no surprises. We deliver your custom APEX application in 7 days." },
  { icon: <ArrowRight className="w-6 h-6 text-primary" />, title: "SME Package from 150k PKR", desc: "Affordable Oracle APEX development packages designed for Pakistani SMEs and startups." },
];

const useCases = [
  "Pharmacy Management Systems","Hospital & Clinic ERP","Inventory & Warehouse Management",
  "HR & Payroll Applications","Custom Business Dashboards","Supply Chain Management",
  "School & Institute Portals","Financial Reporting Tools",
];

const faqs = [
  { q: "What is Oracle APEX and why should my business use it?", a: "Oracle APEX (Application Express) is a low-code development platform that lets you build powerful enterprise applications 38x faster. For Pakistani SMEs it means enterprise-level software at a fraction of the cost — perfect for pharmacies, hospitals, schools, and any business needing custom data management." },
  { q: "How much does Oracle APEX development cost in Pakistan?", a: "Apexora Solutions offers affordable Oracle APEX development in Pakistan with SME packages starting from 150,000 PKR. We provide fixed pricing with no hidden costs. Contact us for a free quote." },
  { q: "Is Apexora an Oracle APEX development company in Pakistan?", a: "Yes. Apexora Solutions is an Oracle APEX development company based in Gojra, Punjab, serving clients across Faisalabad, Lahore, and all of Pakistan. We specialize in low-code enterprise application development for SMEs." },
  { q: "How long does it take to build an Oracle APEX application?", a: "Simple applications are delivered in 7 days. More complex enterprise systems typically take 2–4 weeks. We work on fixed timelines with milestone-based delivery." },
];

export default function OracleApex() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Navigation />

      {/* HERO */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[35%] rounded-full bg-secondary/10 blur-[100px]" />
        </div>
        <div className="container-width relative z-10">
          <Link href="/"><motion.button whileHover={{ x: -5 }} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"><ArrowLeft className="w-4 h-4" />Back to Home</motion.button></Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
                <Code className="w-4 h-4" /> ORACLE APEX DEVELOPMENT COMPANY — PAKISTAN
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
                Oracle APEX <span className="text-primary">Development</span> Company in Pakistan
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Apexora Solutions is Pakistan's most affordable Oracle APEX development company. We build low-code enterprise applications for pharmacies, hospitals, and SMEs in Gojra, Faisalabad, Lahore, and across Pakistan. Fixed price. 7-day delivery. Founder direct contact.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Link href="/#contact">
                  <span className="px-8 py-4 rounded-2xl bg-primary text-background font-bold text-lg flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,168,150,0.3)] cursor-pointer">
                    Get Free Quote <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                <a href="tel:+923104222105" className="px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5" /> Call Now
                </a>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {["Gojra","Faisalabad","Lahore","Pakistan"].map(c => (
                  <span key={c} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-medium">📍 {c}</span>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all">
                  <div className="mb-3">{b.icon}</div>
                  <h3 className="font-bold text-white mb-2 text-sm">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <Section id="apex-use-cases" darker>
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">What We Build with <span className="text-primary">Oracle APEX</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">As an affordable Oracle APEX developer in Pakistan, we build low-code applications for every industry — from pharmacies to enterprise ERPs.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {useCases.map((uc, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-primary/30 transition-all flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                <span className="font-medium text-sm">{uc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="apex-pricing">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Why <span className="text-primary">Low-Code</span> Application Development Wins</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Traditional custom software development in Pakistan costs 10x more and takes months. Oracle APEX low-code application development gives you the same enterprise power — in days, not months — at a fraction of the cost.
              </p>
              <div className="space-y-4">
                {["Enterprise apps in days instead of months","Built on Oracle Database — 100% data security","Custom workflows for your exact business process","No per-user licensing fees like SAP or ERP giants","Runs in your browser — no installation needed"].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><CheckCircle className="text-primary w-4 h-4" /></div>
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-10 rounded-[2.5rem] border border-primary/20 bg-primary/5">
              <h3 className="text-2xl font-bold mb-8 text-center">SME Package Pricing</h3>
              <div className="space-y-6">
                {[{ name: "Starter", price: "150,000", desc: "Single module APEX app — ideal for pharmacies & small businesses" },{ name: "Business", price: "350,000", desc: "Multi-module ERP — inventory, billing, HR, reporting" },{ name: "Enterprise", price: "Custom", desc: "Full enterprise suite with cloud deployment & 24/7 support" }].map((pkg, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary text-sm">{i + 1}</div>
                    <div>
                      <div className="font-bold text-white">{pkg.name} — <span className="text-primary">{pkg.price} PKR</span></div>
                      <div className="text-sm text-muted-foreground mt-1">{pkg.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/#contact"><div className="mt-8 w-full py-4 rounded-2xl bg-primary text-background font-bold text-center cursor-pointer hover:bg-white transition-all">Get Custom Quote</div></Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="apex-faq" darker>
        <div className="container-width max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about Oracle APEX development in Pakistan.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div key={i} whileHover={{ scale: 1.01 }} className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-all">
                <h3 className="font-bold text-white text-lg mb-3">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section id="apex-cta">
        <div className="container-width text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Ready to Build Your <span className="text-primary">Oracle APEX Application?</span></h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">Pakistan's most affordable Oracle APEX development company. Call our founder directly — no sales team, no middleman.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="tel:+923104222105" className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-primary text-background font-bold text-xl hover:bg-white transition-all">
              <Phone className="w-6 h-6" /> +92 310 4222105
            </a>
            <Link href="/#contact"><div className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/20 text-white font-bold text-xl hover:bg-white/10 transition-all cursor-pointer">Send Message <ArrowRight className="w-5 h-5" /></div></Link>
          </div>
        </div>
      </Section>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-muted-foreground font-medium">Oracle APEX Development Company in Pakistan | <span className="text-primary font-bold">Apexora Solutions</span> — Gojra, Faisalabad, Lahore</p>
      </footer>
    </div>
  );
}
