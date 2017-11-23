// @flow
import React from "react";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";

import Character from "./Character";

export const networkInterface = createNetworkInterface({
  uri: "https://mpjk0plp9.lp.gql.zone/graphql",
});
export const client = new ApolloClient({ networkInterface });

export default () =>
  <ApolloProvider client={client}>
    <Character episode="bla" />
  </ApolloProvider>;