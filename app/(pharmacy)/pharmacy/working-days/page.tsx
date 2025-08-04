'use client'
import React, { useState } from 'react';
import { Clock, Save, RotateCcw, Calendar } from 'lucide-react';

const PharmacyScheduleAdmin = () => {
  const [schedule, setSchedule] = useState({
    monday: { open: '08:00', close: '18:00', closed: false },
    tuesday: { open: '08:00', close: '18:00', closed: false },
    wednesday: { open: '08:00', close: '18:00', closed: false },
    thursday: { open: '08:00', close: '18:00', closed: false },
    friday: { open: '08:00', close: '18:00', closed: false },
    saturday: { open: '08:00', close: '18:00', closed: false },
    sunday: { open: '08:00', close: '18:00', closed: true }
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const dayNames = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
  };

  const handleTimeChange = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
    setHasChanges(true);
    setSaveStatus('');
  };

  const handleClosedToggle = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        closed: !prev[day].closed
      }
    }));
    setHasChanges(true);
    setSaveStatus('');
  };

  const handleSave = () => {
    // Simulate saving to backend
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setHasChanges(false);
      setTimeout(() => setSaveStatus(''), 3000);
    }, 1000);
  };

  const handleReset = () => {
    setSchedule({
      monday: { open: '08:00', close: '18:00', closed: false },
      tuesday: { open: '08:00', close: '18:00', closed: false },
      wednesday: { open: '08:00', close: '18:00', closed: false },
      thursday: { open: '08:00', close: '18:00', closed: false },
      friday: { open: '08:00', close: '18:00', closed: false },
      saturday: { open: '08:00', close: '18:00', closed: false },
      sunday: { open: '08:00', close: '18:00', closed: true }
    });
    setHasChanges(false);
    setSaveStatus('');
  };

  const copyToAll = (sourceDay) => {
    const sourceSchedule = schedule[sourceDay];
    const newSchedule = {};
    
    Object.keys(schedule).forEach(day => {
      newSchedule[day] = { ...sourceSchedule };
    });
    
    setSchedule(newSchedule);
    setHasChanges(true);
    setSaveStatus('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6  min-h-screen">
      <div className=" rounded-lg s overflow-hidden">
        {/* Header */}
        <div className="b p-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Pharmacy Schedule Management</h1>
              <p className="text-blue-100 mt-1">Configure default opening and closing hours</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={!hasChanges || saveStatus === 'saving'}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  hasChanges && saveStatus !== 'saving'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save className="w-4 h-4" />
                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </button>
            </div>

            {saveStatus === 'saved' && (
              <div className="text-green-600 font-medium">
                Schedule saved successfully!
              </div>
            )}
          </div>

          {/* Schedule Grid */}
          <div className="space-y-4">
            {Object.entries(dayNames).map(([day, dayName]) => (
              <div key={day} className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-24">
                      <h3 className="font-semibold text-gray-900">{dayName}</h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={schedule[day].closed}
                          onChange={() => handleClosedToggle(day)}
                          className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-600">Closed</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {!schedule[day].closed && (
                      <>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">Open:</span>
                          <input
                            type="time"
                            value={schedule[day].open}
                            onChange={(e) => handleTimeChange(day, 'open', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Close:</span>
                          <input
                            type="time"
                            value={schedule[day].close}
                            onChange={(e) => handleTimeChange(day, 'close', e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      </>
                    )}
                    
                    {schedule[day].closed && (
                      <span className="text-red-600 font-medium">CLOSED</span>
                    )}

                    <button
                      onClick={() => copyToAll(day)}
                      className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded transition-colors"
                      title="Copy this schedule to all days"
                    >
                      Copy to All
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">Schedule Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              {Object.entries(dayNames).map(([day, dayName]) => (
                <div key={day} className="flex justify-between">
                  <span className="font-medium text-gray-700">{dayName}:</span>
                  <span className={schedule[day].closed ? 'text-red-600' : 'text-green-600'}>
                    {schedule[day].closed 
                      ? 'Closed' 
                      : `${schedule[day].open} - ${schedule[day].close}`
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 text-sm text-gray-600 bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Instructions:</h4>
            <ul className="space-y-1">
              <li>• Set opening and closing times for each day of the week</li>
              <li>• Check "Closed" to mark a day as closed</li>
              <li>• Use "Copy to All" to apply one day's schedule to all days</li>
              <li>• Click "Save Changes" to update the pharmacy schedule</li>
              <li>• Use "Reset to Default" to restore the original schedule (8:00 AM - 6:00 PM, closed Sunday)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyScheduleAdmin;