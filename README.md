# Notify

Write Up :-
I have used node.js to develop the backend in which i have used socket.io to send real time notifications to http client.

I have used mongoodb as a database in which i have added subscriptions at the field level of a document. Here is db structure
{"name":"rohan","email":"a@gmail.com","phone":"123456","address":"lalgarh",
"sub":[{"name":"varun","value":"address"},{"name":"rahul","value":"email"},{"name":"shubham","value":"all"},{"name":"divyam","value":"all"}]}

I also used express to make rest api to serve index.html as a static file 

server runs at 8081 while socket runs at 8080.

i have made a singleton db connection so that db only connects once.

i have used callback functions to deal with asynchronous nature of node.js
on front end i have used basic css and javascript.



Usage manual
requirements - node.js and mongodb installed
1. Download and reach to project via terminal and hit npm install

2.then run project by node server.js

3.open locahost at 8081

4.first add users and subscribe to already existing users .if you want to get notifications about everything of everybody then 
enter "all" in both fields.

5.login by name.
6. open another tab and login by any user that is subscriber of first one.

7.update any field of first and see notification at other tab..
