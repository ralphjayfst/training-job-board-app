import { Moment } from "moment";

interface Job {
  id: string,
  title: string;
  company: string;
  description: string;
  is_active: boolean;
  job_responsibilities: string[];
  applied_date: Moment | null
}

export default Job