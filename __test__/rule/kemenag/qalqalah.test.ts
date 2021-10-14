import surah2 from '$db/kemenag/surah/2.json';
import GenerateRule from "$support/tajweed/GenerateRule";
import Qalqalah from '$support/tajweed/kemenag/rule/Qalqalah';

describe('IdghamBilaghunnah finder kemenag version', () => {
	it('cannot find qalqalah on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [Qalqalah]);
		expect(result.length).toEqual(0);
	});

	it('can find qalqalah on surah 2 verse 3', async () => {
		const result = await GenerateRule(surah2[2].aya_text, [Qalqalah]);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual({
			class: 'qalqalah',
			start: 75,
			end: 76
		});
	});
});
