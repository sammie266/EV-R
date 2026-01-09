import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    items: '',
    amount: ''
  });
  const [status, setStatus] = useState('');

  // PASTE YOUR GOOGLE WEB APP URL HERE
  const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbx2yEMZzH_6pzqBLa0SPgnImWr2XUPYUU4E2c2pcjPHJJXHARzV8agMCE4RGiXUxr95kQ/exec"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Processing Receipt...');

    try {
      await fetch(GOOGLE_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Script
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setStatus('✅ Sales Record Saved to Sheets!');
      setFormData({ customerName: '', customerPhone: '', items: '', amount: '' });
    } catch (error) {
      setStatus('❌ Error: Check your internet connection.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-8 border-blue-600">
        <h1 className="text-2xl font-black text-gray-800">GH Receipt Pro 🇬🇭</h1>
        <p className="text-gray-500 text-sm mb-6">Log sales and generate WhatsApp receipts.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Customer Name" required className="w-full p-3 border rounded-lg"
            value={formData.customerName} onChange={(e) => setFormData({...formData, customerName: e.target.value})}/>
          
          <input type="text" placeholder="WhatsApp (e.g. 054...)" required className="w-full p-3 border rounded-lg"
            value={formData.customerPhone} onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}/>
          
          <textarea placeholder="Items: 2 Tin Tomatoes, 5kg Rice..." rows="2" className="w-full p-3 border rounded-lg"
            value={formData.items} onChange={(e) => setFormData({...formData, items: e.target.value})}/>
          
          <div className="relative">
            <span className="absolute left-3 top-3 font-bold">GHS</span>
            <input type="number" placeholder="0.00" required className="w-full p-3 pl-12 border rounded-lg text-blue-600 font-bold"
              value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}/>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700">
            Generate & Record Sale
          </button>
        </form>

        {status && <div className="mt-4 p-3 text-center rounded-lg font-bold bg-green-50 text-green-700">{status}</div>}
      </div>
    </div>
  );
}

export default App;