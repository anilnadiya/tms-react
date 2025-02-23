
import { Avatar, Box, Grid, Grid2, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import TextFieldComponent from "../../../../Components/TextFieldComponent";
import { ClientProfileNumber, ClientsStatusList, CountryList, CreateClient, GetOneClient, UpdateClient } from "../../../../redux/Thunk/ClientModule/ClientThunk";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../../../Components/Ui_elements/Btn";
import { CurrencyCode, DropdownClientCenter } from "../../../../redux/Thunk/AdminModule/AdminThunk";
import DropdownComponent from "../../../../Components/DropdownComponent";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const Step1 = ({buttonref,stepperData,setStepperData,errors,setErrors,}) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { dropdownClient, currencyCode } = useSelector((state) => state.root.AdminModule);
  const { client_status, country, profile_number, singleClientStep1 } = useSelector((state) => state.root.ClientModule);
  const { id } = useParams();

  useEffect(() => {
    dispatch(DropdownClientCenter());
    dispatch(CurrencyCode());
    dispatch(ClientsStatusList());
    dispatch(CountryList());
    dispatch(ClientProfileNumber());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(GetOneClient(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (singleClientStep1 && id) {
      const address1Detail = singleClientStep1.address1Detail 
        ? JSON.parse(singleClientStep1.address1Detail) 
        : [];
  
      const addressFields = address1Detail.reduce((acc, field) => {
        acc[field.id] = field.value;
        return acc;
      }, {});
  
      setStepperData({
        vUserName: singleClientStep1.vUserName || "",
        vCodeRights: singleClientStep1.vCodeRights || "",
        vWebsite: singleClientStep1.vWebsite || "",
        vPhone: singleClientStep1.vPhone ? JSON.parse(singleClientStep1.vPhone).mobileNumber : "",
        vStatus: singleClientStep1.vStatus || "",
        client_currency: singleClientStep1.client_currency || "",
        vLogo: singleClientStep1.vLogo || "",
        tMemo: singleClientStep1.tMemo || "",
        accounting_tripletex: singleClientStep1.accounting_tripletex || "",
        vAddress1: addressFields["address1_street_number"]|| "",
        country: addressFields["address1_country"]|| "",
        state: addressFields["address1_administrative_area_level_1"] || "",
        vCity1: addressFields["address1_locality"] || "",
        zipcode: addressFields["address1_postal_code"] || "",
        timezone: addressFields["address1_vTimezone"] || "",
      });
    }
  }, [singleClientStep1, id, setStepperData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "vStatus") {
      // Extract the status_id from the selected option
      const selectedOption = client_status.find(
        (option) => `${option.status_id}` === value
      );
  
      setStepperData((prevData) => ({
        ...prevData,
        [name]: selectedOption ? selectedOption.status_id : value,
      }));
    } else {
      setStepperData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  
    // Clear the error for the corresponding field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStepperData((prevData) => ({
          ...prevData,
          vLogo: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const validateForm = () => {
    const newErrors = {};

    // Check each field and add errors to newErrors if validation fails
    if (!stepperData.vUserName.trim()) {
      newErrors.vUserName = "Company Name is required";
    }
    if (!stepperData.vCodeRights) {
      newErrors.vCodeRights = "Business Unit is required";
    }
    if (!stepperData.vWebsite.trim()) {
      newErrors.vWebsite = "Website is required";
    }
    if (!stepperData.vPhone.trim()) {
      newErrors.vPhone = "Phone is required";
    }
    if (!stepperData.vStatus) {
      newErrors.vStatus = "Status is required";
    }
    if (!stepperData.client_currency) {
      newErrors.client_currency = "Currency is required";
    }
    if (!stepperData.tMemo.trim()) {
      newErrors.tMemo = "Description is required";
    }
    if (!stepperData.accounting_tripletex.trim()) {
      newErrors.accounting_tripletex = "Accounting is required";
    }
    if (!stepperData.vAddress1.trim()) {
      newErrors.vAddress1 = "Street is required";
    }
    if (!stepperData.country.trim()) {
      newErrors.country = "Country is required";
    }
    if (!stepperData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!stepperData.vCity1.trim()) {
      newErrors.vCity1 = "City is required";
    }
    if (!stepperData.timezone.trim()) {
      newErrors.timezone = "Timezone is required";
    }
    if (!stepperData.zipcode.trim()) {
      newErrors.zipcode = "Zipcode is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    const formattedPayload = {
      vUserName: stepperData.vUserName,
      vCodeRights: stepperData.vCodeRights,
      vWebsite: stepperData.vWebsite,
      vPhone: JSON.stringify({
        countryTitle: stepperData.country,
        countryFlagClass: "iti-flag us",
        mobileNumber: stepperData.vPhone,
      }),
      vStatus: stepperData.vStatus,
      client_currency: stepperData.client_currency,
      vLogo: stepperData.vLogo,
      vCenterid: stepperData.vCenterid,
      vClientNumber: profile_number,
      tMemo: stepperData.tMemo,
      accounting_tripletex: stepperData.accounting_tripletex,
      address1Detail: JSON.stringify([
        { id: "address1_street_number", value: stepperData.vAddress1 },
        { id: "address1_country", value: stepperData.country },
        { id: "address1_administrative_area_level_1", value: stepperData.state },
        { id: "address1_locality", value: stepperData.vCity1 },
        { id: "address1_postal_code", value: stepperData.zipcode },
        { id: "address1_vTimezone", value: stepperData.timezone },
      ]),
    };
   if(id) {
    dispatch(UpdateClient({formattedPayload, id}));
   }else{
     dispatch(CreateClient(formattedPayload));
   }
    buttonref.current.click();
  };
  
  const businessUnitOptions = dropdownClient?.map((item) => {
    // Parse order_number JSON string safely
    let parsedOrderNumber;
    try {
      parsedOrderNumber = JSON.parse(item.order_number);
    } catch (error) {
      parsedOrderNumber = []; // Fallback to an empty array
    }
    // Ensure the value matches the format of stepperData.vCodeRights
    const value = parsedOrderNumber[0]?.value.replace(/_+$/, "") || "";
  
    return {
      label: item.name, // Display name in the dropdown
      value: value, // Use the cleaned value for comparison
    };
  });  
  const statusOptions = client_status?.map((status) => ({
    label: status.status_name,
    value: `${status.status_id}`,
  }));
  
  const currencyOptions = Object.entries(currencyCode).map(([key, currency]) => ({
    label: `${key}`, // Display "CAD ($)", "EUR (€)", etc.
    value: `${key},${currency.symbol}`, // Store as "CAD,$", "EUR,€"
  }));
  
    const countryOptions = country?.map((c) => ({
    label: c.name,
    value: c.nicename,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Box className="boxshadow" sx={{ my: 2 }}>
        <Typography variant="h6">Basic Information</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h7">Client Number :- </Typography>
          <Typography variant="h7" sx={{ fontWeight: "bold" }}>{singleClientStep1 ? singleClientStep1.vClientNumber : profile_number}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h7">Creation Date :- </Typography>
          <Typography variant="h7" sx={{ fontWeight: "bold" }}> {dayjs().format("DD-MM-YYYY")}</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h7">Creator Name :- </Typography>
          <Typography variant="h7" sx={{ fontWeight: "bold" }}>TMS Admin</Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="vUserName"
            label="Company Name"
            value={stepperData.vUserName}
            onChange={handleInputChange}
            error={errors.vUserName || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>

          <DropdownComponent
            label="Business Unit"
            name="vCodeRights"
            value={stepperData.vCodeRights}
            onChange={handleInputChange}
            options={businessUnitOptions}
            error={errors.vCodeRights || ""}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="tel"
            name="vPhone"
            label="Phone"
            value={stepperData.vPhone}
            onChange={handleInputChange}
            error={errors.vPhone || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="vWebsite"
            label="Website"
            value={stepperData.vWebsite}
            onChange={handleInputChange}
            error={errors.vWebsite || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
        <DropdownComponent
            label="Status"
            name="vStatus"
            value={stepperData.vStatus.toString()}
            onChange={handleInputChange}
            options={statusOptions}
            error={errors.vStatus || ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DropdownComponent
            label="Currency Code"
            name="client_currency"
            value={stepperData?.client_currency}
            onChange={handleInputChange}
            options={currencyOptions}
            searchable={true}
            error={errors.client_currency || ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Avatar
            alt="Logo Preview"
            src={stepperData.vLogo || ""}
            sx={{
              width: 100,
              height: 90,
              cursor: "pointer",
              borderRadius: "0%",
              margin: "5px",
              border: "4px solid rgb(254 254 254)",
            }}
            onClick={handleAvatarClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
            name="vLogo"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="tMemo"
            label="Memo"
            value={stepperData.tMemo}
            onChange={handleInputChange}
            error={errors.tMemo || ""}
            multiline
            rows={3}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="accounting_tripletex"
            label="Accounting Tripletex"
            value={stepperData.accounting_tripletex}
            onChange={handleInputChange}
            error={errors.accounting_tripletex || ""}
            fullWidth
          />
        </Grid>
      </Grid>
      <Box className="boxshadow" sx={{ my: 2 }}>
        <Typography variant="h6">Address</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="vAddress1"
            label="Street"
            value={stepperData.vAddress1}
            onChange={handleInputChange}
            error={errors.vAddress1 || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DropdownComponent
            label="Country"
            name="country"
            value={stepperData.country}
            onChange={handleInputChange}
            options={countryOptions}
            error={errors.country || ""}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="state"
            label="State"
            value={stepperData.state}
            onChange={handleInputChange}
            error={errors.state || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="vCity1"
            label="City"
            value={stepperData.vCity1}
            onChange={handleInputChange}
            error={errors.vCity1 || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="zipcode"
            label="Zipcode"
            value={stepperData.zipcode}
            onChange={handleInputChange}
            error={errors.zipcode || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="timezone"
            label="TimeZone"
            value={stepperData.timezone}
            onChange={handleInputChange}
            error={errors.timezone || ""}
            fullWidth
          />
        </Grid>

        <Grid2 container xs={12}>
          <Btn ref={buttonref} type="submit">
            Save & Next
          </Btn>
        </Grid2>
      </Grid>
    </form>
  );
};

export default Step1;