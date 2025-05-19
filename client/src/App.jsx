import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, FileText, Loader2, Save } from 'lucide-react';


function App() {
  const [niche, setNiche] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [calendar, setCalendar] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCalendar = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/generate', { niche, frequency });
      setCalendar(res.data.content);
    } catch (error) {
      console.error(error);
      alert('Failed to generate calendar');
    }
    setLoading(false);
  };

  const saveToSheet = async () => {
    try {
      await axios.post('http://localhost:5000/api/sheets', { calendar });
      alert('Calendar saved to Google Sheets');
    } catch (error) {
      console.error(error);
      alert('Failed to save to Google Sheets');
    }
  };

  
return (
  <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center px-4 py-8">
    <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-8 sm:p-10 space-y-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-700">
        📅 AI Content Calendar Builder
      </h1>

      <div className="space-y-5">
        {/* Niche Input */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Niche
          </label>
          <div className="relative">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. Fitness, Tech, Cooking"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <FileText className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Frequency Select */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Frequency
          </label>
          <div className="relative">
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
            </select>
            <Calendar className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateCalendar}
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-blue-700 ${
            loading && 'opacity-70 cursor-not-allowed'
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-4 h-4" />
              Generating...
            </>
          ) : (
            'Generate Calendar'
          )}
        </button>

        {/* Output Display */}
        {calendar && (
          <>
            <textarea
              value={calendar}
              readOnly
              className="w-full p-4 mt-2 border border-gray-300 rounded-md h-64 resize-none focus:outline-none bg-gray-50"
            ></textarea>

            {/* Save Button */}
            <button
              onClick={saveToSheet}
              className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
              Save to Google Sheets
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);
}

export default App;
