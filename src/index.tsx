import React, {
	ReactElement
} from 'react';
import Translate from './Translate';
import I18nContext from './Context';
import I18nProvider, {
	II18nProviderConfig
} from './Provider';
import withI18n from './withI18n';
import rprintf from './rptintf';
import i18n, {
	IPluralParams,
	IParams,
	__,
	__mf,
	__n
} from 'i18n-for-browser';

export default i18n;
export * from 'i18n-for-browser';
export {
	I18nContext,
	I18nProvider,
	II18nProviderConfig,
	withI18n,
	rprintf
};

/**
 * Idea of naming:
 * `jsx` is JavaScript XML;
 * `__` function for `jsx` is `__x`.
 */

/**
 * Translates a single phrase and adds it to locales if unknown.
 * @param  phraseOrParams - Phrase to translate or params.
 * @param  values - Values to print.
 * @return Returns translated parsed and substituted string.
 */
export function __x(phraseOrParams: string|TemplateStringsArray|IParams, ...values): ReactElement;

export function __x(...args) {
	return (
		<Translate
			fn={__}
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
export function __xmf(phraseOrParams: string|TemplateStringsArray|IParams, ...values): ReactElement;

export function __xmf(...args) {
	return (
		<Translate
			fn={__mf}
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
export function __xn(
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
export function __xn(
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
export function __xn(
	singular: string,
	plural: string,
	count: string|number,
	...values
): ReactElement;

export function __xn(...args) {
	return (
		<Translate
			fn={__n}
			args={args}
		/>
	);
}
