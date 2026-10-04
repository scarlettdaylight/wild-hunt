import { graphqlQuery, nodes } from "@/lib/graphql";

export type ApplicationStatus =
  "saved" | "applied" | "interview" | "rejected" | "offer";

export type JobApplication = {
  id: string;
  name: string;
  status: ApplicationStatus;
  location: string | null;
  companies: { name: string };
};

type JobApplicationsQuery = {
  job_applicationsCollection: { edges: { node: JobApplication }[] };
};

// No user filter: the "Users can read their own applications" RLS policy
// already limits the rows, and a second copy of that rule here could drift
// from it. `companies` is the foreign key's relation, named after its table.
const JOB_APPLICATIONS_QUERY = /* GraphQL */ `
  query JobApplications {
    job_applicationsCollection(
      orderBy: [{ created_at: DescNullsLast }, { id: DescNullsLast }]
    ) {
      edges {
        node {
          id
          name
          status
          location
          companies {
            name
          }
        }
      }
    }
  }
`;

/**
 * The signed-in user's applications, newest first. Throws if they cannot be
 * loaded; the page's `RetryErrorBoundary` turns that into a retryable message.
 */
export const getJobApplications = async (): Promise<JobApplication[]> => {
  const data = await graphqlQuery<JobApplicationsQuery>(JOB_APPLICATIONS_QUERY);
  return nodes(data.job_applicationsCollection);
};
