const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

const parseResponse = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = data?.message || "Request failed";
        throw new Error(message);
    }

    return data;
};

export const loginEmployee = async ({ userid, password }) => {
    const response = await fetch(`${API_BASE_URL}/employee/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ userid, password }),
    });

    return parseResponse(response);
};

export const getCurrentUser = async () => {
    const response = await fetch(`${API_BASE_URL}/employee/getuser`, {
        method: "GET",
        credentials: "include",
    });

    return parseResponse(response);
};

export const saveStep1PersonalInfo = async (step1Data) => {
    const body = new FormData();
    body.append("phone", step1Data.phoneWhatsapp || "");
    body.append("dob", step1Data.dateOfBirth || "");
    body.append("gender", step1Data.gender || "");
    body.append("permanentaddress", step1Data.permanentAddress || "");
    body.append("communicationaddress", step1Data.communicationAddress || "");
    body.append("alternatephone", step1Data.phoneWithCode || "");
    body.append("country", step1Data.countryOfCitizenship || "");
    body.append("state", step1Data.stateProvince || "");
    body.append("city", step1Data.city || "");

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/1`, {
        method: "PATCH",
        credentials: "include",
        body,
    });

    return parseResponse(response);
};

export const saveStep2EmergencyInfo = async (step2Data) => {
    const body = new FormData();
    body.append("emergencyname", step2Data.contactName || "");
    body.append("emergencycontact", step2Data.contactPhone || "");
    body.append("emergencyemail", step2Data.contactEmail || "");
    body.append("relation", step2Data.relationship || "");
    body.append("emergencycountry", step2Data.countryOfResidence || "");

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/2`, {
        method: "PATCH",
        credentials: "include",
        body,
    });

    return parseResponse(response);
};

export const saveStep3IdentityInfo = async (step3Data) => {
    const body = new FormData();
    body.append("govid1", step3Data.govIdNumber || "");
    body.append("govid2", step3Data.secondaryIdNumber || "");

    if (step3Data.govIdFile) {
        body.append("govid1image", step3Data.govIdFile);
        body.append("aadharimage", step3Data.govIdFile);
    }

    if (step3Data.secondaryIdFile) {
        body.append("govid2image", step3Data.secondaryIdFile);
        body.append("panimage", step3Data.secondaryIdFile);
    }

    if (step3Data.passportPhoto) {
        body.append("passportimage", step3Data.passportPhoto);
    }

    if (step3Data.studentIdFile) {
        body.append("collegeid", step3Data.studentIdFile);
    }

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/3`, {
        method: "PATCH",
        credentials: "include",
        body,
    });

    return parseResponse(response);
};

export const saveStep4EducationInfo = async (step4Data) => {
    const body = new FormData();
    body.append("highestqualification", step4Data.highestQualification || "");
    body.append("collegename", step4Data.universityName || "");
    body.append("coursename", step4Data.courseName || "");
    body.append("year", step4Data.currentYearSemester || "");
    body.append("expectedgraduation", step4Data.graduationYear || "");

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/4`, {
        method: "PATCH",
        credentials: "include",
        body,
    });

    return parseResponse(response);
};

export const saveStep5ProfileInfo = async (step5Data) => {
    const body = new FormData();
    body.append("github", step5Data.githubProfile || "");
    body.append("portfolio", step5Data.portfolioLink || "");
    body.append("linkedin", step5Data.linkedinUrl || "");
    body.append("expertise", step5Data.areasOfExpertise || "");
    body.append("technical", step5Data.technicalSkills || "");

    const previousExperienceParts = [
        step5Data.orgName ? `Organization: ${step5Data.orgName}` : "",
        step5Data.roleTitle ? `Role: ${step5Data.roleTitle}` : "",
        step5Data.duration ? `Duration: ${step5Data.duration}` : "",
        step5Data.keyResponsibilities ? `Responsibilities: ${step5Data.keyResponsibilities}` : "",
    ].filter(Boolean);

    body.append("previousexperience", previousExperienceParts.join(" | "));

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/5`, {
        method: "PATCH",
        credentials: "include",
        body,
    });

    return parseResponse(response);
};
