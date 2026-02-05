# وثيقة المشروع الشاملة - تطبيق سلامتك
## نظام المتابعة الطبية الشامل

---

## 📋 جدول المحتويات

1. [نظرة عامة](#نظرة-عامة)
2. [التقنيات والأدوات](#التقنيات-والأدوات)
3. [البنية الأساسية](#البنية-الأساسية)
4. [الميزات الرئيسية](#الميزات-الرئيسية)
5. [المكونات بالتفصيل](#المكونات-بالتفصيل)
6. [إعدادات PWA](#إعدادات-pwa)
7. [التصميم والواجهة](#التصميم-والواجهة)
8. [البيانات الوهمية](#البيانات-الوهمية)
9. [التحسينات المحمولة](#التحسينات-المحمولة)
10. [متطلبات التطوير المستقبلي](#متطلبات-التطوير-المستقبلي)

---

## 🎯 نظرة عامة

### معلومات أساسية
- **اسم التطبيق**: سلامتك (Salamtak)
- **النوع**: Progressive Web App (PWA)
- **اللغة**: العربية (RTL - من اليمين لليسار)
- **العملة**: جنيه مصري (EGP)
- **المنصات**: Web, iOS, Android (PWA)
- **التركيز**: Mobile-First Design

### المستخدمون المستهدفون
1. **الأطباء**: إدارة المواعيد، الروشتات، الاستشارات المرئية
2. **المرضى**: حجز المواعيد، متابعة الأدوية، الاستشارات الصحية

### البيانات الافتراضية
- **اسم المريض الافتراضي**: اسامه رضا رافت
- **أسماء الأطباء**: 
  - د. مختار نبيل (أمراض القلب، العظام)
  - د. مؤمن اسماعيل (الجلدية، الأطفال)
  - د. محمد علاء (الطب العام)

---

## 🛠 التقنيات والأدوات

### Frontend Framework
```typescript
React 18+ with TypeScript
```

### UI Components Library
```typescript
shadcn/ui - مكتبة مكونات React قابلة للتخصيص
```

### Styling
```css
Tailwind CSS v4.0
- CSS Variables للألوان والثيمات
- RTL Support كامل
- Mobile-First Approach
```

### المكتبات الأساسية

#### Icons
```bash
lucide-react
```

#### التواريخ
```bash
date-fns
date-fns/locale/ar # للغة العربية
```

#### النماذج والتحقق
```bash
react-hook-form@7.55.0
```

#### الإشعارات
```bash
sonner@2.0.3
```

#### Routing & State Management
```typescript
// استخدام useState وإدارة الحالة المحلية
// النظام الحالي لا يستخدم React Router
// يستخدم نظام state-based navigation
```

---

## 📁 البنية الأساسية

### هيكل الملفات الكامل

```
salamtak/
├── index.html                    # HTML الرئيسي + PWA Setup
├── App.tsx                       # المكون الرئيسي للتطبيق
├── manifest.json                 # PWA Manifest
├── sw.js                         # Service Worker
├── browserconfig.xml             # إعدادات Windows Tiles
├── robots.txt                    # SEO
│
├── components/                   # جميع المكونات
│   ├── Header.tsx               # Header الصفحة الرئيسية
│   ├── SubPageHeader.tsx        # Header الصفحات الفرعية
│   ├── UserTypeSelector.tsx     # اختيار نوع المستخدم
│   ├── MobileOptimizer.tsx      # تحسينات المحمول و PWA
│   │
│   ├── DoctorLogin.tsx          # تسجيل دخول الطبيب
│   ├── DoctorDashboard.tsx      # لوحة تحكم الطبيب
│   ├── DoctorVideoConsultation.tsx  # الاستشارات المرئية للطبيب
│   ├── PrescriptionForm.tsx     # نموذج الروشتة الإلكترونية
│   │
│   ├── PatientLogin.tsx         # تسجيل دخول المريض
│   ├── PatientDashboard.tsx     # لوحة تحكم المريض
│   ├── PatientProfile.tsx       # الملف الشخصي للمريض
│   ├── AppointmentBooking.tsx   # حجز المواعيد
│   ├── MedicationReminder.tsx   # تذكير الأدوية
│   ├── VideoConsultation.tsx    # الاستشارة المرئية للمريض
│   ├── PharmacyDelivery.tsx     # طلب أدوية من الصيدليات
│   ├── RatingSystem.tsx         # نظام التقييمات
│   │
│   ├── figma/
│   │   └── ImageWithFallback.tsx  # مكون الصور (محمي)
│   │
│   └── ui/                      # مكونات shadcn/ui
│       ├── accordion.tsx
│       ├── alert-dialog.tsx
│       ├── alert.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
│
├── styles/
│   └── globals.css              # الأنماط الشاملة + Theme
│
└── icons/                        # PWA Icons (يجب إنشاؤها)
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

---

## ⭐ الميزات الرئيسية

### 🏥 ميزات الأطباء

#### 1. لوحة التحكم (DoctorDashboard)
```typescript
- عرض مواعيد اليوم والقادمة
- إحصائيات سريعة (عدد المواعيد، المرضى الجدد، التقييم، الاستشارات المرئية)
- إجراءات سريعة (6 أزرار):
  * كتابة روشتة طبية
  * استشارة مرئية (مع عداد المحجوزين)
  * ملفات المرضى
  * التقييمات
  * التقارير الطبية
  * الإحصائيات
- تبويبات: مواعيد اليوم، المواعيد القادمة، ملفات المرضى
- معلومات كل موعد: اسم المريض، الوقت، النوع، الحالة، أزرار الاتصال
```

#### 2. الروشتة الإلكترونية (PrescriptionForm)
```typescript
Features:
- معلومات المريض الأساسية
- حقل التشخيص مع autocomplete
- قائمة الأدوية الشائعة (5 أدوية):
  * باراسيتامول 500 مجم
  * إيبوبروفين 400 مجم
  * أموكسيسيلين 500 مجم
  * أسبرين 100 مجم
  * أوميبرازول 20 مجم
- التشخيصات الشائعة (5 تشخيصات):
  * التهاب الحلق
  * نزلة برد
  * ارتفاع ضغط الدم
  * التهاب المعدة
  * صداع نصفي
  
لكل دواء:
- اسم الدواء (مع autocomplete)
- الجرعة
- عدد المرات (قائمة منسدلة)
- مدة العلاج (قائمة منسدلة)
- تعليمات إضافية
- زر إضافة/حذف دواء

Actions:
- حفظ الروشتة
- طباعة الروشتة
```

#### 3. الاستشارة المرئية للطبيب (DoctorVideoConsultation)
```typescript
Features:
- قائمة المرضى المحجوزين للاستشارة المرئية
- معلومات كل مريض:
  * الاسم
  * الوقت المحجوز
  * الأعراض المسجلة
  * الحالة (في الانتظار/جاري/مكتمل)
- زر "بدء الاستشارة" لكل مريض
- واجهة الفيديو:
  * فيديو المريض (شاشة كاملة)
  * فيديو الطبيب (PiP)
  * أدوات التحكم (كاميرا، صوت، مشاركة شاشة، إنهاء)
  * محادثة نصية جانبية
```

### 👨‍⚕️ ميزات المرضى

#### 1. لوحة التحكم (PatientDashboard)
```typescript
- إحصائيات سريعة (4 بطاقات):
  * مواعيد اليوم
  * الأدوية اليومية (مع التقدم)
  * آخر فحص
  * الصحة العامة
  
- إجراءات سريعة (4 أزرار):
  * حجز موعد
  * تذكير الأدوية
  * استشارة مرئية
  * طلب أدوية

- تبويبات:
  * اليوم: مواعيد اليوم مع التفاصيل
  * القادم: المواعيد القادمة
  * الأدوية: جدول الأدوية اليومية مع التقدم
  * الصحة: المؤشرات الصحية (ضغط الدم، السكر، الوزن، الحرارة)
```

#### 2. الملف الشخصي (PatientProfile)
```typescript
تبويبات:
1. المعلومات الشخصية:
   - الاسم الكامل
   - رقم الهاتف
   - البريد الإلكتروني
   - تاريخ الميلاد
   - النوع (ذكر/أنثى)
   - العنوان
   - فصيلة الدم
   - الطول
   - الوزن
   - مؤشر كتلة الجسم (محسوب تلقائياً)
   
2. التاريخ الطبي:
   - الأمراض المزمنة (مع التواريخ والأدوية)
   - الحساسية (قائمة مع badges)
   
3. الطوارئ:
   - اسم جهة الاتصال
   - رقم الهاتف

Features:
- وضع التعديل/العرض
- حفظ/إلغاء التعديلات
```

#### 3. حجز المواعيد (AppointmentBooking)
```typescript
Layout:
- Sidebar (التصفية):
  * اختيار التخصص (8 تخصصات)
  * نوع الموعد (كشف جديد، متابعة، طوارئ)
  * وصف الأعراض
  * تفاصيل الحجز (عند الاختيار)
  
- Main Area (قائمة الأطباء):
  * 6 أطباء بتخصصات مختلفة
  * معلومات كل طبيب:
    - الاسم والصورة
    - التخصص
    - التقييم والخبرة
    - العيادة والعنوان
    - الرسوم
    - نوع الموعد (عيادة/فيديو)
  
عند اختيار طبيب:
- تقويم لاختيار التاريخ
- المواعيد المتاحة (5 مواعيد لكل طبيب)
- زر تأكيد الحجز
```

#### 4. تذكير الأدوية (MedicationReminder)
```typescript
Features:
- الإشعارات الحديثة (قائمة):
  * نوع الإشعار (دواء/موعد)
  * العنوان والرسالة
  * الوقت
  * حالة القراءة
  
- جدول الأدوية:
  * اسم الدواء والجرعة
  * المواعيد اليومية
  * تتبع التناول (checkmarks)
  * تفعيل/تعطيل التذكير
  * حذف الدواء
  
- إضافة دواء جديد:
  * اسم الدواء
  * الجرعة
  * عدد المرات يومياً (1-4)
  * المواعيد (محدد وقت لكل جرعة)
  
- إعدادات الإشعارات:
  * إشعارات الأدوية
  * إشعارات المواعيد
  * الإشعارات الصوتية

System Features:
- تحديث تلقائي كل دقيقة للتحقق من مواعيد الأدوية
- إرسال إشعارات عند حلول موعد الدواء
- حساب الموعد التالي تلقائياً
```

#### 5. الاستشارة المرئية (VideoConsultation)
```typescript
قبل الاستشارة:
- قسم الفوائد (3 بطاقات):
  * استشارة فورية
  * أمان وخصوصية
  * أسعار مناسبة
  
- حقل وصف الأعراض (إجباري)

- قائمة الأطباء المتاحين (5 أطباء):
  * معلومات الطبيب
  * الحالة (متاح الآن/متاح لاحقاً)
  * السعر والمدة
  * الميزات المتضمنة
  
- مربع تأكيد الحجز:
  * مراجعة التفاصيل
  * الأعراض المسجلة
  * زر بدء الاستشارة

أثناء الاستشارة:
- واجهة الفيديو:
  * فيديو الطبيب (شاشة كاملة)
  * فيديو المريض (PiP)
  * معلومات الاستشارة
  * أدوات التحكم (كاميرا، صوت، محادثة، إنهاء)
  
- المحادثة النصية:
  * رسائل المريض والطبيب
  * طوابع زمنية
  * إرسال رسائل
```

#### 6. صيدلية التوصيل (PharmacyDelivery)
```typescript
Layout:
- Sidebar (الصيدليات):
  * 3 صيدليات متاحة
  * معلومات كل صيدلية:
    - الاسم
    - التقييم
    - وقت التوصيل
    - رسوم التوصيل
    - الحد الأدنى للطلب
    
- Main Area:
  * معلومات الصيدلية المختارة
  * حقل البحث في الأدوية
  * شبكة الأدوية (18 دواء موزعة على 3 صيدليات):
    - الاسم والجرعة
    - السعر
    - الحالة (متوفر/غير متوفر)
    - يحتاج وصفة/لا يحتاج
    - زر إضافة للسلة

- سلة التسوق (Dialog):
  * قائمة المنتجات مع الكميات
  * تعديل الكميات (+/-)
  * عنوان التوصيل
  * طريقة الدفع (بطاقة/كاش)
  * ملخص الطلب:
    - إجمالي الأدوية
    - رسوم التوصيل
    - المجموع الكلي
  * زر تأكيد الطلب
```

### 🎨 ميزات مشتركة

#### 1. نظام التقييمات (RatingSystem)
```typescript
Features:
- تقييم الأطباء بالنجوم (1-5)
- كتابة مراجعة نصية
- عرض التقييمات السابقة
- حساب متوسط التقييم
- تصفية حسب عدد النجوم
```

#### 2. Header ديناميكي
```typescript
- Header الرئيسي (للصفحة الرئيسية)
- SubPageHeader (للصفحات الفرعية):
  * عنوان الصفحة
  * معلومات المستخدم
  * زر الرجوع
  * زر تسجيل الخروج
```

---

## 🔧 المكونات بالتفصيل

### App.tsx - المكون الرئيسي
```typescript
State Management:
- currentState: AppState (13 حالة مختلفة)
- userType: "doctor" | "patient" | null

States:
1. home - اختيار نوع المستخدم
2. doctor-login - تسجيل دخول الطبيب
3. patient-login - تسجيل دخول المريض
4. doctor-dashboard - لوحة تحكم الطبيب
5. patient-dashboard - لوحة تحكم المريض
6. prescription - الروشتة الإلكترونية
7. appointment-booking - حجز موعد
8. medication-reminder - تذكير الأدوية
9. pharmacy-delivery - طلب أدوية
10. video-consultation - استشارة مرئية (مريض)
11. doctor-video-consultation - استشارة مرئية (طبيب)
12. rating-system - التقييمات
13. patient-profile - الملف الشخصي

Mobile Optimizations:
- Viewport setup تلقائي
- اكتشاف نوع الجهاز (mobile/tablet/desktop)
- طلب أذونات الإشعارات
- اكتشاف PWA mode
- منع التكبير على double tap
- معالجة تغيير الاتجاه

Mock Data:
- بيانات الطبيب: "د. مختار نبيل - أمراض القلب"
- بيانات المريض: "اسامه رضا - مريض منذ 2023"
```

### MobileOptimizer.tsx
```typescript
Features:
- اكتشاف نوع الجهاز تلقائياً
- اكتشاف iOS/Android
- اكتشاف PWA mode
- إدارة PWA install prompt:
  * Android: مربع حوار مع زر تثبيت
  * iOS: تعليمات التثبيت اليدوي
  
- عرض التعليمات فقط على الأجهزة المحمولة
- إخفاء التعليمات عند التثبيت أو الرفض
```

---

## 📱 إعدادات PWA

### manifest.json
```json
{
  "name": "سلامتك - نظام المتابعة الطبية",
  "short_name": "سلامتك",
  "description": "تطبيق شامل للرعاية الصحية يربط بين الأطباء والمرضى",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#030213",
  "orientation": "portrait-primary",
  "scope": "/",
  "lang": "ar",
  "dir": "rtl",
  "categories": ["medical", "health", "productivity"],
  
  "icons": [
    // 8 أحجام: 72, 96, 128, 144, 152, 192, 384, 512
    // purpose: "maskable any"
  ],
  
  "shortcuts": [
    {
      "name": "حجز موعد",
      "url": "/appointment"
    },
    {
      "name": "تذكير الأدوية",
      "url": "/medications"
    }
  ]
}
```

### Service Worker (sw.js)
```javascript
Features:
- Cache Strategy: Cache First, Network Fallback
- Cache Name: 'salamtak-v1'
- Cached Files:
  * /
  * /index.html
  * /App.tsx
  * /styles/globals.css
  * /manifest.json
  
Events:
- install: فتح الكاش وإضافة الملفات
- fetch: إرجاع من الكاش أو الشبكة
- activate: حذف الكاش القديم
- sync: Background sync
- push: إشعارات Push
- notificationclick: معالجة نقرات الإشعارات

Push Notification Options:
- الأيقونة والشارة
- الاهتزاز
- الإجراءات (فتح التطبيق/إغلاق)
```

### index.html - PWA Setup
```html
Meta Tags:
- viewport: mobile-first, no-zoom
- theme-color: #030213
- apple-mobile-web-app-capable
- apple-mobile-web-app-status-bar-style
- mobile-web-app-capable

Icons:
- Apple Touch Icons: 152x152, 192x192
- Favicons: 32x32, 16x16
- MS Tiles: 144x144

SEO:
- Description, Keywords, Author
- Open Graph tags
- Twitter Card

Fonts:
- Cairo (Google Fonts): 400, 500, 600, 700

PWA Banner Script:
- Install button
- Dismiss button
- beforeinstallprompt handler
- Mobile detection
```

---

## 🎨 التصميم والواجهة

### globals.css - النظام اللوني

```css
Light Theme:
--background: #ffffff
--foreground: oklch(0.145 0 0)
--primary: #030213
--primary-foreground: oklch(1 0 0)
--secondary: oklch(0.95 0.0058 264.53)
--muted: #ececf0
--muted-foreground: #717182
--accent: #e9ebef
--destructive: #d4183d
--border: rgba(0, 0, 0, 0.1)
--input-background: #f3f3f5

Dark Theme:
--background: oklch(0.145 0 0)
--foreground: oklch(0.985 0 0)
--primary: oklch(0.985 0 0)
// ... والمزيد

Charts Colors:
5 ألوان للرسوم البيانية
```

### Typography System
```css
h1: var(--text-2xl)
h2: var(--text-xl)
h3: var(--text-lg)
h4: var(--text-base)
p: var(--text-base)

Font Weights:
--font-weight-medium: 500
--font-weight-normal: 400
```

### Mobile Optimizations in CSS
```css
@media (max-width: 640px):
- font-size: 16px (منع zoom على input)
- min touch targets: 44px x 44px
- tap-highlight: transparent

@media (max-width: 768px):
- min touch targets: 48px x 48px
- button active: scale(0.98), opacity(0.8)
- input font-size: 16px !important
- optimized typography
- optimized spacing

PWA Specific:
- safe-area-inset padding
- overscroll-behavior: contain
- hidden scrollbars في standalone mode
```

### RTL Support
```css
[dir="rtl"]:
- space-x-reverse classes
- margin adjustments
- text alignment

Utility Classes:
- space-x-reverse
- flex-row-reverse عند الحاجة
```

---

## 💾 البيانات الوهمية (Mock Data)

### الأطباء
```typescript
doctors = [
  {
    id: 1,
    name: "د. مختار نبيل",
    specialty: "أمراض القلب",
    rating: 4.8,
    experience: 15,
    clinic: "مستشفى النور",
    address: "شارع النيل، المعادي، القاهرة",
    fee: 200,
    availableSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    type: 'clinic'
  },
  {
    id: 2,
    name: "د. مؤمن اسماعيل",
    specialty: "الجلدية",
    rating: 4.9,
    experience: 12,
    fee: 150,
    type: 'clinic'
  },
  {
    id: 3,
    name: "د. محمد علاء",
    specialty: "الطب العام",
    rating: 4.7,
    experience: 10,
    fee: 100,
    type: 'video'
  },
  // ... 3 أطباء إضافيين بتخصصات: العظام، الأطفال
]
```

### التخصصات الطبية
```typescript
specialties = [
  "أمراض القلب",
  "الجلدية",
  "العظام",
  "الأطفال",
  "المخ والأعصاب",
  "الطب العام",
  "النساء والولادة",
  "الأنف والأذن"
]
```

### الأدوية الشائعة
```typescript
commonMedications = [
  "باراسيتامول 500 مجم",
  "إيبوبروفين 400 مجم",
  "أموكسيسيلين 500 مجم",
  "أسبرين 100 مجم",
  "أوميبرازول 20 مجم"
]
```

### التشخيصات الشائعة
```typescript
commonDiagnoses = [
  "التهاب الحلق",
  "نزلة برد",
  "ارتفاع ضغط الدم",
  "التهاب المعدة",
  "صداع نصفي"
]
```

### الصيدليات
```typescript
pharmacies = [
  {
    id: 1,
    name: "صيدلية الهدي",
    rating: 4.8,
    deliveryTime: "30-45 دقيقة",
    deliveryFee: 15,
    minOrder: 50,
    address: "مدينة العاشر من رمضان، الشرقية",
    phone: "01234567890",
    medications: [18 دواء]
  },
  // صيدليتان إضافيتان
]
```

### المواعيد (للطبيب)
```typescript
todayAppointments = [
  {
    id: 1,
    patientName: "اسامه رضا رافت",
    time: "09:00",
    type: "كشف جديد",
    phone: "01234567890",
    status: "confirmed"
  },
  // موعدان إضافيان
]
```

### جدول الأدوية (للمريض)
```typescript
medicationSchedule = [
  {
    id: 1,
    medicationName: "أسبرين 100 مجم",
    dosage: "قرص واحد",
    times: ["08:00", "20:00"],
    isActive: true,
    nextDose: Date,
    takenToday: ["08:00"]
  },
  // دواء إضافي
]
```

### المؤشرات الصحية
```typescript
healthMetrics = [
  { label: "ضغط الدم", value: "120/80", status: "normal", color: "text-green-600" },
  { label: "مستوى السكر", value: "95 mg/dl", status: "normal", color: "text-green-600" },
  { label: "الوزن", value: "75 كجم", status: "stable", color: "text-blue-600" },
  { label: "درجة الحرارة", value: "37°C", status: "normal", color: "text-green-600" }
]
```

---

## 📲 التحسينات المحمولة

### Viewport Setup
```typescript
- width=device-width
- initial-scale=1.0
- maximum-scale=1.0
- user-scalable=no
- viewport-fit=cover
```

### Device Detection
```typescript
function detectDevice() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) 
                || window.innerWidth <= 768;
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  
  if (isMobile) {
    document.body.classList.add('mobile-device');
  } else if (isTablet) {
    document.body.classList.add('tablet-device');
  }
}
```

### Prevent Double-Tap Zoom
```typescript
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);
```

### Touch Target Sizes
```css
/* Minimum 44px x 44px on mobile */
button, [role="button"] {
  min-height: 44px;
  min-width: 44px;
}
```

### Input Zoom Prevention
```css
/* iOS Safari zoom prevention */
input, textarea, select {
  font-size: 16px !important;
}
```

### PWA Features
```typescript
- Add to Homescreen prompts
- iOS Safari specific instructions
- Android install dialog
- Service Worker registration
- Offline support
- Push notifications
```

---

## 🚀 متطلبات التطوير المستقبلي

### 1. قاعدة البيانات (Supabase)

#### Tables المطلوبة:

```sql
-- Users Table
users:
- id (UUID, Primary Key)
- type (enum: 'doctor', 'patient')
- name (text)
- email (text, unique)
- phone (text)
- password_hash (text)
- created_at (timestamp)

-- Doctors Table
doctors:
- id (UUID, Primary Key, FK to users)
- specialty (text)
- experience (integer)
- clinic_name (text)
- clinic_address (text)
- fee (decimal)
- rating (decimal)
- bio (text)

-- Patients Table
patients:
- id (UUID, Primary Key, FK to users)
- birth_date (date)
- gender (enum: 'male', 'female')
- blood_type (text)
- height (integer)
- weight (decimal)
- address (text)
- emergency_contact_name (text)
- emergency_contact_phone (text)

-- Appointments Table
appointments:
- id (UUID, Primary Key)
- doctor_id (UUID, FK to doctors)
- patient_id (UUID, FK to patients)
- appointment_date (date)
- appointment_time (time)
- type (enum: 'consultation', 'followup', 'emergency', 'video')
- status (enum: 'pending', 'confirmed', 'cancelled', 'completed')
- symptoms (text)
- notes (text)
- created_at (timestamp)

-- Prescriptions Table
prescriptions:
- id (UUID, Primary Key)
- doctor_id (UUID, FK to doctors)
- patient_id (UUID, FK to patients)
- appointment_id (UUID, FK to appointments)
- diagnosis (text)
- notes (text)
- created_at (timestamp)

-- Medications Table
medications:
- id (UUID, Primary Key)
- prescription_id (UUID, FK to prescriptions)
- name (text)
- dosage (text)
- frequency (text)
- duration (text)
- instructions (text)

-- Medication Schedules Table
medication_schedules:
- id (UUID, Primary Key)
- patient_id (UUID, FK to patients)
- medication_name (text)
- dosage (text)
- times (jsonb)
- is_active (boolean)
- created_at (timestamp)

-- Medical History Table
medical_history:
- id (UUID, Primary Key)
- patient_id (UUID, FK to patients)
- condition (text)
- diagnosed_date (date)
- status (enum: 'active', 'resolved', 'chronic')
- medication (text)

-- Allergies Table
allergies:
- id (UUID, Primary Key)
- patient_id (UUID, FK to patients)
- allergy_name (text)

-- Ratings Table
ratings:
- id (UUID, Primary Key)
- doctor_id (UUID, FK to doctors)
- patient_id (UUID, FK to patients)
- rating (integer, 1-5)
- review (text)
- created_at (timestamp)

-- Pharmacies Table
pharmacies:
- id (UUID, Primary Key)
- name (text)
- address (text)
- phone (text)
- rating (decimal)
- delivery_time (text)
- delivery_fee (decimal)
- min_order (decimal)

-- Pharmacy Medications Table
pharmacy_medications:
- id (UUID, Primary Key)
- pharmacy_id (UUID, FK to pharmacies)
- name (text)
- dosage (text)
- price (decimal)
- in_stock (boolean)
- prescription_required (boolean)

-- Orders Table
orders:
- id (UUID, Primary Key)
- patient_id (UUID, FK to patients)
- pharmacy_id (UUID, FK to pharmacies)
- total_amount (decimal)
- delivery_fee (decimal)
- delivery_address (text)
- payment_method (enum: 'card', 'cash')
- status (enum: 'pending', 'confirmed', 'delivered', 'cancelled')
- created_at (timestamp)

-- Order Items Table
order_items:
- id (UUID, Primary Key)
- order_id (UUID, FK to orders)
- medication_id (UUID, FK to pharmacy_medications)
- quantity (integer)
- price (decimal)
```

#### Row Level Security (RLS):
```sql
-- يجب إضافة RLS policies لكل جدول
-- مثال:
CREATE POLICY "Users can view their own data"
  ON users FOR SELECT
  USING (auth.uid() = id);
```

### 2. نظام المصادقة (Authentication)

```typescript
// استخدام Supabase Auth
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Sign Up
async function signUp(email, password, userType) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_type: userType
      }
    }
  })
}

// Sign In
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
}

// Sign Out
async function signOut() {
  const { error } = await supabase.auth.signOut()
}
```

### 3. نظام الدفع الإلكتروني

#### الخيارات المقترحة:

**A. Stripe (عالمي)**
```typescript
import { loadStripe } from '@stripe/stripe-js'

const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY)

