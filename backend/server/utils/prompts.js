export const questionAnswerPrompt = (role,experience,topicsToFocus,numberOfQuestions)=>{
   return `You are an AI trained to generate technical questions and answers.

    Tasks:
    - Role-${role}
    - Candidate Experience: ${experience} years
    - Focus Topics: ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions.
    - For each question, generate a detailed but beginner-friendly answer.
    - If anaswer needs a code example, add a smallcode block inside.
    - Keep  formatting very clean and clear.
    - Return a pure JSON array like: 
        {
              "question":"Question here?",
              "answer":"Answer here."
        }

       Important : DO NOT add any extra text outside the JSON format. Only return valid JSON format. 
    `
}

export const conceptExplainPromt = (question)=>{
   return `You are an AI trained to generate explanations for aa given interview question.

    Tasks: 

    - Explain the following interview question and its concept in depth as if you're teahing a beginner developer.
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes teh concept for the article or page header.
    - If the explanation includes the code example, provide a small code block.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON object in the following format: 
        {
              "title":"Short title here?",
              "explanation":"Explanation here."
        }

       Important : DO NOT add any extra text outside the JSON format. Only return valid JSON format. 
    `
}