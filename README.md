# BETTER ExpenseTrackerApp
THE OLD CODE LIVES HERE : https://www.buymeacoffee.com/webdesigntutsyt/e/94807 \
I refactored the old code.You can now delete your account in the /profile path \
I added loading state to all the api requests.Now a spinner will appear if you request something \
I added form validation in the /register page and in the /transaction pages \
Lots More +++ 

## Youtube Links
Part 1 : https://youtu.be/XERS3j3hx_8 \
Part 2 : https://youtu.be/tGv9q1YgWF0 \
Part 3 : https://youtu.be/KWj5IW_tDa8 \
Part 4 : https://youtu.be/pkXq9jvEZB4 \
Part 5 (Final) : https://youtu.be/D3oKAmmtEZk 

## STEPS
-> Do npm i in the root directory and in the "/client" folder. The React App lives in the "/client" directory \
-> In the "/client" directory there is a .env.example file. Rename it to .env and change the variable to your url/api \
-> In the root directory there is a .env.example file too. Rename it to .env and put your DATABASE_URL ie the postgresql connection URL. The port variable is optional. \
-> Run npm run buildClient to build the react app (at the root folder). A clientBuild folder will be created. \
-> Run "npx prisma generate" and "npx prisma migrate dev" to generate the prisma client and apply the migrations to the db  \
See here : https://www.prisma.io/docs/reference/database-reference/connection-urls \
Example : DATABASE_URL=postgresql://janedoe:mypassword@localhost:5432/mydb 

## Available Scripts
You need to run progresql and provide the correct DATABASE_URL TO PRISMA!!\
-> In the root directory run npm run dev and both frontend and backend will run concurrently. The React app will live at localhost:3006 and the api at localhost:5000/api

