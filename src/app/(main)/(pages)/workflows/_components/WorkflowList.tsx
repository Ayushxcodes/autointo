"use client";

import Workflow from "./workflow";

export default function WorkflowList({ workflows }) {
  return (
    <>
      {workflows.map((flow: any) => (
        <Workflow key={flow.id} {...flow} />
      ))}
    </>
  );
}
