## ⚙️ CI/CD & Automation Workflow

### 📌 Project Title
**GitHub Automation Suite for vCard Portfolio**

### 🎯 Objective
To automate repository maintenance, enhance contributor engagement through instant feedback, and enforce high-quality standards for Pull Requests by requiring linked issues for every submission.

### 🛠️ Tools and Technologies
* **GitHub Actions**: Primary automation engine for CI/CD workflows.
* **GitHub Script (v7)**: Used for complex interaction logic within the repository environment.
* **YAML**: Configuration language for defining workflow triggers and jobs.
* **Regex**: Utilized for validating Pull Request descriptions against repository standards.

### 🔄 Project Steps and CI/CD Pipeline Stages

1.  **Issue Greeting Stage**: 
    * **Trigger**: Automatically fires when a new issue is opened.
    * **Focus**: Provides an immediate welcome message to the contributor and sets an expectation for a 24-hour response time.

2.  **Interactive Contact Bot (LinkedIn Bot)**: 
    * **Trigger**: Activated by an `issue_comment` containing the `/linkedin` command.
    * **Focus**: Shares the maintainer's professional contact information on demand to facilitate direct communication regarding specific issues.

3.  **PR Guardian (Validation Stage)**: 
    * **Trigger**: Initiated whenever a new Pull Request is opened.
    * **Validation Logic**: Scans the PR body for keywords like "Fixes #123", "Closes", or "Resolves" to ensure every code change is tied to an existing issue.
    * **Enforcement**: If no link is found, the system issues a warning and automatically closes the PR after a 60-second grace period to maintain repository cleanliness.

### ✅ Expected Outcome
* **Maintainer Efficiency**: Reduced manual overhead for greeting contributors and filtering non-compliant Pull Requests.
* **High Standards**: Guaranteed traceability for every code change, ensuring that all PRs address a documented problem or feature request.
* **Engagement**: A more responsive environment for developers through automated greetings and on-demand contact sharing.
