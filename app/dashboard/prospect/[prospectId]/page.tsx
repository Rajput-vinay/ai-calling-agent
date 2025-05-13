import CallLogTable from "@/component/CallLogTable";
import Link from "next/link";

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

interface Params {
  params: Promise<{ prospectId: string }>;
}

async function fetchProspectDetails(prospectId: string): Promise<Row[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-prospect-details/${prospectId}`
    );

    // console.log("Fetching campaign:", campaignId)
    // console.log("Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch campaign details: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    // console.log("prospect_data",data)
    return data.lead;
  } catch (error) {
    console.error("Error fetching campaign details:", error);
    return [];
  }
}

export default async function page({ params }: Params) {
  const { prospectId } = await params;
  let rows: Row[] = [];

  try {
    rows = await fetchProspectDetails(prospectId);
  } catch (error: any) {
    console.error("Fetch error:", error);
    rows = [];
  }

  // console.log("rows", rows)
  return (
    <>
      <div className="pt-6 md:pt-2 mb-2">
        {/* <h1 className="text-2xl font-semibold">{`< Dashboard > Prospect Name`} </h1> */}

        <h1 className="text-2xl font-semibold">
          &lt;{" "}
          <Link
            href="/dashboard"
            className="text-2xl font-semibold cursor-pointer hover:text-[#63FBEF]  "
          >
            Dashboard
          </Link>{" "}
          &gt; Prospect
        </h1>
      </div>
      {rows.length === 0 ? (
        <p className="text-red-500 mt-4">No data found for this Prospect.</p>
      ) : (
        <CallLogTable rows={rows} />
      )}
    </>
  );
}
