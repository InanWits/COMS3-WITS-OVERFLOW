$(window).on('load', () => {

    let selectedFaculty;
    let selectedSchool;
    let selectedTopic;

    //create references to the selected views
    let currentlySelectedFaculty;
    let currentlySelectedSchool;
    let currentlySelectedTopic;

    //create references to holders
    const facultyHolder = $("#faculties-holder");
    const schoolHolder = $("#schools-holder");
    const topicHolder = $("#topics-holder");
    const createTopicBtn = $("#create-topic");
    const createQuestionBtn = $("#create-question");
    const inputQuestion = $("#output");

    const resetSchools = () => {
      selectedSchool = null;
      currentlySelectedSchool = null;
      schoolHolder.empty();
    };

    const resetTopics = () => {
        selectedTopic = null;
        currentlySelectedTopic = null;
        topicHolder.empty();
    }

    const addTopicToView = (topic, setAsSelected = false) => {
        const option = $('<div class="extended-fab">');
        option.text(topic.topic);
        topicHolder.append(option);

        option.on('click', () => {
            if (currentlySelectedTopic != null){
                currentlySelectedTopic.removeClass('extended-fab-selected');
            }

            selectedTopic = topic;
            currentlySelectedTopic = option;
            currentlySelectedTopic.addClass('extended-fab-selected');
        });

        if (currentlySelectedTopic == null || setAsSelected) option.click();
    };

    //loads up topics from the server and displays
    const loadTopicsFromSchool = () => {
        resetTopics();

        readSchoolTopics(selectedSchool.school_id).then((topics) => {
            topics.forEach((topic) => {
                addTopicToView(topic);
            });
        });
    };

    //loads ups schools from the server and displays
    const loadSchoolsFromFaculty = () =>{
        resetSchools();
        resetTopics();

        readFacultySchools(selectedFaculty.faculty_id).then((schools) => {
            schools.forEach((school) => {

                const option = $('<div class="extended-fab">');
                option.text(school.school_name);
                schoolHolder.append(option);

                option.on('click', () => {
                    if (currentlySelectedSchool != null){
                        currentlySelectedSchool.removeClass('extended-fab-selected');
                    }

                    selectedSchool = school;
                    currentlySelectedSchool = option;
                    currentlySelectedSchool.addClass('extended-fab-selected');

                    loadTopicsFromSchool();
                });

                if (currentlySelectedSchool == null) option.click();
            });
        });
    };

    //load up all faculties
    readAllFaculties().then((faculties) => {
       faculties.forEach((faculty) => {
           //dynamically create the extended fab
           const option = $('<div class="extended-fab">');
           option.text(faculty.faculty_name);
           facultyHolder.append(option);

           option.on('click', () => {
               if (currentlySelectedFaculty != null){
                   currentlySelectedFaculty.removeClass('extended-fab-selected');
               }
               //save the selected faculty
               selectedFaculty = faculty;
               currentlySelectedFaculty = option;
               currentlySelectedFaculty.addClass('extended-fab-selected');

               loadSchoolsFromFaculty();
           });

           if (currentlySelectedFaculty == null) option.click();
       });
    });

    //add click listener to create topic
    createTopicBtn.on('click', () => {
        if (selectedSchool == null){
            alert("Select School first");
        }
        else{
            const topic = prompt("Enter topic");
            if (!(topic == null || topic.trim() === "")){
                const topicData = {
                    "school_id" : selectedSchool.school_id,
                    "topic" : topic
                };

                insertTopic(topicData).then((topicId) => {
                    topicData["topic_id"] = topicId;
                    addTopicToView(topicData, true);
                })
            }
        }

    });

    //add click listener to create question button
    createQuestionBtn.on('click', () => {
        const question = inputQuestion.text();
        console.log("question = " + question);

        if (selectedTopic == null){
            alert("Select or create a new topic");
        }
        else if (question === ""){
            alert("input a question");
        }
        else{
            const questionData = {
                "student_id" : localStorage.getItem(KEY_STUDENT_ID),
                "topic_id" : selectedTopic.topic_id,
                "question" : question,
                "question_picture_url" : ""
            };

            createQuestion(questionData).then(
                () => {
                    alert("Question posted successfully");
                    inputQuestion.text("");
                },
                (err) => {
                    alert(err.responseText);
                });
        }
    });
});
