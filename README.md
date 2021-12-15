# feelblog
A blog where you can post about things you care about and tag them with an emotion.


```
create table users (id varchar(255), username varchar(255), password varchar(255), registered datetime, last_login datetime)
```

```
create table posts (id int not null auto_increment primary key, title varchar(255), content varchar(255), emotion varchar(255), writer varchar(255), date varchar(255)); 
```
