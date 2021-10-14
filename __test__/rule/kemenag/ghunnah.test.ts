import surah2 from '$db/kemenag/surah/2.json';
import Ghunnah from '$support/tajweed/kemenag/rule/Ghunnah';
import GenerateRule from '$support/tajweed/GenerateRule';

describe('Ghunnah finder kemenag version', () => {
	it('cannot find ghunnah on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [Ghunnah]);
		expect(result.length).toEqual(0);
	});

	it('can find ghunnah on surah 2 verse 3 with fix for LPMQ font', async () => {
		const result = await GenerateRule(surah2[2].aya_text, [Ghunnah]);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual({
			class: 'ghunnah',
			start: 64,
			end: 69
		});
	});

	it('can distinguish idgham bighunnah and ghunnah on surah 2 verse 5', async () => {
		const result = await GenerateRule(surah2[4].aya_text, [Ghunnah]);
		expect(result.length).toEqual(0);
	});
});
