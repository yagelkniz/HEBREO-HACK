import BinyanDrillPractice from "@/components/binyanDrill/BinyanDrillPractice";
import { paalDrillData } from "@/components/paal/PaalDrillData";

// Thin per-binyan wrapper around the shared drill component, mirroring PielDrillPage.
export default function PaalDrillPage() {
  return <BinyanDrillPractice data={paalDrillData} onBack={() => { window.location.hash = "#/"; }} />;
}
