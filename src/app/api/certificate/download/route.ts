import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const pageIndexStr = searchParams.get("pageIndex");
    const name = searchParams.get("name") || "Certificate";

    if (pageIndexStr === null) {
      return NextResponse.json({ error: "Missing pageIndex" }, { status: 400 });
    }

    const pageIndex = parseInt(pageIndexStr, 10);
    if (isNaN(pageIndex) || pageIndex < 0) {
      return NextResponse.json({ error: "Invalid pageIndex" }, { status: 400 });
    }

    // Load the original PDF
    const pdfPath = path.join(process.cwd(), "public", "Shakespeare certificate_compressed.pdf");
    const pdfBytes = await fs.readFile(pdfPath);

    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    if (pageIndex >= pdfDoc.getPageCount()) {
      return NextResponse.json({ error: "Page index out of bounds" }, { status: 400 });
    }

    // Create a new PDF document with just the requested page
    const newPdfDoc = await PDFDocument.create();
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
    newPdfDoc.addPage(copiedPage);

    // Save the new PDF
    const newPdfBytes = await newPdfDoc.save();

    // Create a filename using the person's name
    const sanitizedName = name.replace(/[^a-zA-Z0-9 ]/g, "").trim().replace(/\s+/g, "_");
    const filename = `${sanitizedName}_SPA_Certificate.pdf`;

    // Return the PDF as a downloadable attachment
    return new NextResponse(newPdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": newPdfBytes.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error generating certificate PDF:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
