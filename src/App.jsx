import React, { useState } from 'react';

const ReceiptGenerator = () => {
  const [items, setItems] = useState([{ desc: 'Service Fee', price: 150.00 }]);
  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + tax;

  return (
    <div style={styles.container}>
      {/* Receipt UI */}
      <div id="receipt" style={styles.receipt}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.brand}>EV-R <span style={styles.accent}>SUITE</span></h1>
            <p style={styles.subtitle}>Modern Business Solutions</p>
          </div>
          <div style={styles.meta}>
            <p><strong>Receipt #</strong> RE-2026-001</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <hr style={styles.divider} />

        <div style={styles.section}>
          <p style={styles.label}>Bill To:</p>
          <p style={styles.clientName}>Valued Customer</p>
          <p style={styles.clientInfo}>Accra, Greater Accra Region, Ghana</p>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.th}>Description</th>
              <th style={styles.thRight}>Amount (GHS)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td style={styles.td}>{item.desc}</td>
                <td style={styles.tdRight}>{item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.summaryContainer}>
          <div style={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>VAT (15%)</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total Amount</span>
            <span>GHS {total.toFixed(2)}</span>
          </div>
        </div>

        <div style={styles.footer}>
          <p>Thank you for your business!</p>
          <p style={styles.small}>This is an electronically generated receipt.</p>
        </div>
      </div>

      <button onClick={() => window.print()} style={styles.printBtn}>
        Download / Print Receipt
      </button>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#f4f4f7', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' },
  receipt: { backgroundColor: '#fff', width: '100%', maxWidth: '600px', padding: '50px', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', fontFamily: "'Inter', sans-serif" },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
  brand: { margin: 0, fontSize: '24px', letterSpacing: '-0.5px', color: '#1a1a1a' },
  accent: { color: '#2563eb', fontWeight: '800' },
  subtitle: { margin: 0, fontSize: '12px', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' },
  meta: { textAlign: 'right', fontSize: '13px', color: '#444' },
  divider: { border: '0', borderTop: '1px solid #eee', margin: '20px 0' },
  label: { fontSize: '11px', textTransform: 'uppercase', color: '#999', fontWeight: 'bold', marginBottom: '4px' },
  clientName: { margin: 0, fontSize: '16px', fontWeight: '600', color: '#1a1a1a' },
  clientInfo: { margin: 0, fontSize: '13px', color: '#666' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '30px' },
  tableHeader: { borderBottom: '2px solid #1a1a1a' },
  th: { textAlign: 'left', padding: '12px 0', fontSize: '13px', color: '#1a1a1a' },
  thRight: { textAlign: 'right', padding: '12px 0', fontSize: '13px' },
  td: { padding: '15px 0', borderBottom: '1px solid #f0f0f0', color: '#444', fontSize: '14px' },
  tdRight: { textAlign: 'right', padding: '15px 0', borderBottom: '1px solid #f0f0f0', fontWeight: '500' },
  summaryContainer: { marginLeft: 'auto', width: '200px', marginTop: '30px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '14px', color: '#666' },
  totalRow: { borderTop: '2px solid #2563eb', marginTop: '10px', paddingTop: '10px', color: '#1a1a1a', fontWeight: 'bold', fontSize: '16px' },
  footer: { marginTop: '50px', textAlign: 'center', color: '#999' },
  small: { fontSize: '11px', marginTop: '5px' },
  printBtn: { marginTop: '20px', padding: '12px 24px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }
};

export default ReceiptGenerator;