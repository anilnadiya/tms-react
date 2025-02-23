import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography } from "@mui/material";
import {
  CreatelanguageTranslate,
  languagesTranslateList,
  UpdatelanguageTranslate,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";
import GenericForm from "../../../../Components/Ui_elements/GenericForm";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";

const LanguagesTrans = () => {
  const dispatch = useDispatch();
  const { langTrans } = useSelector((state) => state.root.AdminModule);
  const [formData, setFormData] = useState({
    lang_id: null,
    title: "",
    name: "",
    flagImg: "",
    is_active: false,
    is_favourite: false,
  });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(languagesTranslateList());
  }, [dispatch]);

  const fields = [
    { name: "title", label: "Title", type: "text", gridSize: 4 },
    { name: "name", label: "Name", type: "text", gridSize: 4 },
    {name: "flagImg",label: "Flag Image",type: "file",gridSize: 4,accept: "image/*",preview: formData.flagImg},
    { name: "is_active", label: " Active (check to active)", type: "checkbox", gridSize: 4 },
    { name: "is_favourite", label: "Favourite (check to Favourite)", type: "checkbox", gridSize: 4 },
  ];

  const columns = [
    { name: "rowNumber", label: "No.", options: { sort: true } },
    { name: "lang_id", label: "ID", options: { display: false } },
    {
        name: "title",
        label: "Language Title",
        options: {
          customBodyRender: (value, tableMeta) => {
            const rowData = tableMeta.rowData;
            const isFavourite = rowData[5];     
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span>{value}</span>
                {isFavourite == 1 && <span style={{ marginLeft: "auto" }}>⭐</span>}
              </div>
            );
          },
        },
      },
      
    { name: "name", label: "Language Name" },
    {
      name: "flagImg",
      label: "Flag",
      options: {
        customBodyRender: (value) => {
          return value ? (
            <Avatar src={value ? `${process.env.REACT_APP_FLAG_URL}${value}` : value} alt="Flag"
              />
          ) : (
            "No Image"
          );
        },
      },
    },
    {
      name: "is_favourite",
      label: "Favourite",
      options: {
        customBodyRender: (value) =>
          value === 1 ? (
            <span style={{ color: "green" }}>⭐</span>
          ) : (
            <span style={{ color: "red" }}>{""}</span>
          ),
          display: false, // Moved this inside the options object
      },
    },
    {
      name: "is_active",
      label: "Status",
      options: {
        customBodyRender: (value) =>
          value === 1 ? (
            <span style={{ color: "green" }}>Active</span>
          ) : (
            <span style={{ color: "red" }}>Inactive</span>
          ),
      },
    },
  ];

  const sortedData = SortAlphabetically(langTrans || [], "title");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    lang_id: item.lang_id,
    name: item.name,
    flagImg: item.flagImg,
    title: item.title,
    is_active: item.is_active,
    is_favourite: item.is_favourite,
  }));

const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
  
    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({
            ...formData,
            flagImg: reader.result, // Convert new file to base64
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Language Title is required";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Language Name is required";
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

    const payload = {
      title: formData.title,
      name: formData.name,
      flagImg: formData.flagImg,
      is_active: formData.is_active ? 1 : 0,
      is_favourite: formData.is_favourite ? 1 : 0,
    };

    if (isEdit) {
      dispatch(
        UpdatelanguageTranslate({ lang_id: formData.lang_id, ...payload })
      );
    } else {
      dispatch(CreatelanguageTranslate(payload));
    }

    setFormData({
      lang_id: null,
      title: "",
      name: "",
      flagImg: "",
      is_active: false,
      is_favourite: false,
    });
    setIsEdit(false);
    setErrors({});
  };

const handleEdit = (rowData) => {
    const selectedData = langTrans.find((item) => item.lang_id === rowData[1]);
    if (selectedData) {
      setFormData({
        lang_id: selectedData.lang_id,
        title: selectedData.title,
        name: selectedData.name,
        flagImg: `${process.env.REACT_APP_FLAG_URL}${selectedData.flagImg}` || "",
        is_active: selectedData.is_active === 1,
        is_favourite: selectedData.is_favourite === 1,
      });
      setIsEdit(true);
    } else {
      console.error("Unable to find the selected data for editing.");
    }
  };
  
  return (
    <>
      <Typography variant="h6" sx={{ py: 2 }}>
        Language Translate
      </Typography>
      <GenericForm
        fields={fields}
        values={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        errors={errors}
        isEdit={isEdit}
      ></GenericForm>
      <GenericTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        showDelete={false}
        displayColumns={6}
        displayRows={10}
      />
    </>
  );
};

export default LanguagesTrans;
