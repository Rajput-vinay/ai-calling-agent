import CallLogTable from "@/component/CallLogTable"
import Link from "next/link"



interface Call {
  call_status: string;
  call_sentiment: string;
  meeting_id: string;
  assigned_bde: string;
  call_start_time:string;
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
  params: Promise<{ campaignId: string }>;
}


async function fetchCampaignDetails(campaignId: string): Promise<Row[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/get-campaign-details/${campaignId}`
    )

    // console.log("Fetching campaign:", campaignId)
    // console.log("Response status:", response.status)
     
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to fetch campaign details: ${response.status} - ${errorText}`
      )
    }

    const data = await response.json()
    // console.log("campaign data",data)
    return data.lead
  } catch (error) {
    console.error("Error fetching campaign details:", error)
    return [] 
  }
}
  
export default async function page ({ params }:Params) {
  const {campaignId} = await params
  let rows: Row[] = []

  try {
    rows = await fetchCampaignDetails(campaignId)
  } catch (error: any) {
    console.error("Fetch error:", error)
    rows = [] 
  }


  
    // const rows = [
    //     {
    //       name: "Emily Carter",
    //       phone: "(416) 555–2387",
    //       email: "emily.carter@example.com",
    //       time: "06:30 PM",
    //       connected: "Yes",
    //       level: "No",
    //       meeting: "Yes",
    //       bde: "Sofia Nguyen"
    //     },
    //     {
    //       name: "Emily Carter",
    //       phone: "(416) 555–2387",
    //       email: "emily.carter@example.com",
    //       time: "06:30 PM",
    //       connected: "Yes",
    //       level: "No",
    //       meeting: "Yes",
    //       bde: "NA"
    //     },
    //     {
    //       name: "Emily Carter",
    //       phone: "(416) 555–2387",
    //       email: "emily.carter@example.com",
    //       time: "06:30 PM",
    //       connected: "Yes",
    //       level: "Yes",
    //       meeting: "Yes",
    //       bde: "Sofia Nguyen"
    //     },
    //     {
    //       name: "Emily Carter",
    //       phone: "(416) 555–2387",
    //       email: "emily.carter@example.com",
    //       time: "06:30 PM",
    //       connected: "No",
    //       level: "No",
    //       meeting: "No",
    //       bde: "NA"
    //     },
    //     {
    //       name: "Emily Carter",
    //       phone: "(416) 555–2387",
    //       email: "emily.carter@example.com",
    //       time: "06:30 PM",
    //       connected: "Yes",
    //       level: "-",
    //       meeting: "-",
    //       bde: "-"
    //     },
    // ]
    return (
      <>
        <div className="pt-6 md:pt-2 mb-2">
          {/* <h1 className="text-2xl font-semibold">{`< Dashboard > Compaign Name`} </h1> */}

          <h1 className="text-2xl font-semibold">
  &lt; <Link href="/dashboard" className="text-2xl font-semibold cursor-pointer hover:text-[#63FBEF]  ">Dashboard</Link> &gt; Compaign 
</h1>
        </div>
        {rows.length === 0 ? (
        <p className="text-red-500 mt-4">No data found for this campaign.</p>
      ) : (
        <CallLogTable rows={rows} />
      )}
        </>
    )
}