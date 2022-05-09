import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearcuentaahorroPage } from './crearcuentaahorro.page';

describe('CrearcuentaahorroPage', () => {
  let component: CrearcuentaahorroPage;
  let fixture: ComponentFixture<CrearcuentaahorroPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearcuentaahorroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearcuentaahorroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
