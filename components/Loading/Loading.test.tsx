import React from "react";
import { render, screen } from "@testing-library/react";
import Loading from "./index";

describe("Loading", () => {
  it("renders a progress spinner", () => {
    render(<Loading />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
