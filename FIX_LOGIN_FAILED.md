# 🔧 Fix Lỗi "Đăng Nhập Thất Bại" Trên Vercel

## ❌ Vấn Đề

Sau khi deploy lên Vercel, khi đăng ký hoặc đăng nhập báo lỗi:
- "Đăng nhập thất bại"
- "Network Error"
- "Failed to fetch"
- Không có phản hồi gì

## 🎯 Nguyên Nhân

Frontend (Vercel) **không kết nối được** với Backend API.

## 🔍 Bước 1: Kiểm Tra Backend Đã Deploy Chưa

### ❓ Bạn đã deploy backend lên Render chưa?

**CHƯA?** → Bắt buộc phải deploy backend trước!

Xem hướng dẫn chi tiết: `DEPLOY_CHECKLIST.md` → Bước 2

**ĐÃ DEPLOY?** → Tiếp tục bước 2

---

## 🔍 Bước 2: Lấy URL Backend

### Nếu đã deploy backend lên Render:

1. Truy cập: https://dashboard.render.com
2. Click vào service backend của bạn
3. Copy URL ở trên cùng, ví dụ:
   ```
   https://expense-backend-abc123.onrender.com
   ```

4. **Thêm `/api`** vào cuối:
   ```
   https://expense-backend-abc123.onrender.com/api
   ```

5. **TEST URL:** Mở browser, truy cập:
   ```
   https://expense-backend-abc123.onrender.com/api/auth/login
   ```
   
   **Nếu thấy response (kể cả error JSON)** → Backend OK ✅
   
   **Nếu thấy "This site can't be reached"** → Backend chưa chạy ❌

---

## 🔍 Bước 3: Cập Nhật Environment Variable Trong Vercel

### A. Truy cập Vercel Settings

1. Mở: https://vercel.com/dashboard
2. Click vào project `expense-management-app`
3. Click tab **Settings**
4. Sidebar → **Environment Variables**

### B. Kiểm tra hoặc thêm biến

#### Nếu ĐÃ có `NEXT_PUBLIC_API_URL`:

1. Click **Edit** (icon bút chì)
2. Update value thành URL backend thật của bạn:
   ```
   https://your-actual-backend.onrender.com/api
   ```
3. Click **Save**

#### Nếu CHƯA có `NEXT_PUBLIC_API_URL`:

1. Click **Add New**
2. **Name:** `NEXT_PUBLIC_API_URL`
3. **Value:** URL backend + `/api`, ví dụ:
   ```
   https://expense-backend-abc123.onrender.com/api
   ```
4. **Environment:** Tick cả 3 (Production, Preview, Development)
5. Click **Save**

### C. Re-deploy

Sau khi update environment variable:

1. Lên trên cùng, click tab **Deployments**
2. Click **...** (3 dots) bên cạnh deployment mới nhất
3. Click **Redeploy**
4. Confirm → Đợi 2-3 phút

---

## 🔍 Bước 4: Kiểm Tra CORS

Backend phải cho phép frontend từ Vercel truy cập.

### Kiểm tra file backend/server.js

File này đã được update với CORS đúng:

```javascript
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://expense-management-app.vercel.app',
      /\.vercel\.app$/  // Cho phép tất cả Vercel domains
    ];
    // ... rest of code
  }
};
```

### Nếu URL Vercel của bạn KHÁC

Ví dụ: `https://quan-li-chi-tieu.vercel.app`

1. Mở file: `backend/server.js`
2. Tìm dòng:
   ```javascript
   'https://expense-management-app.vercel.app',
   ```
3. Thay bằng URL thật của bạn:
   ```javascript
   'https://quan-li-chi-tieu.vercel.app',
   ```
4. Commit và push:
   ```bash
   git add backend/server.js
   git commit -m "Update CORS for correct Vercel URL"
   git push origin main
   ```
5. Render sẽ tự động re-deploy backend (đợi 5 phút)

---

## 🔍 Bước 5: Debug Với Browser Console

### Mở DevTools

1. Mở website Vercel của bạn
2. Nhấn **F12** (hoặc Right-click → Inspect)
3. Click tab **Console**
4. Thử đăng nhập
5. Xem lỗi gì hiện ra

### Các lỗi phổ biến:

#### Lỗi 1: "Network Error" hoặc "Failed to fetch"

**Nguyên nhân:** Frontend không gọi được API (URL sai hoặc backend chưa chạy)

**Fix:**
- Kiểm tra lại Bước 2 và 3
- Verify backend đang chạy

