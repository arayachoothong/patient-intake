import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Gender } from "@patient/validation";
import { describe, expect, it } from "vitest";
import { SuccessReceipt } from "@/domains/patient-intake/components/success/SuccessReceipt";

describe("SuccessReceipt", () => {
  it("formats coded gender and language values for display", () => {
    const markup = renderToStaticMarkup(
      createElement(SuccessReceipt, {
        data: {
          firstName: "Ada",
          lastName: "Lovelace",
          gender: Gender.PreferNotToSay,
          preferredLanguage: "en",
          phoneNumber: "0614845566",
          email: "ada@example.com",
        },
        submittedAt: "2026-07-26T12:00:00.000Z",
      }),
    );

    expect(markup).toContain("Prefer Not To Say");
    expect(markup).toContain("English");
    expect(markup).not.toContain("prefer_not_to_say");
    expect(markup).toContain("061-4845566");
    expect(markup).toContain("ada@example.com");
    expect(markup).toContain("Email");
  });
});
