import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import {
	Alif,
	FindCharIndex,
	IsChar,
	Maddah,
	Meem,
	Noon,
	Shaddah,
	Sukun,
	Tanwin
} from '$tajweed/kemenag/check/Char';
import { GetPrev } from '$tajweed/kemenag/check/Pointer';

const Ghunnah: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			const ShaddahIndex = FindCharIndex(
				ayaSplited[i] + ayaSplited[i + 1] + ayaSplited[i + 2],
				Shaddah
			);
			const MaddahIndex = FindCharIndex(
				ayaSplited[i] + ayaSplited[i + 1] + ayaSplited[i + 2],
				Maddah
			);

			if (IsChar(txt, [Noon, Meem]) && ShaddahIndex >= 0 && MaddahIndex == -1) {
				const prev = GetPrev(ayaSplited, i, [Alif]);
				if (
					!(
						IsChar(ayaSplited[prev], Tanwin) ||
						(IsChar(ayaSplited[prev], Sukun) && IsChar(ayaSplited[prev - 1], [Noon, Meem]))
					)
				) {
					let start = i;
					if (IsChar(ayaSplited[i - 2], Meem) && IsChar(txt, Meem)) start -= 2; //fix for LPMQ font
					match = [
						...match,
						{
							class: 'ghunnah',
							start,
							end: i + ShaddahIndex + 2
						}
					];
				}
			}
		});
		resolve(match);
	});
};

export default Ghunnah;
