import { ComponentProps } from "react";

const SectionTitle = ({ children, ...props }: ComponentProps<"p">) => {
  return (
    <p className="p mb-3 pl-5 font-bold uppercase" {...props}>
      {children}{" "}
    </p>
  );
};

export default SectionTitle;
