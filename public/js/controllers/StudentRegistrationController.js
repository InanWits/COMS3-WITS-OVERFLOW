$(window).on('load', () => {

   const regForm = $('#reg-form');

   regForm.on('submit', (event) => {
       event.preventDefault();

       //get all form data
       const data = new FormData(event.target);
       //get all data in json object
       const studentData = Object.fromEntries(data.entries());

       //we get a promise after the request
       registerStudent(studentData).then(
           () => { //promise kept
               location.href = "../index.html";
           },
           (err) => { //promise broken
               alert(err.responseText);
               console.log(err);
           }
       );
   });

});
