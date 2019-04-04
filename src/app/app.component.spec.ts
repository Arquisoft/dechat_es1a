import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {CardComponent} from './card/card.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserModule} from '@angular/platform-browser';
import {ToastrModule, ToastrService} from 'ngx-toastr';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
          CardComponent


      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [BrowserModule,
        FormsModule,
        ToastrModule.forRoot(),
        RouterModule,
        RouterTestingModule],
      providers: [ToastrService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
});
