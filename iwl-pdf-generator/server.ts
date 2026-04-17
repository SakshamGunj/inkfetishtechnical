import express from "express";
import { createServer as createViteServer } from "vite";
import admin from "firebase-admin";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

// Initialize Firebase Admin
const serviceAccountPath = path.resolve(process.cwd(), "serviceAccountKey.json");
if (fs.existsSync(serviceAccountPath)) {
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.warn("serviceAccountKey.json not found. Firebase Admin not initialized.");
}

const db = admin.firestore();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route to generate PDF
  app.get("/api/generate-pdf", async (req, res) => {
    try {
      const submissionsSnapshot = await db
        .collection("iwl_submissions")
        .where("selected", "==", true)
        .get();
      
      if (submissionsSnapshot.empty) {
        return res.status(404).json({ error: "No submissions found" });
      }

      // Create a PDF document
      const doc = new PDFDocument({ margin: 50 });
      
      // Load fonts
      const regularFontPath = path.resolve(process.cwd(), "freefont-20120503", "FreeSans.ttf");
      const boldFontPath = path.resolve(process.cwd(), "freefont-20120503", "FreeSansBold.ttf");
      
      if (fs.existsSync(regularFontPath) && fs.existsSync(boldFontPath)) {
        doc.registerFont("MainFont", regularFontPath);
        doc.registerFont("MainFont-Bold", boldFontPath);
      } else {
        console.warn("Main fonts not found, falling back to basic fonts.");
      }
      
      // Set response headers to trigger download
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "attachment; filename=submissions.pdf");
      
      // Pipe the PDF document to the response
      doc.pipe(res);

      // Add a title page
      doc.font("MainFont-Bold").fontSize(24).text("IWL Submissions Report", { align: "center" });
      doc.moveDown(2);
      doc.font("MainFont").fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: "center" });
      doc.addPage();

      let count = 0;
      submissionsSnapshot.forEach((docSnapshot) => {
        const data = docSnapshot.data();
        count++;

        if (count > 1) {
          doc.addPage();
        }

        // Author Info
        doc.font("MainFont-Bold").fontSize(18).text(`Submission #${count}`, { underline: true });
        doc.moveDown(0.5);
        doc.fontSize(12).font("MainFont-Bold").text("Author Details:");
        doc.font("MainFont").text(`Name: ${data.name || "N/A"}`);
        doc.text(`Email: ${data.email || "N/A"}`);
        doc.text(`WhatsApp: ${data.whatsapp || "N/A"}`);
        doc.text(`Category: ${data.category || "N/A"}`);
        doc.text(`Order ID: ${data.orderId || "N/A"}`);
        doc.text(`Plan: ${data.plan || "N/A"}`);
        doc.text(`Status: ${data.status || "N/A"}`);
        doc.moveDown(1);

        // Submission 1
        if (data.submission1) {
          doc.fontSize(14).font("MainFont-Bold").text("Submission 1");
          doc.moveDown(0.5);
          doc.fontSize(12).font("MainFont-Bold").text(`Title: ${data.submission1.title || "N/A"}`);
          doc.moveDown(0.5);
          doc.font("MainFont").text(data.submission1.content || "No content", {
            align: "justify",
            lineGap: 2,
          });
          doc.moveDown(1);
        }

        // Submission 2
        if (data.submission2) {
          doc.fontSize(14).font("MainFont-Bold").text("Submission 2");
          doc.moveDown(0.5);
          doc.fontSize(12).font("MainFont-Bold").text(`Title: ${data.submission2.title || "N/A"}`);
          doc.moveDown(0.5);
          doc.font("MainFont").text(data.submission2.content || "No content", {
            align: "justify",
            lineGap: 2,
          });
          doc.moveDown(1);
        }
      });

      // Finalize the PDF
      doc.end();
    } catch (error) {
      console.error("Error generating PDF:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: "Failed to generate PDF" });
      }
    }
  });

  // API route to get submissions
  app.get("/api/submissions", async (req, res) => {
    try {
      const submissionsSnapshot = await db
        .collection("iwl_submissions")
        .where("selected", "==", true)
        .get();
      
      const submissions: any[] = [];
      const seenEmails = new Set();

      submissionsSnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Deduplicate by email
        if (data.email) {
          if (seenEmails.has(data.email)) return;
          seenEmails.add(data.email);
        }

        // We only want to show ONE submission per person.
        // We will pass down a single `activeSubmission` object.
        let activeSubmission = null;

        const hasSub1 = data.submission1 && data.submission1.content && data.submission1.content.trim().length > 0;
        const hasSub2 = data.submission2 && data.submission2.content && data.submission2.content.trim().length > 0;

        if (hasSub1) {
          activeSubmission = data.submission1;
        } else if (hasSub2) {
          activeSubmission = data.submission2;
        }

        submissions.push({ 
          id: doc.id, 
          name: data.name,
          email: data.email,
          category: data.category,
          activeSubmission: activeSubmission
        });
      });

      return res.json({ submissions });
    } catch (error) {
      console.error("Error fetching submissions:", error);
      return res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.get("/api/submissions/:id", async (req, res) => {
    try {
      const docPath = req.params.id;
      const docSnapshot = await db.collection("iwl_submissions").doc(docPath).get();
      
      if (!docSnapshot.exists) {
        return res.status(404).json({ error: "Submission not found" });
      }

      const data = docSnapshot.data();
      let activeSubmission = null;

      if (data) {
        const hasSub1 = data.submission1 && data.submission1.content && data.submission1.content.trim().length > 0;
        const hasSub2 = data.submission2 && data.submission2.content && data.submission2.content.trim().length > 0;

        if (hasSub1) {
          activeSubmission = data.submission1;
        } else if (hasSub2) {
          activeSubmission = data.submission2;
        }

        return res.json({
          submission: {
            id: docSnapshot.id,
            name: data.name,
            email: data.email,
            category: data.category,
            activeSubmission: activeSubmission
          }
        });
      }

      return res.status(404).json({ error: "Data empty" });
    } catch (error) {
      console.error("Error fetching submission details:", error);
      return res.status(500).json({ error: "Failed to fetch submission details" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
