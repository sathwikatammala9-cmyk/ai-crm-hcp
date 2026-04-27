export default function InteractionForm() {
  return (
    <div style={{ width: "60%" }}>
      <h3>Log HCP Interaction</h3>

      <input placeholder="HCP Name" /><br /><br />
      <input placeholder="Hospital" /><br /><br />
      <input placeholder="Interaction Type" /><br /><br />
      <textarea placeholder="Notes"></textarea>
    </div>
  );
}