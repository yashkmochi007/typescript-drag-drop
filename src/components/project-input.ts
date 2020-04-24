/// <reference path="base-component.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts" />

namespace App {
  // ProjectInput class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');

      this.titleInputElement = this.element.querySelector(
        '#title'
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        '#description'
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        '#people'
      ) as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    private clearInputs() {
      this.titleInputElement.value = '';
      this.descriptionInputElement.value = '';
      this.peopleInputElement.value = '';
    }

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidateTable: Validatable = {
        required: true,
        value: enteredTitle,
      };
      const descriptionValidateTable: Validatable = {
        required: true,
        value: enteredDescription,
        minLength: 5,
      };
      const peopleValidateTable: Validatable = {
        required: true,
        value: +enteredPeople,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidateTable) ||
        !validate(descriptionValidateTable) ||
        !validate(peopleValidateTable)
      ) {
        alert('Invalid input, please try again!');
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
      }
    }
  }
}
