import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForengineeerComponent } from './forengineeer.component';

describe('ForengineeerComponent', () => {
  let component: ForengineeerComponent;
  let fixture: ComponentFixture<ForengineeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForengineeerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForengineeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
