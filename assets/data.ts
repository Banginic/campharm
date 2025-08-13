import { pharmacy, about, update, blog } from "./photos";
export const MY_DATA = {
  appName: "Medyro",
  appUrl: "https://medyro.vercel.app",
  socialLinks: {
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
  developer_link: "https://banginic.vercel.app",
};
export const PUBLIC_NAVLINKS = [
  { name: "Pharmacies", href: "/pharmacies", icon: pharmacy },
  { name: "Help", href: "/help", icon: about },
  { name: "Blogs", href: "/blogs", icon: blog },
  { name: "Updates", href: "/updates", icon: update },
];
export const PHARMACY_NAVLINKS = [
  { name: "Drugs", href: "/pharmacy/drugs", icon: pharmacy },
  { name: "Working Days", href: "/pharmacy/working-days", icon: about },
  { name: "On Call", href: "/pharmacy/on-call", icon: blog },
];
export const dosageForms = [
  "Tablet",
  "Syrup",
  "Capsule",
  "Suspension",
  "Powder",
  "Onitment",
  "Cream",
  "Inhaling",
];

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const CAMEROON = [
  {
    region: "Adamawa",
    towns: ["Ngaoundéré", "Tibati", "Meiganga", "Banyo", "Ngoura"],
  },
  {
    region: "Centre",
    towns: ["Yaoundé", "Obala", "Bafia", "Mbalmayo", "Monatélé", "Esse"],
  },
  {
    region: "East",
    towns: ["Bertoua", "Batouri", "Abong-Mbang", "Yokadouma", "Garoua-Boulaï"],
  },
  {
    region: "Far North",
    towns: ["Maroua", "Kousséri", "Mokolo", "Mora", "Kaélé"],
  },
  {
    region: "Littoral",
    towns: ["Douala", "Nkongsamba", "Manjo", "Mbanga", "Dibombari"],
  },
  {
    region: "North",
    towns: ["Garoua", "Guider", "Figuil", "Pitoa", "Tcholliré"],
  },
  {
    region: "North West",
    towns: ["Bamenda", "Kumbo", "Ndop", "Mbengwi", "Nkambe"],
  },
  {
    region: "West",
    towns: ["Bafoussam", "Dschang", "Foumban", "Bangangté", "Bagangté"],
  },
  {
    region: "South",
    towns: ["Ebolowa", "Sangmélima", "Ambam", "Djoum", "Kribi"],
  },
  {
    region: "South West",
    towns: ["Buea", "Limbe", "Tiko", "Kumba", "Mamfe"],
  },
];
