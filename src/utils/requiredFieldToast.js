import { toast } from 'react-hot-toast';

export const getMissingRequiredFieldLabels = (form, requiredFields) =>
    requiredFields
        .filter(({ key }) => {
            const value = form?.[key];
            return typeof value === 'string' ? !value.trim() : !value;
        })
        .map(({ label }) => label);

export const showMissingRequiredFieldsToast = (form, requiredFields) => {
    const missingFieldLabels = getMissingRequiredFieldLabels(form, requiredFields);

    if (missingFieldLabels.length === 0) {
        return [];
    }

    toast.error('Please fill the required fields');
    return missingFieldLabels;
};