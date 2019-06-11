// tslint:disable no-magic-numbers
import {
	ReactElement,
	cloneElement
} from 'react';

type Part = string|ReactElement;
type Parts = Part|Part[];
type WrapperFn = (children: Parts) => Parts;
type Wrapper = ReactElement|WrapperFn;

const tagRegExp = /<>/;

export default function rptintf(text: string, wrappers: Wrapper[] = [], startwrapperIndexPointerPointer = { v: 0 }) {

	const wrapperIndexPointer = startwrapperIndexPointerPointer;
	const len = text.length;
	let wrapperIndex = 0;
	let char = '';
	let balance = 0;
	let part = '';
	let parts: Parts = [];
	let result: Parts = '';

	for (let i = 0; i < len; i++) {

		char = text[i];

		if (char === '<' && text[i + 1] === '>') {

			balance++;

			if (balance === 1) {
				result = add(result, part);
				part = '';
				i++;
				continue;
			}
		}

		if (char === '<' && text[i + 1] === '/' && text[i + 2] === '>') {

			balance--;

			if (balance === 0) {

				i += 2;

				wrapperIndex = wrapperIndexPointer.v++;
				parts = tagRegExp.test(part)
					? rptintf(part, wrappers, wrapperIndexPointer)
					: part;
				result = add(
					result,
					applyWrapper(
						parts,
						wrappers,
						wrapperIndex
					)
				);
				part = '';

				continue;
			}
		}

		part += text[i];
	}

	return result;
}

function add(Parts: Parts, add: Parts): Parts {

	if (!Parts) {
		return add;
	}

	if (typeof Parts === 'string' && typeof add === 'string') {
		return Parts + add;
	}

	return [].concat(
		Parts,
		add
	);
}

function applyWrapper(children: Parts, wrappers: Wrapper[], index: number) {

	if (index >= wrappers.length) {
		return children;
	}

	const wrapper = wrappers[index];

	if (typeof wrapper === 'function') {
		return wrapper(children);
	}

	return cloneElement(wrapper, {
		key: wrapper.key || index
	}, children);
}
