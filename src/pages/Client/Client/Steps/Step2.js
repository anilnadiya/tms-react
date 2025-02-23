import React, { useEffect, useState } from "react";
import TextFieldComponent from "../../../../Components/TextFieldComponent";
import { Box, Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import Btn from "../../../../Components/Ui_elements/Btn";
import { ClientContactList, CreateClientContact, DeleteClientContact, UpdateContactList } from "../../../../redux/Thunk/ClientModule/ClientThunk";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";

const Step2 = ({ buttonref, step2Data, setStep2Data, errors, setErrors }) => {
  const dispatch = useDispatch();
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { clientStepperData, client_contact_list, country } = useSelector((state) => state.root.ClientModule);
  const { id } = useParams();
  useEffect(() => {
    if (id || clientStepperData?.iClientId) {
      dispatch(ClientContactList(id ? id : clientStepperData?.iClientId));
    }
  }, [id]); // Only run when `id` changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "vPhone.mobileNumber") {
      setStep2Data((prevData) => ({
        ...prevData,
        vPhone: {
          ...prevData.vPhone,
          mobileNumber: value,
        },
      }));
    } else {
      setStep2Data((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!step2Data.vFirstName?.trim()) newErrors.vFirstName = "First Name is required";
    if (!step2Data.vLastName?.trim()) newErrors.vLastName = "Last Name is required";
    if (!step2Data.vEmail?.trim()) newErrors.vEmail = "Email is required";
    if (!step2Data.vSkype?.trim()) newErrors.vSkype = "Skype is required";
    if (!step2Data.vJobTitle?.trim()) newErrors.vJobTitle = "Job Title is required";
    if (!step2Data.vPhone?.mobileNumber?.trim()) newErrors.vPhone = "Phone is required";

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
      iContactId: step2Data.iContactId,
      iClientId: clientStepperData?.iClientId || id,
      vFirstName: step2Data.vFirstName,
      vLastName: step2Data.vLastName,
      vEmail: step2Data.vEmail,
      vSkype: step2Data.vSkype,
      vJobTitle: step2Data.vJobTitle,
      vPhone: JSON.stringify(step2Data.vPhone),
      is_client_invoice: step2Data.is_client_invoice ? 1 : 0,
    };


    if (isEdit) {
      dispatch(UpdateContactList(formattedPayload)).then(() => {
        dispatch(ClientContactList(id ? id : clientStepperData?.iClientId));
      });
    } else {
      dispatch(CreateClientContact(formattedPayload)).then(() => {
        dispatch(ClientContactList(id ? id : clientStepperData?.iClientId));
      });
    }
    setStep2Data({
      vFirstName: "",
      vLastName: "",
      vEmail: "",
      vPhone: { countryTitle: "", countryFlagClass: "", mobileNumber: "" },
      vSkype: "",
      vJobTitle: "",
      is_client_invoice: false,
    });
    setErrors({});

    setIsEdit(false);
  };

  const columns = [
    {
      name: "rowNumber", label: "No.", options: { sort: true, },
    },
    {
      name: "iContactId", label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "vFirstName", label: "Name" },
    { name: "vEmail", label: "Email" },
  ];
  const sortedData = SortAlphabetically(client_contact_list?.data || [], "vFirstName");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    iContactId: item.iContactId,
    vFirstName: item.vFirstName,
    vEmail: item.vEmail,
  }));

  const handleEdit = (rowData) => {
    setIsEdit(true);
    const selectedData = client_contact_list?.data.find(
      (item) => item.iContactId === rowData[1]
    );

    if (selectedData) {
      setStep2Data({
        vFirstName: selectedData.vFirstName,
        vLastName: selectedData.vLastName || "",
        vEmail: selectedData.vEmail,
        vPhone: selectedData.vPhone ? JSON.parse(selectedData.vPhone) : { countryTitle: "", countryFlagClass: "", mobileNumber: "" },
        vSkype: selectedData.vSkype || "",
        vJobTitle: selectedData.vJobTitle || "",
        iContactId: selectedData.iContactId,
        is_client_invoice: selectedData.is_client_invoice,
      });
    } else {
      console.error("Unable to find the selected data for editing.");
    }
  };

  const handleDelete = (id) => {
    setOpenForDelete(true);
    setDeleteId(id);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              name="vFirstName"
              label="First Name"
              value={step2Data.vFirstName}
              onChange={handleInputChange}
              error={errors.vFirstName || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              name="vLastName"
              label="Last Name"
              value={step2Data.vLastName}
              onChange={handleInputChange}
              error={errors.vLastName || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              name="vEmail"
              label="Email"
              value={step2Data.vEmail}
              onChange={handleInputChange}
              error={errors.vEmail || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="tel"
              name="vPhone.mobileNumber"
              label="Phone"
              value={step2Data.vPhone?.mobileNumber || ""}
              onChange={handleInputChange}
              error={errors.vPhone || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              name="vSkype"
              label="Skype"
              value={step2Data.vSkype}
              onChange={handleInputChange}
              error={errors.vSkype || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              name="vJobTitle"
              label="Job Title"
              value={step2Data.vJobTitle}
              onChange={handleInputChange}
              error={errors.vJobTitle || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={step2Data.is_client_invoice || false}
                  onChange={(e) =>
                    setStep2Data((prevData) => ({
                      ...prevData,
                      is_client_invoice: e.target.checked,
                    }))
                  }
                  color="primary"
                />
              }
              label="Select for accounting email"
            />
          </Grid>


          <Grid item xs={12} sx={{ mt: 3 }}>
            <Btn ref={buttonref} type="submit">
              Add
            </Btn>
          </Grid>
        </Grid>
      </form>
      <GenericTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showDelete={true}
        displayColumns={4}
        displayRows={data?.length || 5}
      />
      {openForDelete && (
        <PopupModal
          maxWidth={"sm"}
          fullWidth={true}
          open={openForDelete}
          handleClose={() => setOpenForDelete(false)}
          actions={
            <Grid container columnGap={2} justifyContent={"end"}>
              <Btn
                onClick={() =>
                  dispatch(DeleteClientContact(deleteId)).then(() =>
                    dispatch(ClientContactList(id ? id : clientStepperData?.iClientId)),
                    setOpenForDelete(false)
                  )
                }
              >
                Yes
              </Btn>
              <Btn
                onClick={() => setOpenForDelete(false)}
              >
                Cancel
              </Btn>
            </Grid>
          }
          title={<Typography variant="h6">Delete Client Contact</Typography>}
        >
          <Typography>
            Are you sure you want to delete ?
          </Typography>
        </PopupModal>
      )}
    </>
  );
};

export default Step2;
