import type { RuleFinder } from "$contract/rule"
import type { ITajweed } from "$contract/surah"
import { FindAttributeIndex, IsBlank, IsTanwin, Shaddah } from "$support/tajweed/kemenag/check/Attribute"
import IsHuruf, { AlifMaksura, Meem, Noon } from "$support/tajweed/kemenag/check/IsHuruf"

const Ghunnah: RuleFinder = (ayaSplited) => {
    return new Promise((resolve)=>{
        let match:ITajweed[] = []
        ayaSplited.forEach((txt, i)=>{
            const ShaddahIndex = FindAttributeIndex(ayaSplited[i]+ayaSplited[i+1]+ayaSplited[i+2], Shaddah)
            if(IsHuruf(txt, [Noon, Meem]) && ShaddahIndex>=0) {
                let prev = i-1
                if(IsBlank(ayaSplited[prev])) prev--
                if(IsHuruf(ayaSplited[prev], AlifMaksura)) prev--
                if(!IsTanwin(ayaSplited[prev])){
                    match = [
                        ...match,
                        {
                            class: 'ghunnah',
                            start: i,
                            end: i+ShaddahIndex+2
                        }
                    ]
                }
            }
        })
        resolve(match)
    })
}

export default Ghunnah