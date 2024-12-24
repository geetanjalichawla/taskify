import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TaskModal = ({ showModal, setShowModal, formData, handleSubmit, isEditing ,resetFormData}) => {

  const onSubmit = (data) => {
    handleSubmit(data).then(() => {
      setShowModal(false); 
      resetFormData(); 
    });    
  }

  const closeModal = () => {
    setShowModal(false);
    resetFormData(); 
  };

    const { register, handleSubmit: handleFormSubmit, reset } = useForm({
      defaultValues: formData
    });
  
    useEffect(() => {
      reset(formData);
    }, [formData, reset]);
  
    return (
      showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">{isEditing ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={handleFormSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  {...register("title", { required: true })}
                  placeholder="Title"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  {...register("due_date", { required: true })}
                  className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <select {...register("priority")} className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300">
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div className="mb-4">
                <select {...register("status")} className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-blue-300">
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => { closeModal() }} className="bg-gray-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-600">Cancel</button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600">{isEditing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  };

  export default TaskModal;