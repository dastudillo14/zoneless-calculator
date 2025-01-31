import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';

describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should set resultText to "0" when C is pressed', () => {
    service.resultText.set('123');
    service.subResultText.set('1');
    service.lastOperator.set('-');

    service.constructNumber('C');

    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });

  it('should update restultText wiht input number', () => {
    service.constructNumber('1');
    expect(service.resultText()).toBe('1');
  });

  it('should handle operators correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+');

    expect(service.lastOperator()).toBe('+');
  });

  it('should calculate resutl correctly for addition', () => {
    service.constructNumber('1');
    service.constructNumber('+');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('3');
  });

  it('should calculate resutl correctly for substraction', () => {
    service.constructNumber('5');
    service.constructNumber('-');
    service.constructNumber('1');
    service.constructNumber('=');

    expect(service.resultText()).toBe('4');
  });

  it('should calculate resutl correctly for multiple', () => {
    service.constructNumber('5');
    service.constructNumber('*');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('10');
  });

  it('should calculate resutl correctly for division', () => {
    service.constructNumber('4');
    service.constructNumber('/');
    service.constructNumber('2');
    service.constructNumber('=');

    expect(service.resultText()).toBe('2');
  });

  it('should handle decimal point correctly', () => {
    service.constructNumber('4');
    service.constructNumber('.');
    service.constructNumber('5');

    expect(service.resultText()).toBe('4.5');

    service.constructNumber('.');
    expect(service.resultText()).toBe('4.5');
  });

  it('should handle decimal point correctly starting with 0', () => {
    service.constructNumber('0');
    service.constructNumber('.');
    service.constructNumber('0');

    expect(service.resultText()).toBe('0.0');

    service.constructNumber('.');
  });

  it('should handle sign change correctly', () => {
    service.constructNumber('1');
    service.constructNumber('+/-');
    expect(service.resultText()).toBe('-1');

    service.constructNumber('+/-');

    expect(service.resultText()).toBe('1');
  });

  it('should handel Backspace correctly', () => {
    service.resultText.set('123');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('12');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('1');
    service.constructNumber('Backspace');
    expect(service.resultText()).toBe('0');
  });


  it('should handle maxlength correctly', () => {
    for(let i = 0 ; i < 10; i++){
      service.constructNumber('1')
    }
    expect(service.resultText().length).toBe(10);
    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);


  });
});
