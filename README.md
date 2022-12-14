# Notifications 
This is the notifications endpoint for Flexa UI

## Buiding the typescript into javascript
```sh
tsc
```

## Creating the zip file for Elastic Beanstalk
```sh
sudo apt install zip
zip -r eb.zip . -x "node_modules/*" -x "src/"
```

