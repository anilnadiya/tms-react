import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Typography, Box, FormControl, FormLabel, Select, MenuItem, Checkbox } from "@mui/material";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  CreateEmailTemplate,
  EmailTemplateList,
  UpdateEmailTemplate,
} from "../../../../redux/Thunk/AdminModule/AdminThunk";
import Btn from "../../../../Components/Ui_elements/Btn";
import TextFieldComponent from "../../../../Components/TextFieldComponent";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";

const EmailTemplate = () => {
  const dispatch = useDispatch();
  const { emailTemplate } = useSelector((state) => state.root.AdminModule);
  const [errors, setErrors] = useState({});

    const categoryDropdown = [
    { id: "1", text: "Accepted job by resource" },
    { id: "2", text: "Job rejected by resource" },
    { id: "3", text: "Reset Password" },
    { id: "4", text: "Registration email" },
    { id: "5", text: "Overdue job" },
    { id: "6", text: "Job Delivery" },
    { id: "7", text: "Password to resource" },
    { id: "8", text: "Send Job Request" },
    { id: "9", text: "Invoice" },
    { id: "10", text: "Purchase Order" },
  ];

  const [formData, setFormData] = useState({
    template_id: null,
    template_subject: "",
    template_name: "",
    template_category: "",
    template_content: EditorState.createEmpty(), // Initialize with empty EditorState
    is_active: false,
  });

  const [isEdit, setIsEdit] = useState(false);

    const columns = [
    { name: "rowNumber", label: "No.", options: { sort: true } },
    { name: "template_id", label: "ID", options: { display: false } },
    { name: "template_name", label: "Template Name" },
    { name: "template_subject", label: "Template Subject" },
    { name: "template_category", label: "Template For",
      options: {
        customBodyRender: (value) => {
          const category = categoryDropdown.find((item) => item.id == value);
          return category ? category.text : "Unknown";
        }
      }
     },
    {
      name: "is_active",
      label: "Status",
      options: {
        customBodyRender: (value) =>
          value === 1 ? (
            <span style={{ color: "green" }}>Active</span>
          ) : (
            <span style={{ color: "red" }}>InActive</span>
          ),
      },
    },
  ];

    const sortedData = SortAlphabetically(emailTemplate || [], "template_name");

  const data = sortedData?.map((item, index) => ({
    rowNumber: index + 1,
    template_id: item.template_id,
    template_name: item.template_name,
    template_subject: item.template_subject,
    template_category: item.template_category,
    is_active: item.is_active,
  }));

  useEffect(() => {
    dispatch(EmailTemplateList());
  }, [dispatch]);

    const validateForm = () => {
    const newErrors = {};
    if (!formData?.template_name.trim()) {
      newErrors.template_name = "Job Name is required";
    }
    if (!formData?.template_subject.trim()) {
      newErrors.template_subject = "Job Code is required";
    }
    if (!formData?.template_category) {
      newErrors.template_category = "Template Category is required";
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

    const contentState = formData.template_content.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    const payload = {
      ...formData,
      template_content: JSON.stringify(rawContent), // Convert content to JSON string
    };

    if (isEdit) {
      dispatch(UpdateEmailTemplate(payload));
    } else {
      dispatch(CreateEmailTemplate(payload));
    }

    setFormData({
      template_id: null,
      template_subject: "",
      template_name: "",
      template_category: "",
      template_content: EditorState.createEmpty(), // Reset editor content
      is_active: false,
    });
    setIsEdit(false);
  };

  const handleEditorChange = (editorState) => {
    setFormData({
      ...formData,
      template_content: editorState,
    });
  };

    const handleEdit = (rowData) => {
    const selectedData = emailTemplate.find(
      (item) => item.template_id === rowData[1]
    );
    if (selectedData) {
        const contentState = convertFromRaw(JSON.parse(selectedData.template_content));

      setFormData({
        template_id: selectedData.template_id,
        template_name: selectedData.template_name,
        template_subject: selectedData.template_subject,
        template_category: selectedData.template_category, // Set template_category
        template_content: EditorState.createWithContent(contentState),
        is_active: selectedData.is_active,
      });
      setIsEdit(true);
    } else {
      console.error("Unable to find the selected data for editing.");
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ py: 2 }}>
        Email Template
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid item xs={12} sx={{ mb: 4 }}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                width: "100%", // Ensure full width
                overflow: "hidden", // Prevent layout shifts
              }}
            >
              <Editor
                editorState={formData.template_content}
                onEditorStateChange={handleEditorChange}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                    // "emoji",
                    "image",
                    "remove",
                    "history",
                  ],
                }}
                editorStyle={{
                  width: "100%",
                  height: "auto",
                  minHeight: "200px",
                  padding: "10px",
                }}
              />
            </Box>
          </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="template_name"
              name="template_name"
              label="Template Name"
              value={formData.template_name}
              error={errors.template_name}
              onChange={(e) =>
                setFormData({ ...formData, template_name: e.target.value },
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      template_name: "",
                    }))
                )
              }
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextFieldComponent
              type="text"
              id="template_subject"
              name="template_subject"
              label="Template Subject"
              value={formData.template_subject}
              error={errors.template_subject}
              onChange={(e) =>
                setFormData({ ...formData, template_subject: e.target.value },
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      template_subject: "",
                    }))
                )
              }
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={4}>
             <FormControl fullWidth error={Boolean(errors.template_category)}>
               <FormLabel component="legend" style={{ marginBottom: "8px" }}>
                 Template Category
               </FormLabel>
               <Select
                name="template_category"
                value={formData.template_category || ""}
                onChange={(e) =>
                  setFormData({ ...formData, template_category: e.target.value },
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        template_category: "",
                      }))
                  )}
                displayEmpty
              >
                <MenuItem value="" disabled>
                  Select Category
                </MenuItem>
                {categoryDropdown.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center">
              <Checkbox
                checked={formData.is_active || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_active: e.target.checked,
                  })
                }
                color="primary"
              />
              <Typography variant="body1">Active (check to active)</Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Btn type="submit">{isEdit ? "Update" : "Add"}</Btn>
          </Grid>
        </Grid>
      </form>
      <GenericTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        showDelete={false}
        displayColumns={4}
        displayRows={10}
      />
    </>
  );
};

