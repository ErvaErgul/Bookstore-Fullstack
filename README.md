# Introduction
This project was created by using Spring Boot and ReactJS.

The project is designed for 2 types of users.
- Customers
- Personnel

Customers can create accounts, add items to their carts, search for books by various types of parameters.

Personnel has the ability to perform CRUD operations on the database through the easy to use GUI.

The project is fully dockerized and uploaded to [dockerhub](https://hub.docker.com/r/ervaergul/bookstore/tags). You can use the "docker-compose.yml" file in the src directory to run the project.

To perform CRUD operations, log in with;
- username: erva
- password: password

# Backend
Backend is created using Spring Boot.

You can see the UML-Diagram containing information about the backend structure [here](https://lucid.app/lucidchart/9216b758-ac25-4855-be0f-4e03b573e5d0/edit?invitationId=inv_1ebcbe3c-eb75-413b-9f7f-1b1bdbef2e0c#)

![Bookstore - Fullstack](https://user-images.githubusercontent.com/80357887/176176950-f7bb647d-8f2a-4d72-90fd-d9a74f50169b.png)

There is also a Postman collection with various API requests so you can check out some of the responses the server will give you.

[Postman Collection](https://www.getpostman.com/collections/b9b968f50c64ae981b18)

## Security
The project makes use of Spring Security and JWTs.

You can see the security configuration for the endpoints here;

![image](https://user-images.githubusercontent.com/80357887/176177953-e668f8c6-b807-4b14-aaf8-eecd80d05209.png)

Every single HttpRequest sent to the protected endpoints must contain a valid Jwt in the "Authorization" header.

Jwts contain information about the user(authorities, username, expiration date of token).

If the Jwt is valid, the user is authorized, if not the server sends back a 401 response. 

## Exception Handling
Exceptions are handled globally with a single class and the server sends back a HttpResponse with the proper HttpStatus for the given exception.

![image](https://user-images.githubusercontent.com/80357887/176176605-3de3d586-7d1f-491f-863f-91bc5b56b91b.png)

# Frontend
Frontend is created using ReactJS and PrimeReact components.

The layout was created using CSS Flexbox and its fully responsive.

Here are some of the most important external libraries used in the frontend.

[PrimeReact](https://www.primefaces.org/primereact/) for components and also their CSS utility library (PrimeFlex).

[Zustand](https://github.com/pmndrs/zustand) for global state management.

[React Hook Form](https://react-hook-form.com) and [Yup](https://www.npmjs.com/package/yup) for form validation.

# Features to Be Added

This project was a learning experience for me and there is still many features that need to be implemented. Here are some of the most important ones;
- Pagination ( Right now the database contains a small number of books so there is no pagination )
- Improved Queries ( Queries with multiple parameters )
