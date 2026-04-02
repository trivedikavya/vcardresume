module.exports = async ({ github, context }) => {
  const issues = await github.rest.issues.listForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    state: "open",
  });

  const now = new Date();

  for (const issue of issues.data) {
    if (!issue.assignee) continue;

    const labels = issue.labels.map(l => l.name);
    let limitDays = 0;

    if (labels.includes("level:low")) limitDays = 3;
    else if (labels.includes("level:mid")) limitDays = 5;
    else if (labels.includes("level:high")) limitDays = 7;

    if (limitDays === 0) continue;

    const assignedDate = new Date(issue.updated_at);
    const diffDays = Math.ceil((now - assignedDate) / (1000 * 60 * 60 * 24));

    if (diffDays > limitDays) {
      await github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: issue.number,
        body: `⏰ Deadline exceeded! @${issue.assignee.login}, this issue is being unassigned due to inactivity. It is now open for others!`,
      });

      await github.rest.issues.removeAssignees({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: issue.number,
        assignees: [issue.assignee.login],
      });
      
      await github.rest.issues.addLabels({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: issue.number,
        labels: ["help wanted"],
      });
    }
  }
};
