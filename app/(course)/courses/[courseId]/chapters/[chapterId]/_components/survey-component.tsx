'use client';

import { Survey, Model } from 'survey-react-ui';
import 'survey-core/defaultV2.min.css';
import { LayeredDarkPanelless } from "survey-core/themes";

const surveyJson1 = {
  title: "LEGO Education SPIKE танысу",
  showProgressBar: "bottom",
  showTimer: true,
  timeLimitPerPage: 60,
  timeLimit: 180,
  firstPageIsStarted: true,
  startSurveyText: "Start Quiz",
  pages: [{
    elements: [{
      type: "html",
      html: "Төмендегі өріске өз атыңызды жазыңыз"
    }, {
      type: "text",
      name: "username",
      titleLocation: "hidden",
      isRequired: true
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "firstq",
      title: "Lego Education Spike жинағы неше бөліктен тұрады?",
      choices: [
        "екі", "үш", "төрт", "бес"
      ],
      correctAnswer: "екі"
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "secondq",
      title: "Бұл жинақта неше қандай моторлар болады?",
      choicesOrder: "random",
      choices: [
        "Кіші және ортаңғы моторлар", "Үлкен және ортаңғы моторлар", "Кіші және үлкен моторлар", "Екі үлкен мотор"
      ],
      correctAnswer: "Үлкен және ортаңғы моторлар"
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "thirdq",
      title: "Жинақтың толық атауы?",
      choicesOrder: "random",
      choices: [
        "lego education ev3",
        "lego arduino uno",
        "lego arduino nano",
        "lego education spike"
      ],
      correctAnswer: "lego education spike"
    }]
  }],
  completedHtml: "<h4>Сіз <b>{questionCount}</b> сұрақтардан <b>{correctAnswers}</b> дұрыс жауап бердіңіз.</h4>",
  completedHtmlOnCondition: [{
    expression: "{correctAnswers} == 0",
    html: "<h4>Өкінішке орай барлық жауаптар дұрыс емес.</h4>"
  }, {
    expression: "{correctAnswers} == {questionCount}",
    html: "<h4>Сіз барлық сұрақтарға дұрыс жауап</h4>"
  }]
};

const surveyJson2 = {
  title: "LEGO Education SPIKE бағдарламасы орнату ",
  showProgressBar: "bottom",
  showTimer: true,
  timeLimitPerPage: 60,
  timeLimit: 120,
  firstPageIsStarted: true,
  startSurveyText: "Start Quiz",
  pages: [{
    elements: [{
      type: "html",
      html: "Төмендегі өріске өз атыңызды жазыңыз"
    }, {
      type: "text",
      name: "username",
      titleLocation: "hidden",
      isRequired: true
    }]
  }, {
    elements: [{
      type: "radiogroup",
      name: "firstq",
      title: "Бағдарламаны қалай жүктейміз?",
      choices: [
        "Google drive", "Github", "Лего Ресми сайтынан", "Yandex disk"
      ],
      correctAnswer: "Лего Ресми сайтынан"
    }]
  },  
  {
    elements: [{
      type: "radiogroup",
      name: "secondq",
      title: "Бағдарламаның тілін қалай ауыстрамыз?",
      choicesOrder: "random",
      choices: [
        "Түзетулер Тіл",
        "Түзетулер Фон",
        "Түзетулер Өзгерту",
        "Түзетулер Компиляция"
      ],
      correctAnswer: "Түзетулер Тіл"
    }]
  }],
  completedHtml: "<h4>Сіз <b>{questionCount}</b> сұрақтардан <b>{correctAnswers}</b> дұрыс жауап бердіңіз.</h4>",
  completedHtmlOnCondition: [{
    expression: "{correctAnswers} == 0",
    html: "<h4>Өкінішке орай барлық жауаптар дұрыс емес.</h4>"
  }, {
    expression: "{correctAnswers} == {questionCount}",
    html: "<h4>Сіз барлық сұрақтарға дұрыс жауап</h4>"
  }]
};

const SurveyComponent = ({ id }: { id: string }) => {

  let surveyJson;
  if (id === "first") {
    surveyJson = surveyJson1;
  }
  else if(id === "second") {
    surveyJson = surveyJson2;
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
