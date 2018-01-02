import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Register } from '../../models/register';
import { Login } from '../../models/login';
import { UserResponse } from '../../models/userResponse';
import { Md5 } from 'ts-md5/dist/md5';

// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { appConfig } from '../../config/app.config';

@Injectable()
export class UserService {
  private static readonly userUrl =  appConfig.apiUrl + '/users/api/';

  constructor(private http: Http) { }

  errors: any;

  register(model: Register): Observable<UserResponse> {
    const url = UserService.userUrl + 'register';

    var postModel = new Register();
    for(var key in model) {
      postModel[key] = model[key];
    }
    postModel.password = Md5.hashStr(postModel.password.toString()).toString();
    return this.http.post(url, postModel).map((res: Response) => {
      const data = res.json() as UserResponse;
      if(data.errors) {
        this.errors = data.errors;
      }
      else if(data.success) {
        var loginModel = new Login();
        loginModel.username = model.username;
        loginModel.password = model.password;
        return this.login(loginModel);
      }
      return data;
    }).catch((err: Response) => Observable.of(err.json()));
  }

  login(model: Login): Observable<UserResponse> {
    const url = UserService.userUrl + 'login';

    var postModel = new Login();
    for(var key in model) {
      postModel[key] = model[key];
    }
    postModel.password = Md5.hashStr(postModel.password.toString()).toString();
    return this.http.post(url, postModel).map((res: Response) => {
      const data = res.json() as UserResponse;
      if(data.errors) {
        this.errors = data.errors;
      }
      else if(data.success) {
        localStorage.setItem('currentUser', JSON.stringify(data.user));
      }
      return data;
    }).catch((err: Response) => Observable.of(err.json()));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAnUserLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
