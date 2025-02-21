import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import CartToTal from "../components/CartToTal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    products,
    getCartAmount,
    delivery_fee,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = JSON.parse(
              JSON.stringify(products.find((product) => product._id === items))
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        //api calls for cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data);

          if (response.data?.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* left */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="textxl sm:text-2xl my-3">
          <Title text1={"THÔNG TIN"} text2={"GIAO HÀNG"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="Họ"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Tên"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Địa chỉ email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Đường"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="Quận/Huyện"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="Tỉnh/Thành phố"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="number"
            placeholder="Mã bưu điện"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Quốc gia"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="number"
          placeholder="Điện thoại"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* right */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartToTal />
        </div>
        {/* payment */}
        <div className="mt-12">
          <Title text1={"PHƯƠNG THỨC"} text2={"THANH TOÁN"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 px-4" />
            </div>
            {/* <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 px-4" />
            </div> */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Thanh toán khi nhận hàng
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              // onClick={() => navigate("/orders")}
              className="bg-black text-white px-16 py-3 text-sm"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
