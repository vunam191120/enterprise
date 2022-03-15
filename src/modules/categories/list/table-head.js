import styles from "./table-head.module.css";

function TableHead() {
  return (
    <thead>
      <tr>
        <th>STT</th>
        <th>Category Name</th>
        <th>Staff ID</th>
        <th>Department ID</th>
        <th>Description</th>
        <th>ACTION</th>
      </tr>
    </thead>
  );
}

export default TableHead;