export default EmailTemplate;


// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Grid, Typography, Box, FormControl, FormLabel, Select, MenuItem, Checkbox, Button, TextareaAutosize } from "@mui/material";
// import { EditorState, convertToRaw, convertFromRaw, ContentState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import {
//   CreateEmailTemplate,
//   EmailTemplateList,
//   UpdateEmailTemplate,
// } from "../../../../redux/Thunk/AdminModule/AdminThunk";
// import Btn from "../../../../Components/Ui_elements/Btn";
// import TextFieldComponent from "../../../../Components/TextFieldComponent";
// import GenericTable from "../../../../Components/Ui_elements/GenericTable";
// import { SortAlphabetically } from "../../../../Helper/SortAlphbetically";

// const EmailTemplate = () => {
//   const dispatch = useDispatch();
//   const { emailTemplate } = useSelector((state) => state.root.AdminModule);
//   console.log('emailTemplate: ', emailTemplate);
//   const [errors, setErrors] = useState({});
//   const [isHtmlView, setIsHtmlView] = useState(false);

//   const categoryDropdown = [
//     { id: "1", text: "Accepted job by resource" },
//     { id: "2", text: "Job rejected by resource" },
//     { id: "3", text: "Reset Password" },
//     { id: "4", text: "Registration email" },
//     { id: "5", text: "Overdue job" },
//     { id: "6", text: "Job Delivery" },
//     { id: "7", text: "Password to resource" },
//     { id: "8", text: "Send Job Request" },
//     { id: "9", text: "Invoice" },
//     { id: "10", text: "Purchase Order" },
//   ];

