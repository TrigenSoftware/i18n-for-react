import React, {
	ReactElement
} from 'react';
import Translate from './Translate';
import I18nContext from './Context';
import I18nProvider from './Provider';
import withI18n from './withI18n';
import rprintf from './rptintf';
import i18n, {
	IPluralParams,
	IParams,
	__ as translate,
	__mf as translatemf,
	__n as translaten
} from 'i18n-for-browser';

export default i18n;
export * from 'i18n-for-browser';
export {
	I18nContext,
	I18nProvider,
	withI18n,
	rprintf
};

/**
 * Translates a single phrase and adds it to locales if unknown.
 * @param  phraseOrParams - Phrase to translate or params.
 * @param  values - Values to print.
 * @return Returns translated parsed and substituted string.
 */
export function __(phraseOrParams: string|TemplateStringsArray|IParams, ...values): ReactElement;

export function __(...args) {
	return (
		<Translate
			fn={translate}
			args={args}
		/>
	);
}

/**
 * Supports the advanced MessageFormat as provided by excellent messageformat module.
 * You should definetly head over to messageformat.github.io for a guide to MessageFormat.
 * `i18n-for-browser` takes care of `new MessageFormat('en').compile(msg);`
 * with the current msg loaded from it's json files and cache that complied fn in memory.
 * So in short you might use it similar to `__()` plus extra object to accomblish MessageFormat's formating.
 * @param  phraseOrParams - Phrase to translate or params.
 * @param  values - Values to print.
 * @return Translate.
 */
export function __mf(phraseOrParams: string|TemplateStringsArray|IParams, ...values): ReactElement;

export function __mf(...args) {
	return (
		<Translate
			fn={translatemf}
			args={args}
		/>
	);
}

/**
 * Plurals translation of a single phrase.
 * Singular and plural forms will get added to locales if unknown.
 * Returns translated parsed and substituted string based on `count` parameter.
 * @param  params - Translate params.
 * @param  count - Target count.
 * @param  values - Values to print.
 * @return Translate.
 */
export function __n(
	params: IPluralParams,
	count?: string|number,
	...values
): ReactElement;

/**
 * Plurals translation of a single phrase.
 * Singular and plural forms will get added to locales if unknown.
 * Returns translated parsed and substituted string based on `count` parameter.
 * @param  singularOrStrings - Singular form to translate, or array of strings.
 * @param  count - Target count.
 * @param  values - Values to print.
 * @return Translate.
 */
export function __n(
	singularOrStrings: string|TemplateStringsArray,
	count: string|number,
	...values
): ReactElement;

/**
 * Plurals translation of a single phrase.
 * Singular and plural forms will get added to locales if unknown.
 * Returns translated parsed and substituted string based on `count` parameter.
 * @param  singular - Singular form to translate.
 * @param  plural - Plural form to translate.
 * @param  count - Target count.
 * @param  values - Values to print.
 * @return Translate.
 */
export function __n(
	singular: string,
	plural: string,
	count: string|number,
	...values
): ReactElement;

export function __n(...args) {
	return (
		<Translate
			fn={translaten}
			args={args}
		/>
	);
}
