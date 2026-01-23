import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GradualBlur from "@/components/ui/gradual-blur";
import { useFooterVisibility } from "@/hooks/use-footer-visibility";
import Home from "@/pages/home";
import { MetaPixel } from "@/components/MetaPixel";

function RedirectToHome() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    setLocation("/");
  }, [setLocation]);
  
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route component={RedirectToHome} />
    </Switch>
  );
}

function App() {
  const isFooterVisible = useFooterVisibility();

  return (
    <TooltipProvider>
      <MetaPixel />
      <Toaster />
      <Router />
      <GradualBlur
        target="page"
        position="bottom"
        exponential={true}
        strength={2}
        divCount={5}
        opacity={1}
        disabled={isFooterVisible}
      />
    </TooltipProvider>
  );
}

export default App;




