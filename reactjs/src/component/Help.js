import React from 'react'
import { Household } from './HelpSection/Household'

const Help = () => {
  return (
    <div className="flex flex-col justify-center items-center h-max">
      <h2 className="text-black font-extrabold text-center p-3  ">
        Fixing Household in phones and tablets
      </h2>
      <Household />
    </div>
  );
};

export default Help;