# feelblog
A blog where you can post about things you care about and tag them with an emotion.


```
create table users (id varchar(255), username varchar(255), password varchar(255), registered datetime, last_login datetime)
```

```
create table posts (id int not null auto_increment primary key, title varchar(255), content varchar(255), emotion varchar(255), writer varchar(255), date varchar(255)); 
```

# Run servers

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
