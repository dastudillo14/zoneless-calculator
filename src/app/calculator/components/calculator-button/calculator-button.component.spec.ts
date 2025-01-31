import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  template: `
    <calculator-button>
      <span class="underline">TestContent</span>
    </calculator-button>
  `,
})
class TestHostComponent {}

describe('CalculatorButtonComponent', () => {
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 if doubleSize is false', () => {
    const hostCssClass: string[] = compiled.classList.value.split(' ');

    expect(hostCssClass).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-1/4 if doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();

    const hostCssClass: string[] = compiled.classList.value.split(' ');

    expect(hostCssClass).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onclick when handleClick is called', () => {
    //Espias
    spyOn(component.onClick, 'emit');

    component.handleClick();

    //Revisa que haya sdo llamdo
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then false when keyboardPressedStyle is called with a matching key', (done) => {
    component.contentValue()!.nativeElement.innerText = '1';

    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBeTrue();

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 101);
  });

  it('should not set isPressed to true aif key is not matching', () => {
    component.contentValue()!.nativeElement.innerText = '1';

    component.keyboardPressedStyle('2');

    expect(component.isPressed()).toBeFalse();
  });

  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);
    const compiled = testHostFixture.nativeElement as HTMLDivElement;

    const element = compiled.querySelector('.underline');

    expect(element).not.toBeNull();
    expect(element?.classList.contains('underline')).toBeTrue();
  });
});
