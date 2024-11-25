import axios from "axios";

// Tạo một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Thay thế bằng URL gốc của API
  timeout: 5000, // Thời gian timeout cho mỗi yêu cầu
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
