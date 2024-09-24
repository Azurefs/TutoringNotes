import { addSong, clear, editSong, songList, viewDuration } from "./playlist";
// Importing the functions so we can use them in this file!

beforeEach(()=> {
	clear();
	// We want to clear before running each test to make sure
	// that the tests are independent from each other
})

describe('addSong', () => {
	// test.todo('Test for addSong errors');
	test('Name is an empty String', () =>  {
		expect(addSong("", 5)).toStrictEqual({ error: expect.any(String) });
		// We want to use `expect.any(String)` since the interface doesn't specify
		// an Error message
	})

	test('Duration is less than 0', () => {
		expect(addSong("hello", -5)).toStrictEqual({ error: expect.any(String) });
	})

	test('Duration is larger than 10', () => {
		expect(addSong("hello", 11)).toStrictEqual({ error: expect.any(String) });
	})

	test('Add song succeeds!', () => {
		// We should always have a test case scenario!
		let addSongResult = addSong("hello", 5);
		expect(addSongResult).toStrictEqual({ songId: expect.any(Number) });
		
		// Test for side effects - Did it actually add to the playlist?
		expect(songList()).toStrictEqual({ songs: [{
			songId: addSongResult.songId,
			name: "hello",
			duration: 5
		}] });
		expect(viewDuration().playlistDuration).toStrictEqual(5);
	})

	test.todo('Add more expansive tests. E.g Two songs added, Two songs with same name, different durations');
	// You want to test more times than I have here!
});


describe('editSong', () => {
	let songId;
	beforeEach(() => {
		songId = addSong('song1', 5).songId;
	})

	test('songId isnt a valid song', () => {
		expect(editSong(songId + 1, 'no', 5)).toStrictEqual({ error: expect.any(String) });
	})

	test('song name has empty string', () => {
		expect(editSong(songId, '', 5)).toStrictEqual({ error: expect.any(String) });
	})

	test('song name is the same as an existing name', () => {
		expect(editSong(songId, 'song1', 5)).toStrictEqual({ error: expect.any(String) });
	})

	test('duration is less than 0', () => {
		expect(editSong(songId, 'song2', -1)).toStrictEqual({ error: expect.any(String) });
	})

	test('duration is greater than 10', () => {
		expect(editSong(songId, 'song2', 11)).toStrictEqual({ error: expect.any(String) });
	})

	test('Successful Edit', () => {
		expect(editSong(songId, 'song2', 7)).toStrictEqual({});
		// Make sure to verify side effects - ESPECIALLY when you have the same
		// return object - empty object
		expect(viewDuration().playlistDuration).toStrictEqual(7);
	})

	test.todo('Test more extensively for success cases for editSong');
	// E.g What if you editted again. What if you editted and created another song
	// What if you editted two different songs
});

