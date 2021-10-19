import surah2 from '$db/kemenag/surah/2.json';
import IdghamMimi from '$tajweed/kemenag/rule/IdghamMimi';
import GenerateRule from '$tajweed/GenerateRule';

describe('IdghamMimi finder kemenag version', () => {
	it('cannot find idgham mimi on surah 2 verse 2', async () => {
		const result = await GenerateRule(surah2[1].aya_text, [IdghamMimi]);
		expect(result.length).toEqual(0);
	});

	it('can find idgham mimi on surah 2 verse 19', async () => {
		const result = await GenerateRule(surah2[18].aya_text, [IdghamMimi]);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual({
			class: 'idgham-mimi',
			start: 112,
			end: 117
		});
	});

	it('can find idgham mimi with split index on surah 2 verse 214', async () => {
		const result = await GenerateRule(surah2[213].aya_text, [IdghamMimi]);
		expect(result.length).toEqual(3);
		expect(result[0]).toEqual({
			class: 'idgham-mimi',
			start: 60,
			end: 65
		});
		expect(result[1]).toEqual({
			class: 'idgham-mimi',
			start: 103,
			end: 105
		});
		expect(result[2]).toEqual({
			class: 'idgham-mimi',
			start: 107,
			end: 109
		});
	});
});
