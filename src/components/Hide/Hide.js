export default function Hide({ hide, children }) {
  return <div>{hide && children}</div>;
}
