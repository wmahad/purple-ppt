import { Link, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Error404Page from "./Error404Page";

import { Title, Text, Button, Container, Group } from "@mantine/core";
import classes from "./ServerError.module.css";

export default function ServerError() {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  const errorCode = isRouteError ? error.status : 500;
  const message = isRouteError
    ? error.data.message
    : "Our servers could not handle your request. Don&apos;t worry, our development team was already notified. Try refreshing the page.";

  // This is just for dev, if you want to log server errors do it on entry.server.ts
  console.error(error);

  if (errorCode === 404) return <Error404Page />;

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <div className={classes.label}>{errorCode}</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size="lg" className={classes.description}>
          {message}
        </Text>
        <Group justify="center">
          <Link to="/">
            <Button variant="white" size="md">
              Go home
            </Button>
          </Link>
        </Group>
      </Container>
    </div>
  );
}
