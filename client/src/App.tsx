import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthPage, ParentPage, PortalPage, PrefectPage } from "./pages/Home";
import { RolesPermissionsPage } from "./pages/Home";
import MessagesPage from "./pages/Messages";
import NotFound from "./pages/NotFound";
import HomePage from "./site/pages/HomePage";
import PlatformPage from "./site/pages/PlatformPage";
import HowItWorksPage from "./site/pages/HowItWorksPage";
import ForSchoolsPage from "./site/pages/ForSchoolsPage";
import ForParentsPage from "./site/pages/ForParentsPage";
import ClinicalNetworkPage from "./site/pages/ClinicalNetworkPage";
import ImpactPage from "./site/pages/ImpactPage";
import AboutPage from "./site/pages/AboutPage";
import ResourcesPage from "./site/pages/ResourcesPage";
import PricingPage from "./site/pages/PricingPage";
import DemoPage from "./site/pages/DemoPage";
import ContactPage from "./site/pages/ContactPage";
import SecurityPage from "./site/pages/SecurityPage";
import FaqPage from "./site/pages/FaqPage";
import ActivatePage from "./site/pages/ActivatePage";
import { Redirect, Route, Switch } from "wouter";

function AppRouter() {
  return (
    <Switch>
      {/* Public website */}
      <Route path="/" component={HomePage} />
      <Route path="/platform" component={PlatformPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/for-schools" component={ForSchoolsPage} />
      <Route path="/for-parents" component={ForParentsPage} />
      <Route path="/clinical-network" component={ClinicalNetworkPage} />
      <Route path="/impact" component={ImpactPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/demo" component={DemoPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/security" component={SecurityPage} />
      <Route path="/faq" component={FaqPage} />
      <Route path="/activate" component={ActivatePage} />
      <Route path="/parent-login"><Redirect to="/activate" /></Route>

      {/* Staff portal and authenticated experiences */}
      <Route path="/login" component={AuthPage} />
      <Route path="/portal/settings/roles-permissions" component={RolesPermissionsPage} />
      <Route path="/portal/messages" component={MessagesPage} />
      <Route path="/portal/:section?" component={PortalPage} />
      <Route path="/parent" component={ParentPage} />
      <Route path="/prefect" component={PrefectPage} />

      <Route component={NotFound} />
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
