import { useState } from "react";
import {
  Receipt,
  Plus,
  Search,
  Filter,
  TrendingUp,
  Package,
  Users,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { KPICard } from "@/components/dashboard/KPICard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const salesOrders = [
  {
    id: "SO-2024-001",
    customer: "ABC Corporation",
    customerType: "Distributor",
    items: 25,
    totalAmount: 125750,
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-20",
    status: "Processing",
    priority: "High",
  },
  {
    id: "SO-2024-002",
    customer: "RetailMart Chain",
    customerType: "Retailer",
    items: 12,
    totalAmount: 45300,
    orderDate: "2024-01-14",
    deliveryDate: "2024-01-19",
    status: "Packed",
    priority: "Medium",
  },
  {
    id: "SO-2024-003",
    customer: "TechStore Plus",
    customerType: "Dealer",
    items: 8,
    totalAmount: 28900,
    orderDate: "2024-01-13",
    deliveryDate: "2024-01-18",
    status: "Shipped",
    priority: "High",
  },
  {
    id: "SO-2024-004",
    customer: "Global Solutions",
    customerType: "Distributor",
    items: 35,
    totalAmount: 189500,
    orderDate: "2024-01-12",
    deliveryDate: "2024-01-16",
    status: "Delivered",
    priority: "High",
  },
];

const SalesOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Processing: "bg-warning-light text-warning border-warning/20",
      Packed: "bg-primary-light text-primary border-primary/20",
      Shipped: "bg-secondary text-secondary-foreground",
      Delivered: "bg-success-light text-success border-success/20",
      Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
    };

    return (
      <Badge variant="outline" className={statusConfig[status as keyof typeof statusConfig]}>
        {status}
      </Badge>
    );
  };

  const getCustomerTypeBadge = (type: string) => {
    const colors = {
      Distributor: "bg-primary-light text-primary border-primary/20",
      Dealer: "bg-success-light text-success border-success/20",
      Retailer: "bg-warning-light text-warning border-warning/20",
      Customer: "bg-secondary text-secondary-foreground",
    };

    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type}
      </Badge>
    );
  };

  const totalOrders = salesOrders.length;
  const processingOrders = salesOrders.filter(so => so.status === "Processing").length;
  const totalRevenue = salesOrders.reduce((sum, so) => sum + so.totalAmount, 0);
  const deliveredOrders = salesOrders.filter(so => so.status === "Delivered").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sales Orders</h1>
          <p className="text-muted-foreground">
            Manage sales orders and customer deliveries
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Receipt className="h-4 w-4" />
            <span>Generate Invoice</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Sales Order</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Orders"
          value={totalOrders.toString()}
          change={{ value: "+18", type: "increase" }}
          icon={Receipt}
          description="this month"
        />
        <KPICard
          title="Processing"
          value={processingOrders.toString()}
          change={{ value: "+5", type: "increase" }}
          icon={Package}
          description="being processed"
        />
        <KPICard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={{ value: "+15.2%", type: "increase" }}
          icon={DollarSign}
          description="all orders"
        />
        <KPICard
          title="Delivered"
          value={deliveredOrders.toString()}
          change={{ value: "+8", type: "increase" }}
          icon={TrendingUp}
          description="completed"
        />
      </div>

      {/* Sales Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Receipt className="h-5 w-5 mr-2" />
              All Sales Orders
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Bulk Actions
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by order number or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="packed">Packed</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesOrders.map((so) => (
                  <TableRow key={so.id} className="hover:bg-muted/30 cursor-pointer">
                    <TableCell>
                      <div className="font-medium text-primary hover:underline">
                        {so.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{so.customer}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCustomerTypeBadge(so.customerType)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{so.items} items</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${so.totalAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(so.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(so.deliveryDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(so.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-warning" />
            <h3 className="font-semibold mb-2">Pack Orders</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {processingOrders} orders ready for packing
            </p>
            <Button variant="outline" size="sm">Start Packing</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Receipt className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Generate Invoices</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create invoices for delivered orders
            </p>
            <Button variant="outline" size="sm">Create Invoices</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-success" />
            <h3 className="font-semibold mb-2">Customer Analytics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Analyze customer performance
            </p>
            <Button variant="outline" size="sm">View Reports</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesOrders;