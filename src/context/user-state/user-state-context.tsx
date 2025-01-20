import { createContext, useContext } from "react";

export interface State {
  value?: boolean;
  setValue: (value: boolean) => void;
}

export interface UserStateContextInterface {
  claimInviteAvatarDialogDismissed: State;
  onboardingButtonDismissed: State;
  yourAvatarPopperDismissed: State;
}

const UserStateContext = createContext<UserStateContextInterface>({
  claimInviteAvatarDialogDismissed: { value: undefined, setValue: _value => undefined },
  onboardingButtonDismissed: { value: undefined, setValue: _value => undefined },
  yourAvatarPopperDismissed: { value: undefined, setValue: _value => undefined },
});

const useUserStateContext = (): UserStateContextInterface => useContext<UserStateContextInterface>(UserStateContext);

export { UserStateContext, useUserStateContext };
