import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Code, Database, Layout, Smartphone, BarChart3, Users, CheckCircle, Globe, Trophy, Brain, Loader2 } from "lucide-react";
import { SiReact, SiNextdotjs, SiNodedotjs, SiPython, SiMongodb, SiVuedotjs, SiAngular, SiLaravel, SiMysql, SiTypescript, SiTailwindcss, SiDocker, SiTensorflow, SiPytorch, SiPandas, SiScikitlearn, SiOpenai, SiJupyter, SiKeras, SiOpencv } from "react-icons/si";
import { Navigation } from "@/components/Navigation";
import { Section, SectionHeader } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { ContactForm } from "@/components/ContactForm";
import { useTestimonials } from "@/hooks/use-testimonials";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import splashVideo from "@assets/vedio_1767300785946.mp4";
import mobileSplashImg from "@assets/mobile_splash_v3.png";
import logo from "@assets/logo_1767381786801.png";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const typingTexts = ["Digital Reality", "Scalable Software", "Modern Experiences"];
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubscribing(true);
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", { email: newsletterEmail });
      toast({
        title: "Successfully Subscribed!",
        description: "You're now on the list for our latest updates and insights.",
      });
      setNewsletterEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "There was an error subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  // Testimonials Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const { data: testimonials } = useTestimonials();

  // Typing effect logic
  useEffect(() => {
    const handleTyping = () => {
      const fullText = typingTexts[textIndex];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % typingTexts.length);
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex]);

  const stats = [
    { label: "Projects Delivered", value: "150+", icon: <CheckCircle className="h-6 w-6 text-primary" /> },
    { label: "Client Satisfaction", value: "98%", icon: <Users className="h-6 w-6 text-primary" /> },
    { label: "Countries Served", value: "12", icon: <Globe className="h-6 w-6 text-primary" /> },
    { label: "Years Experience", value: "8+", icon: <Trophy className="h-6 w-6 text-primary" /> },
  ];

  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices for optimal performance.",
      icon: <Layout />,
      stats: "95%",
      subServices: ["React & Next.js Development", "Node.js Backend Solutions", "Database Design & Integration", "API Development & Integration", "Performance Optimization", "Progressive Web Apps (PWA)", "E-commerce Integration", "CMS Development"]
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      icon: <Smartphone />,
      stats: "95%",
      subServices: ["iOS & Android Development", "React Native Solutions", "Flutter Applications", "App Store Optimization", "Push Notification Integration", "Mobile UI/UX Refinement", "Offline Mode Capability", "Real-time Syncing"]
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to boost your online presence and drive growth.",
      icon: <BarChart3 />,
      stats: "92%",
      subServices: ["SEO Optimization", "Social Media Marketing", "Content Marketing Strategy", "PPC Campaign Management", "Email Marketing Automation", "Brand Identity Design", "Conversion Rate Optimization", "Analytics & Reporting"]
    },
    {
      title: "Artificial Intelligence",
      description: "Custom AI solutions that automate processes and provide intelligent insights for your business.",
      icon: <Brain />,
      stats: "88%",
      subServices: ["NLP & Chatbots", "Predictive Analytics", "Computer Vision", "Custom AI Models", "Machine Learning Automation", "Recommendation Engines", "Sentiment Analysis", "AI-Powered Personalization"]
    },
    {
      title: "Data Science",
      description: "Unlock actionable insights from your data with advanced statistical modeling and analysis.",
      icon: <Database />,
      stats: "90%",
      subServices: ["Data Mining", "Statistical Analysis", "Business Intelligence", "Machine Learning Pipelines", "Data Visualization", "Big Data Processing", "Predictive Modeling", "ETL Process Automation"]
    },
    {
      title: "Cloud Infrastructure",
      description: "Design and implement scalable, secure cloud architectures for high-performance applications.",
      icon: <Globe />,
      stats: "94%",
      subServices: ["AWS/Azure/GCP Setup", "Kubernetes Orchestration", "CI/CD Pipeline Automation", "Serverless Architecture", "Cloud Migration Services", "Disaster Recovery Planning", "Cost Optimization", "Identity & Access Management"]
    },
    {
      title: "Custom SaaS Solutions",
      description: "Build powerful software-as-a-service platforms designed for multi-tenancy and global scale.",
      icon: <Layout />,
      stats: "93%",
      subServices: ["Multi-tenant Architecture", "Subscription Management", "Scalable Backend Systems", "SaaS UI/UX Design", "API-First Development", "White-label Solutions", "Customer Analytics", "Onboarding Workflows"]
    }
  ];

  const teamExperts = [
    {
      role: "React Developers",
      specialty: "Frontend Specialists",
      description: "Expert React developers creating modern, responsive web applications with cutting-edge technologies.",
      experience: "3+ Years",
      projects: "10+ Projects",
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "React Query"],
      icon: <Code className="w-8 h-8 text-blue-500" />
    },
    {
      role: "Angular Developers",
      specialty: "Enterprise Solutions",
      description: "Skilled Angular developers building robust enterprise applications with scalable architecture.",
      experience: "2+ Years",
      projects: "12+ Projects",
      skills: ["Angular", "TypeScript", "RxJS", "NgRx", "Material UI", "Jest"],
      icon: <Code className="w-8 h-8 text-red-500" />
    },
    {
      role: "ML/AI Engineers",
      specialty: "Intelligence Solutions",
      description: "Machine Learning and AI specialists developing intelligent solutions and data-driven applications.",
      experience: "3+ Years",
      projects: "8+ Projects",
      skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenAI", "Computer Vision"],
      icon: <Brain className="w-8 h-8 text-purple-500" />
    },
    {
      role: "SaaS Developers",
      specialty: "Cloud Solutions",
      description: "SaaS specialists building scalable cloud-based solutions and multi-tenant applications.",
      experience: "4+ Years",
      projects: "10+ Projects",
      skills: ["Node.js", "AWS", "Docker", "Kubernetes", "Microservices", "API Design"],
      icon: <Globe className="w-8 h-8 text-emerald-500" />
    },
    {
      role: "Full Stack Developers",
      specialty: "End-to-End Solutions",
      description: "Versatile developers proficient in both frontend and backend technologies to deliver complete systems.",
      experience: "5+ Years",
      projects: "20+ Projects",
      skills: ["MERN Stack", "PostgreSQL", "GraphQL", "Redis", "Nginx", "CI/CD"],
      icon: <Layout className="w-8 h-8 text-orange-500" />
    },
    {
      role: "Cloud Architects",
      specialty: "Infrastructure Design",
      description: "Architecting secure, high-availability cloud infrastructures for global scale applications.",
      experience: "6+ Years",
      projects: "15+ Projects",
      skills: ["Azure", "GCP", "Terraform", "Serverless", "Security", "Networking"],
      icon: <Globe className="w-8 h-8 text-cyan-500" />
    },
    {
      role: "DevOps Engineers",
      specialty: "Automation & Reliability",
      description: "Specializing in streamlining development workflows and maintaining production stability.",
      experience: "4+ Years",
      projects: "12+ Projects",
      skills: ["Jenkins", "GitLab CI", "Ansible", "Monitoring", "Log Analysis", "Shell"],
      icon: <Smartphone className="w-8 h-8 text-pink-500" />
    },
    {
      role: "Product Designers",
      specialty: "User Experience",
      description: "Crafting intuitive and visually stunning interfaces that prioritize user needs and brand identity.",
      experience: "3+ Years",
      projects: "18+ Projects",
      skills: ["Figma", "Adobe XD", "Prototyping", "Design Systems", "User Testing", "Motion"],
      icon: <Users className="w-8 h-8 text-yellow-500" />
    }
  ];

  const [teamEmblaRef, teamEmblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const [teamSelectedIndex, setTeamSelectedIndex] = useState(0);

  useEffect(() => {
    if (!teamEmblaApi) return;
    teamEmblaApi.on("select", () => {
      setTeamSelectedIndex(teamEmblaApi.selectedScrollSnap());
    });
  }, [teamEmblaApi]);

  const techStack = [
    { name: "React", category: "FRONTEND", icon: <SiReact className="w-10 h-10 text-[#61DAFB]" /> },
    { name: "Next.js", category: "FRAMEWORK", icon: <SiNextdotjs className="w-10 h-10 text-white" /> },
    { name: "Node.js", category: "BACKEND", icon: <SiNodedotjs className="w-10 h-10 text-[#339933]" /> },
    { name: "Python", category: "BACKEND", icon: <SiPython className="w-10 h-10 text-[#3776AB]" /> },
    { name: "MongoDB", category: "DATABASE", icon: <SiMongodb className="w-10 h-10 text-[#47A248]" /> },
    { name: "Vue.js", category: "FRONTEND", icon: <SiVuedotjs className="w-10 h-10 text-[#4FC08D]" /> },
    { name: "Angular", category: "FRAMEWORK", icon: <SiAngular className="w-10 h-10 text-[#DD0031]" /> },
    { name: "Laravel", category: "BACKEND", icon: <SiLaravel className="w-10 h-10 text-[#FF2D20]" /> },
    { name: "MySQL", category: "DATABASE", icon: <SiMysql className="w-10 h-10 text-[#4479A1]" /> },
    { name: "TypeScript", category: "LANGUAGE", icon: <SiTypescript className="w-10 h-10 text-[#3178C6]" /> },
    { name: "Tailwind CSS", category: "STYLING", icon: <SiTailwindcss className="w-10 h-10 text-[#06B6D4]" /> },
    { name: "Docker", category: "DEVOPS", icon: <SiDocker className="w-10 h-10 text-[#2496ED]" /> },
  ];

  const aiTechStack = [
    { name: "TensorFlow", category: "AI/ML", icon: <SiTensorflow className="w-10 h-10 text-[#FF6F00]" /> },
    { name: "PyTorch", category: "AI/ML", icon: <SiPytorch className="w-10 h-10 text-[#EE4C2C]" /> },
    { name: "OpenAI", category: "AI", icon: <SiOpenai className="w-10 h-10 text-white" /> },
    { name: "Pandas", category: "DATA SCIENCE", icon: <SiPandas className="w-10 h-10 text-[#150458]" /> },
    { name: "Scikit-Learn", category: "ML", icon: <SiScikitlearn className="w-10 h-10 text-[#F7931E]" /> },
    { name: "Jupyter", category: "DATA SCIENCE", icon: <SiJupyter className="w-10 h-10 text-[#F37626]" /> },
    { name: "Keras", category: "AI/ML", icon: <SiKeras className="w-10 h-10 text-[#D00000]" /> },
    { name: "OpenCV", category: "COMPUTER VISION", icon: <SiOpencv className="w-10 h-10 text-[#5C3EE8]" /> },
  ];

  const [techEmblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 1500, stopOnInteraction: false })]);
  const [aiTechEmblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 2500, stopOnInteraction: false })]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-black">
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onAnimationComplete={() => {
              window.scrollTo(0, 0);
              // Ensure we don't accidentally scroll during splash
            }}
            className="fixed inset-0 z-[100] bg-black overflow-hidden pointer-events-auto"
            style={{ height: '100dvh' } as any}
          >
            {isMobile ? (
              /* MOBILE SPLASH V3 - CINEMATIC MOTION DESIGN */
              <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#050608] overflow-hidden">
                {/* Layer 1: Parallax Background */}
                <motion.div
                  initial={{ scale: 1.4, opacity: 0, rotate: -5 }}
                  animate={{ scale: 1, opacity: 0.8, rotate: 0 }}
                  transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={mobileSplashImg}
                    className="w-full h-full object-cover"
                    alt="Background"
                  />
                </motion.div>

                {/* Layer 2: Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />

                {/* Layer 3: Dynamic Particles (CSS-based simulation) */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        x: Math.random() * 100 + "%",
                        y: Math.random() * 100 + "%",
                        opacity: 0,
                        scale: 0
                      }}
                      animate={{
                        y: ["-10%", "110%"],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                      }}
                      className="absolute w-1 h-1 bg-primary/40 rounded-full blur-[1px]"
                    />
                  ))}
                </div>

                {/* Layer 4: Floating Content Wrapper */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
                  className="relative z-10 flex flex-col items-center"
                >
                  {/* Advanced Logo Ring */}
                  <div className="w-32 h-32 mb-8 relative">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.05, 1],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className="absolute inset-[-15px] rounded-full border border-primary/20 bg-primary/5 blur-sm"
                    />
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 1, type: "spring" }}
                      className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-center p-4 shadow-2xl shadow-primary/20"
                    >
                      <img
                        src={logo}
                        alt="Logo"
                        className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,168,150,0.5)]"
                      />
                    </motion.div>
                  </div>

                  {/* Staggered Typography */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      <h1 className="text-6xl font-display font-black text-white tracking-tighter flex items-center gap-1">
                        <span className="text-primary text-glow">A</span>
                        <span className="relative">
                          pexora
                          <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 2, duration: 1, ease: "circOut" }}
                            className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-transparent origin-left"
                          />
                        </span>
                      </h1>
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.5, y: 0 }}
                      transition={{ delay: 2.2, duration: 1 }}
                      className="text-[10px] text-white uppercase tracking-[0.6em] mt-6 font-black"
                    >
                      The Future of Development
                    </motion.p>
                  </div>
                </motion.div>

                {/* Layer 5: High-End Progress Bar */}
                <div className="absolute bottom-24 left-16 right-16 z-10">
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold mb-4 text-center">
                    System Loading
                  </div>
                  <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden border-x border-white/10 relative">
                    {/* Glowing background bar */}
                    <div className="absolute inset-0 bg-primary/20 blur-[1px]" />

                    {/* Main progress handler */}
                    <motion.div
                      initial={{ left: "-100%" }}
                      animate={{ left: "0%" }}
                      transition={{ duration: 4.5, ease: [0.65, 0, 0.35, 1] }}
                      onAnimationComplete={() => setShowSplash(false)}
                      className="absolute top-0 bottom-0 w-full bg-gradient-to-r from-transparent via-primary to-transparent"
                    >
                      {/* Leading edge glow */}
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-4 bg-primary blur-md rounded-full opacity-50" />
                    </motion.div>
                  </div>

                  {/* Counter */}
                  <div className="mt-4 flex justify-between items-center px-1">
                    <motion.span
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-[8px] text-white/50 font-mono"
                    >
                      0xBF45
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                      className="text-[8px] text-white/50 font-mono"
                    >
                      STABLE
                    </motion.span>
                  </div>
                </div>

                {/* Shutter Close Effect on Exit */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  exit={{ scaleY: 1 }}
                  transition={{ duration: 0.5, ease: "circIn" }}
                  className="absolute inset-0 bg-black z-[101] origin-top pointer-events-none"
                />
              </div>
            ) : (
              /* DESKTOP SPLASH (Old Video) */
              <>
                <video
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => setShowSplash(false)}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    width: '100vw',
                    height: '100dvh',
                    objectFit: 'cover'
                  } as any}
                >
                  <source src={splashVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </>
            )}

            <button
              onClick={() => setShowSplash(false)}
              className="absolute bottom-12 left-1/2 -translate-x-1/2 px-8 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 rounded-full text-white text-xs uppercase tracking-[0.2em] transition-all font-bold z-20 whitespace-nowrap shadow-[0_0_30px_rgba(0,0,0,0.5)] active:scale-95"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <div className="container-width relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
              INNOVATING THE FUTURE
            </div>
            <h1 className="text-4xl md:text-7xl font-display font-bold leading-tight mb-6 mt-4">
              Transform Your Ideas Into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary min-h-[1.2em] inline-block">
                {currentText}
                <span className="animate-pulse text-white">|</span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
              We build exceptional digital products that empower businesses to scale, innovate, and lead in the digital era.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 md:py-4 rounded-full bg-primary text-black font-bold text-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(0,168,150,0.3)] hover:shadow-[0_0_40px_rgba(0,168,150,0.5)] flex items-center justify-center gap-2 group"
              >
                Start Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 md:py-4 rounded-full border border-white/20 text-white font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Our Expertise
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 glass-panel rounded-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* Abstract Code UI representation */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex">
                  <span className="text-purple-400 mr-2">const</span>
                  <span className="text-blue-400">Innovation</span>
                  <span className="text-white mx-2">=</span>
                  <span className="text-white">{"{"}</span>
                </div>
                <div className="pl-4">
                  <span className="text-gray-400">quality:</span> <span className="text-green-400">100%</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-400">speed:</span> <span className="text-orange-400">"Light Speed"</span>,
                </div>
                <div className="pl-4">
                  <span className="text-gray-400">stack:</span> <span className="text-yellow-300">["React", "AI", "Cloud"]</span>
                </div>
                <div className="text-white">{"}"}</div>
                <div className="h-4" />
                <div className="text-gray-500">// Deploying future...</div>
                <div className="w-full bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-black border border-gray-800 p-4 rounded-xl shadow-2xl z-20"
            >
              <Code className="text-primary h-8 w-8" />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 bg-black border border-gray-800 p-4 rounded-xl shadow-2xl z-20"
            >
              <Database className="text-secondary h-8 w-8" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <Section id="about" darker>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader title="Crafting Digital Excellence" subtitle="We are a team of visionary developers, designers, and strategists committed to pushing the boundaries of what's possible on the web." align="left" />

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Innovation First</h4>
                  <p className="text-muted-foreground">We stay ahead of the curve, leveraging the latest technologies to give you a competitive edge.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Customer Centric</h4>
                  <p className="text-muted-foreground">Your success is our success. We work collaboratively to ensure your vision comes to life exactly as imagined.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 rounded-2xl text-center"
              >
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* SERVICES SECTION */}
      <Section id="services">
        <SectionHeader
          title="Our Services"
          subtitle="We offer a comprehensive range of services to help your business thrive in the digital age. From development to marketing, we've got you covered."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              {...service}
            />
          ))}
        </div>
      </Section>

      {/* TEAM SECTION */}
      <Section id="team" darker>
        <SectionHeader title="Our Expert Team" subtitle="Meet our diverse team of skilled professionals specializing in cutting-edge technologies and innovative solutions." />

        <div className="relative max-w-4xl mx-auto mt-12">
          <div className="overflow-hidden" ref={teamEmblaRef}>
            <div className="flex">
              {teamExperts.map((expert, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="glass-panel p-6 md:p-12 text-center relative border border-white/10 hover:border-primary/30 transition-all group overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="w-20 h-20 rounded-2xl bg-primary/10 mx-auto mb-8 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                      {expert.icon}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2 tracking-tight group-hover:text-primary transition-colors">{expert.role}</h3>
                    <p className="text-primary/80 font-semibold text-lg mb-6 uppercase tracking-wider">{expert.specialty}</p>

                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                      {expert.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 md:gap-8 mb-10 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{expert.experience}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl md:text-3xl font-bold text-white mb-1">{expert.projects}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Completed</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                      {expert.skills.map((skill, i) => (
                        <span key={i} className="px-4 py-1.5 rounded-full bg-white/5 text-gray-400 text-xs font-bold border border-white/5 group-hover:border-primary/20 group-hover:text-primary/70 transition-colors duration-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => teamEmblaApi?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg hover:bg-primary hover:text-black transition-all z-10 text-white"
          >
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <button
            onClick={() => teamEmblaApi?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg hover:bg-primary hover:text-black transition-all z-10 text-white"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {teamExperts.map((_, i) => (
              <button
                key={i}
                onClick={() => teamEmblaApi?.scrollTo(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${teamSelectedIndex === i ? "bg-primary w-8" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS SECTION */}
      <Section id="testimonials">
        <SectionHeader title="Client Stories" subtitle="Don't just take our word for it. Here's what our partners say." />

        {testimonials && testimonials.length > 0 ? (
          <div className="relative max-w-4xl mx-auto px-4 mt-12">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((t, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0 px-4">
                    <div className="glass-panel p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] text-center relative border border-white/10 hover:border-primary/30 transition-all group overflow-hidden h-full flex flex-col justify-center items-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="w-20 h-20 rounded-full bg-primary/10 mb-8 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                        <Users className="w-10 h-10 text-primary" />
                      </div>

                      <div className="text-6xl text-primary/10 font-serif absolute top-8 left-8">"</div>

                      <p className="text-lg md:text-2xl text-white font-medium italic mb-10 relative z-10 leading-relaxed tracking-tight max-w-2xl px-2">
                        {t.quote}
                      </p>

                      <div className="flex flex-col items-center">
                        <h4 className="text-xl font-bold text-primary mb-2 tracking-tight">{t.name}</h4>
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Trophy key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <div className="text-sm text-gray-400 uppercase tracking-widest font-bold">
                          {t.title} <span className="text-primary/50 mx-2">|</span> {t.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg hover:bg-primary hover:text-black transition-all z-10 text-white"
            >
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-background/50 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg hover:bg-primary hover:text-black transition-all z-10 text-white"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        ) : (
          /* Fallback static testimonials if API empty */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-2xl">
              <p className="italic text-gray-300 mb-6">"TechVision transformed our outdated platform into a modern, high-speed application that our users love. Their attention to detail is unmatched."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700" />
                <div>
                  <h5 className="font-bold text-white">Michael Ross</h5>
                  <p className="text-xs text-gray-400">CEO, FinTech Global</p>
                </div>
              </div>
            </div>
            <div className="glass-panel p-8 rounded-2xl">
              <p className="italic text-gray-300 mb-6">"The team was professional, responsive, and technically brilliant. They solved complex data problems we've been struggling with for years."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-700" />
                <div>
                  <h5 className="font-bold text-white">Jessica Wong</h5>
                  <p className="text-xs text-gray-400">CTO, HealthPlus</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* TECHNOLOGY STACK SECTION */}
      <Section id="tech-stack">
        <SectionHeader
          title="Our Technology Stack"
          subtitle="We leverage cutting-edge technologies and frameworks to deliver robust, scalable, and innovative solutions."
        />

        <div className="relative mt-12 overflow-hidden" ref={techEmblaRef}>
          <div className="flex">
            {techStack.map((tech, index) => (
              <div key={index} className="flex-[0_0_percentage] min-w-0 px-2 md:px-4" style={{ flex: '0 0 33.333333%' } as any}>
                <div className="glass-panel p-4 md:p-8 rounded-2xl text-center border border-white/10 hover:border-primary/30 transition-all group flex flex-col items-center justify-center aspect-square md:aspect-auto md:h-48">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-500">
                    {tech.icon}
                  </div>
                  <h4 className="text-white font-bold mb-1">{tech.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{tech.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden" ref={aiTechEmblaRef}>
          <div className="flex">
            {aiTechStack.map((tech, index) => (
              <div key={index} className="flex-[0_0_percentage] min-w-0 px-2 md:px-4" style={{ flex: '0 0 33.333333%' } as any}>
                <div className="glass-panel p-4 md:p-8 rounded-2xl text-center border border-white/10 hover:border-primary/30 transition-all group flex flex-col items-center justify-center aspect-square md:aspect-auto md:h-48">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-500">
                    {tech.icon}
                  </div>
                  <h4 className="text-white font-bold mb-1">{tech.name}</h4>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{tech.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section id="contact" darker className="pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <SectionHeader title="Let's Build Something Great" subtitle="Ready to start your next project? Get in touch with us for a free consultation." align="left" />

            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Smartphone className="text-primary" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white mb-1">Phone</h5>
                  <p className="text-gray-400">+923046211219</p>
                  <p className="text-gray-500 text-sm mt-1">Mon-Fri, 9am - 6pm PKT</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Globe className="text-primary" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white mb-1">Email</h5>
                  <p className="text-gray-400">apexorasolutions@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Users className="text-primary" />
                </div>
                <div>
                  <h5 className="text-lg font-bold text-white mb-1">Careers</h5>
                  <p className="text-gray-400">Join our team of innovators.</p>
                  <a href="#contact" className="text-primary text-sm font-bold hover:underline mt-1 block group flex items-center gap-1">
                    View Open Positions
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tighter">apexora</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Empowering businesses with cutting-edge software solutions.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary">Web Development</a></li>
                <li><a href="#" className="hover:text-primary">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-primary">UI/UX Design</a></li>
                <li><a href="#" className="hover:text-primary">Cloud Solutions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-full"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="bg-primary text-black px-4 py-2 rounded-r-lg font-bold hover:bg-white transition-colors disabled:opacity-50"
                >
                  {isSubscribing ? <Loader2 className="w-4 h-4 animate-spin" /> : "Go"}
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">© 2024 apexora solutions. All rights reserved.</p>
            <div className="flex gap-6 text-gray-500">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
