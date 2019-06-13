import {
	Component
} from 'react';
import I18nContext from './Context';
import rprintf, {
	tagRegExp
} from './rptintf';

export interface IProps {
	args: any[];
	fn(...args): any;
}

export default class I18nTranslate extends Component<IProps> {

	static contextType = I18nContext;

	private contextVersion: symbol = null;

	constructor(props, context) {

		super(props, context);

		this.contextVersion = context && context.version;
	}

	render() {

		const {
			fn,
			args
		} = this.props;
		const {
			context
		} = this;
		let wrappers = null;

		if (args.length > 1 && Array.isArray(args[args.length - 1])) {
			wrappers = args.pop();
		}

		const text = Reflect.apply(fn, context, args);

		if (tagRegExp.test(text)) {
			return wrappers
				? rprintf(text, wrappers)
				: rprintf(text);
		}

		return text;
	}

	shouldComponentUpdate(
		{
			fn: nextFn,
			args: nextArgs
		},
		_,
		nextContext
	) {

		const nextContextVersion = nextContext && nextContext.version;
		const {
			fn,
			args
		} = this.props;

		if (nextContextVersion !== this.contextVersion) {
			this.contextVersion = nextContextVersion;
			return true;
		}

		if (nextFn !== fn
			|| nextArgs.length !== args.length
		) {
			return true;
		}

		return args.some((arg, i) => arg !== nextArgs[i]);
	}
}
