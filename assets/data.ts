import { pharmacy, about, update, blog } from './photos';
export const MY_DATA = {
    appName: "Campharm", 
    socialLinks: {
        twitter: "https://twitter.com", 
        facebook: "https://facebook.com",
        instagram: "https://instagram.com"},
    developer_link: "https://banginic-1.orender.com",
}
export const PUBLIC_NAVLINKS = [
    { name: "Pharmacies", href: "/pharmacies", icon: pharmacy },
    { name: "Help", href: "/help", icon: about },
    { name: "Blogs", href: "/blogs", icon: blog },
    { name: "Updates", href: "/updates", icon: update },

];
export const PHARMACY_NAVLINKS = [
    { name: "Drugs", href: "/pharmacies", icon: pharmacy },
    { name: "Working Days", href: "/help", icon: about },
    { name: "On Call", href: "/blogs", icon: blog },

];
 export   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export const CAMEROON = [
  {
    region: "Adamawa",
    towns: ["Ngaoundéré", "Tibati", "Meiganga", "Banyo", "Ngoura"]
  },
  {
    region: "Centre",
    towns: ["Yaoundé", "Obala", "Bafia", "Mbalmayo", "Monatélé", "Esse"]
  },
  {
    region: "East",
    towns: ["Bertoua", "Batouri", "Abong-Mbang", "Yokadouma", "Garoua-Boulaï"]
  },
  {
    region: "Far North",
    towns: ["Maroua", "Kousséri", "Mokolo", "Mora", "Kaélé"]
  },
  {
    region: "Littoral",
    towns: ["Douala", "Nkongsamba", "Manjo", "Mbanga", "Dibombari"]
  },
  {
    region: "North",
    towns: ["Garoua", "Guider", "Figuil", "Pitoa", "Tcholliré"]
  },
  {
    region: "North West",
    towns: ["Bamenda", "Kumbo", "Ndop", "Mbengwi", "Nkambe"]
  },
  {
    region: "West",
    towns: ["Bafoussam", "Dschang", "Foumban", "Bangangté", "Bagangté"]
  },
  {
    region: "South",
    towns: ["Ebolowa", "Sangmélima", "Ambam", "Djoum", "Kribi"]
  },
  {
    region: "South West",
    towns: ["Buea", "Limbe", "Tiko", "Kumba", "Mamfe"]
  }
];
export const PHARMACIES = [
  // Yaoundé - Centre
  {
    region: 'Centre',
    pharmacies: [
  { id: "ph001", name: "GreenMed", pharmacist: "Dr. Claude Mbarga", isOpen: true, isOnCall: false, region: "Centre", town: "Yaoundé", phone: "+237 670123456", email: "greenmed@yaounde.com" },
  { id: "ph002", name: "HopePharma", pharmacist: "Dr. Alice Mvondo", isOpen: false, isOnCall: true, region: "Centre", town: "Yaoundé", phone: "+237 694223344", email: "hope@yaounde.com" },
  { id: "ph003", name: "BafiaCare", pharmacist: "Dr. Ernest Abega", isOpen: true, isOnCall: false, region: "Centre", town: "Bafia", phone: "+237 675332211", email: "bafiacare@bafia.com" },
  { id: "ph004", name: "HealthPlus Bafia", pharmacist: "Dr. Elsa Nke", isOpen: false, isOnCall: true, region: "Centre", town: "Bafia", phone: "+237 690443322", email: "plus@bafia.com" },
  { id: "ph005", name: "MbalmayoPharm", pharmacist: "Dr. Pascal Nsame", isOpen: true, isOnCall: false, region: "Centre", town: "Mbalmayo", phone: "+237 699112233", email: "mbalmayo@centre.com" },
  { id: "ph006", name: "PharmaCentre Mbalmayo", pharmacist: "Dr. Clarisse Fomekong", isOpen: true, isOnCall: true, region: "Centre", town: "Mbalmayo", phone: "+237 655443322", email: "centrale@mbalmayo.com" },
  { id: "ph007", name: "ObalaMed", pharmacist: "Dr. Jean Owono", isOpen: false, isOnCall: true, region: "Centre", town: "Obala", phone: "+237 674556677", email: "obalamed@centre.com" },
  { id: "ph008", name: "Wellness Obala", pharmacist: "Dr. Rita Ewane", isOpen: true, isOnCall: false, region: "Centre", town: "Obala", phone: "+237 677889900", email: "wellness@obala.com" }
]
  },
  //Littoral
  {
    region: 'Littoral',
    pharmacies: [
  { id: "ph009", name: "CityCare", pharmacist: "Dr. Grace Njoh", isOpen: true, isOnCall: false, region: "Littoral", town: "Douala", phone: "+237 678112233", email: "citycare@douala.com" },
  { id: "ph010", name: "DoualaMed", pharmacist: "Dr. Collins Fon", isOpen: true, isOnCall: true, region: "Littoral", town: "Douala", phone: "+237 694443355", email: "doualamed@dl.com" },
  
  { id: "ph011", name: "ManjoPharm", pharmacist: "Dr. Sylvie Nkongho", isOpen: false, isOnCall: false, region: "Littoral", town: "Manjo", phone: "+237 699224466", email: "manjo@pharma.com" },
  { id: "ph012", name: "HealthyManjo", pharmacist: "Dr. Francine Etape", isOpen: true, isOnCall: true, region: "Littoral", town: "Manjo", phone: "+237 693998877", email: "healthy@manjo.com" },

  { id: "ph013", name: "MbangaMed", pharmacist: "Dr. Leo Ndifon", isOpen: false, isOnCall: true, region: "Littoral", town: "Mbanga", phone: "+237 670987654", email: "mbangamed@mbanga.com" },
  { id: "ph014", name: "TrustCare Mbanga", pharmacist: "Dr. Adeline Fomum", isOpen: true, isOnCall: false, region: "Littoral", town: "Mbanga", phone: "+237 690665544", email: "trust@mbanga.com" },

  { id: "ph015", name: "Dibombari Health", pharmacist: "Dr. Boris Koum", isOpen: true, isOnCall: false, region: "Littoral", town: "Dibombari", phone: "+237 678334455", email: "dibombari@pharmcam.com" },
  { id: "ph016", name: "MediPlus Dibombari", pharmacist: "Dr. Mary Niba", isOpen: false, isOnCall: true, region: "Littoral", town: "Dibombari", phone: "+237 688443322", email: "mediplus@dibombari.com" }
]
  },

  // Northwet
  {
    region: 'North West',
    pharmacies: [
  { id: "ph017", name: "BamendaMed", pharmacist: "Dr. Emmanuel Fokum", isOpen: true, isOnCall: false, region: "North West", town: "Bamenda", phone: "+237 671223344", email: "bamenda@pharmcam.com" },
  { id: "ph018", name: "HealthFirst Bamenda", pharmacist: "Dr. Mercy Mbuh", isOpen: false, isOnCall: true, region: "North West", town: "Bamenda", phone: "+237 698554433", email: "first@bamenda.com" },

  { id: "ph019", name: "NdopPharma", pharmacist: "Dr. Godwin Nfor", isOpen: true, isOnCall: true, region: "North West", town: "Ndop", phone: "+237 675112233", email: "ndop@pharma.com" },
  { id: "ph020", name: "Royal Care Ndop", pharmacist: "Dr. Juliet Wanki", isOpen: false, isOnCall: false, region: "North West", town: "Ndop", phone: "+237 694445566", email: "royal@ndop.com" },

  { id: "ph021", name: "KumboCare", pharmacist: "Dr. Henry Lukong", isOpen: true, isOnCall: false, region: "North West", town: "Kumbo", phone: "+237 693998877", email: "care@kumbo.com" },
  { id: "ph022", name: "MediLife Kumbo", pharmacist: "Dr. Sophie Shey", isOpen: true, isOnCall: true, region: "North West", town: "Kumbo", phone: "+237 688332211", email: "medilife@kumbo.com" },

  { id: "ph023", name: "Wum Health", pharmacist: "Dr. Nelson Ngum", isOpen: false, isOnCall: true, region: "North West", town: "Wum", phone: "+237 677889911", email: "wumhealth@pharmcam.com" },
  { id: "ph024", name: "CarePlus Wum", pharmacist: "Dr. Pauline Ndze", isOpen: true, isOnCall: false, region: "North West", town: "Wum", phone: "+237 678221144", email: "careplus@wum.com" }
]
  },

  // South west
  {
    region: 'South West',
    pharmacies: [
  { id: "ph025", name: "BueaPharm", pharmacist: "Dr. Brenda Ekema", isOpen: true, isOnCall: false, region: "South West", town: "Buea", phone: "+237 675443322", email: "buea@pharmcam.com" },
  { id: "ph026", name: "CareZone Buea", pharmacist: "Dr. Chris Mola", isOpen: false, isOnCall: true, region: "South West", town: "Buea", phone: "+237 699110022", email: "carezone@buea.com" },

  { id: "ph027", name: "LimbeWellness", pharmacist: "Dr. Cynthia Itoe", isOpen: true, isOnCall: true, region: "South West", town: "Limbe", phone: "+237 690334455", email: "wellness@limbe.com" },
  { id: "ph028", name: "OceanMed Limbe", pharmacist: "Dr. Brian Monekosso", isOpen: true, isOnCall: false, region: "South West", town: "Limbe", phone: "+237 679876543", email: "ocean@limbe.com" },

  { id: "ph029", name: "KumbaMed", pharmacist: "Dr. Daisy Mbua", isOpen: false, isOnCall: true, region: "South West", town: "Kumba", phone: "+237 688776655", email: "kumba@pharmcam.com" },
  { id: "ph030", name: "Unity Pharma Kumba", pharmacist: "Dr. Daniel Epie", isOpen: true, isOnCall: false, region: "South West", town: "Kumba", phone: "+237 670112299", email: "unity@kumba.com" },

  { id: "ph031", name: "Tiko Health", pharmacist: "Dr. Lynda Ngong", isOpen: true, isOnCall: false, region: "South West", town: "Tiko", phone: "+237 694998877", email: "health@tiko.com" },
  { id: "ph032", name: "TikoPlus Pharmacy", pharmacist: "Dr. Elvis Fon", isOpen: false, isOnCall: true, region: "South West", town: "Tiko", phone: "+237 678889900", email: "tikoplus@pharmcam.com" }
]
  },
  // west
  {
    region: 'West',
    pharmacies: [
  { id: "ph033", name: "BafoussamCare", pharmacist: "Dr. Rosine Kamga", isOpen: true, isOnCall: false, region: "West", town: "Bafoussam", phone: "+237 679223344", email: "care@bafoussam.com" },
  { id: "ph034", name: "MediLine Bafoussam", pharmacist: "Dr. Serge Tchouamo", isOpen: false, isOnCall: true, region: "West", town: "Bafoussam", phone: "+237 694223311", email: "mediline@bafoussam.com" },

  { id: "ph035", name: "Dschang Pharma", pharmacist: "Dr. Emmanuella Djeuko", isOpen: true, isOnCall: true, region: "West", town: "Dschang", phone: "+237 675667788", email: "pharma@dschang.com" },
  { id: "ph036", name: "CareHub Dschang", pharmacist: "Dr. Marc Fotso", isOpen: true, isOnCall: false, region: "West", town: "Dschang", phone: "+237 688334411", email: "carehub@dschang.com" },

  { id: "ph037", name: "FoumbotMed", pharmacist: "Dr. Gladys Njike", isOpen: false, isOnCall: true, region: "West", town: "Foumbot", phone: "+237 693772211", email: "foumbot@pharmcam.com" },
  { id: "ph038", name: "Nova Pharma Foumbot", pharmacist: "Dr. Alain Njifon", isOpen: true, isOnCall: false, region: "West", town: "Foumbot", phone: "+237 690445566", email: "nova@foumbot.com" },

  { id: "ph039", name: "Mbouda Health", pharmacist: "Dr. Prisca Nguefack", isOpen: true, isOnCall: false, region: "West", town: "Mbouda", phone: "+237 678889944", email: "health@mbouda.com" },
  { id: "ph040", name: "VitalMed Mbouda", pharmacist: "Dr. Michel Kamdem", isOpen: false, isOnCall: true, region: "West", town: "Mbouda", phone: "+237 671122344", email: "vital@mbouda.com" }
]
  },
  // East
  {
    region: 'East',
    pharmacies: [
  { id: "ph049", name: "BertouaMed", pharmacist: "Dr. Hervé Koffi", isOpen: true, isOnCall: false, region: "East", town: "Bertoua", phone: "+237 677889900", email: "bertoua@pharmcam.com" },
  { id: "ph050", name: "CarePlus Bertoua", pharmacist: "Dr. Anne-Marie Mbarga", isOpen: false, isOnCall: true, region: "East", town: "Bertoua", phone: "+237 670334455", email: "careplus@bertoua.com" },

  { id: "ph051", name: "BatouriPharma", pharmacist: "Dr. Josephine Nlend", isOpen: true, isOnCall: false, region: "East", town: "Batouri", phone: "+237 694112233", email: "batouri@pharma.com" },
  { id: "ph052", name: "HealthCare Batouri", pharmacist: "Dr. Michel Fokam", isOpen: true, isOnCall: true, region: "East", town: "Batouri", phone: "+237 693223344", email: "healthcare@batouri.com" },

  { id: "ph053", name: "Garoua-BoulaïMed", pharmacist: "Dr. Hilda Nkomo", isOpen: false, isOnCall: true, region: "East", town: "Garoua-Boulaï", phone: "+237 675998877", email: "garouaboulai@pharmcam.com" },
  { id: "ph054", name: "MediTrust Garoua-Boulaï", pharmacist: "Dr. Jacques Ngono", isOpen: true, isOnCall: false, region: "East", town: "Garoua-Boulaï", phone: "+237 690554433", email: "meditrust@garoua.com" },

  { id: "ph055", name: "MessamenaCare", pharmacist: "Dr. Florence Abong", isOpen: true, isOnCall: false, region: "East", town: "Messamena", phone: "+237 678998877", email: "messamena@care.com" },
  { id: "ph056", name: "PharmaPlus Messamena", pharmacist: "Dr. Victor Mbarga", isOpen: false, isOnCall: true, region: "East", town: "Messamena", phone: "+237 677665544", email: "plus@messamena.com" }
]
  },
  // Adamawa
  {
    region: 'Adamawa',
    pharmacies: [
  { id: "ph057", name: "Ngaoundéré Health", pharmacist: "Dr. Jules Mbassi", isOpen: true, isOnCall: false, region: "Adamawa", town: "Ngaoundéré", phone: "+237 677112233", email: "ngaoundere@pharmcam.com" },
  { id: "ph058", name: "CarePlus Ngaoundéré", pharmacist: "Dr. Suzanne Luma", isOpen: false, isOnCall: true, region: "Adamawa", town: "Ngaoundéré", phone: "+237 690223344", email: "careplus@ngaoundere.com" },

  { id: "ph059", name: "Mayo-BanyoMed", pharmacist: "Dr. Emmanuel Ngassa", isOpen: true, isOnCall: true, region: "Adamawa", town: "Mayo-Banyo", phone: "+237 693334455", email: "mayobanyo@pharma.com" },
  { id: "ph060", name: "HealthCare Mayo-Banyo", pharmacist: "Dr. Alice Tchuente", isOpen: false, isOnCall: false, region: "Adamawa", town: "Mayo-Banyo", phone: "+237 678445566", email: "healthcare@mayobanyo.com" },

  { id: "ph061", name: "TignèrePharma", pharmacist: "Dr. Jean-Paul Fokam", isOpen: true, isOnCall: false, region: "Adamawa", town: "Tignère", phone: "+237 670556677", email: "tignere@pharmcam.com" },
  { id: "ph062", name: "CareWell Tignère", pharmacist: "Dr. Marie Mbarga", isOpen: true, isOnCall: true, region: "Adamawa", town: "Tignère", phone: "+237 690667788", email: "carewell@tignere.com" },

  { id: "ph063", name: "MeigangaMed", pharmacist: "Dr. Rodrigue Tambo", isOpen: false, isOnCall: true, region: "Adamawa", town: "Meiganga", phone: "+237 694778899", email: "meiganga@pharma.com" },
  { id: "ph064", name: "VitalCare Meiganga", pharmacist: "Dr. Sophie Nlend", isOpen: true, isOnCall: false, region: "Adamawa", town: "Meiganga", phone: "+237 678889900", email: "vitalcare@meiganga.com" }
]
  },
  // South
  {
    region: 'South',
    pharmacies: [
  { id: "ph041", name: "EbolowaMed", pharmacist: "Dr. Guy Ondoa", isOpen: true, isOnCall: false, region: "South", town: "Ebolowa", phone: "+237 670223344", email: "ebolowa@pharmcam.com" },
  { id: "ph042", name: "CarePoint Ebolowa", pharmacist: "Dr. Linda Ekogo", isOpen: false, isOnCall: true, region: "South", town: "Ebolowa", phone: "+237 694334455", email: "carepoint@ebolowa.com" },

  { id: "ph043", name: "Meyomessala Health", pharmacist: "Dr. Armand Essomba", isOpen: true, isOnCall: false, region: "South", town: "Meyomessala", phone: "+237 678112299", email: "health@meyomessala.com" },
  { id: "ph044", name: "PharmaPlus Meyomessala", pharmacist: "Dr. Clarisse Ngomo", isOpen: false, isOnCall: true, region: "South", town: "Meyomessala", phone: "+237 690554433", email: "plus@meyomessala.com" },

  { id: "ph045", name: "AmbamPharm", pharmacist: "Dr. Blaise Ndo", isOpen: true, isOnCall: true, region: "South", town: "Ambam", phone: "+237 675667799", email: "ambam@pharmcam.com" },
  { id: "ph046", name: "AmbamCare", pharmacist: "Dr. Elodie Nguene", isOpen: false, isOnCall: false, region: "South", town: "Ambam", phone: "+237 693221188", email: "care@ambam.com" },

  { id: "ph047", name: "KribiPharma", pharmacist: "Dr. Samuel Edimo", isOpen: true, isOnCall: false, region: "South", town: "Kribi", phone: "+237 699112244", email: "kribi@pharmcam.com" },
  { id: "ph048", name: "KribiWellness", pharmacist: "Dr. Noella Mefire", isOpen: true, isOnCall: true, region: "South", town: "Kribi", phone: "+237 688993377", email: "wellness@kribi.com" }
]
  },
  // Far North
  {
    region: 'Far North',
    pharmacies: [
  { id: "ph065", name: "MarouaMed", pharmacist: "Dr. Amina Barkat", isOpen: true, isOnCall: false, region: "Far North", town: "Maroua", phone: "+237 677998877", email: "maroua@pharmcam.com" },
  { id: "ph066", name: "CarePlus Maroua", pharmacist: "Dr. Issa Mahamat", isOpen: false, isOnCall: true, region: "Far North", town: "Maroua", phone: "+237 690887766", email: "careplus@maroua.com" },

  { id: "ph067", name: "KousseriPharma", pharmacist: "Dr. Fatima Nguele", isOpen: true, isOnCall: true, region: "Far North", town: "Kousseri", phone: "+237 694776655", email: "kousseri@pharma.com" },
  { id: "ph068", name: "HealthCare Kousseri", pharmacist: "Dr. Adamou Bello", isOpen: false, isOnCall: false, region: "Far North", town: "Kousseri", phone: "+237 678665544", email: "healthcare@kousseri.com" },

  { id: "ph069", name: "MokoloMed", pharmacist: "Dr. Salifou Djibrilla", isOpen: true, isOnCall: false, region: "Far North", town: "Mokolo", phone: "+237 670554433", email: "mokolo@pharmcam.com" },
  { id: "ph070", name: "CareWell Mokolo", pharmacist: "Dr. Halima Yaya", isOpen: true, isOnCall: true, region: "Far North", town: "Mokolo", phone: "+237 690443322", email: "carewell@mokolo.com" },

  { id: "ph071", name: "YagouaPharma", pharmacist: "Dr. Moussa Abdou", isOpen: false, isOnCall: true, region: "Far North", town: "Yagoua", phone: "+237 694332211", email: "yagoua@pharma.com" },
  { id: "ph072", name: "VitalCare Yagoua", pharmacist: "Dr. Aissatou Hassan", isOpen: true, isOnCall: false, region: "Far North", town: "Yagoua", phone: "+237 678221100", email: "vitalcare@yagoua.com" }
]
  },
  // North
  {
    region: 'North',
    pharmacies: [
  { id: "ph073", name: "GarouaMed", pharmacist: "Dr. Ibrahim Moussa", isOpen: true, isOnCall: false, region: "North", town: "Garoua", phone: "+237 677334455", email: "garoua@pharmcam.com" },
  { id: "ph074", name: "CarePlus Garoua", pharmacist: "Dr. Amina Ngando", isOpen: false, isOnCall: true, region: "North", town: "Garoua", phone: "+237 690445566", email: "careplus@garoua.com" },

  { id: "ph075", name: "PitoaPharma", pharmacist: "Dr. Emmanuel Tchamba", isOpen: true, isOnCall: true, region: "North", town: "Pitoa", phone: "+237 694556677", email: "pitoa@pharma.com" },
  { id: "ph076", name: "HealthCare Pitoa", pharmacist: "Dr. Salome Fomundam", isOpen: false, isOnCall: false, region: "North", town: "Pitoa", phone: "+237 678667788", email: "healthcare@pitoa.com" },

  { id: "ph077", name: "LagdoMed", pharmacist: "Dr. Jean Ngassa", isOpen: true, isOnCall: false, region: "North", town: "Lagdo", phone: "+237 670778899", email: "lagdo@pharmcam.com" },
  { id: "ph078", name: "VitalCare Lagdo", pharmacist: "Dr. Chantal Njoh", isOpen: true, isOnCall: true, region: "North", town: "Lagdo", phone: "+237 690889900", email: "vitalcare@lagdo.com" },

  { id: "ph079", name: "GuiderPharma", pharmacist: "Dr. Lucien Toukam", isOpen: false, isOnCall: true, region: "North", town: "Guider", phone: "+237 694990011", email: "guider@pharma.com" },
  { id: "ph080", name: "CareWell Guider", pharmacist: "Dr. Hermine Ndongo", isOpen: true, isOnCall: false, region: "North", town: "Guider", phone: "+237 678112233", email: "carewell@guider.com" }
]
  },
 
];