import { useState } from "react";
import {
  Package,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  TrendingDown,
  BarChart3,
  Download,
  Upload,
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

const inventoryItems = [
  {
    id: "PRD-001",
    name: "Wireless Headphones",
    category: "Electronics",
    sku: "WH-001",
    currentStock: 45,
    minimumStock: 20,
    unitPrice: 89.99,
    totalValue: 4049.55,
    supplier: "TechCorp",
    status: "In Stock",
  },
  {
    id: "PRD-002",
    name: "Office Chair",
    category: "Furniture",
    sku: "OC-002",
    currentStock: 8,
    minimumStock: 15,
    unitPrice: 299.99,
    totalValue: 2399.92,
    supplier: "OfficeSupply Co",
    status: "Low Stock",
  },
  {
    id: "PRD-003",
    name: "USB Cable",
    category: "Electronics",
    sku: "UC-003",
    currentStock: 150,
    minimumStock: 50,
    unitPrice: 12.99,
    totalValue: 1948.50,
    supplier: "CableWorks",
    status: "In Stock",
  },
  {
    id: "PRD-004",
    name: "Laptop Stand",
    category: "Electronics",
    sku: "LS-004",
    currentStock: 0,
    minimumStock: 10,
    unitPrice: 45.99,
    totalValue: 0,
    supplier: "ErgoTech",
    status: "Out of Stock",
  },
];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getStatusBadge = (status: string, currentStock: number, minimumStock: number) => {
    if (currentStock === 0) {
      return (
        <Badge variant="destructive" className="flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Out of Stock
        </Badge>
      );
    } else if (currentStock <= minimumStock) {
      return (
        <Badge variant="secondary" className="bg-warning-light text-warning border-warning/20">
          <TrendingDown className="h-3 w-3 mr-1" />
          Low Stock
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="bg-success-light text-success border-success/20">
        In Stock
      </Badge>
    );
  };

  const totalValue = inventoryItems.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minimumStock);
  const outOfStockItems = inventoryItems.filter(item => item.currentStock === 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">
            Monitor stock levels and manage products
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </Button>
          <Button variant="outline" className="flex items-center space-x-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          change={{ value: "+5.2%", type: "increase" }}
          icon={Package}
          description="across all categories"
        />
        <KPICard
          title="Total Products"
          value={inventoryItems.length.toString()}
          change={{ value: "+3 new", type: "increase" }}
          icon={BarChart3}
          description="active products"
        />
        <KPICard
          title="Low Stock Items"
          value={lowStockItems.length.toString()}
          change={{ value: "2 critical", type: "decrease" }}
          icon={AlertTriangle}
          description="need reorder"
        />
        <KPICard
          title="Out of Stock"
          value={outOfStockItems.length.toString()}
          change={{ value: "-1 resolved", type: "increase" }}
          icon={TrendingDown}
          description="immediate action"
        />
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Product Inventory
            </CardTitle>
            <Button variant="outline" size="sm">
              Bulk Actions
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="books">Books</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </Button>
          </div>

          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Min Stock</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryItems.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          SKU: {item.sku}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className={item.currentStock <= item.minimumStock ? "text-warning font-medium" : ""}>
                        {item.currentStock}
                      </span>
                    </TableCell>
                    <TableCell>{item.minimumStock}</TableCell>
                    <TableCell>${item.unitPrice}</TableCell>
                    <TableCell className="font-medium">
                      ${item.totalValue.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.supplier}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(item.status, item.currentStock, item.minimumStock)}
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
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-warning" />
            <h3 className="font-semibold mb-2">Reorder Alerts</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {lowStockItems.length} items need reordering
            </p>
            <Button variant="outline" size="sm">View Details</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Stock Analysis</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View detailed analytics
            </p>
            <Button variant="outline" size="sm">Generate Report</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-success" />
            <h3 className="font-semibold mb-2">Bulk Operations</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Update multiple products
            </p>
            <Button variant="outline" size="sm">Start Bulk Edit</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Inventory;