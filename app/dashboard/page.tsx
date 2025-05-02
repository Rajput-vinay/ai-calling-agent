

import ProtectedLayout from "@/component/ProtectedRoute";
import { Dashboard } from "./Dashboard";

export default function page (){
  
 
  return (
    <ProtectedLayout>
    <Dashboard />
    </ProtectedLayout>
  )
}