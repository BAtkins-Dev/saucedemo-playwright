import { test, expect } from "@playwright/test";

test("get a single user returns 200", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/2");
  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.data.email).toBe("janet.weaver@reqres.in");
});

test("get a non-existent user returns 404", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users/23");
  expect(response.status()).toBe(404);
});
