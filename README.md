# Tutorly
A web application to connect tutors and student.

[https://www.tutor-me.io/](https://www.tutor-me.io/)

A tutor can
- create and manage courses
- add students and create meetings
- import calendly meetings
- create email templates to automate tasks


## User Story

### basic features

> * AS A Tutor
> * I WANT an app to track student meetings and manage email coresspondences.

> * WHEN I create an account
> * THEN I can add a course

> * WHEN I create a course
> * THEN a course tab is added
> * AND I can add students

> * WHEN I add a student
> * THEN the student is added to a list
> * AND I can schedule a meeting.
> * IF I have added an EMAIL_ACCESS_TOKEN
>   * THEN I can send an introduction email                 

> * WHEN I schedula a meeting
> * THEN the meeting is added to a list
> * IF I have added an EMAIL_ACCESS_TOKEN
>   * THEN I can send a confirmataion email


> * IF I have added an EMAIL_ACCESS_TOKEN
>   * THEN Tutorly can send an email on my behalf

> * WHEN I open the email editor
> * THEN I can create my first template

> * WHEN I send an email to a student
> * THEN I am presented 3 options
>   1. new email
>      * WHEN I select 'new email'
>      * THEN I am presented with an editor window
>   2. choose a template
>      * WHEN I select 'choose a template'
>      * THEN I am presented with a list of templates
>      * WHEN I select a template
>      * THEN a emplate preview is displayed with the students information filled in
>   3. create a template
>      * WHEN I select 'create a template'
>      * THEN I am presented with an editor window AND a help section 



### calendly access
> * WHEN I add an access token
> * THEN my scheduled calendly meetings are loaded with the rest of my meetingas


### email access
> * WHEN I add an access token
> * THEN Tutorly can send emails on my behalf

<hr>

## Tutor ⇄ Course
* Tutor has many Courses
* Course belongs to one Tutor

## Course ⇄ Student
* Course has many Students
* Students belong to one Course

## Student ⇄ Meeting
* Student has many Meetings
* Meeting belongs to one Student

<hr>

## Student can be 1 of 3 states
> 1. new
> 2. active
> 3. graduated

## Meeting can be 1 of 5 states
> 1. new
> 2. confirmed
> 3. rescheduled
> 4. cancelled
> 5. complete