// Create Payment Intent
const response = await fetch('/api/create-payment-intent', {
  method: 'POST',
  body: JSON.stringify({
    amount: totalAmount * 100, // in cents
    currency: 'egp'
  })
})

// Confirm Payment
const { error } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: elements.getElement(CardElement),
  }
})
```

**B. PayMob (مصري - موصى به للمشروع)**
```typescript
// Integration with PayMob
const paymobIntegration = {
  apiKey: PAYMOB_API_KEY,
  integrationId: PAYMOB_INTEGRATION_ID,
  
  async createOrder(amount) {
    // Step 1: Authentication
    const authToken = await this.authenticate()
    
    // Step 2: Order Registration
    const order = await this.registerOrder(authToken, amount)
    
    // Step 3: Payment Key
    const paymentKey = await this.getPaymentKey(authToken, order.id, amount)
    
    // Step 4: Redirect to payment page
    window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymentKey}`
  }
}
```

**C. Fawry (مصري - خيار إضافي)**
```typescript
// Fawry API Integration
const fawryPayment = {
  merchantCode: FAWRY_MERCHANT_CODE,
  
  async createPayment(amount, items) {
    const response = await fetch('https://atfawry.fawrystaging.com/ECommerceWeb/Fawry/payments/charge', {
      method: 'POST',
      body: JSON.stringify({
        merchantCode: this.merchantCode,
        merchantRefNumber: generateUniqueRef(),
        amount: amount,
        paymentMethod: 'CARD',
        cardToken: cardToken,
        // ... other parameters
      })
    })
  }
}
```

### 4. Google Calendar Integration

```typescript
// Google Calendar API
import { google } from 'googleapis'

const calendar = google.calendar('v3')

async function addAppointmentToGoogleCalendar(appointment) {
  const auth = await getGoogleAuth() // OAuth2
  
  const event = {
    summary: `موعد طبي مع ${appointment.doctorName}`,
    description: `نوع الموعد: ${appointment.type}\\nالأعراض: ${appointment.symptoms}`,
    start: {
      dateTime: appointment.dateTime,
      timeZone: 'Africa/Cairo',
    },
    end: {
      dateTime: appointment.endDateTime,
      timeZone: 'Africa/Cairo',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  }
  
  const result = await calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  })
  
  return result.data
}
```

### 5. Video Call Integration

#### الخيارات المقترحة:

**A. Agora.io (موصى به)**
```typescript
import AgoraRTC from 'agora-rtc-sdk-ng'

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

async function startVideoCall(channelName, uid) {
  // Join channel
  await client.join(APP_ID, channelName, TOKEN, uid)
  
  // Create local tracks
  const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks()
  
  // Publish local tracks
  await client.publish([audioTrack, videoTrack])
  
  // Subscribe to remote users
  client.on('user-published', async (user, mediaType) => {
    await client.subscribe(user, mediaType)
    if (mediaType === 'video') {
      user.videoTrack.play('remote-video-container')
    }
    if (mediaType === 'audio') {
      user.audioTrack.play()
    }
  })
}
```

**B. WebRTC (تطبيق مباشر - أكثر تعقيداً)**
```typescript
// Peer-to-Peer WebRTC
const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
})

// Get user media
const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
})

// Add tracks to connection
stream.getTracks().forEach(track => {
  peerConnection.addTrack(track, stream)
})

// Create offer
const offer = await peerConnection.createOffer()
await peerConnection.setLocalDescription(offer)

// Send offer to other peer via signaling server
```

### 6. Push Notifications

```typescript
// Firebase Cloud Messaging
import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app)

// Request permission
async function requestNotificationPermission() {
  const permission = await Notification.requestPermission()
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY
    })
    // Send token to server
    await saveTokenToDatabase(token)
  }
}

// Listen for messages
onMessage(messaging, (payload) => {
  console.log('Message received:', payload)
  // Show notification
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png'
  })
})
```

### 7. API Structure

```typescript
// API Routes مقترحة
/api/auth/
  - POST /signup
  - POST /signin
  - POST /signout
  - GET /me

/api/doctors/
  - GET /list
  - GET /:id
  - PUT /:id
  - GET /:id/appointments
  - GET /:id/ratings

/api/patients/
  - GET /:id
  - PUT /:id
  - GET /:id/appointments
  - GET /:id/prescriptions
  - GET /:id/medical-history

/api/appointments/
  - POST /create
  - GET /:id
  - PUT /:id
  - DELETE /:id
  - POST /:id/complete

/api/prescriptions/
  - POST /create
  - GET /:id
  - PUT /:id
  - GET /patient/:patientId

/api/medications/
  - GET /search
  - POST /schedule
  - PUT /schedule/:id
  - DELETE /schedule/:id

/api/pharmacies/
  - GET /list
  - GET /:id
  - GET /:id/medications

/api/orders/
  - POST /create
  - GET /:id
  - PUT /:id/status

/api/payments/
  - POST /create-intent
  - POST /confirm
  - GET /history

/api/video/
  - POST /create-room
  - GET /token
  - POST /end-call

/api/notifications/
  - POST /send
  - GET /list
  - PUT /:id/read
```

---

## 🔐 Security Considerations

### 1. Data Protection
```typescript
- تشفير كلمات المرور (bcrypt)
- HTTPS فقط في Production
- Secure cookies
- CSRF protection
- Input validation
- XSS prevention
```

### 2. HIPAA Compliance (للبيانات الطبية)
```typescript
- تشفير البيانات في الراحة والنقل
- Audit logs لجميع الوصول للبيانات
- User consent management
- Data retention policies
- Backup and recovery
```

### 3. API Security
```typescript
- JWT authentication
- Rate limiting
- API key validation
- Request validation
- Error handling (لا تكشف تفاصيل حساسة)
```

---

## 📊 Performance Optimization

### 1. Code Splitting
```typescript
// Lazy loading للمكونات
const DoctorDashboard = lazy(() => import('./components/DoctorDashboard'))
const PatientDashboard = lazy(() => import('./components/PatientDashboard'))
```

### 2. Image Optimization
```typescript
- استخدام WebP format
- Lazy loading للصور
- Responsive images
- CDN للصور الثابتة
```

### 3. Caching Strategy
```typescript
- Service Worker caching
- API response caching
- Browser caching headers
- Redux/Context caching
```

---

## 🧪 Testing Strategy

### 1. Unit Tests
```typescript
- Jest for components
- React Testing Library
- Mock data testing
```

### 2. Integration Tests
```typescript
- User flows testing
- API integration testing
- Database integration testing
```

### 3. E2E Tests
```typescript
- Playwright or Cypress
- Critical user journeys
- Mobile device testing
```

---

## 📈 Analytics & Monitoring

### Recommended Tools
```typescript
1. Google Analytics 4
   - User behavior tracking
   - Conversion tracking
   - Custom events

2. Sentry
   - Error tracking
   - Performance monitoring
   - User feedback

3. LogRocket
   - Session replay
   - Console logs
   - Network monitoring
```

---

## 🌍 Internationalization (مستقبلي)

```typescript
// i18next setup
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: arabicTranslations },
      en: { translation: englishTranslations }
    },
    lng: 'ar',
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  })
```

---

## 📝 Notes & Best Practices

### 1. RTL Support
```typescript
- استخدام dir="rtl" في جميع الصفحات
- استخدام space-x-reverse للمسافات
- اختبار على Chrome و Safari
- التأكد من Flexbox direction
```

### 2. Mobile-First
```typescript
- التصميم للموبايل أولاً
- Progressive enhancement للشاشات الأكبر
- Touch targets >= 44px
- Font size >= 16px للـ inputs
```

### 3. Accessibility
```typescript
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast (WCAG AA)
```

### 4. Code Organization
```typescript
- Component-based architecture
- Shared components in /components/ui
- Feature-based organization
- Clear naming conventions
```

---

## 🚦 Deployment Checklist

### Pre-Deployment
```
☐ Environment variables configured
☐ Database migrations ready
☐ SSL certificate installed
☐ Domain configured
☐ CDN setup (if needed)
☐ Backup strategy in place
☐ Error tracking configured
☐ Analytics configured
```

### Post-Deployment
```
☐ Health check endpoint working
☐ PWA manifest accessible
☐ Service Worker registered
☐ Icons loading correctly
☐ Mobile responsiveness verified
☐ RTL layout verified
☐ Performance audit (Lighthouse)
☐ Security headers configured
```

---

## 📞 Support & Maintenance

### Monitoring Checklist
```
☐ Server uptime monitoring
☐ Error rate monitoring
☐ API response time
☐ Database performance
☐ User feedback collection
☐ Regular backups
☐ Security updates
```

---

## 🎓 Learning Resources

### للمطورين الجدد على المشروع:

1. **React & TypeScript**
   - [React Documentation](https://react.dev)
   - [TypeScript Handbook](https://www.typescriptlang.org/docs/)

2. **Tailwind CSS**
   - [Tailwind Documentation](https://tailwindcss.com/docs)
   - [Tailwind v4 Features](https://tailwindcss.com/blog)

3. **PWA**
   - [PWA Guide](https://web.dev/progressive-web-apps/)
   - [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

4. **Supabase**
   - [Supabase Documentation](https://supabase.com/docs)
   - [Supabase Auth](https://supabase.com/docs/guides/auth)

5. **Arabic & RTL**
   - [RTL Styling Guide](https://rtlstyling.com/)
   - [Arabic Web Typography](https://betterwebtype.com/articles/2019/04/25/designing-arabic-websites/)

---

## 🎯 Project Goals Summary

### Current Status
✅ Frontend Implementation Complete
✅ PWA Setup Complete
✅ Mobile Optimization Complete
✅ RTL Support Complete
✅ UI/UX Design Complete

### Next Steps
⏳ Supabase Integration
⏳ Authentication System
⏳ Payment Gateway
⏳ Google Calendar Sync
⏳ Video Call Implementation
⏳ Push Notifications

### Future Enhancements
🔮 AI Symptom Checker
🔮 Health Reports & Analytics
🔮 Multi-language Support
🔮 Insurance Integration
🔮 Lab Results Integration
🔮 Prescription OCR

---

## 📜 License & Credits

### Technologies Used
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- date-fns
- Sonner

### Fonts
- Cairo (Google Fonts)

### Color Palette
- Primary: #030213
- Accent: #e9ebef
- Destructive: #d4183d

---

## 🎨 Design Tokens Reference

### Colors
```css
Primary: #030213
Secondary: oklch(0.95 0.0058 264.53)
Muted: #ececf0
Accent: #e9ebef
Destructive: #d4183d
Success: #10b981
Warning: #f59e0b
Info: #3b82f6
```

### Spacing Scale
```css
1: 0.25rem (4px)
2: 0.5rem (8px)
3: 0.75rem (12px)
4: 1rem (16px)
6: 1.5rem (24px)
8: 2rem (32px)
12: 3rem (48px)
16: 4rem (64px)
```

### Border Radius
```css
sm: calc(var(--radius) - 4px)
md: calc(var(--radius) - 2px)
lg: var(--radius) = 0.625rem
xl: calc(var(--radius) + 4px)
```

---

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Complete frontend implementation
- PWA support
- Mobile optimization
- All core features implemented

### v2.0.0 (Planned)
- Supabase integration
- Real authentication
- Payment gateway
- Video calls
- Push notifications

---

## 📧 Contact & Support

للأسئلة والدعم الفني:
- يرجى الرجوع للوثائق أعلاه
- فحص الكود المصدري
- مراجعة التعليقات داخل الملفات

---

**آخر تحديث**: أكتوبر 2025  
**الإصدار**: 1.0.0  
**الحالة**: Production Ready (Frontend Only)

---

## 🎉 Final Notes

هذا التطبيق تم بناؤه باستخدام أحدث التقنيات والممارسات في تطوير تطبيقات الويب التقدمية (PWA). تم التركيز على:

1. ✅ **تجربة المستخدم المحمولة**: كل شيء محسّن للأجهزة المحمولة
2. ✅ **دعم اللغة العربية**: دعم كامل لـ RTL والخطوط العربية
3. ✅ **التصميم البسيط**: واجهة نظيفة وسهلة الاستخدام
4. ✅ **الأداء العالي**: تحميل سريع وتفاعل سلس
5. ✅ **PWA**: يعمل كتطبيق أصلي على جميع الأجهزة

المشروع جاهز للاستخدام كـ Frontend، ويحتاج فقط لربط Backend (Supabase) وإضافة الميزات المتقدمة المذكورة أعلاه.

**حظاً موفقاً في التطوير! 🚀**
