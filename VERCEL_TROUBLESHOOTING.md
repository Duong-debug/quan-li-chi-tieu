# 🔧 Fix Lỗi "Thiếu index.html" Khi Deploy Vercel

## ❌ Lỗi Gặp Phải

Khi deploy Next.js lên Vercel, có thể gặp lỗi:
- "No index.html found"
- "Output directory is missing"
- "Build failed: Cannot find output"

## ✅ Nguyên Nhân

Next.js App Router **KHÔNG CẦN** file `index.html` vì Next.js tự động generate HTML. Lỗi này thường do:

1. ❌ Vercel không nhận diện đúng framework
2. ❌ Build command hoặc output directory sai
3. ❌ Root directory không đúng
4. ❌ Missing dependencies

## 🚀 Giải Pháp

### Solution 1: Configure Đúng Trên Vercel (RECOMMENDED)

Khi import project vào Vercel:

#### Bước 1: Import Settings

| Setting | Value | ✅ Correct |
|---------|-------|------------|
| **Framework Preset** | **Next.js** | Auto-detect |
| **Root Directory** | `./` | Để trống hoặc `./` |
| **Build Command** | (leave empty) | Vercel tự động dùng `next build` |
| **Output Directory** | (leave empty) | Vercel tự động dùng `.next` |
| **Install Command** | (leave empty) | Vercel tự động dùng `npm install` |

#### Bước 2: Environment Variables

Chỉ cần thêm:

```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

#### Bước 3: Deploy

Click **Deploy** và đợi!

---

### Solution 2: Thêm File vercel.json (Optional)

Nếu Vercel vẫn không nhận diện đúng, tạo file `vercel.json` ở thư mục gốc:

```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

Sau đó commit và push:
```bash
git add vercel.json
git commit -m "Add Vercel config"
git push origin master
```

---

### Solution 3: Kiểm Tra Build Local

Trước khi deploy, test build trên máy local:

```bash
# Clean install
rm -rf node_modules .next
npm install

# Build
npm run build

# Nếu build thành công → Vercel sẽ OK
# Nếu build fail → Fix lỗi trước khi deploy
```

**Các lỗi thường gặp khi build:**

#### Lỗi TypeScript:
```
Error: Type error: ...
```

**Fix:** Đã có setting trong `next.config.mjs`:
```javascript
typescript: {
  ignoreBuildErrors: true,
}
```

#### Lỗi ESLint:
```
Error: ESLint errors found
```

**Fix:** Tắt ESLint check:
```javascript
// next.config.mjs
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}
```

---

### Solution 4: Re-Import Project

Nếu vẫn lỗi, thử xóa và import lại:

1. Vercel Dashboard → Project Settings → General
2. Scroll xuống dưới cùng → **Delete Project**
3. Confirm xóa
4. Import lại từ GitHub
5. Configure đúng theo Solution 1

---

### Solution 5: Deploy Từ Vercel CLI

Thử deploy bằng CLI thay vì web interface:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, chọn:
# - Link to existing project? No
# - Project name? expense-management-app
# - Directory? ./
# - Override settings? No
```

---

## 🔍 Debug Deployment

### Xem Build Logs

1. Vercel Dashboard → Project → Deployments
2. Click vào deployment failed
3. Xem **Build Logs** tab
4. Scroll để tìm lỗi đầu tiên (thường là ở đầu)

### Common Build Errors

#### 1. "Cannot find module"

**Lỗi:**
```
Error: Cannot find module '@/components/...'
```

**Fix:**
```bash
# Re-install dependencies
npm install

# Push lại
git add package-lock.json
git commit -m "Update dependencies"
git push
```

#### 2. "Module not found: Can't resolve"

**Lỗi:**
```
Module not found: Can't resolve '@/lib/utils'
```

**Fix:** Kiểm tra import paths trong code, đảm bảo file tồn tại.

#### 3. "Build exceeded maximum duration"

**Lỗi:**
```
Error: Build exceeded maximum duration of 45m
```

**Fix:** 
- Kiểm tra dependencies có package nặng không cần thiết
- Tối ưu imports (dùng tree-shaking)

#### 4. "Out of memory"

**Lỗi:**
```
FATAL ERROR: Reached heap limit
```

**Fix:**
```bash
# Thêm vào package.json
"scripts": {
  "build": "NODE_OPTIONS='--max_old_space_size=4096' next build"
}
```

---

## ✅ Checklist Deploy Thành Công

Khi deploy thành công, bạn sẽ thấy:

- [ ] Build logs hiện "Build Completed"
- [ ] Status hiển thị "Ready" (màu xanh)
- [ ] Có URL: `https://your-app.vercel.app`
- [ ] Click vào URL, trang web load được
- [ ] Không có lỗi 404 hoặc 500

---

## 🎯 Cấu Hình Hoàn Chỉnh Cho Vercel

File `package.json` của bạn:

```json
{
  "name": "expense-management-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  }
}
```

File `next.config.mjs` của bạn:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

---

## 📝 Step-by-Step: Deploy Lần Đầu

### 1. Đảm bảo code đã push lên GitHub

```bash
git status
git add .
git commit -m "Ready for Vercel deployment"
git push origin master
```

### 2. Truy cập Vercel

- URL: https://vercel.com
- Login with GitHub

### 3. Import Project

- Click **Add New** → **Project**
- Chọn repository `quan-li-chi-tieu`
- Click **Import**

### 4. Configure

**Framework Preset:** Next.js ✅  
**Root Directory:** `./` ✅  
**Build Command:** (leave empty) ✅  
**Output Directory:** (leave empty) ✅  
**Environment Variables:**
```
NEXT_PUBLIC_API_URL=https://expense-backend.onrender.com/api
```

### 5. Deploy

Click **Deploy** và đợi 2-3 phút

### 6. Verify

- URL sẽ xuất hiện: `https://expense-management-app.vercel.app`
- Click để test
- Kiểm tra login/register

---

## 🐛 Nếu Vẫn Lỗi

### Quick Fixes

```bash
# 1. Clear cache local
rm -rf .next node_modules
npm install
npm run build

# 2. Nếu build OK local, push lại
git add .
git commit -m "Fix build"
git push

# 3. Trigger re-deploy trên Vercel
# Dashboard → Deployments → ... → Redeploy
```

### Contact Support

Nếu vẫn không được, tạo issue với:
- Screenshot build logs
- Error message đầy đủ
- URL repository

---

## ✨ Bonus: Auto Deploy

Sau khi setup xong, mọi lần push code lên GitHub:
```bash
git add .
git commit -m "Update features"
git push
```

→ Vercel tự động build và deploy! 🚀

---

## 📞 Cần Hỗ Trợ?

1. Xem build logs trên Vercel
2. Google error message
3. Check Next.js docs: https://nextjs.org/docs
4. Vercel docs: https://vercel.com/docs

**Chúc bạn deploy thành công! 🎉**
