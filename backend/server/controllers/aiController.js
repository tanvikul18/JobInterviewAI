import {GoogleGenAI} from "@google/genai"
import {questionAnswerPrompt,conceptExplainPromt} from "../utils/prompts.js"

const ai = new GoogleGenAI({apiKey : "AIzaSyCQ3DflJMTTvmvupfcf_EZbYN5v2OmMhPw"})

export const generateInterviewQuestion = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    //console.log(role, experience, topicsToFocus, numberOfQuestions)
    // if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
    //   return res.status(400).json({ message: "Missing required field" });
    // }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
    //console.log("Prompt:", prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    //console.log("Raw AI response:", response);

    let rawText = response.text; // May need adjustment
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);
    res.status(200).json(data);
  } catch (err) {
    console.error("Error generating questions:", err.message);
    res.status(500).json({ message: err.message });
  }
};


export const generateConceptExplanation=async(req,res)=>{
  try{
    const {question} = req.body;
    if(!question)
         return res.status(404).json({message : "No question found"})
    const prompt = conceptExplainPromt(question);
   // console.log("Prompt",prompt)
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt
    })
  //console.log(response)
    let rawText = response.text;
    const cleanedText = rawText.replace(/^```json\s*/,"").replace(/```$/,"").trim()
     const data = JSON.parse(cleanedText)
     res.status(200).json(data)
  }
  catch(error){
     res.status(500).json({message:error.message})
  }
}