#### Lỗi 2: "CORS policy"

**Nguyên nhân:** Backend chưa cho phép Vercel domain

**Fix:**
- Xem lại Bước 4
- Update CORS settings

#### Lỗi 3: "404 Not Found"

**Nguyên nhân:** URL API sai

**Fix:**
- Kiểm tra `NEXT_PUBLIC_API_URL` có `/api` ở cuối không
- Verify backend routes

#### Lỗi 4: "500 Internal Server Error"

**Nguyên nhân:** Backend có lỗi (thường là database connection)

**Fix:**
- Mở Render dashboard → Backend logs
- Kiểm tra MongoDB connection string
- Verify database user/password

---

## 🔍 Bước 6: Kiểm Tra API URL Đang Dùng

### Cách 1: Xem trong Console

Trong browser console (F12), gõ:

```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
```

**Nếu thấy `undefined`** → Environment variable chưa set đúng

**Nếu thấy URL** → Verify URL có đúng không

### Cách 2: Xem Network Tab

1. F12 → Tab **Network**
2. Thử đăng nhập
3. Xem request gửi đến URL nào
4. Click vào request → Tab **Headers** → Request URL

---

## ✅ Solution Nhanh (Nếu Backend Chưa Deploy)

### Option A: Chạy Backend Local và Dùng Ngrok (Temporary)

1. **Chạy backend local:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Cài Ngrok:**
   ```bash
   npm install -g ngrok
   ```

3. **Expose backend:**
   ```bash
   ngrok http 5000
   ```

4. **Copy URL ngrok**, ví dụ:
   ```
   https://abc123.ngrok.io
   ```

5. **Update Vercel env:**
   ```
   NEXT_PUBLIC_API_URL=https://abc123.ngrok.io/api
   ```

6. **Redeploy Vercel**

⚠️ **CHÚ Ý:** URL ngrok sẽ thay đổi mỗi lần restart. Đây chỉ là giải pháp tạm thời!

### Option B: Deploy Backend Ngay (Recommended)

Làm theo `DEPLOY_CHECKLIST.md` → Bước 2 để deploy backend lên Render (FREE).

---

## 🎯 Checklist Debug

Đi qua từng mục:

- [ ] Backend đã deploy lên Render
- [ ] Backend đang chạy (status "Live" màu xanh)
- [ ] Test URL backend: `https://backend.onrender.com/api/auth/login` → có response
- [ ] Vercel có environment variable `NEXT_PUBLIC_API_URL`
- [ ] Value của `NEXT_PUBLIC_API_URL` đúng (có `/api` ở cuối)
- [ ] Đã redeploy Vercel sau khi add env var
- [ ] CORS settings trong backend có Vercel URL
- [ ] Browser console không có lỗi CORS
- [ ] Network tab thấy request gửi đến đúng URL

---

## 🐛 Nếu Vẫn Lỗi

### Kiểm tra Backend Logs

1. Render Dashboard → Backend service
2. Tab **Logs**
3. Xem có lỗi gì không

### Kiểm tra MongoDB

1. MongoDB Atlas Dashboard
2. Database Access → Verify user tồn tại
3. Network Access → Verify IP `0.0.0.0/0`
4. Browse Collections → Verify database `expense-manager` có data

### Test API Trực Tiếp

Dùng Postman hoặc curl:

```bash
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "123456"
  }'
```

**Nếu có response** → Backend OK, vấn đề ở frontend/CORS

**Nếu không có response** → Vấn đề ở backend

---

## 💡 Tips

### Render Free Tier "Sleep"

Backend free sẽ "ngủ" sau 15 phút không dùng.

**Triệu chứng:**
- Lần đầu login sau vài giờ rất chậm (30-60 giây)
- Sau đó mọi thứ bình thường

**Không phải lỗi!** Đây là hành vi bình thường của free tier.

### Debug Nhanh

Thêm logging vào code:

```javascript
// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
console.log('🔍 API URL:', API_URL); // Debug
```

Build và deploy lại, mở console để xem URL đang dùng.

---

## 🎉 Khi Nào Thành Công?

Bạn đã fix xong khi:

✅ Đăng ký tài khoản mới → Thành công
✅ Đăng nhập → Redirect vào dashboard
✅ Dashboard hiển thị dữ liệu
✅ Không có lỗi trong console

---

**Good luck! 🚀**

Nếu vẫn gặp vấn đề, gửi cho tôi:
1. Screenshot console errors
2. URL Vercel của bạn
3. URL backend Render của bạn
