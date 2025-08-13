"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useApiClient } from "@/hooks/useApiPharmacyClient";
import { toast } from "react-toastify";
import { Loading } from "@/components/index";
import { PharmaciesTypes, PharmacyDetails } from "@/models/types";

interface APIResponse {
  error: string;
  message: string;
  success: boolean;
  data: [];
}
[];
export default function AccountVerification({
  pharmacyDetails,
  lang,
}: {
  lang: string;
  pharmacyDetails: PharmacyDetails | null ;
}) {
  if(!lang || !pharmacyDetails){
    return <Loading />
  }
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [photoId, setPhotoId] = useState<File | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(120); // 2 minutes
  const [isCounting, setIsCounting] = useState<boolean>(true);
  const [isLoading, setLoading] = useState(false);
  const { apiFetch } = useApiClient<APIResponse>();

  async function sendOTP() {
    try {
      const data = await apiFetch("/api/auth/send-verification-otp", {
        method: "POST",
      });
      toast.success(data.message);
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  }

  // Send OTP only on first mount
  useEffect(() => {
    sendOTP();
  }, []);

  // Countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);

  const handleOtpChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next field
      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoId(e.target.files[0]);
    }
  };

  const handleReset = () => {
    setOtp(Array(6).fill(""));
    setPhotoId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.set("otp", otp.join(""));
    if (photoId) {
      formData.set("photoId", photoId);
    }

    try {
      const response = await fetch(
        `/api/auth/verify-account?lang=${lang}&region=${encodeURIComponent(
          pharmacyDetails.region
        )}&city=${encodeURIComponent(pharmacyDetails?.town)}&pharmacyId=${
          pharmacyDetails?.id
        }`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json()

    if(!data.success){
      toast.error(data.message)
      setOtp(['','','','','',''])
      return;
    }
    toast.success(data.message)
    setOtp(['','','','','',''])
    
    return;
    } catch (ex) {
      if (ex instanceof Error) {
        toast.error(ex.message);
      }
      toast.error("Error submitting OTP");
    } finally {
      setLoading(false);
    }
    console.log("OTP:", otp.join(""));
    console.log("Photo ID:", photoId);
  };

  const handleResendOtp = async () => {
    await sendOTP(); // request new OTP
    setOtp(Array(6).fill(""));
    setTimeLeft(120); // reset timer
    setIsCounting(true);
  };

  // Format mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!pharmacyDetails) return <Loading />;
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/50 shadow-lg rounded-2xl p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Account Verification
        </h2>
        <p className="text-gray-500 text-center mb-4">
          Enter the 6-digit OTP sent to your email and upload your photo ID.
        </p>

        {/* Timer */}
        <div className="text-center text-sm text-gray-600 mb-4">
          {timeLeft > 0 ? (
            <>
              OTP expires in{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </>
          ) : (
            <span className="text-red-500">OTP expired</span>
          )}
        </div>

        {/* OTP Input */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-${idx}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              maxLength={1}
              className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 outline-none text-lg"
            />
          ))}
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Upload Photo ID</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {photoId && (
            <p className="text-green-600 mt-2 text-sm">
              Selected: {photoId.name}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={timeLeft <= 0}
              className={`flex-1 py-2 rounded-lg text-white transition ${
                timeLeft > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Verify
            </button>
          </div>

          {/* Resend OTP */}
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timeLeft > 0}
            className={`w-full py-2 rounded-lg font-medium transition ${
              timeLeft <= 0
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Resend OTP
          </button>
        </div>
      </form>
    </div>
  );
}
