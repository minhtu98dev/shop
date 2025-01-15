import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm mb-5">
        <div>
          {/* <img src={assets.logo} className="mb-5 w-32" alt="" /> */}
          <h1 className="mb-5 text-2xl md:text-4xl font-bold">Shop.</h1>
          <p className="w-full md:w-2/3 text-gray-600">
            Cửa hàng chúng tôi cung cấp những bộ sưu tập quần áo thời trang chất
            lượng, luôn cập nhật xu hướng mới nhất. Với nhiều lựa chọn đa dạng,
            chúng tôi cam kết mang đến cho bạn những sản phẩm tinh tế, phù hợp
            với mọi phong cách và nhu cầu.
          </p>
        </div>
        <div>
          <p className="tetx-xl font-medium mb-5">CÔNG TY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Vận chuyển</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>
        <div>
          <p className="tetx-xl font-medium mb-5">LIÊN HỆ VỚI CHÚNG TÔI</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+84-393-940-022</li>
            <li>phamminhtu2204@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="mb-5">
        <hr />
      </div>
    </div>
  );
};

export default Footer;
