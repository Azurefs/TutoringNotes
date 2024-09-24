import { getData } from "dataStore.js";

export function addSong(name, duration) {
	if (name === "") {
			return { error: "Name is empty"};
	}
	if (duration < 0 || duration > 10) {
			return { error: "Invalid duration" };
	}
	let data = getData();
	const songId = data.songs.length;
	data.songs.push({songId, name, duration});
	data.playlistDuration += duration;
	return { songId: songId };
}


export function editSong(songId, name, duration) {
	let data = getData();
	let song = data.songs.find(current => current.songId === songId);
	
	if (!song) {
		return { error: "Song with this Id can not be found" };
	} else if (name === "") {
		return { error: "Name is empty"};
	} else if (name === song.name) {
		return { error: "Name is the same as the existing one"};
	} else if (duration < 0 || duration > 10) {
		return { error: "Invalid duration" };
	}
	data.playlistDuration += duration - song.duration;
	song.duration = duration;
	return {}
}

// Provided functions

export function songList() {
	const data = getData();
	return { songs: data.songs };
}

export function viewDuration() {
	const data = getData();
	return { playlistDuration: data.playlistDuration };
}

export function clear() {
	getData().songs = [];
	getData().playlistDuration = 0;
}

// If you want to do it this method, it's fine as well. Just be consistent.
// export { addSong, editSong }