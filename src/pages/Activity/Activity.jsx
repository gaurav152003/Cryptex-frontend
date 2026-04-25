import { useNavigate } from "react-router-dom";
import TreadingHistory from "../Portfilio/TreadingHistory";
import { IoMdArrowRoundBack } from "react-icons/io";

const Activity = () => {
  const navigate = useNavigate();
  return (
    <div className="px-20 mt-20">
      <div onClick={() => navigate("/")} className="  cursor-pointer">
        <IoMdArrowRoundBack className="text-white h-5 w-5" />
      </div>
      <p className="py-5 pb-50 text-2xl font-semibold">Trading History</p>
      <TreadingHistory />
    </div>
  );
};

export default Activity;
