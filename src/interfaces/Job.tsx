interface Job {
  title: string;
  company: string;
  description: string;
  isActive: boolean;
  job_responsibilities: string[];
  applied_date: string | null
}

export default Job