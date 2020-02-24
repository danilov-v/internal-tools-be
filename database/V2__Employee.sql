create table EMPLOYEE (
    id int not null,
    NAME varchar(100) not null,
    person_id int not null REFERENCES PERSON (id) 
);
