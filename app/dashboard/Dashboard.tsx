"use client";
import CampaignTable from "@/component/CampaignTable";
import { Card } from "@/component/Card";
import { LeftNavbar } from "@/component/LeftNavbar";
import { RectangleCard } from "@/component/RectangleCard";
import { UploadPopup } from "@/component/UploadPopup";
import { useState } from "react";

export  function Dashboard() {
  const [modalData, setModalData] = useState<null | { title: string;buttonText: string,date:boolean }>(null);

  const cardData = [
    {
      imageurl: "/assets/dashboard/first.png",
      num: "432",
      desc: "Calls Dialed",
      rgba: "rgba(42, 104, 255, 1)",
    },
    {
      imageurl: "/assets/dashboard/second.png",
      num: "346",
      desc: "Calls Answered",
      rgba: "rgba(0, 210, 106, 1)",
    },
    {
      imageurl: "/assets/dashboard/third.png",
      num: "289",
      desc: "Meetings Booked",
      rgba: "rgba(252, 213, 63, 1)",
    },
    {
      imageurl: "/assets/dashboard/fouth.png",
      num: "80%",
      desc: "Conversion Rate",
      rgba: "rgba(255, 110, 20, 1)",
    },
  ];

  const openProspectModal = () => {
    setModalData({
      title: "Upload Prospects",
      buttonText: "Start to initiate the call drive",
      date:false
    });
  };

  const openCampaignModal = () => {
    setModalData({
      title: "Create Campaign",
      buttonText: "Schedule the call drive",
      date: true
    });
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div >
      <div className="flex-1 ">
        {/* Header */}
        <div className=" pt-2">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>

        {/* Rectangle Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 pt-8">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {cardData.map((item, idx) => (
            <Card
              key={idx}
              imageurl={item.imageurl}
              num={item.num}
              desc={item.desc}
              rgba={item.rgba}
            />
          ))}
        </div>

        {/* Campaign Table */}
        <div className="bg-[#1C1C1C] mt-6 rounded-md p-4 overflow-x-auto">
          <CampaignTable />
        </div>
      </div>

      {/* Upload Modal */}
      {modalData && (
        <UploadPopup
          onClose={closeModal}
          title={modalData.title}
          buttonText={modalData.buttonText}
          date={modalData.date}
        />
      )}
    </div>
  );
}