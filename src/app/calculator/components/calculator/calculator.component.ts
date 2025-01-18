import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  viewChildren,
} from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent {
  private calculatorService = inject(CalculatorService);

  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  // get resultText() {
  //   return this.calculatorService.resultText;
  // }

  public resultText = computed(() => this.calculatorService.resultText());

  public subResultText = computed(() => this.calculatorService.subResultText());

  public lastOperator = computed(() => this.calculatorService.lastOperator());

  handleClick(key: string) {
    console.log(key);
    this.calculatorService.constructNumber(key)
  }

  //@HostListener('document:keyup',['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const { key } = event;

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      '*': 'x',
      '/': '÷',
      Enter: '=',
    };

    const newKey = keyEquivalents[key] ?? key;

    this.handleClick(key);
    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(newKey);
    });
  }
}
