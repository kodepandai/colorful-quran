import surah2 from '$db/kemenag/surah/2.json';
import IdghamBilaghunnah from '$support/tajweed/kemenag/rule/IdghamBilaghunnah';
import GenerateRule from '$support/tajweed/GenerateRule';

describe('IdghamBilaghunnah finder kemenag version', () => {
	it('cannot find idgham bighunnah on surah 2 verse 4', async () => {
		const result = await GenerateRule(surah2[3].aya_text, [IdghamBilaghunnah]);
		expect(result.length).toEqual(0);
	});

	it('can find ghunnah on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [IdghamBilaghunnah]);
		expect(result.length).toEqual(2);
		expect(result[0]).toEqual({
			class: 'idgham-bilaghunnah',
			start: 41,
			end: 43
		});
		expect(result[1]).toEqual({
			class: 'idgham-bilaghunnah',
			start: 44,
			end: 46
		});
	});
});
