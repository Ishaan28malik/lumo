
  
  

#  Navigator

  

Welcome to Lumo Navigator, a React and TypeScript project! This guide will help you get started with setting up the project and running common commands.


- [Navigator](#navigator)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Format settings on Editor:](#format-settings-on-editor)
  - [Available Scripts](#available-scripts)
  - [Development](#development)
  - [Production](#production)
  - [Test](#test)
- [How to use mock-api?](#how-to-use-mock-api)

  

##  Prerequisites

  

Before you begin, ensure you have met the following requirements:

  

-  [Node.js](https://nodejs.org/en/) (version 16.x or later)

-  [npm](https://www.npmjs.com/) (version 6.x or later) or [yarn](https://yarnpkg.com/) (version 1.22.x or later)

  

##  Installation

  

Follow these steps to set up the project:

  

1.  **Clone the repository:**
`git clone https://github.com/thinklumo/navigator.git`

`cd navigator`

To install dependencies

  

    npm install

  
  
  ##  Format settings on Editor:
Set "Format on save" to true to format files as per prettier rules on Save. 

  

## Available Scripts

  

##  Development

  

to build for development run

    npm run start

  

##  Production

  

to build for production run

  

    npm run build

  

##  Test

to run unit test

  

    npm run test

  
  
  
  
  

  
  

UI libs

  

- typescript

- react

- react-query

- MUI

- tailwind

- react-router

- ag-grid


Bundler : Webpack

# How to use mock-api? 

  just update - webpack/middleware/mock-api-routes.js and restart dev server
  /mock-api will check for the configs and render the jsons