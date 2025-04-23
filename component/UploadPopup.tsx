import Image from "next/image";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { Input } from "./Input";
import { Button } from "./Button";

interface UploadPopupProps {
  onClose: () => void;
  title: string;
  buttonText: string;
  date: boolean;
}

export function UploadPopup({
  onClose,
  title,
  buttonText,
  date,
}: UploadPopupProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<string[][] | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewData(null);
      setShowPreview(false);
    }
  };

  const handlePreview = async () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      }) as string[][];
      setPreviewData(parsedData);
      setShowPreview(true);
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  return (
    <div className="fixed inset-0 bg-[#0E0E0E80] bg-opacity-60 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
      >
        ✕
      </button>

      <div className="bg-[#1c1c1c] p-8 rounded-2xl w-[400px] md:w-[550px] lg:w-[550px] max-w-full text-white shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-hide">
        <h2 className="text-center text-lg font-semibold text-teal-300 mb-6">
          {title}
        </h2>

        <label className="block text-sm mb-2">Name of the call drive</label>
       

             <Input 
              placeholder={"Enter name of the call drive"}
              />

        {date && (
          <div className="flex flex-row gap-2 mt-2">
            <div>
              <label className="block text-sm mb-2">
                Start Date
              </label>
              <Input 
              placeholder={"Start Date"}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">
                Start Time
              </label>
              <Input 
              placeholder={"Start Time"}
              />
            </div>
          </div>
        )}

        <label className="block text-sm mb-2 mt-2">Upload Files</label>

        {!showPreview && (
          <div
            onClick={handleFileClick}
            className="border border-dashed border-gray-500 p-6 rounded-lg text-center flex flex-col items-center gap-2 mb-4 relative cursor-pointer hover:bg-[#2a2a2a]"
          >
            <Image
              src={"/assets/dashboard/upload.png"}
              alt="upload"
              width={32}
              height={32}
            />
            <p className="text-sm text-gray-400">
              Upload Files or Drag and drop
            </p>
            <p className="text-xs text-gray-500">
              (accepts .csv, .xlsx &lt;50MB)
            </p>
            <input
              type="file"
              accept=".csv, .xlsx"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        )}

        {selectedFile && (
          <>
            <div className="bg-[#2a2a2a] p-3 rounded-lg mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={"/assets/dashboard/pdf.png"}
                  alt="pdf"
                  width={22}
                  height={22}
                />
                <div>
                  <p className="text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-gray-400">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Image
                src={"/assets/dashboard/delete.png"}
                alt="delete"
                width={22}
                height={22}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewData(null);
                  setShowPreview(false);
                }}
              />
            </div>

            {!showPreview && (
              <button
                onClick={handlePreview}
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 mb-4 transition-all"
              >
                Preview File Content
              </button>
            )}
          </>
        )}

        {showPreview && previewData && (
          <div className="bg-[#2a2a2a] p-4 rounded-lg max-h-60 overflow-y-auto text-sm mb-4 scrollbar-hide">
            <table className="w-full table-auto text-left">
              <thead className="text-teal-400">
                <tr>
                  {previewData[0]?.map((head, idx) => (
                    <th key={idx} className="pr-2">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.slice(1, 6).map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-600">
                    {row.map((cell, i) => (
                      <td key={i} className="pr-2 py-1">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {previewData.length > 6 && (
              <p className="text-xs text-gray-400 mt-2">
                Only showing first 5 rows...
              </p>
            )}
          </div>
        )}

        <label className="block text-sm mb-2">Script</label>
        <Input 
              placeholder={"Enter script"}
              />


              

       

        <Button
         text={buttonText}
         className="mt-4"
        />
      </div>
    </div>
  );
}
