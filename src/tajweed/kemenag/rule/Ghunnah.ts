import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import {
	Alif,
	AlifMaksura,
	FindCharIndex,
	IsChar,
	Maddah,
	Meem,
	MeemIqlab,
	Noon,
	Shaddah,
	Sukun,
	Tanwin,
	WaqafAula,
	WaqafJaiz,
	WaqafLazim,
	WaqafLove,
	Washal
} from '$tajweed/kemenag/check/Char';
import { GetPrev } from '$tajweed/kemenag/check/Pointer';

const Ghunnah: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			let ShaddahIndex = FindCharIndex(
				ayaSplited[i] + ayaSplited[i + 1] + ayaSplited[i + 2],
				Shaddah
			);
			// this is to distinguish between ghunnah and idgham bigunnah
			if (ShaddahIndex == -1) {
				ShaddahIndex = 0;
			} else {
				ShaddahIndex++;
			}
			const MaddahIndex = FindCharIndex(
				ayaSplited[i] + ayaSplited[i + 1] + ayaSplited[i + 2],
				Maddah
			);

			if (IsChar(txt, [Noon, Meem]) && ShaddahIndex >= 0 && MaddahIndex == -1) {
				const prev = GetPrev(ayaSplited, i, [
					AlifMaksura,
					Alif,
					WaqafLove,
					Washal,
					WaqafJaiz,
					WaqafAula,
					WaqafLazim,
					MeemIqlab
				]);
				if (
					!(
						IsChar(ayaSplited[prev], Tanwin) ||
						(IsChar(ayaSplited[prev], Sukun) && IsChar(ayaSplited[prev - 1], [Noon, Meem]))
					)
				) {
					if (IsChar(ayaSplited[i - 2], Meem) && IsChar(txt, Meem)) {
						i -= 2;
					} //fix for LPMQ font
					match = [
						...match,
						{
							class: 'ghunnah',
							start: i,
							end: i + ShaddahIndex
						}
					];
				}
			}
		});
		resolve(match);
	});
};

export default Ghunnah;
