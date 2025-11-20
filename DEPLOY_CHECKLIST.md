# ✅ Checklist Deploy Web - Hướng Dẫn Nhanh

## 🎯 Tổng Quan

Bạn sẽ deploy app lên internet hoàn toàn MIỄN PHÍ theo trình tự:

1. **MongoDB Atlas** (Database) → Đã có sẵn hoặc tạo mới
2. **Render** (Backend API) → Deploy trước
3. **Vercel** (Frontend) → Deploy sau

---

## Bước 1: Chuẩn Bị MongoDB Atlas

### ✅ Nếu ĐÃ có MongoDB Atlas:
- Lấy connection string (format: `mongodb+srv://user:password@cluster.mongodb.net/expense-manager`)
- Đảm bảo IP whitelist là `0.0.0.0/0`
- Chuyển sang Bước 2

### ❌ Nếu CHƯA có MongoDB Atlas:

1. **Truy cập:** https://www.mongodb.com/cloud/atlas
2. Click **Try Free** → Sign up với Google
3. **Create Deployment:**
   - Template: **M0 (Free)**
   - Provider: **AWS**
   - Region: **Singapore** hoặc gần nhất
   - Cluster Name: `expense-cluster`
   - Click **Create Deployment**

4. **Create Database User:**
   - Username: `expense_user`
   - Password: Tạo password mạnh (VD: `ExpenseApp2025!`)
   - **GHI NHỚ** username và password
   - Click **Create Database User**

5. **Setup Network Access:**
   - Close popup
   - Sidebar → **Network Access**
   - Click **Add IP Address**
   - Click **Allow Access From Anywhere**
   - IP: `0.0.0.0/0` (auto-fill)
   - Click **Confirm**

6. **Get Connection String:**
   - Sidebar → **Database**
   - Click **Connect** button
   - Choose **Drivers**
   - Copy connection string, ví dụ:
     ```
     mongodb+srv://expense_user:<password>@expense-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - **Chỉnh sửa:**
     - Thay `<password>` → password bạn tạo
     - Thêm `/expense-manager` trước dấu `?`
   - **Kết quả:**
     ```
     mongodb+srv://expense_user:ExpenseApp2025!@expense-cluster.xxxxx.mongodb.net/expense-manager?retryWrites=true&w=majority
     ```
   - **LƯU LẠI** connection string này!

---

## Bước 2: Deploy Backend Lên Render

### 2.1. Đăng Ký Render

1. **Truy cập:** https://render.com
2. Click **Get Started for Free**
3. Click **GitHub** → Sign up with GitHub
4. **Authorize Render** to access your GitHub account

### 2.2. Create Web Service

1. Click **Dashboard** để về trang chủ
2. Click **New +** (góc trên bên phải)
3. Chọn **Web Service**

### 2.3. Connect Repository

1. Tìm repository: `quan-li-chi-tieu`
   - Nếu không thấy, click **Configure account** → cho phép Render access
2. Click **Connect** bên cạnh repository

### 2.4. Configure Service

Điền thông tin:

| Field | Giá trị |
|-------|---------|
| **Name** | `expense-backend` |
| **Region** | **Singapore** |
| **Branch** | `master` |
| **Root Directory** | `backend` |
| **Runtime** | **Node** |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### 2.5. Select Plan

- Chọn **Free** (Instance Type: Free)
- Click **Advanced** để expand

### 2.6. Environment Variables

Click **Add Environment Variable** và thêm:

| Key | Value |
|-----|-------|
| `PORT` | `5000` |
| `MONGODB_URI` | Connection string MongoDB từ Bước 1 |
| `JWT_SECRET` | `my_super_secure_jwt_secret_for_production_2025` |
| `GEMINI_API_KEY` | (optional - API key nếu có) |

**Ví dụ MONGODB_URI:**
```
mongodb+srv://expense_user:ExpenseApp2025!@expense-cluster.xxxxx.mongodb.net/expense-manager?retryWrites=true&w=majority
```

### 2.7. Deploy!

1. Kéo xuống dưới cùng
2. Click **Create Web Service**
3. **ĐỢI 5-10 phút** (Render đang build)
4. Theo dõi logs để xem tiến trình

### 2.8. Verify Backend

Khi deploy xong (status **Live** màu xanh):

1. Copy URL backend (ở trên cùng), ví dụ:
   ```
   https://expense-backend.onrender.com
   ```

2. **TEST:** Mở browser, truy cập:
   ```
   https://expense-backend.onrender.com/api/auth/login
   ```
   
   Nếu thấy response JSON (kể cả lỗi) → Backend OK! ✅

3. **LƯU LẠI URL** này!

---

## Bước 3: Deploy Frontend Lên Vercel

### 3.1. Đăng Ký Vercel

1. **Truy cập:** https://vercel.com
2. Click **Sign Up**
3. Click **Continue with GitHub**
4. **Authorize Vercel**

### 3.2. Import Project

1. Click **Add New...** → **Project**
2. Tìm repository: `quan-li-chi-tieu`
3. Click **Import**

### 3.3. Configure Project

| Field | Giá trị |
|-------|---------|
| **Project Name** | `expense-management-app` (hoặc tên bạn thích) |
| **Framework Preset** | **Next.js** (auto-detect) |
| **Root Directory** | `./` (default) |
| **Build Command** | (để trống - auto) |
| **Output Directory** | (để trống - auto) |
| **Install Command** | (để trống - auto) |

### 3.4. Environment Variables

Click **Environment Variables** tab và thêm:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | URL backend từ Bước 2 + `/api` |

**Ví dụ:**
```
https://expense-backend.onrender.com/api
```

⚠️ **LƯU Ý:** Nhớ thêm `/api` ở cuối!

### 3.5. Deploy!

1. Click **Deploy**
2. **ĐỢI 2-3 phút** (Vercel đang build)
3. Xem logs để theo dõi tiến trình

### 3.6. Success! 🎉

Khi deploy xong, bạn sẽ thấy:
- Confetti animation (pháo hoa)
- URL frontend: `https://expense-management-app.vercel.app`

