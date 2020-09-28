import React, {
	Context,
	createContext,
	useContext,
	useMemo,
	useEffect,
	useRef,
	memo
} from 'react';
import rootI18n, {
	I18nConfig
} from 'i18n-for-browser';
import {
	II18nMethods,
	II18nProviderConfig,
	II18nProviderProps,
	I18nContextPayload
} from './types';

/**
 * Create i18n provider with given methods.
 * @param methods - I18n methods.
 * @param config - Default config.
 * @returns Provider.
 */
export function createI18nProvider<
	TMethods extends II18nMethods = II18nMethods
>(
	methods: TMethods,
	config: II18nProviderConfig = {}
) {
	const methodsEntries = Object.entries(methods);
	const I18nContext = createContext<I18nContextPayload<TMethods>>(null);
	const useI18nParentInstance = ({
		context
	}: II18nProviderProps) => {
		const parentContext = useContext(I18nContext);

		return context || parentContext && parentContext.config;
	};
	const I18nProvider = memo((props: II18nProviderProps) => {
		const {
			children
		} = props;
		const i18nParentInstance = useI18nParentInstance(props);
		const instanceProps = i18nParentInstance ? props : { ...config, ...props };
		const i18nInstance = useI18nInstance(instanceProps, i18nParentInstance);
		const payload = useMemo(
			() => createPayload<TMethods>(i18nInstance, methodsEntries),
			[i18nInstance]
		);

		return (
			<I18nContext.Provider value={payload}>
				{children}
			</I18nContext.Provider>
		);
	});

	return {
		I18nProvider,
		I18nContext
	};
}

/**
 * Create i18n hook from given context.
 * @param context - I18n context.
 * @returns Hook function.
 */
export function createI18nHook<T extends II18nMethods>(context: Context<I18nContextPayload<T>>) {
	return () => useContext(context);
}

function useI18nInstance(props: II18nProviderProps, i18nParentInstance: I18nConfig) {
	const {
		locale,
		locales,
		fallbacks,
		unknownPhraseListener
	} = props;
	const i18nInstance = useMemo(
		() => createI18nInstance(props, i18nParentInstance),
		[i18nParentInstance]
	);
	const didMountRef = useRef(false);

	useEffect(() => {
		didMountRef.current = true;
	}, []);
	useEffect(() => () => {
		destroyI18nInstance(i18nInstance);
	}, [i18nInstance]);

	useMemo(() => {
		if (didMountRef.current) {
			i18nInstance.setLocale(locale);
		}
	}, [locale]);
	useMemo(() => {
		if (didMountRef.current) {
			i18nInstance.locales = locales;
		}
	}, [locales]);
	useMemo(() => {
		if (didMountRef.current) {
			i18nInstance.fallbacks = fallbacks;
		}
	}, [fallbacks]);
	useMemo(() => {
		if (didMountRef.current) {
			i18nInstance.unknownPhraseListener = unknownPhraseListener;
		}
	}, [unknownPhraseListener]);

	return i18nInstance;
}

function createI18nInstance(
	{
		locale,
		hardfork,
		context,
		children,
		...config
	}: II18nProviderProps,
	i18nParentInstance: I18nConfig
) {
	const configWithLocale = typeof locale === 'string'
		? {
			...config,
			defaultLocale: locale
		}
		: config;
	const i18n: I18nConfig = i18nParentInstance
		? i18nParentInstance.fork(configWithLocale, hardfork as any)
		: rootI18n.configure(configWithLocale);

	return i18n;
}

function destroyI18nInstance(i18n: I18nConfig) {
	if (i18n && i18n !== rootI18n) {
		i18n.destroy();
	}
}

function createPayload<
	TMethods extends II18nMethods
>(
	config: I18nConfig,
	methodsEntries: [string, () => any][]
) {
	return methodsEntries.reduce(
		(payload, [key, value]) => ({
			...payload,
			[key]: config.bind(value)
		}),
		{
			config
		}
	) as I18nContextPayload<TMethods>;
}
