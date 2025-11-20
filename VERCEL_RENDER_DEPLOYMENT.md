# 🚀 Hướng Dẫn Deploy Web Lên Internet (Miễn Phí)

Deploy ứng dụng Expense Management lên internet hoàn toàn MIỄN PHÍ sử dụng:
- **Vercel** cho Frontend (Next.js)
- **Render** cho Backend (Express.js)

Repository GitHub: https://github.com/Duong-debug/quan-li-chi-tieu.git

---

## 📋 Tổng Quan

### Kiến Trúc Deploy

```
┌─────────────────────────────────────────────┐
│  USER (Browser)                              │
└─────────────────┬───────────────────────────┘
                  │
    ┌─────────────┴──────────────┐
    │                            │
    ▼                            ▼
┌──────────────┐          ┌──────────────┐
│   Vercel     │          │   Render     │
│  (Frontend)  │─────────▶│  (Backend)   │
│  Next.js     │   API    │  Express.js  │
└──────────────┘          └──────┬───────┘
                                 │
                                 ▼
                          ┌──────────────┐
                          │ MongoDB Atlas│
                          │  (Database)  │
                          └──────────────┘
```

### Chi Phí

✅ **100% MIỄN PHÍ** cho cả 3 dịch vụ:
- **Vercel**: Free tier (100GB bandwidth/tháng)
- **Render**: Free tier (750 giờ/tháng)
- **MongoDB Atlas**: Free tier (512MB storage)

---

## Phần 1: Chuẩn Bị Database (MongoDB Atlas)

### Bước 1: Tạo MongoDB Atlas Cluster

Nếu đã có MongoDB Atlas, skip bước này. Nếu chưa:

1. Truy cập: https://www.mongodb.com/cloud/atlas
2. Click **Try Free** → Sign up
3. Tạo **Free Cluster** (M0)
4. Chọn **Cloud Provider**: AWS
5. Chọn **Region**: Singapore hoặc gần Việt Nam nhất
6. Cluster Name: `expense-cluster`
7. Click **Create**

### Bước 2: Tạo Database User

1. Trong cluster → **Database Access**
2. Click **Add New Database User**
3. **Authentication Method**: Password
4. **Username**: `expense_user` (hoặc tên bạn muốn)
5. **Password**: Tạo password mạnh và **GHI NHỚ** (ví dụ: `ExpenseApp2025!`)
6. **Database User Privileges**: **Read and write to any database**
7. Click **Add User**

### Bước 3: Whitelist IP

1. **Network Access** → **Add IP Address**
2. Click **Allow Access From Anywhere**
3. IP: `0.0.0.0/0` (sẽ tự động điền)
4. Click **Confirm**

> ⚠️ **Lưu ý**: Trong production thực tế, bạn nên whitelist IP cụ thể của Render server.

### Bước 4: Lấy Connection String

1. Quay lại **Database** tab
2. Click **Connect** button
3. Chọn **Connect your application**
4. **Driver**: Node.js
5. **Version**: 4.1 or later
6. Copy connection string, ví dụ:
   ```
   mongodb+srv://expense_user:<password>@expense-cluster.abc123.mongodb.net/?retryWrites=true&w=majority
   ```

7. **Thay thế** và lưu lại:
   ```
   mongodb+srv://expense_user:ExpenseApp2025!@expense-cluster.abc123.mongodb.net/expense-manager?retryWrites=true&w=majority
   ```
   
   Thay đổi:
   - `<password>` → password bạn tạo ở bước 2
   - Thêm `/expense-manager` trước dấu `?` (tên database)

---

## Phần 2: Deploy Backend Lên Render

### Bước 1: Đăng ký Render

1. Truy cập: https://render.com
2. Click **Get Started** hoặc **Sign Up**
3. Chọn **Sign up with GitHub**
4. Authorize Render để truy cập GitHub

### Bước 2: Tạo Web Service

1. Trong dashboard, click **New +** → **Web Service**
2. Click **Configure account** để connect GitHub (nếu chưa)
3. Chọn repository: `quan-li-chi-tieu`
4. Click **Connect**

### Bước 3: Cấu Hình Web Service

Điền thông tin:

| Field | Value |
|-------|-------|
| **Name** | `expense-backend` (hoặc tên bạn muốn) |
| **Region** | Singapore (gần Việt Nam nhất) |
| **Branch** | `master` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### Bước 4: Chọn Plan

- Chọn **Free** plan
- Click **Advanced** để mở rộng options

### Bước 5: Thêm Environment Variables

