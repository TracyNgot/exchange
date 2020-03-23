const i18n = {
  language: 'en',
  changeLanguage: jest.fn(),
};

export const useTranslation = () => ({
  i18n,
  t: (key: string, options?: any) =>
    `${key}${options ? Object.values(options).join(' ') : ''}`,
});

