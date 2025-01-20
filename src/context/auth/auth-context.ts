import { Profile, Role } from "@src/common/graphql/generated/user.schema.graphql";
import { createContext, useContext } from "react";

interface AuthContextInterface {
  connected: boolean;
  hasRole: (role: Role) => boolean;
  loading: boolean;
  logUserOut: () => void;
  profile: Profile | null;
}

const AuthContext = createContext<AuthContextInterface>({
  profile: null,
  loading: true,
  connected: false,
  hasRole: () => false,
  logUserOut: () => {
    return;
  },
});

const useAuthContext = (): AuthContextInterface => useContext<AuthContextInterface>(AuthContext);

export { AuthContext, useAuthContext };
