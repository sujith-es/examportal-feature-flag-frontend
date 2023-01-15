import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { EvaluateRequest } from 'src/app/models/EvaluateRequest';
import { FeatureflagService } from 'src/app/services/featureflag.service';
import { Guid } from 'guid-typescript';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  catId;
  quizzes;
  environmentName = '';
  response = null;

  constructor(private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _featureflagservice: FeatureflagService,
    private _login: LoginService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catId = params.catId;
      if (this.catId == 0) {
        console.log('Load all the quiz');

        this._quiz.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            console.log(error);
            alert('error in loading all quizzes');
          }
        );
      } else {
        console.log('Load specific quiz');

        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes);
          },
          (error) => {
            alert('error in loading quiz data');
          }
        );
      }
    });

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
        if (this.response?.match && this.response?.value=='feature-vart-red-color') {
          Swal.fire('A new feature has been enabled. Please share feeback to feeback@carynhealth.com');

          // this.environmentName = environment.envName;
          // console.log('feature MATCHED! ' + this.environmentName)
        } else {
          console.log('feature did NOT match!')
        }
      }
    );
  }
}
