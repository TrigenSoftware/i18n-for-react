// tslint:disable jsx-key
import React, {
	ReactElement
} from 'react';
import rptintf from '../src/rptintf';

describe('rptintf', () => {

	it('should remove tags', () => {

		expect(
			rptintf('Start <>bold</>')
		).toBe(
			'Start bold'
		);
	});

	it('should wrap by functions', () => {

		expect(
			rptintf('Start <>bold</>', [_ => `[B]${_}[/B]`])
		).toBe(
			'Start [B]bold[/B]'
		);
	});

	it('should wrap by jsx', () => {

		expect(
			rptintf('Start <>bold</>', [<b/>])
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
			rptintf('Start <>bold</>!', [<b/>])
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
			rptintf('one\ntwo')
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
			rptintf('Start <>bold</> middle <>italic</>', [
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
			rptintf('Start <>bold <>italic</></>', [<b/>, <i/>])
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
			rptintf('Start <>bold <>italic</></> <>link</>', [<b/>, <i/>, <a/>])
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
