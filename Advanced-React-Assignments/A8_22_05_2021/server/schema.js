import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Blog {
    id: ID
    blogName: String
    language: String
    stack: Stack
    description: String
    creator: [Creator]
  }
  type Creator {
    firstName: String
    lastName: String
    experience: Int
    profession: String
  }
    
  enum Stack {
    Study
    Research
    Adventure
    Medical
    Programming
    Reviews
  }

  type Query {
    getBlog(id: ID): Blog
    getBlogs: [Blog!]!
  }

  input BlogInput{
    id: ID
    blogName: String
    language: String
    stack: Stack
    description: String
    creator: [CreatorInput]
  }

  input CreatorInput{
    firstName: String
    lastName: String
    experience: Int
    profession: String
  }

  type Mutation {
    createBlog(input: BlogInput): Blog 
  }
`);

export default schema;
