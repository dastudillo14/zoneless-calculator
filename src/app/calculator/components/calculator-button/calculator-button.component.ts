import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  },
  //encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent implements OnInit {
  public isCommand = input(false, {
    transform: (value: string | boolean) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: string | boolean) =>
      typeof value === 'string' ? value === '' : value,
  });

  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }

  ngOnInit(): void {
    console.log(this.isCommand());
  }
}
