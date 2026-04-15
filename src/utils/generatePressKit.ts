import { jsPDF } from 'jspdf';

export const generateRetroPressKit = (authorData: any) => {
    // Initialize PDF in Portrait mode, inches (for easier classic layout)
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter' // 612 x 792 points
    });

    const margin = 40;
    const pageWidth = doc.internal.pageSize.width;
    const maxContentWidth = pageWidth - (margin * 2);

    // Styling configuration for "Retro Dossier" look
    const fontPrimary = 'courier';
    const colorBlack = '#000000';
    const colorGray = '#666666';
    const colorBg = '#FFFDF7';
    const colorAccent = '#FF4F00';
    const colorGreen = '#39FF14';

    // --- HELPER FUNCTIONS ---
    // Fill the page background
    const fillBackground = () => {
        doc.setFillColor(colorBg);
        doc.rect(0, 0, pageWidth, doc.internal.pageSize.height, 'F');
    };

    const drawThickBorder = (yPositions: number[]) => {
        doc.setLineWidth(3);
        doc.setDrawColor(colorBlack);
        yPositions.forEach(y => {
            doc.line(margin, y, pageWidth - margin, y);
        });
        doc.setLineWidth(1);
    };

    // Draw a stark brutalist header box
    const drawBrutalistHeader = (text: string, yPos: number, bgColor: string = colorBlack, textColor: string = '#FFFFFF') => {
        doc.setFillColor(bgColor);
        doc.rect(margin, yPos - 18, pageWidth - (margin * 2), 24, 'F');
        doc.setTextColor(textColor);
        doc.setFontSize(14);
        doc.setFont(fontPrimary, 'bold');
        doc.text(text, margin + 8, yPos - 1);
        doc.setTextColor(colorBlack); // Reset
        return yPos + 15;
    };

    fillBackground(); // Start page 1 bg

    let currentY = margin;

    // --- TOP BANNER ---
    doc.setFillColor(colorAccent);
    doc.rect(0, 0, pageWidth, 20, 'F');
    currentY += 10;

    // --- HEADER / CLASSIFIED STAMP ---
    doc.setFont(fontPrimary, 'bold');
    doc.setFontSize(10);
    doc.setTextColor(colorGray);
    doc.text('DOCUMENT REF: IFP-PR-001', margin, currentY);
    doc.text(`DATE EXTRACTED: ${new Date().toLocaleDateString().toUpperCase()}`, pageWidth - margin, currentY, { align: 'right' });
    currentY += 15;

    doc.setTextColor(colorBlack);
    doc.setFontSize(14);
    doc.text('// RESTRICTED ACCESS // MEDIA USE ONLY', margin, currentY);
    currentY += 20;

    drawThickBorder([currentY, currentY + 4]);
    currentY += 30;

    // --- TITLE: AUTHOR IDENTIFICATION ---
    doc.setFontSize(40);
    doc.text(authorData.name || 'UNKNOWN SUBJECT', margin, currentY);
    currentY += 20;

    if (authorData.pen_name) {
        doc.setFontSize(14);
        // Highlight pen name
        doc.setFillColor(colorGreen);
        doc.rect(margin, currentY - 12, 250, 16, 'F');
        doc.text(`OPERATING ALIAS: ${authorData.pen_name}`, margin + 5, currentY);
        currentY += 20;
    }

    drawThickBorder([currentY]);
    currentY += 35;

    // --- SECTION: BASIC INTEL ---
    currentY = drawBrutalistHeader('SECTION 01: BASIC INTEL', currentY);

    doc.setFont(fontPrimary, 'bold');
    doc.setFontSize(12);

    const intelLines = [
        `PRIMARY THEME: ${authorData.theme || 'N/A'}`,
        `BASE OF OPERATIONS: ${authorData.location || 'N/A'}`,
        `WEBSITE UPLINK: ${authorData.website || 'N/A'}`,
        `SECURE COMMS (EMAIL): ${authorData.email || 'N/A'}`
    ];

    if (authorData.collab_prompt) {
        intelLines.push(`ACTIVE PROTOCOL: ${authorData.collab_prompt}`);
    }

    if (authorData.instagram) intelLines.push(`INSTAGRAM: ${authorData.instagram}`);
    if (authorData.twitter) intelLines.push(`X / TWITTER: ${authorData.twitter}`);
    if (authorData.tiktok) intelLines.push(`TIKTOK: ${authorData.tiktok}`);
    if (authorData.substack) intelLines.push(`NEWSLETTER: ${authorData.substack}`);

    intelLines.forEach(line => {
        doc.text(line, margin, currentY);
        currentY += 16;
    });
    currentY += 15;
    drawThickBorder([currentY]);
    currentY += 35;

    // --- SECTION: CURRENT PROJECT (WIP) ---
    if (authorData.wip_title && authorData.wip_target > 0) {
        currentY = drawBrutalistHeader('SECTION 02: CURRENT PROJECT (WIP)', currentY, colorGreen, colorBlack);

        doc.setFont(fontPrimary, 'bold');
        doc.setFontSize(14);
        doc.text(`PROJECT CODENAME: ${authorData.wip_title.toUpperCase()}`, margin, currentY);
        currentY += 20;

        doc.setFont(fontPrimary, 'normal');
        doc.setFontSize(12);

        const percentRaw = (authorData.wip_current / authorData.wip_target) * 100;
        const progressPercent = Math.min(100, Math.max(0, percentRaw)).toFixed(1);

        doc.text(`CURRENT PROGRESS: ${progressPercent}% COMPLETED`, margin, currentY);
        currentY += 15;
        doc.text(`WORD COUNT: ${authorData.wip_current.toLocaleString()} / ${authorData.wip_target.toLocaleString()} WORDS`, margin, currentY);

        currentY += 15;
        drawThickBorder([currentY]);
        currentY += 35;
    }

    // --- SECTION: AUTHOR BACKGROUND (BIO) ---
    currentY = drawBrutalistHeader(`SECTION ${authorData.wip_title ? '03' : '02'}: AUTHOR BACKGROUND`, currentY, colorAccent);

    doc.setFont(fontPrimary, 'normal');
    doc.setFontSize(11);

    const bioText = authorData.bio || 'No background data available.';
    const splitBio = doc.splitTextToSize(bioText, maxContentWidth);

    doc.text(splitBio, margin, currentY);
    currentY += (splitBio.length * 14) + 20;

    // Add the featured excerpt if it exists
    if (authorData.writing_title && authorData.writing_content) {
        if (currentY > 600) {
            doc.addPage();
            fillBackground();
            currentY = margin + 20;
        }

        doc.setFont(fontPrimary, 'bold');
        doc.text(`FEATURED EXCERPT: ${authorData.writing_title.toUpperCase()}`, margin, currentY);
        currentY += 15;

        doc.setFont(fontPrimary, 'italic');
        // Strip HTML from text editor content for PDF
        const cleanContent = authorData.writing_content.replace(/<[^>]*>?/gm, '');
        const splitExcerpt = doc.splitTextToSize(`"${cleanContent}"`, maxContentWidth);

        doc.text(splitExcerpt, margin, currentY);
        currentY += (splitExcerpt.length * 14) + 20;
    }

    drawThickBorder([currentY]);
    currentY += 35;

    // --- SECTION: PUBLISHED INTEL (BOOKS) ---
    if (authorData.books && authorData.books.length > 0) {
        currentY = drawBrutalistHeader(`SECTION ${authorData.wip_title ? '04' : '03'}: CATALOGED WORKS`, currentY);

        authorData.books.forEach((book: any, index: number) => {
            if (currentY > 650) {
                doc.addPage();
                fillBackground();
                currentY = margin + 20;
            }

            // Book Box
            doc.setFillColor('#EEEEEE');
            doc.rect(margin, currentY - 14, maxContentWidth, 18, 'F');
            doc.setDrawColor(colorBlack);
            doc.rect(margin, currentY - 14, maxContentWidth, 18, 'S');

            doc.setFont(fontPrimary, 'bold');
            doc.setFontSize(12);
            doc.text(`FILE #${index + 1}: ${book.title.toUpperCase()}`, margin + 5, currentY - 1);

            doc.setFontSize(10);
            doc.text(`[${book.year || 'UNKNOWN'}] - ROLE: ${book.role || 'AUTHOR'}`, margin + 300, currentY - 1);

            currentY += 18;

            doc.setFont(fontPrimary, 'normal');
            doc.setFontSize(10);
            const descText = doc.splitTextToSize(`SUMMARY: ${book.description || 'N/A'}`, maxContentWidth - 20);
            doc.text(descText, margin + 10, currentY);

            currentY += (descText.length * 12) + 20;
        });

        drawThickBorder([currentY]);
        currentY += 35;
    }

    // --- SECTION: TIMELINE / EXPERIENCE ---
    if (authorData.experiences && authorData.experiences.length > 0) {
        if (currentY > 600) {
            doc.addPage();
            fillBackground();
            currentY = margin + 20;
        }

        currentY = drawBrutalistHeader(`SECTION ${authorData.wip_title ? '05' : '04'}: PROFESSIONAL TIMELINE`, currentY, colorGreen, colorBlack);

        doc.setFont(fontPrimary, 'normal');
        doc.setFontSize(10);

        authorData.experiences.forEach((exp: any) => {
            doc.setFont(fontPrimary, 'bold');
            doc.text(`> ${exp.year || '----'} | ${exp.title.toUpperCase()}`, margin, currentY);
            currentY += 14;

            if (exp.description) {
                doc.setFont(fontPrimary, 'normal');
                const desc = doc.splitTextToSize(`  ${exp.description}`, maxContentWidth - 20);
                doc.text(desc, margin, currentY);
                currentY += (desc.length * 12) + 12;
            }
        });

        drawThickBorder([currentY]);
        currentY += 35;
    }

    // --- SECTION: ACHIEVEMENTS (AWARDS) ---
    if (authorData.awards && authorData.awards.length > 0) {
        if (currentY > 600) {
            doc.addPage();
            fillBackground();
            currentY = margin + 20;
        }

        currentY = drawBrutalistHeader(`SECTION ${authorData.wip_title ? '06' : '05'}: COMMENDATIONS / AWARDS`, currentY);

        doc.setFont(fontPrimary, 'normal');
        doc.setFontSize(10);

        authorData.awards.forEach((award: any) => {
            const awardText = `- ${award.year || '----'} | ${award.title.toUpperCase()} (${award.organization})`;
            doc.text(awardText, margin, currentY);
            currentY += 14;

            if (award.description) {
                const desc = doc.splitTextToSize(`  ${award.description}`, maxContentWidth - 20);
                doc.text(desc, margin, currentY);
                currentY += (desc.length * 12) + 12;
            }
        });
    }

    // --- FOOTER FOR ALL PAGES ---
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFont(fontPrimary, 'bold');
        doc.setFontSize(10);
        doc.setTextColor(colorBlack);

        drawThickBorder([740]);
        doc.text(`END OF PAGE ${i}/${pageCount}.`, margin, 755);
        doc.text('INKFETISH PUBLICATIONS // AUTHORVERSE SYSTEM', pageWidth - margin, 755, { align: 'right' });

        // Bottom colored banner
        doc.setFillColor(colorBlack);
        doc.rect(0, 780, pageWidth, 20, 'F');
    }

    // Download behavior
    const filename = `${authorData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_media_kit.pdf`;
    doc.save(filename);
};
