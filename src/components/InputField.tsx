export function InputField(props: {
  title: string;
  id: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <p className="input-title">{props.title}</p>
      <input id={props.id} type={props.type} placeholder={props.placeholder} />
      <p />
    </div>
  );
}
