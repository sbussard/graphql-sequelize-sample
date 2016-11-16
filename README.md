# graphql-sequelize-sample

It's a boilerplate!

![](https://cdn.meme.am/instances/400x/67365944.jpg)

I know, it's the most generic name possible.

Lee Benson made an [awesome YouTube video on GraphQL](https://www.youtube.com/watch?v=DNPVqK_woRQ) and I decided to build the same app, but flesh it out a bit more and add even more babel-iciousness.

## Installation

1. Clone this project
2. Set up a database that is supported by sequelize
3. Create a `.env` file in the project folder. (see below for details)
4. Run `npm i`
5. Run `npm start`

### Environment

The `.env` file is only used in `configuration.js`. It should look something like this:  

```
export SQ_DATABASE=database_name
export SQ_USERNAME=
export SQ_PASSWORD=
export SQ_HOST=
export SQ_DIALECT=sqlite
export ENVIRONMENT=DEVELOPMENT
export PORT=4000
```  

### Windows

Sorry I didn't make this for windows. If you want it to work there you'll probably need to change the scripts section of package.json to be compatible, and you'll probably need to make your .env file a bit differently to set the environment variables.
