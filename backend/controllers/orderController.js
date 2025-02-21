import { model } from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

// global variables
const currency = "inr";
const deliveryCharge = 10;
//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//placing orders using cod method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Đặt hàng" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    // Cộng phí vận chuyển vào tổng số tiền
    const totalAmount = amount + deliveryCharge;

    // Tạo dữ liệu đơn hàng
    const orderData = {
      userId,
      items,
      address,
      amount: totalAmount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    // Lưu đơn hàng vào CSDL
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Chuẩn bị line_items cho Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: { name: item.name },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Thêm phí vận chuyển
    line_items.push({
      price_data: {
        currency: currency,
        product_data: { name: "Phí giao hàng" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    // Tạo phiên Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//verify stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//placing orders using razorpay method
const placeOrderRazorpay = async (req, res) => {};
//all orders data for admin
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//user order data for frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// delete order
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body; // Lấy orderId từ request body

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "ID đơn hàng là bắt buộc" });
    }

    // Xóa đơn hàng bằng id
    const deletedOrder = await orderModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy đơn hàng" });
    }

    res.json({ success: true, message: "Đơn hàng đã được xóa thành công" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//update order status for admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Đã cập nhật trạng thái" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyStripe,
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  deleteOrder,
};
