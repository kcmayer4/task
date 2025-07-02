# Test Plan: Counter Application E2E

## 1. Objective
To verify the functionality of the counter application based on the specified requirements, including the critical business rule that the counter must only display positive numbers (i.e., >= 0).

## 2. In-Scope Scenarios
The automated testing for this application covers the following key areas to ensure comprehensive quality:

*   **Core Functional Validation:** Verifying the basic increment, decrement, and initial state functionalities of the counter.
*   **Business Logic Enforcement:** Testing the critical requirement that the counter cannot be decremented below zero.
*   **Edge Case and User Behavior Analysis:** Simulating advanced user interactions, such as rapid-fire clicks (stress testing) and complex sequences of operations, to check for state-related bugs.
*   **Accessibility (A11y) Compliance:** Ensuring the application is usable by everyone, covering both keyboard-only navigation and support for assistive technologies like screen readers via correct ARIA attributes.
*   **Visual & Responsive Integrity:** Using snapshot testing to lock in the visual appearance and prevent unintended UI regressions on both desktop and mobile viewports.
*   **State Management:** Confirming that the application state behaves as expected during events like a page reload.

## 3. Test Plan & Coverage

The test suite is designed to cover multiple aspects of quality, including functional correctness, edge cases, accessibility, and visual integrity.

| Test Case ID | Category            | Description                                                       | Expected Status         |
|--------------|---------------------|-------------------------------------------------------------------|-------------------------|
| **TC-01**    | Functional          | Verifies the counter displays '0' on initial page load.           | **Passing**             |
| **TC-02**    | Functional          | Verifies a single click on "Increment" changes the counter to '1'.  | **Passing**             |
| **TC-03**    | **Business Logic**      | Verifies the counter cannot be decremented below '0'.             | **Intentionally Failing** |
| **TC-04**    | Functional          | Verifies decrementing from a positive number works correctly.     | **Passing**             |
| **TC-05**    | Functional          | Verifies that multiple increment clicks are handled correctly.    | **Passing**             |
| **TC-06**    | Edge Case           | Verifies the counter correctly handles rapid-fire clicks.         | **Passing**             |
| **TC-07**    | Functional          | Verifies a complex sequence of increments and decrements.         | **Passing**             |
| **TC-08**    | **Accessibility**     | Verifies the counter can be fully operated using only the keyboard. | **Passing**             |
| **TC-09**    | **Accessibility**     | Verifies correct ARIA attributes are present for screen readers.    | **Passing**             |
| **TC-10**   | State Management    | Verifies the counter state correctly resets on page reload.       | **Passing**             |
| **TC-11**   | **Visual Regression** | Verifies the UI matches the approved visual snapshot.             | **Passing**             |
| **TC-12**   | **Responsive**        | Verifies the layout is correct and usable on a mobile viewport.   | **Passing**             |
Initial code review suggests the implementation of the decrement functionality does **not** adhere to the "positive numbers only" requirement. Test case **TC-03** is designed to specifically catch this deviation and is expected to fail against the current codebase, thereby flagging the bug.