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
// all i18n-for-browser exports, plus:
export {
    I18nMethods,
    I18nProviderConfig,
    I18nProviderProps,
    I18nContextPayload,
    rprintf,
    createI18nProvider,
    createI18nHook
    __x,
    __xmf,
    __xn
};
```

[Description of this methods you can find in Documentation.](https://trigensoftware.github.io/i18n-for-react/index.html)

Basic API is same as in [`i18n-for-browser` module.](https://github.com/TrigenSoftware/i18n-for-browser)

### [createI18nProvider](https://trigensoftware.github.io/i18n-for-react/interfaces/_provider_.ii18nproviderconfig.html)

Create `I18nContext` and `I18nProvider` with given methods.

<details>
    <summary>Usage example</summary>

```js
/**
 * Basic example 
 */
const {
    /**
     * Config and methods provider.
     */
    I18nProvider,
    /**
     * Context with config and methods.
     */
    I18nContext
} = createI18nProvider(
    /**
     * Methods for binding and providing.
     */
    {
        __,
        __x
    },
    /**
     * Config defaults.
     */
    {
        /* ... */
        cookieName: 'yourcookiename'
    }
);
```

</details>

### [createI18nHook](https://trigensoftware.github.io/i18n-for-react/interfaces/_provider_.ii18nproviderconfig.html)

Create hook from context.

<details>
    <summary>Usage example</summary>

```js
/**
 * Basic example 
 */
const useI18n = createI18nHook(I18nContext);
/**
 * Then you can use this hook
 */
function SomeComponent() {
    const {
        __
    } = useI18n();

    return __`cat`;
}
```

</details>

### [I18nProvider](https://trigensoftware.github.io/i18n-for-react/interfaces/_provider_.ii18nproviderconfig.html)

Configurator and provider of `i18n` instance.

<details>
    <summary>Usage example</summary>

```jsx
/**
 * Root context configuration
 */
<I18nProvider
    locale='en'
    locales={{
        en: {/* ... */},
        ru: {/* ... */}
    }}
>
    {/* ... */}
</I18nProvider>
/**
 * Fork context
 */
<I18nProvider
    locale='en'
    locales={{
        en: {/* ... */},
        ru: {/* ... */}
    }}
>
    {/* ... */}
    <I18nProvider
        locales={{
            en: {/* ... */},
            ru: {/* ... */}
        }}
    >
        {/* ... */}
    </I18nProvider>
</I18nProvider>
```

</details>

### [rprintf()](https://trigensoftware.github.io/i18n-for-react/modules/_rprintf_.html#rprintf)

Format string with wrappers.

<details>
    <summary>Usage example</summary>

```jsx
/**
 * Wrap with React-elements
 */
rprintf('Hi, <>John</>!', [<b/>])
/**
 * or handle with functions
 */
rprintf('Hi, <>John</>!', [_ => `<b>${_}</b>`])
```

</details>

### [__x()](https://trigensoftware.github.io/i18n-for-react/modules/_index_.html#__x)

Same as `__()`, but for JSX.

<details>
    <summary>Usage example</summary>

```jsx
/**
 * Same as `__()`
 */
__x('Hi, %s!', 'John')
/**
 * And with wrappers
 */
__x('Hi, <>%s</>!', 'John', [<b/>])
```

</details>

### [__xmf()](https://trigensoftware.github.io/i18n-for-react/modules/_index_.html#__xmf)

Same as `__mf()`, but for JSX.

<details>
    <summary>Usage example</summary>

```jsx
/**
 * Same as `__mf()`
 */
__xmf('Hi, {username}!', { username: 'John' })
/**
 * And with wrappers
 */
__xmf('Hi, <>{username}</>!', { username: 'John' }, [<b/>])
```

</details>

### [__xn()](https://trigensoftware.github.io/i18n-for-react/modules/_index_.html#__xn)

Same as `__n()`, but for JSX.

<details>
    <summary>Usage example</summary>

```jsx
/**
 * Same as `__xn()`
 */
__xn('I have %s cats.', 2)
/**
 * And with wrappers
 */
__xn('I have <>%s</> cats.', 2, [<b/>])
```

</details>
