import { describe, expect, it } from "vitest";
import { emailSchema, formatPhoneDisplay, normalizePhone, phoneSchema } from "../src/contact-rules";

describe("normalizePhone", () => {
  it("strips spaces, dashes and parentheses", () => {
    expect(normalizePhone(" (081) 234-5678 ")).toBe("0812345678");
  });
});

describe("formatPhoneDisplay", () => {
  it("formats local numbers as XXX-XXXXXXX", () => {
    expect(formatPhoneDisplay("0614845566")).toBe("061-4845566");
    expect(formatPhoneDisplay("0812345678")).toBe("081-2345678");
  });

  it("converts +66 to local 0-prefix display", () => {
    expect(formatPhoneDisplay("+66814845566")).toBe("081-4845566");
    expect(formatPhoneDisplay("+66 81 234 5678")).toBe("081-2345678");
  });

  it("returns empty for blank input", () => {
    expect(formatPhoneDisplay("")).toBe("");
    expect(formatPhoneDisplay("   ")).toBe("");
  });
});

describe("phoneSchema (Thailand)", () => {
  it.each(["0812345678", "081-234-5678", "+66812345678", "+66 81 234 5678", "021234567"])(
    "accepts %s",
    (value) => {
      expect(phoneSchema.safeParse(value).success).toBe(true);
    },
  );

  it.each(["", "12345", "081234567890", "+1234567890", "08a2345678", "66812345678"])(
    "rejects %s",
    (value) => {
      expect(phoneSchema.safeParse(value).success).toBe(false);
    },
  );

  it("uses Please enter {label} when empty", () => {
    const result = phoneSchema.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Please enter Phone number");
    }
  });

  it("normalizes to digits on success", () => {
    const result = phoneSchema.safeParse("081-234-5678");
    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toBe("0812345678");
  });
});

describe("emailSchema", () => {
  it.each(["ada@example.com", " ada@example.com "])("accepts %s", (value) => {
    expect(emailSchema.safeParse(value).success).toBe(true);
  });

  it.each(["", "not-an-email", "ada@", "@example.com", "ada example.com"])(
    "rejects %s",
    (value) => {
      expect(emailSchema.safeParse(value).success).toBe(false);
    },
  );

  it("uses Please enter {label} when empty", () => {
    const result = emailSchema.safeParse("");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Please enter Email");
    }
  });
});
