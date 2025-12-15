import React from 'react';
import { FaTasks, FaCheckCircle, FaRunning, FaExclamationTriangle } from 'react-icons/fa';

function TaskNumbers({ data }) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
      {/* New Tasks Card */}
      <div className='relative rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
        <div className='flex items-center justify-between'>
          <FaTasks className='text-4xl text-white opacity-80' />
          <span className='text-sm font-semibold text-white bg-black/20 px-3 py-1 rounded-full'>
           Newly Added
          </span>
        </div>
        <h2 className='text-5xl font-bold text-white mt-4 mb-2'>{data?.taskCount?.newTask}</h2>
        <p className='text-lg font-medium text-purple-100'>New Tasks</p>
        <div className='absolute bottom-0 left-0 right-0 h-2 bg-black/10 rounded-b-2xl' />
      </div>

      {/* Completed Tasks Card */}
      <div className='relative rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
        <div className='flex items-center justify-between'>
          <FaCheckCircle className='text-4xl text-white opacity-80' />
          <span className='text-sm font-semibold text-white bg-black/20 px-3 py-1 rounded-full'>
           Finished
          </span>
        </div>
        <h2 className='text-5xl font-bold text-white mt-4 mb-2'>{data?.taskCount?.completed}</h2>
        <p className='text-lg font-medium text-emerald-100'>Completed Tasks</p>
        <div className='absolute bottom-0 left-0 right-0 h-2 bg-black/10 rounded-b-2xl' />
      </div>

      {/* Active Tasks Card */}
      <div className='relative rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
        <div className='flex items-center justify-between'>
          <FaRunning className='text-4xl text-white opacity-80' />
          <span className='text-sm font-semibold text-white bg-black/20 px-3 py-1 rounded-full'>
            Ongoing
          </span>
        </div>
        <h2 className='text-5xl font-bold text-white mt-4 mb-2'>{data?.taskCount?.active}</h2>
        <p className='text-lg font-medium text-rose-100'>Active Tasks</p>
        <div className='absolute bottom-0 left-0 right-0 h-2 bg-black/10 rounded-b-2xl' />
      </div>

      {/* Review Tasks Card */}
      <div className='relative rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl'>
        <div className='flex items-center justify-between'>
          <FaExclamationTriangle className='text-4xl text-white opacity-80' />
          <span className='text-sm font-semibold text-white bg-black/20 px-3 py-1 rounded-full'>
           Needs Review
          </span>
        </div>
        <h2 className='text-5xl font-bold text-white mt-4 mb-2'>{data?.taskCount?.review}</h2>
        <p className='text-lg font-medium text-orange-100'>In Review Tasks</p>
        <div className='absolute bottom-0 left-0 right-0 h-2 bg-black/10 rounded-b-2xl' />
      </div>
    </div>
  );
}

export default TaskNumbers;