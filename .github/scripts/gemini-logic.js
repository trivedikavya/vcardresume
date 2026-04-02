const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Octokit } = require("@octokit/rest");
const fs = require("fs");

async function run() {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const projectInfo = fs.readFileSync("projectinfoandgoal.txt", "utf8");
  const { owner, repo } = { owner: "trivedikavya", repo: "vcardresume" }; // Update for your repo
  const issueNumber = process.env.ISSUE_NUMBER;

  const prompt = `Context: ${projectInfo}\nIssue Title: ${process.env.ISSUE_TITLE}\nIssue Body: ${process.env.ISSUE_BODY}\n
  Classify this issue as: Low (3 days), Mid (5 days), High (7 days), or Ignore.
  Respond ONLY in JSON: {"level": "Low|Mid|High|Ignore", "is_ignore": true|false, "reason": "..."}`;

  const result = await model.generateContent(prompt);
  const data = JSON.parse(result.response.text().replace(/```json|```/g, ""));

  // Apply Label
  await octokit.issues.addLabels({ owner, repo, issue_number: issueNumber, labels: [`level:${data.level.toLowerCase()}`] });

  // Post Greeting or Ignore Message
  let message = data.is_ignore 
    ? `Thanks for raising this! This has been marked as out-of-scope for now. Reason: ${data.reason}. Kavya will review this soon.`
    : `This issue is classified as **${data.level} level**. You have ${data.level === 'Low' ? 3 : data.level === 'Mid' ? 5 : 7} days to work on it once assigned!`;

  await octokit.issues.createComment({ owner, repo, issue_number: issueNumber, body: message });
}
run();
