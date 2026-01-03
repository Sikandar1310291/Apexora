import { z } from "zod";

export const insertInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export const insertTestimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  company: z.string().optional(),
  quote: z.string().min(1, "Quote is required"),
  rating: z.number().int().min(1).max(5).default(5),
  projectType: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const insertSubscriberSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = InsertInquiry & {
  id: number;
  createdAt: Date;
};

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = InsertTestimonial & {
  id: number;
};

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = InsertSubscriber & {
  id: number;
  subscribedAt: Date;
};

// API types
export type CreateInquiryRequest = InsertInquiry;
export type InquiryResponse = Inquiry;
export type TestimonialResponse = Testimonial;
