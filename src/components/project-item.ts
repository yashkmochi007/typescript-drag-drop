/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts"/>
/// <reference path="../models/drag-drop.ts"/>
/// <reference path="../models/project.ts"/>

namespace App {
  // Project Item class
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    constructor(private hostId: string, private project: Project) {
      super('single-project', hostId, false, project.id);
      this.configure();
      this.renderContent();
    }

    @autobind
    dragStartHandler(event: DragEvent) {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
      console.log('DragEnd');
    }

    configure() {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector(
        'h3'
      )!.textContent = `${this.project.persons} assigned`;
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }
}
