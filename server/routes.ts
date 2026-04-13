import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";

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

  // Helper to send email notifications
  async function sendNotificationEmail(options: { subject: string; text: string; html: string; replyTo?: string }) {
    try {
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn('⚠️ SMTP_USER or SMTP_PASS not found in environment. Email notification will be skipped.');
        return;
      }

      console.log(`[Email] Preparing to send: ${options.subject}`);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"Apexora Notifications" <${process.env.SMTP_USER || 'notifications@apexora.com'}>`,
        to: "apexorasolutions@gmail.com",
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log('[Email] Success: ' + info.response);
      return info;
    } catch (err) {
      console.error('[Email] Failed to send email notification:', err);
    }
  }

  app.post(api.inquiries.create.path, async (req, res) => {
    console.log('[API] POST /api/inquiries received');
    try {
      const input = api.inquiries.create.input.parse(req.body);
      console.log('[API] Input validated successfully');
      
      const inquiry = await storage.createInquiry(input);
      console.log('[API] Inquiry saved to storage');
      
      // EMAIL NOTIFICATION - Wrapped in try/catch to ensure it doesn't break the response
      try {
        sendNotificationEmail({
          subject: `New Inquiry: ${input.subject}`,
          replyTo: input.email,
          text: `Name: ${input.name}\nEmail: ${input.email}\nSubject: ${input.subject}\n\nMessage:\n${input.message}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h2 style="color: #00a896;">New Inquiry from Apexora Solutions</h2>
              <p><strong>Name:</strong> ${input.name}</p>
              <p><strong>Email:</strong> ${input.email}</p>
              <p><strong>Subject:</strong> ${input.subject}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="white-space: pre-wrap;">${input.message}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('[API] Non-critical error triggering email notification:', emailErr);
      }
      
      res.status(201).json(inquiry);
    } catch (err) {
      console.error('[API] Error in /api/inquiries handler:', err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "An unexpected error occurred while processing your message." });
    }
  });

  app.post("/api/newsletter/subscribe", async (req, res) => {
    console.log('[API] POST /api/newsletter/subscribe received');
    try {
      const input = insertSubscriberSchema.parse(req.body);
      await storage.subscribeNewsletter(input);

      // EMAIL NOTIFICATION - Wrapped in try/catch to ensure it doesn't break the response
      try {
        sendNotificationEmail({
          subject: `New Newsletter Subscriber`,
          text: `A new user has subscribed to the newsletter: ${input.email}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
              <h2 style="color: #00a896;">New Newsletter Subscription</h2>
              <p>A new user has subscribed to the Apexora Solutions newsletter.</p>
              <p><strong>Email:</strong> ${input.email}</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('[API] Non-critical error triggering newsletter notification:', emailErr);
      }

      res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
      console.error('[API] Error in /api/newsletter/subscribe handler:', err);
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

  // Explicit route for Medixa Setup v1.5 to ensure correct filename during download
  app.get("/medixa/Medixa_Setup_v1.5.exe", (req, res) => {
    const filePath = path.resolve(process.cwd(), "client", "public", "medixa", "Medixa_Setup_v1.5.exe");
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Disposition', 'attachment; filename="Medixa_Setup_v1.5.exe"');
      res.sendFile(filePath);
    } else {
      res.status(404).send("File not found");
    }
  });

  return httpServer;
}
