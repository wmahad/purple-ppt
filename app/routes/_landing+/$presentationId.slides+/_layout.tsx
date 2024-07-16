import {
  ActionIcon,
  Card,
  Text,
  Grid,
  Stack,
  Center,
  Group,
  rem,
} from "@mantine/core";
import { Link, Outlet, useFetcher, useLoaderData } from "@remix-run/react";
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
  SerializeFrom,
} from "@remix-run/node";

import { IconPlus } from "@tabler/icons-react";
import {
  addPageToPresentation,
  deletePage,
  getPageContents,
} from "~/data/pages.server";
import { invariantResponse } from "~/utils";
import { Content, Page } from "@prisma/client";
import { DeleteIcon } from "~/components/DeleteIcon";

interface CustomPage extends Page {
  contents: Content[];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariantResponse(params.presentationId, "Missing presentation id");
  invariantResponse(params.id, "Missing page id");
  const response = await getPageContents(params.presentationId);

  invariantResponse(
    response,
    "There're currently no pages for this presentation",
  );

  const pages = response.pages as unknown as CustomPage[];
  const pageContent = pages.find((page) => page.id === params.id);

  return json({
    version: {
      ...response,
      pages,
    },
    pageContent,
  });
};

export type PageContentsLoader = typeof loader;

export const action = async ({ request, params }: ActionFunctionArgs) => {
  invariantResponse(params.presentationId, "Missing presentation id");

  const form = Object.fromEntries(await request.formData());

  if (form._action === "delete") {
    await deletePage(form.id as string);
  } else if (form._action === "create") {
    const page = await addPageToPresentation(params.presentationId);
    return redirect(`/${page.presentationId}/slides/${page.id}`);
  }

  return null;
};

export default function AppPage() {
  const {
    version: { pages },
  } = useLoaderData<PageContentsLoader>();
  return (
    <Grid gutter={50} align="stretch">
      <Grid.Col span={2} pr={4} style={{ minHeight: rem(800) }}>
        <Stack>
          {pages.map((page, index) => (
            <PageItem key={page.id} count={index + 1} page={page} />
          ))}
          {pages.length < 20 && <AddPage />}
        </Stack>
      </Grid.Col>
      <Grid.Col span="auto" style={{ minHeight: rem(800) }}>
        <Outlet />
      </Grid.Col>
    </Grid>
  );
}
function PageItem({
  count,
  page,
}: {
  count: number;
  page: SerializeFrom<Page>;
}) {
  return (
    <Card shadow="xs" padding="lg" withBorder>
      <Group justify="space-between">
        <Text
          fw={500}
          size="lg"
          component={Link}
          to={`/${page.presentationId}/slides/${page.id}`}
        >
          Page {count}
        </Text>
        {count > 1 && <DeleteIcon id={page.id} />}
      </Group>
    </Card>
  );
}

function AddPage() {
  const fetcher = useFetcher<never>();
  const isLoading = fetcher.state === "submitting";

  return (
    <Card shadow="xs" withBorder>
      <Center>
        <fetcher.Form method="post">
          <ActionIcon
            type="submit"
            name="_action"
            value="create"
            size={40}
            variant="transparent"
            color="grey"
            disabled={isLoading}
          >
            <IconPlus style={{ width: "90%", height: "90%" }} />
          </ActionIcon>
        </fetcher.Form>
      </Center>
    </Card>
  );
}
