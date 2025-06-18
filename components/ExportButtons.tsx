import type { Expense } from "../lib/types";
import { exportToCSV } from "../utils/csvExporter";
import { exportToPDF } from "../utils/pdfExporter";

interface Props {
  data: Expense[];
}

export default function ExportButtons({ data }: Props) {
  const handleCSVExport = () => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
    exportToCSV(data);
  };

  const handlePDFExport = () => {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }
    exportToPDF(data);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={handleCSVExport} style={buttonStyle}>Export to CSV</button>
      <button onClick={handlePDFExport} style={buttonStyle}>Export to PDF</button>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  marginRight: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#d9adf9",
  color: "#530b86",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
