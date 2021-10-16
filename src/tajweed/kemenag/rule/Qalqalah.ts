import type { RuleFinder } from '$contract/rule';
import type { ITajweed } from '$contract/surah';
import { Ba, Dal, IsChar, Jeem, Qaf, Sukun, Tha } from '$tajweed/kemenag/check/Char';

const Qalqalah: RuleFinder = (ayaSplited) => {
	return new Promise((resolve) => {
		let match: ITajweed[] = [];
		ayaSplited.forEach((txt, i) => {
			if (IsChar(txt, [Qaf, Tha, Ba, Jeem, Dal]) && IsChar(ayaSplited[i + 1], Sukun)) {
				match = [
					...match,
					{
						class: 'qalqalah',
						start: i,
						end: i + 1
					}
				];
			}
		});
		resolve(match);
	});
};

export default Qalqalah;
