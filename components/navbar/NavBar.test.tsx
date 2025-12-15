import { render, screen } from "@testing-library/react";
import NavBar from ".";
import { AuthProvider } from "@/firebase/auth";

describe("NavBar", () => {
  it("renders MyApp title", () => {
    render(
      <AuthProvider>
        <NavBar />
      </AuthProvider>
    );
    expect(screen.getByText("MyApp")).toBeInTheDocument();
  });
});
