import surah2 from '$db/kemenag/surah/2.json';
import Ikhfa from '$tajweed/kemenag/rule/Ikhfa';
import GenerateRule from '$tajweed/GenerateRule';

describe('Ikhfa finder kemenag version', () => {
	it('cannot find ikhfa on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [Ikhfa]);
		expect(result.length).toEqual(0);
	});

	it('can find ikhfa on surah 2 verse 4', async () => {
		const result = await GenerateRule(surah2[3].aya_text, [Ikhfa]);
		expect(result.length).toEqual(3);
		expect(result[0]).toEqual({
			class: 'ikhfa',
			start: 35,
			end: 39
		});
		expect(result[1]).toEqual({
			class: 'ikhfa',
			start: 60,
			end: 64
		});
		expect(result[2]).toEqual({
			class: 'ikhfa',
			start: 69,
			end: 74
		});
	});
});
