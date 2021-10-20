import { AlifMaksura, Blank, IsChar, IsHuruf } from '$tajweed/kemenag/check/Char';

const MovePointer =
	(move = 1) =>
	(ayaSplited: string[], i: number, skippable: string[] = []) => {
		const _skippable = [Blank, AlifMaksura, ...skippable];
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

const MovePointerToHuruf =
	(move = 1) =>
	(ayaSplitted: string[], i: number) => {
		let cursor = i + move;
		let end = false;
		while (!end) {
			if (IsHuruf(ayaSplitted[cursor])) {
				end = true;
			} else {
				cursor += move;
			}
		}
		return [cursor, ayaSplitted[cursor]] as [number, string];
	};

export const GetPrevHuruf = MovePointerToHuruf(-1);
