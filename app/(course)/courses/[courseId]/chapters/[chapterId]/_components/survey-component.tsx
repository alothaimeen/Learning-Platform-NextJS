'use client';

import { Survey, Model } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { LayeredDarkPanelless } from "survey-core/themes";

const surveyData: Record<string, { title: string; pages: any[] }> = {
  first: {
    title: "1 сабақ LEGO Education SPIKE танысу ",
    pages: [
      {
        elements: [
          {
            name: "firstq",
            title: "Lego Education Spike жинағы неше бөліктен тұрады?",
            correctAnswer: "екі",
            type: "text"
          },
          {
            name: "secondq",
            title: "Бұл жинақта неше қандай моторлар болады?",
            correctAnswer: "Үлкен және ортаңғы моторлар",
            type: "text"
          },
          {
            name: "thirdq",
            title: "Жинақтың толық атауы?",
            correctAnswer: "lego education spike",
            type: "text"
          },
        ],
        completedHtml: "<h4>Сіз <b>{correctAnswers}</b> <b>{questionCount}</b> сұрақтан дұрыс жауап бердіңіз.</h4>",
        completedHtmlOnCondition: [{
        expression: "{correctAnswers} == 0",
        html: "<h4>Өкінішке орай барлық жауаптарыңыз дұрыс емес шықты</h4>"
      }, {
        expression: "{correctAnswers} == {questionCount}",
        html: "<h4>Сіз барлық сұрақтарға дұрыс жауап бердіңіз</h4>"
      }]
      },
    ],
  },
  second: {
    title: "World Geography",
    pages: [
      {
        elements: [
          {
            type: "radiogroup",
            name: "largestcontinent",
            title: "Which is the largest continent?",
            choices: ["Africa", "Asia", "Europe", "Antarctica"],
            correctAnswer: "Asia",
          },
        ],
        completedHtml: "<h4>Сіз <b>{correctAnswers}</b> <b>{questionCount}</b> сұрақтан дұрыс жауап бердіңіз.</h4>",
        completedHtmlOnCondition: [{
        expression: "{correctAnswers} == 0",
        html: "<h4>Өкінішке орай барлық жауаптарыңыз дұрыс емес шықты</h4>"
      }, {
        expression: "{correctAnswers} == {questionCount}",
        html: "<h4>Сіз барлық сұрақтарға дұрыс жауап бердіңіз</h4>"
      }]
      },
    ],
  },
};

const SurveyComponent = ({ id }: { id: string }) => {
  const surveyJson = surveyData[id];

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
