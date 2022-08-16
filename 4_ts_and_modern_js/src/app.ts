const button = document.querySelector('button')

if (button) {
  button.addEventListener('click', event => console.log(event))
}

const hobbies = ['Sports', 'Cooking']
let activeHobbies = ['Hiking'];

console.log(hobbies[0])

// or
activeHobbies.push(...hobbies)
console.log(activeHobbies)
// or
activeHobbies = [...activeHobbies, ...hobbies]
console.log(activeHobbies)

const person = {
    personName: 'Alex',
    personAge: '26'
}

const copiedPerson = { ...person }

// rest parameters

const add = (...additives: number[]) => {
    return additives.reduce((currResult, currValue) => {
        return currResult + currValue;
}, 0)};

const addedNumbers = add(1, 2, 3, 4, 5)

console.log(addedNumbers)

const [hobby1, hobby2, ...remainingHobbies] = hobbies

console.log(`First hobby is ${hobby1}`)

const { personName, personAge } = person
