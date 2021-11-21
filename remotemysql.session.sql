select * from 
    (select TT.rollno, TT.owner, TT.isbn1, TT.isbn2, TT.title, TT.author, BB.title as title2, BB.author as author2  from 
        (select T.rollno, T.owner, T.isbn1, T.isbn2, B.title, B.author from 
            (select rollno, owner, isbn1, isbn2 from exchange_log where rollno = 201210051) as T
        join exchanged_books as B
        on B.owner = T.rollno and T.isbn1 = B.isbn) as TT
    join exchanged_books BB
    on BB.owner = TT.owner and TT.isbn2 = BB.isbn) as T
UNION
select * from 
    (select TT.rollno, TT.owner, TT.isbn1, TT.isbn2, TT.title, TT.author, BB.title as title2, BB.author as author2  from 
        (select T.rollno, T.owner, T.isbn1, T.isbn2, B.title, B.author from 
            (select rollno, owner, isbn1, isbn2 from exchange_log where owner = 201210051) as T
        join exchanged_books as B
        on B.owner = T.rollno and T.isbn1 = B.isbn) as TT
    join exchanged_books BB
    on BB.owner = TT.owner and TT.isbn2 = BB.isbn) as T;

insert into sell(isbn, owner, price)  value(9780062457790, 201210006, 400);

update sell set owner = 201210051 where isbn = 9780062457790 ;

delete from buybook where isbn = 9780140027686;

insert into books select * from exchanged_books;

select T.owner, T.rollno, T.isbn, B.title, B.author, B.image from
(select * from buybook where rollno = ?
union select * from buybook where owner = ?) as T
join books B on T.isbn = B.isbn;


select T.isbn, T.rollno, T.owner, T.startdate, T.enddate, B.title, B.author from (select * from borrow_books where rollno = 201210006
union
select * from borrow_books where owner = 201210006) as T
join books B
on B.isbn = T.isbn;


create table transaction(
    TRANSID varchar(20) primary key,
    isbn BIGINT not null,
    sender_name varchar(40) not null,
    s_rollno BIGINT not null,
    Receiver_name VARCHAR(40) not null,
    r_rollno BIGINT not null,
    amount INTEGER not null
);

alter table books
add t_feedback INTEGER not null DEFAULT 1;


create table buybook(
    rollno BIGINT not null,
    isbn BIGINT not null,
    owner bigint not NULL
);


truncate table exchange_log;

select * from books;

create table borrow_books(
    rollno BIGINT not null,
    owner BIGINT not null,
    isbn BIGINT not null PRIMARY key,
    startdate DATE not null,
    enddate date
);

create table exchange_log(
    rollno BIGINT not null,
    owner BIGINT not null,
    isbn1 BIGINT not  null,
    isbn2 BIGINT not null
);

CREATE TABLE `exchanged_books` (
 `ISBN` bigint(20) NOT NULL,
 `title` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
 `author` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
 `year` int(11) DEFAULT NULL,
 `semester` int(11) DEFAULT NULL,
 `edition` int(11) DEFAULT NULL,
 `description` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL,
 `category` char(1) COLLATE utf8_unicode_ci NOT NULL,
 `image` int(11) DEFAULT NULL,
 `rating` decimal(4,1) NOT NULL,
 `owner` int(11) NOT NULL,
 `highlight` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
 `publisher` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
 `language` char(200) COLLATE utf8_unicode_ci DEFAULT NULL,
 `book_category` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
 PRIMARY KEY (`ISBN`)
);

insert into 