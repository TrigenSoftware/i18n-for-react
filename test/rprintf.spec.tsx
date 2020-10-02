// tslint:disable jsx-key
import React from 'react';
import { rprintf } from '../src/rprintf';

describe('rprintf', () => {
	it('should remove tags', () => {
		expect(
			rprintf('Start <>bold</>')
		).toBe(
			'Start bold'
		);
	});

	it('should wrap by functions', () => {
		expect(
			rprintf('Start <>bold</>', [_ => `[B]${_}[/B]`])
		).toBe(
			'Start [B]bold[/B]'
		);
	});

	it('should wrap by jsx', () => {
		expect(
			rprintf('Start <>bold</>', [<b/>])
		).toMatchObject([
			'Start ',
			{
				type:  'b',
				props: {
					children: 'bold'
				}
			}
		]);

		expect(
			rprintf('Start <>bold</>!', [<b/>])
		).toMatchObject([
			'Start ',
			{
				type:  'b',
				props: {
					children: 'bold'
				}
			},
			'!'
		]);
	});

	it('should handle nl', () => {
		expect(
			rprintf('one\ntwo')
		).toMatchObject([
			'one',
			{
				type: 'br'
			},
			'two'
		]);
	});

	it('should wrap some text', () => {
		expect(
			rprintf('Start <>bold</> middle <>italic</>', [
				<b/>,
				_ => <i>{_}</i>
			])
		).toMatchObject([
			'Start ',
			{
				type:  'b',
				props: {
					children: 'bold'
				}
			},
			' middle ',
			{
				type:  'i',
				props: {
					children: 'italic'
				}
			}
		]);
	});

	it('should wrap inside', () => {
		expect(
			rprintf('Start <>bold <>italic</></>', [<b/>, <i/>])
		).toMatchObject([
			'Start ',
			{
				type:  'b',
				props: {
					children: [
						'bold ',
						{
							type:  'i',
							props: {
								children: 'italic'
							}
						}
					]
				}
			}
		]);

		expect(
			rprintf('Start <>bold <>italic</></> <>link</>', [<b/>, <i/>, <a/>])
		).toMatchObject([
			'Start ',
			{
				type:  'b',
				props: {
					children: [
						'bold ',
						{
							type:  'i',
							props: {
								children: 'italic'
							}
						}
					]
				}
			},
			' ',
			{
				type:  'a',
				props: {
					children: 'link'
				}
			}
		]);
	});
});
