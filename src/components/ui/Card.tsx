import React from "react";

type CardProps = {
  children: React.ReactNode;
  logo: string;
  title: string;
};

const Card = (props: CardProps): JSX.Element => {
  return (
    <div className="w-full min-h-[520px] bg-white p-6 rounded-xl border shadow-xl space-y-6">
      <div className="border border-gray-300 text-3xl h-16 w-16 rounded-full flex justify-center items-center">
        {props.logo}
      </div>
      <h3 className="text-xl font-bold">{props.title}</h3>
      <div className="space-y-4">{props.children}</div>
    </div>
  );
};

export default Card;
