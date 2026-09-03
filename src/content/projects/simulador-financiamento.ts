import type { Project } from '../types';

const project: Project = {
  slug: 'simulador-financiamento',
  order: 6,
  featured: false,
  title: {
    pt: 'Simulador de Financiamento Imobiliário',
    en: 'Mortgage Simulator',
  },
  tagline: {
    pt: 'Amortização PRICE e SAC calculadas parcela a parcela em Google Apps Script.',
    en: 'PRICE and SAC amortisation computed instalment by instalment in Google Apps Script.',
  },
  problem: {
    pt: 'Simuladores de banco mostram o resultado final, mas não a composição de juros e amortização de cada parcela — nem permitem comparar os dois sistemas lado a lado.',
    en: 'Bank simulators show the final figure but not how interest and principal split in each instalment — and they do not let you compare both systems side by side.',
  },
  solution: {
    pt: 'Um script em Google Apps Script gera a tabela completa de amortização nos sistemas PRICE e SAC a partir de valor, taxa e prazo, escrevendo o resultado direto na planilha para simulação de cenários.',
    en: 'A Google Apps Script generates the full amortisation schedule for both PRICE and SAC from amount, rate and term, writing the result straight into the spreadsheet for scenario simulation.',
  },
  result: {
    pt: 'Comparação transparente entre os dois sistemas, com juros totais e evolução do saldo devedor visíveis parcela a parcela.',
    en: 'A transparent comparison between both systems, with total interest and outstanding balance visible instalment by instalment.',
  },
  stack: ['Google Apps Script', 'JavaScript', 'Google Sheets'],
  // Repositório ainda privado — descomente quando publicar:
  // repoUrl: '',
};

export default project;
