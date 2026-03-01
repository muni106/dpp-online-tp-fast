import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Compare from "./pages/Compare";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Rewards from "./pages/Rewards";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { GuestLockedPage } from "./components/GuestLockedPage";

const queryClient = new QueryClient();

// Route guard: shows locked page for guests
const ProtectedRoute = ({ element, pageName }: { element: JSX.Element; pageName: string }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <GuestLockedPage pageName={pageName} />;
};

const AppRoutes = () => (
  <Routes>
    {/* Always accessible */}
    <Route path="/" element={<Index />} />
    <Route path="/product/:id" element={<ProductDetail />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/profile" element={<Profile />} />

    {/* Locked for guests */}
    <Route path="/home" element={<ProtectedRoute element={<Home />} pageName="Home Dashboard" />} />
    <Route path="/rewards" element={<ProtectedRoute element={<Rewards />} pageName="Rewards" />} />
    <Route path="/community" element={<ProtectedRoute element={<Community />} pageName="Community" />} />
    <Route path="/compare" element={<ProtectedRoute element={<Compare />} pageName="Compare" />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
