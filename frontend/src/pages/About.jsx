import { assets } from "../assets/assets";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"VỀ"} text2={"CHÚNG TÔI"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Chúng tôi là một nền tảng mua sắm trực tuyến ra đời với mục tiêu
            mang lại sự tiện lợi tối đa cho khách hàng, giúp bạn dễ dàng khám
            phá và mua sắm các sản phẩm chất lượng ngay tại nhà. Từ những món đồ
            thời trang, làm đẹp đến các thiết bị điện tử và đồ gia dụng, chúng
            tôi luôn cố gắng cung cấp những sản phẩm đa dạng, đáp ứng mọi nhu
            cầu của bạn.
          </p>
          <p>
            Với cam kết mang đến những sản phẩm từ các thương hiệu uy tín và
            chất lượng, chúng tôi không chỉ chú trọng vào sản phẩm mà còn tập
            trung vào trải nghiệm của khách hàng. Chúng tôi hiểu rằng việc mua
            sắm không chỉ là mua sản phẩm mà còn là tìm kiếm sự hài lòng và tiện
            ích.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Dịch vụ chăm sóc khách hàng của chúng tôi luôn sẵn sàng hỗ trợ và
            giải đáp mọi thắc mắc, cùng với chính sách giao hàng nhanh chóng và
            an toàn. Chúng tôi cam kết sẽ mang đến cho bạn những trải nghiệm mua
            sắm tuyệt vời và sự hài lòng tuyệt đối.
          </p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"TẠI SAO"} text2={"CHỌN CHÚNG TÔI"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Cam Kết Chất Lượng:</b>
          <p className="text-gray-600">
            Chúng tôi cung cấp các sản phẩm chất lượng cao, được chọn lọc kỹ
            càng từ những thương hiệu uy tín, đảm bảo sự hài lòng cho mọi khách
            hàng.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Dịch Vụ Khách Hàng Tận Tâm:</b>
          <p className="text-gray-600">
            Chúng tôi luôn đặt khách hàng lên hàng đầu với dịch vụ chăm sóc tận
            tâm, sẵn sàng giải đáp mọi thắc mắc và hỗ trợ nhanh chóng.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Mua Sắm Tiện Lợi:</b>
          <p className="text-gray-600">
            Với nền tảng mua sắm trực tuyến dễ sử dụng, bạn có thể tìm kiếm và
            mua sắm mọi thứ một cách nhanh chóng, tiện lợi ngay tại nhà.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
