# angular2-apollo-webpack-starter

A graphql ready starter kit for Angular2 using Apollo Client and Webpack. This template is built to integrate seamlessly
with the [scaphold.io](https://scaphold.io)'s GraphQL platform.

Out of the box, the application handles authentication and exhibits pagination using GraphQL connections. The
template also comes packed with a few other goodies.

## Table of contents

* [Quick start](#quick-start)
* [What's included](#whats-included)
* [Project structure](#project-structure)
* [Installing](#installing)
* [Developing](#developing)
* [Testing](#testing) 

## Quick start
---

- Go to [scaphold.io](https://scaphold.io) and create an account.
- Create an application and get your GraphQL API's url from the dropdown in the nav bar.
- Setup this starter kit

```bash
# clone our repo
$ git clone https://github.com/scaphold-io/angular2-apollo-webpack.git my-app

# update /my-app/src/config.ts with your scaphold api url
$ cd my-app
$ vi src/config.ts

# install the dependencies with npm
$ npm install

# start the server
$ npm start
```

Your application is now hooked up to a production GraphQL API and is ready for you
to build an awesome app.

Go to [http://localhost:8080](http://localhost:8080) to start using your API.

## What's included?
---

* Apollo Client - A powerful, easy to use GraphQL client.
* Webpack - A popular, well designed module bundler for JavaScript projects.
* ES6, and ES7 support with babel.
* Source maps for debugging.
* Development server with live reload via webpack-dev-server.
* Production builds with cache busting.
* Unit testing via karma and jasmine.
* Integration testing via protractor.
* Code coverage when tests are run.

## Project Structure
---

```
bootangular2-apollo-webpack-starter/
├── src/                # Project Root
│   ├── app/            # Angular2 Application
│   │   ├── about/      # about, home, login, register all contain Angular components
│   │   ├── home/
│   │   ├── login/
│   │   ├── register/
│   │   ├── shared/              # shared contains Angular services. e.g. auth.service.ts
│   │   ├── app.component.html   # Each component has a X.component.html template file
│   │   ├── app.component.scss   # Component specific sass styling
│   │   ├── app.component.ts     # The component controller
│   │   ├── app.component.e2e-spec.js   # Protractor integration tests
│   │   ├── app.component.spec.ts       # Karma unit tests
│   │   ├── app.routes.ts        # Angular application router
│   │   └── client.ts/           # Apollo client initialization
│   ├── public/          # Public static assets
│   │   ├── img/
│   │   └── index.html
│   ├── style/           # Application wide sass styling
│   │   └── app.scss
│   ├── config.ts        # Contains your API's url.
│   ├── main.ts          # Application entry point
│   ├── polyfills.ts    
│   └── vendor.ts        # Update application dependencies here
├── typings/             # Contains TypeScript definitions
│   ├── globals/
│   ├── modules/
│   └── index.d.ts
├── package.json
├── karma-shim.js
├── karma-conf.js
├── protractor.conf.js
├── tsconfig.json
├── tslint.json
├── typedoc.json
├── typings.json
├── webpack.config.js
├── LICENSE
└── README.md
```

## Installing

* `fork` this repo
* `clone` your fork
* `npm install` to install all dependencies

What you need to run this app:
* `node` and `npm`
* We tested this template with Node (`v4.x`+) and NPM (`3.x`+) but others will most likely work as well

## Running the app

After you have installed all dependencies you can now run the app with:
```bash
npm start
```

It will start a local server using `webpack-dev-server` which will watch, build (in-memory), and reload for you. The port will be displayed to you as `http://localhost:8080`.

## Developing

### Building

* single run: `npm run build`
* build files and watch for changes: `npm run watch`

### Generating Documentation

* `npm run docs`
* This uses and [TypeDoc](http://typedoc.io/) and understand JavaDoc style tags 

## Testing

#### 1. Unit Tests

* single run: `npm test`
* live mode: `npm run test-watch`

#### 2. Integration Tests

* single run: `npm e2e`
* live mode: `npm e2e-live`

## Contributing

Please feel free to fork this project and contribute. Send us a pull request and we'd be happy to merge :)