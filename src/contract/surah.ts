export type Rule =
	'ghunnah' |
	'ikhfa' |
	'madd-wajib' |
	'madd-jaiz' |
	'hamzah-wasl' |
	'silent' |
	'madd-4-5' |
	'madd-2-4-6' |
	'madd-6' |
	'ghunnah' |
	'idgham-syafawi' |
	'ikhfa-syafawi' |
	'idgham-bighunnah' |
	'idgham-bilaghunnah' |
	'idgham-mutamatsilain' |
	'idgham-mutajanisain' |
	'iqlab' |
	'qalqalah' |
	''
export interface ITajweed {
	class: Rule;
	start: number;
	end: number;
}
export interface IAya {
	aya_id: number;
	aya_number: number;
	aya_text: string;
	sura_id: number;
	juz_id: number;
	page_number: number;
	translation_aya_text: string;
	tajweed?: ITajweed[];
}

export interface ISurah {
	id: number;
	surat_name: string;
	surat_text: string;
	surat_terjemahan: string;
	count_ayat: number;
}
