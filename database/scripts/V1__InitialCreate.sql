create schema it_tools;

-- look-up tables

create table it_tools.role (
    id   serial primary key,
    name varchar(1044) unique not null
);

create table it_tools.promotion_type (
    id   serial primary key,
    name varchar(255) unique not null
);

create table it_tools.penalty_type (
    id   serial primary key,
    name varchar(255) unique not null
);

create table it_tools.removal_reason (
    id   serial primary key,
    name varchar(255) unique not null
);

create table it_tools.unit_type (
    id   serial primary key,
    name varchar(255) unique not null
);

create table it_tools.rank (
    id     serial primary key,
    name   varchar(255) unique not null,
    rating integer unique      not null
);

create table it_tools.person_type (
    id   serial primary key,
    name varchar(255) unique not null
);

-- general tables

create table it_tools.user (
    id          serial primary key,
    login       varchar(20) unique not null,
    password    varchar(20)        not null,
    first_name  varchar(20)        not null,
    second_name varchar(20),
    last_name   varchar(20),
    rank_id     integer references it_tools.rank (id),
    role_id     integer references it_tools.role (id)
);

create table it_tools.unit (
    id           serial primary key,
    number       integer not null,
    unit_type_id integer references it_tools.unit_type (id),
    parent_unit  integer references it_tools.unit (id)
);

create table it_tools.person (
    id                  serial primary key,
    first_name          varchar(25) not null,
    second_name         varchar(25),
    last_name           varchar(25) not null,
    birth_date          date,
    phone               varchar(25),
    position            varchar(255),
    person_type_id      integer references it_tools.person_type (id),
    call_date           date,
    demobilization_date date,
    created_date        date,
    comment             text,
    unit_id             integer references it_tools.unit (id),
    rank_id             integer references it_tools.rank (id)
);

create table it_tools.person_removal (
    id                serial primary key,
    person_id         integer references it_tools.person (id),
    removal_reason_id integer references it_tools.removal_reason (id),
    removal_date      date not null,
    comment           varchar(255)
);

create table it_tools.promotion (
    id               serial primary key,
    assignment_date  date not null,
    realization_date date,
    comment          varchar(255),
    person_id        integer references it_tools.person (id),
    type_id          integer references it_tools.promotion_type (id)
);

create table it_tools.penalty (
    id               serial primary key,
    assignment_date  date not null,
    realization_date date,
    comment          varchar(255),
    person_id        integer references it_tools.person (id),
    type_id          integer references it_tools.penalty_type (id)
);
