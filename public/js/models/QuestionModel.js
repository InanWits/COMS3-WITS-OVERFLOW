const questionEndPoint = 'Questions';

const createQuestion = (QuestionData) => {
    return sendPostRequest(questionEndPoint, QuestionData);
}

const readQuestionAnswers = (questionId) => {
    const endPoint = `${questionEndPoint}/${questionId}/answers`;
    return sendGetRequest(endPoint);
}
