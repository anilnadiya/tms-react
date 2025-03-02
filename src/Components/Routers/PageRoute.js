import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "../Ui_elements/Loader";
import AddUpdateResource from "../../pages/Resources/AddUpdateResource";
import Viewinternal from "../../pages/Resources/ViewInternalResource";

// Lazy loading pages
const Dashboard = React.lazy(() => import("../../pages/Dashboard/index"));
const InternalResource = React.lazy(() => import("../../pages/Resources/InternalResource"));
const ExternalResource = React.lazy(() => import("../../pages/Resources/ExternalResource"));
const Client = React.lazy(() => import("../../pages/Client/Client/Client"));
const Account = React.lazy(() => import("../../pages/Client/Account/Account"));
const AccountDetail = React.lazy(() => import("../../pages/Client/Account/AccountDetail"));
const Reports = React.lazy(() => import("../../pages/Report/Reports"));
const FinanceReport = React.lazy(() => import("../../pages/Report/FinanceReport"));
const MinimalLayout = React.lazy(() => import("../../layouts/MinimalLayout"));
const MainLayout = React.lazy(() => import("../../layouts/MainLayout"));
const Login = React.lazy(() => import("../../pages/AuthPage/Login"));
const Authorized = React.lazy(() => import("../Ui_elements/Authorized"));
const ClientInvoice = React.lazy(() => import("../../pages/Invoice/Client_invoice/ClientInvoice"));
const LinguistInvoice = React.lazy(() => import("../../pages/Invoice/Linguist_invoice/LinguistInvoice"));
const ClientStatement = React.lazy(() => import("../../pages/Statement/Client_Statement/ClientStatement"));
const LinguistStatement = React.lazy(() => import("../../pages/Statement/Linguist_Statement/LinguistStatement"));
const Email = React.lazy(() => import("../../pages/Email/Email"));
const KnowledgeBase = React.lazy(() => import("../../pages/Knowledge/KnowledgeBase"));
const AdminResource = React.lazy(() => import("../../pages/Admin/A_Resource"));
const InvoiceDue = React.lazy(() => import("../../pages/Admin/A_Invoice/InvoiceDue"));
const InvoiceSetting = React.lazy(() => import("../../pages/Admin/A_Invoice/InvoiceSetting"));
const AdminTaxation = React.lazy(() => import("../../pages/Admin/A_Taxation"));
const ClientStatus = React.lazy(() => import("../../pages/Admin/A_Client/ClientStatus"));
const Profile = React.lazy(() => import("../../pages/Profile"));
const BusinessUnits = React.lazy(() => import("../../pages/Admin/A_System/Business_Units"));
const Currency = React.lazy(() => import("../../pages/Admin/A_System/Currency"));
const DateFormate = React.lazy(() => import("../../pages/Admin/A_System/Date_Formate"));
const DecimalSeprator = React.lazy(() => import("../../pages/Admin/A_System/Decimal_Seprator"));
const Languages = React.lazy(() => import("../../pages/Admin/A_System/Languages"));
const LanguagesTrans = React.lazy(() => import("../../pages/Admin/A_System/Languages_Translate"));
const Properties = React.lazy(() => import("../../pages/Admin/A_System/Properties"));
const Specialization = React.lazy(() => import("../../pages/Admin/A_System/Specialization"));
const Templates = React.lazy(() => import("../../pages/Admin/A_System/Templates"));
const ProjectTypes = React.lazy(() => import("../../pages/Admin/A_Project/Project_Types"));
const ScoopStatus = React.lazy(() => import("../../pages/Admin/A_Project/Scoop_Status"));
const JobStatus = React.lazy(() => import("../../pages/Admin/A_Project/Job_Status"));
const Jobs = React.lazy(() => import("../../pages/Admin/A_Project/Jobs"));
const JobChain = React.lazy(() => import("../../pages/Admin/A_Project/Job_Chain"));
const PriceUnits = React.lazy(() => import("../../pages/Admin/A_Project/Price_Units"));
const BankingInfo = React.lazy(() => import("../../pages/Admin/A_Project/Banking_Info"));
const ClientForm = React.lazy(() => import("../../pages/Client/Client/ClientForm"));
const ViewClient = React.lazy(() => import("../../pages/Client/Client/ViewClient"));
const ViewExternal = React.lazy(() => import("../../pages/Resources/ViewExternalResource"));
const ViewInvoice = React.lazy(() => import("../../pages/Report/ReportTabs/ViewInvoice"));
const ViewInvoiceLinguist = React.lazy(() => import("../../pages/Report/ReportTabs/ViewInvoiceLinguist"));
const PageRoute = () => {
  return (
    <>
      <Suspense fallback={<div><Loader/></div>}>
        <Routes>
          <Route element={<Authorized />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/resources/internal" element={<InternalResource />} />
              <Route path="/resources/external" element={<ExternalResource />} />
              <Route path="/manage/internal" element={<AddUpdateResource />} />
              <Route path="/manage/internal/:id" element={<AddUpdateResource />}/>
              {/* AddUpdateResource */}
              <Route path="/viewinternal/:id" element={<Viewinternal />} />
              <Route path="/viewExternal/:id" element={<ViewExternal />} />


              <Route path="/client" element={<Client />} />
              <Route path="/viewclient/:id" element={<ViewClient />} />
              <Route path="/client/form" element={<ClientForm />} />
              <Route path="/client/form/:id" element={<ClientForm />} />
              <Route path="/client/account" element={<Account />} />
              <Route path="/client/accountdetail/:id" element={<AccountDetail />} />

              <Route path="/reports" element={<Reports />} />
              <Route path="/viewinvoice/:id" element={<ViewInvoice />} />
              <Route path="/viewinvoicelinguist/:id" element={<ViewInvoiceLinguist />} />
              <Route path="/reports/finance" element={<FinanceReport />} />
              <Route path="/client/invoice" element={<ClientInvoice />} />
              <Route path="/linguist/invoice" element={<LinguistInvoice />} />
              <Route path="/client/statement" element={<ClientStatement />} />
              <Route path="/linguist/statement" element={<LinguistStatement />} />
              <Route path="/email" element={<Email />} />
              <Route path="/knowledge" element={<KnowledgeBase />} />

              {/* Admin module */}
              <Route path="/admin/resources" element={<AdminResource />} />
              <Route path="/admin/invoice/due" element={<InvoiceDue />} />
              <Route path="/admin/invoice/settings" element={<InvoiceSetting />} />
              <Route path="/admin/taxation" element={<AdminTaxation />} />
              <Route path="/admin/client/status" element={<ClientStatus />} />
            
              {/* A_System */}
              <Route path="/admin/system/business" element={<BusinessUnits />} />
              <Route path="/admin/system/currency" element={<Currency />} />
              <Route path="/admin/system/date-format" element={<DateFormate />} />
              <Route path="/admin/system/decimal" element={<DecimalSeprator />} />
              <Route path="/admin/system/languages" element={<Languages />} />
              <Route path="/admin/system/languages-translate" element={<LanguagesTrans />} />
              <Route path="/admin/system/properties" element={<Properties />} />
              <Route path="/admin/system/specialization" element={<Specialization />} />
              <Route path="/admin/system/templates" element={<Templates />} />

              {/* A_Projects */}
              <Route path="/admin/projects/project-types" element={<ProjectTypes />} />
              <Route path="/admin/projects/scoop-status" element={<ScoopStatus />} />
              <Route path="/admin/projects/job-status" element={<JobStatus />} />
              <Route path="/admin/projects/jobs" element={<Jobs />} />
              <Route path="/admin/projects/job-chain" element={<JobChain />} />
              <Route path="/admin/projects/price-units" element={<PriceUnits />} />
              <Route path="/admin/projects/banking" element={<BankingInfo />} />
              
            </Route>
          </Route>

          <Route element={<MinimalLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default PageRoute;
