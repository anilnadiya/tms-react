import React, { useRef, useState } from "react";
import { Box, Grid2 } from "@mui/material";
import StepperHandler from "../../../Components/StepperHandler";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Btn from "../../../Components/Ui_elements/Btn";
import Step5 from "./Steps/Step5";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";

const ClientForm = () => {
  const navigate = useNavigate();
  const [stepperData, setStepperData] = useState({
    vUserName: "",
    vCodeRights: "",
    vWebsite: "",
    vPhone: "",
    vStatus: "",
    client_currency: "",
    vLogo: "",
    vCenterid: "",
    tMemo: "",
    accounting_tripletex: "",
    street: "",
    country: "",
    state: "",
    vCity1: "",
    zipcode: "",
    timezone: "",
  });

  const [step2Data, setStep2Data] = useState({
    vEmail: "",
    vFirstName: "",
    vLastName: "",
    vJobTitle: "",
    vPhone: "",
    vSkype: "",
    iContactId: "",
    is_client_invoice: 0,
  });

  const [step4Data, setStep4Data] = useState({
    accounting_name: "",
    tax_id: "",
    memos: "",
    country_code: "",
    tax_rate: "",
    iType: "",
    iClientId: "",
    iPaymentId: "",
    invoice_no_of_days: "",

  })

  const [step5Data, setStep5Data] = useState({
    vEmail: "",
    vPassword: "",
    vWebsite: "",
    vDescription: "",
  });
  const [errors, setErrors] = useState({});
  const buttonref = useRef(null);

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Step1 buttonref={buttonref} stepperData={stepperData} setStepperData={setStepperData} errors={errors} setErrors={setErrors} />;
      case 1:
        return <Step2 buttonref={buttonref} step2Data={step2Data} setStep2Data={setStep2Data} errors={errors} setErrors={setErrors} />;
      case 2:
        return <Step3 buttonref={buttonref} stepperData={stepperData} setStepperData={setStepperData} errors={errors} setErrors={setErrors} />;
      case 3:
        return <Step4 buttonref={buttonref} step4Data={step4Data} setStep4Data={setStep4Data} errors={errors} setErrors={setErrors} />;
      default:
        return <Step5 buttonref={buttonref} step5Data={step5Data} setStep5Data={setStep5Data} errors={errors} setErrors={setErrors} />;
    }
  };

  return (
    <Box className="account-info-stepper">
      <Box>
        <Grid2 container justifyContent={"flex-end"} mb={2}>
          <Btn startIcon={<KeyboardBackspaceIcon />} onClick={() => navigate("/client")}>Back</Btn>
        </Grid2>
      </Box>
      <StepperHandler getStepContent={getStepContent} buttonref={buttonref} />
    </Box>
  );
};

export default ClientForm;
