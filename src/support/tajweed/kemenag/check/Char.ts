export const Alif = 'ا';
export const AlifMaksura = 'ى';
export const Meem = 'م';
export const Wau = 'و';
export const Noon = 'ن';
export const Ya = 'ي';
export const Lam = 'ل';

export const Shaddah = 'ّ';
export const Sukun = 'ْ';
export const FatahTanwin = 'ً';
export const DhumahTanwin = 'ٌ';
export const KasrahTanwin = 'ٍ';
export const Maddah = 'ۤ';
export const Washal = 'ۙ';
export const WaqafAula = 'ۗ';
export const Blank = ' ';
export const FindCharIndex = (kalimah: string, match: string | string[]): number => {
	return kalimah.split('').findIndex((x) => x == match || match.includes(x));
};

export const IsChar = (txt: string, match: string | string[]): boolean => {
	return txt == match || match.includes(txt);
};

export const Tanwin = [FatahTanwin, DhumahTanwin, KasrahTanwin];
