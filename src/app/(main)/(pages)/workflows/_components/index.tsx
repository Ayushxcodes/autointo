import React from "react";
import { onGetWorkflows } from "../_actions/workflow-connections";
import WorkflowList from "./WorkflowList";

type Props = {};

const Workflows = async (props: Props) => {
  const workflows = await onGetWorkflows();

  return (
    <div className="relative flex flex-col gap-4">
      <section className="flex flex-col m-2">
        {workflows?.length ? (
          <WorkflowList workflows={workflows} />
        ) : (
          <div className="mt-28 flex text-muted-foreground items-center justify-center">
            No Workflows
          </div>
        )}
      </section>
    </div>
  );
};

export default Workflows;
