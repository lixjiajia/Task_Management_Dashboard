import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

function AllTask() {
    
    const [userData, setUserData, refetch] = useContext(AuthContext);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const DELETE_TASK = gql`
        mutation DeleteTask($taskId: Int!) {
            deleteTask(taskId: $taskId) {
                ok
                task {
                    id
                    taskTitle
                }
            }
        }
    `;

    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: ['GetEmployees'],
    });

    const handleDeleteTask = async (taskId, taskTitle) => {
        if (window.confirm(`Are you sure you want to delete the task "${taskTitle}"?`)) {
            try {
                const result = await deleteTask({
                    variables: { taskId: parseInt(taskId) }
                });
                
                if (result.data.deleteTask.ok) {
                    alert('Task deleted successfully!');
                } else {
                    alert('Failed to delete task.');
                }
            } catch (error) {
                console.error('Error deleting task:', error);
                alert('Error deleting task. Please try again.');
            }
        }
    };

    // Flatten all tasks with employee info
    const allTasks = userData.flatMap(employee => 
      employee.tasks.map(task => ({ ...task, employeeName: employee.firstName }))
    );

    // Filter tasks
    const filteredTasks = allTasks.filter(task => {
      const matchesSearch = !search || 
        task.taskTitle.toLowerCase().includes(search.toLowerCase()) ||
        task.taskDescription?.toLowerCase().includes(search.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && task.active) ||
        (statusFilter === 'new' && task.newTask) ||
        (statusFilter === 'completed' && task.completed) ||
        (statusFilter === 'failed' && task.failed);
      
      return matchesSearch && matchesStatus;
    });

  return (
    <div id='tasklist' className='bg-[#1c1c1c] p-8 rounded-xl h-[500px] overflow-auto shadow-2xl'>
      <h1 className='text-3xl font-bold text-white mb-6'>All Tasks</h1>

      {/* Search and Filter */}
      <div className='mb-6 space-y-4'>
        <input
          type='text'
          placeholder='Search tasks...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
        >
          <option value='all'>All Status</option>
          <option value='new'>New</option>
          <option value='active'>Active</option>
          <option value='completed'>Completed</option>
          <option value='failed'>Failed</option>
        </select>
      </div>
   
      <div className='space-y-4'>
        {filteredTasks.map((task, index) => (
          <div key={task.id} className='bg-gray-800 p-4 rounded-lg'>
            <div className='flex justify-between items-start'>
              <div>
                <h3 className='text-lg font-semibold text-white'>{task.taskTitle}</h3>
                <p className='text-sm text-gray-300'>{task.taskDescription}</p>
                <p className='text-xs text-gray-400'>Assigned to: {task.employeeName}</p>
              </div>
              <div className='text-right'>
                <div className='flex items-center gap-2 mb-2'>
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.newTask ? 'bg-purple-600' :
                    task.active ? 'bg-blue-600' :
                    task.completed ? 'bg-green-600' :
                    task.failed ? 'bg-yellow-600' : 'bg-gray-600'
                  } text-white`}>
                    {task.newTask ? 'New' :
                     task.active ? 'Active' :
                     task.completed ? 'Completed' :
                     task.failed ? 'In Review' : 'Unknown'}
                  </span>
                  <button
                    onClick={() => handleDeleteTask(task.id, task.taskTitle)}
                    className='px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors duration-200'
                    title='Delete Task'
                  >
                    Delete
                  </button>
                </div>
                <p className='text-xs text-gray-400'>{task.taskDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTask;
