import { OperationVariables } from "@apollo/client";

function getProfileIdFromVariables(variables?: OperationVariables): string {
  return variables && "userId" in variables ? `profile_${variables.userId as string}` : "";
}

export { getProfileIdFromVariables };
