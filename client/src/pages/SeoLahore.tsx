import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, BarChart3, Search, TrendingUp, Phone, ArrowLeft, Globe, Target } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";

const services = [
  { icon: <Search className="w-6 h-6 text-primary" />, title: "On-Page SEO Optimization", desc: "Keyword research, meta tags, H1/H2 structure, image alt tags — everything Google needs to rank your site." },
  { icon: <Globe className="w-6 h-6 text-primary" />, title: "Local SEO for Lahore", desc: "Google Business Profile optimization, local citations, and Lahore-specific keyword targeting." },
  { icon: <TrendingUp className="w-6 h-6 text-primary" />, title: "Content Marketing", desc: "English and Urdu blog content that ranks. We write for your audience, not just for bots." },
  { icon: <BarChart3 className="w-6 h-6 text-primary" />, title: "PPC & Google Ads", desc: "Managed Google Ads campaigns for startups in Lahore with transparent reporting and no wasted budget." },
  { icon: <Target className="w-6 h-6 text-primary" />, title: "Social Media Marketing", desc: "Instagram, Facebook & LinkedIn management for Pakistani startups and SMEs." },
  { icon: <CheckCircle className="w-6 h-6 text-primary" />, title: "SEO Audit & Strategy", desc: "Free SEO audit for your Lahore business — identify why you're not ranking and fix it fast." },
];

const faqs = [
  { q: "Does Apexora provide SEO services in Lahore?", a: "Yes. Apexora Solutions provides professional SEO services in Lahore for startups, SMEs, and established businesses. We specialize in local SEO, on-page optimization, content marketing, and Google Ads management in Lahore and across Pakistan." },
  { q: "How long does SEO take to show results in Lahore?", a: "For low-competition local keywords in Lahore, you can expect to see ranking improvements within 30–60 days. For more competitive terms, expect 3–6 months. We provide monthly progress reports so you always know where you stand." },
  { q: "What makes Apexora the best digital marketing agency for startups in Pakistan?", a: "Unlike large agencies that assign junior staff, Apexora gives you direct access to founders with real technical skills. We understand Pakistani markets — Lahore, Faisalabad, Gojra — and build strategies that work for your budget and industry." },
  { q: "What is included in your SEO package for Lahore businesses?", a: "Our SEO services in Lahore include: complete keyword research, Google Business Profile setup, on-page optimization, technical SEO fixes, link building, monthly content creation, and detailed analytics reporting. All in one fixed-price package." },
];

export default function SeoLahore() {
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
                <Search className="w-4 h-4" /> SEO SERVICES IN LAHORE — DIGITAL MARKETING AGENCY PAKISTAN
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
                SEO Services in <span className="text-primary">Lahore</span> for Startups & SMEs
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                Apexora Solutions is a digital marketing agency in Pakistan specializing in SEO services for startups and SMEs in Lahore, Faisalabad, and Gojra. We help you rank on Google, drive organic traffic, and convert visitors into paying customers.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Link href="/#contact">
                  <span className="px-8 py-4 rounded-2xl bg-primary text-background font-bold text-lg flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,168,150,0.3)] cursor-pointer">
                    Get Free SEO Audit <ArrowRight className="w-5 h-5" />
                  </span>
                </Link>
                <a href="tel:+923104222105" className="px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-all">
                  <Phone className="w-5 h-5" /> Call Now
                </a>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                {["Lahore","Faisalabad","Gojra","Pakistan"].map(c => (
                  <span key={c} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-medium">📍 {c}</span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {[
                { stat: "300%", label: "Average Organic Traffic Increase" },
                { stat: "30–60", label: "Days to First Rankings (Local)" },
                { stat: "150k", label: "PKR Starting Price" },
                { stat: "98%", label: "Client Satisfaction Rate" },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-primary/30 transition-all text-center">
                  <div className="text-3xl font-display font-black text-primary mb-2">{s.stat}</div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section id="seo-services" darker>
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Our <span className="text-primary">Digital Marketing Services</span> in Lahore</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">As the best digital marketing agency for startups in Pakistan, we offer a complete suite of SEO and marketing services tailored for Lahore businesses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className="glass-panel p-8 rounded-[2rem] border border-white/10 hover:border-primary/30 transition-all group">
                <div className="mb-4 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">{s.icon}</div>
                <h3 className="font-bold text-white text-xl mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHY US */}
      <Section id="why-seo-apexora">
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">Why Apexora is the <span className="text-primary">Best Digital Marketing Agency</span> for Startups in Pakistan</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Large agencies assign junior teams and charge enterprise prices. Apexora gives you direct founder access, real technical expertise, and results-focused SEO strategies designed for the Pakistani market — Lahore, Faisalabad, and beyond.
              </p>
              <div className="space-y-4">
                {[
                  "Founder-direct communication — no sales teams",
                  "Urdu/English bilingual content for Pakistani audiences",
                  "Google Business Profile optimization for Lahore SEO",
                  "Transparent monthly reporting with real metrics",
                  "Fixed pricing — no surprise invoices",
                  "Serving startups and SMEs across Lahore & Punjab",
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><CheckCircle className="text-primary w-4 h-4" /></div>
                    <span className="font-medium">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-10 rounded-[2.5rem] border border-primary/20 bg-primary/5">
              <h3 className="text-2xl font-bold mb-8 text-center">SEO Packages for Lahore</h3>
              <div className="space-y-6">
                {[
                  { name: "Starter SEO", price: "25,000/mo", desc: "5 keywords, on-page optimization, monthly report" },
                  { name: "Growth SEO", price: "55,000/mo", desc: "15 keywords, content creation, link building, Google Ads" },
                  { name: "Full Digital", price: "Custom", desc: "SEO + Social Media + PPC + content — complete growth package" },
                ].map((pkg, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary text-sm">{i + 1}</div>
                    <div>
                      <div className="font-bold text-white">{pkg.name} — <span className="text-primary">{pkg.price}</span></div>
                      <div className="text-sm text-muted-foreground mt-1">{pkg.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/#contact"><div className="mt-8 w-full py-4 rounded-2xl bg-primary text-background font-bold text-center cursor-pointer hover:bg-white transition-all">Get Free SEO Audit</div></Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="seo-faq" darker>
        <div className="container-width max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything about SEO services in Lahore and digital marketing in Pakistan.</p>
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
      <Section id="seo-cta">
        <div className="container-width text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Ready to Rank on Google in <span className="text-primary">Lahore?</span></h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">Pakistan's best digital marketing agency for startups. Free SEO audit — no strings attached. Call our founder directly.</p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <a href="tel:+923104222105" className="inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-primary text-background font-bold text-xl hover:bg-white transition-all">
              <Phone className="w-6 h-6" /> +92 310 4222105
            </a>
            <Link href="/#contact"><div className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl border border-white/20 text-white font-bold text-xl hover:bg-white/10 transition-all cursor-pointer">Free Audit <ArrowRight className="w-5 h-5" /></div></Link>
          </div>
        </div>
      </Section>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-muted-foreground font-medium">SEO Services in Lahore | Digital Marketing Agency Pakistan | <span className="text-primary font-bold">Apexora Solutions</span></p>
      </footer>
    </div>
  );
}
