import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home, { AuthPage, ParentPage, PortalPage, PrefectPage } from "./pages/Home";
import { RolesPermissionsPage } from "./pages/Home";
import { Route, Switch } from "wouter";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={AuthPage} />
      <Route path="/portal/settings/roles-permissions" component={RolesPermissionsPage} />
      <Route path="/portal/:section?" component={PortalPage} />
      <Route path="/parent" component={ParentPage} />
      <Route path="/prefect" component={PrefectPage} />
      <Route component={Home} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppRouter />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
