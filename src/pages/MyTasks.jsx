import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyStock from "../components/MyStock";

export default function MyTasks() {
  const token = localStorage.getItem("token");
  const [originalTask, setOriginalTask] = useState([]);
  const [Task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://task-management-2-0.onrender.com/api/task",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setOriginalTask(response.data.tasks);
      setTask(response.data.tasks);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // handle search here
  const handleSearch = async () => {
    const filter = originalTask.filter((task) =>
      task.task.toLowerCase().includes(search.toLowerCase())
    );
    setTask(filter);
  };

  //onUpdate
  const onUpdate = async (id, data) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `https://task-management-2-0.onrender.com/api/task/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  //onDelete
  const onDelete = async (id) => {
    const deleteData = Task.filter((task) => task._id !== id);
    setTask(deleteData);
    setOriginalTask(deleteData);
    try {
      const response = await axios.delete(
        `https://task-management-2-0.onrender.com/api/task/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <section className="section-home my-5">
        <div className="container mx-auto px-5">
          <div className="basic-features flex items-center gap-2 justify-center mb-10">
            <input
              type="text"
              className="border-2 p-2 w-1/3 border-violet-400 outline-none rounded-lg shadow-lg transition duration-300 focus:border-violet-600 focus:shadow-xl"
              placeholder="Search here..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button
              className="button bg-violet-500 text-white p-2 rounded-lg shadow-md hover:bg-violet-600 transition duration-300 font-semibold text-sm flex items-center justify-center"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {Task.map((task) => (
              <MyStock
                key={task._id}
                Task={task}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