//   const [formData, setFormData] = useState({
//     template_id: null,
//     template_subject: "",
//     template_name: "",
//     template_category: "",
//     template_content: EditorState.createEmpty(),
//     htmlContent: "",
//     is_active: false,
//   });

//   const [isEdit, setIsEdit] = useState(false);

//   const columns = [
//     { name: "rowNumber", label: "No.", options: { sort: true } },
//     { name: "template_id", label: "ID", options: { display: false } },
//     { name: "template_name", label: "Template Name" },
//     { name: "template_subject", label: "Template Subject" },
//     { name: "template_category", label: "Template For",
//       options: {
//         customBodyRender: (value) => {
//           const category = categoryDropdown.find((item) => item.id == value);
//           return category ? category.text : "Unknown";
//         }
//       }
//      },
//     {
//       name: "is_active",
//       label: "Status",
//       options: {
//         customBodyRender: (value) =>
//           value === 1 ? (
//             <span style={{ color: "green" }}>Active</span>
//           ) : (
//             <span style={{ color: "red" }}>InActive</span>
//           ),
//       },
//     },
//   ];

//   const sortedData = SortAlphabetically(emailTemplate || [], "template_name");

//   const data = sortedData?.map((item, index) => ({
//     rowNumber: index + 1,
//     template_id: item.template_id,
//     template_name: item.template_name,
//     template_subject: item.template_subject,
//     template_category: item.template_category,
//     is_active: item.is_active,
//   }));

//   useEffect(() => {
//     dispatch(EmailTemplateList());
//   }, [dispatch]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData?.template_name.trim()) {
//       newErrors.template_name = "Job Name is required";
//     }
//     if (!formData?.template_subject.trim()) {
//       newErrors.template_subject = "Job Code is required";
//     }
//     if (!formData?.template_category) {
//       newErrors.template_category = "Template Category is required";
//     }
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const contentState = formData.template_content.getCurrentContent();
//     const rawContent = convertToRaw(contentState);

//     const payload = {
//       ...formData,
//       template_content: JSON.stringify(rawContent),
//     };

//     if (isEdit) {
//       dispatch(UpdateEmailTemplate(payload));
//     } else {
//       dispatch(CreateEmailTemplate(payload));
//     }

//     setFormData({
//       template_id: null,
//       template_subject: "",
//       template_name: "",
//       template_category: "",
//       template_content: EditorState.createEmpty(),
//       htmlContent: "",
//       is_active: false,
//     });
//     setIsEdit(false);
//   };

//   const handleEditorChange = (editorState) => {
//     setFormData({
//       ...formData,
//       template_content: editorState,
//     });
//   };

//   const handleEdit = (rowData) => {
//     const selectedData = emailTemplate.find(
//       (item) => item.template_id === rowData[1]
//     );
//     if (selectedData) {
//       const contentState = convertFromRaw(JSON.parse(selectedData.template_content));

//       setFormData({
//         template_id: selectedData.template_id,
//         template_name: selectedData.template_name,
//         template_subject: selectedData.template_subject,
//         template_category: selectedData.template_category,
//         template_content:isHtmlView ? draftToHtml(convertToRaw(contentState)) : EditorState.createWithContent(contentState),
//         is_active: selectedData.is_active,
//       });
//       setIsEdit(true);
//     } else {
//       console.error("Unable to find the selected data for editing.");
//     }
//   };

//   const toggleView = () => {
//     if (!isHtmlView) {
//       setFormData((prev) => ({
//         ...prev,
//         htmlContent: draftToHtml(convertToRaw(prev.template_content.getCurrentContent())),
//       }));
//     } else {
//       const blocksFromHtml = htmlToDraft(formData.htmlContent);
//       const { contentBlocks, entityMap } = blocksFromHtml;
//       const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
//       setFormData((prev) => ({
//         ...prev,
//         template_content: EditorState.createWithContent(contentState),
//       }));
//     }
//     setIsHtmlView(!isHtmlView);
//   };

