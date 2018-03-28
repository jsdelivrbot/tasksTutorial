import {Component, ViewEncapsulation} from '@angular/core';
import template from './task-list.html!text';

@Component({
	selector: 'ngc-task-list',
	host: {
		class: 'task-list'
	},
	template,
	encapsulation: ViewEncapsulation.None,
})

export class TaskList{
	constructor() {
		this.tasks = [
		{title: 'Zad1', done: false},
		{title: 'Zad2', done: true}
		];
	}
	addTask(title){
		this.tasks.push({title, done: false});
	}
}


