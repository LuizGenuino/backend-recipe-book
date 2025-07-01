import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;

// EXPLICAÇÃO DA TAREFA CRON:
// Tarefas Cron são tarefas agendadas que são executadas periodicamente em intervalos fixos
// Queremos enviar uma solicitação GET a cada 14 minutos para que nossa API nunca fique inativa no Render.com

// Como definir um "Agendamento"?
// Você define um agendamento usando uma expressão cron, que consiste em 5 campos que representam:

//! MINUTO, HORA, DIA DO MÊS, MÊS, DIA DA SEMANA

//? EXEMPLOS E EXPLICAÇÃO:
//* 14 * * * * - A cada 14 minutos
//* 0 0 * * 0 - À meia-noite de todos os domingos
//* 30 3 15 * * - Às 3h30 do dia 15 de cada mês
//* 0 0 1 1 * - À meia-noite de 1º de janeiro
//* 0 * * * * - A cada hora