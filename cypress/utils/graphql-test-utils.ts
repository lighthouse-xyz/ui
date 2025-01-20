interface GraphQLRequest {
  body: {
    query: string;
    variables?: { [key: string]: unknown };
    operationName?: string;
  };
  alias?: string;
}
// Utility to match GraphQL mutation based on the operation name
export const hasOperationName = (req: GraphQLRequest, operationName: string): boolean => {
  const { body } = req;
  return Object.prototype.hasOwnProperty.call(body, "operationName") && body.operationName === operationName;
};

// Alias query if operationName matches
export const aliasQuery = (req: GraphQLRequest, operationName: string): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Query`;
  }
};

// Alias mutation if operationName matches
export const aliasMutation = (req: GraphQLRequest, operationName: string): void => {
  if (hasOperationName(req, operationName)) {
    req.alias = `gql${operationName}Mutation`;
  }
};
