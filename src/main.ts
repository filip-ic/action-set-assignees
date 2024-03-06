import * as github from '@actions/github';
import * as core from '@actions/core';

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token', { required: true });
    
    const assignee = core.getInput('assignee', { required: true })
    
    const number = github.context.issue.number

    const client = new github.GitHub(githubToken);

    await client.issues.addAssignees({
      assignee,
      issue_number: number
    });
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
