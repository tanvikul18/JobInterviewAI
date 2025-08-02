export const BASE_URL = "https://jobinterviewai.onrender.com"

export const API_PATHS = 
{
     AUTH : {
        SIGNUP : "auth/signup",
        LOGIN: "auth/login",
        GET_PROFILE: "auth/profile"
     },
     IMAGE : {
        UPLOAD_IMAGE : "auth/upload-image"
     },
     AI:{
        GENERATE_QUESTIONS : "ai/generate-questions",
        GENERATE_EXPLANATIONS : "ai/generate-explanations"
     },
     SESSION:{
        CREATE : "session/create",
        GET_ALL : "session/get-mysession",
        GET:(id)=>`session/${id}`,
        DELETE:(id)=>`session/${id}`
     },
     QUESTIONS:{
        ADD_TO_SESSION: "question/add",
        PIN: (id)=>`question/pin/${id}`,
        UPDATE_NOTE: (id)=>`question/${id}/note`
     }

}