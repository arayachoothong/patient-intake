import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Gender } from "@patient/validation";
import { describe, expect, it } from "vitest";
import { SuccessReceipt } from "./SuccessReceipt";

describe("SuccessReceipt", () => {
  it("formats coded gender and language values for display", () => {
    const markup = renderToStaticMarkup(
      createElement(SuccessReceipt, {
        data: {
          firstName: "Ada",
          lastName: "Lovelace",
          gender: Gender.PreferNotToSay,
          preferredLanguage: "en",
        },
        submittedAt: "2026-07-26T12:00:00.000Z",
      }),
    );

    expect(markup).toContain("Prefer Not To Say");
    expect(markup).toContain("English");
    expect(markup).not.toContain("prefer_not_to_say");
  });
});