//   return (
//     <>
//       <Typography variant="h6" sx={{ py: 2 }}>
//         Email Template
//       </Typography>
//       <Button variant="contained" onClick={toggleView} sx={{ mb: 2 }}>
//         {isHtmlView ? "Switch to Editor" : "Switch to HTML"}
//       </Button>
//       <form onSubmit={handleSubmit}>
//         <Grid item xs={12} sx={{ mb: 4 }}>
//           <Box
//             sx={{
//               border: "1px solid #ccc",
//               borderRadius: "4px",
//               padding: "10px",
//               width: "100%",
//               overflow: "hidden",
//             }}
//           >
//             {isHtmlView ? (
//               <TextareaAutosize
//                 minRows={10}
//                 html={true}
//                 style={{ width: "100%", padding: "10px", border: "1px solid #ccc" }}
//                 value={formData.htmlContent}
//                 onChange={(e) => setFormData({ ...formData, htmlContent: e.target.value })}
//               />
//             ) : (
//               <Editor
//                 editorState={formData.template_content}
//                 onEditorStateChange={handleEditorChange}
//                 toolbar={{
//                   options: [
//                     "inline",
//                     "blockType",
//                     "fontSize",
//                     "fontFamily",
//                     "list",
//                     "textAlign",
//                     "colorPicker",
//                     "link",
//                     "embedded",
//                     "image",
//                     "remove",
//                     "history",
//                   ],
//                 }}
//                 editorStyle={{
//                   width: "100%",
//                   height: "auto",
//                   minHeight: "200px",
//                   padding: "10px",
//                 }}
//               />
//             )}
//           </Box>
//         </Grid>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={4}>
//             <TextFieldComponent
//               type="text"
//               id="template_name"
//               name="template_name"
//               label="Template Name"
//               value={formData.template_name}
//               error={errors.template_name}
//               onChange={(e) =>
//                 setFormData({ ...formData, template_name: e.target.value },
//                     setErrors((prevErrors) => ({
//                       ...prevErrors,
//                       template_name: "",
//                     }))
//                 )
//               }
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <TextFieldComponent
//               type="text"
//               id="template_subject"
//               name="template_subject"
//               label="Template Subject"
//               value={formData.template_subject}
//               error={errors.template_subject}
//               onChange={(e) =>
//                 setFormData({ ...formData, template_subject: e.target.value },
//                     setErrors((prevErrors) => ({
//                       ...prevErrors,
//                       template_subject: "",
//                     }))
//                 )
//               }
//               fullWidth
//             />
//           </Grid>

//           <Grid item xs={12} sm={4}>
//              <FormControl fullWidth error={Boolean(errors.template_category)}>
//                <FormLabel component="legend" style={{ marginBottom: "8px" }}>
//                  Template Category
//                </FormLabel>
//                <Select
//                 name="template_category"
//                 value={formData.template_category || ""}
//                 onChange={(e) =>
//                   setFormData({ ...formData, template_category: e.target.value },
//                       setErrors((prevErrors) => ({
//                         ...prevErrors,
//                         template_category: "",
//                       }))
//                   )}
//                 displayEmpty
//               >
//                 <MenuItem value="" disabled>
//                   Select Category
//                 </MenuItem>
//                 {categoryDropdown.map((option) => (
//                   <MenuItem key={option.id} value={option.id}>
//                     {option.text}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <Box display="flex" alignItems="center">
//               <Checkbox
//                 checked={formData.is_active || false}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     is_active: e.target.checked,
//                   })
//                 }
//                 color="primary"
//               />
//               <Typography variant="body1">Active (check to active)</Typography>
//             </Box>
//           </Grid>
          
//           <Grid item xs={12}>
//             <Btn type="submit">{isEdit ? "Update" : "Add"}</Btn>
//           </Grid>
//         </Grid>
//       </form>
//       <GenericTable
//         columns={columns}
//         data={data}
//         onEdit={handleEdit}
//         showDelete={false}
//         displayColumns={4}
//         displayRows={10}
//       />
//     </>
//   );
// };

// export default EmailTemplate;