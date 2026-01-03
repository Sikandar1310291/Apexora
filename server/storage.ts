import {
  type InsertInquiry, type InsertTestimonial, type InsertSubscriber,
  type Inquiry, type Testimonial, type Subscriber
} from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  subscribeNewsletter(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private inquiries: Inquiry[] = [];
  private testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Michael Ross",
      title: "CEO",
      company: "FinTech Global",
      quote: "TechVision transformed our outdated platform into a modern, high-speed application that our users love. Their attention to detail is unmatched.",
      rating: 5,
      projectType: "Direct Client",
      imageUrl: undefined
    },
    {
      id: 2,
      name: "Jessica Wong",
      title: "CTO",
      company: "HealthPlus",
      quote: "The team was professional, responsive, and technically brilliant. They solved complex data problems we've been struggling with for years.",
      rating: 5,
      projectType: "Direct Client",
      imageUrl: undefined
    },
    {
      id: 3,
      name: "David Miller",
      title: "Founder",
      company: "Upwork Client",
      quote: "Absolutely phenomenal work! They built our SaaS MVP from scratch and the code quality is top-tier. Communication was seamless throughout the project.",
      rating: 5,
      projectType: "Upwork",
      imageUrl: undefined
    },
    {
      id: 4,
      name: "Sarah Jenkins",
      title: "Marketing Director",
      company: "Fiverr Client",
      quote: "Delivered the project well ahead of schedule. The UI designs were exactly what we envisioned, and the functionality is flawless. Highly recommended!",
      rating: 5,
      projectType: "Fiverr",
      imageUrl: undefined
    },
    {
      id: 5,
      name: "Robert Chen",
      title: "Product Leade",
      company: "Upwork Client",
      quote: "One of the best development teams I've hired on Upwork. They understood the assignment immediately and delivered a bug-free product.",
      rating: 5,
      projectType: "Upwork",
      imageUrl: undefined
    }
  ];
  private subscribers: Subscriber[] = [];
  private idCounter = 6;

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const newInquiry: Inquiry = { ...inquiry, id: this.idCounter++, createdAt: new Date() };
    this.inquiries.push(newInquiry);
    return newInquiry;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const newTestimonial: Testimonial = { ...testimonial, id: this.idCounter++ };
    this.testimonials.push(newTestimonial);
    return newTestimonial;
  }

  async subscribeNewsletter(subscriber: InsertSubscriber): Promise<Subscriber> {
    const newSubscriber: Subscriber = { ...subscriber, id: this.idCounter++, subscribedAt: new Date() };
    this.subscribers.push(newSubscriber);
    return newSubscriber;
  }
}

export const storage = new MemStorage();
