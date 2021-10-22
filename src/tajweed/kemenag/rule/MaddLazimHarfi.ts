import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { IsChar, Maddah, Shaddah } from '$tajweed/kemenag/check/Char';
import { GetPrev } from '$tajweed/kemenag/check/Pointer';

const MaddLazimHarfi: RuleFinder = (ayaSplited, isFirstAya) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		if (isFirstAya) {
			ayaSplited.forEach((txt, i) => {
				if (IsChar(ayaSplited[i], [Maddah])) {
					const prev = GetPrev(ayaSplited, i, [Shaddah]);
					match = [
						...match,
						{
							class: 'madd-lazim-harfi',
							start: prev,
							end: i
						}
					];
				}
			});
		}
		resolve(match);
	});
};

export default MaddLazimHarfi;
