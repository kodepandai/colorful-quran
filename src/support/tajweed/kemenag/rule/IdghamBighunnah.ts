import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import {
	Alif,
	AlifMaksura,
	FindCharIndex,
	IsChar,
	Meem,
	Noon,
	Sukun,
	Tanwin,
	Wau,
	Ya
} from '$support/tajweed/kemenag/check/Char';
import { GetNext } from '../check/Pointer';

const IdghamBighunnah: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			if (
				(IsChar(txt, Noon) && IsChar(ayaSplited[i + 1], Sukun)) ||
				IsChar(ayaSplited[i + 1], Tanwin)
			) {
				let next = GetNext(ayaSplited, i + 1, [AlifMaksura]);
				if (IsChar(ayaSplited[next], [Ya, Noon, Meem, Wau])) {
					let appendRule: ITajweed[] = [
						{
							class: 'idgham-bighunnah',
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
								class: 'idgham-bighunnah',
								start: i,
								end: i + 2
							},
							{
								class: 'idgham-bighunnah',
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

export default IdghamBighunnah;
