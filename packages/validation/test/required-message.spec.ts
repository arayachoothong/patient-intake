import { describe, expect, it } from "vitest";
import { requiredMessage } from "../src/helpers/required-message.helper";

describe("requiredMessage", () => {
  it("formats Please enter {label}", () => {
    expect(requiredMessage("First name")).toBe("Please enter First name");
    expect(requiredMessage("Email")).toBe("Please enter Email");
  });
});
