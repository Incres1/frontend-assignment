import React from "react";
import DemoForm from "./demo-form";


const Demo = () => {
  return (
    <div className="p-24">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-center text-eminence-default">
          Demo
        </h1>

        <p>
          This is the demo page. It contains a form that shows you how to use
          the framework and tools we use at Excelerate.
        </p>
      </div>

      <div className="mt-24 mx-auto w-full max-w-md">
        <DemoForm />
      </div>
    </div>
  );
};

export default Demo;
