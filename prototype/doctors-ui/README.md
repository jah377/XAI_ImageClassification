# Frontend Prototype

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This UI is built with the versions:
```bash
yarn --version
> 1.22.17
node --verison
> v14.17.1
```
Make sure to have these versions set in order to have it working properly.

## Setup
To run and develop this app locally we use `yarn`.
A prerequisite for `yarn` is to have `node` installed. 

Verify the node installation by printing out the node version:
```
node -v
```
or install node like [this](https://nodejs.org/en/download/) or like [this](https://nodejs.dev/learn/how-to-install-nodejs).

After that, it is time to install `yarn`:

```
brew install yarn
```
or on Windows, you can follow [these instructions](https://phoenixnap.com/kb/yarn-windows).

And then install all dependencies of the app with:
```
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
It will launch the app at [http://localhost:3000](http://localhost:3000), that's the address you can view the app in your browser.

If you would like to launch the app on a different port than 3000, create a `.env` file in `prototype/doctors-ui/` with the following config:
```
PORT=8081
```

You can open the project in an editor of your choice, e.g. [Visual Studio Code](https://code.visualstudio.com/) and edit some pages to your liking.
The app will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
