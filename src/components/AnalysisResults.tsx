
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface AnalysisMetrics {
  codeQuality: number;
  maintainability: number;
  performance: number;
  security: number;
  accessibility: number;
  issuesByType: {
    name: string;
    value: number;
    color: string;
  }[];
}

interface AnalysisResultsProps {
  metrics: AnalysisMetrics;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ metrics }) => {
  const scoreData = [
    { name: 'Code Quality', score: metrics.codeQuality },
    { name: 'Maintainability', score: metrics.maintainability },
    { name: 'Performance', score: metrics.performance },
    { name: 'Security', score: metrics.security },
    { name: 'Accessibility', score: metrics.accessibility },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-medium mb-3">Quality Metrics</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={120} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  />
                  <Bar dataKey="score" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-3">Issues by Type</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.issuesByType}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {metrics.issuesByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [value, 'Issues']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalysisResults;
