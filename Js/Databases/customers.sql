--create customers table
create table customers(
id serial primary key,
name varchar(100) not null,
email varchar(150) not null unique,
created_at timestamp default now()
)

--insert a single customer record
insert into customers(name, email) values('John Doe', 'johndoe@gmail.com')

--insert multiple customers record
insert into customers(name, email)
values('Alice Smith', 'alice@gmail.com'),
('Bob Johnsn', 'bob@gmail.com')

--select records from customers table
select * from customers

--select exactly data
select name, email from customers;

--update Alice's email by targetting specific id
update customers set email = 'alice@outlook.com' where id=2

--delete a record from customers table by targetting specific id
delete from customers where id = 3

