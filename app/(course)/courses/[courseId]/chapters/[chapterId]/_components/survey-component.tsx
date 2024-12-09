'use client';

import { Survey, Model } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';

const surveyJson = {
  title: "Customer Feedback",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "question1",
          title: "What is your name?",
        },
        {
          type: "rating",
          name: "question2",
          title: "How would you rate our service?",
          rateValues: [1, 2, 3, 4, 5],
        },
      ],
    },
  ],
};

const SurveyComponent = () => {
  const survey = new Model(surveyJson);

  survey.onComplete.add((sender) => {
    console.log("Survey results: ", sender.data);
  });

  return (
    <div>
      <h1>Survey</h1>
      <Survey model={survey} />
    </div>
  );
};

export default SurveyComponent;
