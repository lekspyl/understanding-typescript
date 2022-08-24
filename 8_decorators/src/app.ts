// Decorators useful for meta-programming - they're
// well-suited for writing code that is useful for
// other developers.
// 1. Decorators are about classes
// 2. Decorator is just a function
// 3. Decorator factory returns decorator function but allows us to
//    configure it while adding
// 4. The anonymous functions in multiple decorators are executed
//    from bottom to top, but the decorator's code executes from top
//    to bottom.
// 5.

// nice to capitalise decorators
function Logger(target: Function) {
    console.log('Logging...')
    console.log(target)
}

function LoggerFactory(logString: string) {
    return function(target: Function) {
        console.log(logString)
        console.log(target)
    }
}

function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        console.log('Rendering template');

        const element = document.getElementById(hookId);
        const p = new constructor();
        if (element) {
            element.innerHTML = template
            element.querySelector('h1')!.textContent = p.name
        }
    }
}

// @Logger
@LoggerFactory('Booyaka!')
@WithTemplate('<h1>My Object</h1>', 'app')
class Person {
    name = 'Alex';

    constructor() {
        console.log('Creating person object')
    }

}

const person = new Person();

console.log(person)

// 7
// ---
// if adding decorator to a property, it expects 2 args:
// target of the property (prototype for the instance or constructor function for a static one)
// name of the member
function Log(target: any, propertyName: string) {
    console.log('Property decorator!')
    console.log(target);
    console.log(propertyName);
}

// beside properties gecorators can be added to accessors (getters/setters)
// they accept 3 args: target, name,
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('accessor decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// method decorators
// args the same as for accessors
function Log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

// param decorator
// name arg is the name of the method in which we've used the param
// position is the placement of an argument
function Log4(target: any, name: string, position: number) {
    console.log('param decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price')
        }
    }
    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax)
    }
}

// 8 order of decorators
// 1. They run w/o instantiating the class – decorators for class will only run once, on class definition

// 9. returning/changing class in a decorator
// This allows to add extra logic to run when the class is instantiated, compared to previous examples
// where decorator logic runs on class definition
function WithTemplate2(template: string, hookId: string) {
    return function<T extends { new(...args: any[]): {name: string} }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const element = document.getElementById(hookId);
                if (element) {
                    element.innerHTML = template
                    element.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}

// @Logger
@LoggerFactory('Booyaka!')
@WithTemplate2('<h1>My Object</h1>', 'app')
class Person2 {
    name = 'Oksana';

    constructor() {
        console.log('Creating person object')
    }

}

const person2 = new Person2();

console.log(person)

// 10. Other decorator return types
// Decorators added to methods to accessors can return something
// while prop/param decorators do not used to return

// 11. Autobind Decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() { // getter will be triggered by the object in which we've defined a method
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor
}

class Printer {
    message = 'This works';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer()

const button = document.querySelector('button')!

// this doesn't work bc this. is referring to the target of the event
// button.addEventListener('click', p.showMessage)
button.addEventListener('click', p.showMessage) // binding works as a workaround

// 12, 13. Validation with decorators
interface ValidatorConfig {
    [property: string]: {
        [validatableProperty: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {}

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    }
}

function PosNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name]
    if (!objValidatorConfig) {
        return true
    }
    let isValid = true
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            console.log(validator);
            switch (validator) {
                case 'required':
                    console.log(`title: ${obj.prop}, is true: ${!!obj.prop}`)
                    isValid = isValid && !!obj[prop]
                    break
                case 'positive':
                    isValid = isValid && obj[prop] > 0
                    break
            }
        }
    }
    return isValid
}

class Course {
    @Required
    title: string
    @PosNumber
    price: number

    constructor(t: string, p: number) {
        this.title = t
        this.price = p
    }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', event => {
    event.preventDefault()
    const titleEl = document.getElementById('title') as HTMLInputElement
    const priceEl = document.getElementById('price') as HTMLInputElement

    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title, price)

    console.log(createdCourse);

    if (!validate(createdCourse)) {
        alert('Oh noo, bad input')
        return
    }
    console.log(createdCourse);

})
