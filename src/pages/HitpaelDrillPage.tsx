import BinyanDrillPractice from "@/components/binyanDrill/BinyanDrillPractice";
import { hitpaelDrillData } from "@/components/hitpael/HitpaelDrillData";

// Thin per-binyan wrapper around the shared drill component, mirroring PielDrillPage.
export default function HitpaelDrillPage() {
  return <BinyanDrillPractice data={hitpaelDrillData} onBack={() => { window.location.hash = "#/"; }} />;
}
