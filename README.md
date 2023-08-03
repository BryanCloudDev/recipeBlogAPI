# Recipe Blog API

I improved this project using Express, it was previously made using PHP while I was studying programming, I applied clean code and SOLID principles to this project.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
- [Installation](#installation)
- [Author](#author)

## Overview

### The challenge

#### Non-authenticated actions

Actions that do not require authentication are view recipe information and register with their email address, get a recipe by id, get a photo for a recipe, search for a recipe by the title.

#### Authenticated actions

Regular users should be able to:

- Same actions as above plus create, edit, delete recipes, retrieve their profile information by the JWT, get a photo for a user, update their password and add or edit the photo of a recipe and personal profile.

Admin users should be able to:

- Same actions as above plus register new admin users, view users in the platform, get a user by id, update, delete and ban users.

## My process

### Built with

- Node.JS
- Express
- TypeScript
- TypeORM
- Passport
- Multer

### What I learned

While building this API, I gained valuable experience in structuring the architecture of an API effectively. I learned how to work with classes and SOLID principles, I learned also how to preoperly storage files and access them on the server by exposing a public folder with the files on it. Additionally, I became proficient in documenting APIs using API Blueprint with the [MSON](https://apiblueprint.org/documentation/mson/tutorial.html) format. I explored the usage of middlewares and custom requests to optimize data loading. I improved a lot the structure and resposabilities for each class in order to maje it as manitable and clear as possible.

### Continued development

I will continue enhancing my skills as a backend developer and strive to become an expert in design patterns, enabling me to design even better API's and systems.

## Installation

### Prerequisites

Before running this project, please make sure you have completed the following setup steps:

1- Node.js: Install Node.js from the official website (https://nodejs.org). I recommend using version 18.12.0.
After installation, you can verify the installation by typing the following command in your terminal:

```
node --version
```

Then, you can verify if you have npm installed by typing the following command in your terminal:

```
npm --version
```

I have 9.1.3 specifically.

### Setup

```
cd my-folder
git clone https://github.com/BryanCloudDev/recipeBlogAPI.git
```

### Install

This project requires additional dependencies. To install them for testing purposes only, please run the following command:

```
npm install
```

By running this command, the necessary dependencies to run the project will be installed. In addition to the necessary dependencies, this command will install development dependencies as well.

Now, I have provided a file named .env.example. Inside that file, you will find some environment variables. You need to create a MySQL database named 'recipe_blog'. After that's done, you can create a new file named '.env', make sure to fill in the missing variable values in the .env file inorder for the project to work.

After all dependencies have been installed, you can run the following command:

```
npm run build
```

Once it finishes, this will create a build that can be deployed. Then, you need to run:

```
npm start
```

You can also run it in a development mode using the following command:

```
npm run dev
```

It will log messages from errors in the console if required using the changes you may make to the TypeScript code.

This will start a new server where you can see the app running on port 3000 or the port of your choice. You can modify the port as needed. By starting the application it will pre-fill the datbase with some seeders created. Please note that this will be done when the database is empty, so the very first time.

The admin user is automatically added for you to login as an admin user, the credentials are:

```
email: example@example.com
password: secretpassword
```

You can go from there to login and create admin and regular users and access their endpoints respectively provided in the [postman collection](https://gist.github.com/BryanCloudDev/a20b4fdb32fe37a2d76620f65b2edcfb), in there it is very detailed how to access every endpoint.

You can also check the API specification created in Apiary using API Blueprint for this api [here](https://blogrecipe.docs.apiary.io/)

I will continue expading this project, thank you for takig the time to check it :D.

## Author

- Website - [bryancloud.dev](https://bryancloud.dev)
