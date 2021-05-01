const questionEndPoint = 'Questions';

const createQuestion = (QuestionData) => {
    return sendPostRequest(questionEndPoint, QuestionData);

}