const AdminFooter = () => {
  return (
    <div className="text-center text-xs text-gray-500 py-6">
      <p>Admin Dashboard • Version 1.0.0</p>
      <p>Last updated: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default AdminFooter;
