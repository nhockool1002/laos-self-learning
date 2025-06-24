import viTranslations from '../locales/vi.json';
import enTranslations from '../locales/en.json';

export type Language = 'vi' | 'en';

export interface Translations {
  [key: string]: any;
}

class I18nService {
  private static instance: I18nService;
  private currentLanguage: Language = 'vi';
  private translations: { [key in Language]: Translations } = {
    vi: viTranslations,
    en: enTranslations,
  };

  private constructor() {
    // Khởi tạo ngôn ngữ từ localStorage
    this.currentLanguage = this.getStoredLanguage();
  }

  public static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  /**
   * Lấy ngôn ngữ hiện tại từ localStorage
   */
  private getStoredLanguage(): Language {
    try {
      const stored = localStorage.getItem('app_language');
      return (stored as Language) || 'vi';
    } catch (error) {
      console.error('Failed to get stored language:', error);
      return 'vi';
    }
  }

  /**
   * Lưu ngôn ngữ vào localStorage
   */
  private saveLanguage(language: Language): void {
    try {
      localStorage.setItem('app_language', language);
    } catch (error) {
      console.error('Failed to save language:', error);
    }
  }

  /**
   * Lấy ngôn ngữ hiện tại
   */
  public getCurrentLanguage(): Language {
    return this.currentLanguage;
  }

  /**
   * Thay đổi ngôn ngữ
   */
  public setLanguage(language: Language): void {
    this.currentLanguage = language;
    this.saveLanguage(language);
  }

  /**
   * Lấy text theo key với nested path
   */
  public t(key: string, fallback?: string): string {
    try {
      const keys = key.split('.');
      let value: any = this.translations[this.currentLanguage];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return fallback || key;
        }
      }

      return typeof value === 'string' ? value : fallback || key;
    } catch (error) {
      console.error(`Failed to get translation for key: ${key}`, error);
      return fallback || key;
    }
  }

  /**
   * Lấy tất cả text cho một section
   */
  public getSection(section: string): any {
    try {
      return this.translations[this.currentLanguage][section] || {};
    } catch (error) {
      console.error(`Failed to get section: ${section}`, error);
      return {};
    }
  }

  /**
   * Lấy tất cả translations cho ngôn ngữ hiện tại
   */
  public getAllTranslations(): Translations {
    return this.translations[this.currentLanguage];
  }

  /**
   * Kiểm tra xem key có tồn tại không
   */
  public hasKey(key: string): boolean {
    try {
      const keys = key.split('.');
      let value: any = this.translations[this.currentLanguage];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return false;
        }
      }

      return typeof value === 'string';
    } catch (error) {
      return false;
    }
  }

  /**
   * Lấy danh sách ngôn ngữ có sẵn
   */
  public getAvailableLanguages(): { code: Language; name: string }[] {
    return [
      { code: 'vi', name: 'Tiếng Việt' },
      { code: 'en', name: 'English' },
    ];
  }

  /**
   * Lấy tên ngôn ngữ theo code
   */
  public getLanguageName(code: Language): string {
    const languages = this.getAvailableLanguages();
    const language = languages.find(lang => lang.code === code);
    return language?.name || code;
  }

  /**
   * Format text với parameters
   */
  public tWithParams(key: string, params: { [key: string]: string | number }, fallback?: string): string {
    let text = this.t(key, fallback);
    
    Object.keys(params).forEach(param => {
      text = text.replace(new RegExp(`{${param}}`, 'g'), String(params[param]));
    });
    
    return text;
  }

  /**
   * Lấy text với pluralization
   */
  public tPlural(key: string, count: number, fallback?: string): string {
    const baseKey = `${key}_${count === 1 ? 'singular' : 'plural'}`;
    return this.t(baseKey, fallback || this.t(key, fallback));
  }
}

// Export singleton instance
export const i18nService = I18nService.getInstance();

// Export helper functions
export const t = (key: string, fallback?: string): string => {
  return i18nService.t(key, fallback);
};

export const tWithParams = (key: string, params: { [key: string]: string | number }, fallback?: string): string => {
  return i18nService.tWithParams(key, params, fallback);
};

export const tPlural = (key: string, count: number, fallback?: string): string => {
  return i18nService.tPlural(key, count, fallback);
};

export const getSection = (section: string): any => {
  return i18nService.getSection(section);
};

export default i18nService; 