const answerEndPoint = 'Answers';

const createAnswer = (AnswerData) => {
    return sendPostRequest(answerEndPoint, AnswerData);

}