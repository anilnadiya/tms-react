import { Grid2 } from '@mui/material';
import React from 'react';
import Btn from '../../../../Components/Ui_elements/Btn';
import DropdownComponent from '../../../../Components/DropdownComponent';
import { Grid } from '@mui/material';
import TextFieldComponent from '../../../../Components/TextFieldComponent';

const FormComponent = ({ formData, handleInputChange, handleReset, handleSubmit, errors, businessUnitOptions, job_summery_contact, job_summery_resource,clientAccount,clients,work_type, job_status,currencyCode }) => {

    const jobContactOptions = job_summery_contact?.map((contact) => ({
        value: contact.iUserId,
        label: `${contact.vUserName}`,
    }))
    const jobResourceOptions = job_summery_resource?.map((resource) => ({
        value: resource.iUserId,
        label: `${resource.vUserName}`,
    }))
    const accountOptions = clientAccount?.map((i) => ({
        label: i.vUserName,
        value: `${i.iClientId}`,
    }));
    const clientOptions = clients?.map((i) => ({
        label: i.vUserName,
        value: `${i.iClientId}`,
    }))
    const worktypeOptions = work_type?.map((i) => ({
        label: i.project_name,
        value: `${i.pr_type_id}`,
    }));
    const jobStatusOptions = job_status?.map((i) => ({
        label: i.job_status_name,
        value: `${i.jb_status_id}`,
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
                            label="Company code (Rights)"
                            name="companyCode"
                            value={formData.companyCode}
                            onChange={handleInputChange}
                            options={businessUnitOptions}
                            isNotMandatory={true}
                            error={errors.companyCode || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Contact Persons (jobs)"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            options={jobContactOptions}
                            isNotMandatory={true}
                            error={errors.contactPerson || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Resources"
                            name="resource"
                            value={formData.resource}
                            onChange={handleInputChange}
                            options={jobResourceOptions}
                            isNotMandatory={true}
                            error={errors.resource || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <DropdownComponent
                            label="Account"
                            name="indirect_customer"
                            value={formData.indirect_customer}
                            onChange={handleInputChange}
                            options={accountOptions}
                            isNotMandatory={true}
                            error={errors.indirect_customer || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
                            label="Project Type"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            options={worktypeOptions}
                            isNotMandatory={true}
                            error={errors.projectType || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Job Status"
                            name="jobStatus"
                            value={formData.jobStatus}
                            onChange={handleInputChange}
                            options={jobStatusOptions}
                            isNotMandatory={true}
                            error={errors.jobStatus || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Scoop Status"
                            name="itemStatus"
                            value={formData.itemStatus}
                            onChange={handleInputChange}
                            options={jobStatusOptions}
                            isNotMandatory={true}
                            error={errors.itemStatus || ""}
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