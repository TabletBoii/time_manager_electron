export interface ToDo {
    id: number;
    name: string;
    desc: string;
    todo_when: string;
    status: string;
}

export interface ToDoSchema {
    todoData?: ToDo;
}