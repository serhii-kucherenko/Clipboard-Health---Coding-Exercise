# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1: Add a custom id field to the Agent table

- Add a new column "custom_id" to the Agent table in the database
- Update the API to allow Facilities to provide a custom id for an Agent when creating or updating them
- Write unit tests to ensure that the custom id is being saved correctly in the database
- Estimated time/effort: 6 hours

Acceptance criteria:

- The Agent table in the database has a new column "custom_id"
- The API allows Facilities to provide a custom id for an Agent when creating or updating them
- When a custom id is provided for an Agent, it is saved in the "custom_id" column of the Agent table
- Unit tests cover the functionality of the custom id field

Implementation details:

- Modify the Agent table in the database by adding a new column "custom_id" with appropriate data type and length
- Add custom_id to the input validation schema for the API create and update endpoints
- Update the Agent model to include the "custom_id" field
- Modify the Agent repository to update the "custom_id" field in the database
- Write unit tests to ensure that the custom id is being saved and retrieved correctly

Ticket 2: Update getShiftsByFacility to return custom Agent ids

- Update the `getShiftsByFacility` function to join the Agent table with the Shifts table and return the custom_id field from the Agent table instead of the internal id
- Write unit tests to ensure that the custom Agent id is being returned correctly
- Estimated time/effort: 4 hours

Acceptance criteria:

- The `getShiftsByFacility` function joins the Agent table with the Shifts table and returns the custom_id field from the Agent table instead of the internal id
- The custom Agent id is being returned correctly in the result set
- Unit tests cover the functionality of returning the custom Agent id

Ticket 3: Update generateReport to use custom Agent ids

- Update the `generateReport` function to use the custom_id field from the Agent table instead of the internal id to display the Agent id in the report
- Write unit tests to ensure that the custom Agent id is being displayed correctly in the report
- Estimated time/effort: 4 hours

Acceptance criteria:

- The `generateReport` function uses the custom_id field from the Agent table instead of the internal id to display the Agent id in the report
- The custom Agent id is being displayed correctly in the report
- Unit tests cover the functionality of displaying the custom Agent id in the report

Ticket 4: Add custom id field to the API responses

- Update the API responses to include the custom_id field for Agents
- Write unit tests to ensure that the custom id is being returned in the API responses
- Estimated time/effort: 2 hour

Acceptance criteria:

- The API responses for Agents include the custom_id field
- The custom id is being returned in the API responses
- Unit tests cover the functionality of returning the custom id in the API responses

Ticket 5 (Optional): Add a migration script to update existing data

- Write a migration script to update the custom_id field for all existing Agents based on a mapping provided by Facilities
- Estimated time/effort: 3 hours

Acceptance criteria:

- The migration script updates the custom_id field for all existing Agents based on a mapping provided by Facilities
- The custom id is being updated correctly in the Agent table
- Unit tests cover the functionality of updating the custom id for existing Agents
