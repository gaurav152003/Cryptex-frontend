// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useNavigate } from "react-router-dom";

// const AdminQuickActions = () => {
//   const navigate = useNavigate();
//   return (
//     <Card className="bg-black border-b mt-5 ml-5 mr-5 border-white/10">
//       <CardHeader>
//         <CardTitle>Quick Actions</CardTitle>
//       </CardHeader>
//       <CardContent className="flex flex-wrap gap-4">
//         <Button variant="outline" onClick={() => navigate("/")}>
//           « Back TO Home Data
//         </Button>

//         <Button
//           variant="outline"
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         >
//           ⬆ Scroll to Top
//         </Button>

//         <Button variant="outline" onClick={() => alert("Export Users CSV")}>
//           📄 Export Users
//         </Button>

//         <Button
//           variant="outline"
//           onClick={() => alert("Export Withdrawals CSV")}
//         >
//           💾 Export Withdrawals
//         </Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default AdminQuickActions;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AdminExportUsers from "./AdminExportUsers";
import AdminExportWithdrawals from "./AdminExportWithdrawls";

const AdminQuickActions = () => {
  const navigate = useNavigate();
  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          « Back TO Home
        </Button>

        <Button
          variant="outline"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ⬆ Scroll to Top
        </Button>

        <AdminExportUsers />
        <AdminExportWithdrawals />
      </CardContent>
    </Card>
  );
};

export default AdminQuickActions;
