export function invariant(
  condition: unknown,
  message: string | (() => string),
): asserts condition {
  if (!condition) {
    throw new Error(typeof message === "function" ? message() : message);
  }
}

export function invariantResponse(
  condition: unknown,
  message: string | (() => string),
  responseInit?: ResponseInit,
): asserts condition {
  if (!condition) {
    throw new Response(typeof message === "function" ? message() : message, {
      status: 400,
      ...responseInit,
    });
  }
}

export async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/",
  );
}
