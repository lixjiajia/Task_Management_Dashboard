import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";



function CreateTask() {
  const [userData, setUserData] = useContext(AuthContext);

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
      const assignedUser = userData.find(
        (user) => user.firstName.toLowerCase() === assignTo.toLowerCase()
      );
  
      if (!assignedUser) {
        alert("No matching employee found.");
        return;
      }
  
      const res = await createTask({
        variables: {
          employeeId: assignedUser.id, // Use the backend ID
          taskTitle,
          taskDescription,
          taskDate,
          category,
        },
      });
  
      if (res.data.createTask.ok) {
        alert("✅ Task created successfully!");
      }
  
      // Optionally refetch or update your frontend state
      // by querying employees again
    } catch (err) {
      console.error("Error creating task:", err);
    }
  
    // Reset form
    setAssignTo("");
    setCategory("");
    setTaskDate("");
    setTaskTitle("");
    setTaskDescription("");
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
            Date
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
          <label htmlFor="employee-name" className="block text-lg font-medium">
            Assign to
          </label>
          <input
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            type="text"
            id="employee-name"
            className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ease-in-out duration-300"
            placeholder="Employee Name"
          />
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
