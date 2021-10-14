import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { Alif, AlifMaksura, Dal, Dhad, Dhal, Dza, Fa, FindCharIndex, IsChar, Jeem, Kaf, Noon, Qaf, Shad, Sin, Sukun, Syin, Ta, Tanwin, Tha, Tsa, WaqafJaiz, Washal, Za } from '$support/tajweed/kemenag/check/Char';
import { GetNext } from '../check/Pointer';

const Ikhfa: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			if (
				(IsChar(txt, Noon) && IsChar(ayaSplited[i + 1], Sukun)) ||
				IsChar(ayaSplited[i + 1], Tanwin)
			) {
				let next = GetNext(ayaSplited, i + 1, [Washal, WaqafJaiz]);
				if (IsChar(ayaSplited[next], [Ta, Tsa, Jeem, Dal, Dhal, Za, Sin, Syin, Shad, Dhad, Tha, Dza, Fa, Qaf, Kaf])) {
					let appendRule: ITajweed[] = [
						{
							class: 'ikhfa',
							start: i,
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
								class: 'ikhfa',
								start: i,
								end: i + 2
							},
							{
								class: 'ikhfa',
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

export default Ikhfa;

// TODO: surah 2 vers 10