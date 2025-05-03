

import ProtectedLayout from "@/utlis/ProtectedRoute";
import { Dashboard } from "./Dashboard";

export default function page (){
  
 
  return (
    <ProtectedLayout>
    <Dashboard />
    </ProtectedLayout>
  )
}