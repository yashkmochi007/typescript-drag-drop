/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../state/project-state.ts" />
/// <reference path="../models/drag-drop.ts"/>
/// <reference path="../models/project.ts"/>

namespace App {
  // ProjectList class
  export class ProjectList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.configure();
      this.renderContent();
    }

    @autobind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer?.types[0] === 'text/plain') {
        event.preventDefault();
        const ulElem = this.element.querySelector('ul')!;
        ulElem.classList.add('droppable');
      }
    }

    @autobind
    dropHandler(event: DragEvent): void {
      const prjId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        prjId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @autobind
    dragLeaveHandler(_: DragEvent): void {
      const ulElem = this.element.querySelector('ul')!;
      ulElem.classList.remove('droppable');
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('drop', this.dropHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);

      projectState.addListener((projects: Project[]) => {
        this.assignedProjects = projects.filter(
          (project) =>
            project.status ===
            (this.type === 'active'
              ? ProjectStatus.Active
              : ProjectStatus.Finished)
        );
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector(
        'h2'
      )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    private renderProjects() {
      const listEl = this.element.querySelector(
        `#${this.type}-projects-list`
      )! as HTMLUListElement;
      listEl.innerHTML = '';
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(`${this.type}-projects-list`, prjItem);
      }
    }
  }
}
