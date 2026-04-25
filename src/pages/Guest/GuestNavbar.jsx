import logo from "@/assets/bluesvg.png";

import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const navigate = useNavigate();

  // 🔁 Reusable icon box (NOT fully rounded)

  return (
    <div className="px-3 py-3 border-b border-white/10 z-50 bg-black fixed w-full top-0 flex justify-between items-center ">
      {/* LEFT */}
      <div className="flex items-center gap-3">
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
        <Link to="/signin">
          <Button className="bg-green-600 hover:bg-green-700">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="bg-blue-600 hover:bg-blue-700 mr-20">
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
