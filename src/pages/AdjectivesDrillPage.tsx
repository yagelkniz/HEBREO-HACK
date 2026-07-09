import AdjectivesDrillPractice from "@/components/adjectivesDrill/AdjectivesDrillPractice";

export default function AdjectivesDrillPage() {
  return <AdjectivesDrillPractice onBack={() => { window.location.hash = "#/"; }} />;
}
