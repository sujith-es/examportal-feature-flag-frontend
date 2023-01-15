import { Component, OnInit } from '@angular/core';
import { EvaluateRequest } from 'src/app/models/EvaluateRequest';
import { FeatureflagService } from 'src/app/services/featureflag.service';
import { Guid } from 'guid-typescript';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  environmentName = '';
  response = null;
  isAdmin = false;


  constructor(private _featureflagservice: FeatureflagService, private _login: LoginService) { }

  ngOnInit(): void {

    if(this._login.isAdmin() == 'true')  {
      this.isAdmin = true;
    }
    else
    {
      this.isAdmin = false;
    }

    let evaluateRequest: EvaluateRequest = {
      flagKey: 'feature-button-color',
      entityId: Guid.create().toString(),
      context: {
        isAdmin: this._login.isAdmin(),
        email_address: this._login.getUserEmail(),
        environment: environment.envName
      }
    };

    this._featureflagservice.evaluate(evaluateRequest).subscribe(
      (data: any) => {
        this.response = data;
        if (this.response) {

          // this.environmentName = environment.envName;
          // console.log('feature MATCHED! ' + this.environmentName)
        } else {
          console.log('feature did NOT match!')
        }
        console.log(this.response);
      }
    );
  }

}
