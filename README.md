# Notifications 
This is the notifications endpoint for the UI

## Quick Set up
```sh
# Clone the repository
git clone https://github.com/developerdenesh/typescript-twilio
cd typescript-twilio

# To run in development
npm run start:dev

# To build and run javascript files transpiled from typescript
npm run build && npm run start
```

## Buiding the typescript into javascript
```sh
npm run build
```

## Creating the zip file for AWS Elastic Beanstalk (EB)
```sh
sudo apt install zip
npm run zip
```

## Example .env file
```bash
ENVIRONMENT=PRODUCTION || DEVELOPMENT
ACCOUNT_SID=<Twilio Account SID> # Obtain from twilio
AUTH_TOKEN=<Twilio Auth Token>   # Obtain from twilio
UNAME=username                   # Free to define 
PASSWORD=password                # Free to define
ROBOT_NAME=VIKI                  # Free to define
OUR_NUMBER=+1234567890           # Obtain from twilio
SMS_ID=<SMS_ID>                  # Obtain from twilio
DEBUG_NUMBERS=+6592345678        # Free to define
PRODUCTION_NUMBERS=+6582345678   # Free to define
```

## Building and running docker image
```sh
# -t flag is to name and optionally a tag in the 'name:tag' format
sudo docker build -t developerdenesh/typescript-notifications:1.0 .
sudo docker run --env-file=.env -p 3000:3000 developerdenesh/typescript-notifications:1.0

# or simply pull the docker image from dockerhub 
sudo docker run --env-file=.env developerdenesh/typescript-notifications
```

## CI/CD
Upon pushing to the main branch, the CI action will build the typescript code and create a corresponding zip file. This zip file will be pushed 
to the AWS Elastic Beanstalk container for use via the .github/workflows/CI.yaml file.
