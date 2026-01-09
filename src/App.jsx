import React, { useState } from 'react';

const ReceiptGenerator = () => {
  const [clientName, setClientName] = useState('Valued Customer');
  const [items, setItems] = useState([{ desc: 'Consultation', price: 150.00 }]);

  // Math Logic
  const subtotal = items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + tax;

  // Handler functions
  const addItem = () => setItems([...items, { desc: '', price: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  return (
    <div style={styles.container}>
      {/* 1. Control Panel (The Form) */}
      <div style={styles.formCard}>
        <h2 style={styles.formTitle}>Receipt Editor</h2>
        
        <label style={styles.inputLabel}>Customer Name</label>
        <input 
          style={styles.input} 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)} 
        />

        <div style={{ marginTop: '20px' }}>
          <label style={styles.inputLabel}>Items & Services</label>
          {items.map((item, index) => (
            <div key={index} style={styles.itemRow}>
              <input 
                placeholder="Description" 
                style={{ ...styles.input, flex: 3 }} 
                value={item.desc} 
                onChange={(e) => updateItem(index, 'desc', e.target.value)}
              />
              <input 
                type="number" 
                placeholder="Price" 
                style={{ ...styles.input, flex: 1 }} 
                value={item.price} 
                onChange={(e) => updateItem(index, 'price', e.target.value)}
              />
              <button onClick={() => removeItem(index)} style={styles.deleteBtn}>×</button>
            </div>
          ))}
          <button onClick={addItem} style={styles.addBtn}>+ Add Line Item</button>
        </div>
      </div>

      {/* 2. The Professional Receipt (Live Preview) */}
      <div id="receipt" style={styles.receipt}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.brand}>EV-R <span style={styles.accent}>SUITE</span></h1>
            <p style={styles.subtitle}>Modern Business Solutions</p>
          </div>
          <div style={styles.meta}>
            <p><strong>Receipt #</strong> RE-{new Date().getFullYear()}-001</p>
            <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <div style={styles.section}>
          <p style={styles.label}>Bill To:</p>
          <p style={styles.clientName}>{clientName || "Customer Name"}</p>
          <p style={styles.clientInfo}>Accra, Ghana</p>
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
                <td style={styles.td}>{item.desc || "New Service"}</td>
                <td style={styles.tdRight}>{(Number(item.price) || 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.summaryContainer}>
          <div style={styles.summaryRow}><span>Subtotal</span><span>{subtotal.toFixed(2)}</span></div>
          <div style={styles.summaryRow}><span>VAT (15%)</span><span>{tax.toFixed(2)}</span></div>
          <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
            <span>Total Amount</span>
            <span>GHS {total.toFixed(2)}</span>
          </div>
        </div>

        <div style={styles.footer}>
          <p>Thank you for choosing EV-R Suite!</p>
        </div>
      </div>

      <button onClick={() => window.print()} style={styles.printBtn}>
        Download / Print Receipt
      </button>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px', fontFamily: "'Inter', sans-serif" },
  formCard: { backgroundColor: '#fff', width: '100%', maxWidth: '600px', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '40px' },
  formTitle: { margin: '0 0 20px 0', fontSize: '18px', color: '#1e293b' },
  inputLabel: { display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#64748b', marginBottom: '5px', textTransform: 'uppercase' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', marginBottom: '10px', boxSizing: 'border-box' },
  itemRow: { display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' },
  deleteBtn: { background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '50%', width: '25px', height: '25px', cursor: 'pointer', fontWeight: 'bold' },
  addBtn: { background: 'none', border: '1px dashed #2563eb', color: '#2563eb', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', width: '100%' },
  
  receipt: { backgroundColor: '#fff', width: '100%', maxWidth: '600px', padding: '50px', borderRadius: '2px', boxShadow: '0 0 20px rgba(0,0,0,0.05)' },
  header: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
  brand: { margin: 0, fontSize: '24px', color: '#1a1a1a' },
  accent: { color: '#2563eb', fontWeight: '800' },
  subtitle: { margin: 0, fontSize: '12px', color: '#666' },
  meta: { textAlign: 'right', fontSize: '13px' },
  clientName: { margin: 0, fontSize: '16px', fontWeight: '600' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '30px' },
  tableHeader: { borderBottom: '2px solid #1a1a1a' },
  th: { textAlign: 'left', padding: '12px 0', fontSize: '12px' },
  thRight: { textAlign: 'right', padding: '12px 0' },
  td: { padding: '12px 0', borderBottom: '1px solid #f1f5f9', fontSize: '14px' },
  tdRight: { textAlign: 'right', padding: '12px 0', fontWeight: '500' },
  summaryContainer: { marginLeft: 'auto', width: '220px', marginTop: '30px' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '14px' },
  totalRow: { borderTop: '2px solid #2563eb', marginTop: '10px', paddingTop: '10px', fontWeight: 'bold', fontSize: '16px' },
  footer: { marginTop: '50px', textAlign: 'center', color: '#94a3b8', fontSize: '12px' },
  printBtn: { marginTop: '20px', padding: '15px 40px', backgroundColor: '#1e293b', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
};

export default ReceiptGenerator;