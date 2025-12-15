import React, { useState } from 'react'

import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import InReviewTask from './InReviewTask';
import ActiveTask from './ActiveTask';

function TaskList({data}) {
 
const [filter, setFilter] = useState('all');
const [search, setSearch] = useState('');

console.log(filter)
const taskFilter = ()=>{
  let tasks = data?.tasks || [];

  // Apply status filter
  if(filter === 'active'){
    tasks = tasks.filter((item)=> item.active )
  }
  if(filter === 'completed') {
    tasks = tasks.filter(item => item.completed)
  }
  if(filter === 'newTask'){
    tasks = tasks.filter(item=>item.newTask)
  }
  if(filter === 'review'){
    tasks = tasks.filter(item=>item.review)
  }
  
  // Apply search filter
  if(search) {
    tasks = tasks.filter(item => 
      item.taskTitle.toLowerCase().includes(search.toLowerCase()) ||
      item.taskDescription?.toLowerCase().includes(search.toLowerCase())
    );
  }

  return tasks;
}
const filteredTasks = taskFilter();
console.log(filteredTasks)

  return (

    <>
    {/* Search and Filter */}
    <div className='mt-6 p-6 bg-gray-800 rounded-xl shadow-lg'>
  <h2 className='mb-6 text-3xl font-bold text-white text-center underline underline-offset-4 decoration-2'>
    Search & Filters
  </h2>

  {/* Search Input */}
  <div className='mb-6'>
    <input
      type='text'
      placeholder='Search tasks by title or description...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className='w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
    />
  </div>

  <h3 className='mb-4 text-xl font-semibold text-white'>Filter by Status</h3>
  <div className='flex flex-wrap gap-4 '>
    {/* Active Tasks */}
    <button 
      onClick={() => setFilter('active')}
      className="px-6 py-3 bg-blue-500 text-white text-lg font-medium rounded-full 
                hover:bg-blue-600 transition-all duration-200 active:scale-95
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      Active
    </button>

    {/* Completed Tasks */}
    <button 
      onClick={() => setFilter('completed')}
      className="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded-full 
                hover:bg-green-600 transition-all duration-200 active:scale-95
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      Completed
    </button>

    {/* New Tasks */}
    <button 
      onClick={() => setFilter('newTask')}
      className="px-6 py-3 bg-purple-500 text-white text-lg font-medium rounded-full 
                hover:bg-purple-600 transition-all duration-200 active:scale-95
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      New Tasks
    </button>

    {/* In Review Tasks */}
    <button 
      onClick={() => setFilter('review')}
      className="px-6 py-3 bg-yellow-500 text-white text-lg font-medium rounded-full 
                hover:bg-yellow-600 transition-all duration-200 active:scale-95
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      In Review
    </button>

    {/* All Tasks */}
    <button 
      onClick={() => setFilter('all')}
      className="px-6 py-3 bg-cyan-500 text-white text-lg font-medium rounded-full 
                hover:bg-cyan-600 transition-all duration-200 active:scale-95
                shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
    >
      All Tasks
    </button>
  </div>
</div>

    {/* Tasks List */}
    <div 
    id='tasklist' 
    className='overflow-x-auto h-[400px] w-full py-5  mt-10 flex items-center justify-start gap-5 scroll-smooth'
  >
   
      {filteredTasks?.map((item,index)=>{
        console.log(item)

        if(item.newTask){
          return <NewTask key={index} data={item}  />
        }


        if(item.active){
       return <ActiveTask key={index} data={item} />
        }
      
        if(item.completed){
          return <CompleteTask key={index} data={item}  />
        }
        if(item.review){
          return <InReviewTask key={index}  data={item}  />
        }
      })}

  </div>
    </>
    
  )
}

export default TaskList
