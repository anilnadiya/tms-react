import { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import ReportIcon from "@mui/icons-material/BarChart";
import HomeIcon from '@mui/icons-material/Home';
import AppsIcon from '@mui/icons-material/Apps';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EmailIcon from '@mui/icons-material/Email';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import NearMeIcon from '@mui/icons-material/NearMe';
const MenuItems = () => {
  const [menus, setMenus] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const menuItems = [
      {
        label: "Dashboard",
        path: "/",
        icon: <HomeIcon />,
        collapsible: false,
        addToFavorites: true,
      },
      {
        label: "Resources",
        icon: <AppsIcon />,
        collapsible: true,
        subMenu: [
          { label: "Internal Resource", path: "/resources/internal", addToFavorites: true, },
          { label: "External Resource", path: "/resources/external", addToFavorites: true, },
        ],
      },
      {
        label: "Client",
        icon: <PersonIcon />,
        collapsible: true,
        subMenu: [
          { label: "Client", path: "/client" },
          { label: "Account", path: "/client/account" },
        ],
      },     
      {
        label: "Reports",
        icon: <InsertDriveFileIcon />,
        collapsible: true,
        subMenu: [
          { label: "Reports", path: "/reports" },
          { label: "Finance Report", path: "/reports/finance" },
        ],
      },     
      {
        label: "Invoice",
        icon: <ReceiptIcon />,
        collapsible: true,
        subMenu: [
          { label: "Client Invoice", path: "/client/invoice", },
          { label: "Linguist Invoice", path: "/linguist/invoice" },
        ],
      },     
      {
        label: "Statement",
        icon: <NearMeIcon />,
        collapsible: true,
        subMenu: [
          { label: "Client Statement", path: "/client/statement" },
          { label: "Linguist Statement", path: "/linguist/statement" },
        ],
      },
      {
        label: "Email",
        path: "/email",
        icon: <EmailIcon />,
        collapsible: false,
      },
      {
        label: "Knowledge Base",
        path: "/knowledge",
        icon: <DynamicFeedIcon />,
        collapsible: false,
        addToFavorites: true,
      },
      {
        label: "Admin",
        icon: <ReportIcon />,
        collapsible: true,
        subMenu: [
          { label: "Resources", path: "/admin/resources", collapsible: false,addToFavorites: true, },
          {
            label: "Client",
            collapsible: true,
            subMenu: [
              { label: "Client Status", path: "/admin/client/status",addToFavorites: true, },
            ],
          },
          {
            label: "System",
            collapsible: true,
            subMenu: [
              { label: "Currency", path: "/admin/system/currency",addToFavorites: true, },
              { label: "Properties", path: "/admin/system/properties",addToFavorites: true, },
              { label: "Languages", path: "/admin/system/languages",addToFavorites: true, },
              { label: "Languages(Translate)", path: "/admin/system/languages-translate",addToFavorites: true,},
              { label: "Specialization", path: "/admin/system/specialization",addToFavorites: true, },
              { label: "Business Units", path: "/admin/system/business",addToFavorites: true, },
              { label: "Templates", path: "/admin/system/templates",addToFavorites: true, },
              { label: "Date Format", path: "/admin/system/date-format",addToFavorites: true, },
              { label: "Decimal Separator", path: "/admin/system/decimal",addToFavorites: true, },
            ],
          },
          {
            label: "Projects",
            collapsible: true,
            subMenu: [
              { label: "Project Types", path: "/admin/projects/project-types",addToFavorites: true, },
              { label: "Scoop Status", path: "/admin/projects/scoop-status",addToFavorites: true, },
              { label: "Job Status", path: "/admin/projects/job-status",addToFavorites: true, },
              { label: "Jobs", path: "/admin/projects/jobs",addToFavorites: true,},
              { label: "Job Chain", path: "/admin/projects/job-chain",addToFavorites: true,},
              { label: "Price Units", path: "/admin/projects/price-units",addToFavorites: true,},
              { label: "Banking Info", path: "/admin/projects/banking",addToFavorites: true,},
             
            ],
          },
          {
            label: "Invoice",
            collapsible: true,
            subMenu: [
              { label: "Invoice Due", path: "/admin/invoice/due", addToFavorites: true, },
              { label: "Invoice Settings", path: "/admin/invoice/settings", addToFavorites: true, },
            ],
          },
          { label: "Taxation", path: "/admin/taxation", collapsible: false,addToFavorites: true, },

        ],
      },
    ];

    setMenus(menuItems);
  }, []);

  const addFavorite = (item) => {
    if (!favorites.some((fav) => fav.path === item.path)) {
      setFavorites((prev) => [...prev, item]);
    }
  };

  const removeFavorite = (item) => {
    setFavorites((prev) => prev.filter((fav) => fav.path !== item.path));
  };

  return { menus,setFavorites, favorites, addFavorite, removeFavorite };
};

export default MenuItems;
