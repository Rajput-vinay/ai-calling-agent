"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from 'axios'

type StatusType = "Active" | "Pause" | "Stop";

interface Campaign {
  _id: string;
  compaign_name: string;
  status: "Active" | "Pause" | "Stop";
  progress: number;
  s_date: string;
}

interface CampaignTableProps {
  data: Campaign[];
  fetchData: () => void;
}

const statusColor = {
  Active: "bg-[#00D26A0F] text-[#00D26A]",
  Pause: "bg-[#FCD53F0F] text-[#FCD53F]",
  Stop: "bg-[#FE21510F] text-[#FE2151]",
};

const buttonColor = {
  Active: "bg-[#00D26A0F] text-[#00D26A]",
  Pause: "text-[#FCD53F] bg-[#FCD53F0F]",
  Stop: "text-[#FE2151] bg-[#FE21510F]",
};

const statusOptions: StatusType[] = ["Active", "Pause", "Stop"];

// const campaigns: Campaign[] = [
//   { name: "Campaign Name 1", status: "Active", progress: 80, startDate: "Apr 16, 2025" },
//   { name: "Campaign Name 2", status: "Pause", progress: 65, startDate: "Apr 15, 2025" },
//   { name: "Campaign Name 3", status: "Active", progress: 70, startDate: "Apr 14, 2025" },
//   { name: "Campaign Name 4", status: "Stop", progress: 85, startDate: "Apr 12, 2025" },
// ];

// Custom ProgressBar Component
const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
    <div
      className="h-full bg-cyan-400"
      style={{ width: `${value}%` }}
    />
  </div>
);

// Custom Button Component
const Button = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <button
    onClick={onClick}
    className={clsx("rounded px-3 py-1 text-sm font-medium", className)}
  >
    {children}
  </button>
);



const CampaignTable = ({data,fetchData}: CampaignTableProps) => {
const [campaigns,setCampaigns] = useState<Campaign[]>(data)

const updateCampaignStatus = async (campaignId: string, newStatus: StatusType) => {
  
  try{
const res = await axios.put(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/update-compaign/${campaignId}`,{status:newStatus},{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}})

const updated = campaigns.map((c)=> c._id === campaignId ? {...c,status:newStatus}:c)

setCampaigns(updated)
fetchData()
  }catch(error){
  console.log("Error updating campaign status:", error);
  }
}

  return (
    <div className="p-4 bg-[#1C1C1C] rounded-xl text-white">
      <h2 className="text-xl font-semibold mb-4">Campaign Status</h2>
      <div className="overflow-auto rounded-lg">
        <table className="min-w-full text-sm text-left text-[#8D8D8D] border-separate border-spacing-y-2">
          <thead className="text-xs uppercase bg-[#242424] text-[#8D8D8D] rounded-2xl">
            <tr>
              <th className="px-6 py-3 whitespace-nowrap">Campaign Name</th>
              <th className="px-6 py-3 whitespace-nowrap">Status</th>
              <th className="px-6 py-3 whitespace-nowrap">Progress %</th>
              <th className="px-6 py-3 whitespace-nowrap">Start Date</th>
              <th className="px-6 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data &&data.map((campaign, idx) => (
              <tr
                key={campaign._id}
                className="bg-[#1A1A1A] rounded-xl border-b border-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap">{campaign.compaign_name}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  
                  <span className={clsx("flex items-center gap-2 w-fit px-2 py-1 rounded-md", statusColor[campaign.status])}>
                    <span className={clsx("w-2 h-2 rounded-full", statusColor[campaign.status])}></span>
                    {campaign.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 flex-col md:flex-row">
                    <ProgressBar value={campaign.progress} />
                    <span>{campaign.progress}%</span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">{campaign.s_date}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 flex-wrap">
                  <select
                      value={campaign.status}
                      onChange={(e) =>
                        updateCampaignStatus(
                          campaign._id,
                          e.target.value as StatusType
                        )
                      }
                      className={clsx(
                        buttonColor[campaign.status],
                        "rounded px-3 py-1 text-sm font-medium cursor-pointer"
                      )}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status} className="text-black">
                          {status}
                        </option>
                      ))}
                    </select>

                    <Link href={`/dashboard/campaign/${campaign._id}`}>
                    <Button className="bg-[#63FBEF] text-black cursor-pointer" >View</Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
