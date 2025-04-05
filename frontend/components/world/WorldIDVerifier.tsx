"use client";

import { useEffect, useState } from "react";
import { IDKitWidget, VerificationLevel, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import { verify } from "@/lib/WorldVerify";

type WorldIDVerifierProps = {
  onVerified?: () => void; // 認証成功後に呼び出すコールバック（任意）
};

export const WorldIDVerifier: React.FC<WorldIDVerifierProps> = ({
  onVerified,
}) => {
  const { setOpen } = useIDKit();

  const [appId, setAppId] = useState<`app_${string}` | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const envAppId = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}` | undefined;
    const envAction = process.env.NEXT_PUBLIC_WLD_ACTION;

    if (!envAppId || !envAction) {
      setError("Missing World ID environment variables.");
      return;
    }

    setAppId(envAppId);
    setAction(envAction);
  }, []);

  const onSuccess = (result: ISuccessResult) => {
    alert(
      "Successfully verified with World ID! Your nullifier hash is: " +
        result.nullifier_hash
    );
  };

  const handleProof = async (result: ISuccessResult) => {
    console.log("Proof received from IDKit:", JSON.stringify(result));
    try {
      const data = await verify(result);
      if (data.success) {
        console.log("Backend verified successfully:", JSON.stringify(data));
        onVerified?.();
      } else {
        throw new Error(`Verification failed: ${data.detail}`);
      }
    } catch (err) {
      console.error("Verification error:", err);
      alert("Verification failed. Please try again.");
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!appId || !action) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <IDKitWidget
        action={action}
        app_id={appId}
        onSuccess={onSuccess}
        handleVerify={handleProof}
        verification_level={VerificationLevel.Orb}
      />
      <button
        className="border border-black rounded-md mt-4 px-4 py-2"
        onClick={() => setOpen(true)}
      >
        Verify with World ID
      </button>
    </div>
  );
};

