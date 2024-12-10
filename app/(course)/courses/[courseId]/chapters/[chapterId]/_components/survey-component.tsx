'use client';

import { Survey, Model } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { LayeredDarkPanelless } from "survey-core/themes";

const surveyJson1 = {
  title: "1 сабақ LEGO Education SPIKE танысу",
  showProgressBar: "bottom",
  showTimer: true,
  timeLimitPerPage: 10,
  timeLimit: 25,
  firstPageIsStarted: true,
  startSurveyText: "Start Quiz",
  pages: [
  {
    elements: [{
      type: "radiogroup",
      name: "firstq",
      title: "Lego Education Spike жинағы неше бөліктен тұрады?",
      choices: [
        "үш", "екі", "төрт", "бес"
      ],
      correctAnswer: "екі"
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
  completedHtml: "<h4>Сіз <b>{questionCount}</b> сұрақтардан <b>{correctAnswers}</b> жауап дұрыс бердіңіз.</h4>",
  completedHtmlOnCondition: [{
    expression: "{correctAnswers} == 0",
    html: "<h4>Өкінішке орай барлық жауаптар дұрыс емес.</h4>"
  }, {
    expression: "{correctAnswers} == {questionCount}",
    html: "<h4>Сіз барлық сұрақтарға дұрыс жауап бердіңіз</h4>"
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
