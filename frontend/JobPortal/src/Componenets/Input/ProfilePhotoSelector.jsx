import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

export default function ProfilePhotoSelector({ image, setImage, preview, setPreview }) {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
  
    const file = event.target.files[0];
    console.log(file)
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      console.log(preview)
      if (setPreview) {
          console.log("Hello Firls")
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {image ? (
        <div className="relative w-20 h-20">
          <img
            src={preview || previewUrl}
            alt="profile photo"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            type="button"
            onClick={handleRemoveImage}
          >
            <LuTrash className="w-4 h-4" />
          </button>
        </div>
     ):(
        <div
          className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center relative cursor-pointer"
          onClick={onChooseFile}
        >
          <LuUser className="w-10 h-10 text-gray-500" />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
            <LuUpload className="w-4 h-4 text-white" />
          </div>
        </div>
      )} 
    </div>
  );
}
