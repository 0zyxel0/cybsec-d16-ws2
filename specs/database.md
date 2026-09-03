````markdown
# NocoDB Database Structure

## Students

| Field | Type / Notes |
|--------|--------------|
| Id | Primary Key |
| CreatedAt | System |
| UpdatedAt | System |
| nc_created_by | System |
| nc_updated_by | System |
| nc_order | System |
| __nc_deleted | System |
| nc_row_meta | System |
| Title | Text |
| Email | Email |
| MobileNumber | Text |
| Birthdate | Date |
| GivenName | Text |
| Middlename | Text |
| FamilyName | Text |
| Gender | Text |
| CivilStatus | Text |
| TesdaLearnersId | Text |
| StudentNumber | Text |
| Class Number | Text |
| Resume | Attachment |
| ResumeComment | Long Text |
| RequestResumeReview | Boolean |
| Current Job Offer | Text |
| Employment Status | Single Select (Employed, Internship, Self-employed, Seeking Opportunities) |
| Password | Text |
| RqmCode | Text |
| Profile Picture | Attachment |
| PostalCode | Text |
| Street | Text |
| City | Text |
| Province | Text |
| Classroom | Many-to-Many → Classrooms |
| Requirements | Many-to-Many → Assignments |
| Submissions | Many-to-Many → Submissions |
| Activity | Many-to-Many → Activities |
| Feedback | Many-to-Many → Feedback |
| isStaff | Boolean |
| resetPassword | Boolean |
| resetPasswordToken | Text |



## Classrooms

| Field | Type / Notes |
|--------|--------------|
| Id | Primary Key |
| CreatedAt | System |
| UpdatedAt | System |
| Title | Text |
| Course Name | Text |
| Batch Number | Text |
| Start Date | Date |
| End Date | Date |
| Is Active | Boolean |
| Student | Many-to-Many → Students |
| Assignment | Many-to-Many → Assignments |
| Notifications | Many-to-Many → Notification |
| Activity | Many-to-Many → Activities |
| Feedback | Many-to-Many → Feedback |
| Class File | Many-to-Many → Class Files |
---

## Activities

| Field | Type / Notes |
|--------|--------------|
| Id | Primary Key |
| CreatedAt | System |
| UpdatedAt | System |
| Title | Text |
| Description | Long Text |
| Payload | JSON / Long Text |
| Score | Number |
| Retries | Number |
| Student | Many-to-One → Students |
| Classroom | Many-to-Many → Classrooms |
| Requirement | Many-to-Many → Assignments |


# Entity Relationship Overview

```text
Students
├── belongs to many → Classrooms
├── has many → Assignments
├── has many → Activities
├── has many → Submissions
└── has many → Feedback

Classrooms
├── has many → Students
├── has many → Assignments
├── has many → Activities
├── has many → Notifications
├── has many → Feedback
└── has many → Class Files

Assignments
├── belongs to many → Classrooms
├── belongs to many → Students
└── belongs to many → Activities

Activities
├── belongs to many → Students
├── belongs to many → Classrooms
└── belongs to many → Assignments

Submissions
└── belongs to many → Students

Notification
└── belongs to many → Classrooms

Class Files
└── belongs to many → Classrooms

Feedback
├── belongs to many → Students
└── belongs to many → Classrooms
```
````
