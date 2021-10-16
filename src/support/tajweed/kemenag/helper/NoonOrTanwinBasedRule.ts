import type { ITajweed, Rule } from "$contract/surah";
import { Alif, AlifMaksura, FindCharIndex, HamzahSmall, IsChar, Noon, Sukun, Tanwin, WaqafAula, WaqafJaiz, Washal } from "../check/Char";
import { GetNext } from "../check/Pointer";

const NoonOrTanwinBasedRule = (ruleName: Rule, ayaSplited: string[], i: number, ruleHuruf: string[], match: ITajweed[]):ITajweed[] => {
    if (
        (IsChar(ayaSplited[i], Noon) && IsChar(ayaSplited[i + 1], Sukun)) ||
        IsChar(ayaSplited[i + 1], Tanwin)
    ) {
        let start = i
        if(IsChar(ayaSplited[i], HamzahSmall)) start--
        let next = GetNext(ayaSplited, i + 1, [Alif, Washal, WaqafJaiz, WaqafAula]);
        if (IsChar(ayaSplited[next], ruleHuruf)) {
            let appendRule: ITajweed[] = [
                {
                    class: ruleName,
                    start,
                    end: next + 2
                }
            ];
            let splitIndex = FindCharIndex(ayaSplited.slice(i, next).join(''), [
                WaqafJaiz,
                Washal
            ]);
            if(splitIndex==-1){
                splitIndex = FindCharIndex(ayaSplited.slice(i, next).join(''), [
                    AlifMaksura,
                    Alif,
                ]);
            }
            if (splitIndex >= 0) {
                next = i + splitIndex + 1;
                appendRule = [
                    {
                        class: ruleName,
                        start,
                        end: i + 2
                    },
                    {
                        class: ruleName,
                        start: next,
                        end: next + 2
                    }
                ];
            }

            match = [...match, ...appendRule];
        }
    }
    return match
};

export default NoonOrTanwinBasedRule
