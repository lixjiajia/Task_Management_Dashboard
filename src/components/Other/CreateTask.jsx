import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";



function CreateTask() {
  const [userData, setUserData, refetch] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  
  const CREATE_TASK = gql`
    mutation CreateTask(
      $employeeId: Int!
      $taskTitle: String!
      $taskDescription: String
      $taskDate: Date
      $category: String
    ) {
      createTask(
        employeeId: $employeeId
        taskTitle: $taskTitle
        taskDescription: $taskDescription
        taskDate: $taskDate
        category: $category
      ) {
        ok
        task {
          id
          taskTitle
          taskDescription
          taskDate
          category
        }
      }
    }
  `;
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: ['GetEmployees'],
  });
  
  const submitHandler = async (e) => {
    e.preventDefault();
  
    try {
      if (!assignTo) {
        alert("Please select an employee to assign the task to.");
        return;
      }
  
      if (!taskTitle.trim()) {
        alert("Please enter a task title.");
        return;
      }
  
      const res = await createTask({
        variables: {
          employeeId: parseInt(assignTo),
          taskTitle: taskTitle.trim(),
          taskDescription: taskDescription.trim() || null,
          taskDate: taskDate || null,
          category: category.trim() || null,
        },
      });
    if (res.data.createTask.ok) {
        alert("Task created successfully!");
        refetch();

        // Reset form only on success
        setAssignTo("");
        setCategory("");
        setTaskDate("");
        setTaskTitle("");
        setTaskDescription("");
      } else {
        console.error("Mutation response:", res);
        alert("Task creation failed. Please check the console for details.");
      }
    } catch (err) {
      console.error("Error creating task:", err);
      alert(`Error creating task: ${err.message}`);
    }
  };
  

  return (
    <div className="text-white mb-8 max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl">
      <form onSubmit={(e) => submitHandler(e)} className="space-y-6">
        <h3 className="text-3xl font-bold text-center">Create a New Task</h3>

        <div className="relative">
          <label htmlFor="task-title" className="block text-lg font-medium">
            Task Title
          </label>
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            type="text"
            id="task-title"
            className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-300"
            placeholder="Make UI design"
          />
        </div>

        <div className="relative">
          <label
            htmlFor="task-description"
            className="block text-lg font-medium"
          >
            Description
          </label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            id="task-description"
            className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-300"
            placeholder="Describe the task"
            rows="6"
          ></textarea>
        </div>

        <div className="relative">
          <label htmlFor="task-date" className="block text-lg font-medium">
            Deadline
          </label>
          <input
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            type="date"
            id="task-date"
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-300"
          />
        </div>

        <div className="relative">
          <label htmlFor="employee-select" className="block text-lg font-medium">
            Assign to
          </label>
          <div className="relative">
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              id="employee-select"
              className="w-full p-4 pr-10 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-300 appearance-none"
              required
            >
              <option value="">Select an employee</option>
              {userData && userData.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.firstName} ({employee.email})
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="relative">
          <label htmlFor="task-category" className="block text-lg font-medium">
            Category
          </label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            id="task-category"
            className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-300"
            placeholder="Design/Dev, etc.."
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br hover:scale-[1.02] focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 text-white rounded-lg font-semibold text-lg transition ease-in-out duration-00"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
