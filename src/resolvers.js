import Database from '~/db';

// helpers
let processEmailField = ({firstName, lastName, email}) => ({
  firstName,
  lastName,
  email: email.toLowerCase()
});

let sanitize = (input) => {
  let output = {...input};
  delete output.id;
  delete output.personId;

  return output;
};

// generic
export let resolveValue = (item) => (args) => args[item];

// person
export let getPersonList = (args) => Database.models.person.findAll({where: args});
export let createPerson = (_, args) => Database.models.person.create(processEmailField(args));
export let updatePerson = (_, args) => {
  let id = args.id;
  let makeChanges = (person) => person.update(sanitize(args));

  return Database.models.person.findById(id).then(makeChanges);
};
export let deletePerson = (_, args) => Database.models.person.destroy({where: args});

// post
export let getPostList = (args) => Database.models.post.findAll({where: args});
export let createPost = (_, args) => {
  let personId = args.personId;
  let createPostForPerson = (person) => person.createPost(sanitize(args));

  return Database.models.person.findById(personId).then(createPostForPerson);
};
export let updatePost = (_, args) => {
  let id = args.id;
  let makeChanges = (post) => post.update(sanitize(args));

  return Database.models.post.findById(id).then(makeChanges);
}
export let deletePost = (_, args) => Database.models.post.destroy({where: args});

// mixed
export let getPostsFromPerson = (person) => person.getPosts();
export let getPersonFromPost = (post) => post.getPerson();
