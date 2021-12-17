# feelblog
A blog where you can post about things you care about and tag them with an emotion.


```
create table users (id varchar(255), username varchar(255), password varchar(255), registered datetime, last_login datetime)
```

```
create table posts (id int not null auto_increment primary key, title varchar(255), content varchar(255), emotion varchar(255), writer varchar(255), date varchar(255)); 
```

## Run both servers

```
cd front
npm run serve
cd ..
cd back
node index
```
## Improved SQL-tables:
```
create table users ( id varchar(255) not null, username varchar(255) not null, password varchar(255) not null, registered datetime, last_login datetime, primary key(id) );
```
```
create unique index username on users (username);
```
```
create table posts (id int not null auto_increment primary key, title varchar(255) not null, content text, emotion varchar(255), date timestamp not null default current_timestamp(), username varchar(255) not null, foreign key(username) references users(username));
```
```
create table users_data( id int not null auto_increment primary key, name varchar(50), email varchar(100), phone varchar(20), hobbies varchar(255), date timestamp not null default CURRENT_TIMESTAMP(), username varchar(255) not null, foreign key (username) references users(username) );
```
## REST API DESCRIPTION
1. API paths:

| Action | Path | Method | URL example |
| -------- | ---- | ----- | ------ |
| user registration | auth/register | POST | http://localhost:8081/auth/register |
| user logging in | auth/login | POST | http://localhost:8081/auth/login |
| all user's posts getting | profile/myposts | GET | http://localhost:8081/profile/myposts |
| new post creation | profile/myposts | POST | http://localhost:8081/profile/myposts |
| post getting | profile/myposts/{id} | GET | http://localhost:8081/profile/myposts/1 |
| post changing | profile/myposts/{id} | PUT | http://localhost:8081/profile/myposts/1 |
| post removing | profile/myposts/{id} | DELETE | http://localhost:8081/profile/myposts/1 |
| all user's information getting | profile/information | GET | http://localhost:8081/profile/information |
| concrete user's information getting | profile/information/{property} | GET | http://localhost:8081/profile/information/email |
| concrete user's information changing | profile/information/{property} | PUT | http://localhost:8081/profile/information/email |
| all existing posts getting | posts | GET | http://localhost:8081/posts |
| posts searching by title | posts?title={search word} | GET | http://localhost:8081/posts?title="my_post" |
| posts searching by author | posts?author={search word} | GET | http://localhost:8081/posts?title="john" |
| posts searching in time frame | posts?start={from date}&end={to date} | GET | http://localhost:8081/posts?start="2021-03-01"&end="2021-04-10" |

2. API objects:

| Action | Path | Request object example | Response object example |
| -------- | ---- | ----- |  ----- |
| user registration | auth/register | { username: "john", password: "admin", name: "John Smith", email: "john@mail.com", phone: "+123456789", hobbies: "swimming, programming" } | { msg: "Registered!" } |
| user logging in | auth/login | { username: "john", password: "admin" } | { msg: "Logged in!", token: "generated access token",  user: { id: "generated unique id", username: "john", password: "hashed password", registered: "2021-03-01", last_login: "2021-04-23" } } |
| all user's posts getting | profile/myposts | | { isSuccess: true, result: [ 0: {id: 1, title: "my post", content: "Some text here", emotion: "happy", date: "2021-04-23", username: "john"} ] } |
| new post creation | profile/myposts | { title: "my post", content: "Some text here", emotion: "happy" } | { isSuccess: true, msg: "Success" } |
| post getting | profile/myposts/{id} | | { isSuccess: true, result: {id: 1, title: "my post", content: "Some text here", emotion: "happy", date: "2021-04-23", username: "john"} } |
| post changing | profile/myposts/{id} | { title: "my post", content: "Some text here", emotion: "happy" } | { isSuccess: true, msg: "Success" } |
| post removing | profile/myposts/{id} | | { isSuccess: true, msg: "Success" } |
| all user's information getting | profile/information | | { isSuccess: true, result: {id: 1, name: "John Smith", email: "john@mail.com", phone: "+123456789", hobbies: "swimming, programming", date: "2021-12-15 17:35:26", username: "john"} } |
| concrete user's information getting | profile/information/{property} | { isSuccess: true, result: {email: "john@mail.com"} } |
| concrete user's information changing | profile/information/{property} | {value: "email"}| { isSuccess: true, msg: "Success" } |
| all existing posts getting | posts |  | { isSuccess: true, result: [ 0: {id: 1, title: "my post", content: "Some text here", emotion: "happy", date: "2021-04-23", username: "john"} ] } |
| posts searching by title | posts?title={search word} | | { isSuccess: true, result: [ 0: {id: 1, title: "my post", content: "Some text here", emotion: "happy", date: "2021-04-23", username: "john"} ] } |
| posts searching by author | posts?author={search word} | | { isSuccess: true, result: [ 0: {id: 1, title: "my post", content: "Some text here", emotion: "happy", date: "2021-04-23", username: "john"} ] } |
| posts searching in time frame | posts?start={from date}&end={to date} |  | { isSuccess: true, result: [ 0: {id: 1, title: "my post", content: "Some text here", emotion: "happy", date: "2021-04-23", username: "john"} ] } |
