import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface PDFDownloadProps {
  previewRef: React.RefObject<HTMLDivElement>;
}

export const PDFDownload: React.FC<PDFDownloadProps> = ({ previewRef }) => {
  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;

    const pdf = new jsPDF("p", "mm", "a4"); // Set PDF to A4 format
    const canvas = await html2canvas(previewRef.current, {
      scale: 2, // Improve quality for A4
    });

    const imgData = canvas.toDataURL("image/png");

    // A4 page dimensions
    const pdfWidth = 210; // mm
    const pdfHeight = 297; // mm
    const imgWidth = canvas.width / 2; // scale matches the above
    const imgHeight = canvas.height / 2;

    // Scale image to fit the PDF width while maintaining aspect ratio
    const ratio = imgHeight / imgWidth;
    const scaledHeight = pdfWidth * ratio;

    if (scaledHeight <= pdfHeight) {
      // Single page scenario
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight);
    } else {
      // Multi-page scenario
      let position = 0;
      while (position < imgHeight) {
        const pageCanvas = document.createElement("canvas");
        const pageCanvasHeight = Math.min(
          canvas.height - position,
          (pdfHeight * canvas.width) / pdfWidth
        );

        pageCanvas.width = canvas.width;
        pageCanvas.height = pageCanvasHeight;

        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            canvas,
            0,
            position,
            canvas.width,
            pageCanvasHeight,
            0,
            0,
            canvas.width,
            pageCanvasHeight
          );
        }

        const pageImgData = pageCanvas.toDataURL("image/png");
        const pageHeight = (pageCanvasHeight * pdfWidth) / canvas.width;

        pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, pageHeight);
        position += pageCanvasHeight;

        if (position < imgHeight) {
          pdf.addPage();
        }
      }
    }

    pdf.save("resume.pdf");
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Download PDF
    </button>
  );
};

export default PDFDownload;
