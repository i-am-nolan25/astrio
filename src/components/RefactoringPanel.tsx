
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  AlertTriangle, 
  Bug, 
  RefreshCw, 
  Paintbrush, 
  File, 
  Code2,
  CheckSquare
} from "lucide-react";

interface Issue {
  id: string;
  type: 'refactoring' | 'ui' | 'bug' | 'test';
  severity: 'low' | 'medium' | 'high';
  description: string;
  lineNumbers: number[];
  suggestion: string;
}

interface RefactoringPanelProps {
  issues: Issue[];
  onApplySuggestion: (issue: Issue) => void;
}

const RefactoringPanel: React.FC<RefactoringPanelProps> = ({ 
  issues, 
  onApplySuggestion 
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'refactoring': return <RefreshCw className="h-4 w-4" />;
      case 'ui': return <Paintbrush className="h-4 w-4" />;
      case 'bug': return <Bug className="h-4 w-4" />;
      case 'test': return <CheckSquare className="h-4 w-4" />;
      default: return <Code2 className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'refactoring': return 'Code Smell';
      case 'ui': return 'UI Improvement';
      case 'bug': return 'Potential Bug';
      case 'test': return 'Missing Test';
      default: return 'Issue';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Improvement Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        {issues.length === 0 ? (
          <div className="text-center py-10">
            <div className="flex justify-center mb-4">
              <Check className="h-12 w-12 text-success" />
            </div>
            <h3 className="font-medium text-lg mb-2">No issues detected</h3>
            <p className="text-muted-foreground">
              Upload your code or try another file to start analyzing
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {issues.map((issue) => (
              <div key={issue.id} className="bg-secondary/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-1.5 ${issue.type === 'bug' ? 'bg-destructive/20' : issue.type === 'ui' ? 'bg-accent/20' : 'bg-primary/20'}`}>
                    {getTypeIcon(issue.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{getTypeLabel(issue.type)}</h4>
                      <Badge variant="outline" className={`text-xs ${getSeverityColor(issue.severity)}`}>
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground mb-2">{issue.description}</p>
                    <div className="text-xs text-muted-foreground mb-3">
                      <span>Lines: {issue.lineNumbers.join(', ')}</span>
                    </div>
                    <div className="bg-code/70 text-code-foreground p-3 rounded-md text-xs mb-3">
                      <pre className="whitespace-pre-wrap">{issue.suggestion}</pre>
                    </div>
                    <Button size="sm" className="mt-1" onClick={() => onApplySuggestion(issue)}>
                      Apply Suggestion
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RefactoringPanel;
