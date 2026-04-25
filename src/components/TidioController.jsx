import { useEffect } from "react";
import { useSelector } from "react-redux";

const TidioController = () => {
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!window.tidioChatApi) return;

      if (auth?.user) {
        // user logged in
        window.tidioChatApi.show();
      } else {
        // user logged out
        window.tidioChatApi.hide();
      }

      clearInterval(interval);
    }, 300);

    return () => clearInterval(interval);
  }, [auth?.user]);

  return null;
};

export default TidioController;
