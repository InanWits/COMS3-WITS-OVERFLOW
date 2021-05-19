$(window).on('load', () => {

    const answerHolder = $("#answer-container");
    const questionLbl = $("#question-text");
    const answerInput = $("#in-answer");
    const postAnswerButton = $("#create-answer");

    //retrieve the question from localStorage
    const questionFromStorage = localStorage.getItem(KEY_QUESTION);
    const question = JSON.parse(questionFromStorage);

    questionLbl.text(question.question);

    const addAnswerToContainer = (answer) => {
        const answerItem = $("<div class='answer-view'>");
        answerItem.text(answer.answer);


        const div = $("<div>");
        const label = $("<label class='total'>");
        const upVoteBtn = $("<button class='up'>");
        const downVoteBtn = $("<button class='down'>");

        div.append(label);
        div.append(upVoteBtn);
        div.append(downVoteBtn);

        answerItem.append(div);

        //add answer to the top of the list
        answerHolder.prepend(answerItem);
    };

    readQuestionAnswers(question.question_id).then((answers) => {
        answers.forEach((answer) => {
            addAnswerToContainer(answer);
        });
    });


    //set click listener to post answer button
    postAnswerButton.on("click", () => {
        const answer = answerInput.val().trim();

        if (answer == null || answer === ""){
            alert("Answer required");
        }
        else{
            const answerData = {
                "question_id" : question.question_id,
                "student_id" : localStorage.getItem(KEY_STUDENT_ID),
                "answer" : answer,
                "answer_picture_url": ""
            };

            createAnswer(answerData).then(
                (answerId) => {
                    answerInput.val("");
                    answerData["answer_id"] = answerId;
                    addAnswerToContainer(answerData);
                },
                (err) => {alert(err.responseText);});
        }

    });
});
