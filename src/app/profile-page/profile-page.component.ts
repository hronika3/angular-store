import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../admin/shared/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private router: Router,
              public auth: AuthService) { }

  ngOnInit(): void {
  }

}
