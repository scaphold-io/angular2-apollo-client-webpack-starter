import { Component, OnInit } from '@angular/core';
import {GraphQLResult} from 'graphql';
import {AuthService, IScapholdUserInput} from '../shared';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

@Component({
    selector: 'scaphold-login-form',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES]
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
