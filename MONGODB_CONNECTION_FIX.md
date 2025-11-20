# 🔧 Fix Lỗi "Buffering Timed Out" (MongoDB Connection)

## ❌ Lỗi Bạn Đang Gặp

```
Operation `users.findOne()` buffering timed out after 10000ms
```

**Ý nghĩa:** Backend KHÔNG THỂ kết nối tới MongoDB. Khi bạn đăng nhập, server cố gắng tìm user nhưng vì chưa kết nối được DB nên nó chờ 10 giây rồi báo lỗi.

## 🔍 Nguyên Nhân & Cách Fix

Dù bạn đã whitelist IP `0.0.0.0/0`, lỗi này 99% do **Connection String (MONGODB_URI)** trong Render bị sai.

### 1. Kiểm Tra Connection String Trong Render

1. Vào **Render Dashboard** → Service Backend
2. Click **Environment**
3. Xem biến `MONGODB_URI`

**Các lỗi thường gặp:**

#### ❌ Lỗi 1: Quên thay password
- Sai: `mongodb+srv://user:<password>@...`
- Sai: `mongodb+srv://user:password123@...` (nếu password thật khác)
- Đúng: `mongodb+srv://user:MySecurePass@...`

#### ❌ Lỗi 2: Password có ký tự đặc biệt chưa encode
Nếu password của bạn có các ký tự: `@`, `:`, `/`, `?`, `#`
→ Bạn PHẢI mã hóa chúng (URL Encode).
- Ví dụ: `@` → `%40`
- Ví dụ: `:` → `%3A`

**Giải pháp:** Đổi password database thành chuỗi đơn giản chỉ gồm chữ và số để test (VD: `ExpenseApp2025`).

#### ❌ Lỗi 3: Sai cú pháp
- Sai: `mongodb+srv://user:pass@cluster...` (thiếu DB name)
- Đúng: `mongodb+srv://user:pass@cluster.../expense-manager?retryWrites=true&w=majority`

### 2. Cách Lấy Lại Connection String Chuẩn

1. Vào **MongoDB Atlas** → Database
2. Click **Connect** → **Drivers**
3. Copy chuỗi kết nối
4. Paste vào Notepad để sửa:
   - Thay `<password>` bằng password thật
   - Thêm `/expense-manager` vào sau `mongodb.net`

**Ví dụ chuẩn:**
```
mongodb+srv://expense_user:ExpenseApp2025@cluster0.abc123.mongodb.net/expense-manager?retryWrites=true&w=majority
```

### 3. Cập Nhật Render

1. Copy chuỗi chuẩn ở trên
2. Vào Render → Environment → Edit `MONGODB_URI`
3. Paste chuỗi mới → **Save Changes**
4. Render sẽ tự động restart server

### 4. Kiểm Tra Logs (Quan Trọng)

Sau khi server restart, vào tab **Logs** và đợi. Bạn **PHẢI** thấy dòng này:

```
✅ MongoDB connected
```

Nếu thấy dòng này thì mới test đăng nhập!

Nếu thấy lỗi `MongoServerError: bad auth` → Sai username/password.

---

## 💡 Mẹo Nhanh: Đổi Password Database

Để chắc chắn không bị sai password:

1. MongoDB Atlas → **Database Access** (sidebar trái)
2. Click **Edit** ở user hiện tại
3. Click **Edit Password**
4. Đặt password mới ĐƠN GIẢN (VD: `admin123456`)
5. Click **Update User**
6. Cập nhật lại `MONGODB_URI` trên Render với password mới này.

---

**Hãy thử đổi password đơn giản và cập nhật lại Render nhé!**
