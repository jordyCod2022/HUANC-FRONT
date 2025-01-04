import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MConfirmacionComponent } from './m-confirmacion.component';

describe('MConfirmacionComponent', () => {
  let component: MConfirmacionComponent;
  let fixture: ComponentFixture<MConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MConfirmacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
