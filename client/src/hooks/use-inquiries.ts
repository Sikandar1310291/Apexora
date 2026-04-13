import { useMutation } from "@tanstack/react-query";
import { api, type InsertInquiry } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateInquiry() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      // Validate locally first using the Zod schema from routes
      const validated = api.inquiries.create.input.parse(data);
      
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("text/html")) {
          throw new Error(`Server Error (${res.status}): Lambda returned HTML. Check deployment logs.`);
        }

        if (res.status === 400) {
          const error = await res.json();
          // Try to parse as our known validation error format
          try {
            const parsedError = api.inquiries.create.responses[400].parse(error);
            throw new Error(parsedError.message);
          } catch {
            throw new Error(error.message || "Validation failed");
          }
        }
        throw new Error(`Server Error (${res.status}): Failed to send inquiry`);
      }

      return api.inquiries.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "We've received your inquiry and will get back to you soon.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
