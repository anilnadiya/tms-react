// src/config/routes.js
const routes = {
  authRoutes: [
    { path: "/login", component: "Login", layout: "MinimalLayout" },
  ],
  mainRoutes: [
    { path: "/", component: "Dashboard" },
    { path: "/profile", component: "Profile" },
    {
      path: "/resources",
      children: [
        { path: "internal", component: "InternalResource" },
        { path: "internal-add", component: "InternalForm" },
        { path: "external", component: "ExternalResource" },
      ],
    },
    {
      path: "/client",
      children: [
        { path: "", component: "Client" },
        { path: "form", component: "ClientForm" },
        { path: "account", component: "Account" },
        { path: "accountdetail/:id", component: "AccountDetail" },
        { path: "invoice", component: "ClientInvoice" },
        { path: "statement", component: "ClientStatement" },
        { path: "view/:id", component: "ViewClient" }, // Added missing ViewClient route
      ],
    },
    {
      path: "/linguist",
      children: [
        { path: "invoice", component: "LinguistInvoice" },
        { path: "statement", component: "LinguistStatement" },
      ],
    },
    {
      path: "/reports",
      children: [
        { path: "", component: "Reports" },
        { path: "finance", component: "FinanceReport" },
      ],
    },
    { path: "/email", component: "Email" },
    { path: "/knowledge", component: "KnowledgeBase" },
    {
      path: "/admin",
      children: [
        { path: "resources", component: "AdminResource" },
        {
          path: "invoice",
          children: [
            { path: "due", component: "InvoiceDue" },
            { path: "settings", component: "InvoiceSetting" },
          ],
        },
        { path: "taxation", component: "AdminTaxation" },
        { path: "client/status", component: "ClientStatus" },
        {
          path: "system",
          children: [
            { path: "business", component: "BusinessUnits" },
            { path: "currency", component: "Currency" },
            { path: "date-format", component: "DateFormate" },
            { path: "decimal", component: "DecimalSeprator" },
            { path: "languages", component: "Languages" },
            { path: "languages-translate", component: "LanguagesTrans" },
            { path: "properties", component: "Properties" },
            { path: "specialization", component: "Specialization" },
            { path: "templates", component: "Templates" },
          ],
        },
        {
          path: "projects",
          children: [
            { path: "project-types", component: "ProjectTypes" },
            { path: "scoop-status", component: "ScoopStatus" },
            { path: "job-status", component: "JobStatus" },
            { path: "jobs", component: "Jobs" },
            { path: "job-chain", component: "JobChain" },
            { path: "price-units", component: "PriceUnits" },
            { path: "banking", component: "BankingInfo" },
          ],
        },
      ],
    },
  ],
};

const componentMap = {
  Dashboard: () => import("../pages/Dashboard/index"),
  Profile: () => import("../pages/Profile"),
  InternalResource: () => import("../pages/Resources/Internal/InternalResource"),
  InternalForm: () => import("../pages/Resources/Internal/InternalForm"),
  ExternalResource: () => import("../pages/Resources/ExternalResource"),
  Client: () => import("../pages/Client/Client/Client"),
  ClientForm: () => import("../pages/Client/Client/ClientForm"),
  Account: () => import("../pages/Client/Account/Account"),
  AccountDetail: () => import("../pages/Client/Account/AccountDetail"),
  ClientInvoice: () => import("../pages/Invoice/Client_invoice/ClientInvoice"),
  LinguistInvoice: () => import("../pages/Invoice/Linguist_invoice/LinguistInvoice"),
  ClientStatement: () => import("../pages/Statement/Client_Statement/ClientStatement"),
  LinguistStatement: () => import("../pages/Statement/Linguist_Statement/LinguistStatement"),
  Reports: () => import("../pages/Report/Reports"),
  FinanceReport: () => import("../pages/Report/FinanceReport"),
  Email: () => import("../pages/Email/Email"),
  KnowledgeBase: () => import("../pages/Knowledge/KnowledgeBase"),
  AdminResource: () => import("../pages/Admin/A_Resource"),
  InvoiceDue: () => import("../pages/Admin/A_Invoice/InvoiceDue"),
  InvoiceSetting: () => import("../pages/Admin/A_Invoice/InvoiceSetting"),
  AdminTaxation: () => import("../pages/Admin/A_Taxation"),
  ClientStatus: () => import("../pages/Admin/A_Client/ClientStatus"),
  BusinessUnits: () => import("../pages/Admin/A_System/Business_Units"),
  Currency: () => import("../pages/Admin/A_System/Currency"),
  DateFormate: () => import("../pages/Admin/A_System/Date_Formate"),
  DecimalSeprator: () => import("../pages/Admin/A_System/Decimal_Seprator"),
  Languages: () => import("../pages/Admin/A_System/Languages"),
  LanguagesTrans: () => import("../pages/Admin/A_System/Languages_Translate"),
  Properties: () => import("../pages/Admin/A_System/Properties"),
  Specialization: () => import("../pages/Admin/A_System/Specialization"),
  Templates: () => import("../pages/Admin/A_System/Templates"),
  ProjectTypes: () => import("../pages/Admin/A_Project/Project_Types"),
  ScoopStatus: () => import("../pages/Admin/A_Project/Scoop_Status"),
  JobStatus: () => import("../pages/Admin/A_Project/Job_Status"),
  Jobs: () => import("../pages/Admin/A_Project/Jobs"),
  JobChain: () => import("../pages/Admin/A_Project/Job_Chain"),
  PriceUnits: () => import("../pages/Admin/A_Project/Price_Units"),
  BankingInfo: () => import("../pages/Admin/A_Project/Banking_Info"),
  Login: () => import("../pages/AuthPage/Login"),
  MinimalLayout: () => import("../layouts/MinimalLayout"),
  MainLayout: () => import("../layouts/MainLayout"),
  Authorized: () => import("../Components/Ui_elements/Authorized"), // Fixed path
  ViewClient: () => import("../pages/Client/Client/ViewClient"), // Added missing ViewClient
};

export { routes, componentMap };