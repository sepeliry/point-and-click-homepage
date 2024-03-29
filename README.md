# point-and-click-homepage

The repository for the point-and-click game homepage, created by students of the Tampere University software project course, to whom we are eternally grateful!

## Unit tests and coverage

Unit testing is performed with `mocha` and `chai`. Code coverage reports are generated using the `c8` library and are sent to `coveralls`. Below is the badge reflecting the current code coverage status from Coveralls; clicking it will open the coverage report on Coveralls.

[![Coverage Status](https://coveralls.io/repos/github/sepeliry/point-and-click-homepage/badge.svg?branch=main)](https://coveralls.io/github/sepeliry/point-and-click-homepage?branch=main)

## How to run the application locally

Prerequitisies:

- Visual Studio Code
- Git
- Node.js

Steps:

1. Clone the repository: `git clone https://github.com/sepeliry/point-and-click-homepage.git`
2. Move to the newly created directory: `cd point-and-click-homepage`
3. Install packages: `npm install`
4. Run `npm run start` to start parcel dev server
   The game should now open in your browser and run locally on port 1234 by default. Happy exploring! :D

## Build and serve using parcel

1. Run `npm run build_serve` to build and start http-server. http-server serves the files in /dist on port 8080
2. Open browser to `http://localhost:8080` to view the application

Optionally run `npm run build` to build without starting http-server
