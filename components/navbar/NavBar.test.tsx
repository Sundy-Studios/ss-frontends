import { render, screen } from "@testing-library/react";
import NavBar from ".";

describe("NavBar", () => {
  it("renders MyApp title", () => {
    render(<NavBar />);
    expect(screen.getByText("MyApp")).toBeInTheDocument();
  });
});
