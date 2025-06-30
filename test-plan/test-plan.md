# Test Plan: Counter Application E2E

## 1. Objective
To verify the functionality of the counter application based on the specified requirements, including the critical business rule that the counter must only display positive numbers (i.e., >= 0).

## 2. In-Scope Scenarios

| Test Case ID | Scenario Description | Expected Result | Priority |
| :--- | :--- | :--- | :--- |
| **TC-01** | **Initial State** | The counter should display '0' on page load. | High |
| **TC-02** | **Single Increment** | Clicking the 'Increment' button should change the display from '0' to '1'. | High |
| **TC-03** | **Decrement Boundary (Requirement Check)** | Clicking the 'Decrement' button when the counter is '0' should have no effect. The counter must remain '0' as per the "positive numbers only" rule. | High |
| **TC-04** | **Standard Decrement** | After incrementing to '2', clicking 'Decrement' once should result in a display of '1'. | Medium |
| **TC-05** | **Multiple Increments** | Clicking 'Increment' three times consecutively should result in the counter displaying '3'. | Medium |

## 3. Out-of-Scope
-   UI/Visual Regression Testing.
-   Load/Performance Testing.
-   Accessibility Testing.

## 4. Key Finding
Initial code review suggests the implementation of the decrement functionality does **not** adhere to the "positive numbers only" requirement. Test case **TC-03** is designed to specifically catch this deviation and is expected to fail against the current codebase, thereby flagging the bug.