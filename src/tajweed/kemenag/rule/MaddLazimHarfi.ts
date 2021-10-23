import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { Alif, FatahMadd, IsChar, Maddah, Shaddah } from '$tajweed/kemenag/check/Char';
import { GetNext, GetPrev, GetPrevHuruf } from '$tajweed/kemenag/check/Pointer';

const MaddLazimHarfi: RuleFinder = (ayaSplited, isFirstAya) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		if (isFirstAya) {
			ayaSplited.forEach((txt, i) => {
				if (
					IsChar(ayaSplited[i], [Maddah]) &&
					// for distinguish Madd Wajib
					GetPrevHuruf(ayaSplited, i)[1] != Alif &&
					// fix for Surah Fatir
					!IsChar(ayaSplited[i - 1], FatahMadd)
				) {
					let prev = GetPrev(ayaSplited, i);
					let next = GetNext(ayaSplited, i);
					let _class: 'madd-lazim-mukhofaf-harfi' | 'madd-lazim-mutsaqal-harfi' =
						'madd-lazim-mukhofaf-harfi';
					if (IsChar(ayaSplited[prev], Shaddah)) {
						prev--;
						_class = 'madd-lazim-mutsaqal-harfi';
					}

					if (IsChar(ayaSplited[next], Shaddah)) {
						next++;
						_class = 'madd-lazim-mutsaqal-harfi';
					}

					match = [
						...match,
						{
							class: _class,
							start: prev,
							end: next - 1
						}
					];
				}
			});
		}
		resolve(match);
	});
};

export default MaddLazimHarfi;
