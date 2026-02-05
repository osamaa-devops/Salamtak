# 📚 دليل الترجمة الكاملة للتطبيق

## ✅ ما تم إنجازه حتى الآن

### المكونات المحدثة بالكامل: 10/16
1. ✅ **UserTypeSelector** - الصفحة الرئيسية
2. ✅ **Header** - الهيدر الرئيسي
3. ✅ **SubPageHeader** - هيدر الصفحات الفرعية
4. ✅ **DoctorDashboard** - لوحة الطبيب
5. ✅ **PatientDashboard** - لوحة المريض
6. ✅ **DoctorLogin** - تسجيل دخول الأطباء
7. ✅ **PatientLogin** - تسجيل دخول المرضى
8. ✅ **AppContext** - Context مع 300+ مفتاح ترجمة
9. ✅ **App.tsx** - Container رئيسي
10. ✅ **PrescriptionForm** - نموذج الروشتة الطبية ✨ NEW

---

## 🎯 النمط المستخدم في الترجمة

### 1. Import useApp Hook
```typescript
import { useApp } from "../contexts/AppContext";

export function YourComponent() {
  const { t, dir, language, theme } = useApp();
  // ...
}
```

### 2. تطبيق dir على الـ Container
```typescript
return (
  <div dir={dir} className="dark:bg-gray-900">
    {/* محتوى الصفحة */}
  </div>
);
```

### 3. ترجمة النصوص
```typescript
// العناوين
<h1>{t('page.title')}</h1>

// النصوص المشروطة
{language === 'ar' ? 'نص عربي' : 'English text'}

// الأزرار
<Button>{t('action.save')}</Button>

// Labels
<Label>{t('prescription.diagnosis')}</Label>

// Placeholders
<Input placeholder={language === 'ar' ? 'نص عربي' : 'English text'} />
```

### 4. تطبيق RTL/LTR على الأيقونات
```typescript
<Icon className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
```

### 5. أسماء الافتراضية من الـ Context
```typescript
// بدلاً من:
name: "اسامه رضا رافت"

// استخدم:
name: t('default.patient.name')
```

### 6. Dark Mode Classes
```typescript
// الخلفيات
className="bg-gray-50 dark:bg-gray-900"

// الكاردات
className="bg-white dark:bg-gray-800"

// النصوص
className="text-gray-700 dark:text-gray-300"

// الحدود
className="border-gray-200 dark:border-gray-700"
```

---

## 📋 المكونات المتبقية

### يجب تحديث هذه المكونات بنفس النمط:

#### 1. AppointmentBooking.tsx
**المفاتيح المستخدمة:**
- `appointment.book.title`
- `appointment.select.doctor`
- `appointment.select.specialty`
- `appointment.select.date`
- `appointment.select.time`
- `appointment.reason`
- `appointment.confirm`

**النمط:**
```typescript
const { t, dir, language } = useApp();

<h1>{t('appointment.book.title')}</h1>
<Label>{t('appointment.select.doctor')}</Label>
<Button>{t('appointment.confirm')}</Button>
```

---

#### 2. MedicationReminder.tsx
**المفاتيح المستخدمة:**
- `medication.reminder.title`
- `medication.add.new`
- `medication.name`
- `medication.dose`
- `medication.time`
- `medication.frequency`
- `medication.taken`
- `medication.schedule`

**النمط:**
```typescript
const { t, dir, language } = useApp();

<h1>{t('medication.reminder.title')}</h1>
<Button>{t('medication.add.new')}</Button>
```

---

#### 3. PharmacyDelivery.tsx
**المفاتيح المستخدمة:**
- `pharmacy.title`
- `pharmacy.search`
- `pharmacy.cart`
- `pharmacy.add.to.cart`
- `pharmacy.total`
- `pharmacy.delivery.address`
- `pharmacy.place.order`

**النمط:**
```typescript
const { t, dir, language } = useApp();

<h1>{t('pharmacy.title')}</h1>
<Input placeholder={t('pharmacy.search')} />
<Button>{t('pharmacy.place.order')}</Button>
```

---

#### 4. VideoConsultation.tsx
**المفاتيح المستخدمة:**
- `video.title`
- `video.start`
- `video.join`
- `video.end`
- `video.mute`
- `video.camera.on`
- `video.chat`
- `video.waiting`

**النمط:**
```typescript
const { t, dir, language } = useApp();

<h1>{t('video.title')}</h1>
<Button>{t('video.start')}</Button>
<p>{t('video.waiting')}</p>
```

---

#### 5. DoctorVideoConsultation.tsx
يستخدم نفس المفاتيح من `VideoConsultation` مع إضافة:
- `video.prescription` - لإرسال الروشتة
- `video.duration` - لعرض مدة الاستشارة

---

#### 6. RatingSystem.tsx
**المفاتيح المستخدمة:**
- `rating.title`
- `rating.rate.doctor`
- `rating.your.rating`
- `rating.write.review`
- `rating.submit`
- `rating.all.reviews`
- `rating.helpful`

**النمط:**
```typescript
const { t, dir, language } = useApp();

<h1>{t('rating.title')}</h1>
<Button>{t('rating.submit')}</Button>
```

---

