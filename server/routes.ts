import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";

async function seedDatabase() {
  const existing = await storage.getTestimonials();
  if (existing.length === 0) {
    await storage.createTestimonial({
      name: "Sarah Chen",
      title: "CTO",
      company: "TechFlow Solutions",
      quote: "Apexora transformed our legacy infrastructure into a scalable cloud-native powerhouse. Their technical expertise is unmatched.",
      rating: 5,
      projectType: "Cloud Migration",
    });
    await storage.createTestimonial({
      name: "Marcus Rodriguez",
      title: "Product Director",
      company: "Innovate Inc",
      quote: "The mobile app they built for us captured our brand perfectly and performs flawlessly on both platforms.",
      rating: 5,
      projectType: "Mobile App Development",
    });
    await storage.createTestimonial({
      name: "Emily Watson",
      title: "Marketing Head",
      company: "Growth Digital",
      quote: "Their data analytics dashboard gave us insights we didn't know we were missing. Truly game-changing for our strategy.",
      rating: 5,
      projectType: "Data Analytics",
    });
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed data on startup
  seedDatabase().catch(console.error);

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      
      // LOGIC FOR EMAIL NOTIFICATION
      console.log(`Notification: New message from ${input.name} (${input.email}) regarding "${input.subject}" to be delivered to apexorasolutions@gmail.com`);
      
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const input = insertSubscriberSchema.parse(req.body);
      await storage.subscribeNewsletter(input);
      res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.testimonials.list.path, async (req, res) => {
    const list = await storage.getTestimonials();
    res.json(list);
  });

  return httpServer;
}
