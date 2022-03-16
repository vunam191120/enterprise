import styles from "./table-head.module.css";

function TableHead() {
  return (
    <thead>
      <tr>
        <th>Department Name</th>
        <th>Manager ID</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

export default TableHead;
