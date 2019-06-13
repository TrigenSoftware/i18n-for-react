import i18n from 'i18n-for-browser';

export type I18nConfig = (typeof i18n) & {
	version?: symbol;
};
