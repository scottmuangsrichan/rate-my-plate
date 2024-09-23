import React, { useState, useRef } from "react";
import { Button } from "./ui/button";

interface ImageUploadProps {
  onUpload: (file: File) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClick = () => fileInputRef.current?.click();

  return (
    <div className="border p-10 rounded-lg">
      <div className="border-dashed p-10 border-2 border-black rounded-lg">
        <p>
          Drop your image here, or{" "}
          <span>
            <Button onClick={handleClick}>Choose Image</Button>
          </span>
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: "none" }}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: "200px", marginTop: "10px" }}
          />
        )}
      </div>
    </div>
  );
}
