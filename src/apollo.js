import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  resolvers: {
    Title: {
      isLiked: () => false,
    },
    Mutation: {
      likeMovie: (_, { id, isLiked }, { cache }) => {
        console.log(isLiked);
        const myMovie = {
          __typename: "Title",
          id: `${id}`,
          isLiked: `${isLiked}`,
        };
        cache.modify({
          id: cache.identify(myMovie),
          fields: {
            isLiked(cachedName) {
              return !isLiked;
            },
          },
        });
      },
    },
  },
});

export default client;
