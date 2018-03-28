import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from './task-list';
import { EnterTask } from './enter-task/enter-task';
import { Task } from './task/task';


@NgModule({
	declarations: [TaskList, Task, EnterTask],
	imports: [CommonModule],
	exports: [TaskList],
})
export class TaskListModule {}