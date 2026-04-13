import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('X-Apexora-Engine', 'Nuclear-V1');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: "Valid email is required" });
  }

  const requestId = Math.random().toString(36).substring(7);
  console.log(`[${requestId}] Nuclear Subscriber Started`);

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
    });

    transporter.sendMail({
      from: `"Apexora Lab" <${user}>`,
      to: "apexorasolutions@gmail.com",
      subject: `[Nuclear-Subscriber] ${email}`,
      html: `<h3>New Newsletter Subscriber</h3><p><strong>Email:</strong> ${email}</p>`
    }).catch(e => console.error(`[${requestId}] Background Email Error:`, e.message));
  }

  return res.status(201).json({ message: "Subscription success", id: requestId });
}
