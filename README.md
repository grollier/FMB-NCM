# FMB-NCM [^1]
[^1]: readme is subject to multiple changes as the project keeps developing.

### Template Based from the Tiangolo FastApi Template with some major changes.

# Introduction

While this template is based from the one shared in FastApi website [Full Stack FastAPI Template](https://fastapi.tiangolo.com/project-generation/)
it has its own major changes, on which I will descripe.

The major changes in this template are:

1. Mongodb instead of SQLAlchemy
2. Beani as the ODM
3. Nextjs app router instead of Vitejs
4. Chakra-UI v3

But why these changes?

- Short Answer: I really like python and mongodb, thus I wanted to work with both technologies.

- Long Answer: I have always liked working with mongodb and quench a thirst for learning more from it, but not so many companies, on which I have worked at, have projects working with nonSQL databases (I usually worked as backend dev), so I decided to dive into it in my free personal time. Thus resulting now on a full stack template that work with Mongo as the database and FastApi in the backend.

# Technologies and Tools

As mentioned before the major techonologies being used in this template are **FastAPI|MONGODB|NextJS** but there is much more under the hood that makes this template work and I will list them here and how they are being implemented in the template.

### Backend

___

1. **Beanie**
    - Like Alembic is to SQLAlchemy, Beanie is to Mongodb, on which Beanie is an object-document mapper. Beanie is compatible with Pydantic data models and it helps you leaverage from some boilerplate coding.
    Here is the link to their website [beanie](https://beanie-odm.dev/)

2. **Motor**
    - Motor is the driver for python that handles a coroutine-based API for non-blocking access to MongoDB. In this template we are working with AsyncIOMotor to create the client and it works with mongodb server api v1
    Here is the link to Motor docs [AsyncIOMotor](https://motor.readthedocs.io/en/stable/tutorial-asyncio.html)

3. **uv - Astral**
    - This is an extremely fast python package and project manager, written in Rust, which can be use instead of pip, pip-tools, poetry, etc.
    it provides a project management, with universal lockfile, and it can install and manage python versions. You can lear how to use it with FastApi from here [uv-Astral](https://docs.astral.sh/uv/guides/integration/fastapi/)

4. **MailHog**
    - The fullstack template that is provided by FastAPI official website has a configuration to work with your own smtp server, this fullstack template works with MailHog so you can test sending of emails as explain on their official github page [MailHog](https://github.com/mailhog/MailHog)

### Frontend

___

1. **NextJs + Chakra-UI v3+**
    - This fullstack template works with nextjs app router and chakra-ui following the documentation of how to use the Chakra provider to wrap the application and how to allowed complete customization for theming by scaffolding the defaulttokens and recipes using the CLI.

2. **heyopenapi/openapi**
    - Client generated using Hey Api that works with Nextjs client. You will find the generated client in the client folder inside the frontend. To update the types and sdk just run the script 'generate-client' this will update the openapijs being generated from your backend openapi docs, after it then you can work with your types for whatever you like.

3. **motion**
    - motion for React is an animation library with a hybrid engine. That means it offers both the hardware accelerated performace of native browser animations, coupled with the limitless potential of javascript animations. You can read more of this at their website and find many examples to work with [motion](https://motion.dev/docs/react-quick-start). This template mixes Chakra-UI theming and motion, thus handling some animations with Chakra-UI and expanding them with motion.

___

# Configuring before running

Well before you try and run the project you need to configurate your ".env" file which should be place at the root of the project folder. Don't know what or how write a .env file, let me give you a short intro:

##### .env files

In short .env files are plaintext files on which you store configuration settings, api keys, and other variables that you don't really want to be roaming hardcoded in your exposed internet application. example:

You create a new file .env and inside of it you declare your variables like this ``myvariable=variable``, now lets say you want to configure the .env file for this template then take into consideration the following env variables:

variables
: `DOMAIN` this is the domain the app will be running like your localhost
: `FRONTEND_HOST` this is the frontend endpoint nextjs runs on port 3000 by default
: `SESSION_SECRET` this is your session secret please write a strong secret
: `ENVIRONMENT` the environment you are running on 'local' 'staging' 'production'
: `PROJECT_NAME` your projects name, shown to API users
: `STACK_NAME` the name of the stack used for Docker Compose lables (no spaces, no periods)
: `SECRET_KEY`
: `FIRST_SUPERUSER` This is an email but you can always make the changes to use your users username instead of email
: `FIRST_SUPERUSER_PASSWORD` the password for the super user
: `MONGO_HOST` Your mongo cluster host
: `MONGO_DB` Your mongodb name
: `MONGO_USER` Your mongodb user name
: `MONGO_PASSWORD` Your mongodb password
: `DOCKER_IMAGE_BACKEND` Backend image name 
: `DOCKER_IMAGE_FRONTEND` Frontend image name

> At the same time you can find the .env file in the repository as an example as well.
