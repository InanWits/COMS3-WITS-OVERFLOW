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
                    questionItem.text(question.question);
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
