let studentForm = document.getElementById("studentForm");
let studentTable = document.getElementById("studentTable");

let students = JSON.parse(localStorage.getItem("students")) || [];

// Load students when page loads
window.onload = function () {
    displayStudents();
};

// Add student
studentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let dept = document.getElementById("dept").value;
    let email = document.getElementById("email").value;

    let student = {
        name: name,
        roll: roll,
        dept: dept,
        email: email
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    studentForm.reset();
});

// Display students
function displayStudents() {
    studentTable.innerHTML = "";

    students.forEach((student, index) => {
        let row = `
            <tr>
                <td>${student.roll}</td>
                <td>${student.name}</td>
                <td>${student.dept}</td>
                <td>${student.email}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
        studentTable.innerHTML += row;
    });
}

// Delete student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

// Edit student
function editStudent(index) {
    let student = students[index];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("dept").value = student.dept;
    document.getElementById("email").value = student.email;

    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}
