// @flow
import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import type { OperationComponent, QueryProps } from "react-apollo";

export type Props = Response & QueryProps;

export const HERO_QUERY = gql`
  query GetCharacter($episode: Episode!) {
    hero(episode: $episode) {
      name
      id
      friends {
        name
        id
        appearsIn
      }
    }
  }
`;

export type Hero = {
  name: string,
  id: string,
  appearsIn: string[],
  friends: Hero[],
};

export type InputProps = {
  episode: string,
};

export type Response = {
  hero: Hero,
};

export const withCharacter: OperationComponent<Response, InputProps, Props> = graphql(HERO_QUERY, {
  options: ({ episode }) => ({
    variables: { episode },
  }),
  props: ({ data }) => ({ ...data }),
});

export default withCharacter(({ loading, hero, error }) => {
  if (loading) return <div>Loading</div>;
  if (error) return <h1>ERROR</h1>;
  return (
    <div>
      {hero &&
        <div>
          <h3>{hero.name}</h3>
          {hero.friends.map(friend =>
            <h6 key={friend.id}>
              {friend.name}:
              {" "}{friend.appearsIn.map(x => x.toLowerCase()).join(", ")}
            </h6>
          )}
        </div>}
    </div>
  );
});
