import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateTransactionsPDF = (user) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Transaction History Report', 14, 22);
  
  // Add user info
  doc.setFontSize(12);
  doc.text(`User: ${user.name}`, 14, 30);
  doc.text(`Phone: ${user.phone}`, 14, 36);
  doc.text(`Balance: ${user.balance.toFixed(2)} MAD`, 14, 42);
  doc.text(`Status: ${user.status.toUpperCase()}`, 14, 48);
  doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, 14, 54);
  
  // Add transactions table
  const tableColumn = ["Date", "Type", "Amount (MAD)", "Status"];
  const tableRows = [];
  
  user.transactions.forEach(transaction => {
    const transactionData = [
      transaction.date,
      transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
      transaction.amount.toFixed(2),
      transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)
    ];
    tableRows.push(transactionData);
  });
  
  doc.autoTable({
    startY: 60,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineWidth: 0.1,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    }
  });
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text('WafR Management Console - Confidential', 14, doc.internal.pageSize.height - 10);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10);
  }
  
  // Save and return the document
  const pdfName = `transactions_${user.phone}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(pdfName);
  return pdfName;
};