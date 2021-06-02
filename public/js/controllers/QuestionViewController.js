$(window).on('load', () => {

    let attachment;
    let answerData;

    const answerHolder = $("#answer-container");
    const questionLbl = $("#question-text");
    const answerInput = $("#output");
    const postAnswerButton = $("#create-answer");
    const inputAttachment = $("#myFile");

    //retrieve the question from localStorage
    const questionFromStorage = localStorage.getItem(KEY_QUESTION);
    const question = JSON.parse(questionFromStorage);

    const answerForm = $("<form action='/Answers' method='post' enctype='multipart/form-data' style='display: none'>");
    const questionId = $("<input type='text' name='question_id'>")
    const studentId = $("<input type='text' name='student_id'>");
    const formAnswer = $("<input type='text' name='answer'>");

    questionId.val(question.question_id);
    studentId.val(localStorage.getItem(KEY_STUDENT_ID));

    answerForm.append(questionId);
    answerForm.append(studentId);
    answerForm.append(formAnswer);

    $('body').append(answerForm);

    answerForm.ajaxForm({
        url: answerForm.attr('action'),
        dataType: 'json',
        success: (answerId) => {
            answerForm.clearForm();
            inputAttachment.val('');
            attachment.remove();
            answerInput.text("");
            answerData["answer_id"] = answerId;
            addAnswerToContainer(answerData);
        }
    })

    questionInfo.text(`Created by: ${question.user_name} at ${question.post_date_time}`);
    questionLbl.text(question.question);
    //display attachment
    let attachmentUrl = question.question_picture_url;
    if (attachmentUrl.trim() !== ""){
        let splittedPath = attachmentUrl.split("/");
        attachmentUrl = BASE_URL + splittedPath[splittedPath.length - 1];

        const aTag = $(`<a href="${attachmentUrl}" style="display: block">`);

        if (attachmentUrl.endsWith("pdf")){
            aTag.text("PDF Attachment");
        }
        else{
            aTag.append($(`<img class="small-image" src="${attachmentUrl}" alt="attachment image">`));
        }

        attachmentHolder.append(aTag);
    }

    const vote = (answerId, voteVal) => {
        const answerData = {
            "student_id" : localStorage.getItem(KEY_STUDENT_ID),
            "rate" : voteVal
        };

        rateAnswer(answerId, answerData).then(
            msg => {
                alert(msg);
            },
            err => alert(err.responseText)
        );
    }

    const addAnswerToContainer = (answer) => {
        const answerItem = $("<div class='answer-view'>");
        answerItem.text(answer.answer);


        const div = $("<div>");
        const label = $("<label class='total'>");
        const upVoteBtn = $("<button class='up'>");
        const downVoteBtn = $("<button class='down'>");

        upVoteBtn.text("up vote");
        downVoteBtn.text("down vote");

        div.append(label);
        div.append(upVoteBtn);
        div.append(downVoteBtn);

        answerItem.append(div);

        //add answer to the top of the list
        answerHolder.prepend(answerItem);

        upVoteBtn.on('click', () => {
            vote(answer.answer_id, 1);
        });

        downVoteBtn.on('click', () => {
            vote(answer.answer_id, -1);
        });
    };

    readQuestionAnswers(question.question_id).then((answers) => {
        answers.forEach((answer) => {
            addAnswerToContainer(answer);
        });
    });


    //set click listener to post answer button
    postAnswerButton.on("click", () => {
        const answer = answerInput.text().trim();

        if (answer == null || answer === "") {
            alert("Answer required");
        } else {
            answerData = {
                "question_id": question.question_id,
                "student_id": localStorage.getItem(KEY_STUDENT_ID),
                "answer": answer,
                "answer_picture_url": ""
            };

            formAnswer.val(answer);
            attachment = inputAttachment.clone(true, true);
            answerForm.append(attachment);
            answerForm.submit();
        }

    });
});
