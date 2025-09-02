import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement";
import Inventory from "./pages/Inventory";
import PurchaseOrders from "./pages/PurchaseOrders";
import SalesOrders from "./pages/SalesOrders";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/users" element={
            <AppLayout>
              <UserManagement />
            </AppLayout>
          } />
          <Route path="/inventory" element={
            <AppLayout>
              <Inventory />
            </AppLayout>
          } />
          <Route path="/purchase" element={
            <AppLayout>
              <PurchaseOrders />
            </AppLayout>
          } />
          <Route path="/sales" element={
            <AppLayout>
              <SalesOrders />
            </AppLayout>
          } />
          <Route path="/pricing" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Pricing & Billing</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/finance" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Financial Management</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/reports" element={
            <AppLayout>
              <Reports />
            </AppLayout>
          } />
          <Route path="/vendors" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Vendor Management</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/customers" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Customer Management</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/analytics" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Analytics</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/notifications" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Notifications</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/security" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Security Management</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-muted-foreground mt-2">Coming soon...</p>
              </div>
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
