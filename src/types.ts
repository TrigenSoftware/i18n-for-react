import {
	ReactNode
} from 'react';
import {
	I18nConfigInstance,
	I18nConfig
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

export interface I18nMethods {
	__?: typeof __;
	__mf?: typeof __mf;
	__n?: typeof __n;
	__m?: typeof __m;
	__x?: typeof __x;
	__xmf?: typeof __xmf;
	__xn?: typeof __xn;
}

export interface I18nProviderConfig extends I18nConfig {
	locale?: string;
}

export interface I18nProviderProps extends I18nProviderConfig {
	context?: I18nConfigInstance;
	hardfork?: boolean;
	children: ReactNode;
}

export type I18nContextPayload<TMethods extends I18nMethods = I18nMethods> = TMethods & {
	config: I18nConfigInstance;
};
