const { ApolloServer, gql } = require("apollo-server");
const todos = [
	{ name: "eat" },
	{ name: "code" },
	{ name: "sleep" },
	{ name: "repeat" },
];
const typeDefs = gql`
	type Todo {
		name: String!
	}
	type Query {
		allTodos: [Todo]!
	}
	type Mutation {
		addTodo(name: String!): Todo!
	}
`;

const resolvers = {
	Query: {
		allTodos: () => todos,
	},
	Mutation: {
		addTodo: (root, { name }) => {
			const newTodo = { name };
			todos.push(newTodo);
			return newTodo;
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

server.listen().then(({ url }) => {
	console.log(`server ready at ${url}`);
});
