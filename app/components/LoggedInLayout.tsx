import { ReactNode } from "react";
import { UserProvider } from "~/hooks/useUser";
import { AppShell, rem } from "@mantine/core";
import { useHeadroom } from "@mantine/hooks";
import { AppHeader } from "./AppHeader";
import { SerializeFrom } from "@remix-run/node";
import { User } from "@prisma/client";

export default function LoggedInLayout({
  user,
  children,
}: {
  user: SerializeFrom<Omit<User, "password">>;
  children: ReactNode;
}) {
  const pinned = useHeadroom({ fixedAt: 30 });

  return (
    <UserProvider user={user}>
      <AppShell header={{ height: 80, offset: false }} padding="lg">
        <AppShell.Header withBorder={!pinned} px={100}>
          <AppHeader />
        </AppShell.Header>

        <AppShell.Main
          px={120}
          pt={`calc(${rem(80)} + var(--mantine-spacing-md))`}
        >
          {children}
        </AppShell.Main>
      </AppShell>
    </UserProvider>
  );
}
