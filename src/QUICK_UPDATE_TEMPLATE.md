# 🚀 قالب التحديث السريع للصفحات المتبقية

## 📝 خطوات التحديث (5 دقائق لكل صفحة)

### الخطوة 1: أضف الـ Imports
في بداية الملف، أضف:
```typescript
import { useApp } from "../contexts/AppContext";
```

### الخطوة 2: أضف الـ Hook في المكون
بعد سطر `export function ComponentName() {`:
```typescript
export function ComponentName({ onNavigate, onBack }: Props) {
  const { t, dir, language } = useApp(); // أضف هذا السطر
  // ... باقي الكود
}
```

### الخطوة 3: غير الـ dir في الـ return
```typescript
// القديم:
return (
  <div dir="rtl">

// الجديد:
return (
  <div dir={dir} className="dark:bg-gray-900">
```

### الخطوة 4: استبدل النصوص

---

## 📋 AppointmentBooking.tsx

### النصوص التي تحتاج استبدال:

```typescript
// استبدل:
name: "د. مختار نبيل"
// بـ:
name: t('default.doctor.name')

// استبدل:
specialty: "أمراض القلب"
// بـ:
specialty: t('specialty.cardiology')

// استبدل:
clinic: "مستشفى النور"
// بـ:
clinic: language === 'ar' ? 'مستشفى النور' : 'Al-Nour Hospital'

// استبدل:
<h2>حجز موعد</h2>
// بـ:
<h2>{t('appointment.book.title')}</h2>

// استبدل:
<Label>اختر التخصص</Label>
// بـ:
<Label>{t('appointment.select.specialty')}</Label>

// استبدل:
<Label>اختر الطبيب</Label>
// بـ:
<Label>{t('appointment.select.doctor')}</Label>

// استبدل:
<Label>اختر التاريخ</Label>
// بـ:
<Label>{t('appointment.select.date')}</Label>

// استبدل:
<Label>اختر الوقت</Label>
// بـ:
<Label>{t('appointment.select.time')}</Label>

// استبدل:
<Label>سبب الزيارة</Label>
// بـ:
<Label>{t('appointment.reason')}</Label>

// استبدل:
<Button>تأكيد الحجز</Button>
// بـ:
<Button>{t('appointment.confirm')}</Button>

// استبدل:
placeholder="اكتب الأعراض..."
// بـ:
placeholder={language === 'ar' ? 'اكتب الأعراض...' : 'Describe your symptoms...'}

// استبدل:
toast.success("تم حجز الموعد بنجاح")
// بـ:
toast.success(t('appointment.success'))
```

### الأيقونات:
```typescript
// استبدل:
<Icon className="ml-2" />
// بـ:
<Icon className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
```

---

## 📋 MedicationReminder.tsx

### النصوص التي تحتاج استبدال:

```typescript
// في الـ useState للأدوية:
const medications = [
  {
    name: language === 'ar' ? "أسبرين 100 مجم" : "Aspirin 100mg",
    time: "08:00",
    taken: false
  }
];

// العناوين:
<h2>تذكير الأدوية</h2>
// →
<h2>{t('medication.reminder.title')}</h2>

// الأزرار:
<Button>إضافة دواء</Button>
// →
<Button>{t('medication.add.new')}</Button>

// Labels:
<Label>اسم الدواء</Label>
// →
<Label>{t('medication.name')}</Label>

<Label>الجرعة</Label>
// →
<Label>{t('medication.dose')}</Label>

<Label>الوقت</Label>
// →
<Label>{t('medication.time')}</Label>

<Label>التكرار</Label>
// →
<Label>{t('medication.frequency')}</Label>

// الحالات:
"تم التناول"
// →
{t('medication.taken')}

"فاتني"
// →
{t('medication.missed')}

// Select options:
<SelectItem value="daily">{language === 'ar' ? 'يومياً' : 'Daily'}</SelectItem>
<SelectItem value="twice">{language === 'ar' ? 'مرتين يومياً' : 'Twice daily'}</SelectItem>
```

