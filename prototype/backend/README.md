# Python Backend

This app is built with Python 3.7.9., make sure to have this version set in order to have it working properly.

## Setup with `pip`

```
cd prototype/backend
```
### Creating virtual environment:
```
# in case virtualenv is not installed
pip install virtualenv

mkdir ~/python-environments # or any other folder in which you want to keep the virtual environments

# creation of the virtual environment
virtualenv ~/python-environments/dsp
```

### Activating virtual environment
```
# activate environment
source ~/python-environments/dsp/bin/activate

# activate environment for fish
source ~/python-environments/dsp/bin/activate.fish
```

### Installing dependencies from `requirements.txt`
```
pip install -r requirements.txt
```

## Adding new dependencies
If new dependencies are added run and commit the file to git:
```
pip freeze > requirements.txt
```

## Running the server

```
python main.py
```

## Manual Deployment  (deprecated)

*You would need heroku credentials setup for this, with the free plan this app is not deployable anymore due to restriction in RAM and disk size on Heroku*

The main idea of this deployment process is to host UI and backend on one single server.
This process builds the UI and copies its build to the flask server, which then hosts it as a static website. The final product can then be deployed to Heroku.

```
git checkout deployment
git merge -X theirs main
rm -r protoype/backend/static/* 

cd prototype/doctors-ui
yarn build

cp -r build/* ../backend/static/ # copy static files into static-folder of the python server
cd ../..

git add .
git commit -m "New release"

git push
git subtree push --prefix prototype/backend heroku deployment:main # push the python server to heroku
```
