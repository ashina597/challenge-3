CREATE DATABASE Todo;
USE Todo;
select *from tasks

alter table tasks
add assignedTo varchar(100)

--create table tasks
create table tasks(
id varchar(100) unique,
title varchar(50),
descriptions varchar(100),
completionDate date,
status varchar(50)
)

alter table tasks
alter column completiondate varchar(50)

--create a task
CREATE OR ALTER  PROCEDURE createtask(
@id varchar(100), 
@title varchar(50), 
@description varchar(100),
@date date,
@status varchar(50),
@assignedTo varchar(100)
)
AS 
BEGIN 
INSERT INTO tasks(id, title,descriptions, completionDate, status, assignedTo)
VALUES (@id, @title, @description, @date, @status, @assignedTo)
END



EXECUTE createtask 
@id = '3312',
@title = 'nodejs',
@description = 'challenge',
@date = '2022.07.22',
@status = 'complete'


SELECT * FROM tasks
DROP PROCEDURE createtask

--get all tasks
CREATE PROCEDURE gettasks
AS BEGIN
SELECT * FROM tasks
END

drop procedure gettasks

--get task by id
CREATE PROCEDURE gettask
(@id varchar(100))
AS BEGIN
SELECT * FROM tasks WHERE id = @id
END

--get completed tasks
CREATE PROCEDURE getcompleted
AS BEGIN
SELECT * FROM tasks WHERE status = 'completed'
END
drop procedure getcompleted
execute getcompleted

--get uncompleted tasks
CREATE PROCEDURE getuncompleted
AS BEGIN
SELECT * FROM tasks WHERE status = 'not complete'
END

delete from tasks
--delete a task
CREATE PROCEDURE deletetask(
@id varchar(100)
)
AS BEGIN
DELETE FROM tasks WHERE id=@id
END

execute deletetask
@id = 'f6a12c50-cc3a-11ec-bcd8-33c61cfe2c6b'

select * from tasks

--update a task
CREATE OR ALTER PROCEDURE updatetask(
@id varchar(100), 
@title varchar(50), 
@description varchar(100), 
@date date,
@assignedTo varchar(100)
)
AS BEGIN
UPDATE tasks SET 
		title = @title , 
		descriptions = @description,
		completionDate = @date,
		assignedTo = @assignedTo
		WHERE id = @id
END

execute updatetask
@id = 'a42c6100-cf83-11ec-9ef3-5fea9ba6be4f',
@title = 'c++',
@description = 'challenge',
@date = '2022-05-07',
@assignedTo = 'ashinabarasa@gmail.com'

drop procedure updatetask
select * from tasks

----complete a task
CREATE OR ALTER PROCEDURE completetask(
@id varchar(100),
@submission varchar(50)
)
AS BEGIN
UPDATE tasks SET 
		status = 'completed',
		submission = @submission
		WHERE id = @id
END

drop procedure completetask

select * from tasks

execute completetask
@id = '0d1de0e0-ce20-11ec-9ea8-351c960b3487'

delete from tasks
ALTER TABLE tasks
ALTER COLUMN completionDate
date

alter table tasks
add submissionstatus varchar(50)
