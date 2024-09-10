let userData = [
	{
		name: 'Jack',
		age: 20,
		height: 187,
	},
	{
		name: 'Jill',
		age: 19,
		height: 168,
	},
	{
		name: 'Jason',
		age: 23,
		height: 194,
	},
];

//////////////////////////////// PART 1: Style ////////////////////////////////

// Is there someone taller than 190cm? What about 195cm?
let flag = true;
for (let i in userData){
  if (userData[i].height > 190) {
      console.log(true);
      flag = false;
  }
}
if (flag) {
    console.log(false);
}

// What is Jason's age?
let jason;
for (let user of userData) {
    if (user.name === 'Jason') {
      jason = user;
    }
}
console.log(`Jasons age is: ${jason.age}`);

// What's the average height of all users?
let totalHeight = 0;

for (let i = 0; i < userData.length; i++) {
	totalHeight += userData[i].height;
}
let avgHeight = totalHeight / userData.length
console.log(avgHeight);

//////////////////////////// PART 2: Array Methods ////////////////////////////

// Check whether there is a user with height larger that 180
console.log(userData.some(user => user.height > 180));

// Check whether there is a user called Jason
let jasonObj = userData.find(user => user.name === "Jason");
if (jasonObj) {
	console.log(`Jason's age is ${jasonObj.age}`);
} else {
	console.log("Jasons data is not available");
}

// Find the average height
console.log(userData.reduce((a, b) => a + b.height, 0) / userData.length);

//////////////////////////// PART 3: Array Manipulation  ////////////////////////////

// how do we add a user called Jarrod, aged 19 and with a height of 162?
userData.push({
	name: 'Jarrod',
	age: 19,
	height: 162
})
console.log(userData);

// how do we remove Jason from the array? (hint: we found jason above)

userData.splice(userData.indexOf(jasonObj), 1);
console.log(userData);

// make a copy of the array?

// Shallow Copy - Will not Create new objects/arrays within the array
let newUserData = [...userData]

// Deep Copy - Will Create new objects/arrays within the array
let newUserData2 = structuredClone(userData);
