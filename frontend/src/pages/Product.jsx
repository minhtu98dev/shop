import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id == productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* product data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* image */}
        <div className="flex-1  flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[19%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                alt=""
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <p className="pl-2">(112)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Chọn kích cỡ</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : " "
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 active:bg-gray-700"
          >
            THÊM VÀO GIỎ HÀNG
          </button>
          <hr className="mt-8 w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>Sản phẩm 100% chính hãng.</p>
            <p>Thanh toán khi nhận hàng có sẵn cho sản phẩm này.</p>
            <p>Chính sách đổi trả và hoàn tiền dễ dàng trong vòng 7 ngày.</p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mt-20 ">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Mô Tả</b>
          <p className="border px-5 py-3 text-sm">Đánh Giá (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Sản phẩm này được làm từ chất liệu cao cấp, đảm bảo sự bền bỉ và
            thoải mái khi sử dụng. Thiết kế hiện đại, phù hợp với mọi phong cách
            và dễ dàng kết hợp với các trang phục khác. Với nhiều lựa chọn về
            màu sắc và kích cỡ, sản phẩm này chắc chắn sẽ đáp ứng mọi nhu cầu
            của bạn. Hãy tận hưởng sự kết hợp hoàn hảo giữa chất lượng và phong
            cách với sản phẩm của chúng tôi!
          </p>
          <p>
            Sản phẩm không chỉ đảm bảo chất lượng mà còn được kiểm tra kỹ lưỡng
            trước khi đến tay người tiêu dùng, mang đến cho bạn sự an tâm tuyệt
            đối. Được thiết kế để phù hợp với mọi dịp và nhu cầu sử dụng, đây sẽ
            là lựa chọn lý tưởng cho mọi khách hàng yêu thích sự tiện dụng và
            thời trang.
          </p>
        </div>
      </div>
      {/* RELATED */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
