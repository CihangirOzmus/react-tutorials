const address = ['1299 Cumhuriyet Sk.', 'Istanbul', 'Uskudar', '34675'];
//console.log(`You are in ${address[1]} ${address[2]}.`);

//matching by position
// give empty for the one which I dont want
// if there is no third item, default item will be used
const [, city, state = 'London'] = address;
console.log(`You are in ${city} ${state}.`);

// spread operator to create new arrays from old ones
const names = ['Cihangir', 'Serhat'];
names.push('Jen');
names.concat('Julie');
console.log([...names, 'Mike']);
console.log(['Adam', ...names, 'Mike']);
