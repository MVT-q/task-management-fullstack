export interface ProjectTask {
  id: number;
  title: string;
  description: string;
  status: number;
  priority: number;
  dueDate: string | null;
  assigneeId: number | null;
  assigneeUsername: string | null;
}
