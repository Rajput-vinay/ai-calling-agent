
import { Suspense } from "react";
import { Email } from "./Email";

export default function page() {
    return(
        <Suspense fallback={<div>Loading...</div>}>
        <Email />
        </Suspense>
    )
}