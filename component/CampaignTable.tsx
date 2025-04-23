"use client";

import React from "react";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";

type StatusType = "Active" | "Pause" | "Stop";

interface Campaign {
  name: string;
  status: StatusType;
  progress: number;
  startDate: string;
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

const campaigns: Campaign[] = [
  { name: "Campaign Name 1", status: "Active", progress: 80, startDate: "Apr 16, 2025" },
  { name: "Campaign Name 1", status: "Pause", progress: 65, startDate: "Apr 15, 2025" },
  { name: "Campaign Name 1", status: "Active", progress: 70, startDate: "Apr 14, 2025" },
  { name: "Campaign Name 1", status: "Stop", progress: 85, startDate: "Apr 12, 2025" },
];

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

const CampaignTable = () => {
  return (
    <div className="p-4 rounded-lg  text-white w-full">
      <h2 className="text-xl font-semibold mb-4">Campaign Status</h2>

      {/* Table Header */}
      <div className="grid grid-cols-5 p-3 bg-[#242424] rounded-md font-medium text-sm text-gray-300">
        <div>Campaign Name</div>
        <div>Status</div>
        <div>Progress Percentage</div>
        <div>Start Date</div>
        <div>Actions</div>
      </div>

      {/* Campaign Rows */}
      {campaigns.map((campaign, idx) => (
        <div
          key={idx}
          className="grid grid-cols-5 items-center py-4 px-3 border-b border-gray-800 hover:bg-[#1A1A1A]"
        >
          <div>{campaign.name}</div>

          <div className={clsx("flex items-center gap-2 w-18 p-2 pr-2 rounded-md",statusColor[campaign.status])}>
            <span className={clsx("w-2 h-2 rounded-full", statusColor[campaign.status])}></span>{campaign.status}
            
          </div>

          <div className="flex items-center gap-2">
            <ProgressBar value={campaign.progress} />
            <span>{campaign.progress}%</span>
          </div>

          <div>{campaign.startDate}</div>

          <div className="flex gap-4">
            <Button className={clsx(buttonColor[campaign.status], "flex items-center gap-1")}>
              {campaign.status} <ChevronDown size={14} />
            </Button>
            <Button className="bg-[#63FBEF] text-black">
              View Details
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignTable;
