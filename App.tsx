
import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { OptionSelector } from './components/OptionSelector';
import { Spinner } from './components/Spinner';
import { DownloadIcon, SparklesIcon } from './components/Icons';
import { LIGHTING_OPTIONS, CAMERA_ANGLE_OPTIONS, GEMINI_PROMPT } from './constants';
import { generateStyledImage } from './services/geminiService';
import type { UploadedImage } from './types';

const App: React.FC = () => {
  const [productImage, setProductImage] = useState<UploadedImage | null>(null);
  const [referenceImage, setReferenceImage] = useState<UploadedImage | null>(null);
  const [lightingType, setLightingType] = useState<string>(LIGHTING_OPTIONS[0].id);
  const [cameraAngle, setCameraAngle] = useState<string>(CAMERA_ANGLE_OPTIONS[0].id);
  
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!productImage || !referenceImage) {
      setError('Please upload both a product and a reference image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateStyledImage(
        productImage,
        referenceImage,
        lightingType,
        cameraAngle
      );
      setGeneratedImage(`data:image/png;base64,${result}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [productImage, referenceImage, lightingType, cameraAngle]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated-product-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-7xl mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-teal-400 to-blue-500">
          YG Create Images
        </h1>
        <p className="mt-2 text-lg text-gray-400">AI-Powered Product Photography</p>
      </header>
      
      <main className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Control Panel */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col space-y-6 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
              id="product-image"
              label="Product Image"
              onImageUpload={(base64, mimeType) => setProductImage({ base64, mimeType })}
              uploadedImage={productImage?.base64 ?? null}
            />
            <ImageUploader
              id="reference-image"
              label="Reference Style"
              onImageUpload={(base64, mimeType) => setReferenceImage({ base64, mimeType })}
              uploadedImage={referenceImage?.base64 ?? null}
            />
          </div>
          
          <OptionSelector
            title="Lighting Type"
            options={LIGHTING_OPTIONS}
            selectedValue={lightingType}
            onChange={setLightingType}
          />
          
          <OptionSelector
            title="Camera Angle"
            options={CAMERA_ANGLE_OPTIONS}
            selectedValue={cameraAngle}
            onChange={setCameraAngle}
          />
          
          <button
            onClick={handleGenerate}
            disabled={isLoading || !productImage || !referenceImage}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
          >
            {isLoading ? (
              <>
                <Spinner />
                Generating...
              </>
            ) : (
              <>
                <SparklesIcon />
                Generate Image
              </>
            )}
          </button>
        </div>
        
        {/* Output Panel */}
        <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center border border-gray-700 min-h-[400px] lg:min-h-0">
          {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</div>}
          
          <div className="w-full h-full flex flex-col items-center justify-center">
            {isLoading && (
              <div className="text-center">
                <Spinner size="lg" />
                <p className="mt-4 text-gray-400 animate-pulse">Recreating your product with a new style...</p>
              </div>
            )}
            
            {!isLoading && !generatedImage && !error && (
              <div className="text-center text-gray-500">
                <p className="text-lg">Your generated image will appear here.</p>
                <p>Upload images and set your options to start.</p>
              </div>
            )}
            
            {generatedImage && !isLoading && (
              <div className="w-full flex flex-col items-center gap-4 animate-fade-in">
                <img
                  src={generatedImage}
                  alt="Generated Product"
                  className="rounded-lg shadow-2xl object-contain w-full max-w-full max-h-[calc(100vh-250px)]"
                />
                <button
                  onClick={handleDownload}
                  className="mt-4 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-300"
                >
                  <DownloadIcon />
                  Download in High Quality
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
