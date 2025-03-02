import React from 'react';
import TextFieldComponent from '../../../../Components/TextFieldComponent';
import { Grid, Grid2 } from '@mui/material';
import Btn from '../../../../Components/Ui_elements/Btn';
import DropdownComponent from '../../../../Components/DropdownComponent';

const FormComponent = ({ formData, errors, handleInputChange, handleSubmit, dropdownClient, currencyCode, user_manager, work_type, clientAccount, scoop_detail, clients, all_languages,handleReset,company_client_contact, isTrue }) => {


    const businessUnitOptions = dropdownClient?.map((item) => {
        // Parse order_number JSON string safely
        let parsedOrderNumber;
        try {
            parsedOrderNumber = JSON.parse(item.order_number);
        } catch (error) {
            parsedOrderNumber = []; // Fallback to an empty array
        }
        // Ensure the value matches the format of stepperData.vCodeRights
        const value = parsedOrderNumber[0]?.value.replace(/_+$/, "") || "";

        return {
            label: item.name, // Display name in the dropdown
            value: value, // Use the cleaned value for comparison
        };
    });
    const usermanagerOptions = user_manager?.data?.map((i) => ({
        label: i.vUserName,
        value: `${i.iUserId}`,
    }));
    const worktypeOptions = work_type?.map((i) => ({
        label: i.project_name,
        value: `${i.pr_type_id}`,
    }));
    const scoopOptions = scoop_detail?.map((i) => ({
        label: i.item_status_name,
        value: `${i.item_status_id}`,
    }));
    const accountOptions = clientAccount?.map((i) => ({
        label: i.vUserName,
        value: `${i.iClientId}`,
    }));
    const currencyOptions = Object.entries(currencyCode).map(([key, currency]) => ({
        label: `${key}`, // Display "CAD ($)", "EUR (€)", etc.
        value: `${key}`, // Store as "CAD,$", "EUR,€"
    }));
    const languageOptions = all_languages?.map((i) => ({
        label: i.title,
        value: `${i.title}`,
    }))
    const clientOptions = clients?.map((i) => ({
        label: i.vUserName,
        value: `${i.iClientId}`,
    }))
    const contactPersonOptions = company_client_contact?.data?.map((i) => ({
        label: `${i.vFirstName} ${i.vLastName}`,
        value: `${i.iClientId}`,
    }))


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
                            label="Project Manager"
                            name="pm_name"
                            value={formData.pm_name}
                            onChange={handleInputChange}
                            options={usermanagerOptions}
                            isNotMandatory={true}
                            error={errors.pm_name || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Project Manager (Exclude)"
                            name="pm_name_exclude"
                            value={formData.pm_name_exclude}
                            onChange={handleInputChange}
                            options={usermanagerOptions}
                            isNotMandatory={true}
                            error={errors.pm_name_exclude || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldComponent
                            type="text"
                            name="emailSubject"
                            label="Email Subject"
                            value={formData.emailSubject}
                            onChange={handleInputChange}
                            isNotMandatory={true}
                            error={errors.emailSubject || ""}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextFieldComponent
                            type="text"
                            name="itemPonumber"
                            label="PO Number"
                            value={formData.itemPonumber}
                            onChange={handleInputChange}
                            isNotMandatory={true}
                            error={errors.itemPonumber || ""}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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

                    <Grid item xs={12} sm={6}>
                        <DropdownComponent
                            label="Scoop Status"
                            name="itemStatus"
                            value={formData.itemStatus}
                            onChange={handleInputChange}
                            options={scoopOptions}
                            isNotMandatory={true}
                            error={errors.itemStatus || ""}
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
                    <Grid item xs={12} sm={3}>
                        <DropdownComponent
                            label="Contact Person(Client)"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleInputChange}
                            options={contactPersonOptions}
                            error={errors.contactPerson || ""}
                            isNotMandatory={true}
                            disabled = {isTrue}
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
                        <DropdownComponent
                            label="Source Language"
                            name="sourceLanguage"
                            value={formData?.sourceLanguage}
                            onChange={handleInputChange}
                            options={languageOptions}
                            searchable={true}
                            isNotMandatory={true}
                            error={errors.sourceLanguage || ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <DropdownComponent
                            label="Target Language"
                            name="targetLanguage"
                            value={formData?.targetLanguage}
                            onChange={handleInputChange}
                            options={languageOptions}
                            searchable={true}
                            isNotMandatory={true}
                            error={errors.targetLanguage || ""}
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