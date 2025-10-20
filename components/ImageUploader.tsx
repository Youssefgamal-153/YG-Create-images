
import React, { useRef, useCallback } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  id: string;
  label: string;
  onImageUpload: (base64: string, mimeType: string) => void;
  uploadedImage: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ id, label, onImageUpload, uploadedImage }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        onImageUpload(base64String, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor={id} className="mb-2 text-sm font-semibold text-gray-300">
        {label}
      </label>
      <div
        className="w-full aspect-square bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-green-400 hover:bg-gray-700 transition-all duration-300"
        onClick={handleClick}
      >
        <input
          id={id}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {uploadedImage ? (
          <img
            src={`data:image/png;base64,${uploadedImage}`}
            alt={label}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="text-center text-gray-400 p-4">
            <UploadIcon className="mx-auto" />
            <p className="mt-2 text-sm">Click to upload</p>
          </div>
        )}
      </div>
    </div>
  );
};
