import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between py-2 px-[4%]">
      {/* <img className="w-[max(10%,80px)]" src={assets.logo} alt="" /> */}
      <div>
        <h1 className="text-4xl font-bold">Shop.</h1>
        <p className="text-pink-400 font-semibold">Admin Panel</p>
      </div>
      <div className="flex justify-center items-center gap-5">
        <div>
          <a
            href="https://shop-frontend-sable.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-full px-5 py-2 hover:bg-gray-300 border-black"
          >
            Vào trang Admin
          </a>
        </div>
        <button
          onClick={() => setToken("")}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Navbar;
