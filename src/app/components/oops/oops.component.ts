import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPoop } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-oops',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './oops.component.html',
  styleUrl: './oops.component.css'
})
export class OopsComponent {

  @Input() isNotFoundPage: boolean = true;
  @Input() stringTemplate: string = 'Il semble que tu sois perdu !';

  @ViewChild('card')
  card!: ElementRef;

  faPoop = faPoop;

}
