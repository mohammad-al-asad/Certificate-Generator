"use client";
import CertificateDisplay from "@/app/components/CertificateDisplay";
import { CertificateFormData } from "@/app/page";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<CertificateFormData | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async function () {
      const res = await fetch(`/api/submission/${(await params).id}`, {
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

export default Page;
