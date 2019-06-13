import React, {
	ComponentClass,
	PureComponent,
	forwardRef
} from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import I18nProvider, {
	II18nProviderConfig
} from './Provider';

interface IProps {
	componentRef(ref: any);
}

export default function withI18n(config: II18nProviderConfig = {}) {
	// tslint:disable-next-line: only-arrow-functions
	return function<T>(Class: T): T {

		const WrappedComponent = Class as any as ComponentClass;
		const wrappedComponentName = WrappedComponent.displayName
			|| WrappedComponent.name
			|| 'Component';
		const displayName = `withI18n(${wrappedComponentName})`;

		class WithI18n extends PureComponent<IProps> {

			static displayName = displayName;

			render() {

				const {
					componentRef,
					...props
				} = this.props;

				return (
					<I18nProvider
						{...config}
					>
						<WrappedComponent
							ref={componentRef}
							{...props}
						/>
					</I18nProvider>
				);
			}
		}

		const ForwardedWithI18n = forwardRef((props, ref: any) => (
			<WithI18n
				componentRef={ref}
				{...props}
			/>
		));

		return hoistNonReactStatics(ForwardedWithI18n, WrappedComponent);
	};
}
