import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import GradualBlur from "@/components/ui/gradual-blur";
import { useFooterVisibility } from "@/hooks/use-footer-visibility";
import Home from "@/pages/home";
import Quiz from "@/pages/quiz";
import Success from "@/pages/success";

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
      <Route path="/quiz" component={Quiz}/>
      <Route path="/sucesso" component={Success}/>
      <Route component={RedirectToHome} />
    </Switch>
  );
}

function App() {
  const isFooterVisible = useFooterVisibility();
  const [location] = useLocation();
  const isQuizFlow = location === "/quiz" || location === "/sucesso";

  return (
    <TooltipProvider>
      <Toaster />
      <Router />
      <GradualBlur
        target="page"
        position="bottom"
        exponential={true}
        strength={2}
        divCount={5}
        opacity={1}
        disabled={isFooterVisible || isQuizFlow}
      />
    </TooltipProvider>
  );
}

export default App;




