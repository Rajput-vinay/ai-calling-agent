"use client";
import CampaignTable from "@/component/CampaignTable";
import { Card } from "@/component/Card";
import { LeftNavbar } from "@/component/LeftNavbar";
import { RectangleCard } from "@/component/RectangleCard";
import { UploadPopup } from "@/component/UploadPopup";
import { useEffect, useState } from "react";
import { CampaignUpload } from "@/component/CampaignUpload";
import axios from "axios";


interface Campaign {
  _id:string;
  compaign_name: string;
  status: "Active" | "Pause" | "Stop"; 
  progress: number;
  s_date: string;
}

interface Prospect {
  _id:string;
  prospect_name: string;
  progress:number;
  status: "Active";
}

interface overallStatsProps {
  totalCalls: number;
  totalCallsYes: number;
  totalMeetingsScheduled: number;
  conversionRate: number;
}
export function Dashboard() {
  const [showProspectModal, setShowProspectModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaignData, setCampaignData] = useState<Campaign[]>([])
  const [prospectData, setProspectData] = useState<Prospect[]>([])
  const [viewType, setViewType] = useState<"prospect" | "campaign">("campaign");
  const [overallStats,setOverallStats] = useState<overallStatsProps>({
    totalCalls: 0,
    totalCallsYes: 0,
    totalMeetingsScheduled: 0,
    conversionRate:0,
  })
  
  const getAllCampaign = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-all-compaigns`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setCampaignData(response.data.campaigns);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAllProspect = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-all-prospects`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setProspectData(response.data.prospect);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  
  // console.log("campaign data",prospectData)

  const getUserOverallCampaignDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-user-overall-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setOverallStats(response.data.overallStats);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  // console.log("overall stats",overallStats)
  const refreshDashboardData = () => {
    getUserOverallCampaignDetails();
    getAllCampaign();
    getAllProspect();
  };

  useEffect(() => {
    refreshDashboardData()
    
  },[]);
  // console.log("data", data);
  const cardData = [
    {
      imageurl: "/assets/dashboard/first.png",
      num: `${overallStats.totalCalls}`,
      desc: "Calls Dialed",
      rgba: "rgba(42, 104, 255, 1)",
    },
    {
      imageurl: "/assets/dashboard/second.png",
      num: `${overallStats.totalCallsYes}`,
      desc: "Calls Answered",
      rgba: "rgba(0, 210, 106, 1)",
    },
    {
      imageurl: "/assets/dashboard/third.png",
      num: `${overallStats.totalMeetingsScheduled}`,
      desc: "Meetings Booked",
      rgba: "rgba(252, 213, 63, 1)",
    },
    {
      imageurl: "/assets/dashboard/fouth.png",
      num: `${overallStats.conversionRate}%`,
      desc: "Conversion Rate",
      rgba: "rgba(255, 110, 20, 1)",
    },
  ];

  const openProspectModal = () => setShowProspectModal(true);
  const openCampaignModal = () => setShowCampaignModal(true);
  const closeProspectModal = () => setShowProspectModal(false);
  const closeCampaignModal = () => setShowCampaignModal(false);

  return (
    <div className="">
      <div className="flex-1 ">
        {/* Header */}
        <div className=" pt-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        {/* Rectangle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
          <RectangleCard
            onClick={openProspectModal}
            imageurl="/assets/dashboard/prospect1.png"
            title="Upload Prospects"
            description1="Want to start a call drive now?"
            description2="Upload your prospect data and let AI"
            description3="handle the rest"
          />
          <RectangleCard
            onClick={openCampaignModal}
            imageurl="/assets/dashboard/compaign2.png"
            title="Create Campaign"
            description1="Want to initiate a call drive later?"
            description2="Schedule it by creating a campaign—AI will"
            description3="take care of the rest"
          />
        </div>

        {/* Stat Cards */}
     <div className="flex flex-wrap gap-4 mt-6">
  {cardData.map((item, idx) => (
    <div className="flex-1 min-w-[200px] sm:w-[calc(25%-1rem)]" key={idx}>
      <Card
        imageurl={item.imageurl}
        num={item.num}
        desc={item.desc}
        rgba={item.rgba}
      />
    </div>
  ))}
</div>

        {/* view Toggle */}

        <div className="flex gap-4 mt-8 mb-4">
          <button 
          onClick={()=>setViewType("campaign")}
          className={`px-4 py-2 rounded-md ${
            viewType === "campaign" ? "bg-[#494747] text-[#63FBEF]" : "bg-[#242424] text-[#8D8D8D]"
          }`}
          >
            Campaigns
          </button>

          <button 
          onClick={()=>setViewType("prospect")}
          className={`px-4 py-2 rounded-md ${
            viewType === "prospect" ? "bg-[#494747] text-[#63FBEF]" : "bg-[#242424] text-[#8D8D8D]"
          }`}
          >
            Prospects
          </button>
        </div>

        {/* Campaign Table */}
        <div className="bg-[#1C1C1C] mt-6 rounded-2xl p-4 overflow-x-auto">
          <CampaignTable 
          data={viewType === "campaign" ? campaignData : prospectData}
           fetchData={refreshDashboardData}
           type={viewType}

           />
        </div>
      </div>

      {/* Upload Modal */}
      {showProspectModal && <UploadPopup
       onClose={() => setShowProspectModal(false)}
          onSuccess={() => {
            setShowProspectModal(false);
            refreshDashboardData();
          }}/>}

      {/*  create Campaign Modal */}
      {showCampaignModal && <CampaignUpload 
      onClose={() => setShowCampaignModal(false)}
      onSuccess={() => {
        setShowCampaignModal(false);
        refreshDashboardData();
      }} />}
    </div>
  );
}
