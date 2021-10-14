import { Blank, IsChar } from '$support/tajweed/kemenag/check/Char';

const MovePointer =
	(move = 1) =>
	(ayaSplited: string[], i: number, skippable: string[] = []) => {
		const _skippable = [Blank, ...skippable];
		let cursor = i + move;
		let end = false;
		while (!end) {
			if (IsChar(ayaSplited[cursor], _skippable)) {
				cursor += move;
			} else {
				end = true;
			}
		}
		return cursor;
	};

export const GetPrev = MovePointer(-1);

export const GetNext = MovePointer(1);
