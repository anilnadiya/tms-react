import React, { useEffect, useState } from "react";
import TextFieldComponent from "../../../../Components/TextFieldComponent";
import { Grid, Grid2, Typography } from "@mui/material";
import Btn from "../../../../Components/Ui_elements/Btn";
import {  CreateClientLogin, DeleteClientLoginDetail, GetClientLoginDetailList, UpdateClientLogin } from "../../../../redux/Thunk/ClientModule/ClientThunk";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import PopupModal from "../../../../Components/Ui_elements/PopupModal";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";

const Step5 = ({ buttonref, step5Data, setStep5Data, errors, setErrors }) => {
  const dispatch = useDispatch();
  const [openForDelete, setOpenForDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [edit, setEdit] = useState(false);
  const { id } = useParams();

  const {clientStepperData,client_login_detail_list} = useSelector((state) => state.root.ClientModule);
  useEffect(() => {
    if(id || clientStepperData?.iClientId){
      dispatch(GetClientLoginDetailList(id || clientStepperData?.iClientId));
    }
  }, [id , clientStepperData?.iClientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setStep5Data((prevData) => ({
      ...prevData,
      [name]: value, // Fallback if option not found
    }));

    // Remove the error for the corresponding field when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the specific field
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check each field and add errors to newErrors if validation fails
    if (!step5Data.vEmail.trim()) {
      newErrors.vEmail = "Email is required";
    }
    if (!step5Data.vPassword.trim()) {
      newErrors.vPassword = "Password is required";
    }
    if (!step5Data.vWebsite.trim()) {
      newErrors.vWebsite = "Website is required";
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
      iUserId: id || clientStepperData?.iClientId , 
      vDescription: step5Data.vDescription,
      vEmail: step5Data.vEmail,
      vPassword: step5Data.vPassword,
      vWebsite: step5Data.vWebsite,
      ...(edit && { iClientId: editId }) // Include iClientId only when editing
    };

    if(edit){
      dispatch(UpdateClientLogin(formattedPayload)).then(() => {
        dispatch(GetClientLoginDetailList(id || clientStepperData?.iClientId));
        setStep5Data({ vEmail: "", vPassword: "", vWebsite: "", vDescription: "" });
      });
    }else{
      dispatch(CreateClientLogin(formattedPayload)).then(() => {
          dispatch(GetClientLoginDetailList(id || clientStepperData?.iClientId));
          setStep5Data({ vEmail: "", vPassword: "", vWebsite: "", vDescription: "" });
      });
    }

    buttonref.current.click();
  };
  const columns = [
    {
      name: "rowNumber", label: "No.", options: { sort: true, },
    },
    {
      name: "iClientId", label: "ID",
      options: {
        display: false, // Hide the column
      },
    },
    { name: "vEmail", label: "Email" },
    { name: "vWebsite", label: "vWebsite" },
    { name: "vDescription", label: "vDescription" },
  ];

  const sortedData = SortAlphabetically(client_login_detail_list || [], "vEmail");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    iClientId: item.iClientId,
    vDescription: item.vDescription,
    vWebsite: item.vWebsite,
    vEmail: item.vEmail,
  }));

  const handleEdit = (rowData) => {
    setEdit(true)
    const selectedData = client_login_detail_list?.find(
      (item) => item.iClientId === rowData[1]
    );
    setEditId(selectedData.iClientId || rowData[1]);
    if (selectedData) {
      setStep5Data({
        vEmail: selectedData.vEmail,
        vPassword: selectedData.vPassword,
        vWebsite: selectedData.vWebsite,
        vDescription: selectedData.vDescription,
        iClientId: selectedData.iClientId
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
          <Grid item xs={12} sm={3}>
            <TextFieldComponent
              type="text"
              name="vEmail"
              label="User Email"
              value={step5Data.vEmail}
              onChange={handleInputChange}
              error={errors.vEmail || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextFieldComponent
              type="password"
              name="vPassword"
              label="password"
              value={step5Data.vPassword}
              onChange={handleInputChange}
              error={errors.vPassword || ""}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextFieldComponent
              type="text"
              name="vWebsite"  // Need to manage from /client api
              label="Website"
              value={step5Data.vWebsite}
              onChange={handleInputChange}
              error={errors.vWebsite || ""} 
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextFieldComponent
              type="text"
              name="vDescription"
              label="Description"
              value={step5Data.vDescription}
              onChange={handleInputChange}
              error={errors.vDescription || ""}
              fullWidth
              isNotMandatory={true}
            />
          </Grid>

        </Grid>{" "}
          <Grid2 justifyContent={"space-between"} alignItems={"center"} sx={{mt: 3}} container xs={12}>
            <Typography variant="body2"><span style={{ fontWeight: "bold" }}    >Payment terms :</span> (e.g. all invoices are paid 28 days after date of issue)
            </Typography>
            <Btn ref={buttonref} type="submit">
              Add
            </Btn>
          </Grid2>
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
                  dispatch(DeleteClientLoginDetail(deleteId)).then(() =>
                    dispatch(GetClientLoginDetailList(id || clientStepperData?.iClientId)),
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

export default Step5;
