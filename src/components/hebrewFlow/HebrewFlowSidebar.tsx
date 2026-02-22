import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Languages,
  Puzzle,
  FileText,
  Brain,
  GraduationCap,
  Home,
  Sparkles,
  TreeDeciduous,
  Building2,
  MessageSquare,
  Dices,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  titleHe: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  label: string;
  labelHe: string;
  items: NavItem[];
}

const navigationGroups: NavGroup[] = [
  {
    label: "Overview",
    labelHe: "סקירה כללית",
    items: [
      { title: "Dashboard", titleHe: "לוח בקרה", url: "/hebrew-flow", icon: Home },
    ],
  },
  {
    label: "Foundations",
    labelHe: "יסודות",
    items: [
      { title: "The Shoresh", titleHe: "השורש", url: "/hebrew-flow/roots", icon: TreeDeciduous },
      { title: "Hebrew Letters", titleHe: "אותיות עבריות", url: "/hebrew-flow/letters", icon: Languages },
    ],
  },
  {
    label: "The Verb System",
    labelHe: "מערכת הפועל",
    items: [
      { title: "7 Binyanim", titleHe: "שבעת הבניינים", url: "/hebrew-flow/binyanim", icon: Building2 },
      { title: "Verb Visualizer", titleHe: "ממחיש הפועל", url: "/hebrew-flow/visualizer", icon: Sparkles },
      { title: "Conjugation Tables", titleHe: "טבלאות הטיות", url: "/hebrew-flow/conjugations", icon: FileText },
    ],
  },
  {
    label: "Nouns & Gender",
    labelHe: "שמות ומין",
    items: [
      { title: "Gender Rules", titleHe: "כללי מין", url: "/hebrew-flow/gender", icon: BookOpen },
      { title: "Noun Patterns", titleHe: "משקלי שמות", url: "/hebrew-flow/noun-patterns", icon: Puzzle },
    ],
  },
  {
    label: "Syntax",
    labelHe: "תחביר",
    items: [
      { title: "Smichut", titleHe: "סמיכות", url: "/hebrew-flow/smichut", icon: MessageSquare },
      { title: "Prepositions", titleHe: "מילות יחס", url: "/hebrew-flow/prepositions", icon: FileText },
      { title: "Definite Article", titleHe: "ה הידיעה", url: "/hebrew-flow/definite-article", icon: BookOpen },
    ],
  },
  {
    label: "Practice Arena",
    labelHe: "אזור תרגול",
    items: [
      { title: "Find the Root", titleHe: "מצא את השורש", url: "/hebrew-flow/practice/roots", icon: Brain },
      { title: "Conjugation Quiz", titleHe: "חידון הטיות", url: "/hebrew-flow/practice/conjugation", icon: GraduationCap },
      { title: "Sentence Builder", titleHe: "בונה משפטים", url: "/hebrew-flow/practice/sentences", icon: Puzzle },
    ],
  },
  {
    label: "Speaking",
    labelHe: "דיבור",
    items: [
      { title: "Conversation Roulette", titleHe: "רולטת שיחה", url: "/hebrew-flow/conversation-roulette", icon: Dices },
    ],
  },
];

interface HebrewFlowSidebarProps {
  lang: "he" | "en";
}

export default function HebrewFlowSidebar({ lang }: HebrewFlowSidebarProps) {
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;
  const t = (en: string, he: string) => (lang === "he" ? he : en);

  return (
    <Sidebar
      className={cn(
        "border-l-0 border-r transition-all duration-300",
        collapsed ? "w-14" : "w-64"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="border-b p-4">
        <div className={cn("flex items-center gap-2", lang === "he" ? "flex-row-reverse" : "")}>
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Languages className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className={cn("flex flex-col", lang === "he" ? "items-end" : "")}>
              <span className="font-bold text-lg">Hebrew Flow</span>
              <span className="text-xs text-muted-foreground" dir={lang === "he" ? "rtl" : "ltr"}>
                {t("Master Hebrew Grammar", "שליטה בדקדוק עברי")}
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {navigationGroups.map((group) => (
          <SidebarGroup key={group.label}>
            {!collapsed && (
              <SidebarGroupLabel 
                className={cn("text-xs uppercase tracking-wider", lang === "he" ? "text-right" : "")}
                dir={lang === "he" ? "rtl" : "ltr"}
              >
                {t(group.label, group.labelHe)}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={collapsed ? t(item.title, item.titleHe) : undefined}
                    >
                      <NavLink
                        to={item.url}
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                          lang === "he" ? "flex-row-reverse" : "",
                          isActive(item.url)
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && (
                          <span dir={lang === "he" ? "rtl" : "ltr"}>
                            {t(item.title, item.titleHe)}
                          </span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
