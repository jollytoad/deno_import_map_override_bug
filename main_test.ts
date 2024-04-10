import { fail } from "@std/assert/fail";

Deno.test("always fail", () => {
  fail("meh");
});
