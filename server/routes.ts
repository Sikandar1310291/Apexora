import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { insertSubscriberSchema } from "../shared/schema";
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
      // GOOGLE-HARDENED: Validation of credentials before initialization
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      if (!user || !pass) {
        console.warn('[Email] SKIPPING: SMTP credentials not set in environment variables.');
        return;
      }

      console.log(`[Email] Lazy-initializing transport for: ${options.subject}`);
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user, pass },
        // Hard timeout to prevent lambda hanging
        connectionTimeout: 5000, 
        greetingTimeout: 5000,
        socketTimeout: 5000,
      });

      const mailOptions = {
        from: `"Apexora Notifications" <${user}>`,
        to: "apexorasolutions@gmail.com",
        replyTo: options.replyTo,
        subject: options.subject,
        text: options.text,
        html: options.html,
      };

      // Always background this with a silent catch
      transporter.sendMail(mailOptions)
        .then(info => console.log('[Email] Handed off successfully:', info.messageId))
        .catch(err => console.error('[Email] Background SMTP Error (Silent):', (err as Error).message));
        
    } catch (err: any) {
      // Fatal errors in transporter creation are still caught here to prevent process crash
      console.error('[Email] Fatal Initialization Error (Silent):', err.message);
    }
  }

  app.post(api.inquiries.create.path, async (req, res) => {
    const requestId = Math.random().toString(36).substring(7);
    console.log(`[${requestId}] [API] POST /api/inquiries requested`);
    res.setHeader('X-Apexora-Status', 'Hardened-V3-Google');
    
    try {
      const input = api.inquiries.create.input.parse(req.body);
      console.log(`[${requestId}] [API] Input validated successfully`);
      
      const inquiry = await storage.createInquiry(input);
      console.log(`[${requestId}] [API] Inquiry saved to storage (ID: ${inquiry.id})`);
      
      // EMAIL NOTIFICATION - DECIPHERED FROM MAIN FLOW
      // We use setImmediate to ensure the response is sent to the client first.
      // This makes the API atomic and resilient to SMTP failures.
      setImmediate(() => {
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
        }).catch(err => console.error(`[${requestId}] [Email] Background error:`, err));
      });
      
      res.status(201).json(inquiry);
    } catch (err) {
      console.error(`[${requestId}] [API] Critical failure in /api/inquiries handler:`, err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ 
        message: "Your message was not sent. Please check your internet connection and try again.",
        id: requestId 
      });
    }
  });

  app.post("/api/newsletter/subscribe", async (req, res) => {
    const requestId = Math.random().toString(36).substring(7);
    console.log(`[${requestId}] [API] POST /api/newsletter/subscribe requested`);
    res.setHeader('X-Apexora-Status', 'Hardened-V3-Google');
    try {
      const input = insertSubscriberSchema.parse(req.body);
      await storage.subscribeNewsletter(input);
      console.log(`[${requestId}] [API] Newsletter subscription saved`);

      // EMAIL NOTIFICATION - BACKGROUNDED
      setImmediate(() => {
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
        }).catch(err => console.error(`[${requestId}] [Email] Background error:`, err));
      });

      res.status(201).json({ message: "Subscribed successfully" });
    } catch (err) {
      console.error(`[${requestId}] [API] Critical failure in newsletter handler:`, err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.status(500).json({ message: "Unable to process subscription at this time.", id: requestId });
    }
  });

  app.get(api.testimonials.list.path, async (req, res) => {
    const list = await storage.getTestimonials();
    res.json(list);
  });

  return httpServer;
}
