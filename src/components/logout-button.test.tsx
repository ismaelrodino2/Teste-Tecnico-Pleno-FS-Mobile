import { render, fireEvent } from "@testing-library/react-native";
import { AuthContext } from "../contexts/AuthContext";
import { LogouButton } from "./logout-button";
import { User } from "../types/global-types";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock("../lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: jest.fn(),
    },
  },
}));

describe("<LogoutButton />", () => {
  it("calls logout function on press", () => {
    const mockLogout = jest.fn();

    const mockUser: User = {
      id: "1",
      accountType: "standard",
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "john@example.com",
    };

    const { getByText } = render(
      <AuthContext.Provider
        value={{
          authenticated: true,
          login: async () => true,
          logout: mockLogout,
          user: mockUser,
        }}
      >
        <LogouButton />
      </AuthContext.Provider>
    );

    const logoutButton = getByText("Logout");
    fireEvent.press(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
