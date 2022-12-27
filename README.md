# Notifications 
This is the notifications endpoint for Flexa UI

## Buiding the typescript into javascript
```sh
npm run build
```

## Creating the zip file for Elastic Beanstalk
```sh
sudo apt install zip
npm run zip
```

## CI/CD
Upon pushing to the main branch, the CI action will build the typescript code and create a corresponding zip file. This zip file will be pushed 
to the AWS Elastic Beanstalk container for use via the .github/workflows/CI.yaml file.
