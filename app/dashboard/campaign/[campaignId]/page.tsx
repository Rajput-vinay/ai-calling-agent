import CallLogTable from "@/component/CallLogTable"

interface Row {
  name: string
  phone:string
  email:string
  time:string
  call_status: "Not Called" | "Called" | "Answered"
  call_sentiment:string
  meeting_id:string
  assigned_bde:string
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
    return data.leads
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
          <h1 className="text-2xl font-semibold">{`< Dashboard > Compaign Name`} </h1>
        </div>
        {rows.length === 0 ? (
        <p className="text-red-500 mt-4">No data found for this campaign.</p>
      ) : (
        <CallLogTable rows={rows} />
      )}
        </>
    )
}