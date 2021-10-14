import surah2 from '$db/kemenag/surah/2.json'
import IdghamBighunnah from '$support/tajweed/kemenag/rule/IdghamBighunnah';
import GenerateRule from '$support/tajweed/GenerateRule';

describe('IdghamBighunnah finder kemenag version', ()=>{
    it('cannot find idgham bighunnah on surah 2 verse 3', async ()=>{
        const result = await GenerateRule(surah2[2].aya_text, [IdghamBighunnah])
        expect(result.length).toEqual(0)

    })

    it('can find ghunnah on surah 2 verse 5', async ()=>{
        const result = await GenerateRule(surah2[4].aya_text, [IdghamBighunnah])
        expect(result.length).toEqual(2)
        expect(result[0]).toEqual(
            {
                class: 'idgham-bighunnah',
                start: 20,
                end: 22
            }
        )
        expect(result[1]).toEqual(
            {
                class: 'idgham-bighunnah',
                start: 24,
                end: 26
            }
        )
    })
})  