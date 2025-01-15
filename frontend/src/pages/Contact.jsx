import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"LIÊN HỆ "} text2={"VỚI CHÚNG TÔI"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt=""
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Địa Chỉ</p>
          <p className="text-gray-500">District 7, Ho Chi Minh City</p>
          <p className="text-gray-500">
            Tel: (+84) 393-940-022 <br />
            Email: phamminhtu2204@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">Cơ Hội Hợp Tác</p>
          <p className="text-gray-500">Mong được hợp tác với mọi người.</p>
          <a
            href="https://portfolio-6ky7.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
              Khám Phá Thêm
            </button>
          </a>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
