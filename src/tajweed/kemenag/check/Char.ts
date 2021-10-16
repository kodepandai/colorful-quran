export const AlifMaksura = 'ى';
export const Alif = 'ا';
export const Ba = 'ب';
export const Ta = 'ت';
export const Tsa = 'ث';
export const Jeem = 'ج';
export const Cha = 'ح';
export const Kha = 'خ';
export const Dal = 'د';
export const Dhal = 'ذ';
export const Ra = 'ر';
export const Za = 'ز';
export const Sin = 'س';
export const Syin = 'ش';
export const Shad = 'ص';
export const Dhad = 'ض';
export const Tha = 'ط';
export const Dza = 'ظ';
export const Ain = 'ع';
export const Gain = 'غ';
export const Fa = 'ف';
export const Qaf = 'ق';
export const Kaf = 'ك';
export const Lam = 'ل';
export const Meem = 'م';
export const Noon = 'ن';
export const Wau = 'و';
export const Ha = 'ه';
export const Hamzah = 'ء';
export const HamzahWau = 'ٔ';
export const HamzahYa = 'ٕ';
export const Ya = 'ي';

export const Shaddah = 'ّ';
export const Sukun = 'ْ';
export const FatahTanwin = 'ً';
export const DhumahTanwin = 'ٌ';
export const KasrahTanwin = 'ٍ';
export const Maddah = 'ۤ';
export const MaddahShort = 'ٓ';
export const Washal = 'ۙ';
export const WaqafAula = 'ۗ';
export const WaqafJaiz = 'ۚ';
export const WaqafLazim = 'ۢ';
export const Blank = ' ';
export const FindCharIndex = (kalimah: string, match: string | string[]): number => {
	return kalimah.split('').findIndex((x) => x == match || match.includes(x));
};

export const IsChar = (txt: string, match: string | string[]): boolean => {
	return txt == match || match.includes(txt);
};

export const Tanwin = [FatahTanwin, DhumahTanwin, KasrahTanwin];
