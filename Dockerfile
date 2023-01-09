# Install the full desktop environment 
# FROM ubuntu:20.04
FROM node:10.19.0

# Create a flexa_ui directory within Docker 
RUN mkdir /typescript-twilio

# Make thie directory the default directory
WORKDIR /typescript-twilio

# Copy the files to the Docker environment
COPY . /typescript-twilio

# Install all dependencies
RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive TZ=Etc/UTC apt-get -y install tzdata
RUN apt install -y zip
RUN npm i
RUN npm run build
RUN npm run zip

# Expose port 3000
EXPOSE 3000

# Entrypoint refers to commands that cannot be overridden 
ENTRYPOINT ["npm", "run"]

# CMD refers to commands that can be overridden
CMD ["start:dev"]
