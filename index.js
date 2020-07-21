require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const User =mongoose.model("Users", {
    username: String,
    email: String,
    image: String
})

const typeDefs = `
    type Query{
        getUser(id: ID!): User
        getUsers: [User]
    }
    type User{
        id: ID!
        username: String!
        email: String!
        image: String
    }
    type Mutation {
        addUser(username: String!, email: String!): User!,
        deleteUser(id: ID!): String
    }
`

const resolvers = {
    Query: {
        getUser: async(_, { id }) => {
            const result = await User.findById(id);
            return result;
        },
        getUsers: ()=> User.find()
    },
    Mutation: {
        addUser: async(_, {username, email}) => {
            const user = new User({ username, email });
            await user.save();
            return user;
        },
        deleteUser: async(_, { id }) => {
            await User.findByIdAndRemove(id);
            return "User deleted"
        }
    }
}



const server = new GraphQLServer({ typeDefs, resolvers})
mongoose.connection.once("open", () => {
    server.start(() => console.log('Server is running on localhost:4000'))
})