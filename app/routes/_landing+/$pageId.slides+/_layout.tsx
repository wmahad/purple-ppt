import { ActionIcon, Card, Text, Grid, Stack, Center } from "@mantine/core";
import { Link, Outlet, useParams } from "@remix-run/react";
import { IconPlus } from "@tabler/icons-react";

export default function AppPage() {
  return (
    <Grid gutter={50}>
      <Grid.Col span={2} pr={4}>
        <Stack>
          {[1, 2, 3, 4].map((page) => (
            <PageView1 key={page} item={page} />
          ))}
          <PageView />
        </Stack>
      </Grid.Col>
      <Grid.Col span="auto">
        <Outlet />
      </Grid.Col>
    </Grid>
  );
}
function PageView1({ item }: { item: number }) {
  const params = useParams();
  return (
    <Card shadow="xs" padding="lg" withBorder>
      <Text
        fw={500}
        size="lg"
        component={Link}
        to={`/${params.pageId}/slides/${item}`}
      >
        Page {item}
      </Text>
    </Card>
  );
}

function PageView() {
  return (
    <Card shadow="xs" withBorder>
      <Center>
        <ActionIcon size={80} variant="transparent" color="grey">
          <IconPlus style={{ width: "90%", height: "90%" }} />
        </ActionIcon>
      </Center>
    </Card>
  );
}
