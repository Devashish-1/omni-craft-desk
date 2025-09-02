import {
  TrendingUp,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock data for charts
const salesTrendData = [
  { month: "Jan", sales: 45000, purchases: 32000 },
  { month: "Feb", sales: 52000, purchases: 38000 },
  { month: "Mar", sales: 48000, purchases: 35000 },
  { month: "Apr", sales: 61000, purchases: 42000 },
  { month: "May", sales: 55000, purchases: 40000 },
  { month: "Jun", sales: 67000, purchases: 45000 },
];

const inventoryData = [
  { category: "Electronics", stock: 450, reorder: 100 },
  { category: "Furniture", stock: 230, reorder: 50 },
  { category: "Clothing", stock: 680, reorder: 150 },
  { category: "Books", stock: 120, reorder: 30 },
  { category: "Sports", stock: 340, reorder: 80 },
];

const recentOrders = [
  { id: "ORD-2024-001", customer: "ABC Corp", amount: 15750, status: "Pending" },
  { id: "ORD-2024-002", customer: "XYZ Industries", amount: 28900, status: "Processing" },
  { id: "ORD-2024-003", customer: "Tech Solutions", amount: 12300, status: "Shipped" },
  { id: "ORD-2024-004", customer: "Global Retail", amount: 45600, status: "Delivered" },
];

const lowStockAlerts = [
  { product: "Wireless Headphones", current: 8, minimum: 20, category: "Electronics" },
  { product: "Office Chairs", current: 3, minimum: 10, category: "Furniture" },
  { product: "USB Cables", current: 15, minimum: 50, category: "Electronics" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your ERP Master Admin Portal
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export Report</Button>
          <Button>Generate Invoice</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Revenue"
          value="$354,290"
          change={{ value: "+12.5%", type: "increase" }}
          icon={TrendingUp}
          description="vs last month"
        />
        <KPICard
          title="Total Stock Items"
          value="1,847"
          change={{ value: "-2.3%", type: "decrease" }}
          icon={Package}
          description="across all categories"
        />
        <KPICard
          title="Pending Orders"
          value="43"
          change={{ value: "+8 new", type: "increase" }}
          icon={ShoppingCart}
          description="today"
        />
        <KPICard
          title="Outstanding Payments"
          value="$89,340"
          change={{ value: "+15.2%", type: "increase" }}
          icon={DollarSign}
          description="to be collected"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Sales vs Purchases Trend"
          data={salesTrendData}
          type="line"
          xKey="month"
          yKey="sales"
          yKey2="purchases"
          height={300}
        />
        <ChartCard
          title="Inventory by Category"
          data={inventoryData}
          type="bar"
          xKey="category"
          yKey="stock"
          height={300}
        />
      </div>

      {/* Recent Activities & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="font-semibold">${order.amount.toLocaleString()}</p>
                    <Badge
                      variant={
                        order.status === "Delivered"
                          ? "default"
                          : order.status === "Shipped"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
              Low Stock Alerts
            </CardTitle>
            <Badge variant="destructive" className="text-xs">
              {lowStockAlerts.length}
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-warning/20 bg-warning-light rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{alert.product}</p>
                    <p className="text-xs text-muted-foreground">{alert.category}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-warning">
                      {alert.current} / {alert.minimum}
                    </p>
                    <p className="text-xs text-muted-foreground">Current / Min</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />
              <span>Add Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ShoppingCart className="h-6 w-6 mb-2" />
              <span>New Order</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span>Add Customer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              <span>Process Payment</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;