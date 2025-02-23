import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChildPriceDropdown, ClientsList, ClientsListDropdown, CopyToOtherUser, CreateClientPrice, CustomerPriceListing, DeleteClientPriceList, GetLanguages, GetOneClientPrice, MasterPriceListDropdown, SpecializationDropdown, UpdateClientPrice } from '../../../../redux/Thunk/ClientModule/ClientThunk';
import { Autocomplete, Box, Chip, FormControl, FormLabel, Grid, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Btn from '../../../../Components/Ui_elements/Btn';
import TextFieldComponent from '../../../../Components/TextFieldComponent';
import DropdownComponent from '../../../../Components/DropdownComponent';
import { CurrencyCode } from '../../../../redux/Thunk/AdminModule/AdminThunk';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import GenericTable from '../../../../Components/Ui_elements/GenericTable';
import { SortAlphabetically } from '../../../../Helper/SortAlphbetically';
import PopupModal from '../../../../Components/Ui_elements/PopupModal';

const Step3 = () => {
    const { clientStepperData, specialization_list, master_price_list, child_price_list, languages_dropdown_list, customer_price_list, clients, single_price_data } = useSelector((state) => state.root.ClientModule);
    const { currencyCode } = useSelector((state) => state.root.AdminModule);
    const { id } = useParams();
    const userName = clients.find(item => item.iClientId == id)?.vUserName || clientStepperData?.clientData?.vUserName;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SpecializationDropdown());
        dispatch(MasterPriceListDropdown());
        dispatch(ChildPriceDropdown());
        dispatch(GetLanguages());
        dispatch(CurrencyCode());
        dispatch(CustomerPriceListing());
        dispatch(ClientsList())

    }, [dispatch]);

    const [show, setShow] = useState(false);
    const [languageRows, setLanguageRows] = useState([]);
    const [languageRowsShort, setLanguageRowsShort] = useState([]);
    const [priceRows, setPriceRows] = useState([]);
    const [selectedPrices, setSelectedPrices] = useState([]);
    const [openForDelete, setOpenForDelete] = useState(false);
    const [copyOpen, setCopyOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        price_name: `${userName} | `,
        price_currency: "",
        min_price_item: "",
        specialization: [],
        source_lang: "",
        target_lang: "",
        basePriceType: "",
    });
    const [copyToClient, setCopyToClient] = useState({
        client_id: "",
    });

    useEffect(() => {
        if (single_price_data && edit) {
            const { price_name, price_currency, min_price_item, specialization, price_language, price_basis } = single_price_data;

            // Parse the price_language and price_basis from JSON strings
            const parsedPriceLanguage = JSON.parse(price_language);
            const parsedPriceBasis = JSON.parse(price_basis);

            // Set the form data
            setFormData({
                price_name: price_name,
                price_currency: price_currency.split(',')[0], // Extract currency code
                min_price_item: min_price_item,
                specialization: specialization.split(','), // Convert to array
                source_lang: "",
                target_lang: "",
                basePriceType: "",
            });

            // Set the language rows
            const languageRows = parsedPriceLanguage.map((lang) => lang.languagePrice);
            const languageRowsShort = languageRows.map((lang) => {
                const [source, target] = lang.split(' -> ');
                return `${source.substring(0, 3).toUpperCase()} > ${target.substring(0, 3).toUpperCase()}`;
            });
            setLanguageRows(languageRows);
            setLanguageRowsShort(languageRowsShort);

            // Set the price rows
            const priceRows = parsedPriceBasis.map((price) => ({
                quantity: parseFloat(price.baseQuentity),
                priceUnit: price.basePriceUnit,
                prices: parseFloat(price.basePrice),
                weighting: 1.0, // Default weighting
                total: parseFloat(price.baseQuentity) * parseFloat(price.basePrice),
                childPriceId: price.childPriceId,
                masterPriceId: price.masterPriceId,
            }));
            setPriceRows(priceRows);
        }
    }, [single_price_data]);

    const sourceLangCode = formData.source_lang?.substring(0, 3).toUpperCase() || "";
    const targetLangCode = formData.target_lang?.substring(0, 3).toUpperCase() || "";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        setCopyToClient((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangeLanguage = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleChange = (event, newValue) => {
        const selectedMasterIds = newValue.filter(item => item.type === "master").map(item => item.master_price_id);

        const updatedSelection = newValue.flatMap((item) => {
            if (item.type === "master") {
                return [
                    item,
                    ...child_price_list.filter(child => child.master_price_id === item.master_price_id)
                ];
            }
            return item;
        });

        const filteredSelection = updatedSelection.filter((item) => {
            if (item.type === "child") {
                return selectedMasterIds.includes(item.master_price_id);
            }
            return true;
        });

        setSelectedPrices(filteredSelection);
    };

    const handleAddLanguageRow = () => {
        if (!formData.source_lang || !formData.target_lang) return;

        const newLanguagePair = `${sourceLangCode} > ${targetLangCode}`;
        setLanguageRowsShort((prev) => [...prev, newLanguagePair]);
        setLanguageRows((prev) => [...prev, `${formData.source_lang} -> ${formData.target_lang}`])

        setFormData((prevData) => ({
            ...prevData,
            price_name: `${prevData.price_name} ${newLanguagePair} | `,
        }));

        setFormData((prevData) => ({
            ...prevData,
            source_lang: "",
            target_lang: "",
        }));
    };

    const handleAddPriceRow = () => {
        const newRows = selectedPrices
            .filter((selectedPrice) => {
                // Check if the priceUnit already exists in the priceRows
                return !priceRows.some((row) => row.priceUnit === selectedPrice.name);
            })
            .map((selectedPrice) => ({
                quantity: 1, // Default quantity
                priceUnit: selectedPrice.name, // Use the selected price name
                prices: 1.0, // Default price
                weighting: 1.0, // Default weighting
                total: 1.0, // Default total
                childPriceId: selectedPrice.child_price_id,
                masterPriceId: selectedPrice.master_price_id,
            }));

        setPriceRows((prev) => [...prev, ...newRows]);
        setSelectedPrices([]); // Clear the selected prices after adding rows
    };

    const handleMultiSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: typeof value === 'string' ? value.split(',') : value,
        }));
    };

    const handleChipDelete = (valueToRemove) => {
        setFormData((prev) => ({
            ...prev,
            specialization: prev.specialization.filter((item) => item !== valueToRemove),
        }));
    };

    const handleDelete = (index) => {
        const updatedLanguageRows = languageRows.filter((_, i) => i !== index);
        setLanguageRows(updatedLanguageRows);
        const updatedLanguageRowsShort = languageRowsShort.filter((_, i) => i !== index);
        setLanguageRowsShort(updatedLanguageRowsShort);

        const updatedPriceName = updatedLanguageRows.join(' | ');
        setFormData((prevData) => ({
            ...prevData,
            price_name: `${userName} | ${updatedLanguageRowsShort}`,
        }));
    };

    const handleDeletePriceRow = (index) => {
        const updatedPriceRows = priceRows.filter((_, i) => i !== index);
        setPriceRows(updatedPriceRows);
    };

    const handleQuantityChange = (index, value) => {
        const updatedPriceRows = [...priceRows];
        updatedPriceRows[index].quantity = value;
        updatedPriceRows[index].total = updatedPriceRows[index].quantity * updatedPriceRows[index].prices;
        setPriceRows(updatedPriceRows);
    };

    const handlePriceChange = (index, value) => {
        const updatedPriceRows = [...priceRows];
        updatedPriceRows[index].prices = value;
        updatedPriceRows[index].total = updatedPriceRows[index].quantity * updatedPriceRows[index].prices;
        setPriceRows(updatedPriceRows);
    };

    const handleSave = () => {
        const payload = {
            price_name: formData.price_name,
            price_currency: `${formData.price_currency},${currencyCode[formData.price_currency]?.symbol}`,
            min_price_item: formData.min_price_item,
            specialization: formData.specialization.join(','),
            price_language: JSON.stringify(languageRows.map(lang => ({ languagePrice: lang }))),
            price_basis: JSON.stringify(priceRows.map(row => ({
                baseQuentity: row.quantity,
                basePricecheck: 1,
                basePriceUnit: row.priceUnit,
                basePrice: row.prices,
                standardTime: "",
                childPriceId: row.childPriceId,
                masterPriceId: row.masterPriceId,
            }))),
            price_id: 1, // 1 static for the client and 2 for resource
            resource_id: id || clientStepperData?.iClientId, // Assuming the resource_id is the client ID
        };

        // Add price_list_id only if it's an edit operation
        if (edit && single_price_data?.price_list_id) {
            payload.price_list_id = single_price_data.price_list_id;
        }

        const action = edit ? UpdateClientPrice : CreateClientPrice;

        dispatch(action(payload)).then(() => {
            setShow(false);

            // Reset form data but keep the username in the price_name field
            setFormData({
                price_name: `${userName} | `, // Preserve the username
                price_currency: "",
                min_price_item: "",
                specialization: [],
                source_lang: "",
                target_lang: "",
                basePriceType: "",
            });

            setLanguageRows([]);
            setLanguageRowsShort([]);
            setPriceRows([]);
            setEdit(false);
        });
    };

    const options = master_price_list.flatMap((master) => [
        { type: "master", ...master },
        ...child_price_list.filter(child => child.master_price_id === master.master_price_id)
    ]);

    const currencyOptions = Object.entries(currencyCode)?.map(([key, currency]) => ({
        label: `${key} (${currency.symbol})`,
        value: key,
    }));

    const specializationOptions = specialization_list.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    const languageOptions = languages_dropdown_list?.map((item) => ({
        label: item.title,
        value: item.title,
    }));

    const clientsOptions = clients?.map((item) => ({
        label: item.vUserName,
        value: item.iClientId
    }))

    const resourceId = id || clientStepperData?.iClientId;
    const TableList = customer_price_list.filter(item => item.resource_id == resourceId);
    const columns = [
        { name: "rowNumber", label: "No.", options: { sort: true } },
        { name: "price_list_id", label: "ID", options: { display: false } },
        { name: "price_name", label: "Name" },
        {
            name: "price_list_id",
            label: "Copy Price",
            options: {
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Btn onClick={() => handleButtonClick(value)}>Copy Price</Btn>
                    );
                },
            },
        },
    ];

    const sortedData = SortAlphabetically(TableList || [], "price_name");
    const data = sortedData?.map((item, index) => ({
        rowNumber: index + 1,
        price_list_id: item.price_list_id,
        price_name: item.price_name,
    }));

    const handleEdit = (rowData) => {
        const selectedId = rowData[1];
        dispatch(GetOneClientPrice(selectedId));
        setShow(true);
        setEdit(true);
    };

    const handleDeleteTable = (id) => {
        setOpenForDelete(true);
        setDeleteId(id);
    };
    const [selectedPriceId, setSelectedPriceId] = useState(null);

    const handleButtonClick = (clickedId) => {
        setSelectedPriceId(clickedId);
        setCopyOpen(true);
        setCopyToClient({});
    };

    const handleCopyPrice = () => {
        const payload = {
            price_list_id: selectedPriceId,
            externalUserClient: copyToClient.client_id,
            typeId: 1
        }
        dispatch(CopyToOtherUser(payload)).then(() => {
            setCopyOpen(false);
            setCopyToClient({});
        })
    };
    return (
        <Box>
            <Grid container justifyContent="space-between" alignItems="flex-start">
                {/* Left Box - New Price List (Fixed Height) */}
                <Grid item className="boxshadow" width="40%" p={2} sx={{ height: "150px" }}>
                    <Typography variant="subtitle1">New price list</Typography>
                    <Grid container justifyContent="space-between" alignItems="center" mt={1}>
                        <Typography variant="subtitle1">Create new price list</Typography>
                        <Btn onClick={() => setShow((prev) => !prev)}>Create</Btn>
                    </Grid>
                </Grid>

                {/* Right Box - Form Input (Flexible Height) */}
                {show && (
                    <Grid item className="boxshadow" width="55%" p={2} sx={{ height: "auto" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextFieldComponent
                                    type="text"
                                    name="price_name"
                                    label="Name"
                                    value={formData.price_name}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <DropdownComponent
                                    label="Currency Code"
                                    name="price_currency"
                                    value={formData.price_currency}
                                    onChange={handleInputChange}
                                    options={currencyOptions}
                                    searchable={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextFieldComponent
                                    type="number"
                                    name="min_price_item"
                                    label="Minimum Charge"
                                    value={formData.min_price_item}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth>
                                    <FormLabel>Specialization</FormLabel>
                                    <Select
                                        multiple
                                        id="specialization"
                                        name="specialization"
                                        value={formData?.specialization || []}
                                        onChange={handleMultiSelectChange}
                                        renderValue={(selected) => (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                                {selected.map((value) => {
                                                    const matched = specializationOptions.find((opt) => opt.value == value);
                                                    return <Chip key={value} label={matched ? matched.label : value}
                                                        onMouseDown={(e) => e.stopPropagation()}
                                                        onDelete={(e) => {
                                                            e.stopPropagation();
                                                            handleChipDelete(value);
                                                        }}
                                                    />;
                                                })}
                                            </div>
                                        )}
                                    >
                                        {specializationOptions.map((opt) => (
                                            <MenuItem key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>

            {/* Languages Table */}
            {show && <Box sx={{ width: '100%', border: '1px solid #ddd', borderRadius: '5px', p: 2, mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Languages
                </Typography>

                <Table sx={{ width: "40%", borderBottom: "1px solid #ddd" }}>
                    <TableHead>
                        <TableRow sx={{ background: "#f8f8f8" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>Languages</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {languageRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Form to Add New Language Rows */}
                <Box sx={{ mt: 3 }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} container alignItems="center" spacing={1}>
                            <Typography variant="body2" sx={{ width: '100%' }}>
                                Add Language Pair
                            </Typography>

                            {/* Source Language */}
                            <Grid item xs={3}>
                                <DropdownComponent
                                    label="Source Language"
                                    name="source_lang"
                                    value={formData.source_lang}
                                    onChange={(e) => handleChangeLanguage('source_lang', e.target.value)}
                                    options={languageOptions}
                                />
                            </Grid>

                            {/* Target Language */}
                            <Grid item xs={3}>
                                <DropdownComponent
                                    label="Target Language"
                                    name="target_lang"
                                    value={formData.target_lang}
                                    onChange={(e) => handleChangeLanguage('target_lang', e.target.value)}
                                    options={languageOptions}
                                />
                            </Grid>

                            {/* ✔ Button */}
                            <Grid item xs={2}>
                                <Btn onClick={handleAddLanguageRow}>✔</Btn>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>}

            {/* Prices Table */}
            {show && <Box sx={{ width: '100%', border: '1px solid #ddd', borderRadius: '5px', p: 2, mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                    Prices
                </Typography>

                <Table sx={{ width: '100%', borderBottom: '1px solid #ddd' }}>
                    <TableHead>
                        <TableRow sx={{ background: '#f8f8f8' }}>
                            <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Price unit</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Prices</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {priceRows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        value={row.quantity}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>{row.priceUnit}</TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        value={row.prices}
                                        onChange={(e) => handlePriceChange(index, e.target.value)}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>{row.total}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeletePriceRow(index)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Form to Add New Price Rows */}
                <Box sx={{ mt: 3 }}>
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} container alignItems="center" spacing={2} wrap="nowrap">
                            <Typography variant="body2" sx={{ width: '100%' }}>
                                Add Price Details
                            </Typography>
                            <Grid item xs={8}>
                                <Autocomplete
                                    multiple
                                    options={options}
                                    groupBy={(option) => (option.type === "master" ? option.name : "")}
                                    getOptionLabel={(option) => option.name}
                                    value={selectedPrices}
                                    onChange={handleChange}
                                    disableCloseOnSelect
                                    renderInput={(params) => <TextField {...params} label="Select Price" variant="outlined" />}
                                    renderOption={(props, option) => (
                                        <Box component="li" {...props} sx={{ padding: "6px 16px", display: "flex", alignItems: "center" }}>
                                            {option.type === "master" ? (
                                                <Typography sx={{ fontWeight: "bold" }}>{option.name}</Typography>
                                            ) : (
                                                <Typography sx={{ paddingLeft: 3 }}>{option.name}</Typography>
                                            )}
                                        </Box>
                                    )}
                                    renderTags={(selected, getTagProps) =>
                                        selected.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                key={option.name}
                                                label={option.name}
                                                onDelete={() => setSelectedPrices(selected.filter((s) => s !== option))}
                                            />
                                        ))
                                    }
                                />
                            </Grid>
                            {/* OK Button */}
                            <Grid item xs={2}>
                                <Btn onClick={handleAddPriceRow}>OK</Btn>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>}

            {/* Save Button */}
            {show && (
                <Box sx={{ mt: 3, textAlign: 'right' }}>
                    <Btn onClick={handleSave}>Save</Btn>
                </Box>
            )}

            <GenericTable
                columns={columns}
                data={data}
                onEdit={handleEdit}
                onDelete={handleDeleteTable}
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
                                    dispatch(DeleteClientPriceList(deleteId)).then(() =>
                                        setOpenForDelete(false)
                                    )
                                }
                            >
                                Yes
                            </Btn>
                            <Btn onClick={() => setOpenForDelete(false)}>Cancel</Btn>
                        </Grid>
                    }
                    title={<Typography variant="h6">Delete Price List</Typography>}
                >
                    <Typography>
                        Are you sure you want to delete the selected price list ?
                    </Typography>
                </PopupModal>
            )}
            {copyOpen && (
                <PopupModal
                    maxWidth={"sm"}
                    fullWidth={true}
                    open={copyOpen}
                    handleClose={() => setCopyOpen(false)}
                    actions={
                        <Grid container columnGap={2} justifyContent={"end"}>
                            <Btn onClick={handleCopyPrice}>Copy</Btn>
                            <Btn onClick={() => setCopyOpen(false)}>Cancel</Btn>
                        </Grid>
                    }
                    title={<Typography variant="h6">Copy Price List</Typography>}
                >
                    <Grid item xs={12} sm={12}>
                        <DropdownComponent
                            label="Select Client"
                            name="client_id"
                            value={copyToClient.client_id}
                            onChange={handleInputChange}
                            options={clientsOptions}
                            searchable={true}
                            isNotMandatory={true}
                        />
                    </Grid>
                </PopupModal>
            )}
        </Box>
    );
};

export default Step3;