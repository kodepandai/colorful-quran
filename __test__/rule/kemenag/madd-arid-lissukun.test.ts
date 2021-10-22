import surah2 from '$db/kemenag/surah/2.json';
import surah3 from '$db/kemenag/surah/3.json';
import surah114 from '$db/kemenag/surah/114.json';
import MaddAridLissukun from '$tajweed/kemenag/rule/MaddAridLissukun';
import GenerateRule from '$tajweed/GenerateRule';

describe('MaddAridLissukun finder kemenag version', () => {
	it('cannot find madd-arid-lissukun on surah 2 verse 1', async () => {
		const result = await GenerateRule(surah2[0].aya_text, [MaddAridLissukun]);
		expect(result.length).toEqual(0);
	});

	it('can find madd-arid-lissukun on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [MaddAridLissukun]);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual({
			class: 'madd-arid-lissukun',
			start: 57,
			end: 59
		});
	});

	it('can find madd-arid-lissukun on surah 2 verse 3', async () => {
		const result = await GenerateRule(surah2[2].aya_text, [MaddAridLissukun]);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual({
			class: 'madd-arid-lissukun',
			start: 92,
			end: 94
		});
	});

	it('can distinguish madd-arid-lissukun and madd-wajib on surah 3 verse 5', async () => {
		const result = await GenerateRule(surah3[4].aya_text, [MaddAridLissukun]);
		expect(result.length).toEqual(0);
	});

	it('can find madd-arid-lissukun on surah 114 verse 1', async () => {
		const result = await GenerateRule(surah114[0].aya_text, [MaddAridLissukun]);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual({
			class: 'madd-arid-lissukun',
			start: 27,
			end: 28
		});
	});
});
