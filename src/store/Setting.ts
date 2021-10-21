import { writable } from 'svelte/store';
import { browser } from '$app/env';

interface ISetting {
	last_read_surah: string;
	last_read_aya: string;
}

const defaultSetting: ISetting = {
	last_read_aya: '',
	last_read_surah: ''
};
export const Setting$ =
	typeof window !== 'undefined'
		? writable<ISetting>(JSON.parse(window.localStorage.getItem('setting')) || defaultSetting)
		: writable<ISetting>(defaultSetting);
Setting$.subscribe((val) => {
	if (browser) {
		localStorage.setItem('setting', JSON.stringify(val));
	}
});
