import type { ITajweed } from "$contract/surah";

export type RuleFinder = (ayaSplited: string[]) => Promise<ITajweed[]>