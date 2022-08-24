// Instead of explicitly defining the exact type and structure of
// variables/objects we can use generics to vaguely define what we
// expect to work with and make TS evaluate what exactly can be
// done with the data (similar to `object` type being more meaningful
// to TS than `any`.
// In the function `merge` we do:
// 1. Define generics by adding `<T extends object, U extends object>`
//    and assigning these types to func's arguments.
// 2. To make TS understand that these two generic types T and U must
//    be objects we add `extends object`, this way TS will know that
//    not only T and U are different entities, but also both of them
//    at least must be objects.
// 3. `<U extends keyof T>` instructs TS that U must be within T's keys.
// Summary: generics provide flexibility combined with type safety.
// 4. `Partial<T>` instructs TS that in the end an entity will have type T,
//    but initially is not (thus Partial with optional T's values).
// 5. Generic types are cool when you want to lock in a certain type:
//    use the same type for the entire function
function merge<T extends object, U extends object>(a: T, b: U) {
    return Object.assign(a, b);
}

const mergedObj = merge({name: 'Alex', hobbies: ['raving']}, {age: 30})
// const mergedObj2 = merge({name: 'Alex', hobbies: ['raving']}, 30) // 2

console.log(mergedObj.name)

interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value';
    if (element.length === 1) {
        descriptionText = 'Got 1 element'
    } else if (element.length === 2) {
        descriptionText = 'Got 2 elements'
    } else {
        descriptionText = `Got ${element.length} elements`
    }
    return [element, descriptionText]
}

console.log(countAndDescribe('Hi there!'))
console.log(countAndDescribe(['sex', 'drugs', 'rocknroll']))
// console.log(countAndDescribe(1000)) // number type doesn't have length property

// keyof
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) { // 3
    return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({name: 'Sasha'}, 'name'))

// generic classes
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('hello')
textStorage.addItem('world')
textStorage.removeItem('hello')
// textStorage.addItem(23) // TS expects to see string here
console.log(textStorage.getItems())

const numberStorage = new DataStorage<number>();

// object storage wont work as we've set type constraint only to
// primitives as our removeItem method doesn't properly work with
// objects
// const objStorage = new DataStorage<object>;
// objStorage.addItem({name: 'Sasha'})
// objStorage.addItem({name: 'Oksana'})
// // ...
// objStorage.removeItem({name: 'Sasha'})
// console.log(objStorage.getItems())

// generic utility types
interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

// Partial type
function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    // return {title: title, description: description, completeUntil: date}
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date
    return courseGoal as CourseGoal
}

// Readonly type
const names: Readonly<string[]> = ['Sasha', 'Vadym']
// names.push('Nika') // these are not allowed because we have
// names.pop()        // mentioned that this value is 'readonly'

// Generic types & union types confusion
