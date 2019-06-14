// tslint:disable no-magic-numbers
import React, {
	ReactElement,
	cloneElement
} from 'react';

type Part = string|ReactElement;
type Parts = Part|Part[];
type WrapperFn = (children: Parts) => Parts;
type Wrapper = ReactElement|WrapperFn;

export const tagRegExp = /<>/;

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

		if (char === '\n') {
			result = add(result, part);
			result = add(result, <br/>);
			part = '';
			continue;
		}

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

	result = add(result, part);

	return result;
}

function add(parts: Parts, add: Parts): Parts {

	if (!parts) {
		return add;
	}

	if (!add) {
		return parts;
	}

	if (typeof parts === 'string' && typeof add === 'string') {
		return parts + add;
	}

	return [].concat(
		parts,
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
