import "./browser-globals";
import { renderToString } from "react-dom/server";
import { expect, test } from "vitest";
import HomePage from "./pages/HomePage";
import PlatformPage from "./pages/PlatformPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ForSchoolsPage from "./pages/ForSchoolsPage";
import ForParentsPage from "./pages/ForParentsPage";
import ClinicalNetworkPage from "./pages/ClinicalNetworkPage";
import ImpactPage from "./pages/ImpactPage";
import AboutPage from "./pages/AboutPage";
import ResourcesPage from "./pages/ResourcesPage";
import PricingPage from "./pages/PricingPage";
import DemoPage from "./pages/DemoPage";
import ContactPage from "./pages/ContactPage";
import SecurityPage from "./pages/SecurityPage";
import FaqPage from "./pages/FaqPage";
import ActivatePage from "./pages/ActivatePage";
import NotFound from "../pages/NotFound";
import { AuthPage, ParentPage, PortalPage, PrefectPage, RolesPermissionsPage } from "../pages/Home";
import MessagesPage from "../pages/Messages";

const publicPages: [string, () => React.ReactNode][] = [
  ["Home", HomePage], ["Platform", PlatformPage], ["How It Works", HowItWorksPage],
  ["For Schools", ForSchoolsPage], ["For Parents", ForParentsPage], ["Clinical Network", ClinicalNetworkPage],
  ["Impact", ImpactPage], ["About", AboutPage], ["Resources", ResourcesPage], ["Pricing", PricingPage],
  ["Book a Demo", DemoPage], ["Contact", ContactPage], ["Security & Privacy", SecurityPage],
  ["FAQ", FaqPage], ["Activate Mlezi Care", ActivatePage], ["Not Found", NotFound],
];

const portalPages: [string, (props: any) => React.ReactNode][] = [
  ["Staff sign-in", AuthPage], ["Portal", PortalPage], ["Parent portal", ParentPage],
  ["Health prefect", PrefectPage], ["Roles & permissions", RolesPermissionsPage], ["Messages", MessagesPage],
];

test.each(publicPages)("public site: %s renders", (name, Page) => {
  expect(renderToString(<Page />).length, `${name} produced no markup`).toBeGreaterThan(500);
});

test.each(portalPages)("staff portal: %s still renders", (name, Page) => {
  expect(renderToString(<Page />).length, `${name} produced no markup`).toBeGreaterThan(500);
});
