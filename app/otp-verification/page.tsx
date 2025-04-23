import React, { Suspense } from 'react';
import { OTPVerification } from './OtpVerification';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OTPVerification />
    </Suspense>
  );
}
