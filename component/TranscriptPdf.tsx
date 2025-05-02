import jsPDF from "jspdf";

interface Call {
    call_status: string;
    call_sentiment: string;
    meeting_id: string;
    assigned_bde: string;
    call_start_time:string;
    call_transcript: string;
  }
// Function to generate the PDF with the transcript
export function generateTranscriptPdf(calls: Call[], name: string): void {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text(`Transcript for ${name}`, 10, 10);

  let y = 20;

  calls.forEach((call, idx) => {
    if (call.call_transcript && call.call_transcript.trim() !== "") {
      doc.text(`Call ${idx + 1}`, 10, y);
      y += 8;

      // Clean the transcript to remove the separator lines
      const cleanedTranscript = call.call_transcript
        .split("\n")
        .filter((line: string) => !line.includes("####################") && line.trim() !== "")
        .join("\n");

      const lines = doc.splitTextToSize(cleanedTranscript, 180);
      doc.text(lines, 10, y);
      y += lines.length * 8;

      // Add a new page if the content overflows
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }
  });

  // Save the generated PDF with the user's name
  doc.save(`${name}_transcript.pdf`);
}
