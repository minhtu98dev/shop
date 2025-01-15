const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Đăng ký ngay và nhận ngay 20% giảm giá
      </p>
      <p className="text-gray-400 mt-3">
        Nhanh tay đăng ký để nhận ưu đãi đặc biệt và cập nhật những sản phẩm mới
        nhất!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          type="email"
          placeholder="Nhập email của bạn ..."
          className="w-full sm:flex-1 outline-none"
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
          onClick={() => (window.location.href = "/login")}
        >
          ĐĂNG KÝ
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
