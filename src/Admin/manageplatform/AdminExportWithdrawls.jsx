import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { exportToCsv } from "@/Util/exportCSV";

const AdminExportWithdrawals = () => {
  const { requests } = useSelector((store) => store.withdrawal);

  const handleExport = () => {
    const data = requests.map((w) => ({
      Date: w.date,
      User: w.user?.fullName,
      Email: w.user?.email,
      Amount: w.amount,
      Status: w.status,
      Method: "Bank Account",
    }));

    exportToCsv("withdrawals.csv", data);
  };

  return (
    <Button variant="outline" onClick={handleExport}>
      💾 Export Withdrawals
    </Button>
  );
};

export default AdminExportWithdrawals;
