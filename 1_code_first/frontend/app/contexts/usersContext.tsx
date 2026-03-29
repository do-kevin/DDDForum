import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { User } from "app/shared/user.types";

export type UserData = Omit<User, "password">;

const UserContext = createContext<{
  user: UserData | null;
  setUser: Dispatch<SetStateAction<UserData | null>>;
}>({
  user: null,
  setUser: () => null,
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
