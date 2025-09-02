import { useState } from "react";
import {
  BarChart3,
  FileText,
  Download,
  Calendar,
  Filter,
  TrendingUp,
  Package,
  DollarSign,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for reports
const monthlyRevenueData = [
  { month: "Jan", revenue: 125000, profit: 37500 },
  { month: "Feb", revenue: 138000, profit: 41400 },
  { month: "Mar", revenue: 145000, profit: 43500 },
  { month: "Apr", revenue: 152000, profit: 45600 },
  { month: "May", revenue: 168000, profit: 50400 },
  { month: "Jun", revenue: 185000, profit: 55500 },
];

const categoryPerformanceData = [
  { category: "Electronics", sales: 450000, margin: 125000 },
  { category: "Furniture", sales: 280000, margin: 84000 },
  { category: "Clothing", sales: 320000, margin: 96000 },
  { category: "Books", sales: 120000, margin: 48000 },
  { category: "Sports", sales: 180000, margin: 54000 },
];

const reportTemplates = [
  {
    title: "Monthly Sales Report",
    description: "Comprehensive monthly sales analysis",
    type: "Sales",
    lastGenerated: "2 hours ago",
  },
  {
    title: "Inventory Valuation",
    description: "Current inventory worth and analysis",
    type: "Inventory",
    lastGenerated: "1 day ago",
  },
  {
    title: "Vendor Performance",
    description: "Vendor delivery and quality metrics",
    type: "Purchase",
    lastGenerated: "3 hours ago",
  },
  {
    title: "Customer Analytics",
    description: "Customer behavior and profitability",
    type: "Customer",
    lastGenerated: "5 hours ago",
  },
  {
    title: "Financial Summary",
    description: "P&L, cash flow, and balance sheet",
    type: "Finance",
    lastGenerated: "1 day ago",
  },
  {
    title: "Product Performance",
    description: "Best and worst performing products",
    type: "Product",
    lastGenerated: "4 hours ago",
  },
];

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getReportTypeColor = (type: string) => {
    const colors = {
      Sales: "bg-primary-light text-primary border-primary/20",
      Inventory: "bg-warning-light text-warning border-warning/20",
      Purchase: "bg-success-light text-success border-success/20",
      Customer: "bg-secondary text-secondary-foreground",
      Finance: "bg-destructive/10 text-destructive border-destructive/20",
      Product: "bg-accent text-accent-foreground",
    };
    return colors[type as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Generate insights and export business reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule Report</span>
          </Button>
          <Button className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Custom Report</span>
          </Button>
        </div>
      </div>

      {/* Analytics Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Analytics Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
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
              <span>Advanced Filters</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Data</span>
            </Button>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Revenue & Profit Trend"
              data={monthlyRevenueData}
              type="line"
              xKey="month"
              yKey="revenue"
              yKey2="profit"
              height={300}
            />
            <ChartCard
              title="Category Performance"
              data={categoryPerformanceData}
              type="bar"
              xKey="category"
              yKey="sales"
              height={300}
            />
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Report Templates
            </CardTitle>
            <Button variant="outline" size="sm">
              Manage Templates
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTemplates.map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{template.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getReportTypeColor(template.type)}
                      >
                        {template.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Last: {template.lastGenerated}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Generate
                        </Button>
                        <Button size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="font-semibold mb-2">Sales Summary</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Today's sales performance
            </p>
            <Button variant="outline" size="sm">Generate</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-warning" />
            <h3 className="font-semibold mb-2">Stock Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Current inventory levels
            </p>
            <Button variant="outline" size="sm">Generate</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 mx-auto mb-4 text-success" />
            <h3 className="font-semibold mb-2">Financial Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Revenue and expenses
            </p>
            <Button variant="outline" size="sm">Generate</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-secondary-foreground" />
            <h3 className="font-semibold mb-2">Customer Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Customer analytics
            </p>
            <Button variant="outline" size="sm">Generate</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;