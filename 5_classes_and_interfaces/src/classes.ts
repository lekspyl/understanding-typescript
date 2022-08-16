// Notes:
// 1. Readonly is TS-only expression
// 2. Instead of defining properties of a class and then initializing
//    them in a constructor, they can be defined directly in constructor
//    parameters.
// 3. Whenever you create a constructor in a class that inherits from
//    another class, you have to add super in inheriting class and you
//    have to execute it as a function.
// 4. Do `super` first, then `this`!
// 5. Private properties accessible only from within class in which
//    they are defined. If we want to grant access and make sure that
//    it can't be changed from outside, we can use `protected`
//    instead of `private`.
// 6. Getter is a property where you execute a function/method to
//    retrieve a value. Getter must return something.
// 7. Setters allow to set a property, duh.
// 8. Static properties/methods are not accessible within instances of
//    the class, only from classes itself. Useful for grouping utility
//    functions. Anything that's not static can't access static stuff.
// 9. If you want to make sure that a specific method will be available
//    BUT customized in all children of a parent class, use `abstract`.
// 10. Singleton -- making sure that you have only one instance of
//     a class.

abstract class Department {
    // private readonly id: string; // 2
    // name: string; // 2
    protected employees: string[] = []; // 5

    static fiscalYear = '2020';
    constructor(protected readonly id: string, public name: string) { // 2
        // this.name = n; // 2
    }

    static createEmployee(name: string) {
        return {name: name};
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    printEmployeeInfo() {
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

class ITDepartment extends Department {
    constructor(id: string, public bosees: string[]) {
        super(id, 'IT');
    }

    describe(): void {
        console.log('IT folks ID: ' + this.id)
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport
        }
        throw new Error('No report found')
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please provide valid report')
        }
        this.addReport(value)
    }

    private constructor(id: string, private reports: string[]) { // private ensures we can't run new on this class
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    describe(): void {
        console.log('Accounting department ID: ' + this.id)
    }

    addEmployee(employee: string): void {
        if (employee === 'Alex') {
            return;
        }
        this.employees.push(employee)
    }

    addReport(text: string) {
        this.reports.push(text)
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports)
    }
}

const it = new ITDepartment('it1', ['Olena'])
// const accounting = new AccountingDepartment('acc1', [])
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance(); // same as accounting, due to singleton pattern

it.addEmployee('Oleksandr')
it.addEmployee('Oleksii')
it.printEmployeeInfo()
it.describe()
it.addEmployee('Danya')
accounting.addReport('All is good')
console.log(accounting.mostRecentReport)
accounting.mostRecentReport = 'All is even better'
console.log(accounting.mostRecentReport)
accounting.addEmployee('Alex')
accounting.addEmployee('Ivan')
accounting.describe()
it.describe()
console.log(it)
console.log(accounting)

const employee1 = Department.createEmployee('Anna')
console.log(employee1, Department.fiscalYear)
console.log(accounting)
console.log(accounting2)
