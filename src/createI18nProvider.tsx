import React, {
	createContext,
	useContext,
	useMemo,
	useEffect,
	useRef,
	memo
} from 'react';
import rootI18n, {
	I18nConfigInstance
} from 'i18n-for-browser';
import {
	I18nMethods,
	I18nProviderConfig,
	I18nProviderProps,
	I18nContextPayload
} from './types';

/**
 * Create i18n provider with given methods.
 * @param methods - I18n methods.
 * @param config - Default config.
 * @returns Provider, context, and hook.
 */
export function createI18nProvider<
	TMethods extends I18nMethods = I18nMethods
>(
	methods: TMethods,
	config: I18nProviderConfig = {}
) {
	const methodsEntries = Object.entries(methods);
	const I18nContext = createContext<I18nContextPayload<TMethods>>(null);
	const useI18nParentInstance = ({
		context
	}: Partial<I18nProviderProps>) => {
		const parentContext = useContext(I18nContext);

		return context || parentContext && parentContext.config;
	};
	const useI18nContextPayload = (props: Partial<I18nProviderProps>) => {
		const i18nParentInstance = useI18nParentInstance(props);
		const instanceProps = i18nParentInstance ? props : { ...config, ...props };
		const i18nInstance = useI18nInstance(instanceProps, i18nParentInstance);
		const payload = useMemo(
			() => createPayload<TMethods>(i18nInstance, methodsEntries),
			[i18nInstance]
		);

		return payload;
	};
	const I18nProvider = memo((props: I18nProviderProps) => {
		const {
			children
		} = props;
		const payload = useI18nContextPayload(props);

		return (
			<I18nContext.Provider value={payload}>
				{children}
			</I18nContext.Provider>
		);
	});
	const useI18n = (config?: I18nProviderConfig) => {
		const withConfigRef = useRef(Boolean(config));

		if (withConfigRef.current) {
			return useI18nContextPayload(config);
		}

		return useContext(I18nContext);
	};

	return {
		/**
		 * Config and methods provider.
		 */
		I18nProvider,
		/**
		 * Context with config and methods.
		 */
		I18nContext,
		/**
		 * Hook to recieve config and methods.
		 */
		useI18n
	};
}

function useI18nInstance(props: Partial<I18nProviderProps>, i18nParentInstance: I18nConfigInstance) {
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
	}: Partial<I18nProviderProps>,
	i18nParentInstance: I18nConfigInstance
) {
	const configWithLocale = typeof locale === 'string'
		? {
			...config,
			defaultLocale: locale
		}
		: config;
	const i18n: I18nConfigInstance = i18nParentInstance
		? i18nParentInstance.fork(configWithLocale, hardfork as any)
		: rootI18n.configure(configWithLocale);

	return i18n;
}

function destroyI18nInstance(i18n: I18nConfigInstance) {
	if (i18n && i18n !== rootI18n) {
		i18n.destroy();
	}
}

function createPayload<
	TMethods extends I18nMethods
>(
	config: I18nConfigInstance,
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
