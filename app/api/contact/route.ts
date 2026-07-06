import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const submission = {
      id: Date.now().toString(),
      name,
      email,
      service,
      message,
      submittedAt: new Date().toISOString(),
    };

    // 1. Save locally to a submissions.json file in the root workspace folder
    const filePath = path.join(process.cwd(), "submissions.json");
    let existingSubmissions = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      try {
        existingSubmissions = JSON.parse(fileData || "[]");
      } catch (e) {
        existingSubmissions = [];
      }
    }

    existingSubmissions.push(submission);
    fs.writeFileSync(filePath, JSON.stringify(existingSubmissions, null, 2), "utf8");

    // 2. Output to the server console log
    console.log("================ CONTACT FORM SUBMISSION ================");
    console.log(`From: ${name} (${email})`);
    console.log(`Service Requested: ${service}`);
    console.log(`Message:\n${message}`);
    console.log("=========================================================");

    // 3. Send email using Nodemailer
    const host = process.env.EMAIL_HOST;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const to = process.env.EMAIL_TO || "omojuwababatunde1@gmail.com";

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port: parseInt(process.env.EMAIL_PORT || "465"),
        secure: process.env.EMAIL_SECURE === "true", // true for 465, false for 587
        auth: {
          user,
          pass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${user}>`,
        replyTo: email,
        to,
        subject: `New Portfolio Message from ${name}: ${service}`,
        text: `Name: ${name}\nEmail: ${email}\nService Requested: ${service}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #151c27; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #cbc3d7; border-radius: 12px; background-color: #f9f9ff;">
            <h2 style="color: #6b38d4; border-bottom: 2px solid #6b38d4; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #6b38d4; text-decoration: none;">${email}</a></p>
            <p><strong>Service Requested:</strong> <span style="background-color: #e9ddff; color: #5516be; padding: 4px 10px; border-radius: 9999px; font-size: 13px; font-weight: bold;">${service}</span></p>
            <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border: 1px solid #cbc3d7; border-radius: 8px;">
              <p style="margin-top: 0; font-weight: bold; color: #494454;">Message details:</p>
              <p style="white-space: pre-wrap; margin-bottom: 0;">${message}</p>
            </div>
            <p style="font-size: 11px; color: #7b7486; margin-top: 30px; text-align: center; border-top: 1px solid #cbc3d7; padding-top: 10px; margin-bottom: 0;">
              Submitted via Babatunde Omojuwa's Portfolio Website on ${new Date().toLocaleString()}
            </p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log("Email notification sent successfully via Nodemailer.");
    } else {
      console.warn("SMTP credentials not fully configured in environment variables. Email notification skipped.");
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been saved and sent successfully!",
    });
  } catch (error: any) {
    console.error("Contact API submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process message." },
      { status: 500 }
    );
  }
}
