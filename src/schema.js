import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} from 'graphql';

import {
  resolveValue,
  getPersonList,
  createPerson,
  updatePerson,
  deletePerson,
  getPostList,
  createPost,
  updatePost,
  deletePost,
  getPostsFromPerson,
  getPersonFromPost
} from '~/resolvers';

let RequiredString = new GraphQLNonNull(GraphQLString);
let RequiredInt = new GraphQLNonNull(GraphQLInt);

let Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: resolveValue('id')
    },
    firstName: {
      type: GraphQLString,
      resolve: resolveValue('firstName')
    },
    lastName: {
      type: GraphQLString,
      resolve: resolveValue('lastName')
    },
    email: {
      type: GraphQLString,
      resolve: resolveValue('email')
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: getPostsFromPerson
    }
  })
});

let Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a Post',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: resolveValue('id')
    },
    title: {
      type: GraphQLString,
      resolve: resolveValue('title')
    },
    content: {
      type: GraphQLString,
      resolve: resolveValue('content')
    },
    person: {
      type: Person,
      resolve: getPersonFromPost
    }
  })
});

let Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    person: {
      type: new GraphQLList(Person),
      args: {
        id: {type: GraphQLInt},
        email: {type: GraphQLString}
      },
      resolve: getPersonList
    },
    post: {
      type: new GraphQLList(Post),
      args: {
        id: {type: GraphQLInt}
      },
      resolve: getPostList
    }
  })
});

let Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Methods to change objects in the database',
  fields: () => ({
    createPerson: {
      type: Person,
      args: {
        firstName: {type: RequiredString},
        lastName: {type: RequiredString},
        email: {type: RequiredString}
      },
      resolve: createPerson
    },
    updatePerson: {
      type: Person,
      args: {
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        id: {type: RequiredInt}
      },
      resolve: updatePerson
    },
    deletePerson: {
      type: Person,
      args: {
        id: {type: RequiredInt}
      },
      resolve: deletePerson
    },
    createPost: {
      type: Post,
      args: {
        personId: {type: RequiredInt},
        title: {type: RequiredString},
        content: {type: RequiredString}
      },
      resolve: createPost
    },
    updatePost: {
      type: Post,
      args: {
        id: {type: RequiredInt},
        title: {type: GraphQLString},
        content: {type: GraphQLString}
      },
      resolve: updatePost
    },
    deletePost: {
      type: Post,
      args: {
        id: {type: RequiredInt}
      },
      resolve: deletePost
    }
  })
});

let Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
