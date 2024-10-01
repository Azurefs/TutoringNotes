function sum(num1: number, num2: number): number {
	return num1 + num2;
}

function isEven(num: number): boolean {
	if (num % 2 === 0) {
		return true;
	}
	return false;
}

function sumArray(numbers: number[]): number {
	return numbers.reduce((a, b) => a + b, 0);
}

// ========================================
// Note: I would recommend moving your interface declarations into a new file
//  I have not for the sake of this exercise but I would recommend it for your assignment
// ========================================

// Create an interface - Essentially a C Struct
// 	to outline the types of the object properties
interface User {
	name: string,
	email: string,
	userId: number
}

// Create an interface for Error Objects
interface ErrorObj {
	error: string
}

interface UserId {
	userId: number
}

// Both of these work for array type declaration
// const users: Array<User> = [];
const users: User[] = [];

// Use '|' when you have multiple return types
function createUser(email: string, name: string): ErrorObj | UserId {
	if (email === '' || name === '') {
		return { error: 'empty email and/or name' };
	}

	const id = Math.floor(Math.random() * 90000) + 10000;

	users.push({
		name: name,
		email: email,
		userId: id
	});

	return { userId: id };
}

function getUser(userId: number): ErrorObj | User {
	const user = users.find((user) => user.userId === userId);
	if (!user) {
		return { error: 'Invalid userId' };
	}
	return user;
}

// Type script will prevent compilation of broken code
// console.log(sum('1', '2'));
// console.log(sum(1, 2));

// console.log(sumArray(['a', 'd', 'c']));
// console.log(sumArray([1, 2, 3, 4, 5]));

// console.log(isEven(2));
// console.log(isEven('two'));

// let user1 = createUser('valid@email.com', 'user1');
// console.log(user1);
// console.log(getUser(user1.userId));

// let user2 = createUser('valid2@email.com', 1337);
// console.log(user2);
// console.log(getUser(user2.userId));

// let user3 = createUser({ email: 'valid3@email.com'}, 56);
// console.log(user3);
// console.log(getUser(user3.userId));
