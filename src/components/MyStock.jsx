import React, { useState } from "react";

function MyStock({ Task, onDelete, onUpdate }) {
  const { _id, task, category, status } = Task;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({
    task,
    status,
    category,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Use 'name' to identify the input
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  // Handling update
  const handleUpdateSubmit = () => {
    onUpdate(_id, updatedTask);
    console.log(_id, updatedTask);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="shadow-md rounded-lg p-4 m-4 border border-violet-300 transform hover:scale-105 hover:bg-violet-100 transition">
        <h2 className="text-xl font-bold text-violet-600">{task}</h2>
        <p className="text-sm text-gray-600 mt-2">
          Status:{" "}
          <span className="font-semibold text-violet-500">{status}</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Category:{" "}
          <span className="font-semibold text-violet-500">{category}</span>
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-500 text-white text-sm font-semibold py-1 px-2 rounded hover:bg-violet-600 transition"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="bg-red-500 text-white text-sm font-semibold py-1 px-2 rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold text-violet-600">Update task</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-semibold">Name</label>
                <input
                  type="text"
                  name="task"
                  value={updatedTask.task}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={updatedTask.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="in Progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={updatedTask.category}
                  onChange={handleInputChange}
                  className="border rounded w-full p-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdateSubmit}
                  className="bg-violet-500 text-white font-semibold py-1 px-3 rounded hover:bg-violet-600 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="ml-2 bg-gray-300 text-gray-800 font-semibold py-1 px-3 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyStock;
