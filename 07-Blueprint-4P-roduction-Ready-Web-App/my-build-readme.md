# Chapter 1 Setting Up Our System for Development

## Setting for all

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)" [uninstall]

(echo; echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"') >> /home/cskim/.profile
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"

sudo apt-get install build-essential
brew install gcc
brew install python
brew install pdm
```

## Setting Backend

```
cd backend
pdm init
pdm add --dev black isort
[Fail]--> Add requires-python = '>=3.7' in pyproject.toml
pdm run black src tests
pdm run isort src tests

pdm add --dev djhtml
pdm run djhtml src/backend/templates --tabwidth 2 --check

pdm add --dev mypy
pdm run mypy src/backend/ tests/

pdm add --dev flake8
pdm run flake8 src/ tests/

pdm add --dev bandit
pdm run bandit -r src/

pdm add --dev vulture
pdm run vulture src/

pdm add --dev pytest pytest-asyncio
pdm run pytest tests
```

## Setting Frontend

```
brew install node

npx create-react-app frontend-my --template typescript
cd frontend-my
#npm install -D typescript @types/node @types/react @types/react-dom @types/jest

#npm install --save-dev prettier
#npx prettier --parser typescript --write "src/**/*.{ts,tsx}"

#npm install --save-dev eslint
#npm install --save-dev eslint-config-prettier
#npm install --save-dev eslint-plugin-import

#npx eslint "src/**/*.{ts,tsx}"
#npx eslint --fix "src/**/*.{ts,tsx}"

npm run test

npm install --save-dev source-map-explorer
npm run build
npx source-map-explorer build/static/js/*.js

```

## Install Terraform

```
brew install terraform
pip install ansible-vault

cd infrastructure

ansible-vault encrypt secrets.auto.tfvars --output=secrets.auto.tfvars.vault
ansible-vault encrypt terraform.tfstate --output=terraform.tfstate.vault

ansible-vault decrypt secrets.auto.tfvars.vault --output=secrets.auto.tfvars
ansible-vault decrypt terraform.tfstate.vault --output=terraform.tfstate

```

## Install PostgreSQL

```
brew install postgresql@14
brew services start postgresql

psql -U postgres
postgres=# ALTER USER postgres PASSWORD '***@****';
postgres=# \q

```

## Terraform Start

````
terraform init

terraform apply
...
Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

github_repository.csk-tozo: Creating...
github_repository.csk-tozo: Creation complete after 6s [id=csk-tozo]

#git remote add origin git@github.com:chomskim/csk-tozo.git
#git push --set-upstream origin main
#git push origin main:feature
#git pull origin main

```

````
