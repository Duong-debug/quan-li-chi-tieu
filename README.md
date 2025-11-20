# 💰 Expense Management Application

Ứng dụng quản lý chi tiêu cá nhân toàn diện với AI hỗ trợ, giúp bạn theo dõi thu chi, lập ngân sách, và đạt được mục tiêu tài chính.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-47A248?style=flat&logo=mongodb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)

## 📋 Mục Lục

- [Tính Năng](#-tính-năng)
- [Công Nghệ](#-công-nghệ)
- [Yêu Cầu Hệ Thống](#-yêu-cầu-hệ-thống)
- [Cài Đặt](#-cài-đặt)
- [Cấu Hình](#-cấu-hình)
- [Sử Dụng](#-sử-dụng)
- [Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
- [Tài Liệu Bổ Sung](#-tài-liệu-bổ-sung)
- [Đóng Góp](#-đóng-góp)

## ✨ Tính Năng

### 🎯 Quản Lý Tài Chính Cơ Bản
- ✅ **Ghi chú thu chi**: Thêm, sửa, xóa các giao dịch thu/chi
- 📊 **Dashboard trực quan**: Biểu đồ thống kê chi tiêu theo thời gian và danh mục
- 🏷️ **Phân loại tùy chỉnh**: Tạo và quản lý danh mục chi tiêu riêng
- 📅 **Lọc theo thời gian**: Xem chi tiêu theo ngày, tuần, tháng, năm

### 💼 Quản Lý Ngân Sách
- 💵 **Lập ngân sách**: Đặt giới hạn chi tiêu cho từng danh mục
- ⚠️ **Cảnh báo thông minh**: Nhận thông báo khi vượt ngưỡng ngân sách
- 📈 **Theo dõi tiến độ**: Xem tỷ lệ sử dụng ngân sách theo thời gian thực

### 🎯 Mục Tiêu Tiết Kiệm
- 🎖️ **Đặt mục tiêu**: Tạo các mục tiêu tiết kiệm với deadline
- 📊 **Theo dõi tiến độ**: Cập nhật số tiền đã tiết kiệm được
- 🏆 **Quản lý ưu tiên**: Phân loại mục tiêu theo độ ưu tiên

### 🔄 Giao Dịch Định Kỳ
- 🔁 **Tự động hóa**: Thiết lập các khoản chi phí định kỳ (hàng ngày/tuần/tháng/năm)
- 📅 **Lên lịch tự động**: Hệ thống tự động tạo giao dịch theo lịch
- 🔔 **Nhắc nhở**: Thông báo trước khi đến hạn thanh toán

### 📊 Báo Cáo & Phân Tích
- 📄 **Báo cáo chi tiết**: Tạo báo cáo theo ngày/tuần/tháng/năm
- 📥 **Xuất PDF**: Download báo cáo dưới dạng PDF
- 📈 **Biểu đồ trực quan**: Phân tích chi tiêu theo danh mục và xu hướng

### 🤖 AI Assistant
- 🧠 **Phân loại thông minh**: AI tự động gợi ý danh mục cho giao dịch
- 🔮 **Dự đoán chi tiêu**: Dự báo chi phí tháng tới dựa trên lịch sử
- 💡 **Gợi ý tiết kiệm**: AI phân tích và đưa ra lời khuyên tiết kiệm
- 📊 **Insights thông minh**: Phát hiện thói quen chi tiêu và đưa ra nhận xét

### 👥 Quản Lý Người Dùng (Admin)
- 👨‍💼 **Admin Dashboard**: Quản lý tất cả người dùng
- 🗑️ **Cascade Delete**: Xóa người dùng cùng toàn bộ dữ liệu liên quan
- 📊 **Thống kê tổng quan**: Xem số liệu toàn hệ thống

### ⚙️ Cài Đặt Cá Nhân Hóa
- 🌍 **Đa ngôn ngữ**: Tiếng Việt / English
- 🌓 **Theme tùy chỉnh**: Light / Dark / System
- 💱 **Đơn vị tiền tệ**: VND, USD, EUR, v.v.
- 🖼️ **Avatar cá nhân**: Upload và quản lý ảnh đại diện
- 🔔 **Tùy chọn thông báo**: Bật/tắt các loại thông báo

## 🛠 Công Nghệ

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) với App Router
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Component Library**: [Radix UI](https://www.radix-ui.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **PDF Generation**: jsPDF + html2canvas

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) với Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **AI Integration**: Google Gemini API
- **File Upload**: Multer
- **Scheduled Jobs**: node-cron

## 📦 Yêu Cầu Hệ Thống

- **Node.js**: v18.0 trở lên
- **npm**: v9.0 trở lên
- **MongoDB**: v7.0 trở lên (hoặc MongoDB Atlas)
- **Git**: Để clone repository

## 🚀 Cài Đặt

### 1. Clone Repository

```bash
git clone <repository-url>
cd expense-management-app
```

### 2. Cài Đặt Frontend

```bash
# Cài đặt dependencies cho frontend
npm install
```

### 3. Cài Đặt Backend

```bash
# Di chuyển vào thư mục backend
cd backend

# Cài đặt dependencies cho backend
npm install
```

### 4. Quay lại thư mục gốc

```bash
cd ..
```

## ⚙️ Cấu Hình

### Backend Configuration

Tạo file `.env` trong thư mục `backend/` với nội dung:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/expense-manager
# Hoặc sử dụng MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/expense-manager

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_this

# Google Gemini AI API Key (Optional - for AI features)
GEMINI_API_KEY=your_gemini_api_key_here
```

#### Lấy API Keys:

**MongoDB Atlas** (Miễn phí):
1. Đăng ký tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster mới (chọn Free Tier)
3. Tạo database user
4. Lấy connection string
5. Xem hướng dẫn chi tiết: [MONGODB_SETUP.md](./MONGODB_SETUP.md)

**Google Gemini API** (Cho tính năng AI):
1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Tạo API key mới
3. Copy và paste vào file `.env`
4. Xem hướng dẫn chi tiết: [GEMINI_API_KEY_GUIDE.md](./GEMINI_API_KEY_GUIDE.md)

### Database Initialization

Sau khi cấu hình MongoDB, khởi tạo database:

```bash
cd backend
npm run init-db-complete
```

Script này sẽ:
- Tạo các indexes cần thiết
- Tối ưu hóa performance
- Thiết lập cấu trúc database

Xem chi tiết schema: [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md)

## 🎮 Sử Dụng

### Chạy Development Mode

Bạn cần mở **2 terminal** để chạy cả frontend và backend:

#### Terminal 1 - Backend Server:

```bash
cd backend
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

#### Terminal 2 - Frontend:

```bash
# Từ thư mục gốc (expense-management-app)
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:3000`

### Truy Cập Ứng Dụng

1. Mở trình duyệt và truy cập: `http://localhost:3000`
2. Đăng ký tài khoản mới hoặc đăng nhập
3. Bắt đầu quản lý tài chính của bạn!

### Tài Khoản Admin Mặc Định

Nếu bạn cần quyền admin, tạo tài khoản và sau đó update trực tiếp trong MongoDB:

```javascript
// Trong MongoDB Compass hoặc Shell
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Build cho Production

#### Frontend:

```bash
npm run build
npm start
```

#### Backend:

```bash
cd backend
npm start
```

## 📁 Cấu Trúc Thư Mục

```
expense-management-app/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (authenticated)/          # Protected pages
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── budgets/
│   │   ├── goals/
│   │   ├── recurring/
│   │   ├── reports/
│   │   ├── ai/
│   │   ├── settings/
│   │   └── users/               # Admin only
│   └── context/                 # React Context providers
│
├── components/                   # React Components
│   ├── ui/                      # Shadcn UI components
│   ├── dashboard/               # Dashboard components
│   ├── transactions/            # Transaction components
│   ├── budgets/                 # Budget components
│   ├── goals/                   # Goal components
│   ├── recurring/               # Recurring transaction components
│   ├── reports/                 # Report components
│   ├── ai/                      # AI components
│   └── layout/                  # Layout components
│
├── backend/                      # Express.js Backend
│   ├── config/                  # Database config
│   ├── middleware/              # Express middleware
│   ├── models/                  # Mongoose models
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   ├── Category.js
│   │   ├── Budget.js
│   │   ├── Goal.js
│   │   ├── RecurringTransaction.js
│   │   ├── Notification.js
│   │   ├── UserSettings.js
│   │   └── Report.js
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── transactions.js
│   │   ├── categories.js
│   │   ├── budgets.js
│   │   ├── goals.js
│   │   ├── recurring.js
│   │   ├── notifications.js
│   │   ├── reports.js
│   │   ├── settings.js
│   │   ├── ai.js
│   │   └── users.js
│   ├── services/                # Business logic
│   │   └── geminiService.js    # AI service
│   ├── jobs/                    # Scheduled jobs
│   │   └── recurringJobs.js
│   ├── scripts/                 # Database scripts
│   │   └── init-db-complete.js
│   ├── uploads/                 # User uploads
│   ├── .env                     # Environment variables
│   ├── server.js               # Entry point
│   └── package.json
│
├── lib/                         # Utilities
│   ├── api.ts                  # API client
│   └── utils.ts                # Helper functions
│
├── hooks/                       # Custom React hooks
│
├── styles/                      # Global styles
│
├── public/                      # Static assets
│
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
│
└── Tài liệu:
    ├── README.md                      # File này
    ├── DATABASE_SCHEMA.md             # Chi tiết database schema
    ├── AI_IMPLEMENTATION_GUIDE.md     # Hướng dẫn implement AI
    ├── GEMINI_API_KEY_GUIDE.md        # Hướng dẫn lấy Gemini API
    └── POSTMAN_API_TESTING.md         # Hướng dẫn test API
```

## 🔐 Bảo Mật

- ✅ Password được hash bằng bcryptjs
- ✅ Authentication sử dụng JWT tokens
- ✅ Protected routes với middleware authentication
- ✅ Input validation với Zod
- ✅ CORS configuration
- ✅ Role-based access control (User/Admin)

## 🐛 Troubleshooting

### Lỗi kết nối MongoDB

```bash
Error: connect ECONNREFUSED ::1:27017
```

**Giải pháp:**
- Kiểm tra MongoDB đã chạy: `mongod --version`
- Kiểm tra MONGODB_URI trong `.env`
- Nếu dùng MongoDB Atlas, kiểm tra whitelist IP

### Lỗi CORS

```bash
Access to XMLHttpRequest blocked by CORS policy
```

**Giải pháp:**
- Kiểm tra backend đang chạy ở port 5000
- Kiểm tra CORS configuration trong `backend/server.js`

### Lỗi "Cannot find module"

```bash
Error: Cannot find module 'xyz'
```

**Giải pháp:**
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install

# Làm tương tự cho backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### AI Features không hoạt động

**Giải pháp:**
- Kiểm tra GEMINI_API_KEY trong `backend/.env`
- Verify API key tại [Google AI Studio](https://makersuite.google.com/app/apikey)
- Xem logs trong terminal backend để debug

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại

### Transactions
- `GET /api/transactions` - Lấy danh sách giao dịch
- `POST /api/transactions` - Tạo giao dịch mới
- `PUT /api/transactions/:id` - Cập nhật giao dịch
- `DELETE /api/transactions/:id` - Xóa giao dịch

### Budgets, Goals, Reports, AI...
Xem chi tiết tất cả API endpoints trong [POSTMAN_API_TESTING.md](./POSTMAN_API_TESTING.md)

## 🤝 Đóng Góp

Mọi đóng góp đều được chào đón! Để contribute:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phát triển cho mục đích học tập và nghiên cứu.

## 📞 Liên Hệ

Nếu có bất kỳ câu hỏi nào, vui lòng tạo issue trên GitHub.

---

**Chúc bạn quản lý tài chính hiệu quả! 💰✨**