Click **Visit** hoặc copy URL và mở trình duyệt!

---

## Bước 4: Cập Nhật CORS (Quan Trọng!)

Frontend từ Vercel cần được backend cho phép truy cập.

### 4.1. Lấy Vercel URL

Từ Vercel dashboard, copy full URL, ví dụ:
```
https://expense-management-app.vercel.app
```

### 4.2. Update CORS trong code

File `backend/server.js` đã được cập nhật với URL mặc định là:
```javascript
'https://expense-management-app.vercel.app'
```

**Nếu Vercel URL của bạn KHÁC**, cần update:

1. Mở file `backend/server.js`
2. Tìm dòng:
   ```javascript
   'https://expense-management-app.vercel.app',
   ```
3. Thay bằng URL thực tế của bạn
4. Commit và push:
   ```bash
   git add backend/server.js
   git commit -m "Update CORS for Vercel URL"
   git push origin master
   ```
5. Render sẽ tự động re-deploy (đợi 5 phút)

---

## Bước 5: Test Ứng Dụng

### 5.1. Mở Website

Truy cập URL Vercel của bạn:
```
https://your-app-name.vercel.app
```

### 5.2. Checklist Test

- [ ] Trang đăng ký/đăng nhập hiển thị đúng
- [ ] Đăng ký tài khoản mới thành công
- [ ] Đăng nhập thành công
- [ ] Dashboard hiển thị
- [ ] Thêm giao dịch mới
- [ ] Xem báo cáo
- [ ] Upload avatar
- [ ] Đổi ngôn ngữ

### 5.3. Nếu Có Lỗi

**Lỗi kết nối API:**
1. Mở DevTools (F12) → Console
2. Xem lỗi gì
3. Kiểm tra `NEXT_PUBLIC_API_URL` trong Vercel settings
4. Kiểm tra backend đang chạy: `https://backend-url.onrender.com/api/auth/login`

**Lỗi CORS:**
1. Xem lại Bước 4
2. Đảm bảo Vercel URL đúng trong CORS settings
3. Re-deploy backend nếu cần

---

## 📝 Thông Tin Quan Trọng

### URLs Của Bạn

Sau khi deploy xong, ghi lại:

| Service | URL | Ghi chú |
|---------|-----|---------|
| **Website** | `https://_____.vercel.app` | Chia sẻ link này |
| **Backend** | `https://_____.onrender.com` | Dùng cho API |
| **MongoDB** | MongoDB Atlas Dashboard | Xem database |

### Lưu Ý Quan Trọng

⚠️ **Render Free Tier "Sleep":**
- Backend sẽ "ngủ" sau 15 phút không dùng
- Lần đầu truy cập sau khi ngủ mất 30-60 giây
- Đây là bình thường với free tier

✅ **Auto Deploy:**
- Mỗi khi push code mới lên GitHub
- Vercel và Render tự động deploy
- Đợi 2-5 phút

💰 **Hoàn Toàn Miễn Phí:**
- Không cần thẻ tín dụng
- Không giới hạn thời gian

---

## 🎉 Hoàn Thành!

Chúc mừng! Bạn đã deploy thành công!

**Chia sẻ link website với bạn bè:**
```
https://your-app-name.vercel.app
```

### Tiếp Theo

- Thêm tên miền riêng (custom domain) - miễn phí
- Tối ưu SEO
- Thêm Google Analytics

**Nếu cần hỗ trợ:**
- Xem file `VERCEL_RENDER_DEPLOYMENT.md` cho chi tiết
- Check logs trong Vercel/Render dashboard
