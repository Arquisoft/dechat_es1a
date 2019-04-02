import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {FriendsComponent} from './friends.component';
import {RdfService} from '../../services/rdf.service';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(async(() => {
    const rdfServiceStub = {
      getProfile: () => ({}),
      updateProfile: () => ({})
    };
    TestBed.configureTestingModule({
      imports: [FormsModule, ToastrModule.forRoot(),
        RouterModule, RouterTestingModule],
      declarations: [ FriendsComponent ],
      providers: [

        { provide: RdfService, useValue: rdfServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});