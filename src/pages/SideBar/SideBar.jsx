/* eslint-disable no-unused-vars */
import { logout } from "@/Redux/Auth/Action";
import { resetTidio } from "@/Util/restTidio";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import {
  ExitIcon,
  BookmarkIcon,
  PersonIcon,
  DashboardIcon,
  HomeIcon,
  ActivityLogIcon,
  MagnifyingGlassIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";
import { Boxes, CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* ---------------- MENU CONFIG ---------------- */
const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Boxes className="h-6 w-6" />,
    adminOnly: true, // 🔐 ADMIN ONLY
  },
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  {
    name: "Search",
    path: "/search",
    icon: <MagnifyingGlassIcon className="h-6 w-6" />,
  },
  {
    name: "News",
    path: "/news",
    icon: <GlobeIcon className="h-6 w-6" />,
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: <DashboardIcon className="h-6 w-6" />,
  },
  {
    name: "Watchlist",
    path: "/watchlist",
    icon: <BookmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Activity",
    path: "/activity",
    icon: <ActivityLogIcon className="h-6 w-6" />,
  },
  { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-6 w-6" /> },
  {
    name: "Bank Details",
    path: "/payment-details",
    icon: <LandmarkIcon className="h-6 w-6" />,
  },
  {
    name: "Withdrawal",
    path: "/withdrawal",
    icon: <CreditCardIcon className="h-6 w-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="h-6 w-6" />,
  },
  { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> },
];

/* ---------------- COMPONENT ---------------- */
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { auth } = useSelector((store) => store);
  const role = auth.user?.role;

  /* 🔐 Filter menu based on role */
  const filteredMenu = menu.filter((item) => {
    if (item.adminOnly) {
      return role === "ROLE_ADMIN";
    }
    return true;
  });

  const handleLogout = () => {
    resetTidio();
    dispatch(logout());
    navigate("/", { replace: true });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMenuClick = (item) => {
    if (item.name === "Logout") {
      handleLogout();
    } else {
      navigate(item.path);
      scrollToTop();
    }
  };

  return (
    <div className="mt-2 space-y-4">
      {filteredMenu.map((item) => (
        <SheetClose key={item.name} className="w-full">
          <Button
            onClick={() => handleMenuClick(item)}
            variant="outline"
            className="flex items-center gap-4 py-6 w-full justify-start px-6"
          >
            <span className="w-10 flex justify-center items-center">
              {item.icon}
            </span>
            <p className="text-left font-medium">{item.name}</p>
          </Button>
        </SheetClose>
      ))}
    </div>
  );
};

export default SideBar;
