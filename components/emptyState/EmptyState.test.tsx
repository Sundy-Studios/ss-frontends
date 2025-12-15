import React from "react";
import { render, screen } from "@testing-library/react";
import EmptyState from ".";

describe("EmptyState", () => {
  it("renders default message when no message prop is provided", () => {
    render(<EmptyState />);
    expect(screen.getByText("Item not found")).toBeInTheDocument();
  });

  it("renders custom message when message prop is provided", () => {
    const customMessage = "No results found";
    render(<EmptyState message={customMessage} />);
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});
