import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombolistComponent } from './combolist.component';

describe('CombolistComponent', () => {
  let component: CombolistComponent;
  let fixture: ComponentFixture<CombolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombolistComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CombolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
