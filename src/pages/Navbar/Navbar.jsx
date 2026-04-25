import { Button } from "@/components/ui/button";
import logo from "@/assets/bluesvg.png";
import {
  AvatarIcon,
  MagnifyingGlassIcon,
  DashboardIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons";
import { Wallet, Menu } from "lucide-react";
import SideBar from "../SideBar/SideBar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleNavigate = () => {
    if (auth.user) {
      navigate("/profile");
    } else {
      navigate("/signin");
    }
  };

  // 🔁 Reusable icon box (NOT fully rounded)
  const IconBox = ({ children, onClick }) => (
    <div
      onClick={onClick}
      className="
    hidden
    sm:flex
    h-8 w-8
    sm:h-12 sm:w-12
    items-center justify-center
    rounded-lg
    bg-black
    border-2 border-white/20
    text-white
    shadow-[0_6px_14px_rgba(0,0,0,0.7)]
    hover:text-blue-400
    transition-all duration-200
    cursor-pointer
  "
    >
      {children}
    </div>
  );

  return (
    <div className="px-3 py-3 border-b border-white/10 z-50 bg-black fixed w-full top-0 flex justify-between items-center ">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:w-10 sm:h-10 rounded-lg border-2 border-white/20 text-white shadow-[0_6px_14px_rgba(0,0,0,0.7)]"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-72 flex flex-col">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={logo} />
                </Avatar>
                <span className="text-blue-500 font-serif text-xl">
                  CRYPTEX
                </span>
              </SheetTitle>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto mt-5">
              <SideBar />
            </div>
          </SheetContent>
        </Sheet>

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-1 cursor-pointer"
        >
          <Avatar className="h-8 w-9">
            <AvatarImage src={logo} />
          </Avatar>
          <span className="text-blue-500 text-[20px] font-serif ml-[-4px]">
            CRYPTEX
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <IconBox onClick={() => navigate("/search")}>
          <MagnifyingGlassIcon className="h-5 w-5" />
        </IconBox>

        <IconBox onClick={() => navigate("/watchlist")}>
          <BookmarkIcon className="h-5 w-5" />
        </IconBox>
        <IconBox onClick={() => navigate("/portfolio")}>
          <DashboardIcon className="h-5 w-5" />
        </IconBox>
        <IconBox onClick={() => navigate("/wallet")}>
          <Wallet size={18} />
        </IconBox>
        {/* PROFILE */}
        <Avatar
          onClick={handleNavigate}
          className="
            h-8 w-8
            sm:w-12 sm:h-12
            rounded-lg
            cursor-pointer
            bg-black
            border-2 border-white/20
            shadow-[0_6px_14px_rgba(0,0,0,0.7)]
          "
        >
          {!auth.user ? (
            <AvatarIcon className="h-7 w-7 text-white" />
          ) : (
            <AvatarFallback className="bg-black text-white font-semibold">
              {auth.user?.fullName?.[0]?.toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
