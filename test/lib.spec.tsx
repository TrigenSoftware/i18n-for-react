import React, {
	Component
} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {
	mount
} from 'enzyme';
import i18n, {
	IConfig,
	I18nProvider,
	withI18n,
	__
} from '../src';

Enzyme.configure({
	adapter: new Adapter()
});

const CONFIG: IConfig = {
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

	it('should translate phrase from global context', () => {

		const wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__`hi`}
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello');
	});

	it('should translate phrase from child context', () => {

		const wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__`hi`}
				{' '}
				<I18nProvider
					{...CONFIG}
					defaultLocale='ru'
				>
					{__`hi`}
				</I18nProvider>
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello Привет');
	});

	it('should wrap parts', () => {

		let wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__('<>hi</>', [<b key='b'/>])}
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('<b>hi</b>');

		wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__('bold', [<b key='b'/>])}
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('<b>Hello</b>');

		wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__`bold`}
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello');
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
						{...CONFIG}
					>
						{__`hi`}
						{' '}
						<I18nProvider
							{...subconfig}
						>
							{__`hi`}
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

	it('should provide locale with decorator', () => {

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

		@withI18n(CONFIG)
		class Container extends Component {

			state = {
				locale: 'en'
			};

			render() {
				return (
					<I18nProvider
						locale={this.state.locale}
					>
						{__`hi`}
						{' '}
						<I18nProvider
							{...subconfig}
						>
							{__`hi`}
						</I18nProvider>
					</I18nProvider>
				);
			}
		}

		const wrapper = mount(
			<Container/>
		);

		expect(wrapper.html()).toBe('Hello sup');

		wrapper.find('Container').setState({
			locale: 'ru'
		});

		expect(wrapper.html()).toBe('Привет чекак');
	});
});
