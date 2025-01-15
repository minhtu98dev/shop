import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse()); // Reverse to show latest orders first
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"ĐƠN HÀNG"} text2={"CỦA TÔI"} />
      </div>
      <div>
        {orders.map((order, index) => {
          const total = order.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          );

          return (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[2.5fr_2fr_1fr] py-4 border-b border-gray-500 text-gray-700"
            >
              <div className="space-y-4">
                {order.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex flex-col md:flex-row md:items-center gap-4"
                  >
                    <img
                      className="w-16 sm:w-20"
                      src={item.image[0]}
                      alt={item.name}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-700">
                        <p>
                          {currency}
                          {item.price}
                        </p>
                        <p>Kích Cỡ: {item.size}</p>
                        <p>Số Lượng: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <p>
                  Ngày:{" "}
                  <span className="text-gray-400">
                    {new Date(order.date).toDateString()}
                  </span>
                </p>
                <p>
                  Phương Thức Thanh Toán:{" "}
                  <span className="text-gray-400">{order.paymentMethod}</span>
                </p>
                <p>
                  Trạng Thái:{" "}
                  <span className="text-green-500">{order.status}</span>
                </p>
                <p>
                  Tổng Cộng:{" "}
                  <span className="font-medium">
                    {currency}
                    {total.toFixed(2)}
                  </span>
                </p>
              </div>
              <div>
                <button
                  onClick={loadOrderData}
                  className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-200"
                >
                  Theo dõi đơn hàng
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
