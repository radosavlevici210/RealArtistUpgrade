import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Studio from "@/pages/studio";
import Vault from "@/pages/vault";
import Analytics from "@/pages/analytics";
import Royalty from "@/pages/royalty";
import Security from "@/pages/security";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Studio} />
      <Route path="/studio" component={Studio} />
      <Route path="/vault" component={Vault} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/royalty" component={Royalty} />
      <Route path="/security" component={Security} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
