interface Job {
  title: string;
  company: string;
  description: string
}

export default function JobPost({ title, company, description }: Job) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{company}</h4>
      <p>{description}</p>
    </div>
  );
}