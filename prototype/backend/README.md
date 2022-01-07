# Python Backend


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

## Deploying

```
git checkout deployment
git merge -X theirs main
rm -r protoype/backend/static/* 

cd prototype/doctors-ui
yarn build

cp -r build/* ../backend/static/ # copy static files into static-folder of the python server

git add .
git commit -m "New release"

git push
git subtree push --prefix prototype/backend heroku deployment:main # push the python server to heroku
```
