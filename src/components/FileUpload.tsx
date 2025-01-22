import React, { useState } from 'react';
import { AnalyticsData, FeedbackItem } from '../types';
import { uploadFile } from '../services/api';

interface FileUploadProps {
  onDataReceived: (data: FeedbackItem[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataReceived }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const data = await uploadFile(formData);
      onDataReceived(data);
      setSelectedFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <div className="upload-controls">
        <input
          type="file"
          onChange={handleFileSelect}
          disabled={isLoading}
          accept=".csv,.xlsx,.json"
          className="file-input"
        />
        <button
          onClick={handleUpload}
          disabled={isLoading || !selectedFile}
          className="upload-button"
        >
          {isLoading ? 'Uploading...' : 'Analyze Data'}
        </button>
      </div>
      {selectedFile && (
        <p className="selected-file">Selected: {selectedFile.name}</p>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FileUpload;
