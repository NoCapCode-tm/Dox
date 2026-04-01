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
