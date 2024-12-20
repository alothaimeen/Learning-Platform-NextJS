"use client"; // Mark this as a client component

import { DiscussionEmbed } from "disqus-react";

interface DisqusCommentsProps {
  shortname: string;
  config: {
    url: string;
    identifier: string;
    title: string;
  };
}

const DisqusComments = ({ shortname, config }: DisqusCommentsProps) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4">Комменттер</h3>
      <DiscussionEmbed shortname={shortname} config={config} />
    </div>
  );
};

export default DisqusComments;
