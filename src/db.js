import Sequelize from 'sequelize';
import {isDev, sequelizeConfiguration} from '~/configuration';

let {database, personname, password, configuration} = sequelizeConfiguration;

let Database = new Sequelize(database, personname, password, configuration);

let defaultModel = {
  freezeTableName: true,
  underscored: true,
};

let criticalModel = {
  freezeTableName: true,
  underscored: true,
  paranoid: true,
};

let personSchema = {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
};

let postSchema = {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

let Person = Database.define('person', personSchema, criticalModel);
let Post = Database.define('post', postSchema, defaultModel);

Person.hasMany(Post);
Post.belongsTo(Person);

if (isDev) {
  let _ = require('lodash');
  let Faker = require('faker');

  let getFakePerson = () => ({
    firstName: Faker.name.firstName(),
    lastName: Faker.name.lastName(),
    email: Faker.internet.email()
  });

  let getFakePost = (person) => ({
    title: `${person.firstName}'s first post`,
    content: `here's my email address: ${person.email}`
  });

  let makeFakePost = (person) => person.createPost(getFakePost(person));
  let makeFakePerson = () => Person.create(getFakePerson()).then(makeFakePost);
  let generateFakeData = () => _.times(5, makeFakePerson);

  Database
    .sync({force: true})
    .then(generateFakeData);
}

export default Database;
