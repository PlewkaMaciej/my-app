import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify"; // Dodaj import komponentu ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Dodaj import stylów CSS dla React Toastify
import "@fontsource/roboto";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
export const theme = createTheme({
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Roboto', sans-serif;
        }
        *, *::before, *::after {
          box-sizing: inherit;
        }
      `,
    },
  },
});
const toastContainerStyle = {
  zIndex: 9999,
};
const toastStyle = {
  background: "white",
  color: "black",
};

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
            pauseOnFocusLoss={false}
            style={toastContainerStyle}
            toastStyle={toastStyle}
          />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default appWithTranslation(App);
