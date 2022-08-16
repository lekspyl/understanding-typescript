// 1. Discriminated unions – a pattern, available with object types

type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Alex',
    privileges: ['ADMIN'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Unversal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo (emp: UnknownEmployee) {
    console.log(`Name: ${emp.name}`)
    if ('privileges' in emp) {
        console.log(`Privileges: ${emp.privileges}`)
    }
    if ('startDate' in emp) {
        console.log(`Start date: ${emp.startDate}`)
    }
}

printEmployeeInfo(e1)
printEmployeeInfo({name: 'Nata', startDate: new Date()})

class Car {
    drive() {
        console.log('Driving...')
    }
}

class Truck {
    drive() {
        console.log('Trucking...')
    }

    loadCargo(amount: number) {
        console.log('Loading cargo... ' + amount)
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // if ('loadCargo' in vehicle) {
    //     vehicle.loadCargo(1000);
    // }
    // or use this:
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// 1
interface Bird {
    kind: 'bird'
    flyingSpeed: number;
}

interface Horse {
    kind: 'horse'
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.kind) {
        case 'bird':
            speed = animal.flyingSpeed;
            console.log('Flying with speed: ' + speed);
            break;
        case 'horse':
            speed = animal.runningSpeed;
            console.log('Running with speed: ' + speed);
    }
}

moveAnimal({kind: 'bird', flyingSpeed: 13})



// typecasting
// first method: prepend with <type>. Not used by React as it's reserved by JSX stuff
const userInputElement = <HTMLInputElement>document.getElementById('user-input');
// second method:
const userInputElement2 = document.getElementById('user-input')! as HTMLInputElement;

userInputElement.value = 'Hi there!';
userInputElement2.value = 'Hi there2!';

// index types
interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a letter' }
    [prop: string]: string
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must start with a letter'
};

// function overloads -- allows to define multiple function signatures for a specific function
function add2(a: number, b: number): number // overloading
function add2(a: string, b: string): string // overloading
function add2(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add2('Oleksandr', 'Pylypenko')
result.split(' ') // doesn't error because we've added func overloads

// optional chaining
const fetchedUserData = {
    id: 'id2',
    name: 'Oleksandr',
    job: {title: 'Dummy', description: 'Not a real worker'}
}

console.log(fetchedUserData?.job?.title)

// nullish coalescing
const userInput = null;
const storedData = userInput || 'default'; // fall back if userInput is falsy (0, '', null, undefined etc.)
const userInput2 = 0
const storedDataCoalesce = userInput2 ?? 'default' // fall back if userInput is null/underfined

console.log(storedData)
console.log(storedDataCoalesce)
