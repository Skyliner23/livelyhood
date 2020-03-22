import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestDatabasePage } from './test-database.page';

describe('TestDatabasePage', () => {
  let component: TestDatabasePage;
  let fixture: ComponentFixture<TestDatabasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDatabasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestDatabasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
