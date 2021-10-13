import type { RuleFinder } from "$contract/rule"
import type { ITajweed } from "$contract/surah"
import {IsAttribute, IsBlank, IsTanwin, Sukun } from "$support/tajweed/kemenag/check/Attribute"
import IsHuruf, { AlifMaksura, Meem, Noon, Wau, Ya } from "$support/tajweed/kemenag/check/IsHuruf"

const Yanmuw = [Ya, Noon, Meem, Wau]
const IdghamBighunnah: RuleFinder = (ayaSplited) => {
    return new Promise((resolve)=>{
        let match:ITajweed[] = []
        ayaSplited.forEach((txt, i)=>{
            if((IsHuruf(txt, Noon) && IsAttribute(ayaSplited[i+1], Sukun))||IsTanwin(ayaSplited[i+1])){
                let next = i+2;
                let  hasAlifMaksura = false
                if(IsHuruf(ayaSplited[i+2], AlifMaksura)) {
                    next++
                    hasAlifMaksura=true
                }
                if(IsBlank(ayaSplited[next])) next++
                if(IsHuruf(ayaSplited[next], Yanmuw)){
                    let appendRule: ITajweed[] = [{
                        class: 'idgham-bighunnah',
                        start: i,
                        end: next
                    }]
                    if(hasAlifMaksura){
                        appendRule = [
                            {
                                class: 'idgham-bighunnah',
                                start: i,
                                end: i+2
                            },
                            {
                                class: 'idgham-bighunnah',
                                start: next,
                                end: next+2
                            }
                        ]
                    }

                    match = [
                        ...match, 
                        ...appendRule
                    ]
                }
                
            }
        })
        resolve(match)
    })
}

export default IdghamBighunnah