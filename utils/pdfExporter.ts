// utils/pdfExporter.ts
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Expense } from "../lib/types";

export const exportToPDF = (data: Expense[]) => {
  const doc = new jsPDF();

  doc.text("Expense Report", 14, 10);

  // Format data for table
  const tableData = data.map((expense) => [
    expense.title,
    expense.amount,
    expense.category,
    new Date(expense.date).toLocaleDateString(),
  ]);

  autoTable(doc, {
    head: [["Title", "Amount", "Category", "Date"]],
    body: tableData,
    startY: 20,
  });

  doc.save("expenses.pdf");
};
