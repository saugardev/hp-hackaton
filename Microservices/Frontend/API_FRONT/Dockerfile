#Indicate version of language
FROM node:latest
#Where is a project
WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

#Execute project
CMD [ "node", "app.js" ]