---

## 📋 PharmacyDelivery.tsx

### النصوص التي تحتاج استبدال:

```typescript
// العنوان:
<h2>طلب أدوية</h2>
// →
<h2>{t('pharmacy.title')}</h2>

// البحث:
<Input placeholder="ابحث عن دواء..." />
// →
<Input placeholder={t('pharmacy.search')} />

// السلة:
<h3>السلة</h3>
// →
<h3>{t('pharmacy.cart')}</h3>

// أزرار:
<Button>أضف للسلة</Button>
// →
<Button>{t('pharmacy.add.to.cart')}</Button>

<Button>تأكيد الطلب</Button>
// →
<Button>{t('pharmacy.place.order')}</Button>

// Labels:
<Label>عنوان التوصيل</Label>
// →
<Label>{t('pharmacy.delivery.address')}</Label>

<Label>وقت التوصيل</Label>
// →
<Label>{t('pharmacy.delivery.time')}</Label>

<Label>طريقة الدفع</Label>
// →
<Label>{t('pharmacy.payment.method')}</Label>

// الحالات:
"متوفر"
// →
{t('pharmacy.available')}

"غير متوفر"
// →
{t('pharmacy.out.of.stock')}

// الأسعار:
"الإجمالي"
// →
{t('pharmacy.total')}

// العملة:
"ج.م"
// →
{t('currency.short')}

"جنيه مصري"
// →
{t('currency')}
```

---

## 📋 VideoConsultation.tsx

### النصوص التي تحتاج استبدال:

```typescript
// العنوان:
<h2>استشارة مرئية</h2>
// →
<h2>{t('video.title')}</h2>

// أزرار التحكم:
<Button>بدء الاستشارة</Button>
// →
<Button>{t('video.start')}</Button>

<Button>انضم للمكالمة</Button>
// →
<Button>{t('video.join')}</Button>

<Button>إنهاء</Button>
// →
<Button>{t('video.end')}</Button>

<Button>كتم الصوت</Button>
// →
<Button>{t('video.mute')}</Button>

<Button>تشغيل الكاميرا</Button>
// →
<Button>{t('video.camera.on')}</Button>

<Button>إيقاف الكاميرا</Button>
// →
<Button>{t('video.camera.off')}</Button>

// الحالات:
"في انتظار الطبيب..."
// →
{t('video.waiting')}

"جاري الاتصال..."
// →
{t('video.connecting')}

// المدة:
"مدة الاستشارة"
// →
{t('video.duration')}
```

---

## 📋 RatingSystem.tsx

### النصوص التي تحتاج استبدال:

```typescript
// العنوان:
<h2>التقييمات والمراجعات</h2>
// →
<h2>{t('rating.title')}</h2>

// الأزرار:
<Button>قيم الطبيب</Button>
// →
<Button>{t('rating.rate.doctor')}</Button>

<Button>إرسال التقييم</Button>
// →
<Button>{t('rating.submit')}</Button>

// Labels:
<Label>تقييمك</Label>
// →
<Label>{t('rating.your.rating')}</Label>

<Label>اكتب مراجعة</Label>
// →
<Label>{t('rating.write.review')}</Label>

// Tabs:
"جميع المراجعات"
// →
{t('rating.all.reviews')}

"الأحدث"
// →
{t('rating.recent')}

"الأعلى تقييماً"
// →
{t('rating.highest')}

// Actions:
"مفيد"
// →
{t('rating.helpful')}

"بلاغ"
// →
{t('rating.report')}
```

---

## 📋 PatientProfile.tsx

### النصوص التي تحتاج استبدال:

