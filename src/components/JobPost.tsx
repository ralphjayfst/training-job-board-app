import Job from "@/interfaces/Job"

export default function JobPost({ title, company, description }: Job) {
  return (
    <div>
      <h2>{ title }</h2>
      <h4>{ company }</h4>
      <p>{ description }</p>
    </div>
  );
}