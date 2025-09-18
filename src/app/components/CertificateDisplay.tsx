"use client";
import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CertificateFormData } from "../page";
import { BlobProvider } from "@react-pdf/renderer";
import CertificatePDF from "./CertificatePDF";
import { useEdgeStore } from "../lib/edgestore";

interface CertificateDisplayProps {
  data: CertificateFormData | null;
  onGenerateNew: () => void;
}

export default function CertificateDisplay({
  data,
  onGenerateNew,
}: CertificateDisplayProps) {
  const certificateRef = useRef<HTMLDivElement | null>(null);
  const [details, setDetails] = useState<CertificateFormData>();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(true);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    (async function () {
      try {
        if (data?.picture && typeof data?.picture !== "string") {
          const res = await edgestore.submissionImages.upload({
            file: data?.picture,
          });
          const body = JSON.stringify({ ...data, picture: res.url });
          console.log(body);

          const response = await fetch("/api/submission", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body,
          });
          if (response.ok) {
            const body = await response.json();
            setIsGeneratingPDF(false);
            setDetails(body.data as CertificateFormData);
          }
        } else {
          setIsGeneratingPDF(false);
          setDetails(data as CertificateFormData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [data]);
  if (isGeneratingPDF)
    return (
      <div className="text-black h-full mt-[40%] text-center">
        <p>Loading...</p>
      </div>
    );
  if (!isGeneratingPDF && details)
    return (
      <div className="space-y-8">
        <div
          ref={certificateRef}
          className="certificate bg-white p-8 md:p-12 rounded-xl shadow-lg border-8 border-indigo-600 relative"
        >
          <div className="watermark absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <span className="text-6xl font-bold text-indigo-600 rotate-45">
              CERTIFICATE OF IDENTITY
            </span>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-indigo-800 mb-2">
                CERTIFICATE OF IDENTITY
              </h1>
              <div className="w-32 h-1 bg-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">
                This is to certify that the following information is true and
                correct
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <div className="flex-1">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                    Personal Information
                  </h2>

                  <div className="space-y-3">
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-40">
                        Full Name:
                      </span>
                      <span className="text-gray-900">{details.fullName}</span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-40">
                        Date of Birth:
                      </span>
                      <span className="text-gray-900">
                        {new Date(details.dob).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-40">
                        Mother's Name:
                      </span>
                      <span className="text-gray-900">
                        {details.mothersName}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-40">
                        Father's Name:
                      </span>
                      <span className="text-gray-900">
                        {details.fathersName}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="font-medium text-gray-700 w-40">
                        Blood Group:
                      </span>
                      <span className="text-gray-900">
                        {details.bloodGroup}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">
                    Address
                  </h3>
                  <p className="text-gray-900">{details.address}</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                {details.picture && (
                  <img
                    src={details.picture}
                    alt="User"
                    className="w-48 h-48 object-contain rounded-lg border-4 border-indigo-200 mb-4"
                  />
                )}
                <div className="bg-indigo-100 p-4 rounded-lg">
                  <QRCodeSVG
                    value={`${process.env.NEXT_PUBLIC_APP_URL}/submission/${details._id}`}
                    size={128}
                    level="H"
                    includeMargin
                  />
                  <p className="text-xs text-center mt-2 text-indigo-700">
                    Scan to verify
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8">
              <div className="flex justify-between">
                <div>
                  <div className="h-0.5 bg-gray-300 w-48 mb-1 mt-5"></div>
                  <p className="text-sm text-gray-600">Authorized Signature</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-900 font-medium">
                    {details.issuedDate}
                  </p>
                  <p className="text-sm text-gray-600">Date of Issue</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <BlobProvider document={<CertificatePDF data={details} />}>
            {({ blob, url, loading, error }) => (
              <a
                href={url || "#"}
                download={`${details.fullName.replace(
                  /\s+/g,
                  "_"
                )}_certificate.pdf`}
                className="bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors text-center"
              >
                {isGeneratingPDF ? "Generating PDF..." : "Download as PDF"}
              </a>
            )}
          </BlobProvider>
          <button
            onClick={onGenerateNew}
            className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Generate New
          </button>
        </div>
      </div>
    );
}
