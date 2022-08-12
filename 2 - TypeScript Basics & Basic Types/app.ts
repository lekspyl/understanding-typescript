const person = {
    name: 'Oleksandr',
    age: 30,
    hobbies: ['Dancing', 'Driving', 'Dying']
};

console.log(`${person.name} has these hobbies: ${person.hobbies}`);

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase())
}
