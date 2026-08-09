import { describe, expect, it } from "vitest";
import { createExpandedSession, expandedSteps, nextExpandedStep, parseExpandedSession } from "./expanded-session";

describe("expanded skill sessions", () => {
  it("use the common seven-step learning loop", () => { expect(expandedSteps).toHaveLength(7); expect(nextExpandedStep("think")).toBe("reveal"); expect(nextExpandedStep("summary")).toBe("summary"); });
  it("persist per skill and reject another content version", () => { const session = createExpandedSession("elasticity", "0.2", 12); expect(parseExpandedSession(JSON.stringify({ ...session, currentStep: "challenge" }), "elasticity", "0.2", 0).currentStep).toBe("challenge"); expect(parseExpandedSession(JSON.stringify(session), "elasticity", "0.3", 0).currentStep).toBe("entry"); });
});
