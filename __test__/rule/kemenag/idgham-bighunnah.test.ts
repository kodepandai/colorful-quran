import surah2 from '$db/kemenag/surah/2.json';
import IdghamBighunnah from '$tajweed/kemenag/rule/IdghamBighunnah';
import GenerateRule from '$tajweed/GenerateRule';

describe('IdghamBighunnah finder kemenag version', () => {
	it('cannot find idgham bighunnah on surah 2 verse 3', async () => {
		const result = await GenerateRule(surah2[2].aya_text, [IdghamBighunnah]);
		expect(result.length).toEqual(0);
	});

	it('can find idgham bighunnah on surah 2 verse 5', async () => {
		const result = await GenerateRule(surah2[4].aya_text, [IdghamBighunnah]);
		expect(result.length).toEqual(2);
		expect(result[0]).toEqual({
			class: 'idgham-bighunnah',
			start: 20,
			end: 22
		});
		expect(result[1]).toEqual({
			class: 'idgham-bighunnah',
			start: 23,
			end: 25
		});
	});

	it('can find idgham bighunnah with hamzah as base on surah 2 verse 216', async () => {
		const result = await GenerateRule(surah2[215].aya_text, [IdghamBighunnah]);
		expect(result.length).toEqual(4);
		expect(result[0]).toEqual({
			class: 'idgham-bighunnah',
			start: 83,
			end: 86
		});
		expect(result[1]).toEqual({
			class: 'idgham-bighunnah',
			start: 87,
			end: 89
		});
		expect(result[2]).toEqual({
			class: 'idgham-bighunnah',
			start: 142,
			end: 145
		});
		expect(result[3]).toEqual({
			class: 'idgham-bighunnah',
			start: 146,
			end: 148
		});
	});

	it('can find idgham bighunnah with base huruf has shaddah on surah 2 verse 36', async () => {
		const result = await GenerateRule(surah2[35].aya_text, [IdghamBighunnah]);
		expect(result.length).toEqual(3);
		expect(result[0]).toEqual({
			class: 'idgham-bighunnah',
			start: 119,
			end: 122
		});
		expect(result[1]).toEqual({
			class: 'idgham-bighunnah',
			start: 124,
			end: 126
		});
		expect(result[2]).toEqual({
			class: 'idgham-bighunnah',
			start: 156,
			end: 162
		});
	});
});

