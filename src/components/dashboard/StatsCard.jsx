import React from 'react';

const StatsCard = ({ title, value, icon, colorClass }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-500 text-sm">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClass} bg-opacity-20`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;