// 1. Interface describes the structure of an object.
//    Interfaces are TS-only term. Interface are meant
//    to describe objects.
//    Interfaces can act as contracts for classes.
// 2. Interfaces are useful if we want to ensure the
//    structure of classes.
// 3. Inside interface you can mark a property readonly.
//    Public/private are not available.
// 4. Interfaces can also be used to describe function types.
// 5. Interfaces can have optional properties.

// Function type:
type AddFunction = (arg1: number, arg2: number) => number;

let add: AddFunction;

add = (n1: number, n2: number) => {
    return n1 + n2;
}
//

// Interface for function
interface AddFn {
    (a: number, b: number): number;
}

let add2: AddFn

add2 = (n1: number, n2: number) => {
    return n1 + n2;
}
//

interface Named {
    readonly name: string;
    outputName?: string; // optional property, might exist but doesn't have to
}

interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string;

    constructor(n: string) {
        this.name = n
    }

    greet(phrase: string) {
        console.log(this.name + ' says: ' + phrase)
    }
}

let user1: Greetable
user1 = new Person('Sasha')

user1.greet('booyaka!')
console.log(user1)

console.log(add(3, 5))
console.log(add2(5, 5))
