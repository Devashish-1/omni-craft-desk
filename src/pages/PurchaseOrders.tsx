import { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
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

const purchaseOrders = [
  {
    id: "PO-2024-001",
    vendor: "TechCorp Solutions",
    items: 15,
    totalAmount: 45750,
    orderDate: "2024-01-15",
    expectedDelivery: "2024-01-22",
    status: "Pending",
    priority: "High",
  },
  {
    id: "PO-2024-002",
    vendor: "OfficeSupply Co",
    items: 8,
    totalAmount: 12300,
    orderDate: "2024-01-14",
    expectedDelivery: "2024-01-20",
    status: "Approved",
    priority: "Medium",
  },
  {
    id: "PO-2024-003",
    vendor: "Industrial Materials Ltd",
    items: 25,
    totalAmount: 78900,
    orderDate: "2024-01-13",
    expectedDelivery: "2024-01-25",
    status: "Shipped",
    priority: "High",
  },
  {
    id: "PO-2024-004",
    vendor: "Global Electronics",
    items: 12,
    totalAmount: 34500,
    orderDate: "2024-01-12",
    expectedDelivery: "2024-01-18",
    status: "Delivered",
    priority: "Low",
  },
  {
    id: "PO-2024-005",
    vendor: "Quality Parts Inc",
    items: 6,
    totalAmount: 18750,
    orderDate: "2024-01-10",
    expectedDelivery: "2024-01-17",
    status: "Cancelled",
    priority: "Medium",
  },
];

const PurchaseOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      Pending: { variant: "outline", icon: Clock, className: "border-warning text-warning" },
      Approved: { variant: "secondary", icon: CheckCircle, className: "bg-primary-light text-primary border-primary/20" },
      Shipped: { variant: "default", icon: Truck, className: "bg-secondary text-secondary-foreground" },
      Delivered: { variant: "default", icon: CheckCircle, className: "bg-success-light text-success border-success/20" },
      Cancelled: { variant: "destructive", icon: XCircle, className: "" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant as any} className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: "bg-destructive/10 text-destructive border-destructive/20",
      Medium: "bg-warning-light text-warning border-warning/20",
      Low: "bg-success-light text-success border-success/20",
    };

    return (
      <Badge variant="outline" className={colors[priority as keyof typeof colors]}>
        {priority}
      </Badge>
    );
  };

  const totalOrders = purchaseOrders.length;
  const pendingOrders = purchaseOrders.filter(po => po.status === "Pending").length;
  const totalValue = purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0);
  const deliveredOrders = purchaseOrders.filter(po => po.status === "Delivered").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Purchase Orders</h1>
          <p className="text-muted-foreground">
            Manage purchase orders and vendor relationships
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Export Report</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Purchase Order</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Orders"
          value={totalOrders.toString()}
          change={{ value: "+12", type: "increase" }}
          icon={ShoppingCart}
          description="this month"
        />
        <KPICard
          title="Pending Approval"
          value={pendingOrders.toString()}
          change={{ value: "-3", type: "decrease" }}
          icon={Clock}
          description="awaiting approval"
        />
        <KPICard
          title="Total Value"
          value={`$${totalValue.toLocaleString()}`}
          change={{ value: "+8.5%", type: "increase" }}
          icon={FileText}
          description="all orders"
        />
        <KPICard
          title="Delivered"
          value={deliveredOrders.toString()}
          change={{ value: "+5", type: "increase" }}
          icon={CheckCircle}
          description="completed orders"
        />
      </div>

      {/* Purchase Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              All Purchase Orders
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
                placeholder="Search by PO number or vendor..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
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
                  <TableHead>PO Number</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Expected Delivery</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((po) => (
                  <TableRow key={po.id} className="hover:bg-muted/30 cursor-pointer">
                    <TableCell>
                      <div className="font-medium text-primary hover:underline">
                        {po.id}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{po.vendor}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{po.items} items</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        ${po.totalAmount.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(po.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(po.expectedDelivery).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {getPriorityBadge(po.priority)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(po.status)}
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
            <Clock className="h-12 w-12 mx-auto mb-4 text-warning" />
            <h3 className="font-semibold mb-2">Pending Approvals</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {pendingOrders} orders awaiting approval
            </p>
            <Button variant="outline" size="sm">Review Now</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Truck className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Track Shipments</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor delivery status
            </p>
            <Button variant="outline" size="sm">Track Orders</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 mx-auto mb-4 text-success" />
            <h3 className="font-semibold mb-2">Vendor Performance</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Analyze vendor metrics
            </p>
            <Button variant="outline" size="sm">View Analytics</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PurchaseOrders;