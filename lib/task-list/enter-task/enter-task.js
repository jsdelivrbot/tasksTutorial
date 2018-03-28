import {Component, Output, EventEmitter, ViewEncapsulation} from '@angular/core';
import template from './enter-task.html!text';

@Component({
	selector: 'ngc-enter-task',
	host: {
		class: 'enter-task'
	},
	template,
	encapsulation: ViewEncapsulation.None,
})

export class EnterTask{
	@Output() taskEntered = new EventEmitter();
	
	enterTask(titleInput) {
		this.taskEntered.next(titleInput.value);
		titleInput.value = '';
		titleInput.focus();
	}

}


