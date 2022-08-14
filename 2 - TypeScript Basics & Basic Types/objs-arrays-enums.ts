const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;
// or use Enum:
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
};

const person = {
    name: 'Oleksandr',
    age: 30,
    hobbies: ['Dancing', 'Driving', 'Dying'],
    role: Role.ADMIN
};

if (person.role === Role.ADMIN) {
    console.log('Person is an admin')
}

// 10: tuples
// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string]; // tuple

// } = {
//     name: 'Oleksandr',
//     age: 30,
//     hobbies: ['Dancing', 'Driving', 'Dying'],
//     role: [2, 'devops'] // this shall be tuple
// };
// person.role.push('admin') // TS doesn't care about adding new element
// person.role[1] = 10 // as well as setting integer where we want string
// person.role = [0, 'admin', 'user']
// EOF10

console.log(`${person.name} has these hobbies: ${person.hobbies}`);

for (const hobby of person.hobbies){
    console.log(hobby.toUpperCase())
}
