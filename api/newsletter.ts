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
        subject: `📩 [New Subscriber] ${email}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
            <div style="background-color: #00a896; padding: 25px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Newsletter Subscription</h1>
            </div>
            <div style="padding: 30px; color: #333333; line-height: 1.6;">
              <p style="margin-bottom: 20px;">Great news! A new user has subscribed to the <strong>Apexora</strong> newsletter.</p>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border-left: 4px solid #00a896; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Subscriber Email:</strong> <a href="mailto:${email}" style="color: #00a896; text-decoration: none;">${email}</a></p>
                <p style="margin: 5px 0;"><strong>System ID:</strong> ${requestId}</p>
              </div>

              <p style="color: #777777; font-size: 14px;">You can now include this user in your next marketing campaign.</p>
            </div>
            <div style="background-color: #f4f4f4; padding: 15px; text-align: center; color: #777777; font-size: 12px;">
              <p style="margin: 0;">&copy; 2026 Apexora Solutions | System: NUCLEAR-V1</p>
            </div>
          </div>
        `
      }).then(() => {
        console.log(`[${requestId}] Newsletter alert sent to apexorasolutions@gmail.com`);
      }).catch(e => {
        console.error(`[${requestId}] Background Email Error:`, e.message);
      });
    } else {
      console.warn(`[${requestId}] ⚠️ EMAIL SKIPPED: Missing SMTP_USER or SMTP_PASS for newsletter alert.`);
    }

  return res.status(201).json({ message: "Subscription success", id: requestId });
}