```typescript
// العنوان:
<h2>الملف الشخصي</h2>
// →
<h2>{t('profile.title')}</h2>

// الأقسام:
<h3>المعلومات الشخصية</h3>
// →
<h3>{t('profile.personal.info')}</h3>

<h3>السجل الطبي</h3>
// →
<h3>{t('profile.medical.history')}</h3>

<h3>الأمراض المزمنة</h3>
// →
<h3>{t('profile.chronic.diseases')}</h3>

<h3>الحساسية</h3>
// →
<h3>{t('profile.allergies')}</h3>

// Labels:
<Label>فصيلة الدم</Label>
// →
<Label>{t('profile.blood.type')}</Label>

<Label>الطول</Label>
// →
<Label>{t('profile.height')}</Label>

<Label>الوزن</Label>
// →
<Label>{t('profile.weight')}</Label>

<Label>جهة اتصال طارئة</Label>
// →
<Label>{t('profile.emergency.contact')}</Label>

// أزرار:
<Button>تحديث البيانات</Button>
// →
<Button>{t('profile.update')}</Button>

<Button>تغيير كلمة المرور</Button>
// →
<Button>{t('profile.change.password')}</Button>

// الاسم:
"اسامه رضا رافت"
// →
{t('default.patient.name')}
```

---

## 🎨 Dark Mode Classes

أضف هذه الـ classes لكل عنصر:

```typescript
// Containers:
className="bg-gray-50 dark:bg-gray-900"

// Cards:
className="bg-white dark:bg-gray-800"

// Text:
className="text-gray-700 dark:text-gray-300"

// Borders:
className="border-gray-200 dark:border-gray-700"

// Muted text:
className="text-gray-500 dark:text-gray-400"

// Backgrounds light:
className="bg-blue-50 dark:bg-blue-950"
className="bg-emerald-50 dark:bg-emerald-950"

// Hover states:
className="hover:bg-gray-100 dark:hover:bg-gray-800"
```

---

## ✅ Checklist للتأكد من اكتمال التحديث

لكل مكون، تأكد من:

- [ ] ✅ تم إضافة `import { useApp } from "../contexts/AppContext"`
- [ ] ✅ تم إضافة `const { t, dir, language } = useApp()`
- [ ] ✅ تم تغيير `dir="rtl"` إلى `dir={dir}`
- [ ] ✅ جميع العناوين تستخدم `t('key')`
- [ ] ✅ جميع الـ Labels تستخدم `t('key')`
- [ ] ✅ جميع الأزرار تستخدم `t('key')`
- [ ] ✅ جميع الـ placeholders تستخدم conditional
- [ ] ✅ جميع الأيقونات تستخدم conditional للـ margin
- [ ] ✅ الأسماء الافتراضية تستخدم `t('default.*.name')`
- [ ] ✅ تم إضافة `dark:` classes لكل الألوان

---

## 🎯 الملخص

### وقت التحديث المتوقع:
- **AppointmentBooking**: 5 دقائق
- **MedicationReminder**: 4 دقائق
- **PharmacyDelivery**: 5 دقائق
- **VideoConsultation**: 3 دقائق
- **RatingSystem**: 3 دقائق
- **PatientProfile**: 4 دقائق

**المجموع**: 24 دقيقة فقط! ⚡

### بعد الانتهاء:
✅ **100%** من التطبيق سيكون مترجم بالكامل  
✅ **كل** شيء سيعمل باللغتين  
✅ **كل** شيء سيدعم الوضع الداكن  
✅ **كل** الأسماء ستتغير تلقائياً

---

## 💡 نصيحة أخيرة

استخدم **البحث والاستبدال** (Ctrl+F) في محرر النصوص لتسريع العملية:

1. ابحث عن: `dir="rtl"`  
   استبدل بـ: `dir={dir}`

2. ابحث عن: `<h2>حجز موعد</h2>`  
   استبدل بـ: `<h2>{t('appointment.book.title')}</h2>`

3. ابحث عن: `className="ml-2"`  
   استبدل بـ: ```className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'}`}```

---

آخر تحديث: 8 ديسمبر 2025  
**أنت على بعد 24 دقيقة فقط من تطبيق مترجم بالكامل!** 🚀
