import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  // Hàm xóa đơn hàng
  const deleteOrderHandler = async (orderId) => {
    try {
      const response = await axios.delete(
        backendUrl + "/api/order/deleteOrder",
        {
          data: { orderId },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        toast.success("Order deleted successfully");
        fetchAllOrders(); // Cập nhật lại danh sách đơn hàng
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting order");
    }
  };

  // Hàm tải tất cả đơn hàng
  const fetchAllOrders = async () => {
    if (!token) {
      return;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        { page: currentPage, limit: ordersPerPage }, // Truyền tham số phân trang
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        const sortedOrders = response.data.orders.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Hàm thay đổi trạng thái đơn hàng
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Phân trang đơn hàng
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const paginatedOrders = chunkArray(orders, ordersPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Gọi lại hàm khi token hoặc currentPage thay đổi
  useEffect(() => {
    fetchAllOrders();
  }, [token, currentPage]);

  return (
    <div>
      <h3>Đơn Hàng</h3>
      <div>
        {paginatedOrders[currentPage - 1]?.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.name} x {item.quantity} <span>{item.size} ,</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Số lượng: {order.items.length}
              </p>
              <p className="mt-3">Phương thức: {order.paymentMethod}</p>
              <p>
                Trạng thái:{" "}
                {order.payment ? "Đã thanh toán" : "Chưa thanh toán"}
              </p>
              <p>Ngày: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Đặt hàng">Đơn hàng đã được đặt</option>
              <option value="Đóng gói">Đang đóng gói</option>
              <option value="Đã gửi">Đã gửi</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Đã giao">Đã giao</option>
            </select>
            <button
              onClick={() => deleteOrderHandler(order._id)}
              className="ml-3 px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-red-600"
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center gap-2 mt-4">
        {paginatedOrders.length > 1 &&
          Array.from({ length: paginatedOrders.length }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 border ${
                currentPage === index + 1 ? "bg-gray-600 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Orders;
