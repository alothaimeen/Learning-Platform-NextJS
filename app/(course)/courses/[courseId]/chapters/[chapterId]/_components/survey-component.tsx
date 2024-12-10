'use client';

import { Survey, Model } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { LayeredDarkPanelless } from "survey-core/themes";

const surveyJson1 = {
  title: "American History",
  showProgressBar: "bottom",
  showTimer: true,
  timeLimitPerPage: 10,
  timeLimit: 25,
  firstPageIsStarted: true,
  startSurveyText: "Start Quiz",
  pages: [{
    elements: [{
      type: "html",
      html: "You are about to start a quiz on American history. <br>You will have 10 seconds for every question and 25 seconds to end the quiz.<br>Enter your name below and click <b>Start Quiz</b> to begin."
    }, {
      type: "text",
      name: "username",
      titleLocation: "hidden",
      isRequired: true
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "civilwar",
      title: "When was the American Civil War?",
      choices: [
        "1796-1803", "1810-1814", "1861-1865", "1939-1945"
      ],
      correctAnswer: "1861-1865"
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "libertyordeath",
      title: "Whose quote is this: \"Give me liberty, or give me death\"?",
      choicesOrder: "random",
      choices: [
        "John Hancock", "James Madison", "Patrick Henry", "Samuel Adams"
      ],
      correctAnswer: "Patrick Henry"
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "magnacarta",
      title: "What is Magna Carta?",
      choicesOrder: "random",
      choices: [
        "The foundation of the British parliamentary system",
        "The Great Seal of the monarchs of England",
        "The French Declaration of the Rights of Man",
        "The charter signed by the Pilgrims on the Mayflower"
      ],
      correctAnswer: "The foundation of the British parliamentary system"
    }]
  }],
  completedHtml: "<h4>You got <b>{correctAnswers}</b> out of <b>{questionCount}</b> correct answers.</h4>",
  completedHtmlOnCondition: [{
    expression: "{correctAnswers} == 0",
    html: "<h4>Unfortunately, none of your answers are correct. Please try again.</h4>"
  }, {
    expression: "{correctAnswers} == {questionCount}",
    html: "<h4>Congratulations! You answered all the questions correctly!</h4>"
  }]
};


const SurveyComponent = ({ id }: { id: string }) => {

  let surveyJson;
  if (id === "first") {
    surveyJson = surveyJson1;
  }

  if (!surveyJson) {
    return <h1>Survey not found for ID: {id}</h1>;
  }

  const survey = new Model(surveyJson);
  survey.applyTheme(LayeredDarkPanelless);

  survey.onComplete.add((sender) => {
    console.log(`Survey results for ID ${id}:`, sender.data);
  });

  return (
    <div style={{ padding: "20px", backgroundColor: "#1f1f1f", color: "#fff" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{surveyJson.title}</h1>
      <Survey model={survey} />
    </div>
  );
};

export default SurveyComponent;
