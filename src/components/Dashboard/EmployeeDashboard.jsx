import React from 'react'
import Header from '../Other/Header'
import TaskNumbers from '../Other/TaskNumbers'
import TaskList from '../TaskList/TaskList'

function EmployeeDashboard(props) {
  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen p-8 backdrop-blur-sm">
      <div className="bg-gray-900/80 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border border-white/10">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600/30 to-pink-600/30">
          <Header changeUser={props.changeUser} data={props.data} />
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Task Statistics */}
          <div className="bg-gray-800/50 rounded-xl p-6 shadow-inner backdrop-blur-sm border border-white/5">
            <h3 className="text-xl font-semibold text-white mb-4 ml-2">Task Overview</h3>
            <TaskNumbers data={props.data} />
          </div>

          {/* Task List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Tasks
              </h2>
              <span className="text-sm text-purple-300">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="bg-gray-800/40 rounded-xl border border-white/10 shadow-lg overflow-hidden">
              <TaskList data={props.data} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-indigo-600/20 to-pink-600/20 p-4 text-center">
          <p className="text-sm text-gray-400">
            Need help? Contact <span className="text-purple-300 hover:text-purple-200 cursor-pointer">support</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDashboard