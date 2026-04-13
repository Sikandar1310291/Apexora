import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Apexora-Engine', 'Diagnostic-V1');

  const report: any = {
    timestamp: new Date().toISOString(),
    status: "ERROR",
    checks: {},
    error_details: null
  };

  try {
    // 1. Check Environment Variables
    report.checks.smtp_user = !!process.env.SMTP_USER;
    report.checks.smtp_pass = !!process.env.SMTP_PASS;
    report.checks.smtp_host = process.env.SMTP_HOST || "smtp.gmail.com";
    report.checks.smtp_port = process.env.SMTP_PORT || "587";

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      report.message = "FATAL: SMTP_USER or SMTP_PASS is missing in Vercel Settings.";
      return res.status(200).json(report);
    }

    // 2. Initialize Transport
    const transporter = nodemailer.createTransport({
      host: report.checks.smtp_host,
      port: parseInt(report.checks.smtp_port),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 5000,
    });

    // 3. Verify Connection
    try {
      await transporter.verify();
      report.checks.connection = "SUCCESS";
    } catch (verifyError: any) {
      report.checks.connection = "FAILED";
      report.error_details = verifyError.message;
      report.message = "GMAIL REJECTED: Your credentials are wrong or you need an App Password.";
      return res.status(200).json(report);
    }

    // 4. Send Test Email
    try {
      const info = await transporter.sendMail({
        from: `"Diagnostic Bot" <${process.env.SMTP_USER}>`,
        to: "apexorasolutions@gmail.com",
        subject: "DIAGNOSTIC TEST: It works!",
        text: "If you received this, your Gmail settings are 100% correct."
      });
      report.status = "SUCCESS";
      report.message = "ALL CHECKS PASSED. Email sent successfully.";
      report.messageId = info.messageId;
    } catch (sendError: any) {
      report.status = "PARTIAL_FAIL";
      report.message = "CONNECTED BUT FAILED TO SEND. Check sender permission.";
      report.error_details = sendError.message;
    }

  } catch (err: any) {
    report.message = "CODE CRASH: Unexpected server error.";
    report.error_details = err.message;
  }

  return res.status(200).json(report);
}
