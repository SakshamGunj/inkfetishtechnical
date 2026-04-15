import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, getDocs, query, orderBy, updateDoc } from 'firebase/firestore';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
// @ts-ignore
import { asBlob } from "html-docx-js-typescript";
import { Download, Search, RefreshCw, Lock, Eye, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Registration {
    id: string;
    created_at: string;
    name: string;
    email: string;
    whatsapp: string;
    category: string;
    plan_amount: number;
    submission_count: number;
    submission_1_title: string;
    submission_1_content: string;
    submission_2_title?: string;
    submission_2_content?: string;
    payment_status: string;
    order_id?: string;
    is_top_200?: boolean;
}

const IWLAdmin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [data, setData] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSubmission, setSelectedSubmission] = useState<Registration | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [fullContentLoading, setFullContentLoading] = useState(false);
    const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
    const [bulkDownloadStatus, setBulkDownloadStatus] = useState<string | null>(null);

    // --- Authentication ---
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "Thisisthestart@123") {
            setIsAuthenticated(true);
            fetchData();
        } else {
            alert("Incorrect Password");
        }
    };

    // --- Data Fetching ---
    const fetchData = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "iwl_submissions"));

            const fetchedData: Registration[] = [];

            querySnapshot.forEach((docSnap) => {
                const firestoreData = docSnap.data();

                // Map the Firestore fields to the Registration interface format our table expects
                fetchedData.push({
                    id: docSnap.id,
                    created_at: firestoreData.timestamp ? new Date(firestoreData.timestamp).toISOString() : new Date().toISOString(),
                    name: firestoreData.name || 'Unknown',
                    email: firestoreData.email || 'No Email',
                    whatsapp: firestoreData.whatsapp || firestoreData.phone || 'N/A',
                    category: firestoreData.category || 'unknown',
                    plan_amount: firestoreData.plan || 299,
                    submission_count: firestoreData.submission2 ? 2 : 1,
                    payment_status: firestoreData.status === 'full_submission' || firestoreData.status === 'complete' || firestoreData.status === 'submitted' ? 'paid' : (firestoreData.status || 'pending').replace('_', ' '),
                    order_id: firestoreData.orderId || docSnap.id, // Fallback to doc id if order id is missing in firestore
                    submission_1_title: firestoreData.submission1?.title || '',
                    submission_1_content: firestoreData.submission1?.content || '',
                    submission_2_title: firestoreData.submission2?.title || undefined,
                    submission_2_content: firestoreData.submission2?.content || undefined,
                    is_top_200: firestoreData.is_top_200 || false,
                });
            });

            // Fallback sort since we removed the Firestore orderBy index dependency
            fetchedData.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching data from Firestore:', error);
            alert('Error fetching dataset. Please check console.');
        } finally {
            setLoading(false);
        }
    };

    // --- CSV Download ---
    const downloadCSV = () => {
        if (data.length === 0) return alert("No data to download");

        const headers = [
            "ID", "Date", "Name", "Email", "WhatsApp", "Category", "Plan",
            "Payment Status", "Order ID", "Submission 1 Title", "Submission 1 Content",
            "Submission 2 Title", "Submission 2 Content"
        ];

        const csvRows = [
            headers.join(','),
            ...data.map(row => [
                row.id,
                new Date(row.created_at).toLocaleDateString(),
                `"${row.name}"`,
                row.email,
                row.whatsapp,
                row.category,
                row.plan_amount,
                row.payment_status,
                row.order_id || '',
                `"${(row.submission_1_title || '').replace(/"/g, '""')}"`,
                `"${(row.submission_1_content || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
                `"${(row.submission_2_title || '').replace(/"/g, '""')}"`,
                `"${(row.submission_2_content || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`
            ].join(','))
        ];

        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `iwl_registrations_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // --- Filtering ---
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.whatsapp.includes(searchTerm) ||
        (item.order_id && item.order_id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // --- Content Viewing & Fetching ---
    const handleViewWork = async (index: number) => {
        const row = filteredData[index];
        if (!row) return;

        setSelectedIndex(index);
        setSelectedSubmission(row);
        setFullContentLoading(true);

        try {
            if (row.order_id) {
                const docRef = doc(db, 'iwl_submissions', row.order_id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const firestoreData = docSnap.data();
                    // Merge firestore content into our selected view state
                    setSelectedSubmission(prev => prev ? {
                        ...prev,
                        submission_1_title: firestoreData.submission1?.title || prev.submission_1_title,
                        submission_1_content: firestoreData.submission1?.content || prev.submission_1_content,
                        submission_2_title: firestoreData.submission2?.title || prev.submission_2_title,
                        submission_2_content: firestoreData.submission2?.content || prev.submission_2_content,
                    } : null);
                }
            }
        } catch (error) {
            console.error("Failed to fetch full submission from Firestore:", error);
        } finally {
            setFullContentLoading(false);
        }
    };

    const toggleTop200Selection = async () => {
        if (!selectedSubmission) return;

        const newStatus = !selectedSubmission.is_top_200;
        // order_id is the document ID for 'iwl_submissions' collection in Firestore
        const targetId = selectedSubmission.order_id || selectedSubmission.id;

        try {
            const docRef = doc(db, 'iwl_submissions', targetId);
            await updateDoc(docRef, { is_top_200: newStatus });

            // Update local state smoothly without full reload
            setSelectedSubmission(prev => prev ? { ...prev, is_top_200: newStatus } : null);
            setData(prevData => prevData.map(item =>
                item.id === selectedSubmission.id ? { ...item, is_top_200: newStatus } : item
            ));
        } catch (error) {
            console.error("Failed to update selection status:", error);
            alert("Failed to update Top 200 status. Make sure the database allows writes.");
        }
    };

    // --- Document Generation ---
    const renderHTMLToPDF = async (htmlStrings: string[], filename: string) => {
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
        const A5_WIDTH_MM = 148;

        // Use a wrapper div that is technically in the viewport but invisible
        // This prevents aggressive browser optimizations from returning a 0x0 canvas.
        const wrapper = document.createElement('div');
        wrapper.style.position = 'absolute';
        wrapper.style.top = '0';
        wrapper.style.left = '0';
        wrapper.style.width = '560px'; // Approx A5 width in pixels at standard DPI
        wrapper.style.opacity = '0';
        wrapper.style.pointerEvents = 'none';
        wrapper.style.zIndex = '-1000';
        document.body.appendChild(wrapper);

        try {
            for (let i = 0; i < htmlStrings.length; i++) {
                if (i > 0) pdf.addPage();

                wrapper.innerHTML = htmlStrings[i];

                // Allow the browser multiple frames to calculate layout and load resources
                await new Promise(resolve => setTimeout(resolve, 150));

                const canvas = await html2canvas(wrapper, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff'
                });

                if (canvas.width === 0 || canvas.height === 0) {
                    console.error(`Canvas is empty for page ${i}. Skipping.`);
                    continue;
                }

                const imgData = canvas.toDataURL('image/png');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfHeight = (imgProps.height * A5_WIDTH_MM) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, A5_WIDTH_MM, pdfHeight);
            }

            pdf.save(filename);
        } catch (e) {
            console.error("Failed to render HTML to PDF:", e);
            throw e;
        } finally {
            if (document.body.contains(wrapper)) {
                document.body.removeChild(wrapper);
            }
        }
    };

    const getSubmissionHTMLPage = (sub: Registration, title: string, content: string, pagenum: number) => {
        return `
            <div style="padding: 40px; font-family: 'Times New Roman', Times, serif; font-size: 16px; line-height: 1.6; color: #000; box-sizing: border-box; background-color: #fff; width: 560px;">
                ${pagenum === 1 ? `
                    <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 20px;">
                        <h1 style="font-size: 24px; margin: 0 0 5px 0;">INDIAN WRITERS LEAGUE</h1>
                        <p style="font-size: 14px; font-style: italic; margin: 0;">Participant Submission Document</p>
                    </div>
                    <div style="margin-bottom: 20px; border-bottom: 1px solid #ccc; padding-bottom: 15px;">
                        <p style="margin: 4px 0;"><strong>Name:</strong> ${sub.name}</p>
                        <p style="margin: 4px 0;"><strong>Email:</strong> ${sub.email}</p>
                        <p style="margin: 4px 0;"><strong>Phone:</strong> +91 ${sub.whatsapp}</p>
                        <p style="margin: 4px 0;"><strong>Category:</strong> ${sub.category.replace('_', ' ').toUpperCase()}</p>
                    </div>
                ` : ''}

                <div style="text-align: center; margin-bottom: 20px;">
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">ENTRY ${pagenum}</div>
                    <div style="font-size: 20px; font-weight: bold;">${title || 'Untitled'}</div>
                </div>

                <div style="white-space: pre-wrap; text-align: justify; word-wrap: break-word;">${content || ''}</div>
            </div>
        `;
    };

    const generateA5PDF = async () => {
        if (!selectedSubmission) return;
        setIsGeneratingDoc(true);

        try {
            const pages: string[] = [];

            if (selectedSubmission.submission_1_title || selectedSubmission.submission_1_content) {
                pages.push(getSubmissionHTMLPage(
                    selectedSubmission,
                    selectedSubmission.submission_1_title,
                    selectedSubmission.submission_1_content,
                    1
                ));
            }

            if (selectedSubmission.submission_2_title || selectedSubmission.submission_2_content) {
                pages.push(getSubmissionHTMLPage(
                    selectedSubmission,
                    selectedSubmission.submission_2_title || '',
                    selectedSubmission.submission_2_content || '',
                    2
                ));
            }

            await renderHTMLToPDF(pages, `IWL_${selectedSubmission.name.replace(/\s+/g, '_')}_Submission.pdf`);
        } catch (err) {
            console.error("PDF Gen Error:", err);
            alert("Failed to generate PDF. See console for details.");
        } finally {
            setIsGeneratingDoc(false);
        }
    };

    const generateA5DOCX = async () => {
        if (!selectedSubmission) return;
        setIsGeneratingDoc(true);

        try {
            const htmlContent = `
            <!DOCTYPE html>
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>IWL Submission</title>
                    <style>
                        /* A5 Dimensions approx in Word */
                        @page {
                            size: 14.8cm 21cm;
                            margin: 1.5cm;
                        }
                        body {
                            font-family: "Times New Roman", Times, serif;
                            font-size: 11pt;
                            line-height: 1.5;
                            color: #000000;
                        }
                        .header { text-align: center; margin-bottom: 20pt; border-bottom: 1px solid #000; padding-bottom: 10pt; }
                        .header h1 { font-size: 16pt; margin: 0 0 5pt 0; text-transform: uppercase; }
                        .header p { font-size: 10pt; font-style: italic; margin: 0; }
                        .info { margin-bottom: 20pt; border-bottom: 1px solid #000; padding-bottom: 15pt; }
                        .info p { margin: 3pt 0; }
                        .entry { margin-bottom: 30pt; }
                        .entry-label { text-align: center; font-size: 12pt; font-weight: bold; margin-bottom: 5pt; }
                        .entry-title { text-align: center; font-size: 14pt; font-weight: bold; margin-bottom: 15pt; }
                        .entry-content { text-align: justify; white-space: pre-wrap; font-size: 11pt; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Indian Writers League</h1>
                        <p>Participant Submission Document</p>
                    </div>

                    <div class="info">
                        <p><strong>Name:</strong> ${selectedSubmission.name}</p>
                        <p><strong>Email:</strong> ${selectedSubmission.email}</p>
                        <p><strong>Phone:</strong> +91 ${selectedSubmission.whatsapp}</p>
                        <p><strong>Category:</strong> ${selectedSubmission.category.replace('_', ' ').toUpperCase()}</p>
                    </div>

                    <div class="entry">
                        <div class="entry-label">ENTRY 1</div>
                        <div class="entry-title">${selectedSubmission.submission_1_title || 'Untitled'}</div>
                        <div class="entry-content">${(selectedSubmission.submission_1_content || '').replace(/\n/g, '<br/>')}</div>
                    </div>

                    ${selectedSubmission.submission_2_title ? `
                    <div style="page-break-before: always;"></div>
                    <div class="entry">
                        <div class="entry-label">ENTRY 2</div>
                        <div class="entry-title">${selectedSubmission.submission_2_title}</div>
                        <div class="entry-content">${(selectedSubmission.submission_2_content || '').replace(/\n/g, '<br/>')}</div>
                    </div>
                    ` : ''}
                </body>
            </html>
            `;

            const blob = await asBlob(htmlContent) as Blob;
            saveAs(blob, `IWL_${selectedSubmission.name.replace(/\s+/g, '_')}_Submission.docx`);
        } catch (err) {
            console.error("DOCX Gen Error:", err);
            alert("Failed to generate DOCX. See console for details.");
        } finally {
            setIsGeneratingDoc(false);
        }
    };

    // --- Bulk Document Generation ---
    const fetchAllFullSubmissions = async (entries: Registration[]) => {
        const fullEntries = [...entries];
        for (let i = 0; i < fullEntries.length; i++) {
            const row = fullEntries[i];
            if (row.order_id) {
                try {
                    const docRef = doc(db, 'iwl_submissions', row.order_id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const firestoreData = docSnap.data();
                        fullEntries[i] = {
                            ...row,
                            submission_1_title: firestoreData.submission1?.title || row.submission_1_title,
                            submission_1_content: firestoreData.submission1?.content || row.submission_1_content,
                            submission_2_title: firestoreData.submission2?.title || row.submission_2_title,
                            submission_2_content: firestoreData.submission2?.content || row.submission_2_content,
                        };
                    }
                } catch (error) {
                    console.error(`Failed to fetch full submission for ${row.order_id}: `, error);
                }
            }
        }
        return fullEntries;
    };

    const generateBulkPDF = async () => {
        if (filteredData.length === 0) return alert("No entries to download");
        setBulkDownloadStatus("Fetching full contents...");

        try {
            const allEntries = await fetchAllFullSubmissions(filteredData);
            setBulkDownloadStatus("Generating Bulk PDF...");

            const pages: string[] = [];

            for (let i = 0; i < allEntries.length; i++) {
                const sub = allEntries[i];

                if (sub.submission_1_title || sub.submission_1_content) {
                    pages.push(getSubmissionHTMLPage(
                        sub,
                        sub.submission_1_title,
                        sub.submission_1_content,
                        1
                    ));
                }

                if (sub.submission_2_title || sub.submission_2_content) {
                    pages.push(getSubmissionHTMLPage(
                        sub,
                        sub.submission_2_title || '',
                        sub.submission_2_content || '',
                        2
                    ));
                }
            }

            await renderHTMLToPDF(pages, `IWL_Bulk_Submissions_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (err) {
            console.error("Bulk PDF Gen Error:", err);
            alert("Failed to generate Bulk PDF. See console for details.");
        } finally {
            setBulkDownloadStatus(null);
        }
    };

    const generateBulkDOCX = async () => {
        if (filteredData.length === 0) return alert("No entries to download");
        setBulkDownloadStatus("Fetching full contents...");

        try {
            const allEntries = await fetchAllFullSubmissions(filteredData);
            setBulkDownloadStatus("Generating Bulk DOCX...");

            let pagesHtml = '';

            for (let i = 0; i < allEntries.length; i++) {
                const sub = allEntries[i];
                const pageHtml = `
                < div class="header" >
                        <h1>Indian Writers League</h1>
                        <p>Participant Submission Document</p>
                    </div >
                    
                    <div class="info">
                        <p><strong>Name:</strong> ${sub.name}</p>
                        <p><strong>Email:</strong> ${sub.email}</p>
                        <p><strong>Phone:</strong> +91 ${sub.whatsapp}</p>
                        <p><strong>Category:</strong> ${sub.category.replace('_', ' ').toUpperCase()}</p>
                    </div>

                    <div class="entry">
                        <div class="entry-label">ENTRY 1</div>
                        <div class="entry-title">${sub.submission_1_title || 'Untitled'}</div>
                        <div class="entry-content">${(sub.submission_1_content || '').replace(/\n/g, '<br/>')}</div>
                    </div>

                    ${sub.submission_2_title ? `
                    <div style="page-break-before: always;"></div>
                    <div class="entry">
                        <div class="entry-label">ENTRY 2</div>
                        <div class="entry-title">${sub.submission_2_title}</div>
                        <div class="entry-content">${(sub.submission_2_content || '').replace(/\n/g, '<br/>')}</div>
                    </div>
                    ` : ''
                    }

                    ${i < allEntries.length - 1 ? '<div style="page-break-before: always;"></div>' : ''}
`;
                pagesHtml += pageHtml;
            }

            const finalHtml = `
            <!DOCTYPE html>
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head>
                    <meta charset='utf-8'>
                    <title>IWL Bulk Submissions</title>
                    <style>
                        /* A5 Dimensions approx in Word */
                        @page {
                            size: 14.8cm 21cm;
                            margin: 1.5cm;
                        }
                        body {
                            font-family: "Times New Roman", Times, serif;
                            font-size: 11pt;
                            line-height: 1.5;
                            color: #000000;
                        }
                        .header { text-align: center; margin-bottom: 20pt; border-bottom: 1px solid #000; padding-bottom: 10pt; }
                        .header h1 { font-size: 16pt; margin: 0 0 5pt 0; text-transform: uppercase; }
                        .header p { font-size: 10pt; font-style: italic; margin: 0; }
                        .info { margin-bottom: 20pt; border-bottom: 1px solid #000; padding-bottom: 15pt; }
                        .info p { margin: 3pt 0; }
                        .entry { margin-bottom: 30pt; }
                        .entry-label { text-align: center; font-size: 12pt; font-weight: bold; margin-bottom: 5pt; }
                        .entry-title { text-align: center; font-size: 14pt; font-weight: bold; margin-bottom: 15pt; }
                        .entry-content { text-align: justify; white-space: pre-wrap; font-size: 11pt; }
                    </style>
            </head>
            <body>
                ${pagesHtml}
            </body>
        </html>
`;

            const blob = await asBlob(finalHtml) as Blob;
            saveAs(blob, `IWL_Bulk_Submissions_${new Date().toISOString().split('T')[0]}.docx`);
        } catch (err) {
            console.error("Bulk DOCX Gen Error:", err);
            alert("Failed to generate Bulk DOCX. See console for details.");
        } finally {
            setBulkDownloadStatus(null);
        }
    };

    // --- Render Login ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8 text-gray-600" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Admin Access</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                        placeholder="Enter Admin Password"
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors">
                        Unlock Dashboard
                    </button>
                    {/* Add a fake hint or copyright */}
                    <p className="text-center text-gray-400 text-xs mt-4">Restricted Area. Authorized Personnel Only.</p>
                </form>
            </div>
        );
    }

    // --- Render Dashboard ---
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">IWL Registrations</h1>
                    <p className="text-gray-500">Total Entries: {data.length} | Verify payments and reviewed submissions.</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={fetchData} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                        <RefreshCw className={`w - 4 h - 4 ${loading ? 'animate-spin' : ''} `} /> Refresh
                    </button>
                    <button onClick={downloadCSV} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 shadow-sm">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                    <div className="h-6 w-px bg-gray-300 mx-1 self-center"></div>
                    <button onClick={generateBulkPDF} disabled={!!bulkDownloadStatus} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 shadow-sm disabled:opacity-50">
                        {bulkDownloadStatus === "Generating Bulk PDF..." ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Bulk PDF
                    </button>
                    <button onClick={generateBulkDOCX} disabled={!!bulkDownloadStatus} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 shadow-sm disabled:opacity-50">
                        {bulkDownloadStatus === "Generating Bulk DOCX..." ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Bulk DOCX
                    </button>
                </div>
            </div>

            {/* Status Notifier */}
            {bulkDownloadStatus && (
                <div className="max-w-7xl mx-auto mb-6">
                    <div className="bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-200 flex items-center gap-3">
                        <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
                        <span className="font-medium">{bulkDownloadStatus} (This might take a minute for many entries)</span>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className="max-w-7xl mx-auto mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by Name, Email, WhatsApp, or Order ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500">
                                <th className="p-4 font-semibold">Date</th>
                                <th className="p-4 font-semibold">Author</th>
                                <th className="p-4 font-semibold">Contact</th>
                                <th className="p-4 font-semibold">Plan / Status</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold text-center">Top 200</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredData.map((row, index) => (
                                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                                        {new Date(row.created_at).toLocaleDateString()}
                                        <br />
                                        <span className="text-xs text-gray-400">{new Date(row.created_at).toLocaleTimeString()}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="font-medium text-gray-900 flex items-center gap-2">
                                            {row.name}
                                        </div>
                                        <div className="text-xs text-gray-500 font-mono select-all">ID: {row.id.slice(0, 8)}...</div>
                                    </td>
                                    <td className="p-4 text-sm">
                                        <div className="text-gray-900">{row.email}</div>
                                        <div className="text-gray-500 font-mono">+91 {row.whatsapp}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className={`inline - flex items - center px - 2 py - 0.5 rounded text - xs font - medium w - fit ${row.plan_amount === 499 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'} `}>
                                                ₹{row.plan_amount}
                                            </span>
                                            <span className={`inline - flex items - center px - 2 py - 0.5 rounded text - xs font - medium w - fit ${row.payment_status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} `}>
                                                {row.payment_status.toUpperCase()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-700 capitalize">
                                        {row.category.replace('_', ' ')}
                                    </td>
                                    <td className="p-4 text-center">
                                        {row.is_top_200 ? (
                                            <span className="inline-flex flex-col items-center justify-center text-green-600">
                                                <CheckCircle2 className="w-5 h-5 mb-1" />
                                                <span className="text-[10px] font-bold tracking-wider uppercase">Selected</span>
                                            </span>
                                        ) : (
                                            <span className="text-gray-300 text-sm">—</span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleViewWork(index)}
                                            className="text-indigo-600 hover:text-indigo-900 text-sm font-medium inline-flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" /> View Work
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredData.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-gray-500">
                                        No entries found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Content Full Screen */}
            <AnimatePresence>
                {selectedSubmission && selectedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col bg-gray-100 backdrop-blur-sm"
                    >
                        {/* Top Navigation Bar */}
                        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shrink-0">
                            <button
                                onClick={() => {
                                    setSelectedSubmission(null);
                                    setSelectedIndex(null);
                                }}
                                className="flex items-center gap-2 text-gray-500 hover:text-black font-medium transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" /> Back to Dashboard
                            </button>

                            <div className="flex-1 flex justify-center items-center px-4">
                                <h3 className="text-xl font-bold text-gray-900 border-r border-gray-300 pr-4 mr-4">
                                    {selectedSubmission.name}
                                </h3>
                                <div className="text-sm text-gray-500 capitalize flex items-center gap-4">
                                    <span>{selectedSubmission.category}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                    <span>₹{selectedSubmission.plan_amount}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <button
                                    onClick={toggleTop200Selection}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all duration-200 border shadow-sm ${selectedSubmission.is_top_200
                                        ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300'
                                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-black hover:border-gray-300'
                                        }`}
                                >
                                    <CheckCircle2 className={`w-4 h-4 ${selectedSubmission.is_top_200 ? 'text-green-500' : 'text-gray-400 opacity-50'}`} />
                                    {selectedSubmission.is_top_200 ? 'Selected for Top 200' : 'Select Author'}
                                </button>

                                <div className="h-8 w-px bg-gray-200"></div>

                                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200 shadow-inner">
                                    <button
                                        onClick={() => handleViewWork(selectedIndex - 1)}
                                        disabled={selectedIndex === 0 || fullContentLoading}
                                        className="p-2 rounded hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        title="Previous Author"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <span className="px-4 text-sm font-semibold text-gray-500 select-none">
                                        {selectedIndex + 1} / {filteredData.length}
                                    </span>
                                    <button
                                        onClick={() => handleViewWork(selectedIndex + 1)}
                                        disabled={selectedIndex === filteredData.length - 1 || fullContentLoading}
                                        className="p-2 rounded hover:bg-white hover:shadow-sm disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                                        title="Next Author"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Scrolling Content Area */}
                        {fullContentLoading ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                <RefreshCw className="w-10 h-10 animate-spin mb-4 text-indigo-500" />
                                <span className="text-lg">Loading complete manuscript from Firestore...</span>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-y-auto px-4 py-8 md:py-12 bg-gray-100">
                                <div className="max-w-4xl mx-auto space-y-8 pb-12">
                                    {/* Submission 1 container */}
                                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-xl">
                                        <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-5 flex items-center justify-between">
                                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">Entry #1</span>
                                            {selectedSubmission.submission_1_title && (
                                                <h4 className="text-xl font-serif font-bold text-gray-900">{selectedSubmission.submission_1_title}</h4>
                                            )}
                                        </div>
                                        <div className="p-8 md:p-12">
                                            <div className="prose prose-lg max-w-none text-gray-800 font-serif leading-loose whitespace-pre-wrap selection:bg-indigo-100 selection:text-indigo-900">
                                                {selectedSubmission.submission_1_content || <span className="text-gray-400 italic">No content provided</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submission 2 container */}
                                    {selectedSubmission.submission_2_title && (
                                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transform transition-all duration-300 hover:shadow-xl relative">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
                                            <div className="border-b border-gray-100 bg-amber-50/30 px-8 py-5 flex items-center justify-between">
                                                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm border border-amber-200">Entry #2 (Premium)</span>
                                                <h4 className="text-xl font-serif font-bold text-gray-900">{selectedSubmission.submission_2_title}</h4>
                                            </div>
                                            <div className="p-8 md:p-12">
                                                <div className="prose prose-lg max-w-none text-gray-800 font-serif leading-loose whitespace-pre-wrap selection:bg-amber-100 selection:text-amber-900">
                                                    {selectedSubmission.submission_2_content || <span className="text-gray-400 italic">No content provided</span>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Action Strip */}
                                <div className="max-w-4xl mx-auto flex justify-center pb-8 gap-4">
                                    <button
                                        onClick={() => handleViewWork(Math.max(0, selectedIndex - 1))}
                                        disabled={selectedIndex === 0 || fullContentLoading}
                                        className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        <ChevronLeft className="w-5 h-5" /> Previous Author
                                    </button>
                                    <button
                                        onClick={() => handleViewWork(Math.min(filteredData.length - 1, selectedIndex + 1))}
                                        disabled={selectedIndex === filteredData.length - 1 || fullContentLoading}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        Next Author <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default IWLAdmin;
