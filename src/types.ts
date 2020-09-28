import {
	ReactNode
} from 'react';
import {
	I18nConfig,
	IConfig
} from 'i18n-for-browser';
import {
	__,
	__mf,
	__n,
	__m,
	__x,
	__xmf,
	__xn
} from '.';

export interface II18nMethods {
	__?: typeof __;
	__mf?: typeof __mf;
	__n?: typeof __n;
	__m?: typeof __m;
	__x?: typeof __x;
	__xmf?: typeof __xmf;
	__xn?: typeof __xn;
}

export interface II18nProviderConfig extends IConfig {
	locale?: string;
}

export interface II18nProviderProps extends II18nProviderConfig {
	context?: I18nConfig;
	hardfork?: boolean;
	children: ReactNode;
}

export type I18nContextPayload<TMethods extends II18nMethods = II18nMethods> = TMethods & {
	config: I18nConfig;
};
