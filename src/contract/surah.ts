export interface ITajweed {
	class: string;
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
