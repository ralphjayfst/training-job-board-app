import { Moment } from "moment";

interface Job {
  title: string;
  company: string;
  description: string;
  isActive: boolean;
  job_responsibilities: string[];
  applied_date: Moment | null
}

export default Job