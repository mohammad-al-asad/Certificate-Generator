// components/CertificatePDF.js
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import QRCode from "qrcode";
import React from "react";
import { CertificateFormData } from "../page";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f9fafb",
    padding: 20,
  },
  card: {
    border: "2pt solid #4f46e5",
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  watermark: {
    position: "absolute",
    top: "40%",
    left: "10%",
    fontSize: 40,
    color: "#ccccff",
    opacity: 0.3,
    transform: "rotate(-30deg)",
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    color: "#4f46e5",
    marginBottom: 5,
    textDecoration: "underline",
    fontWeight: "bold",
  },
  subHeader: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 10,
    color: "gray",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    fontWeight: "bold",
    width: 110,
  },
  value: {
    flex: 1,
  },
  photo: {
    padding: 2,
    width: 100,
    height: 120,
    marginBottom: 10,
    border: "2px solid #c7d2fe",
  },
  qr: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
  footer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 10,
  },
  signature: {
    textAlign: "left",
  },
  date: {
    textAlign: "right",
  },
});

const CertificatePDF = ({ data }: { data: CertificateFormData }) => {
  const [imageData, setImageData] = React.useState<string | null>(null);
  const [qrData, setQrData] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (data.picture && typeof data.picture === "string") {
      setImageData(data.picture);
    }

    // Generate QR as data URL
    QRCode.toDataURL(`${process.env.NEXT_PUBLIC_APP_URL}/submission/${data._id}`).then(setQrData);
  }, [data]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.card}>
          <Text style={styles.watermark}>CERTIFICATE OF IDENTITY</Text>

          <Text style={styles.header}>CERTIFICATE OF IDENTITY</Text>
          <Text style={styles.subHeader}>
            This is to certify that the following information is true and
            correct
          </Text>

          <View style={styles.section}>
            {/* Left side info */}
            <View style={styles.info}>
              <View style={styles.row}>
                <Text style={styles.label}>Full Name:</Text>
                <Text style={styles.value}>{data.fullName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Date of Birth:</Text>
                <Text style={styles.value}>
                  {new Date(data.dob).toLocaleDateString()}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Mother's Name:</Text>
                <Text style={styles.value}>{data.mothersName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Father's Name:</Text>
                <Text style={styles.value}>{data.fathersName}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Blood Group:</Text>
                <Text style={styles.value}>{data.bloodGroup}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{data.address}</Text>
              </View>
            </View>

            {/* Right side: photo + QR */}
            <View style={{ alignItems: "center" }}>
              {imageData && <Image src={imageData} style={styles.photo} />}
              {qrData && <Image src={qrData} style={styles.qr} />}
              <Text style={{ fontSize: 8, marginTop: 4 }}>Scan to verify</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.signature}>Authorized Signature</Text>
            <Text style={styles.date}>
              {new Date().toLocaleDateString()} {"\n"} Date of Issue
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatePDF;
