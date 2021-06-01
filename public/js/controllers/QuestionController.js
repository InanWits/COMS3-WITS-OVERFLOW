$(window).on('load', () => {

    //create references to selections
    const selectFaculty = $("#select-faculty");
    const selectSchool = $("#select-school");
    const selectTopic = $("#select-topic");

    const questionsHolder = $("#questions-container");

    const loadQuestionsFromTopic = () => {
        questionsHolder.empty();
        const topicId = selectTopic.val();
        if (topicId != null){
            readTopicQuestions(topicId).then((questions) => {
                questions.forEach((question) => {
                    const questionItem = $('<div class="question-view">');
                    const divPart1 = $('<div class="div-part1">');
                    const divPart2 = $('<div class="div-part2">');

                    questionItem.append(divPart1);
                    questionItem.append(divPart2);

                    const questionDetails = $('<div class="question-details">');
                    const questionText = $('<div class="question-text">');
                    divPart1.append(questionDetails);
                    divPart1.append(questionText);

                    questionDetails.text(`Created by: ${question.user_name} at ${question.post_date_time}`);
                    questionText.text(question.question);

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

                        divPart2.append(aTag);
                    }

                    questionsHolder.append(questionItem);

                    //add click listener to question, to open the QuestionViewPage
                    questionItem.on('click', () => {
                        window.location.href = "QuestionView.html";
                        //save the question in local storage
                        //we'll retrieve it in QuestionView
                        localStorage.setItem(KEY_QUESTION, JSON.stringify(question));
                    });
                });
            })
        }
    };

    const loadTopicsFromSchool = () => {
        selectTopic.empty();
        const schoolId = selectSchool.val();

        readSchoolTopics(schoolId).then((topics) => {
            topics.forEach((topic) => {
                selectTopic.append(new Option(topic.topic, topic.topic_id));
            });

            //load questions from topic by default
            loadQuestionsFromTopic();
        });

        selectTopic.on('change', () => {
            loadQuestionsFromTopic();
        });
    };

    const loadSchoolsFromFaculty = () => {
        //remove all options from school
        selectSchool.empty();

        const facultyId = selectFaculty.val();

        readFacultySchools(facultyId).then((schools) => {
            schools.forEach((school) => {
                selectSchool.append(new Option(school.school_name, school.school_id));
            });

            //load topics by default at the beginning (function needs to be here to load up data after population)
            loadTopicsFromSchool();
        });

        selectSchool.on('change', () => {
            loadTopicsFromSchool();
        });


    };

    //read and populate all faculties
    readAllFaculties().then((faculties) => {
        faculties.forEach((faculty) => {
            selectFaculty.append(new Option(faculty.faculty_name, faculty.faculty_id));
        });

        selectFaculty.on('change', () => {
            loadSchoolsFromFaculty();
        });

        //load schools by default at the beginning
        loadSchoolsFromFaculty();

    });
});
