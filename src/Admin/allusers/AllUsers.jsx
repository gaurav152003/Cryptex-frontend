import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const UsersGrid = () => {
  const { allUsers, verifiedUsers, nonVerifiedUsers } = useSelector(
    (store) => store.users,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UserColumn title="All Users" users={allUsers} />

      <UserColumn
        title="Verified Users"
        users={verifiedUsers}
        badgeColor="green"
      />

      <UserColumn
        title="Non-Verified Users"
        users={nonVerifiedUsers}
        badgeColor="red"
      />
    </div>
  );
};

/* ================= USER COLUMN ================= */
const UserColumn = ({ title, users, badgeColor }) => (
  <Card className="bg-black border border-white/10">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>

    <ScrollArea className="h-[350px]">
      <CardContent className="space-y-3">
        {users.length === 0 ? (
          <p className="text-gray-400 text-sm">No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between border border-white/10 rounded-md px-3 py-2 hover:bg-white/5 transition"
            >
              <div>
                <p className="font-medium text-sm">{user.fullName}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>

              {badgeColor && (
                <Badge
                  className={
                    badgeColor === "green"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }
                >
                  {badgeColor === "green" ? "Verified" : "Non-Verified"}
                </Badge>
              )}
            </div>
          ))
        )}
      </CardContent>
    </ScrollArea>
  </Card>
);

export default UsersGrid;
