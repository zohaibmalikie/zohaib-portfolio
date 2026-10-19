# One-workflow automation health check

A practical worksheet by Muhammad Zohaib Ramzan.
Source: https://www.zohaibramzan.com/tools

Use one copy per workflow. Keep passwords, tokens and personal customer data out of this worksheet. Use record references or synthetic examples.

## 1. Define the outcome

- Workflow name:
- Business owner:
- Technical owner:
- Connected tools:
- Trigger and expected schedule:
- Successful destination outcome:
- Acceptable completion delay:
- Approximate eligible records per month:

## 2. Trace representative records

Choose normal, incomplete, duplicate and failed examples. For each one, record the source identifier, expected destination, actual destination, completion time, and unresolved work. A successful execution does not by itself prove that the business outcome occurred.

## 3. Review the failure surfaces

- [ ] Required fields are validated before external actions.
- [ ] Repeated delivery cannot repeat the intended business action.
- [ ] Concurrent copies are protected by an appropriate atomic claim or provider control.
- [ ] Uncertain writes are reconciled before replay.
- [ ] Temporary errors use bounded retry and appropriate pacing.
- [ ] Invalid records enter a visible exception queue with an owner.
- [ ] Alerts identify the workflow, record reference, reason, and next action.
- [ ] Missing expected activity and delayed work are monitored.
- [ ] Credential ownership and reconnection responsibility are documented.
- [ ] Only information necessary for the task is sent to AI or other services.
- [ ] Execution history and alerts do not retain unnecessary sensitive data.
- [ ] AI calls, input size, retries, and operating cost have a measurable purpose.
- [ ] A responsible person can pause and recover the workflow.

## 4. Prioritize each finding

- Observation and evidence:
- Business impact:
- Confirmed behavior or unverified question:
- Recommended repair:
- Owner:
- Acceptance check:
- Scope and dependencies:

Example: a timed-out CRM create request may already have created the contact. Verify destination state by source identifier before sending another create. Replaying a synthetic enquiry should leave one contact and an auditable completion record.

## 5. Verify recovery

Rehearse a controlled failure, confirm the alert arrives, reconcile already completed actions, replay a safe sample, and inspect the actual destination result. Update the runbook with the steps that worked.

This worksheet is an engineering review aid, not a certification, security assessment, legal compliance determination or guarantee of reliability.

Need help applying it? https://www.zohaibramzan.com/services/ai-automation-health-check
