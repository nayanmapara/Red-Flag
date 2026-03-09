
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function FileUploader({
  onFileSelect,
  accept = ".txt,.pdf,.doc,.docx",
  maxSize = 10, // Default 10MB
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Check file type
    const fileType = file.name.split(".").pop()?.toLowerCase();
    const acceptedTypes = accept
      .split(",")
      .map((type) => type.replace(".", "").toLowerCase());
    
    if (!fileType || !acceptedTypes.includes(fileType)) {
      setError(`File type not supported. Please upload: ${accept}`);
      return false;
    }

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }

    setError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        onFileSelect(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-2">
      <div
        className={cn(
          "file-upload-container",
          isDragging && "file-upload-active"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        <Upload className="h-8 w-8 text-primary/70" />
        <div className="text-center">
          <p className="font-medium">
            Drag & drop invoice file or click to upload
          </p>
          <p className="text-sm text-muted-foreground">
            Supported formats: PDF, TXT, DOC, DOCX
          </p>
        </div>
      </div>
      {error && (
        <p className="text-sm text-fraud animate-pulse-opacity">{error}</p>
      )}
    </div>
  );
}
