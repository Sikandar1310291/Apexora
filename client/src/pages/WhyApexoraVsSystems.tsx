import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Shield, Zap, Clock, Phone, ArrowLeft, Users, Trophy, Star } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";

const comparison = [
  { aspect: "Target Client", systems: "Large Enterprise & Multinationals", apexora: "SMEs & Startups in Pakistan" },
  { aspect: "Project Timeline", systems: "Months to Years", apexora: "7-Day Delivery Guaranteed" },
  { aspect: "Pricing Model", systems: "Custom Enterprise (Very High)", apexora: "Fixed Price from 150k PKR" },
  { aspect: "Communication", systems: "Account Managers & Sales Teams", apexora: "Direct Founder Contact" },
  { aspect: "Location Focus", systems: "Global & Export Projects", apexora: "Gojra, Faisalabad, Lahore" },
  { aspect: "Tech Strength", systems: "Java, .NET, Enterprise Stack", apexora: "Oracle APEX, Web, AI, SaaS" },
  { aspect: "SME Support", systems: "Limited — Enterprise Focus", apexora: "Specialized for Pakistani SMEs" },
  { aspect: "Flexibility", systems: "Rigid Enterprise Contracts", apexora: "Month-to-month, No lock-in" },
];

const faqs = [
  { q: "Is Apexora a good Systems Limited alternative for SMEs?", a: "Yes. Systems Limited is excellent for large enterprises and global export projects — they have 600+ enterprise projects and international awards. But for Pakistani SMEs, Apexora Solutions is the better fit: fixed pricing, 7-day delivery, Oracle APEX development, and you speak directly with the founders. We are built specifically for small and medium businesses in Pakistan." },
  { q: "What services does Apexora offer that Systems Limited also offers?", a: "Both companies offer custom software development and digital transformation services. Apexora specializes in Oracle APEX development, web development, digital marketing, and AI solutions — all optimized and priced for Pakistani SMEs in cities like Gojra, Faisalabad, and Lahore." },
  { q: "Why does Apexora serve SMEs better than large IT companies?", a: "Large IT companies like Systems Limited optimize for enterprise clients with large budgets and long timelines. Apexora is built from the ground up for SMEs — fixed pricing with no surprises, 7-day delivery, direct founder communication, and solutions that start at 150,000 PKR." },
  { q: "Does Apexora work with clients across Pakistan?", a: "Yes. While we are headquartered in Gojra, Punjab, we serve clients in Faisalabad, Lahore, Karachi, Islamabad, and internationally. Our digital delivery model means location is never a barrier." },
];

