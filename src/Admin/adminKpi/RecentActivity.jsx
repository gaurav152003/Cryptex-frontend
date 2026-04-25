import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivity = () => {
  const { users, withdrawal } = useSelector((s) => s);

  const recentUsers = (users.allUsers || []).slice(-5).reverse();
  const recentWithdrawals = (withdrawal.requests || []).slice(-6).reverse();

  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-md">
        {recentUsers.map((u) => (
          <p key={`u-${u.id}`} className="text-gray-300">
            👤 New user: <b>{u.fullName}</b>
          </p>
        ))}

        {recentWithdrawals.map((w) => (
          <p key={`w-${w.id}`} className="text-gray-300">
            💸 Withdrawal: <b>${w.amount}</b> by {w.user?.fullName}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
