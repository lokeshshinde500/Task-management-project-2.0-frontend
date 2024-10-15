import React from "react";

function TaskCard({ Task }) {
  const { task, category, status } = Task;
  return (
    <div className=" shadow-md rounded-lg p-4 m-4 border border-violet-300 transform hover:scale-105 hover:bg-violet-100 transition">
      <h2 className="text-xl font-bold text-violet-600">{task}</h2>
      <p className="text-sm text-gray-600 mt-2">
        Category:{" "}
        <span className="font-semibold text-violet-500">{category}</span>
      </p>
      <p className="text-sm text-gray-600">
        Status: <span className="font-semibold text-violet-500">{status}</span>
      </p>
    </div>
  );
}

export default TaskCard;
