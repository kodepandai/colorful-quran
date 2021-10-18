import type { ITajweed, Rule } from '$contract/surah';
import {
	Alif,
	AlifMaksura,
	FindCharIndex,
	IsChar,
	Sukun,
	WaqafAula,
	WaqafJaiz,
	MeemIqlab,
	Washal,
    WaqafLazim,
    WaqafLove,
	Meem,
} from '../check/Char';
import { GetNext } from '$tajweed/kemenag/check/Pointer';

const IgnoredChar = [AlifMaksura, Alif, WaqafLove, Washal, WaqafJaiz, WaqafAula, WaqafLazim, MeemIqlab]
const MeemBasedRule = (
	ruleName: Rule,
	ayaSplited: string[],
	i: number,
	ruleHuruf: string[],
	match: ITajweed[]
): ITajweed[] => {
	if (
		(IsChar(ayaSplited[i], Meem) && IsChar(ayaSplited[i + 1], Sukun))
	) {
		const next = GetNext(ayaSplited, i + 1, IgnoredChar);
		if (IsChar(ayaSplited[next], ruleHuruf)) {
			let appendRule: ITajweed[] = [
				{
					class: ruleName,
					start:i,
					end: next + 2
				}
			];
			const splitIndex = FindCharIndex(ayaSplited.slice(i, next).join(''), IgnoredChar);
			if (splitIndex >= 0) {
				appendRule = [
					{
						class: ruleName,
						start:i,
						end: i + 2
					},
					{
						class: ruleName,
						start: next-1,
						end: next + 1
					}
				];
			}

			match = [...match, ...appendRule];
		}
	}
	return match;
};

export default MeemBasedRule;