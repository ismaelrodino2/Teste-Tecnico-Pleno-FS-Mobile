import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "react-native-toast-notifications";

const RootLayout = () => {
  return (
      <ToastProvider>
    <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
    </AuthProvider>
      </ToastProvider>
  );
};

export default RootLayout;
