import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Loader2, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const { mutate, isPending } = useCreateInquiry();
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(api.inquiries.create.input),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    console.log("Submitting form data:", data);
    mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "We've received your inquiry and will get back to you soon.",
        });
        form.reset();
      },
      onError: (error) => {
        console.error("Form submission error:", error);
        toast({
          title: "Submission Failed",
          description: "There was an error sending your message. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <motion.form
      onSubmit={form.handleSubmit(onSubmit)}
      className="glass-panel p-6 md:p-10 rounded-3xl space-y-6"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Your Name</label>
          <input
            {...form.register("name")}
            className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-white"
            placeholder="John Doe"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-400">Email Address</label>
          <input
            {...form.register("email")}
            type="email"
            className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-white"
            placeholder="john@example.com"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">Subject</label>
        <input
          {...form.register("subject")}
          className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-white"
          placeholder="Project Inquiry"
        />
        {form.formState.errors.subject && (
          <p className="text-red-500 text-xs mt-1">{form.formState.errors.subject.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-400">Message</label>
        <textarea
          {...form.register("message")}
          rows={5}
          className="w-full px-4 py-3 bg-background/50 border border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-600 text-white resize-none"
          placeholder="Tell us about your project..."
        />
        {form.formState.errors.message && (
          <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(0,168,150,0.4)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            Sending...
          </>
        ) : (
          <>
            Send Message
            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </motion.form>
  );
}
