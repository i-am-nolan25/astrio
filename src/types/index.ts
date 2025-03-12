
export interface Issue {
  id: string;
  type: 'refactoring' | 'ui' | 'bug' | 'test';
  severity: 'low' | 'medium' | 'high';
  description: string;
  lineNumbers: number[];
  suggestion: string;
}

export interface AnalysisMetrics {
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

export interface CodeFile {
  name: string;
  content: string;
  refactoredContent?: string;
  issues: Issue[];
}
