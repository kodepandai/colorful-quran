import surah2 from '$db/kemenag/surah/2.json';
import MaddJaiz from '$support/tajweed/kemenag/rule/MaddJaiz';
import GenerateRule from '$support/tajweed/GenerateRule';

describe('MaddJaiz finder kemenag version', () => {
	it('cannot find madd-jaiz on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [MaddJaiz]);
		expect(result.length).toEqual(0);
	});

	it('can find madd-jaiz on surah 2 verse 4', async () => {
		const result = await GenerateRule(surah2[3].aya_text, [MaddJaiz]);
		expect(result.length).toEqual(2);
		expect(result[0]).toEqual({
			class: 'madd-jaiz',
			start: 29,
			end: 33
		});
		expect(result[1]).toEqual({
			class: 'madd-jaiz',
			start: 54,
			end: 58
		});
	});
});
