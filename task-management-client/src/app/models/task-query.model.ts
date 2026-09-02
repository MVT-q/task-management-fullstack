import { ProjectTaskPriority } from './project-task-priority';
import { ProjectTaskStatus } from './project-task-status';
import { TaskSortBy } from './task-sort-by';

export interface TaskQuery {
  search?: string;
  status?: ProjectTaskStatus;
  priority?: ProjectTaskPriority;
  sortBy?: TaskSortBy;
  descending?: boolean;
  page?: number;
  pageSize?: number;
}
