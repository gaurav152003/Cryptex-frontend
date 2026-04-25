import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { exportToCsv } from "@/Util/exportCSV";

const AdminExportUsers = () => {
  const { allUsers } = useSelector((store) => store.users);

  const handleExport = () => {
    const data = allUsers.map((u) => ({
      ID: u.id,
      Name: u.fullName,
      Email: u.email,
      Verified: u.isVerified ? "Yes" : "No",
      Role: u.role,
    }));

    exportToCsv("users.csv", data);
  };

  return (
    <Button variant="outline" onClick={handleExport}>
      📄 Export Users
    </Button>
  );
};

export default AdminExportUsers;
