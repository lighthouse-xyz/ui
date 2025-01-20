import { ApolloError, gql, useQuery } from "@apollo/client";
import { ClientName } from "@src/common/enums/client-name.enum";

interface HelloWorldResponse {
  helloWorld: string;
}

export const helloWorldQuery = gql`
  query HelloWorld {
    helloWorld
  }
`;

function useHelloWorld(): {
  loading: boolean;
  error?: ApolloError;
  data?: HelloWorldResponse;
} {
  const { loading, error, data } = useQuery<HelloWorldResponse>(helloWorldQuery, {
    context: {
      clientName: ClientName.user,
    },
  });

  return { loading, error, data };
}

export default useHelloWorld;
