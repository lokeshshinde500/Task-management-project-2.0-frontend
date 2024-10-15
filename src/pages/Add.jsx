import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Make sure to install react-toastify

const Add = () => {
  const [taskDetails, setTaskDetails] = useState({
    task: "",
    status: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails({ ...taskDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://task-management-2-0.onrender.com/api/task",
        taskDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setTaskDetails({ task: "", status: "", category: "" }); // Reset form
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error creating task";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="container mx-auto px-4 max-w-5xl my-10">
        <div className="add-task-container">
          <h2 className="text-2xl font-semibold text-purple-600 text-center">
            Add Task
          </h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-sm font-medium">Task</label>
              <input
                type="text"
                name="task"
                value={taskDetails.task}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter task name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Status</label>
              <select
                name="status"
                value={taskDetails.status}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={taskDetails.category}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter category"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-2 rounded-md ${
                loading ? "bg-gray-500" : "bg-purple-500 hover:bg-purple-600"
              } text-white`}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Add;
