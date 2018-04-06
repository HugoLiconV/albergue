import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  myControl: FormControl = new FormControl();

  options = [
    'One',
    'Two',
    'Three'
   ];

  constructor() { }

  ngOnInit() {
  }

}
