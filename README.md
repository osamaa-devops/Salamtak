# نظام المتابعة الطبية (Salamtak)

نظام متابعة طبية متكامل يربط المرضى بالأطباء عن طريق الاستشارات الطبية عن بعد.

## 🚀 Running the code locally

### Install dependencies
```bash
npm install
```

### Start development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## 📦 Deploy to Vercel

### الطريقة الأولى: عن طريق Vercel Dashboard (موصى بها)

1. **ارفع الكود على GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **اذهب إلى [vercel.com](https://vercel.com)** وسجل دخول باستخدام GitHub

3. **اضغط "Add New Project"** واختر المشروع الخاص بك

4. **Vercel سيكتشف الإعدادات تلقائياً** من ملف `vercel.json`

5. **أضف Environment Variables** في إعدادات المشروع:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - أي متغيرات بيئة أخرى

6. **اضغط Deploy** ✅

### الطريقة الثانية: عن طريق Vercel CLI

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# النشر
vercel
```

## 📋 Environment Variables

قم بنسخ `.env.example` إلى `.env.local` وأضف القيم الخاصة بك:

```bash
cp .env.example .env.local
```

## 🛠️ Tech Stack

- **Framework**: React + Vite
- **UI**: Radix UI + Tailwind CSS
- **Backend**: Supabase
- **Deployment**: Vercel

## 📝 Original Design

The original project design is available at [Figma](https://www.figma.com/design/KuNlVKimJHd5NmksnTxRbG/%D9%86%D8%B8%D8%A7%D9%85-%D8%A7%D9%84%D9%85%D8%AA%D8%A7%D8%A8%D8%B9%D8%A9-%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%A9--Copy-).