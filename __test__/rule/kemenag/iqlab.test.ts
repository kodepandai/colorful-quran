import surah2 from '$db/kemenag/surah/2.json';
import Iqlab from '$tajweed/kemenag/rule/Iqlab';
import GenerateRule from '$tajweed/GenerateRule';

describe('Iqlab finder kemenag version', () => {
	it('cannot find iqlab on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [Iqlab]);
		expect(result.length).toEqual(0);
	});

	it('can find iqlab on surah 2 verse 154', async () => {
		const result = await GenerateRule(surah2[153].aya_text, [Iqlab]);
		expect(result.length).toEqual(2);
		expect(result[0]).toEqual({
			class: 'iqlab',
			start: 64,
			end: 66
		});
		expect(result[1]).toEqual({
			class: 'iqlab',
			start: 68,
			end: 70
		});
	});
});
