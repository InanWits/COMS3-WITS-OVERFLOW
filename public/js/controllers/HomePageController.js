$(window).on('load', () => {

    const facultyContainer = $('#faculty-container');

    readAllFaculties().then((faculties) => {

        faculties.forEach((faculty) => {
            const facultyItem = $('<div class="card-view">');
            const facultyName = $('<p>');

            facultyName.text(faculty.faculty_name);
            facultyItem.append(facultyName);

            facultyContainer.append(facultyItem);
        });

    });

});
