import { Injectable } from '@angular/core';
import {Angular2Apollo} from 'angular2-apollo';
import gql from 'graphql-tag';
import {GraphQLResult} from 'graphql';

const AUTH_TOKEN_KEY = 'SCAPHOLD_AUTH_TOKEN';
const AUTH_ID_KEY = 'SCAPHOLD_AUTH_ID';
const AUTH_USER_KEY = 'SCAPHOLD_AUTH_USER';

export interface IScapholdCredential {
    id: string;
    token: string;
}

export interface IScapholdUserInput {
    username: string;
    password: string;
}

export interface IScapholdUser {
    username: string;
    createdAt: Date;
    modifiedAt: Date;
    lastLogin: Date;
}

@Injectable()
export class AuthService {

    credential: IScapholdCredential;
    user: IScapholdUser;
    client: Angular2Apollo;

    constructor(private apollo: Angular2Apollo) {
        this.refresh();
        this.client = apollo;
    }

    private refresh() {
        this.credential = this.getCredential();
        this.user = this.getUser();
    }

    /**
     * Logs a user out by clearing the localStorage containing the user credentials.
     */
    logout() {
        localStorage.clear();
        this.refresh();
    }

    /**
     * @param user Credentials for the user to login.
     * @returns A promise wrapping the result from the loginUser mutation.
     */
    login(user: IScapholdUserInput): Promise<GraphQLResult> {
        return this.client.mutate({
            mutation: gql`
                mutation LoginUser($input: _LoginUserInput!) {
                    loginUser(input: $input) {
                        id
                        token
                    }
                }
            `,
            variables: {
                input: {
                    username: user.username,
                    password: user.password
                }
            }
        }).then((result: GraphQLResult) => {
            const {data, errors} = result;
            if (errors) {
                throw errors;
            }
            this.setCredential(data['loginUser']);
            this.syncUser(data['loginUser']['id']);
            return result;
        });
    }

    syncUser(id: string): void {
        const subscription = this.client.watchQuery({
            query: gql`
                query GetUser($id: ID!) {
                    getUser(id: $id) {
                        id
                        username
                    }
                }
            `,
            variables: {
                id: id
            }
        }).subscribe({
            next: ((result: GraphQLResult) => {
                this.setUser(result.data['getUser']);
                subscription.unsubscribe();
            }).bind(this),
            error: ((error: Error) => {
                console.log(`Error getting user ${error.message}`);
                subscription.unsubscribe();
                throw error;
            }).bind(this)
        });
    }

    /**
     * @param user Credentials for the new user.
     * @returns A promise wrapping the result from the createUser mutation.
     */
    register(user: IScapholdUserInput): Promise<GraphQLResult> {
        return this.client.mutate({
            mutation: gql`
                mutation CreateUser($input: _CreateUserInput!) {
                    createUser(input: $input) {
                        changedUser {
                            id
                            username
                            createdAt
                            modifiedAt
                            lastLogin
                        }
                    }
                }
            `,
            variables: {
                input: {
                    username: user.username,
                    password: user.password
                }
            }
        }).then((result: GraphQLResult) => {
            const {data, errors} = result;
            if (errors) {
                throw errors;
            }
            this.setUser(data['createUser']['changedUser']);
            return result;
        });
    }

    private setUser(user: IScapholdUser) {
        this.user = user;
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    }

    private getUser(): IScapholdUser {
        return JSON.parse(localStorage.getItem(AUTH_USER_KEY));
    }

    private setCredential(cred: IScapholdCredential) {
        localStorage.setItem(AUTH_TOKEN_KEY, cred.token);
        localStorage.setItem(AUTH_ID_KEY, cred.id);
        this.credential = cred;
    }

    private getCredential(): IScapholdCredential {
        let cred: any = {};
        cred.token = localStorage.getItem(AUTH_TOKEN_KEY);
        cred.id = localStorage.getItem(AUTH_TOKEN_KEY);
        return cred;
    }
}
