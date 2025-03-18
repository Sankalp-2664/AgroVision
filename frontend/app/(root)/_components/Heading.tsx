import React from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <section className="bg-white py-[70px] dark:bg-gray-950">
      <div className="mx-auto px-4 sm:container mt-2">
        <div className="border-l-[5px] border-primary pl-5">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Heading;
