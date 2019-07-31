# i18n-for-react

[![NPM version][npm]][npm-url]
[![Dependencies status][deps]][deps-url]
[![Build status][build]][build-url]
[![Coverage status][coverage]][coverage-url]
[![Dependabot badge][dependabot]][dependabot-url]
[![Documentation badge][documentation]][documentation-url]

[npm]: https://img.shields.io/npm/v/i18n-for-react.svg
[npm-url]: https://npmjs.com/package/i18n-for-react

[deps]: https://david-dm.org/TrigenSoftware/i18n-for-react.svg
[deps-url]: https://david-dm.org/TrigenSoftware/i18n-for-react

[build]: http://img.shields.io/travis/com/TrigenSoftware/i18n-for-react/master.svg
[build-url]: https://travis-ci.com/TrigenSoftware/i18n-for-react

[coverage]: https://img.shields.io/coveralls/TrigenSoftware/i18n-for-react.svg
[coverage-url]: https://coveralls.io/r/TrigenSoftware/i18n-for-react

[dependabot]: https://api.dependabot.com/badges/status?host=github&repo=TrigenSoftware/i18n-for-react
[dependabot-url]: https://dependabot.com/

[documentation]: https://img.shields.io/badge/API-Documentation-2b7489.svg
[documentation-url]: https://trigensoftware.github.io/i18n-for-react

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
    __m,
    __x,
    __xmf,
    __xn
};
```

[Description of this methods you can find in Documentation.](https://trigensoftware.github.io/i18n-for-react/index.html)

Basic API is same as in [`i18n-for-browser` module.](https://github.com/TrigenSoftware/i18n-for-browser)

### [I18nProvider](https://trigensoftware.github.io/i18n-for-react/interfaces/_provider_.ii18nproviderconfig.html)

Configurator and provider of `i18n` instance.

Root context configuration example:

```jsx
<I18nProvider
    locale='en'
    locales={{
        en: {/* ... */},
        ru: {/* ... */}
    }}
>
    {__x`hi`}
</I18nProvider>
```

Fork context example:

```jsx
<I18nProvider
    locale='en'
    locales={{
        en: {/* ... */},
        ru: {/* ... */}
    }}
>
    {__x`hi`}
    <I18nProvider
        locales={{
            en: {/* ... */},
            ru: {/* ... */}
        }}
    >
        {__x`goodby`}
    </I18nProvider>
</I18nProvider>
```

### [withI18n](https://trigensoftware.github.io/i18n-for-react/modules/_withi18n_.html#withi18n)

Decorator to configure provider of `i18n` instance.

Example:

```jsx
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
                {__x`hi`}
                <I18nProvider
                    locales={{
                        en: {/* ... */},
                        ru: {/* ... */}
                    }}
                >
                    {__x`goodby`}
                </I18nProvider>
            </I18nProvider>
        );
    }
}
```

### [rprintf()](https://trigensoftware.github.io/i18n-for-react/modules/_rptintf_.html#rptintf)

Every translate function support React-formatted output:

```jsx
__x('Hi, <>%s</>!', 'username', [<b/>])
// or
__x('Hi, <>%s</>!', 'username', [_ => <b>{_}</b>])
// will produce:
[
    'Hi, ',
    <b>username</b>,
    '!'
]
```

### [__x()](https://trigensoftware.github.io/i18n-for-react/modules/_rptintf_.html#rptintf)

Same as `__()`, but for JSX.

### [__xmf()](https://trigensoftware.github.io/i18n-for-react/modules/_rptintf_.html#rptintf)

Same as `__mf()`, but for JSX.

### [__xn()](https://trigensoftware.github.io/i18n-for-react/modules/_rptintf_.html#rptintf)

Same as `__n()`, but for JSX.
