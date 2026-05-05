import { useState } from 'react';
import api from '../../services/api';

export default function CsvUploadPage() {
  const [invalidSkus, setInvalidSkus] = useState([]);

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await api.post('/csv/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    setInvalidSkus(data.data.invalidSkus || []);
    alert('CSV uploaded and cart updated');
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">CSV Bulk Upload</h1>
      <input type="file" accept=".csv" onChange={upload} className="bg-white p-3 rounded shadow" />
      {invalidSkus.length > 0 && (
        <div className="bg-amber-100 text-amber-800 p-3 rounded">Invalid SKUs: {invalidSkus.join(', ')}</div>
      )}
    </div>
  );
}
