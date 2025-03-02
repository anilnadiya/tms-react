import { Grid2 } from '@mui/material';
import React from 'react';
import Btn from '../../../../Components/Ui_elements/Btn';
import DropdownComponent from '../../../../Components/DropdownComponent';
import { Grid } from '@mui/material';
import TextFieldComponent from '../../../../Components/TextFieldComponent';

const FormComponent = ({ formData, handleInputChange, handleReset, handleSubmit, errors, job_summery_resource }) => {

    const job_status = ['Open', 'Approved', 'Partly Paid', 'Paid', 'Complete', 'Overdue', 'Cancel']

    const jobStatusOptions = job_status?.map((i) => ({
        label: i,
        value: `${i}`,
    }))
    const jobResourceOptions = job_summery_resource?.map((resource) => ({
        value: resource.iUserId,
        label: `${resource.vUserName}`,
    }))

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Resources"
                            name="freelanceName"
                            value={formData.freelanceName}
                            onChange={handleInputChange}
                            options={jobResourceOptions}
                            isNotMandatory={true}
                            error={errors.freelanceName || ""}
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
                    <Grid item xs={12} sm={3}>
                        <TextFieldComponent
                            id="paymentDateFrom"
                            name="paymentDateFrom"
                            label="Payment Date Start"
                            type="date"
                            value={formData.paymentDateFrom}
                            onChange={handleInputChange}
                            fullWidth
                            error={errors?.paymentDateFrom || ""}
                            isNotMandatory={true}

                        />

                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextFieldComponent
                            id="paymentDateTo"
                            name="paymentDateTo"
                            label="Payment Date End"
                            type="date"
                            value={formData.paymentDateTo}
                            onChange={handleInputChange}
                            fullWidth
                            error={errors?.paymentDateTo || ""}
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