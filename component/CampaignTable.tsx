"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

type StatusType = "Active" | "Pause" | "Stop";

interface Campaign {
  _id: string;
  compaign_name: string;
  status: StatusType;
  progress: number;
  s_date: string;
}

interface Prospect {
  _id: string;
  prospect_name: string;
  progress: number;
  status: "Active";
}

type CampaignTableProps = {
  data: Campaign[] | Prospect[];
  type: "campaign" | "prospect";
  fetchData: () => void;
};

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

const ProgressBar = ({ value }: { value: number }) => (
  <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
    <div className="h-full bg-cyan-400" style={{ width: `${value}%` }} />
  </div>
);

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

const CampaignTable: React.FC<CampaignTableProps> = ({
  data,
  type,
  fetchData,
}) => {
  const [campaigns, setCampaigns] = useState<Campaign[] | Prospect[]>(data);
 const [currentPage,setCurrentPage] = useState(1);
 const itemsPerPage = 10;
 const totalPages = Math.ceil(campaigns.length / itemsPerPage);
 const paginatedData = campaigns.slice(
  (currentPage -1) *itemsPerPage,
  currentPage * itemsPerPage
 )
  useEffect(()=>{
    setCampaigns(data);
    setCurrentPage(1);
  },[data])
  console.log("campaigns", campaigns);
  const updateCampaignStatus = async (
    campaignId: string,
    newStatus: StatusType
  ) => {
    if (type !== "campaign") return;
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/update-compaign/${campaignId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updated = (campaigns as Campaign[]).map((c) =>
        c._id === campaignId ? { ...c, status: newStatus } : c
      );
      setCampaigns(updated);
      fetchData();
    } catch (error) {
      console.log("Error updating campaign status:", error);
    }
  };

  return (
    <div className="p-4 bg-[#1C1C1C] rounded-2xl text-white ">
      <h2 className="text-xl font-semibold mb-4 capitalize">
        {type} Status
      </h2>
      <div className="overflow-auto rounded-lg">
        <table className="min-w-full text-sm text-left text-[#8D8D8D] border-separate border-spacing-y-2">
          <thead className="text-xs uppercase bg-[#242424] text-[#8D8D8D] rounded-2xl">
            <tr className="py-3">
              <th className="px-6 py-3 whitespace-nowrap">
                {type === "campaign" ? "Campaign Name" : "Prospect Name"}
              </th>
              <th className="px-6 py-3 whitespace-nowrap">Status</th>
              <th className="px-6 py-3 whitespace-nowrap">Progress %</th>
              {type === "campaign" && (
                <th className="px-6 py-3 whitespace-nowrap">Start Date</th>
              )}
              <th className="px-6 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item._id}
                className="bg-[#1A1A1A] rounded-xl border-b border-gray-800"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  {type === "campaign"
                    ? (item as Campaign).compaign_name
                    : (item as Prospect).prospect_name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {type === "campaign" ? (
                    <span
                      className={clsx(
                        "flex items-center gap-2 w-fit px-2 py-1 rounded-md",
                        statusColor[(item as Campaign).status]
                      )}
                    >
                      <span
                        className={clsx(
                          "w-2 h-2 rounded-full",
                          statusColor[(item as Campaign).status]
                        )}
                      ></span>
                      {(item as Campaign).status}
                    </span>
                  ) : (
                    <span
                      className={clsx(
                        "flex items-center gap-2 w-fit px-2 py-1 rounded-md",
                        statusColor["Active"]
                      )}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#00D26A]" />
                      Active
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 flex-col md:flex-row">
                    <ProgressBar value={item.progress} />
                    <span>{item.progress}%</span>
                  </div>
                </td>

                {type === "campaign" && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(item as Campaign).s_date}
                  </td>
                )}

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 flex-wrap">
                    {type === "campaign" ? (
                      <select
                        value={(item as Campaign).status}
                        onChange={(e) =>
                          updateCampaignStatus(
                            item._id,
                            e.target.value as StatusType
                          )
                        }
                        className={clsx(
                          buttonColor[(item as Campaign).status],
                          "rounded px-3 py-1 text-sm font-medium cursor-pointer"
                        )}
                      >
                        {statusOptions.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="text-black"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Button className="bg-[#00D26A0F] text-[#00D26A]">
                        Active
                      </Button>
                    )}

                    <Link
                      href={
                        type === "campaign"
                          ? `/dashboard/campaign/${item._id}`
                          : `/dashboard/prospect/${item._id}`
                      }
                    >
                      <Button className="bg-[#63FBEF] text-black cursor-pointer">
                        View More
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4 gap-2 flex-wrap">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
    className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
  >
    Prev
  </button>

  {/* Page 1 */}
  <button
    onClick={() => setCurrentPage(1)}
    className={clsx(
      "px-3 py-1 rounded",
      currentPage === 1 ? "bg-cyan-400 text-black" : "bg-gray-700"
    )}
  >
    1
  </button>

  {/* Left Ellipsis */}
  {currentPage > 4 && <span className="px-2">...</span>}

  {/* Middle Pages */}
  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(
      (page) =>
        page !== 1 &&
        page !== totalPages &&
        page >= currentPage - 2 &&
        page <= currentPage + 2
    )
    .map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={clsx(
          "px-3 py-1 rounded",
          currentPage === page ? "bg-cyan-400 text-black" : "bg-gray-700"
        )}
      >
        {page}
      </button>
    ))}

  {/* Right Ellipsis */}
  {currentPage < totalPages - 3 && <span className="px-2">...</span>}

  {/* Last Page */}
  {totalPages > 1 && (
    <button
      onClick={() => setCurrentPage(totalPages)}
      className={clsx(
        "px-3 py-1 rounded",
        currentPage === totalPages ? "bg-cyan-400 text-black" : "bg-gray-700"
      )}
    >
      {totalPages}
    </button>
  )}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => prev + 1)}
    className="px-3 py-1 rounded bg-gray-700 disabled:opacity-50"
  >
    Next
  </button>
</div>
    </div>
  );
};

export default CampaignTable;
