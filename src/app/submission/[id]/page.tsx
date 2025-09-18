"use client";
import CertificateDisplay from "@/app/components/CertificateDisplay";
import { CertificateFormData } from "@/app/page";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<CertificateFormData | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/submission/${id}`, {
        method: "Get",
      });
      const data = await res.json();

      setData(data);
    })();
  }, []);

  return (
    <CertificateDisplay data={data} onGenerateNew={() => router.replace("/")} />
  );
}

export default page;
