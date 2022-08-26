import { execute, query } from "./query";

export async function getQuestions(): Promise<Array<any>> {
    return await query("select * from question");
}

export async function addQuestion(question: string, answer: string, adder: string) {
    return await execute(`insert into question(question, answer, adder) VALUES ('${question}', '${answer}', ${adder})`)
}

export async function findQuestion(question: string) {
    return await query(`select * from question where question = '${question}'`);
}

export async function deleteQuestion(question: string) {
    return await query(`delete from question where question = '${question}'`);
}

export async function updateQuestion(question: string, answer: string) {
    return await query(`update question set answer='${answer}' where question = '${question}'`);
}