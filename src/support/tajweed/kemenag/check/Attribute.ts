const Shaddah = 'ّ';
const Sukun = 'ْ';
const FatahTanwin = 'ً';
const DhumahTanwin = 'ٌ';
const KasrahTanwin = 'ٍ';
const FindAttributeIndex = (kalimah: string, match: string): number => {
	return kalimah.split('').findIndex((x) => x == match);
};

const IsAttribute = (txt: string, match: string | string[]): boolean => {
	return txt == match || match.includes(txt);
};
const IsBlank = (txt: string): boolean => txt == ' ';

const IsTanwin = (txt: string): boolean =>
	IsAttribute(txt, [FatahTanwin, DhumahTanwin, KasrahTanwin]);

export { Shaddah, Sukun, FindAttributeIndex, IsAttribute, IsTanwin, IsBlank };
