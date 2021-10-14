import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import {
	Alif,
	AlifMaksura,
	FindCharIndex,
	IsChar,
	Lam,
	Noon,
	Sukun,
	Tanwin,
} from '$support/tajweed/kemenag/check/Char';
import { GetNext } from '../check/Pointer';

const IdghamBilaghunnah: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			if (
				(IsChar(txt, Noon) && IsChar(ayaSplited[i + 1], Sukun)) ||
				IsChar(ayaSplited[i + 1], Tanwin)
			) {
				let next = GetNext(ayaSplited, i + 1, [AlifMaksura]);
				if (IsChar(ayaSplited[next], Lam)) {
					let appendRule: ITajweed[] = [
						{
							class: 'idgham-bilaghunnah',
							start: i,
							end: next + 2
						}
					];
					const splitIndex = FindCharIndex(ayaSplited.slice(i, next).join(''), [
						AlifMaksura,
						Alif
					]);
					if (splitIndex >= 0) {
						next = i + FindCharIndex(ayaSplited.slice(i, next).join(''), AlifMaksura) + 1;
						appendRule = [
							{
								class: 'idgham-bilaghunnah',
								start: i,
								end: i + 2
							},
							{
								class: 'idgham-bilaghunnah',
								start: next,
								end: next + 2
							}
						];
					}

					match = [...match, ...appendRule];
				}
			}
		});
		resolve(match);
	});
};

export default IdghamBilaghunnah;
