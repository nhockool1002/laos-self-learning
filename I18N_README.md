# Hệ thống Đa ngôn ngữ (i18n)

## Tổng quan

Hệ thống đa ngôn ngữ sử dụng JSON files để quản lý tất cả text trong ứng dụng, hỗ trợ tiếng Việt và tiếng Anh với khả năng mở rộng dễ dàng.

## Cấu trúc

### File ngôn ngữ
- `src/locales/vi.json` - Tiếng Việt
- `src/locales/en.json` - Tiếng Anh

### Service và Hooks
- `src/services/i18nService.ts` - Service chính
- `src/hooks/useI18n.ts` - React hooks

## Cách sử dụng

### 1. Hook cơ bản
```tsx
import { useTranslation } from '../hooks/useI18n';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.main_title', 'Học Tiếng Lào với Nhựt')}</h1>
      <p>{t('home.description', 'Mô tả mặc định...')}</p>
    </div>
  );
};
```

### 2. Hook đầy đủ
```tsx
import { useI18n } from '../hooks/useI18n';

const LanguageSwitcher = () => {
  const { 
    currentLanguage, 
    setLanguage, 
    availableLanguages,
    getLanguageName 
  } = useI18n();
  
  return (
    <div>
      <select 
        value={currentLanguage} 
        onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}
      >
        {availableLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};
```

### 3. Hook cho section
```tsx
import { useSection } from '../hooks/useI18n';

const HomePage = () => {
  const { data: homeData } = useSection('home');
  
  return (
    <div>
      <h1>{homeData.main_title}</h1>
      <p>{homeData.description}</p>
      <div>
        {Object.keys(homeData.features).map(feature => (
          <div key={feature}>
            <h3>{homeData.features[feature].title}</h3>
            <p>{homeData.features[feature].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 4. Service trực tiếp
```tsx
import { t, tWithParams, tPlural, getSection } from '../services/i18nService';

// Lấy text đơn giản
const title = t('home.main_title', 'Fallback Title');

// Lấy text với parameters
const welcome = tWithParams('auth.welcome_back', { name: 'John' }, 'Welcome back {name}');

// Lấy text với pluralization
const message = tPlural('common.item', 5, 'items');

// Lấy toàn bộ section
const menuData = getSection('menu');
```

## Cấu trúc JSON

### Nested Keys
Sử dụng dấu chấm để truy cập nested objects:
```json
{
  "home": {
    "main_title": "Học Tiếng Lào với Nhựt",
    "features": {
      "alphabet": {
        "title": "Bảng chữ cái",
        "description": "Học cách đọc và viết..."
      }
    }
  }
}
```

Truy cập: `t('home.features.alphabet.title')`

### Parameters
```json
{
  "auth": {
    "welcome_back": "Chào mừng trở lại, {name}!"
  }
}
```

Sử dụng: `tWithParams('auth.welcome_back', { name: 'John' })`

### Pluralization
```json
{
  "common": {
    "item_singular": "1 item",
    "item_plural": "{count} items"
  }
}
```

Sử dụng: `tPlural('common.item', count)`

## Quy ước đặt tên

### Sections chính:
- `sidebar` - Text trong sidebar
- `menu` - Menu items
- `home` - Trang chủ
- `pages` - Text cho các trang
- `common` - Text chung
- `auth` - Authentication
- `game` - Game-related
- `lessons` - Lesson-related

### Keys:
- Sử dụng snake_case cho keys
- Mô tả rõ ràng và ngắn gọn
- Nhóm theo chức năng

## Thêm ngôn ngữ mới

### 1. Tạo file JSON mới
```bash
# Tạo file src/locales/lo.json cho tiếng Lào
```

### 2. Cập nhật i18nService
```typescript
// Thêm vào i18nService.ts
import loTranslations from '../locales/lo.json';

export type Language = 'vi' | 'en' | 'lo';

private translations: { [key in Language]: Translations } = {
  vi: viTranslations,
  en: enTranslations,
  lo: loTranslations,
};
```

### 3. Cập nhật availableLanguages
```typescript
public getAvailableLanguages(): { code: Language; name: string }[] {
  return [
    { code: 'vi', name: 'Tiếng Việt' },
    { code: 'en', name: 'English' },
    { code: 'lo', name: 'ພາສາລາວ' },
  ];
}
```

## Performance

### Ưu điểm:
- **Fast**: Không cần network requests
- **Lightweight**: Chỉ load JSON files
- **Cached**: Ngôn ngữ được lưu trong localStorage
- **Type-safe**: TypeScript support đầy đủ

### Best Practices:
- Sử dụng fallback text cho tất cả keys
- Nhóm text theo chức năng
- Sử dụng nested objects để tổ chức
- Tránh duplicate text

## Migration từ Database

### Từ database sang JSON:
1. Export tất cả text từ database
2. Tổ chức thành JSON structure
3. Thay thế `getText()` bằng `t()`
4. Test với các ngôn ngữ khác nhau

### Từ hardcoded text:
1. Tạo JSON files với text hiện tại
2. Thay thế hardcoded text bằng `t()`
3. Thêm fallback text
4. Test và deploy

## Troubleshooting

### Text không hiển thị:
1. Kiểm tra key có đúng không
2. Kiểm tra JSON structure
3. Kiểm tra fallback text
4. Kiểm tra console errors

### Ngôn ngữ không thay đổi:
1. Kiểm tra localStorage
2. Kiểm tra setLanguage function
3. Kiểm tra component re-render
4. Kiểm tra JSON file có tồn tại không

### Performance issues:
1. Kiểm tra JSON file size
2. Sử dụng lazy loading cho sections
3. Tối ưu JSON structure
4. Sử dụng memoization nếu cần

## Ví dụ hoàn chỉnh

```tsx
import React from 'react';
import { useI18n } from '../hooks/useI18n';

const App = () => {
  const { 
    t, 
    currentLanguage, 
    setLanguage, 
    availableLanguages 
  } = useI18n();

  return (
    <div>
      {/* Language Switcher */}
      <select 
        value={currentLanguage} 
        onChange={(e) => setLanguage(e.target.value as 'vi' | 'en')}
      >
        {availableLanguages.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      {/* Content */}
      <h1>{t('home.main_title', 'Learn Lao with Nhut')}</h1>
      <p>{t('home.description', 'Learn Lao easily and effectively...')}</p>
      
      {/* Menu */}
      <nav>
        <a href="/">{t('menu.home', 'Home')}</a>
        <a href="/alphabet">{t('menu.alphabet', 'Alphabet')}</a>
        <a href="/lessons">{t('menu.lessons', 'Lessons')}</a>
      </nav>

      {/* Buttons */}
      <button>{t('common.save', 'Save')}</button>
      <button>{t('common.cancel', 'Cancel')}</button>
    </div>
  );
};

export default App;
``` 