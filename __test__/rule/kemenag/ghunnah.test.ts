import surah2 from '$db/kemenag/surah/2.json';
import surah10 from '$db/kemenag/surah/10.json';
import Ghunnah from '$tajweed/kemenag/rule/Ghunnah';
import GenerateRule from '$tajweed/GenerateRule';
import MaddJaiz from '$tajweed/kemenag/rule/MaddJaiz';

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
			end: 66
		});
	});

	it('can distinguish idgham bighunnah and ghunnah on surah 2 verse 5', async () => {
		const result = await GenerateRule(surah2[4].aya_text, [Ghunnah]);
		expect(result.length).toEqual(0);
	});

	it('can distinguish idgham bighunnah and ghunnah on surah 2 verse 23', async () => {
		const result = await GenerateRule(surah2[22].aya_text, [Ghunnah]);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual({
			class: 'ghunnah',
			start: 31,
			end: 33
		});
	});

	it('can avoid conflict with madd jaiz on surah 10 verse 15', async () => {
		const result = await GenerateRule(surah10[14].aya_text, [Ghunnah, MaddJaiz]);
		expect(result[3]).toEqual({
			class: 'ghunnah',
			start: 255,
			end: 258
		});
		expect(result[4]).toEqual({
			class: 'madd-jaiz',
			start: 258,
			end: 262
		});
	});
});
