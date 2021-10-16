import surah2 from '$db/kemenag/surah/2.json';
import MaddWajib from '$tajweed/kemenag/rule/MaddWajib';
import GenerateRule from '$tajweed/GenerateRule';

describe('MaddWajib finder kemenag version', () => {
	it('cannot find madd-wajib on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [MaddWajib]);
		expect(result.length).toEqual(0);
	});

	it('can find madd-wajib on surah 2 verse 5', async () => {
		const result = await GenerateRule(surah2[4].aya_text, [MaddWajib]);
		expect(result.length).toEqual(2);
		expect(result[0]).toEqual({
			class: 'madd-wajib',
			start: 3,
			end: 7
		});
		expect(result[1]).toEqual({
			class: 'madd-wajib',
			start: 48,
			end: 52
		});
	});
});
