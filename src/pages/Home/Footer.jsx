import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = ({ scroll }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();

  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-5">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* BRAND */}
          <div>
            <h3 className="text-xl font-bold text-white">CRYPTEX</h3>
            <p className="mt-3 text-sm text-gray-400 max-w-sm">
              A modern crypto platform providing real-time market data, secure
              authentication, live news, and smart portfolio tracking.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => scroll()}
              >
                Market
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/portfolio")}
              >
                Portfolio
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/watchlist")}
              >
                Watchlist
              </li>
              <li
                className="hover:text-white cursor-pointer"
                onClick={() => navigate("/news")}
              >
                News
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-semibold text-white mb-3">Connect</h4>
            <div className="flex items-center gap-4 text-xl text-gray-400">
              <a
                href="https://github.com/gaurav152003"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/gaurav-y15/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/GauravY94951543"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CryptoVista. All rights reserved.
          </p>

          {/* BACK TO TOP */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
          >
            Back to top
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
