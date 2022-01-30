FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY wait-for-it.sh /wait-for-it.sh 
RUN chmod +x /wait-for-it.sh
COPY . /app
CMD [ "npm", "start" ]
EXPOSE 3001