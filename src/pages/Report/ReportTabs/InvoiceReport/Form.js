import { Grid2 } from '@mui/material';
import React from 'react';
import Btn from '../../../../Components/Ui_elements/Btn';
import TextFieldComponent from '../../../../Components/TextFieldComponent';
import { Grid } from '@mui/material';
import DropdownComponent from '../../../../Components/DropdownComponent';

const FormComponent = ({ formData, handleInputChange, handleReset, handleSubmit, errors, clients,  currencyCode }) => {
    const job_status = ['Open', 'Paid', 'Complete', 'Overdue', 'Cancel', 'Irrecoverable']

    const clientOptions = clients?.map((i) => ({
        label: i.vUserName,
        value: `${i.iClientId}`,
    }))
    const jobStatusOptions = job_status?.map((i) => ({
        label: i,
        value: `${i}`,
    }))
    const currencyOptions = Object?.entries(currencyCode)?.map(([key, currency]) => ({
        label: `${key}`,
        value: `${key}`,
    }));
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Clients"
                            name="customer"
                            value={formData.customer}
                            onChange={handleInputChange}
                            options={clientOptions}
                            isNotMandatory={true}
                            error={errors.customer || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Status"
                            name="invoiceStatus"
                            value={formData.invoiceStatus}
                            onChange={handleInputChange}
                            options={jobStatusOptions}
                            isNotMandatory={true}
                            error={errors.invoiceStatus || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldComponent
                            id="invoiceNumber"
                            name="invoiceNumber"
                            label="Invoice Number"
                            type="text"
                            value={formData.invoiceNumber}
                            onChange={handleInputChange}
                            fullWidth
                            error={errors?.invoiceNumber || ""}
                            isNotMandatory={true}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldComponent
                            id="InvoicePrice"
                            name="InvoicePrice"
                            label="Price"
                            type="text"
                            value={formData.InvoicePrice}
                            onChange={handleInputChange}
                            fullWidth
                            error={errors?.InvoicePrice || ""}
                            isNotMandatory={true}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Currency Code"
                            name="currency"
                            value={formData?.currency}
                            onChange={handleInputChange}
                            options={currencyOptions}
                            searchable={true}
                            isNotMandatory={true}
                            error={errors.currency || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextFieldComponent
                            id="createDateFrom"
                            name="createDateFrom"
                            label="Create Date Start"
                            type="date"
                            value={formData.createDateFrom}
                            onChange={handleInputChange}
                            fullWidth
                            error={errors?.createDateFrom || ""}
                            isNotMandatory={true}

                        />

                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextFieldComponent
                            id="createDateTo"
                            name="createDateTo"
                            label="Create Date End"
                            type="date"
                            value={formData.createDateTo}
                            onChange={handleInputChange}
                            fullWidth
                            error={errors?.createDateTo || ""}
                            isNotMandatory={true}

                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextFieldComponent
                            id="itemDuedateStart"
                            name="itemDuedateStart"
                            label="Due Date Start"
                            type="date"
                            value={formData.itemDuedateStart}
                            onChange={handleInputChange}
                            fullWidth
                            error={errors?.itemDuedateStart || ""}
                            isNotMandatory={true}

                        />

                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextFieldComponent
                            id="itemDuedateEnd"
                            name="itemDuedateEnd"
                            label="Due Date End"
                            type="date"
                            value={formData.itemDuedateEnd}
                            onChange={handleInputChange}
                            fullWidth
                            error={errors?.itemDuedateEnd || ""}
                            isNotMandatory={true}
                        />
                    </Grid>
                </Grid>

                <Grid2 container xs={12} mt={2} spacing={2}>
                    <Btn type="submit">
                        Update Search
                    </Btn>
                    <Btn onClick={handleReset}>
                        Reset Search
                    </Btn>
                </Grid2>
            </form>
        </>
    );
};

export default FormComponent;