
## GitHub Oauth

  
  

## Prerequisites

  

Make sure you have installed all of the following prerequisites on your development machine:

  

* Node.js - [Download and install Node.js](https://nodejs.org/en/download/);

* NPM - [Download and install NPM](https://www.npmjs.com/get-npm);

* Angular Cli - [Wiki](https://github.com/angular/angular-cli/wiki)

  

## Quick install

  

The first thing you should do is generate and add Github developer keys;


* Go to [https://github.com/settings/developers](https://github.com/settings/developers) and then click New OAuth App

Settings following below:	

*  **Name**: github-integration-dev

*  **Homepage URL**: [http://localhost:4200/](http://localhost:4200/)

*  **Authorization Callback Url**: [http://localhost:4200/callback]
(http://localhost:4200/callback)

 Rename *tpl.env* file to *.env*

* Fill 'Client ID' and 'Client Secret' generated 
  

install the Node.js dependencies. To install Node.js dependencies you're going to use npm again. In your application folder run this in the command-line:

  

```bash

$ npm install

```

  

Starting back-end

  

```bash

$ node server.js

```

Starting front-end

  

```bash

$ npm run start:dev

```

Listening port on 4200

  

```bash

http://localhost:4200/

```

  
  

## Structure

  

The basic structure of this challenge is given in the following way:

  

*  `git-oauth/`Contains the source code.

*  `node_modules/` Contains all dependencies fetched via [NPM](https://www.npmjs.org/). However, this directory is unnecessary for versioning, so it is ignored.

*  `src/` Contains all the static files you use in your application, this is where you store your front-end files.

*  `.gitignore` The .gitignore file specifies intentionally untracked files that Git should ignore.

*  `LICENSE` A software license tells others what they can and can't do with your source code.

*  `package.json` Lists all [Node.js](http://nodejs.org/) dependencies.

*  `README.md` Explains how your application works.