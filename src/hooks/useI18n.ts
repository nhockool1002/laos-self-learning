import { useState, useCallback } from 'react';
import { i18nService, Language, t, tWithParams, tPlural, getSection } from '../services/i18nService';

export interface UseI18nReturn {
  t: (key: string, fallback?: string) => string;
  tWithParams: (key: string, params: { [key: string]: string | number }, fallback?: string) => string;
  tPlural: (key: string, count: number, fallback?: string) => string;
  getSection: (section: string) => any;
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  availableLanguages: { code: Language; name: string }[];
  getLanguageName: (code: Language) => string;
}

export const useI18n = (): UseI18nReturn => {
  const [currentLanguage, setCurrentLanguageState] = useState<Language>(
    i18nService.getCurrentLanguage()
  );

  // Thay đổi ngôn ngữ
  const setLanguage = useCallback((language: Language) => {
    i18nService.setLanguage(language);
    setCurrentLanguageState(language);
  }, []);

  // Lấy danh sách ngôn ngữ có sẵn
  const availableLanguages = i18nService.getAvailableLanguages();

  // Lấy tên ngôn ngữ
  const getLanguageName = useCallback((code: Language): string => {
    return i18nService.getLanguageName(code);
  }, []);

  return {
    t,
    tWithParams,
    tPlural,
    getSection,
    currentLanguage,
    setLanguage,
    availableLanguages,
    getLanguageName,
  };
};

// Hook đơn giản chỉ để lấy text
export const useTranslation = () => {
  const { t, currentLanguage } = useI18n();
  
  return {
    t,
    currentLanguage,
  };
};

// Hook để lấy text cho một section cụ thể
export const useSection = (section: string) => {
  const { getSection, currentLanguage } = useI18n();
  
  const sectionData = getSection(section);
  
  return {
    data: sectionData,
    currentLanguage,
  };
}; 