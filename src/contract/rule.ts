import type { ITajweed } from '$contract/surah';

export type RuleFinder = (ayaSplited: string[], isFirstAya?: boolean) => Promise<ITajweed[]>;
