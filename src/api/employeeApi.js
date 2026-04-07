const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
const AUTH_TOKEN_KEY = "emp-auth-token";

const parseResponse = async (response) => {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const message = data?.message || "Request failed";
        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
};

/** Get Authorization headers with JWT token */
const getAuthHeaders = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const headers = {};

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
};

/** Store JWT token after login */
const storeAuthToken = (token) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
};

/** Remove JWT token on logout */
export const clearAuthToken = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
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

    const data = await parseResponse(response);
    console.log("🔐 Login Response:", data);

    // Extract token from various possible response locations
    let token = null;
    if (data.data?.token) {
        token = data.data.token;
    } else if (data.message?.token) {
        token = data.message.token;
    } else if (data.token) {
        token = data.token;
    }

    if (token) {
        storeAuthToken(token);
        console.log("✅ Token stored in localStorage");
    } else {
        console.warn("⚠️ No token found in response, will rely on cookies");
    }

    return data;
};

export const getCurrentUser = async () => {
    const response = await fetch(`${API_BASE_URL}/employee/getuser`, {
        method: "GET",
        headers: {
            ...getAuthHeaders(),
        },
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
        headers: {
            ...getAuthHeaders(),
        },
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
        headers: {
            ...getAuthHeaders(),
        },
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
        headers: {
            ...getAuthHeaders(),
        },
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
        headers: {
            ...getAuthHeaders(),
        },
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
    // Backend schema expects an array of objects for professionaldetails.Previousexperience.
    // Multer/append-field can build nested req.body from bracket notation keys.
    body.append("previousexperience[0][companyname]", step5Data.orgName || "");
    body.append("previousexperience[0][role]", step5Data.roleTitle || "");
    body.append("previousexperience[0][duration]", step5Data.duration || "");
    body.append("previousexperience[0][responsibilities]", step5Data.keyResponsibilities || "");

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/5`, {
        method: "PATCH",
        headers: {
            ...getAuthHeaders(),
        },
        credentials: "include",
        body,
    });

    return parseResponse(response);
};

export const saveStep6BankDetails = async (step6Data) => {
    const body = new FormData();

    const hasIndiaData = Object.values(step6Data.india || {}).some((value) => String(value || "").trim().length > 0);
    const hasIntlData = Object.values(step6Data.intl || {}).some((value) => String(value || "").trim().length > 0);

    if (hasIndiaData || !hasIntlData) {
        body.append("personnel", "Indian");
        body.append("acholdername", step6Data.india?.accountHolderName || "");
        body.append("accountno", step6Data.india?.accountNumber || "");
        body.append("ifsc", step6Data.india?.ifscCode || "");
        body.append("bankname", step6Data.india?.bankName || "");
        body.append("branchname", step6Data.india?.branchName || "");
        body.append("upi", step6Data.india?.upiId || "");
        body.append("paymentplatform", "");
    } else {
        body.append("personnel", "International");
        body.append("acholdername", step6Data.intl?.accountHolderName || "");
        body.append("accountno", step6Data.intl?.ibanAccountNumber || "");
        body.append("ifsc", step6Data.intl?.swiftCode || "");
        body.append("bankname", step6Data.intl?.bankName || "");
        body.append("branchname", "");
        body.append("upi", "");
        body.append("paymentplatform", step6Data.intl?.paymentPlatform || "");
    }

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/6`, {
        method: "PATCH",
        headers: {
            ...getAuthHeaders(),
        },
        credentials: "include",
        body,
    });

    return parseResponse(response);
};

export const saveStep7SystemInfo = async (step7Data) => {
    const body = new FormData();
    body.append("devicetype", step7Data.primaryDeviceType || "");
    body.append("operatingsystem", step7Data.operatingSystem || "");
    body.append("laptopavailaibility", step7Data.laptopAvailability || "");
    body.append("internet", step7Data.internetReliability || "");
    body.append("timezone", step7Data.timeZone || "");
    body.append("weeklyavailaibility", step7Data.weeklyAvailability || "");

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/7`, {
        method: "PATCH",
        headers: {
            ...getAuthHeaders(),
        },
        credentials: "include",
        body,
    });

    return parseResponse(response);
};

export const saveStep8Declaration = async (step8Data) => {
    const body = new FormData();
    body.append("signature", step8Data.signature || "");
    body.append("date", step8Data.dateOfSubmission || "");

    const response = await fetch(`${API_BASE_URL}/employee/onboarding/8`, {
        method: "PATCH",
        headers: {
            ...getAuthHeaders(),
        },
        credentials: "include",
        body,
    });

    return parseResponse(response);
};
