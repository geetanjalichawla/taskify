const DeleteModal = ({ showDeleteModal, setShowDeleteModal, handleConfirmDelete }) => {
    return (
      showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-2xl max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-center">Confirm Delete</h2>
            <p className="mb-6 text-center">Are you sure you want to delete this task?</p>
            <div className="flex justify-end space-x-4">
              <button onClick={() => setShowDeleteModal(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">Cancel</button>
              <button onClick={handleConfirmDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )
    );
  };
  

  export default DeleteModal;