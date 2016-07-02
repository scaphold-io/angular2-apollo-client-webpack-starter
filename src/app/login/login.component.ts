import { Component, OnInit } from '@angular/core';
import {GraphQLResult} from 'graphql';
import {AuthService, IScapholdUserInput} from '../shared';

@Component({
    selector: 'scaphold-login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    errors: Array<Error>;
    user: IScapholdUserInput;
    auth: any;

    constructor(auth: AuthService) {
        this.auth = auth;
        this.user = {
            username: '',
            password: ''
        };
    }

    ngOnInit() {
        // Do stuff after the component template is done loading.
    }

    login() {
        // this.loginUser refers to the mutation we defined in the
        // @Apollo decorator function 
        this.auth.login(this.user)
        .then((result: GraphQLResult) => {
            const { errors, data } = result;
            if (errors) {
                this.errors = errors;
            }
            console.log(`Successfully logged in and got data ${data}`);
        }).catch((err) => {
            console.log(`ACK! Something went wrong logging in: ${err.message}`);
        });
    }
}
