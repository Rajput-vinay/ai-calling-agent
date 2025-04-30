
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
  
  interface CallLogTableProps {
    rows: Row[];
  }
export default function CallLogTable({ rows }: CallLogTableProps) {
    
      // Add more rows as needed
    
  
    return (
      <div className="p-6 bg-[#1C1C1C] rounded-4xl ">
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full text-sm text-left text-[#8D8D8D] border-separate border-spacing-y-2">
            <thead className="text-xs uppercase text-[#8D8D8D] bg-[#242424] rounded-2xl">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Mobile Number</th>
                <th className="px-6 py-3">Email Id</th>
                <th className="px-6 py-3">Dialed at (time)</th>
                <th className="px-6 py-3">Call Connected</th>
                <th className="px-6 py-3">Potential Level</th>
                <th className="px-6 py-3">Meeting Scheduled</th>
                <th className="px-6 py-3">BDE</th>
              </tr>
            </thead>
            <tbody>
              {rows && rows.map((row, idx) => (
                <tr key={idx} className="rounded-xl border-b-2 border-white">
                  <td className="px-6 py-3">{row.name}</td>
                  <td className="px-6 py-3 ">{row.phone}</td>
                  <td className="px-6 py-3 ">{row.email}</td>
                  <td className="px-6 py-3 ">{row.time}</td>
                  <td className="px-6 py-3 ">{row.call_status}</td>
                  <td className="px-6 py-3">{row.call_sentiment}</td>
                  <td className="px-6 py-3">{row.meeting_id}</td>
                  <td className="px-6 py-3">{row.assigned_bde}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  