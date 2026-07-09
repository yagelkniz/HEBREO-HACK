import BinyanDrillPractice from "@/components/binyanDrill/BinyanDrillPractice";
import { pielDrillData } from "@/components/piel/PielDrillData";

// Thin per-binyan wrapper around the shared drill component. To add another
// binyan (hifil, hitpael, nifal...), create a matching *DrillData.ts file next
// to its existing verb data and a page like this one that renders
// <BinyanDrillPractice data={...} />, then add a route + menu entry.
export default function PielDrillPage() {
  return <BinyanDrillPractice data={pielDrillData} onBack={() => { window.location.hash = "#/"; }} />;
}
