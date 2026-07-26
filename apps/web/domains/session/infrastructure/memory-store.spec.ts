import { beforeEach, describe, expect, it } from "vitest";
import { _resetStoreForTests } from "./memory-store";
import { createSession } from "../use-cases/create-session";
import { getSession } from "../use-cases/get-session";
import { listSessions } from "../use-cases/list-sessions";
import { patchSession } from "../use-cases/patch-session";
import { submitSession } from "../use-cases/submit-session";

describe("session domain store", () => {
  beforeEach(() => {
    _resetStoreForTests();
  });

  it("creates a filling session with 0 progress", () => {
    const session = createSession();
    expect(session.status).toBe("filling");
    expect(session.progress).toBe(0);
    expect(session.data.emergencyContacts).toEqual([{ name: "", relation: "", phone: "" }]);
    expect(listSessions()).toHaveLength(1);
  });

  it("patches fields and recomputes progress", () => {
    const session = createSession();
    const updated = patchSession(session.id, {
      data: { firstName: "Ada", lastName: "Lovelace" },
      activeField: "firstName",
      isTyping: true,
    });
    expect("error" in updated).toBe(false);
    if (!("error" in updated)) {
      expect(updated.progress).toBe(17);
      expect(updated.activeField).toBe("firstName");
      expect(updated.isTyping).toBe(true);
    }
  });

  it("submits when payload is valid", () => {
    const session = createSession();
    const result = submitSession(session.id, {
      firstName: "Ada",
      lastName: "Lovelace",
      dateOfBirth: "1990-05-10",
      gender: "female",
      phoneNumber: "+66812345678",
      email: "ada@example.com",
      address: "1 Rd",
      preferredLanguage: "en",
      nationality: "Thai",
      emergencyContacts: [{ name: "Bob", relation: "Spouse", phone: "+66991234567" }],
    });
    expect("error" in result).toBe(false);
    if (!("error" in result)) {
      expect(result.status).toBe("submitted");
      expect(result.progress).toBe(100);
    }
  });

  it("rejects patch when session is already submitted", () => {
    const session = createSession();
    const submitted = submitSession(session.id, {
      firstName: "Ada",
      lastName: "Lovelace",
      dateOfBirth: "1990-05-10",
      gender: "female",
      phoneNumber: "+66812345678",
      email: "ada@example.com",
      address: "1 Rd",
      preferredLanguage: "en",
      nationality: "Thai",
      emergencyContacts: [{ name: "Bob", relation: "Spouse", phone: "+66991234567" }],
    });
    expect("error" in submitted).toBe(false);

    const patched = patchSession(session.id, {
      data: { firstName: "Changed" },
      isTyping: true,
    });
    expect(patched).toEqual({ error: "conflict" });

    const current = getSession(session.id);
    expect(current?.data.firstName).toBe("Ada");
    expect(current?.isTyping).toBe(false);
    expect(current?.status).toBe("submitted");
  });

  it("returns not_found for unknown id on patch", () => {
    expect(patchSession("missing", { data: { firstName: "Ada" } })).toEqual({
      error: "not_found",
    });
  });

  it("returns undefined for unknown id", () => {
    expect(getSession("missing")).toBeUndefined();
  });
});
