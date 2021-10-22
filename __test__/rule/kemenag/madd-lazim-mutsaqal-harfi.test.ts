import surah2 from '$db/kemenag/surah/2.json';
import MaddLazimMutsaqalHarfi from '$tajweed/kemenag/rule/MaddLazimMutsaqalHarfi';
import GenerateRule from '$tajweed/GenerateRule';

describe('MaddLazimMutsaqalHarfi finder kemenag version', () => {
	it('cannot find madd-wajib on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [MaddLazimMutsaqalHarfi], false);
		expect(result.length).toEqual(0);
	});

	it('can find madd-wajib on surah 2 verse 1', async () => {
		const result = await GenerateRule(surah2[0].aya_text, [MaddLazimMutsaqalHarfi], true);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual({
			class: 'madd-lazim-mutsaqal-harfi',
			start: 1,
			end: 6
		});
	});
});
