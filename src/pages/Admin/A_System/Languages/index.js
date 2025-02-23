import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemoQLanguageList, languageList } from "../../../../redux/Thunk/AdminModule/AdminThunk";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import { Box, Typography } from "@mui/material";

const MemoQLanguages = () => {
  const dispatch = useDispatch();
  const { memoQLanguage, language } = useSelector((state) => state.root.AdminModule);

  const [languageData, setLanguageData] = useState([]);

  useEffect(() => {
    dispatch(getMemoQLanguageList());
    dispatch(languageList());

  }, [dispatch]);

  useEffect(() => {
    if (memoQLanguage && Array.isArray(memoQLanguage)) {
      const formattedData = memoQLanguage.map(([langName, memoQCode], index) => ({
        rowNumber: index + 1,
        lang_name: langName,
        memoQ_code: memoQCode,
      }));
      setLanguageData(formattedData);
    }
  }, [memoQLanguage]);

  const columns = [
    { name: "rowNumber", label: "#", options: { sort: true } },
    { name: "lang_name", label: "Language Name", options: { sort: true } },
    { name: "memoQ_code", label: "memoQ Code", options: { sort: true } },
  ];

  return (
    <>
    <Typography variant="h6" sx={{ py: 2 }}>
        Languages
      </Typography>
      <Box className = "boxshadow">
      <GenericTable
        columns={columns}
        data={languageData}
        showAction={false}
        showDelete={true}
        displayColumns={3}
        displayRows={10}
      />
      </Box>
    </>
  );
};

export default MemoQLanguages;
