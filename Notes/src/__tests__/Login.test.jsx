import Login from "@/features/auth/Login";
import useUserStore from "@/hooks/useUserStore";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("axios");

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("@/hooks/useUserStore");

describe("Login Component", () => {
  let mockNavigate;
  beforeEach(() => {
    mockNavigate = vi.fn();

    useNavigate.mockReturnValue(mockNavigate);

    useUserStore.mockReturnValue({
      login: vi.fn(),
    });

    axios.post.mockResolvedValue({
      data: {
        token: "fake-token",
      },
    });

    axios.get.mockResolvedValue({
      data: {
        _id: 123,
        name: "Test User",
        email: "test@example.com",
      },
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
  });
  it("render email input field", () => {
    const emailInput = screen.getByPlaceholderText("name@company.com");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("placeholder", "name@company.com");
  });

  it("render password input field", () => {
    const passwordInput = screen.getByPlaceholderText("••••••••");

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(passwordInput).toHaveAttribute("placeholder", "••••••••");
  });

  it("allows user to type in email field", async () => {
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText("name@company.com");

    await user.type(emailInput, "test@example.com");

    expect(emailInput).toHaveValue("test@example.com");
  });

  it("allows user to type in password field", async () => {
    const user = userEvent.setup();

    const passwordInput = screen.getByPlaceholderText("••••••••");

    await user.type(passwordInput, "john@123");

    expect(passwordInput).toHaveValue("john@123");
  });

  it("submit form wil valid credentials", async () => {
    const user = userEvent.setup();

    await user.type(
      screen.getByPlaceholderText("name@company.com"),
      "test@example.com",
    );

    await user.type(screen.getByPlaceholderText("••••••••"), "john@123");

    const loginButton = screen.getByRole("button", { name: /log in/i });

    await user.click(loginButton);

    await vi.waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/api/login",
        { email: "test@example.com", password: "john@123" },
        { withCredentials: true },
      );

      expect(axios.get).toHaveBeenCalledWith("/api/user/getUserDetails", {
        withCredentials: true,
      });

      expect(useUserStore().login).toHaveBeenCalledWith({
        _id: 123,
        name: "Test User",
        email: "test@example.com",
      });
    });
  });
});
