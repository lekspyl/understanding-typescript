// This is an app that implements drag and drop functionality
// for objects (projects)

// Hints
// 1. `!` says TS that element won't be null
// 2. Type casting
//   <HTMLTemplateElement>document.getElementById('project-input')
//   Alternatively, we can write it like this:
//

// Starting by making form visible via OOP approach
// Purpose of a class is to access a form and a div and to render
// template into a div

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() { // getter will be triggered by the object in which we've defined a method
      return originalMethod.bind(this)
    }
  }
  return adjDescriptor
}

function validateInput({
  value,
  required,
  minValue,
  maxValue,
  minLength,
  maxLength
}: Validatable) {
  if (!required) {
    return true
  } else if (
    (!value) ||
    (minLength && !(minValue || maxValue) && value.length < minLength) ||
    (maxLength && !(minValue || maxValue) && value.length > maxLength) ||
    (minValue && !(minLength || maxLength) && +value < minValue) ||
    (maxValue && !(minLength || maxLength) && +value > maxValue)
  ){
    return false
  } else {
    return true
  }
}

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement
  element: HTMLElement

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement

    // import what's in elements and render it
    const importedHTMLContent = document.importNode(this.templateElement.content, true)
    this.element = importedHTMLContent.firstElementChild as HTMLElement
    this.element.id = `${this.type}-projects`

    this.attach()
    this.renderContent()
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector('ul')!.id = listId
    this.element.querySelector('h2')!.textContent = `${this.type} projects`.toUpperCase()
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element)
  }
}
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement
  element: HTMLFormElement
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement

    // import what's in elements and render it
    const importedHTMLContent = document.importNode(this.templateElement.content, true)
    this.element = importedHTMLContent.firstElementChild as HTMLFormElement
    this.element.id = 'user-input'

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

    this.configure()
    this.attach()
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 5
    }

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: false
    }

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      minValue: 1,
      maxValue: 10
    }

    if (
      !validateInput(titleValidatable) ||
      !validateInput(descriptionValidatable) ||
      !validateInput(peopleValidatable)
    ) {
      alert('Invalid input! Try again')
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      console.log(title, desc, people);
      this.clearInputs()
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element)
  }

  private clearInputs() {
    this.titleInputElement.value = ''
    this.descriptionInputElement.value = ''
    this.peopleInputElement.value = ''
  }
}

const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')