export default function WhyApexoraVsSystems() {
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
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-bold mb-6">
              <Shield className="w-4 h-4" /> SYSTEMS LIMITED ALTERNATIVE FOR SMEs
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold leading-tight mb-6">
              Why Apexora vs <span className="text-primary">Systems Limited</span> — The Honest Comparison
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto">
              Systems Limited is Pakistan's most awarded IT company — global projects, 600+ enterprise clients, export awards. But if you're an SME in Gojra, Faisalabad, or Lahore, you need a different partner. Here's the honest comparison.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/#contact">
                <span className="px-8 py-4 rounded-2xl bg-primary text-background font-bold text-lg flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_20px_rgba(0,168,150,0.3)] cursor-pointer">
                  Talk to Our Founder <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
              <a href="tel:+923104222105" className="px-8 py-4 rounded-2xl border border-white/20 text-white font-bold text-lg flex items-center gap-3 hover:bg-white/10 transition-all">
                <Phone className="w-5 h-5" /> +92 310 4222105
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ACKNOWLEDGE SYSTEMS STRENGTH */}
      <Section id="systems-strengths" darker>
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">First — Let's Give <span className="text-primary">Systems Limited</span> Credit</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              We respect Systems Limited. They are genuinely one of Pakistan's top IT companies. Understanding their strengths helps you make the right choice for your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <Trophy className="w-8 h-8 text-yellow-500" />, title: "Export Awards Winner", desc: "Systems Limited has won Pakistan Software Export Board awards and international recognition for IT exports." },
              { icon: <Users className="w-8 h-8 text-blue-400" />, title: "600+ Enterprise Clients", desc: "Serving multinationals, banks, and large corporations across Pakistan and globally." },
              { icon: <Star className="w-8 h-8 text-purple-400" />, title: "Global Project Portfolio", desc: "Complex enterprise systems, ERP implementations, and international software projects." },
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="glass-panel p-8 rounded-2xl border border-white/10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">{s.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-10 max-w-2xl mx-auto">
            Their power is in enterprise, global, and large-scale projects. <strong className="text-white">That's exactly why SMEs need a different approach.</strong>
          </p>
        </div>
      </Section>

      {/* COMPARISON TABLE */}
      <Section id="comparison-table">
        <div className="container-width">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Side-by-Side <span className="text-primary">Comparison</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The honest comparison for Pakistani SMEs evaluating their IT partner.</p>
          </div>
          <div className="max-w-5xl mx-auto glass-panel rounded-[2rem] border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 bg-white/5 p-4 text-sm font-bold uppercase tracking-widest border-b border-white/10">
              <div className="text-muted-foreground">Aspect</div>
              <div className="text-center text-white">Systems Limited</div>
              <div className="text-center text-primary">Apexora Solutions ✓</div>
            </div>
            {comparison.map((row, i) => (
              <div key={i} className={`grid grid-cols-3 p-4 border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/[0.02]"} hover:bg-primary/5 transition-colors`}>
                <div className="font-semibold text-white text-sm">{row.aspect}</div>
                <div className="text-center text-muted-foreground text-sm px-2">{row.systems}</div>
                <div className="text-center text-primary font-semibold text-sm px-2">{row.apexora}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* APEXORA DIFFERENCE */}
      <Section id="apexora-difference" darker>
        <div className="container-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold mb-6">The <span className="text-primary">Apexora Difference</span> for Pakistani SMEs</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We are not trying to beat Systems Limited at their game. We play a different game — one built entirely around the needs of small and medium businesses in Pakistan.
              </p>
              <div className="space-y-5">
                {[
                  { icon: <Zap className="w-5 h-5 text-primary" />, t: "7-Day Delivery", d: "Real apps delivered in 7 days. Not months, not quarters." },
                  { icon: <Clock className="w-5 h-5 text-primary" />, t: "Fixed Pricing from 150k PKR", d: "Know exactly what you're paying before we start." },
                  { icon: <Phone className="w-5 h-5 text-primary" />, t: "Founder Direct Contact", d: "You talk to the CEO. No account managers, no junior staff." },
                  { icon: <CheckCircle className="w-5 h-5 text-primary" />, t: "Oracle APEX & Custom Software", d: "Enterprise-grade apps without enterprise-grade budgets." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">{item.icon}</div>
                    <div><div className="font-bold text-white mb-1">{item.t}</div><div className="text-muted-foreground text-sm">{item.d}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-panel p-10 rounded-[2.5rem] border border-primary/20 bg-primary/5">
              <h3 className="text-2xl font-bold mb-6 text-center">Start Your SME Project</h3>
              <div className="space-y-4 mb-8">
                {["Custom Software Development","Oracle APEX Applications","Digital Marketing & SEO","Web Development in Faisalabad","IT Solutions in Gojra Punjab"].map((s, i) => (
                  <div key={i} className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary shrink-0" /><span className="font-medium">{s}</span></div>
                ))}
              </div>
              <a href="tel:+923104222105" className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-primary text-background font-bold text-lg hover:bg-white transition-all">
                <Phone className="w-5 h-5" /> Call Founder: +92 310 4222105
              </a>
              <Link href="/#contact"><div className="mt-4 w-full py-4 rounded-2xl border border-primary/30 text-primary font-bold text-center cursor-pointer hover:bg-primary/10 transition-all">Send a Message</div></Link>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="vs-faq">
        <div className="container-width max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
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

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-muted-foreground font-medium">Systems Limited Alternative for SMEs | Custom Software Development Pakistan | <span className="text-primary font-bold">Apexora Solutions</span></p>
      </footer>
    </div>
  );
}
