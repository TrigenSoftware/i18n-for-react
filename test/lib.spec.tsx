import React, {
	Component
} from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {
	mount
} from 'enzyme';
import {
	IConfig,
	I18nProvider,
	withI18n,
	__x
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
				{__x`hi`}
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello');
	});

	it('should translate phrase from child context', () => {

		const wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__x`hi`}
				{' '}
				<I18nProvider
					{...CONFIG}
					defaultLocale='ru'
				>
					{__x`hi`}
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
				{__x('<>hi</>', [<b key='b'/>])}
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('<b>hi</b>');

		wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__x('bold', [<b key='b'/>])}
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('<b>Hello</b>');

		wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__x`bold`}
			</I18nProvider>
		);

		expect(wrapper.html()).toBe('Hello');
	});

	it('should wrap parts with format', () => {

		const wrapper = mount(
			<I18nProvider
				{...CONFIG}
			>
				{__x('Hi, <>%s</>!', 'username', [<b key='b'/>])}
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
						{...CONFIG}
					>
						{__x`hi`}
						{' '}
						<I18nProvider
							{...subconfig}
						>
							{__x`hi`}
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
						{__x`hi`}
						{' '}
						<I18nProvider
							{...subconfig}
						>
							{__x`hi`}
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
