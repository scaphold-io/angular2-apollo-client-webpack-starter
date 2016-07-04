import { Component, OnInit } from '@angular/core';
import {GraphQLResult} from 'graphql';
import {AuthService, IScapholdUserInput} from '../shared';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

@Component({
    selector: 'scaphold-register-form',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, MD_INPUT_DIRECTIVES]
})
export class RegisterComponent implements OnInit {

    user: IScapholdUserInput;
    auth: any;
    errors: Array<Error>;

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

    register() {
        this.auth.register(this.user).then((result: GraphQLResult) => {
            const { errors, data } = result;
            if (errors) {
                this.errors = errors;
            }
            console.log(`Registered and got data ${data}`);
            return this.auth.login(this.user);
        }).catch((err) => {
            console.log(`ACK! Something went wrong registering: ${err.message}`);
        });
    }
}
