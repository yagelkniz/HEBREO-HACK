import BinyanDrillPractice from "@/components/binyanDrill/BinyanDrillPractice";
import { hifilDrillData } from "@/components/hifil/HifilDrillData";

// Thin per-binyan wrapper around the shared drill component, mirroring PielDrillPage.
export default function HifilDrillPage() {
  return <BinyanDrillPractice data={hifilDrillData} onBack={() => { window.location.hash = "#/"; }} />;
}
