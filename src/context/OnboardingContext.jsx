import { createContext, useContext, useEffect, useState } from 'react';

const OnboardingContext = createContext();
const ONBOARDING_STORAGE_KEY = 'emp-onboarding-form-data-v1';

const getInitialFormData = () => {
    const defaultData = {
        step1: {
            fullName: '',
            personalEmail: '',
            phoneWhatsapp: '',
            dateOfBirth: '',
            countryOfCitizenship: '',
            stateProvince: '',
            city: '',
            gender: '',
            permanentAddress: '',
            communicationAddress: '',
            sameAsPermanent: false,
            phoneWithCode: '',
        },
        step2: {
            contactName: '',
            contactPhone: '',
            relationship: '',
            contactEmail: '',
            countryOfResidence: '',
        },
        step3: {
            govIdNumber: '',
            govIdFile: null,
            secondaryIdNumber: '',
            secondaryIdFile: null,
            passportPhoto: null,
            studentIdFile: null,
        },
        step4: {
            highestQualification: '',
            courseName: '',
            universityName: '',
            graduationYear: '',
            currentYearSemester: '',
        },
        step5: {
            areasOfExpertise: '',
            technicalSkills: '',
            orgName: '',
            roleTitle: '',
            duration: '',
            keyResponsibilities: '',
            portfolioLink: '',
            githubProfile: '',
            linkedinUrl: '',
        },
        step6: {
            india: {
                accountHolderName: '',
                ifscCode: '',
                accountNumber: '',
                branchName: '',
                bankName: '',
                upiId: '',
            },
            intl: {
                accountHolderName: '',
                swiftCode: '',
                ibanAccountNumber: '',
                paymentPlatform: '',
                bankName: '',
            },
        },
        step7: {
            laptopAvailability: '',
            primaryDeviceType: '',
            operatingSystem: '',
            internetReliability: '',
            timeZone: '',
            weeklyAvailability: '',
        },
        step8: {
            signature: '',
            fullName: '',
            dateOfSubmission: '',
            agreed: false,
            completionStartedAt: null,
        },
    };

    try {
        const raw = sessionStorage.getItem(ONBOARDING_STORAGE_KEY);
        if (!raw) return defaultData;
        const parsed = JSON.parse(raw);
        return {
            ...defaultData,
            ...parsed,
            step6: {
                ...defaultData.step6,
                ...(parsed.step6 || {}),
                india: {
                    ...defaultData.step6.india,
                    ...((parsed.step6 && parsed.step6.india) || {}),
                },
                intl: {
                    ...defaultData.step6.intl,
                    ...((parsed.step6 && parsed.step6.intl) || {}),
                },
            },
            step8: {
                ...defaultData.step8,
                ...(parsed.step8 || {}),
            },
        };
    } catch {
        return defaultData;
    }
};

export const OnboardingProvider = ({ children }) => {
    const [formData, setFormData] = useState(getInitialFormData);

    useEffect(() => {
        sessionStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(formData));
    }, [formData]);

    /** Update a field in a specific step */
    const updateFormData = (step, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [step]: {
                ...prev[step],
                [field]: value,
            },
        }));
    };

    /** Update nested field (for step6) */
    const updateNestedFormData = (step, parent, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [step]: {
                ...prev[step],
                [parent]: {
                    ...prev[step][parent],
                    [field]: value,
                },
            },
        }));
    };

    const updateStepData = (step, values) => {
        setFormData((prev) => ({
            ...prev,
            [step]: {
                ...prev[step],
                ...values,
            },
        }));
    };

    return (
        <OnboardingContext.Provider
            value={{
                formData,
                updateFormData,
                updateNestedFormData,
                updateStepData,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};

export const useOnboardingContext = () => {
    const context = useContext(OnboardingContext);
    if (!context) {
        throw new Error('useOnboardingContext must be used within OnboardingProvider');
    }
    return context;
};
