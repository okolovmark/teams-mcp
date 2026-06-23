import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock external dependencies
vi.mock("fs/promises");
vi.mock("@modelcontextprotocol/sdk/server/mcp.js");
vi.mock("@modelcontextprotocol/sdk/server/stdio.js");

// Mock console methods
const mockConsoleLog = vi.fn();
const mockConsoleError = vi.fn();
const mockProcessExit = vi.fn();

// Setup global mocks
beforeEach(() => {
  vi.clearAllMocks();

  // Mock console methods
  vi.spyOn(console, "log").mockImplementation(mockConsoleLog);
  vi.spyOn(console, "error").mockImplementation(mockConsoleError);
  vi.spyOn(process, "exit").mockImplementation(mockProcessExit as any);

  // Reset process.argv
  process.argv = ["node", "index.js"];
});

// Simple integration tests for basic functionality
describe("MCP Server Integration", () => {
  describe("CLI Commands", () => {
    it("should handle help command", async () => {
      process.argv = ["node", "index.js", "--help"];

      // Dynamically import to get fresh module state
      await import("../index.js");

      expect(mockConsoleLog).toHaveBeenCalledWith("Microsoft Graph MCP Server");
      expect(mockConsoleLog).toHaveBeenCalledWith("Usage:");
      expect(mockConsoleLog).toHaveBeenCalledWith(expect.stringContaining("authenticate"));
    });
  });
});
