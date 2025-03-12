
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileCode, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface FileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    const codeFiles = files.filter(file => {
      const ext = file.name.split('.').pop()?.toLowerCase();
      return ['js', 'jsx', 'ts', 'tsx', 'css', 'html', 'java', 'py', 'php', 'rb', 'go', 'c', 'cpp', 'cs'].includes(ext || '');
    });

    if (codeFiles.length === 0) {
      toast({
        title: "Invalid files",
        description: "Please upload code files only",
        variant: "destructive",
      });
      return;
    }

    setSelectedFiles(codeFiles);
    onFilesUploaded(codeFiles);

    toast({
      title: "Files uploaded successfully",
      description: `${codeFiles.length} file(s) ready for analysis`,
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-primary bg-primary/10' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-secondary/50 p-4 rounded-full">
              <Upload className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Drag and drop your code files</h3>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse your files
              </p>
            </div>
            <input
              type="file"
              multiple
              accept=".js,.jsx,.ts,.tsx,.css,.html,.java,.py,.php,.rb,.go,.c,.cpp,.cs"
              className="hidden"
              id="file-upload"
              onChange={handleFileInputChange}
            />
            <Button asChild variant="secondary">
              <label htmlFor="file-upload" className="cursor-pointer">Select Files</label>
            </Button>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium mb-2">Selected Files</h4>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md">
                  <FileCode className="h-4 w-4 text-primary" />
                  <span className="text-sm truncate flex-1">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  <Check className="h-4 w-4 text-success" />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploader;
