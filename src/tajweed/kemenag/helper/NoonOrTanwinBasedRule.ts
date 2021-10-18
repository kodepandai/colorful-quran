import type { ITajweed, Rule } from '$contract/surah';
import {
	Alif,
	AlifMaksura,
	FindCharIndex,
	HamzahWau,
	IsChar,
	Noon,
	Sukun,
	Tanwin,
	WaqafAula,
	WaqafJaiz,
	MeemIqlab,
	Washal,
    WaqafLazim,
    WaqafLove,
	Shaddah,
	Meem,
} from '../check/Char';
import { GetNext } from '$tajweed/kemenag/check/Pointer';

const IgnoredChar = [AlifMaksura, Alif, WaqafLove, Washal, WaqafJaiz, WaqafAula, WaqafLazim, MeemIqlab]
const NoonOrTanwinBasedRule = (
	ruleName: Rule,
	ayaSplited: string[],
	i: number,
	ruleHuruf: string[],
	match: ITajweed[]
): ITajweed[] => {
	if (
		(IsChar(ayaSplited[i], Noon) && IsChar(ayaSplited[i + 1], Sukun)) ||
		IsChar(ayaSplited[i + 1], Tanwin)
	) {
		let start = i;
		if(IsChar(ayaSplited[i], Shaddah) && !(IsChar(ayaSplited[i-1], [Noon, Meem]))) start --
		if (IsChar(ayaSplited[i], HamzahWau)) start--;
		const next = GetNext(ayaSplited, i + 1, IgnoredChar);
		if (IsChar(ayaSplited[next], ruleHuruf)) {
			let appendRule: ITajweed[] = [
				{
					class: ruleName,
					start,
					end: next + 2
				}
			];
			const splitIndex = FindCharIndex(ayaSplited.slice(i, next).join(''), IgnoredChar);
			if (splitIndex >= 0) {
				appendRule = [
					{
						class: ruleName,
						start,
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

export default NoonOrTanwinBasedRule;

// TODO: surah 2 verse 36, false start of idgham bighunnah because shaddah