# 1. Task

This is a counter that should only display positive numbers, it should increment and decrement when pressed accordingly


- choose a testing e2e framework (recommended cypress)
- apply e2e setup to run a single test:
   - When pressing "increment", verify that counter shows 1
- Create a GitHub Action pipeline, that runs the test on every PR as a "verify" step
- extend the tests:
  - create a test plan (can be a markdown file in the repo under i.e. `test-plan/` ), that covers the edge cases
  - implement some tests of the test-plan
 
All code should be on GitHub, the GH runner should have had at least one successful run.  


### Steps to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npx http-server -p 3000
   ```


# 2. Solution

Implemented Playwright instead of Cypress for several reasons:
1. True Cross-Browser Support: Playwright supports  Chromium, Firefox, and WebKit. 
2. Architectural Flexibility: Playwright's architecture allows it to handle complex scenarios like multiple tabs and cross-origin authentication flows seamlessly. 
3. Performance at Scale: Playwright is renowned for its performance and its powerful, easy-to-configure parallelization, which is very useful for CI/CD pipelines.
4. Superior Debugging for CI: While Cypress is fine for local development, the Playwright Trace Viewer is very powerful for debugging tests that fail in the CI/CD pipeline. 

Set up self-hosted runner for GitHub Workflows:
1. Security: No code, secrets or test results hosted on GitHub cloud
2. GDPR: No risk of giving any data do third parties, even when mostly using mock data
3. Control: Full control over the runner
4. Scalability: Full control over scalability

Set up Page-Object-Model (POM):
1. Maintainability: Element IDs only have to updated in one location
2. Readability: Test cases are easier to understand
3. Productivity: Functions and locators can be reused instead of having to be defined for every use

Set up ES Lint:
1. Static analysis: Catches bugs before they happen
2. Consistency: Enforces consistent code style
3. Educational: Teaches and enforces best practices
4. Automatic fix: Increases developer productivity

Set up allure reports:
1. Visualisation: Better visualisation of test results over playwrights built in reporter
2. Details: More detailed reports of test results
3. Control: More control over report contents and reports structures
4. Exhibits: Failure screenshots and recordings are attached to the allure report

Set up GitHub Pages for the display of reports:
1. Continuity: Every new runs results are deployed to GitHub pages automatically
2. Accessibility: Available to everyone who has the link
3. Overview: No need for sending "spam mails" to stakeholders with every run
4. Cons: Only works for public repos and GitHub enterprise subscription accounts.
   If no subscription, reports can be sent via email or hosted on a local website to ensure confidentiality of content.
   For this interview task a public repository is fine, but wouldn't be secure for a real project.

# 3. Test Plan & Usage

1. Test plan and structure are defined at  `test-plan/test-plan.md`
2. To start workflow, either create a pull request or open workflow "CounterTaskWorkflow" inside Git repo and click "Run Workflow"
3. After "CounterTaskWorkflow" is done, "pages-build-deployment" is triggered automatically to deploy allure report at https://kcmayer4.github.io/task/


# 4. AI

1. Gemini was used to help with spell checking, error analysis as well as npm commands and POM refactoring. 
2. Project structure, tech stack/tools and general approach came from personal experience and were just checked against Gemini to ensure best practices.
3. Gemini was used to ensure the best possible test coverage