const size = 10;

const message = 'Welcome to COMP1531!';
console.log(message);

console.log(`Numbers from 1 to ${size}`);

for (let num = 1; num <= size; num++) {
	print_parity(num);
}

function print_parity(num) {
	if (num % 2 === 0) {
		console.log(`Even: ${num}`);
	} else {
		console.log(`Odd: ${num}`);
	}
}