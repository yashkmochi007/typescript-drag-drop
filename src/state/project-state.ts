import { Project, ProjectStatus } from '../models/project';

// Project State
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      new Date().getTime().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    this.callListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const selectedProject = this.projects.find((p) => p.id === projectId);
    if (selectedProject && selectedProject.status !== newStatus) {
      selectedProject.status = newStatus;
      this.callListeners();
    }
  }

  callListeners() {
    this.listeners.forEach((listener) => {
      listener(this.projects.slice());
    });
  }
}

export const projectState = ProjectState.getInstance();
