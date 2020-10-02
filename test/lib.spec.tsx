import React, {
	Component
} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {
	mount
} from 'enzyme';
import {
	I18nConfig,
	createI18nProvider,
	createI18nHook,
	__,
	__x
} from '../src';

Enzyme.configure({
	adapter: new Adapter()
});

const CONFIG: I18nConfig = {
	locales:       {
		en: {
			hi:   'Hello',
			bold: '<>Hello</>'
		},
		ru: {
			hi: 'Привет'
		}
	},
	defaultLocale: 'en'
};

describe('i18n-for-react', () => {
	const {
		I18nProvider,
		I18nContext
	} = createI18nProvider({
		__,
		__x
	}, CONFIG);
	const useI18n = createI18nHook(I18nContext);

	it('should translate phrase from global context', () => {
		const wrapper = mount(
			<I18nProvider>
				<I18nContext.Consumer>
					{({ __ }) => __`hi`}
				</I18nContext.Consumer>
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello');
	});

	it('should translate phrase from child context', () => {
		const wrapper = mount(
			<I18nProvider>
				<I18nContext.Consumer>
					{({ __ }) => __`hi`}
				</I18nContext.Consumer>
				{' '}
				<I18nProvider
					defaultLocale='ru'
				>
					<I18nContext.Consumer>
						{({ __ }) => __`hi`}
					</I18nContext.Consumer>
				</I18nProvider>
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello Привет');
	});

	it('should wrap parts', () => {
		let wrapper = mount(
			<I18nProvider>
				<I18nContext.Consumer>
					{({ __x }) => __x('<>hi</>', [<b key='b'/>])}
				</I18nContext.Consumer>
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('<b>hi</b>');

		wrapper = mount(
			<I18nProvider>
				<I18nContext.Consumer>
					{({ __x }) => __x('bold', [<b key='b'/>])}
				</I18nContext.Consumer>
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('<b>Hello</b>');

		wrapper = mount(
			<I18nProvider>
				<I18nContext.Consumer>
					{({ __x }) => __x`bold`}
				</I18nContext.Consumer>
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello');
	});

	it('should wrap parts with format', () => {
		const wrapper = mount(
			<I18nProvider>
				<I18nContext.Consumer>
					{({ __x }) => __x('Hi, <>%s</>!', 'username', [<b key='b'/>])}
				</I18nContext.Consumer>
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hi, <b>username</b>!');
	});

	it('should change locale', () => {
		const subconfig = {
			locales: {
				en: {
					'hi': 'sup'
				},
				ru: {
					'hi': 'чекак'
				}
			}
		};

		class Container extends Component {
			state = {
				locale: 'en'
			};

			render() {
				return (
					<I18nProvider
						locale={this.state.locale}
					>
						<I18nContext.Consumer>
							{({ __ }) => __`hi`}
						</I18nContext.Consumer>
						{' '}
						<I18nProvider
							{...subconfig}
						>
							<I18nContext.Consumer>
								{({ __ }) => __`hi`}
							</I18nContext.Consumer>
						</I18nProvider>
					</I18nProvider>
				);
			}
		}

		const wrapper = mount(
			<Container/>
		);

		expect(wrapper.html()).toBe('Hello sup');

		wrapper.setState({
			locale: 'ru'
		});

		expect(wrapper.html()).toBe('Привет чекак');
	});

	it('should translate phrase from hook', () => {
		const Text = () => {
			const {
				__
			} = useI18n();

			return (
				<>
					{__`hi`}
				</>
			);
		};

		const wrapper = mount(
			<I18nProvider>
				<Text />
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello');
	});
});
