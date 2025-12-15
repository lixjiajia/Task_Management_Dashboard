import React from 'react';

function InReviewTask({ data }) {
  return (
    <div className="h-full p-6 shrink-0 w-[320px] bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-yellow-700 px-4 py-1 rounded-3xl text-white text-sm font-medium shadow-md">
          {data?.category}
        </h3>
        <h4 className="text-sm font-medium text-gray-100">{data?.taskDate}</h4>
      </div>
      <h2 className="mt-8 text-2xl font-bold text-white">{data?.taskTitle}</h2>
      <p className="text-sm mt-4 text-gray-100">{data?.taskDescription}</p>
      <div className="mt-8">
        <button className="w-full px-4 py-2 text-white bg-yellow-600 hover:bg-yellow-700 transition-all rounded-lg shadow-md text-center transform hover:scale-102 active:scale-95">
          In Review
        </button>
      </div>
    </div>
  );
}

export default InReviewTask;