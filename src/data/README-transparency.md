# Transparency Data Structure

This file contains the data structure for the Transparency page. The data is organized to support multiple years and easy updates.

## Current Status

**All data arrays are currently empty** to reflect the current state of the club - no annual reports have been published yet. The transparency page will show appropriate "coming soon" messages until data is added.

## Data Structure

### YearlyReport
Contains annual activity statistics:
- `year`: The year of the report
- `members`: Number of active members
- `events`: Number of organized events
- `projects`: Number of completed projects
- `competitions`: Number of competition participations

### FinancialData
Contains financial information for each year:
- `year`: The financial year
- `funding`: Object with funding sources (percentages)
  - `universityContribution`
  - `corporateSponsorship`
  - `ownActivities`
  - `donations`
- `expenses`: Object with expense categories (percentages)
  - `eventsAndActivities`
  - `competitions`
  - `projectDevelopment`
  - `equipment`
  - `administration`

### ImpactProject
Contains project information for each year:
- `year`: The project year
- `projects`: Array of projects with:
  - `title`: Project name
  - `description`: Project description
  - `metrics`: Array of achievement metrics

## Empty State Handling

The transparency page gracefully handles empty data by showing:
- **Annual Reports**: "Próximamente" message indicating the first report is being worked on
- **Financial Information**: "Información financiera próximamente" message
- **Projects**: "Proyectos en desarrollo" message

## Usage

The transparency page automatically uses the most recent year's data for financial and project information. To add new data:

1. **Add new annual report**: Add a new entry to the `annualReports` array
2. **Add financial data**: Add a new entry to the `financialData` array
3. **Add project data**: Add a new entry to the `impactProjects` array

## Helper Functions

- `getCurrentYearFinancialData()`: Returns financial data for the current year or `null` if none exists
- `getCurrentYearProjects()`: Returns projects for the current year or `null` if none exists
- `getAvailableYears()`: Returns all available years across all data types
- `hasAnyData()`: Returns `true` if any data exists across all categories

## Example: Adding Your First Data (e.g., 2025)

```typescript
// Add to annualReports
{
  year: 2025,
  members: 50,
  events: 5,
  projects: 2,
  competitions: 1,
}

// Add to financialData
{
  year: 2025,
  funding: {
    universityContribution: 60,
    corporateSponsorship: 20,
    ownActivities: 15,
    donations: 5,
  },
  expenses: {
    eventsAndActivities: 50,
    competitions: 20,
    projectDevelopment: 15,
    equipment: 10,
    administration: 5,
  },
}

// Add to impactProjects
{
  year: 2025,
  projects: [
    {
      title: "First Club Project",
      description: "Description of your first completed project",
      metrics: [
        { label: "People reached", value: "100" },
        { label: "Hours invested", value: "200" },
      ],
    },
  ],
}
```
