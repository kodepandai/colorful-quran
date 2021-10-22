import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { IsChar, Maddah, Shaddah } from '$tajweed/kemenag/check/Char';
import { GetPrev, GetPrevHuruf } from '$tajweed/kemenag/check/Pointer';

const MaddLazimMutsaqalHarfi: RuleFinder = (ayaSplited, isFirstAya) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		if (isFirstAya) {
			ayaSplited.forEach((txt, i) => {
				if (IsChar(ayaSplited[i], [Maddah])) {
					const prev = GetPrev(ayaSplited, i);
					if (IsChar(ayaSplited[prev], Shaddah)) {
						const [prevHuruf] = GetPrevHuruf(ayaSplited, prev);
						match = [
							...match,
							{
								class: 'madd-lazim-mutsaqal-harfi',
								start: prevHuruf - 2,
								end: i + 1
							}
						];
					}
				}
			});
		}
		resolve(match);
	});
};

export default MaddLazimMutsaqalHarfi;
