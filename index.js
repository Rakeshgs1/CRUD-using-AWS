const userDetails = {
  first_name: '',
  last_name: ''
};

let table, tableData;

function saveData() {

  userDetails.first_name = document.getElementById("firstName").value;
  userDetails.last_name = document.getElementById("lastName").value;

  console.log(userDetails);
  console.log(document.getElementById("UI1").value);

  if (document.getElementById("UI1").value) {
    update()
  }
  else {
    fetch('https://dtzym3wsd8.execute-api.us-east-1.amazonaws.com/Testing/details', {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        // table.destroy();
        getData();
      }
      )
  }
}



$(document).ready(function () {
  // Initialize DataTable
  getData();

});

const generateTable = (jsonData) => {
  console.log("JD", jsonData);

  $.fn.dataTable.ext.errMode = 'none';

  table = $("#myTable").DataTable({
    destroy: true,
    data: jsonData,
    columns: [
      { data: "first_name" },
      { data: "last_name" },
      {
        "render": function (data, type, full) {
          return '<button data-id=' + full.user_id + ' onclick="getId(this)" class="btn btn-outline-primary btn-sm">Edit</button> <button data-id=' + full.user_id + ' onclick="delId(this)" class="btn btn-outline-danger btn-sm">Delete</button>';
        },
      },
    ],
  });


}

function getId(id) {
  console.log("id", id);
  var userId = id.getAttribute("data-id");

  let userData = tableData.filter(element => element.user_id == userId);

  console.log("userData", userData);

  document.getElementById("firstName").value = userData[0].first_name;
  document.getElementById("lastName").value = userData[0].last_name;
  document.getElementById("UI1").value = userId;
}

function delId(id) {
  console.log("Did", id);
  var userId = id.getAttribute("data-id");
  let userData = tableData.filter(element => element.user_id == userId);

  console.log("userData", userData);
  console.log("not hidden", userDetails);

  fetch('https://dtzym3wsd8.execute-api.us-east-1.amazonaws.com/Testing/details/' + userId, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      getData();
    });

}


async function getData() {

  // table = $("#myTable").DataTable({
  //   columns: [
  //     { data: "user_id" },
  //     { data: "last_name" },
  //     { data: "first_name" },

  //   ],
  //   "bDestory":true
  // });


  // Fetch data and add to DataTable
  await fetch("https://dtzym3wsd8.execute-api.us-east-1.amazonaws.com/Testing/details")
    .then((response) => response.json())
    .then((data) => {
      // Add data to DataTable

      tableData = data.body.GetAllData;

      console.log('tableData', tableData);
      let statactive = tableData.filter(element => element.user_status == "Active");
      generateTable(statactive);
      // $("#myTable").DataTable().rows.add(data.body.Getalldata).draw();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function update() {
  userDetails.user_id = document.getElementById("UI1").value;
  console.log("not hidden", userDetails);
  fetch('https://dtzym3wsd8.execute-api.us-east-1.amazonaws.com/Testing/details', {
    method: 'PATCH',
    body: JSON.stringify(userDetails),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      // table.destroy();
      getData();
    });

}


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')
  let a=document.getElementById('btn-save');
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      a.addEventListener('click', function (event) {
        alert()
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()