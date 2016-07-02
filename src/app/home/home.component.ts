import { Component, OnInit } from '@angular/core';
import {
  Angular2Apollo,
  Apollo
} from 'angular2-apollo';
import gql from 'graphql-tag';
import {RegisterComponent} from '../register';
import {LoginComponent} from '../login';
import {AuthService} from '../shared';
import client from '../client';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [RegisterComponent, LoginComponent]
})
@Apollo({
  client,
  queries(context) {
    return {
      data: {
        query: gql`
          query AllUsers($first: Int, $after: String, $last: Int, $before: String) {
            viewer {
              allUsers(first: $first, after: $after, last: $last, before: $before) {
                edges {
                  node {
                    id
                    username
                    lastLogin
                    createdAt
                    modifiedAt
                  }
                  cursor
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
              }
            }
          }
        `,
        variables: {
          first: context.first,
          after: context.after,
          last: context.last,
          before: context.before
        },
        forceFetch: false,
        returnPartialData: true,
        pollInterval: 10000
      }
    };
  }
})
export class HomeComponent implements OnInit {

  data: any;
  auth: AuthService;

  // pagination
  defaultPageSize: number = 2;
  first: number = 2;
  last: number = null;
  after: string = null;
  before: string = null;

  constructor(private apollo: Angular2Apollo, auth: AuthService) {
    this.auth = auth;
  }

  ngOnInit() {
    // Do stuff after the component template is done loading.
  }

  getPreviousPageOfUsers() {
    const mayHavePreviousPage = this.data &&
                                this.data.viewer &&
                                this.data.viewer.allUsers &&
                                this.data.viewer.allUsers.pageInfo.hasPreviousPage ||
                                this.last === null;
    if (mayHavePreviousPage) {
      const edgeCount = this.data.viewer.allUsers.edges.length;
      const beforeCursor = (edgeCount > 0) ? this.data.viewer.allUsers.edges[0]['cursor'] : null;
      this.before = beforeCursor;
      this.last = this.defaultPageSize;
      this.after = null;
      this.first = null;
    }
  }

  /**
   * If pageInfo says we have a next page OR first is null then try to grab a next page.
   * We have the check for this.first === null due a contraint in the relay spec for connections.
   * If first is not set in a request then pageInfo.hasNextPage is always false.
   * See https://facebook.github.io/relay/graphql/connections.htm for more info 
   */
  getNextPageOfUsers() {
    const mayHaveNextPage = this.data &&
                            this.data.viewer &&
                            this.data.viewer.allUsers &&
                            this.data.viewer.allUsers.pageInfo.hasNextPage ||
                            this.first === null;
    if (mayHaveNextPage) {
      const edgeCount = this.data.viewer.allUsers.edges.length;
      const afterCursor = (edgeCount > 0) ? this.data.viewer.allUsers.edges[edgeCount - 1]['cursor'] : null;
      this.after = afterCursor;
      this.first = this.defaultPageSize;
      this.before = null;
      this.last = null;
    }
  }
}
