import * as EmailValidator from 'email-validator';
import {v4} from 'uuid';
import {format} from "date-fns";

function sharePlaylist(email) {
	if (!EmailValidator.validate(email)) {
		return { error: `invalid email: '${email}'` };
	}
	
	// Generate a unique identifier
	// Utilise npm package
	const identifier = v4();

	let timeString = format(new Date(), 'EEEE - hh:mm:ss aaa');
	return {
		identifier,
		timeString
	}
}
  
console.log(sharePlaylist('invalid@@email'));
console.log(sharePlaylist('valid@email.com'));