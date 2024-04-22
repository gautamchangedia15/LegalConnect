import React, { useEffect, useState } from "react";
import RazorpayButton from "./RazorpayButton";
const LspPayment = () => {
  return (
    <div className="h-10 w-10">
      <RazorpayButton title="Pay Button" />
    </div>
  );
};

export default LspPayment;
