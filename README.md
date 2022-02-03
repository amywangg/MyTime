# MyTime
MyTime monorepo with student-frontend, org-frontend, admin-frontend, backend

### Setup Instructions
1.  Clone the repo 

`git clone https://github.com/MyTimeCapstone/MyTime.git`

2. Install docker https://docs.docker.com/get-docker/

    i. Run docker
  
    ii. in the base directory (MyTime) run `docker-compose up`  
  
    Note: you should see redis and db starting up

3. enter packages/backend in one terminal and run `npm install` once complete run `nodemon`
4. enter packages/student-frontend in another terminal and run `npm install` once complete run `npm start`
5. Go to `localhost:3000` in your browser and it should be good to go

