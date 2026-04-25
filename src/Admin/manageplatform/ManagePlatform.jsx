import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllWithdrawalRequest } from "@/Redux/Withdrawal/Action";
import {
  getAllUsers,
  getVerifiedUsers,
  getNonVerifiedUsers,
} from "@/Redux/users/Action";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import WithdrawalAdmin from "../Withdrawal/WithdrawalAdmin";
import WithdrawalGraph from "../Withdrawal/WithdrawnGrapg";
import UsersGrid from "../allusers/AllUsers";
import { IoMdArrowRoundBack } from "react-icons/io";
import AdminMarketOverview from "../coins/AdminMarketOverview";
import { useNavigate } from "react-router-dom";
import AdminKpis from "../adminKpi/AdminKpi";
import MarketDominance from "../adminKpi/MarketDominance";
import RecentActivity from "../adminKpi/RecentActivity";
import AdminQuickActions from "./AdminQuickAction";
import AdminFooter from "./AdminFooter";

const ManagePlatform = () => {
  const dispatch = useDispatch();

  const { allUsers, verifiedUsers, nonVerifiedUsers } = useSelector(
    (store) => store.users,
  );
  const navigate = useNavigate();
  /* ================= FETCH DATA ================= */
  useEffect(() => {
    dispatch(getAllWithdrawalRequest(localStorage.getItem("jwt")));

    dispatch(getAllUsers());
    dispatch(getVerifiedUsers());
    dispatch(getNonVerifiedUsers());
  }, []);

  /* ================= MARKET DATA ================= */

  return (
    <div className="px-6 lg:px-12 py-10 text-white space-y-10">
      <div onClick={() => navigate("/")} className="  cursor-pointer">
        <IoMdArrowRoundBack className="text-white h-5 w-5" />
      </div>
      <h1 className="text-3xl font-bold">Admin Platform Dashboard</h1>

      {/* ================= TOP USER STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="All Users" value={allUsers.length} />
        <StatCard
          title="Verified Users"
          value={verifiedUsers.length}
          color="text-green-400"
        />
        <StatCard
          title="Non-Verified Users"
          value={nonVerifiedUsers.length}
          color="text-red-400"
        />
      </div>

      {/* ================= USERS SECTION (FULL WIDTH) ================= */}
      <Card className="bg-black border border-white/10">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>

        <CardContent>
          <UsersGrid />
        </CardContent>
      </Card>

      {/* ================= TRENDING STOCKS ================= */}
      <Card className="bg-black border border-white/10 p-4">
        <AdminKpis />
        <AdminMarketOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
          <MarketDominance />
          <RecentActivity />
        </div>
      </Card>
      {/* ================= WITHDRAWAL GRAPH (FULL WIDTH BELOW) ================= */}
      <Card className="bg-black border border-white/10">
        <CardHeader>
          <CardTitle>Withdrawal Amount Over Time</CardTitle>
        </CardHeader>

        <CardContent>
          <WithdrawalGraph />
        </CardContent>
      </Card>
      {/* ================= WITHDRAWAL LIST ================= */}
      <Card className="bg-black border border-white/10 relative">
        {/* ✅ STICKY CARD HEADER */}
        <CardHeader className="sticky top-0 z-30 bg-black border-b border-white/10">
          <CardTitle className="text-xl px-6">Withdrawals</CardTitle>
        </CardHeader>

        {/* ✅ SCROLL ONLY BODY */}
        <ScrollArea className="h-[420px]">
          <div className="px-6 pb-4">
            <WithdrawalAdmin />
          </div>
        </ScrollArea>
      </Card>

      <Card>
        <AdminQuickActions />
        <AdminFooter />
      </Card>
    </div>
  );
};

/* ================= SMALL STAT CARD ================= */
const StatCard = ({ title, value, color = "text-white" }) => (
  <Card className="bg-black border border-white/10">
    <CardContent className="p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </CardContent>
  </Card>
);

export default ManagePlatform;