Click **Add Environment Variable** và thêm:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGODB_URI` | Connection string MongoDB từ Phần 1 |
| `JWT_SECRET` | `your_super_secret_jwt_key_2025_change_this` |
| `GEMINI_API_KEY` | API key của bạn (optional) |

**Ví dụ MONGODB_URI:**
```
mongodb+srv://expense_user:ExpenseApp2025!@expense-cluster.abc123.mongodb.net/expense-manager?retryWrites=true&w=majority
```

**Ví dụ JWT_SECRET:**
```
my_super_secure_jwt_secret_key_for_production_2025
```

### Bước 6: Deploy

1. Kéo xuống dưới cùng
2. Click **Create Web Service**
3. Đợi 5-10 phút để build và deploy
4. Sau khi deploy xong, bạn sẽ thấy:
   - ✅ **Live** status màu xanh
   - URL backend: `https://expense-backend.onrender.com`

### Bước 7: Verify Backend

Click vào URL backend, thêm `/api/health` vào cuối:
```
https://expense-backend.onrender.com/api/health
```

Nếu thấy response tương tự:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

→ Backend đã deploy thành công! ✅

> ⚠️ **Lưu ý**: Free tier của Render sẽ "sleep" sau 15 phút không hoạt động. Lần đầu truy cập sau khi sleep sẽ mất 30-60 giây để server "wake up".

---

## Phần 3: Cấu Hình Frontend Cho Production

Trước khi deploy frontend, cần cập nhật code để trỏ đến backend trên Render.

### Bước 1: Cập nhật API Configuration

Mở file `lib/api.ts` và cập nhật:

```typescript
import axios from 'axios';

// API base URL - sử dụng environment variable nếu có, nếu không dùng production URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://expense-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ... rest of the code
```

### Bước 2: Tạo file `.env.production`

Tạo file mới `.env.production` trong thư mục gốc:

```env
NEXT_PUBLIC_API_URL=https://expense-backend.onrender.com/api
```

> **Lưu ý**: Thay `expense-backend` bằng tên bạn đặt ở Render.

### Bước 3: Commit và Push Changes

```bash
# Kiểm tra thay đổi
git status

# Add files
git add lib/api.ts .env.production

# Commit
git commit -m "Update API URL for production deployment"

# Push lên GitHub
git push origin master
```

---

## Phần 4: Deploy Frontend Lên Vercel

### Bước 1: Đăng ký Vercel

1. Truy cập: https://vercel.com
2. Click **Sign Up**
3. Chọn **Continue with GitHub**
4. Authorize Vercel

### Bước 2: Import Project

1. Trong dashboard, click **Add New...** → **Project**
2. Tìm repository `quan-li-chi-tieu`
3. Click **Import**

### Bước 3: Configure Project

| Field | Value |
|-------|-------|
| **Project Name** | `expense-management-app` |
| **Framework Preset** | `Next.js` (auto-detect) |
| **Root Directory** | `./` (mặc định) |
| **Build Command** | `npm run build` (auto) |
| **Output Directory** | `.next` (auto) |
| **Install Command** | `npm install` (auto) |

### Bước 4: Environment Variables

Click **Environment Variables** và thêm:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://expense-backend.onrender.com/api` |

> Thay `expense-backend` bằng tên backend của bạn trên Render.

### Bước 5: Deploy

1. Click **Deploy**
2. Đợi 2-3 phút để build
3. Sau khi xong, bạn sẽ thấy:
   - 🎉 Confetti animation
   - URL frontend: `https://expense-management-app.vercel.app`

### Bước 6: Verify Frontend

1. Click vào URL hoặc **Visit** button
2. Trang web sẽ mở ra
3. Test đăng ký/đăng nhập
4. Kiểm tra các tính năng

---

## Phần 5: Cấu Hình CORS Cho Backend

Backend cần cho phép frontend từ Vercel truy cập.

### Bước 1: Cập nhật CORS trong backend

Mở file `backend/server.js` và update CORS settings:

```javascript
// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',  // Development
    'https://expense-management-app.vercel.app',  // Production Vercel
    'https://*.vercel.app'  // All Vercel preview deployments
  ],
  credentials: true
}));
```

### Bước 2: Push changes

```bash
git add backend/server.js
git commit -m "Update CORS for Vercel deployment"
git push origin master
```

### Bước 3: Render tự động re-deploy

Render sẽ tự động phát hiện thay đổi trên GitHub và re-deploy backend (đợi 5 phút).

---

## Phần 6: Test Ứng Dụng Production

### Checklist Test

