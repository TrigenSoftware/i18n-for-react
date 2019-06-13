# i18n-for-react

[![NPM version][npm]][npm-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]
[![Greenkeeper badge][greenkeeper]][greenkeeper-url]

[npm]: https://img.shields.io/npm/v/i18n-for-react.svg
[npm-url]: https://npmjs.com/package/i18n-for-react

[deps]: https://david-dm.org/TrigenSoftware/i18n-for-react.svg
[deps-url]: https://david-dm.org/TrigenSoftware/i18n-for-react

[build]: http://img.shields.io/travis/com/TrigenSoftware/i18n-for-react.svg
[build-url]: https://travis-ci.com/TrigenSoftware/i18n-for-react

[coverage]: https://img.shields.io/coveralls/TrigenSoftware/i18n-for-react.svg
[coverage-url]: https://coveralls.io/r/TrigenSoftware/i18n-for-react

[greenkeeper]: https://badges.greenkeeper.io/TrigenSoftware/i18n-for-react.svg
[greenkeeper-url]: https://greenkeeper.io/

Modern translation module for React.

## Install

```sh
npm i i18n-for-react
# or
yarn add i18n-for-react
```

## API

Module exposes next API:

```js
export default globalConfig;
export {
    IConfig,
    ILocales,
    IFallbacks,
    IUnknownPhraseListener,
    IProcessor,
    IParams,
    IPluralParams,
    pluralIntervalProcessor,
    mustacheProcessor,
    I18nContext,
    I18nProvider,
    II18nProviderConfig,
    withI18n,
    rprintf,
    __,
    __mf,
    __n,
    __m
};
```

[Description of this methods you can find in Documentation.](https://trigensoftware.github.io/i18n-for-react/index.html)

Basic API is same as in [`i18n-for-browser` module.](https://github.com/TrigenSoftware/i18n-for-browser)

### [I18nProvider](https://trigensoftware.github.io/i18n-for-react/modules/_index_.html#i18nprovider)

Configurator and provider of `i18n` instance.

Root context configuration example:

```tsx
<I18nProvider
    locale='en'
    locales={{
        en: {/* ... */},
        ru: {/* ... */}
    }}
>
    {__`hi`}
</I18nProvider>
```

Fork context example:

```tsx
<I18nProvider
    locale='en'
    locales={{
        en: {/* ... */},
        ru: {/* ... */}
    }}
>
    {__`hi`}
    <I18nProvider
        locales={{
            en: {/* ... */},
            ru: {/* ... */}
        }}
    >
        {__`goodby`}
    </I18nProvider>
</I18nProvider>
```

### [withI18n](https://trigensoftware.github.io/i18n-for-react/modules/_index_.html#withi18n)

Decorator to configure provider of `i18n` instance.

Example:

```tsx
@withI18n({
    en: {/* ... */},
    ru: {/* ... */}
})
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
                <I18nProvider
                    locales={{
                        en: {/* ... */},
                        ru: {/* ... */}
                    }}
                >
                    {__`goodby`}
                </I18nProvider>
            </I18nProvider>
        );
    }
}
```

### [rprintf()](https://trigensoftware.github.io/i18n-for-react/modules/_index_.html#rprintf)

Every translate function support React-formatted output:

```tsx
__('Hi, <>%s</>!', 'username', [<b/>])
// or
__('Hi, <>%s</>!', 'username', [_ => <b>{_}</b>])
// will produce:
[
    'Hi, ',
    <b>username</b>,
    '!'
]
```
