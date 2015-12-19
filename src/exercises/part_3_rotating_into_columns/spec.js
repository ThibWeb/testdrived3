import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import d3 from 'd3';

const frequencies = { A: 0.08167, B: 0.01492, C: 0.02782, D: 0.04253, E: 0.12702, F: 0.02288, G: 0.02015, H: 0.06094, I: 0.06966, J: 0.00153, K: 0.00772, L: 0.04025, M: 0.02406, N: 0.06749, O: 0.07507, P: 0.01929, Q: 0.00095, R: 0.05987, S: 0.06327, T: 0.09056, U: 0.02758, V: 0.00978, W: 0.02360, X: 0.00150, Y: 0.01974, Z: 0.00074, };
const submission = global.submission;

describe('Part 3: Rotating into columns', () => {
    beforeEach('', () => {
        d3.select('.chart').remove();
        d3.select('body').append('svg').attr('class', 'chart');
    });

    it('should export a function', () => {
        expect(submission).to.be.a('function');
    });
});
