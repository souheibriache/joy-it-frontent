import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGetCheckoutSession } from "@/utils/api/plan-api";

const PaymentDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { session, isLoading, error } = useGetCheckoutSession(sessionId || "");

  if (isLoading) {
    return <div>Loading payment details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h1>
        <p className="text-lg">{error}</p>
        <Button
          className="mt-6 bg-primary text-white px-6 py-2 rounded-md"
          onClick={() => (window.location.href = "/plans")}
        >
          Go Back to Plans
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        Payment Successful!
      </h1>
      <p className="text-lg mb-4">Thank you for your payment.</p>

      <div className="border p-6 rounded shadow-md inline-block text-left">
        <h2 className="text-2xl font-bold mb-4">Payment Details</h2>
        <p>
          <strong>Plan:</strong> {session?.plan || "N/A"}
        </p>
        <p>
          <strong>Amount Paid:</strong> €
          {(session?.amount_total / 100).toFixed(2)}
        </p>

        <p>
          <strong>Customer:</strong> {session?.customer_email || "N/A"}
        </p>
        <p>
          <strong>Subscription Start:</strong>{" "}
          {session?.start_date
            ? new Date(session.start_date * 1000).toLocaleDateString()
            : "N/A"}
        </p>
        <p>
          <strong>Subscription End:</strong>{" "}
          {session?.end_date
            ? new Date(session.end_date * 1000).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      <Button
        className="mt-6 bg-primary text-white px-6 py-2 rounded-md"
        onClick={() => (window.location.href = "/plans")}
      >
        Back to Plans
      </Button>
    </div>
  );
};

export default PaymentDetails;
