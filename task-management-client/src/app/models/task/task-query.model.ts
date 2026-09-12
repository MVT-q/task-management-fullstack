import { ProjectTaskPriority } from '../enums/project-task-priority';
import { ProjectTaskStatus } from '../enums/project-task-status';
import { TaskSortBy } from '../enums/task-sort-by';

export interface TaskQuery {
  search?: string;
  status?: ProjectTaskStatus;
  priority?: ProjectTaskPriority;
  sortBy?: TaskSortBy;
  descending?: boolean;
  page?: number;
  pageSize?: number;
}
