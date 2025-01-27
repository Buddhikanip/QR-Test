import "./App.css";
import eventBus from "./shared/eventBus";
import { useEffect } from "react";

interface QRScanResponse {
  qrData: string;
}

function App() {
  const handleScanButtonClick = () => {
    console.log("Requesting QR code scan...");
    eventBus.emit("requestQRScan"); // Request parent to scan QR code
  };

  useEffect(() => {
    const handleQRScanResponse = (data: QRScanResponse) => {
      console.log("Scanned QR Code:", data.qrData);
      // Handle scanned QR code data here
    };

    // Listen for the scanned QR code response
    eventBus.on("responseQRScan", handleQRScanResponse);

    return () => {
      eventBus.off("responseQRScan", handleQRScanResponse);
    };
  }, []);

  return (
    <div>
      <button onClick={handleScanButtonClick}>Scan QR Code</button>
    </div>
  );
}

export default App;
