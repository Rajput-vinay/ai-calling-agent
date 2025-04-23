import CallLogTable from "@/component/CallLogTable"


export default function page (){
    const rows = [
        {
          name: "Emily Carter",
          phone: "(416) 555–2387",
          email: "emily.carter@example.com",
          time: "06:30 PM",
          connected: "Yes",
          level: "No",
          meeting: "Yes",
          bde: "Sofia Nguyen"
        },
        {
          name: "Emily Carter",
          phone: "(416) 555–2387",
          email: "emily.carter@example.com",
          time: "06:30 PM",
          connected: "Yes",
          level: "No",
          meeting: "Yes",
          bde: "NA"
        },
        {
          name: "Emily Carter",
          phone: "(416) 555–2387",
          email: "emily.carter@example.com",
          time: "06:30 PM",
          connected: "Yes",
          level: "Yes",
          meeting: "Yes",
          bde: "Sofia Nguyen"
        },
        {
          name: "Emily Carter",
          phone: "(416) 555–2387",
          email: "emily.carter@example.com",
          time: "06:30 PM",
          connected: "No",
          level: "No",
          meeting: "No",
          bde: "NA"
        },
        {
          name: "Emily Carter",
          phone: "(416) 555–2387",
          email: "emily.carter@example.com",
          time: "06:30 PM",
          connected: "Yes",
          level: "-",
          meeting: "-",
          bde: "-"
        },
    ]
    return (
      <>
        <div className="pt-6 md:pt-2 mb-2">
          <h1 className="text-2xl font-semibold">{`< Dashboard > Compaign Name`} </h1>
        </div>
        <CallLogTable rows={rows} />
        </>
    )
}