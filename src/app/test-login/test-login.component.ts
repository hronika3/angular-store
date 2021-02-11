import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../shared/services/userAuth.service';
import {AuthService} from '../admin/shared/services/auth.service';

@Component({
  selector: 'app-test-login',
  templateUrl: './test-login.component.html',
  styleUrls: ['./test-login.component.scss']
})
export class TestLoginComponent implements OnInit {

  constructor(
  ) { }


  ngOnInit() { }

}