#### 7. PatientProfile.tsx
**المفاتيح المستخدمة:**
- `profile.title`
- `profile.personal.info`
- `profile.medical.history`
- `profile.chronic.diseases`
- `profile.allergies`
- `profile.blood.type`
- `profile.update`
- `profile.settings`

**النمط:**
```typescript
const { t, dir, language } = useApp();

<h1>{t('profile.title')}</h1>
<h3>{t('profile.personal.info')}</h3>
<Button>{t('profile.update')}</Button>
```

---

#### 8. PatientFiles.tsx
**المفاتيح المستخدمة:**
- `files.title`
- `files.search.patient`
- `files.patient.info`
- `files.medical.history`
- `files.prescriptions`
- `files.lab.results`
- `files.add.note`
- `files.upload.document`

**النمط:**
```typescript
const { t, dir, language } = useApp();

<h1>{t('files.title')}</h1>
<Input placeholder={t('files.search.patient')} />
<Button>{t('files.add.note')}</Button>
```

---

## 🔑 مفاتيح ترجمة إضافية متوفرة

### التخصصات الطبية
```typescript
t('specialty.cardiology') // طب القلب / Cardiology
t('specialty.dermatology') // الجلدية / Dermatology
t('specialty.pediatrics') // الأطفال / Pediatrics
t('specialty.orthopedics') // العظام / Orthopedics
t('specialty.neurology') // العصبيات / Neurology
t('specialty.general') // طب عام / General Medicine
```

### الأمراض والحالات
```typescript
t('condition.hypertension') // ارتفاع ضغط الدم / Hypertension
t('condition.diabetes') // سكري / Diabetes
t('condition.asthma') // الربو / Asthma
```

### الوقت والأيام
```typescript
t('time.morning') // صباحاً / Morning
t('time.evening') // مساءً / Evening
t('day.monday') // الإثنين / Monday
t('day.tuesday') // الثلاثاء / Tuesday
```

### العملة
```typescript
t('currency') // جنيه مصري / Egyptian Pound
t('currency.short') // ج.م / EGP
```

---

## ✨ مثال كامل للتحديث

### قبل:
```typescript
export function MyComponent() {
  return (
    <div dir="rtl">
      <h1>عنوان الصفحة</h1>
      <Label>اسم المريض</Label>
      <Input placeholder="ادخل اسم المريض" />
      <Button>
        <Save className="h-4 w-4 ml-2" />
        حفظ
      </Button>
    </div>
  );
}
```

### بعد:
```typescript
import { useApp } from "../contexts/AppContext";

export function MyComponent() {
  const { t, dir, language } = useApp();
  
  return (
    <div dir={dir} className="dark:bg-gray-900">
      <h1>{t('page.title')}</h1>
      <Label>{t('prescription.patient.name')}</Label>
      <Input 
        placeholder={language === 'ar' ? 'ادخل اسم المريض' : 'Enter patient name'} 
      />
      <Button>
        <Save className={`h-4 w-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
        {t('action.save')}
      </Button>
    </div>
  );
}
```

---

## 🎯 خطوات التحديث السريع لأي مكون:

### 1. أضف الـ Hook
```typescript
const { t, dir, language } = useApp();
```

### 2. غير الـ dir
```typescript
// من:
dir="rtl"
// إلى:
dir={dir}
```

### 3. استبدل النصوص الثابتة
- استخدم `t('key')` للنصوص القصيرة
- استخدم `language === 'ar' ? 'عربي' : 'English'` للنصوص الطويلة

### 4. صحح الأيقونات
```typescript
// من:
className="ml-2"
// إلى:
className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'}`}
```

### 5. أضف Dark Mode
```typescript
// أضف dark: classes لكل:
- bg-gray-50 → dark:bg-gray-900
- bg-white → dark:bg-gray-800
- text-gray-700 → dark:text-gray-300
- border-gray-200 → dark:border-gray-700
```

---

## 📊 التقدم الحالي

### مكتمل: 10/16 (62.5%)
### متبقي: 6/16 (37.5%)

**المكونات المتبقية:**
1. ⏳ AppointmentBooking
2. ⏳ MedicationReminder
3. ⏳ PharmacyDelivery
4. ⏳ VideoConsultation
5. ⏳ RatingSystem
6. ⏳ PatientProfile

---

## 🚀 الهدف النهائي

عند اكتمال جميع المكونات:
- ✅ **100%** من التطبيق سيترجم فوراً عند تغيير اللغة
- ✅ **جميع** الأيقونات ستتحرك حسب RTL/LTR
- ✅ **جميع** الصفحات ستدعم الوضع الداكن
- ✅ **جميع** الأسماء والنصوص ستتغير تلقائياً

---

## 💡 نصائح مهمة

1. **استخدم المفاتيح الموجودة:** جميع المفاتيح موجودة في AppContext
2. **لا تنسى dir:** كل مكون يحتاج `dir={dir}`
3. **Dark mode:** أضف `dark:` classes لكل لون
4. **الأيقونات:** دائماً استخدم conditional للـ margin
5. **الأسماء:** استخدم `t('default.*.name')` للأسماء

---

آخر تحديث: 8 ديسمبر 2025  
الحالة: ✅ 10 مكونات مكتملة، 6 متبقية
