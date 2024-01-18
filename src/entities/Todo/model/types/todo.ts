export interface TodoColumn {
  id: number;
  order: number;
  name: string;
}

export interface Todo {
  id: number;
  task: string;
  columnId: number;
  order: number;
}
