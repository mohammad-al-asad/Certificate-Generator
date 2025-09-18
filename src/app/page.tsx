"use client";
import { JSX, useState } from "react";
import CertificateDisplay from "./components/CertificateDisplay";
import CertificateForm from "./components/CertificateForm";

export type CertificateFormData = {
  fullName: string;
  dob: string;
  mothersName: string;
  fathersName: string;
  address: string;
  bloodGroup: string;
  idNumber?: string;
  issuedDate: string;
  _id?: string;
  picture: File | null | string;
};

export default function Home(): JSX.Element {
  const [certificateData, setCertificateData] =
    useState<CertificateFormData | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);

  const handleCertificateGeneration = (data: CertificateFormData): void => {
    setCertificateData(data);
    setShowForm(false);
  };

  const handleNewCertificate = (): void => {
    setCertificateData(null);
    setShowForm(true);
  };

  return showForm ? (
    <CertificateForm onSubmit={handleCertificateGeneration} />
  ) : (
    <CertificateDisplay
      data={certificateData}
      onGenerateNew={handleNewCertificate}
    />
  );
}
