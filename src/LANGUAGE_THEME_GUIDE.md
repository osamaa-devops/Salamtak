# دليل اللغة والوضع الداكن - Language & Theme Guide

## نظرة عامة - Overview

تم إضافة نظام شامل لتبديل اللغة (عربي/إنجليزي) والوضع الداكن (فاتح/داكن) للتطبيق. يتم حفظ الإعدادات تلقائياً في localStorage وتطبيقها عند إعادة فتح التطبيق.

A comprehensive language switching system (Arabic/English) and dark mode (light/dark) has been added to the application. Settings are automatically saved in localStorage and applied when reopening the app.

---

## الميزات الأساسية - Key Features

### 1. تبديل اللغة - Language Switching
- دعم اللغتين العربية والإنجليزية
- تبديل تلقائي لاتجاه الكتابة (RTL/LTR)
- حفظ اللغة المختارة في localStorage
- Support for Arabic and English languages
- Automatic text direction switching (RTL/LTR)
- Selected language saved in localStorage

### 2. الوضع الداكن - Dark Mode
- وضع فاتح (Light Mode)
- وضع داكن (Dark Mode)
- حفظ الوضع المختار في localStorage
- دعم كامل لجميع المكونات
- Light Mode
- Dark Mode
- Selected theme saved in localStorage
- Full support for all components

### 3. أزرار التحكم - Control Buttons
في الصفحة الرئيسية (UserTypeSelector):
- زر تبديل اللغة (Globe icon) في الزاوية العلوية
- زر تبديل الوضع (Sun/Moon icon) بجانب زر اللغة
- On the home page (UserTypeSelector):
- Language toggle button (Globe icon) in the top corner
- Theme toggle button (Sun/Moon icon) next to language button

---

## كيفية الاستخدام للمطورين - Developer Usage

### استخدام Hook في المكونات - Using the Hook in Components

```tsx
import { useApp } from '../contexts/AppContext';

export function YourComponent() {
  const { t, dir, language, theme, toggleLanguage, toggleTheme } = useApp();
  
  return (
    <div dir={dir}>
      <h1>{t('app.name')}</h1>
      <p>{t('app.description')}</p>
      <button onClick={toggleLanguage}>
        {language === 'ar' ? 'EN' : 'عربي'}
      </button>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
    </div>
  );
}
```

### إضافة ترجمات جديدة - Adding New Translations

في ملف `/contexts/AppContext.tsx`:

```typescript
const translations: Record<Language, Record<string, string>> = {
  ar: {
    'your.key': 'النص بالعربية',
  },
  en: {
    'your.key': 'Text in English',
  }
};
```

### دعم الوضع الداكن في Tailwind - Dark Mode Support in Tailwind

استخدم `dark:` prefix لإضافة أنماط الوضع الداكن:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <p className="text-gray-600 dark:text-gray-400">النص</p>
</div>
```

---

## مثال كامل - Complete Example

```tsx
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';

export function ExampleComponent() {
  const { t, dir, language, theme } = useApp();
  
  return (
    <div 
      dir={dir} 
      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6"
    >
      <h1 className="text-2xl font-bold mb-4">
        {t('app.name')}
      </h1>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        {t('app.description')}
      </p>
      
      <div className="flex gap-4">
        <Button className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'}`}>
          {t('action.submit')}
        </Button>
      </div>
    </div>
  );
}
```

---

## الملفات المحدثة - Updated Files

1. `/contexts/AppContext.tsx` - Context الرئيسي للغة والثيم
2. `/App.tsx` - إضافة AppProvider
3. `/components/UserTypeSelector.tsx` - أزرار التبديل + ترجمة
4. `/components/Header.tsx` - دعم اللغة والوضع الداكن
5. `/components/SubPageHeader.tsx` - دعم اللغة والوضع الداكن
6. `/styles/globals.css` - إضافة أنماط الوضع الداكن

---

## ملاحظات مهمة - Important Notes

1. **الاتجاه التلقائي - Automatic Direction**: 
   - يتم تطبيق `dir="rtl"` للعربية و `dir="ltr"` للإنجليزية تلقائياً
   - Direction is applied automatically: `dir="rtl"` for Arabic, `dir="ltr"` for English

2. **المسافات - Spacing**: 
   - استخدم `space-x-reverse` للمسافات في RTL
   - استخدم conditional classes: `${dir === 'rtl' ? 'ml-2' : 'mr-2'}`
   - Use `space-x-reverse` for RTL spacing
   - Use conditional classes: `${dir === 'rtl' ? 'ml-2' : 'mr-2'}`

3. **الألوان - Colors**: 
   - استخدم `dark:` prefix لجميع الألوان والخلفيات
   - Use `dark:` prefix for all colors and backgrounds

4. **الحفظ التلقائي - Auto-save**: 
   - يتم حفظ الإعدادات تلقائياً في localStorage
   - Settings are automatically saved in localStorage

---

## الخطوات التالية - Next Steps

لإضافة دعم اللغة لمكونات أخرى:

1. استورد `useApp` hook
2. استخدم `t()` للترجمة
3. استخدم `dir` للاتجاه
4. أضف `dark:` classes للوضع الداكن

To add language support to other components:

1. Import `useApp` hook
2. Use `t()` for translations
3. Use `dir` for direction
4. Add `dark:` classes for dark mode

---

## الدعم - Support

للمزيد من الترجمات أو المساعدة، راجع ملف `/contexts/AppContext.tsx` أو اتصل بفريق التطوير.

For more translations or help, check `/contexts/AppContext.tsx` or contact the development team.
