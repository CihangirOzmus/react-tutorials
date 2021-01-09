const person = {
    name: 'Cihangir',
    age: 36,
    location: {
        city: 'Istanbul',
        temp: 36
    }
};

//console.log(`${person.name} is ${person.age}.`);
//const name = person.name;
//const age = person.age;

//default value with renaming, matching by name
const {name: firstName = 'Anonymous', age} = person;
console.log(`${firstName} is ${age}.`);

// if (person.location.city && person.location.temp){
//     console.log(`It's ${person.location.temp} in ${person.location.city}.`);
// }

//renaming with obj destructuring
const {city, temp: temperature} = person.location;
if (city && temperature) {
    console.log(`It's ${temperature} in ${city}.`);
}

// object spread operator
// new attributes has to come after object spread
const user = {
    name: 'Jen',
    age: 24
};

console.log({
    ...user,
    location: 'Istanbul',
    age: 27
});