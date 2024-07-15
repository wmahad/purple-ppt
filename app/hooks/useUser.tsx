import { User } from "@prisma/client";
import { SerializeFrom } from "@remix-run/node";
import { createContext, ReactNode, useContext } from "react";

type UserType = SerializeFrom<Omit<User, "password">>;

export const UserContext = createContext<UserType | undefined>(undefined);

export function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserType;
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useOptionalUser() {
  const userContext = useContext(UserContext);

  return userContext;
}

export default function useUser(): UserType {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error(
      "useUser has to be used within <CurrentUserContext.Provider>",
    );
  }

  return userContext;
}
