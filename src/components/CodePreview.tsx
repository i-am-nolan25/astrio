
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CodePreviewProps {
  originalCode: string;
  refactoredCode: string;
  fileName: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({ 
  originalCode, 
  refactoredCode,
  fileName 
}) => {
  // A very simple syntax highlighter - in a real app this would use a proper library
  const highlightSyntax = (code: string) => {
    return code
      .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|as)\b/g, '<span class="syntax-keyword">$1</span>')
      .replace(/\b([A-Za-z0-9_]+)\(/g, '<span class="syntax-function">$1</span>(')
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="syntax-string">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="syntax-comment">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="syntax-number">$1</span>')
      .replace(/(\{|\}|\(|\)|\[|\]|=>|=|\+|-|\*|\/|&amp;|\||\.|;|,|:)/g, '<span class="syntax-operator">$1</span>');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <span>{fileName || 'Code Preview'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="original" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="original">Original Code</TabsTrigger>
            <TabsTrigger value="refactored">Refactored Code</TabsTrigger>
          </TabsList>
          <TabsContent value="original" className="mt-4">
            <div className="bg-code rounded-md p-4 overflow-x-auto">
              <pre className="text-sm">
                <code dangerouslySetInnerHTML={{ __html: highlightSyntax(originalCode) }} />
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="refactored" className="mt-4">
            <div className="bg-code rounded-md p-4 overflow-x-auto">
              <pre className="text-sm">
                <code dangerouslySetInnerHTML={{ __html: highlightSyntax(refactoredCode) }} />
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodePreview;
