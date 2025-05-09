'use client'
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "./Button";
import {toast} from 'react-toastify'
import axios from "axios"
import Papa from 'papaparse'
import { Input2 } from "./Input2";
interface UploadPopupProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CampaignUpload({
  onClose,
  onSuccess
}: UploadPopupProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<string[][] | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [callDriveName,setCallDriveName] = useState("")
  const [date,setDate] = useState("")
  const [time,setTime] = useState("")
  const [scriptText,setScriptText] = useState("")
  const [timeZone,setTimeZone] = useState("")
  const [promptList, setPromptList] = useState<{ _id: string, prompt_name: string, required_fields: string }[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState("");
 const [missingFields, setMissingFields] = useState<string[]>([]);




const fetchPrompts = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/prompt/get-all-prompts`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    });

    setPromptList(response.data.prompts);
  } catch (error) {
    toast.error("Failed to fetch prompts.");
  }
}

useEffect(() =>{
  fetchPrompts();
},[])

  useEffect(() =>{
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log("timeZone",timeZone)
    setTimeZone(timeZone)
  })
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "text/csv") {
        toast.warning("Please upload a valid CSV file");
        setSelectedFile(null);
        return;
      }
  
      const selectedPromptObj = promptList.find(
        (p) => p._id === selectedPrompt
      );
      if (!selectedPromptObj) {
        toast.warning("Please select a prompt before uploading a file.");
        return;
      }
  
      let requiredFields: string[] = [];
      
      // Assuming required_fields is an array
      if (Array.isArray(selectedPromptObj.required_fields)) {
        requiredFields = selectedPromptObj.required_fields.map((field) =>
          field.trim().toLowerCase()
        );
      } else {
        // Handle unexpected format
        toast.error("Invalid required_fields format");
        return;
      }
  
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result: any) => {
          const headers: string[] = result.meta.fields.map((field: string) =>
            field.trim().toLowerCase()
          );
  
          const missingFields = requiredFields.filter(
            (field) => !headers.includes(field)
          );
  
          if (missingFields.length > 0) {
            setMissingFields(missingFields); // Set missing fields for display
            toast.error(
              `Missing required fields in CSV: ${missingFields.join(", ")}`
            );
            setSelectedFile(null);
            return;
          }
  
          setMissingFields([]); // Clear missing fields if all required columns are present
          setSelectedFile(file);
          setPreviewData(null);
          setShowPreview(false);
        },
        error: (error) => {
          toast.error("Error parsing the CSV file");
          console.error(error);
        },
      });
    }
  };
 
   const handlePreview = async () => {
     if (!selectedFile) return;
 
     const reader = new FileReader();
     reader.onload = (e) => {
       if(reader.result){
         Papa.parse(reader.result as string,{
           complete:(result: any) =>{
             setPreviewData(result.data as string[][]);
             setShowPreview(true);
           },
 
           header:false,
           skipEmptyLines: true,
         })
       }
      
     };
 
     reader.readAsText(selectedFile);
   };
  const uploadCampaignData = async() =>{
    if(!selectedFile || !callDriveName || !date || !time ){
      toast.warning("Please fill all field and upload a file")
      return;
    }

    const formData = new FormData();
    formData.append("file",selectedFile)
    formData.append("compaign_name",callDriveName)
    formData.append("s_date",date)
    formData.append("s_time",time)
    formData.append("additional_instructions",scriptText)
    formData.append("time_zone",timeZone)
    formData.append("prompt_id",selectedPrompt);

    const token = localStorage.getItem("token");

    try {
const response = await axios.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/create-compaign`,formData, {
  headers:{
    'Authorization':`Bearer ${token}`
  }
})

if(response.status === 201){
  toast.success("campign upload successfully!")
  onSuccess();
  onClose();
}else {
  toast.error("Failed to upload");
}
    }catch(error){
      console.error("Upload error:", error);
      toast.error("Something went wrong while uploading.");
    }

  }

  useEffect(() => {
    setCallDriveName("");
    setDate("");
    setTime("");
    setScriptText("");
    setSelectedFile(null);
  }, []);

  
  return (
    <div className="fixed inset-0 bg-[#0E0E0E80] bg-opacity-60 flex items-center justify-center z-50 ">
      
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg cursor-pointer"
      >
        ✕
      </button>

      <div className="bg-[#1c1c1c] p-8 rounded-2xl w-[400px] md:w-[550px] lg:w-[550px] max-w-full text-white shadow-lg relative max-h-[90vh] overflow-y-auto no-scrollbar overflow-x-hidden">
      
      


      <div
            className="absolute pointer-events-none"
            style={{
              width: "400px",
              height: "350px",
              top: "-250px",
              right: "-200px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99, 251, 239, 1) 0%, rgba(0,0,0,0.2) 60%, transparent 80%)",
              filter: "blur(60px)",
              opacity: 0.6,
              zIndex: 0,
            }}
          />

          <div
            className="absolute top-3 left-[32rem] z-10"
            style={{
              width: "20px",
              height: "20px",
              background: "url('/assets/authImage/star1.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />

          <div
            className="absolute top-8 left-[30rem] z-10"
            style={{
              width: "10px",
              height: "10px",
              background: "url('/assets/authImage/star2.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />

          <div
            className="absolute top-14 left-[33rem] z-10"
            style={{
              width: "10px",
              height: "10px",
              background: "url('/assets/authImage/star3.png') no-repeat center center",
              backgroundSize: "contain",
            }}
          />

        <h2 className="text-center text-lg font-semibold text-teal-300 mb-6">
          Create Campaign
        </h2>

        <label className="block text-sm mb-2">Name of the call drive</label>
        <Input2 placeholder={"Enter name of the call drive"} value={callDriveName} onChange={(e)=>setCallDriveName(e.target.value)}/>

        {promptList.length > 0 && (
          <div className="mb-2 mt-2">
            <label className="block text-sm mb-2">Choose Prompt</label>
            <select
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(e.target.value)}
              className="w-full bg-[#2a2a2a] text-white p-2 rounded-lg border border-gray-600"
            >
              <option value="">Select a prompt</option>
              {promptList.map((prompt) => (
                <option key={prompt._id} value={prompt._id}>
                  {prompt.prompt_name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-row gap-2 mt-2">
          <div>
            <label className="block text-sm mb-2">Start Date</label>
            <Input2 type={"date"} placeholder={"Start Date"} value={date} onChange={(e)=> setDate(e.target.value)}/>
          </div>

          <div>
            <label className="block text-sm mb-2">Start Time</label>
            <Input2 type={"time"} placeholder={"Start Time"} value={time} onChange={(e)=> setTime(e.target.value)}/>
          </div>
        </div>

        <label className="block text-sm mb-2 mt-2">Upload Files</label>

        {!selectedFile && (
  <div
    onClick={handleFileClick}
    className="border border-dashed border-gray-500 p-6 rounded-lg text-center flex flex-col items-center gap-2 mb-4 relative cursor-pointer hover:bg-[#2a2a2a] "
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
      (accepts .csv, &lt;50MB)
    </p>
    <input
      type="file"
      accept=".csv,"
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
                       className="w-full bg-[#2a2a2a] text-white font-semibold py-2 rounded-lg  mb-4 transition-all"
                     >
                       Preview File Content
                     </button>
                   )}
                 </>
               )}
       
               {showPreview && previewData && (
                //  <div className="bg-[#2a2a2a] p-4 rounded-lg max-h-60 overflow-y-auto text-sm mb-4 no-scrollbar">
                //    <table className="w-full table-auto text-left">
                //      <thead className="text-teal-400">
                //        <tr>
                //          {previewData[0]?.map((head, idx) => (
                //            <th key={idx} className="pr-2">
                //              {head}
                //            </th>
                //          ))}
                //        </tr>
                //      </thead>
                //      <tbody>
                //        {previewData.slice(1, 6).map((row, idx) => (
                //          <tr key={idx} className="border-t border-gray-600">
                //            {row.map((cell, i) => (
                //              <td key={i} className="pr-2 py-1">
                //                {cell}
                //              </td>
                //            ))}
                //          </tr>
                //        ))}
                //      </tbody>
                //    </table>
                //    {previewData.length > 6 && (
                //      <p className="text-xs text-gray-400 mt-2">
                //        Only showing first 5 rows...
                //      </p>
                //    )}
                //  </div>

                <div className="bg-[#2a2a2a] p-4 rounded-lg max-h-60 overflow-y-auto text-sm mb-4 no-scrollbar">
                <table className="w-full text-sm text-left text-[#8D8D8D] border-b-2 border-[#303030]">
                  <thead className="text-xs uppercase text-[#8D8D8D] bg-[#303030] rounded-3xl">
                    <tr>
                      {previewData[0]
                        ?.map((head, idx) => ({ head, idx }))
                        .filter(({ head }) =>
                          ['name', 'phone', 'email'].includes(head.toLowerCase())
                        )
                        .map(({ head, idx }) => (
                          <th key={idx} className="pr-2 py-2 pl-2">
                            {head}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.slice(1, 6).map((row, rowIdx) => {
                      return (
                        <tr key={rowIdx} className="border-b-2 border-[#303030]">
                          {previewData[0]
                            ?.map((head, idx) => ({ head, idx }))
                            .filter(({ head }) =>
                              ['name', 'phone','email' ].includes(head.toLowerCase())
                            )
                            .map(({ idx }) => (
                              <td key={idx} className="pr-2 py-1">
                                {row[idx]}
                              </td>
                            ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {previewData.length > 6 && (
                  <p className="text-xs text-gray-400 mt-2">Only showing first 5 rows...</p>
                )}
              </div>
               )}

        {/* <label className="block text-sm mb-2">Script</label>
        <Input2 placeholder={"Enter script"} value={scriptText} onChange={(e)=>setScriptText(e.target.value)}/> */}


      


        <Button text={"Schedule the call drive"} className="mt-4 max-w-lg" onClick={uploadCampaignData} />
      </div>
    </div>
  );
}
