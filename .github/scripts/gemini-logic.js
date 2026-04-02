const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

async function run() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const projectInfo = fs.readFileSync("projectinfoandgoal.txt", "utf8");
  const issueTitle = process.env.ISSUE_TITLE;
  const issueBody = process.env.ISSUE_BODY;

  const prompt = `
    You are an expert open-source maintainer. Based on the project info below, classify the new issue.
    
    PROJECT INFO:
    ${projectInfo}
    
    ISSUE:
    Title: ${issueTitle}
    Body: ${issueBody}
    
    RULES:
    - Respond ONLY with a JSON object.
    - Classification must be one of: "Low", "Mid", "High", or "Ignore".
    - Deadline days: Low=3, Mid=5, High=7.
    - If Ignore, provide a reason.
    
    JSON format: {"level": "...", "days": ..., "is_ignore": boolean, "reason": "..."}
  `;

  const result = await model.generateContent(prompt);
  const response = JSON.parse(result.response.text());
  
  // Logic to apply labels and comment via GitHub API would follow here in the workflow
  console.log(JSON.stringify(response));
}

run();
