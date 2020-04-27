// Component Base Class
export default abstract class Component<
  HostElement extends HTMLElement,
  RenderElement extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: HostElement;
  element: RenderElement;

  constructor(
    templateId: string,
    hostElemId: string,
    insertAtStart: boolean,
    newElemId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElemId)! as HostElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as RenderElement;
    if (newElemId) this.element.id = newElemId;

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
