const topicEndPoint = 'Topics';

const readTopicQuestions = (TopicId) => {
    const endPoint = `${topicEndPoint}/${TopicId}/questions`;
    return sendGetRequest(endPoint);
};

