import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreContactComponent } from './store-contact.component';

describe('StoreContactComponent', () => {
  let component: StoreContactComponent;
  let fixture: ComponentFixture<StoreContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreContactComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
