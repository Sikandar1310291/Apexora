import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Medixa from "@/pages/Medixa";
import OracleApex from "@/pages/OracleApex";
import SeoLahore from "@/pages/SeoLahore";
import WhyApexoraVsSystems from "@/pages/WhyApexoraVsSystems";
import NotFound from "@/pages/not-found";
import { WhatsAppButton } from "@/components/WhatsAppButton";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/software" component={Medixa} />
      <Route path="/medixa" component={Medixa} />
      <Route path="/oracle-apex-development" component={OracleApex} />
      <Route path="/seo-services-lahore" component={SeoLahore} />
      <Route path="/why-apexora-vs-systems" component={WhyApexoraVsSystems} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <WhatsAppButton />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