- [ ] Mở `https://expense-management-app.vercel.app`
- [ ] Trang đăng ký hiển thị đúng
- [ ] Đăng ký tài khoản mới thành công
- [ ] Đăng nhập thành công
- [ ] Dashboard hiển thị dữ liệu
- [ ] Thêm giao dịch mới
- [ ] Xem báo cáo
- [ ] Tạo ngân sách
- [ ] Đặt mục tiêu
- [ ] Upload avatar
- [ ] Đổi ngôn ngữ
- [ ] Đổi theme

---

## 📝 URLs Quan Trọng

Sau khi deploy xong, lưu lại các URLs:

| Service | URL | Mục đích |
|---------|-----|----------|
| **Frontend** | `https://expense-management-app.vercel.app` | Người dùng truy cập |
| **Backend** | `https://expense-backend.onrender.com` | API server |
| **Database** | MongoDB Atlas Dashboard | Quản lý database |
| **Vercel Dashboard** | https://vercel.com/dashboard | Quản lý frontend |
| **Render Dashboard** | https://dashboard.render.com | Quản lý backend |

---

## 🔧 Cập Nhật Ứng Dụng Sau Này

### Auto Deploy

Cả Vercel và Render đều tự động deploy khi bạn push code mới lên GitHub:

1. Chỉnh sửa code trên máy local
2. Commit và push:
   ```bash
   git add .
   git commit -m "Mô tả thay đổi"
   git push origin master
   ```
3. Vercel và Render tự động build & deploy
4. Đợi 2-5 phút là cập nhật xong

### Xem Logs

**Vercel:**
- Dashboard → Project → Deployments → Click deployment → Runtime Logs

**Render:**
- Dashboard → Service → Logs tab

---

## 🐛 Troubleshooting

### Frontend không kết nối được Backend

**Triệu chứng:** Lỗi network hoặc CORS

**Giải pháp:**
1. Kiểm tra `NEXT_PUBLIC_API_URL` trong Vercel settings
2. Kiểm tra CORS trong `backend/server.js`
3. Verify backend đang chạy: `https://expense-backend.onrender.com/api/health`

### Backend bị sleep

**Triệu chứng:** Lần đầu truy cập chậm (30-60 giây)

**Giải pháp:**
- Đây là hành vi của Render free tier
- Upgrade lên paid plan ($7/tháng) để tránh sleep
- Hoặc sử dụng service như UptimeRobot để ping server 5 phút/lần

### Database connection error

**Triệu chứng:** Backend logs hiện `MongoError` hoặc `ECONNREFUSED`

**Giải pháp:**
1. Kiểm tra `MONGODB_URI` trong Render environment variables
2. Verify IP whitelist là `0.0.0.0/0` trong MongoDB Atlas
3. Kiểm tra username/password có đúng không

### Build failed trên Vercel

**Triệu chứng:** Deployment failed với lỗi build

**Giải pháp:**
1. Xem detailed logs trong Vercel
2. Kiểm tra code build được trên local: `npm run build`
3. Fix lỗi TypeScript/ESLint nếu có
4. Push code fixed và Vercel sẽ tự deploy lại

---

## 💰 Chi Phí và Giới Hạn

### Vercel Free Tier

- ✅ Bandwidth: 100GB/tháng
- ✅ Build time: 6000 phút/tháng
- ✅ Deployments: Unlimited
- ✅ Custom domain: Free
- ⚠️ Serverless function: 100GB-Hrs compute time

### Render Free Tier

- ✅ 750 giờ/tháng (đủ chạy 24/7)
- ✅ 0.1 CPU, 512MB RAM
- ⚠️ Sleep sau 15 phút không hoạt động
- ⚠️ Không hỗ trợ custom domain

### MongoDB Atlas Free Tier

- ✅ 512MB storage
- ✅ Shared cluster
- ✅ Enough cho 1000+ users nhỏ

---

## 🎯 Nâng Cấp (Optional)

Nếu ứng dụng có nhiều người dùng:

### Vercel Pro - $20/tháng
- Unlimited bandwidth
- Advanced analytics
- Team collaboration

### Render Standard - $7/tháng
- Không sleep
- 0.5 CPU, 512MB RAM
- Custom domain
- Better performance

### MongoDB Atlas M10 - $0.08/giờ (~$57/tháng)
- 10GB storage
- Auto-scaling
- Better performance

---

## ✅ Hoàn thành!

Chúc mừng! 🎉 Bạn đã deploy thành công ứng dụng:

🌐 **Frontend:** https://expense-management-app.vercel.app  
🔧 **Backend:** https://expense-backend.onrender.com  
📊 **Database:** MongoDB Atlas  

Chia sẻ link này với bạn bè để họ sử dụng! 🚀
