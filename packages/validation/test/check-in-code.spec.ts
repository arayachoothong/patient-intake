import { describe, expect, it } from "vitest";
import { checkInCode } from "../src/helpers/check-in-code.helper";

describe("checkInCode", () => {
  it("formats first 8 hex chars as XXXX-XXXX", () => {
    expect(checkInCode("a1b2c3d4-e5f6-7890-abcd-ef1234567890")).toBe("A1B2-C3D4");
  });

  it("strips hyphens before slicing", () => {
    expect(checkInCode("00000000-1111-2222-3333-444444444444")).toBe("0000-0000");
  });
});
