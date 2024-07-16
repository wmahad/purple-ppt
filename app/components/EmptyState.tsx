import { Title, Text, Container } from "@mantine/core";
import classes from "./EmptyState.module.css";

export function EmptyState() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>🧟 </div>
      <Title className={classes.title}>{"Welcome! Let's Get Started! "}</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        To kick things off, please create a few presentations. This will help
        you get familiar with our features and set you up for success. 🚀
      </Text>
    </Container>
  );
}
