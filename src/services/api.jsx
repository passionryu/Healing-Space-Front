export const signup = async (formData) => {
    alert("formData:" + JSON.stringify(formData));
    console.log("Sending data to backend:", formData); // 추가한 로그
    try {
        alert("before axios");
        const response = await axios.post("http://localhost:8080/member/register", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        alert("after");
        console.log("Response:", response.data);
    } catch (error) {
        alert("error");
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);
    }
    
};
