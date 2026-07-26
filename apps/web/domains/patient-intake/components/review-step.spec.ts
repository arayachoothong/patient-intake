import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Gender } from "@patient/validation";
import { describe, expect, it, vi } from "vitest";
import { ReviewStep } from "./ReviewStep";

describe("ReviewStep", () => {
  it("renders read-only groups and emergency contact names", () => {
    const markup = renderToStaticMarkup(
      createElement(ReviewStep, {
        values: {
          firstName: "Ada",
          middleName: "",
          lastName: "Lovelace",
          dateOfBirth: "1815-12-10",
          gender: Gender.PreferNotToSay,
          phoneNumber: "+66812345678",
          email: "ada@example.com",
          address: "12 St James Square",
          preferredLanguage: "en",
          nationality: "British",
          religion: "",
          emergencyContacts: [
            { name: "Charles Babbage", relation: "Friend", phone: "+66823456789" },
          ],
        },
        goTo: vi.fn(),
      }),
    );

    expect(markup).toContain("Personal information");
    expect(markup).toContain("Contact");
    expect(markup).toContain("Preferences");
    expect(markup).toContain("Emergency contacts");
    expect(markup).toContain("Ada");
    expect(markup).toContain("ada@example.com");
    expect(markup).toContain("Charles Babbage");
    expect(markup).toContain("Prefer Not To Say");
    expect(markup).toContain("English");
    expect(markup).not.toContain("prefer_not_to_say");
    expect(markup).not.toContain("<input");
    expect(markup.match(/>Edit</g)).toHaveLength(4);
  });
});
