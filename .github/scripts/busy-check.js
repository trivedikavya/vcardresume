module.exports = async ({ github, context }) => {
  const commenter = context.actor;

  const assignedIssues = await github.rest.issues.listForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    assignee: commenter,
    state: "open",
  });

  if (assignedIssues.data.length > 0) {
    const issueNum = assignedIssues.data[0].number;
    await github.rest.issues.createComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: context.issue.number,
      body: `⚠️ @${commenter}, you already have an open task (Issue #${issueNum}). Please complete it before taking a new one!`,
    });
    return false; // Stop assignment
  }

  // If clear, assign the user
  await github.rest.issues.addAssignees({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    assignees: [commenter],
  });
  
  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body: `✅ Assigned to @${commenter}! You have your deadline based on the issue level. Good luck!`,
  });
};
