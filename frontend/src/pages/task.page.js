import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/task.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskModal from '../components/TaskModal';
import DeleteModal from '../components/DeleteModal';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'LOW',
    status: 'PENDING',
  });

  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      due_date: '',
      priority: 'LOW',
      status: 'PENDING',
    });
  };
  const [filters, setFilters] = useState({ status: '', priority: '' });

  useEffect(() => {
    loadTasks();
  }, [filters]);

  const loadTasks = async () => {
    const query = new URLSearchParams(filters).toString();
    const data = await fetchTasks(`?${query}`);
    setTasks(data);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async (data) => {
    try {
      if (editId) {
        await updateTask(editId, data);
        toast.success('Task updated successfully');
      } else {
        await createTask(data);
        toast.success('Task created successfully');
      }
      setFormData({ title: '', description: '', due_date: '', priority: 'LOW', status: 'PENDING' });
      setEditId(null);
      setShowModal(false);
      loadTasks();
    } catch (error) {
      toast.error('Error saving task');
    }
  };

  const confirmDelete = async () => {
    await deleteTask(deleteId);
    toast.success('Task deleted successfully');
    setShowDeleteModal(false);
    loadTasks();
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const toggleStatus = async (task) => {
    const updatedTask = { ...task, status: task.status === 'PENDING' ? 'COMPLETED' : 'PENDING' };
    await updateTask(task.id, updatedTask);
    toast.success('Status updated successfully');
    loadTasks();
  };

  const handleEdit = (task) => {
    setEditId(task.id);
    setFormData({ ...task, due_date: task.due_date.split('T')[0] });
    setShowModal(true);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-50 min-h-screen">
      <ToastContainer />
      <h1 className="text-5xl font-bold mb-10 text-center text-blue-800">Taskify</h1>
      <TaskModal showModal={showModal} setShowModal={setShowModal} formData={formData} handleSubmit={handleSubmit} isEditing={!!editId}  resetFormData={resetFormData}/>
      <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleConfirmDelete={confirmDelete} />
      <div className="flex justify-center space-x-4 mb-6">
        <select name="status" onChange={handleFilterChange} className="p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300">
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
        <select name="priority" onChange={handleFilterChange} className="p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300">
          <option value="">All Priority</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
      <button onClick={() => setShowModal(true)} className="mb-6 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600">Add Task</button>
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Due Date</th>
            <th className="py-2 px-4">Priority</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="border-t">
              <td className="py-2 px-4">{task.title}</td>
              <td className="py-2 px-4">{task.description}</td>
              <td className="py-2 px-4">{task.due_date.split('T')[0]}</td>
              <td className="py-2 px-4">{task.priority}</td>
              <td className="py-2 px-4">
                <input type="checkbox" className='w-4 cursor-pointer' checked={task.status === 'COMPLETED'} onChange={() => toggleStatus(task)} />
              </td>
              <td className="py-2 px-4 flex space-x-2">
                <button onClick={() => handleEdit(task)} className="bg-yellow-500 text-white py-1 px-3 rounded-lg">Edit</button>
                <button onClick={() => handleDelete(task.id)} className="bg-red-500 text-white py-1 px-3 rounded-lg">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskPage;
