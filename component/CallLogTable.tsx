"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { generateTranscriptPdf } from "./TranscriptPdf";
interface Call {
  call_status: string;
  call_sentiment: string;
  meeting_id: string;
  assigned_bde: string;
  call_start_time: string;
  call_transcript: string;
}

interface additional_fields {
  name: string;
  phone: string;
  email: string;
  website_url: string;
  google_rating: string;
  facebook_rating: string;
  instagram_followers: string;
}
interface Row {
  additional_fields: additional_fields;
  time: string;
  call_status: "Not Called" | "Called" | "Answered";
  calls: Call[];
}

interface CallLogTableProps {
  rows: Row[];
}

export default function CallLogTable({ rows }: CallLogTableProps) {
  const [rowData, setRowData] = useState(rows);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(rowData.length / itemsPerPage);
  const paginatedData = rowData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  console.log("row", rows);
  useEffect(() => {
    setRowData(rows);
    setCurrentPage(1);
  }, [rows]);

  // console.log("pageing", paginatedData);
  return (
    <div className="p-6 bg-[#1C1C1C] shadow rounded-4xl  mx-auto">
      <div className=" overflow-x-auto   border-red-500">
        <table className="min-w-full  text-sm text-left text-[#8D8D8D] border-b-2 border-[#303030] table-fixed ">
          <thead className="text-xs uppercase text-[#8D8D8D] bg-[#242424] rounded-2xl">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Mobile Number</th>
              <th className="px-6 py-3">Email Id</th>
              <th className="px-6 py-3">Dialed at (time)</th>
              <th className="px-6 py-3">Call Connected</th>
              <th className="px-6 py-3">Sentiment</th>
              <th className="px-6 py-3">Meeting Scheduled</th>
              <th className="px-6 py-3">Download Transcript</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData &&
              paginatedData.map((row, idx) => (
                <tr
                  key={idx}
                  className="rounded-xl border-b-2 border-[#303030]"
                >
                  <td className="px-6 py-3  ">{row.additional_fields.name}</td>
                  <td className="px-6 py-3 ">
                    {row.additional_fields?.phone
                      ? row.additional_fields.phone
                      : "-"}
                  </td>
                  <td className="px-6 py-3">{row.additional_fields.email}</td>
                  <td className="px-6 py-3 ">
                    {row.calls && row.calls.length > 0
                      ? row.calls.map((call, index) => (
                          <div key={index}>
                            {call.call_start_time
                              ? new Date(
                                  call.call_start_time
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })
                              : "-"}
                          </div>
                        ))
                      : "-"}
                  </td>

                  {/* <td className="px-6 py-3">
                    {row.calls && row.calls.length > 0
                      ? row.calls.map((call, index) => (
                          <div key={index}>{call.call_status || "-"}</div>
                        ))
                      : "-"}
                  </td> */}

                  <td className="px-6 py-3 ">{row.call_status}</td>
                  <td className="px-6 py-3 ">
                    {row.calls && row.calls.length > 0
                      ? row.calls.map((call, index) => (
                          <div key={index}>{call.call_sentiment || "N/A"}</div>
                        ))
                      : "N/A"}
                  </td>
                  <td className="px-3 py-3 ">
                    {row.calls && row.calls.length > 0
                      ? row.calls.map((call, index) => (
                          <div key={index}>
                            {call.meeting_id ? "Yes" : "No"}
                          </div>
                        ))
                      : "No"}
                  </td>
                  {/* <td className="px-6 py-3">
                    {row.calls && row.calls.length > 0
                      ? row.calls.map((call, index) => (
                          <div key={index}>{call.assigned_bde || "-"}</div>
                        ))
                      : "-"}
                  </td> */}

                  <td className="px-3 py-3 ">
                    {row.calls && row.calls.length > 0 ? (
                      <button
                        onClick={() =>
                          generateTranscriptPdf(
                            row.calls,
                            row.additional_fields.name
                          )
                        } // Trigger PDF generation
                        className="text-[#63FBEF] underline hover:text-white"
                      >
                        Download Transcript
                      </button>
                    ) : (
                      "-"
                    )}
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
            currentPage === 1 ? "bg-[#63FBEF] text-black" : "bg-gray-700"
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
                currentPage === page ? "bg-[#63FBEF] text-black" : "bg-gray-700"
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
              currentPage === totalPages
                ? "bg-[#63FBEF] text-black"
                : "bg-gray-700"
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
}

