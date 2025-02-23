import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../../Components/Ui_elements/Btn";
import TextFieldComponent from "../../../Components/TextFieldComponent";
import { CreateClientAccount, GetNumber, UpdateClientAccount } from "../../../redux/Thunk/ClientModule/ClientThunk";
import { useNavigate } from "react-router-dom";

const AccountForm = ({ initialData = null, closeForm }) => {
  const {numberAscending} = useSelector((state) => state.root.ClientModule);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(
    initialData || { vUserName: "", vWebsite: "", notes: "", fileId: "", vClientNumber:numberAscending } // Todo fileId
  );
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData?.vUserName.trim()) newErrors.vUserName = "Account Name is required";
    if (!formData?.vWebsite.trim()) newErrors.vWebsite = "Website is required";
    return newErrors;
  };

  useEffect(() => {
    dispatch(GetNumber())
   }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (initialData) {
      dispatch(UpdateClientAccount({navigate,formData}));
    } else {
      dispatch(CreateClientAccount(formData));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="vUserName"
            label="Account Name"
            value={formData.vUserName}
            onChange={handleInputChange}
            error={errors.vUserName || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="vWebsite"
            label="Website"
            value={formData.vWebsite}
            onChange={handleInputChange}
            error={errors.vWebsite || ""}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFieldComponent
            type="text"
            name="notes"
            label="Notes"
            value={formData.notes}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            isNotMandatory={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Btn type="submit">{initialData ? "Update" : "Add"}</Btn>
        </Grid>
      </Grid>
    </form>
  );
};

export default AccountForm;
