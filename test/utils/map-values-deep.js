import { expect } from 'chai';
import { mapValuesDeep } from '../../src/utils/map-values-deep.ts';

/* eslint-env mocha */

function cb(v) {
	if (typeof v === 'string') return '_' + v;
	if (typeof v === 'number') return v + 1;
	throw new Error('Should never see this');
}

describe('utils/mapValuesDeep()', () => {
	it('should return string with callback applied when given string', () => {
		expect(mapValuesDeep('foo', cb)).to.equal('_foo');
	});

	it('should return number with callback applied when given number', () => {
		expect(mapValuesDeep(1, cb)).to.equal(2);
	});

	it('should apply callback to each element of an array and return an array', () => {
		expect(mapValuesDeep(['foo', 1], cb)).to.eql(['_foo', 2]);
	});

	it('should apply callback to each value of an object and return an object with same keys', () => {
		expect(mapValuesDeep({a: 'foo', b: 1}, cb)).to.eql({a: '_foo', b: 2});
	});

	it('should apply callback deeply', () => {
		expect(mapValuesDeep({
			a: [
				{ b: [ 'foo', {c: 1}]}
			]
		}, cb)).to.eql({
			a: [
				{ b: [ '_foo', {c: 2} ]}
		]});
	})
});
