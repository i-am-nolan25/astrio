
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Layout, { FeatureTabs } from "@/components/Layout";
import FileUploader from "@/components/FileUploader";
import CodePreview from "@/components/CodePreview";
import RefactoringPanel from "@/components/RefactoringPanel";
import AnalysisResults from "@/components/AnalysisResults";
import { Play, FileCode, RefreshCw, Paintbrush, Bug, CheckSquare } from 'lucide-react';
import { Issue, AnalysisMetrics, CodeFile } from '@/types';

const Index = () => {
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();

  // Mock metrics data - in a real app this would come from a real analysis
  const mockMetrics: AnalysisMetrics = {
    codeQuality: 72,
    maintainability: 65,
    performance: 88,
    security: 90,
    accessibility: 58,
    issuesByType: [
      { name: 'Code Smells', value: 14, color: '#60a5fa' },
      { name: 'UI Issues', value: 8, color: '#c084fc' },
      { name: 'Bugs', value: 5, color: '#f87171' },
      { name: 'Test Coverage', value: 9, color: '#34d399' },
    ],
  };

  const handleFilesUploaded = (uploadedFiles: File[]) => {
    const promises = uploadedFiles.map(file => {
      return new Promise<CodeFile>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          resolve({
            name: file.name,
            content,
            issues: [],
          });
        };
        reader.readAsText(file);
      });
    });

    Promise.all(promises).then(codeFiles => {
      setFiles(codeFiles);
      if (codeFiles.length > 0) {
        setSelectedFile(codeFiles[0]);
      }
    });
  };

  const analyzeCodes = () => {
    if (files.length === 0) {
      toast({
        title: "No files to analyze",
        description: "Please upload some code files first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Mock analysis result - in a real app this would come from a real analysis
      const updatedFiles = files.map(file => {
        // Generate mock issues based on file name
        const issues: Issue[] = [];
        
        if (file.name.includes('.js') || file.name.includes('.ts')) {
          issues.push({
            id: `ref-${Math.random().toString(36).substr(2, 9)}`,
            type: 'refactoring',
            severity: 'medium',
            description: 'Consider using arrow functions for improved readability and handling of "this"',
            lineNumbers: [12, 15],
            suggestion: 'const handleClick = () => {\n  // Your code here\n}',
          });
          
          issues.push({
            id: `bug-${Math.random().toString(36).substr(2, 9)}`,
            type: 'bug',
            severity: 'high',
            description: 'Potential memory leak in event listener',
            lineNumbers: [24],
            suggestion: 'useEffect(() => {\n  window.addEventListener("resize", handleResize);\n  return () => window.removeEventListener("resize", handleResize);\n}, []);',
          });
        }
        
        if (file.name.includes('.css') || file.name.includes('.scss')) {
          issues.push({
            id: `ui-${Math.random().toString(36).substr(2, 9)}`,
            type: 'ui',
            severity: 'low',
            description: 'Consider using CSS variables for consistent theming',
            lineNumbers: [5, 10, 22],
            suggestion: ':root {\n  --primary-color: #3b82f6;\n  --text-color: #374151;\n}\n\n.button {\n  color: var(--primary-color);\n}',
          });
        }
        
        issues.push({
          id: `test-${Math.random().toString(36).substr(2, 9)}`,
          type: 'test',
          severity: 'medium',
          description: 'Missing unit tests for this component',
          lineNumbers: [1],
          suggestion: 'import { render, screen } from "@testing-library/react";\nimport userEvent from "@testing-library/user-event";\nimport YourComponent from "./YourComponent";\n\ntest("component renders correctly", () => {\n  render(<YourComponent />);\n  expect(screen.getByText("Expected text")).toBeInTheDocument();\n});',
        });
        
        // Mock refactored content with some improvements
        const refactoredContent = file.content
          .replace(/function\s+([a-zA-Z0-9_]+)\s*\(/g, 'const $1 = (')
          .replace(/\)\s*{/g, ') => {')
          .replace(/var\s+/g, 'const ')
          .replace(/console\.log/g, '// console.log');
        
        return {
          ...file,
          refactoredContent,
          issues,
        };
      });
      
      setFiles(updatedFiles);
      setSelectedFile(prevSelected => {
        if (!prevSelected) return updatedFiles[0];
        return updatedFiles.find(f => f.name === prevSelected.name) || updatedFiles[0];
      });
      
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      toast({
        title: "Analysis complete",
        description: `Found issues in ${updatedFiles.filter(f => f.issues.length > 0).length} file(s)`,
      });
    }, 2500);
  };

  const handleApplySuggestion = (issue: Issue) => {
    if (!selectedFile) return;
    
    toast({
      title: "Applied suggestion",
      description: `The suggested improvement has been applied to ${selectedFile.name}`,
    });
    
    // In a real app, this would modify the actual code based on the suggestion
    // For this demo, we're just showing a success message
  };

  return (
    <Layout>
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-6">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Code Refactoring & Modernization</h1>
            <p className="text-muted-foreground mb-6">Upload your code to get intelligent suggestions for refactoring, UI improvements, bug fixes, and automated testing</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <FileUploader onFilesUploaded={handleFilesUploaded} />
              
              <div className="mt-6">
                <Button 
                  onClick={analyzeCodes} 
                  disabled={isAnalyzing || files.length === 0} 
                  className="w-full"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                  {!isAnalyzing && <Play className="ml-2 h-4 w-4" />}
                </Button>
              </div>
              
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Your Files</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {files.map((file, index) => (
                      <Button
                        key={index}
                        variant={selectedFile?.name === file.name ? "secondary" : "outline"}
                        className="w-full justify-start text-left"
                        onClick={() => setSelectedFile(file)}
                      >
                        <FileCode className="mr-2 h-4 w-4" />
                        <span className="truncate">{file.name}</span>
                        {file.issues.length > 0 && (
                          <span className="ml-auto bg-primary/20 text-primary text-xs rounded-full px-2 py-0.5">
                            {file.issues.length}
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="lg:col-span-2">
              {analysisComplete && selectedFile ? (
                <FeatureTabs>
                  <TabsContent value="refactoring" className="mt-0">
                    <div className="grid grid-cols-1 gap-6">
                      <CodePreview 
                        originalCode={selectedFile.content} 
                        refactoredCode={selectedFile.refactoredContent || selectedFile.content}
                        fileName={selectedFile.name}
                      />
                      <RefactoringPanel 
                        issues={selectedFile.issues.filter(i => i.type === 'refactoring')}
                        onApplySuggestion={handleApplySuggestion}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="ui" className="mt-0">
                    <div className="grid grid-cols-1 gap-6">
                      <CodePreview 
                        originalCode={selectedFile.content} 
                        refactoredCode={selectedFile.refactoredContent || selectedFile.content}
                        fileName={selectedFile.name}
                      />
                      <RefactoringPanel 
                        issues={selectedFile.issues.filter(i => i.type === 'ui')}
                        onApplySuggestion={handleApplySuggestion}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="bugs" className="mt-0">
                    <div className="grid grid-cols-1 gap-6">
                      <CodePreview 
                        originalCode={selectedFile.content} 
                        refactoredCode={selectedFile.refactoredContent || selectedFile.content}
                        fileName={selectedFile.name}
                      />
                      <RefactoringPanel 
                        issues={selectedFile.issues.filter(i => i.type === 'bug')}
                        onApplySuggestion={handleApplySuggestion}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="testing" className="mt-0">
                    <div className="grid grid-cols-1 gap-6">
                      <CodePreview 
                        originalCode={selectedFile.content} 
                        refactoredCode={selectedFile.refactoredContent || selectedFile.content}
                        fileName={selectedFile.name}
                      />
                      <RefactoringPanel 
                        issues={selectedFile.issues.filter(i => i.type === 'test')}
                        onApplySuggestion={handleApplySuggestion}
                      />
                    </div>
                  </TabsContent>
                </FeatureTabs>
              ) : (
                <div className="bg-card rounded-lg border border-border p-10 h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-secondary/50 p-4 rounded-full mb-4">
                    <FileCode className="h-10 w-10 text-primary animate-pulse-slow" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Upload your code to start</h2>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Our AI-powered tool will analyze your code and provide suggestions for improvements
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <div className="bg-secondary/30 rounded-md p-3 text-sm max-w-[160px]">
                      <div className="bg-primary/20 p-2 rounded-md mb-2">
                        <RefreshCw className="h-4 w-4 text-primary mx-auto" />
                      </div>
                      <h3 className="font-medium mb-1">Code Refactoring</h3>
                      <p className="text-muted-foreground text-xs">Detect and fix code smells and antipatterns</p>
                    </div>
                    
                    <div className="bg-secondary/30 rounded-md p-3 text-sm max-w-[160px]">
                      <div className="bg-accent/20 p-2 rounded-md mb-2">
                        <Paintbrush className="h-4 w-4 text-accent mx-auto" />
                      </div>
                      <h3 className="font-medium mb-1">UI Modernization</h3>
                      <p className="text-muted-foreground text-xs">Improve UI/UX and accessibility</p>
                    </div>
                    
                    <div className="bg-secondary/30 rounded-md p-3 text-sm max-w-[160px]">
                      <div className="bg-destructive/20 p-2 rounded-md mb-2">
                        <Bug className="h-4 w-4 text-destructive mx-auto" />
                      </div>
                      <h3 className="font-medium mb-1">Bug Fixing</h3>
                      <p className="text-muted-foreground text-xs">Detect potential bugs before they happen</p>
                    </div>
                    
                    <div className="bg-secondary/30 rounded-md p-3 text-sm max-w-[160px]">
                      <div className="bg-success/20 p-2 rounded-md mb-2">
                        <CheckSquare className="h-4 w-4 text-success mx-auto" />
                      </div>
                      <h3 className="font-medium mb-1">Testing</h3>
                      <p className="text-muted-foreground text-xs">Generate tests and improve coverage</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {analysisComplete && (
            <div className="mt-4">
              <AnalysisResults metrics={mockMetrics} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
