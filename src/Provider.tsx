import React, {
	Component
} from 'react';
import rootI18n, {
	IConfig
} from 'i18n-for-browser';
import {
	I18nConfig
} from './types';
import I18nContext from './Context';

export interface II18nProviderConfig extends IConfig {
	locale?: string;
	context?: I18nConfig;
	hardfork?: boolean;
}

export default class I18nProvider extends Component<II18nProviderConfig> {

	static contextType = I18nContext;

	i18n: I18nConfig = rootI18n;

	private contextVersion: symbol = null;

	constructor(props, context) {

		super(props, context);

		this.contextVersion = context && context.version;
		this.i18n = this.createI18n(props, context);
	}

	render() {

		const {
			children
		} = this.props;

		return (
			<I18nContext.Provider value={this.i18n}>
				{children}
			</I18nContext.Provider>
		);
	}

	shouldComponentUpdate(nextProps: II18nProviderConfig, _, context: I18nConfig) {

		const {
			locale,
			locales,
			fallbacks,
			unknownPhraseListener,
			context: contextProp
		} = nextProps;
		const {
			locale: prevLocale,
			locales: prevLocales,
			fallbacks: prevFallbacks,
			unknownPhraseListener: prevUnknownPhraseListener,
			context: prevContextProp
		} = this.props;
		const {
			context: prevContext
		} = this;

		if (prevContextProp !== contextProp
			|| prevContext !== context
		) {

			const i18n = this.createI18n(nextProps, context);

			this.destroy();
			this.i18n = i18n;

			return true;
		}

		let update = false;

		if (prevLocale !== locale) {
			this.i18n.setLocale(locale);
			update = true;
		}

		if (prevLocales !== locales) {
			this.i18n.locales = locales;
			update = true;
		}

		if (prevFallbacks !== fallbacks) {
			this.i18n.fallbacks = fallbacks;
			update = true;
		}

		if (prevUnknownPhraseListener !== unknownPhraseListener) {
			this.i18n.unknownPhraseListener = unknownPhraseListener;
			update = true;
		}

		const contextVersion = context && context.version;

		if (contextVersion !== this.contextVersion) {
			this.contextVersion = contextVersion;
			update = true;
		}

		if (update) {
			this.i18n.version = Symbol('version');
		}

		return update;
	}

	componentWillUnmount() {
		this.destroy();
	}

	private createI18n(
		{
			locale,
			context: contextProp,
			hardfork,
			...config
		}: II18nProviderConfig,
		context: I18nConfig
	) {

		const configWithLocale = typeof locale === 'string'
			? {
				...config,
				defaultLocale: locale
			}
			: config;
		const i18nContext = context || contextProp;
		const i18n: I18nConfig = i18nContext
			? i18nContext.fork(configWithLocale, hardfork as any)
			: rootI18n.configure(configWithLocale);

		i18n.version = Symbol('version');

		return i18n;
	}

	private destroy() {

		const {
			i18n
		} = this;

		if (i18n && i18n !== rootI18n) {
			i18n.destroy();
		}
	}
}
