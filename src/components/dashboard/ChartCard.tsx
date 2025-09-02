import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ChartCardProps {
  title: string;
  data: any[];
  type: "line" | "bar";
  xKey: string;
  yKey: string;
  yKey2?: string;
  height?: number;
}

export function ChartCard({ 
  title, 
  data, 
  type, 
  xKey, 
  yKey, 
  yKey2,
  height = 300 
}: ChartCardProps) {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 },
    };

    if (type === "line") {
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis 
            dataKey={xKey} 
            className="text-xs fill-muted-foreground"
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            className="text-xs fill-muted-foreground"
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6, stroke: "hsl(var(--primary))" }}
          />
          {yKey2 && (
            <Line
              type="monotone"
              dataKey={yKey2}
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--success))" }}
            />
          )}
        </LineChart>
      );
    }

    return (
      <BarChart {...commonProps}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
        <XAxis 
          dataKey={xKey} 
          className="text-xs fill-muted-foreground"
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          className="text-xs fill-muted-foreground"
          axisLine={false}
          tickLine={false}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
        <Legend />
        <Bar
          dataKey={yKey}
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
        {yKey2 && (
          <Bar
            dataKey={yKey2}
            fill="hsl(var(--success))"
            radius={[4, 4, 0, 0]}
          />
        )}
      </BarChart>
    );
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}