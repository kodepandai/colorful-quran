import surah2 from '$db/kemenag/surah/2.json';
import MaddLazimHarfi from '$tajweed/kemenag/rule/MaddLazimHarfi';
import GenerateRule from '$tajweed/GenerateRule';

describe('MaddLazimHarfi finder kemenag version', () => {
	it('cannot find madd-wajib on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [MaddLazimHarfi], false);
		expect(result.length).toEqual(0);
	});

	it('can find madd-wajib on surah 2 verse 1', async () => {
		const result = await GenerateRule(surah2[0].aya_text, [MaddLazimHarfi], true);
		expect(result.length).toEqual(2);
		expect(result[0]).toEqual({
			class: 'madd-lazim-harfi',
			start: 1,
			end: 2
		});
		expect(result[1]).toEqual({
			class: 'madd-lazim-harfi',
			start: 3,
			end: 5
		});
	});
});
