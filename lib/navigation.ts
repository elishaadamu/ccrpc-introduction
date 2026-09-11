export interface NavSubItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  id?: string;
  children?: NavSubItem[];
}

export const navItems: NavItem[] = [
  {
    label: "Introduction",
    href: "/introduction",
  },
  {
    label: "Demographic Analysis",
    id: "extended-nav-section-1",
    children: [
      {
        label: "Data Sources and Methodology",
        href: "/mpa-demographic-profile/data-sources-and-methodology",
      },
      {
        label: "Regional Demographics in Comparison to State and Federal Statistics",
        href: "/mpa-demographic-profile/mpa-demographic-and-transportation-profile",
      },
      {
        label: "Title VI Populations Analysis",
        href: "/mpa-demographic-profile/title-vi-demographics",
      },
    ],
  },
  {
    label: "Link to Public Participation Plan",
    href: "/public-participation-plan",
  },
  {
    label: "Limited English Proficiency (LEP) Assessment",
    href: "/lep-assessment",
  },
  {
    label: "Title VI Assurances and Forms",
    id: "extended-nav-section-4",
    children: [
      {
        label: "Forms",
        href: "/title-vi-assurances-and-forms/forms",
      },
      {
        label: "Assurances",
        href: "/title-vi-assurances-and-forms/assurances",
      },
    ],
  },
  {
    label: "Appendices",
    id: "extended-nav-section-5",
    children: [
      {
        label: "Appendix I",
        href: "/appendices/appendix-i",
      },
      {
        label: "Appendix II",
        href: "/appendices/appendix-ii",
      },
      {
        label: "Appendix III",
        href: "/appendices/appendix-iii",
      },
      {
        label: "Appendix IV",
        href: "/appendices/appendix-iv",
      },
      {
        label: "Appendix V",
        href: "/appendices/appendix-v",
      },
    ],
  },
];
