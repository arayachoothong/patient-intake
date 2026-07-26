import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/http/axios-client", () => ({
  api: { get: vi.fn(), post: vi.fn(), patch: vi.fn() },
}));

import { api } from "@/lib/http/axios-client";
import { createSession, listSessions } from "./session-api";

describe("session-api", () => {
  beforeEach(() => vi.clearAllMocks());

  it("listSessions GETs /api/sessions", async () => {
    vi.mocked(api.get).mockResolvedValue({ data: [] });
    await listSessions();
    expect(api.get).toHaveBeenCalledWith("/api/sessions");
  });

  it("createSession POSTs /api/sessions", async () => {
    const session = { id: "1" };
    vi.mocked(api.post).mockResolvedValue({ data: session });
    await expect(createSession()).resolves.toEqual(session);
    expect(api.post).toHaveBeenCalledWith("/api/sessions");
  });
});
