const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

// Бет жүктелгенде сақталған оқушыларды шығару
document.addEventListener('DOMContentLoaded', loadStudents);

// Форма жіберілгенде
studentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const grade = document.getElementById('grade').value;
  const subject = document.getElementById('subject').value;
  const mark = document.getElementById('mark').value;

  const student = { id: Date.now(), name, grade, subject, mark };

  saveStudent(student);
  addStudentToTable(student);

  studentForm.reset();
});

// Кестеге қатар қосу
function addStudentToTable(student) {
  const tr = document.createElement('tr');
  tr.setAttribute('data-id', student.id);
  tr.innerHTML = `
    <td>${student.name}</td>
    <td>${student.grade}</td>
    <td>${student.subject}</td>
    <td><b>${student.mark}</b></td>
    <td><button class="delete-btn" onclick="deleteStudent(${student.id})">Өшіру</button></td>
  `;
  studentList.appendChild(tr);
}

// Деректерді сақтау
function saveStudent(student) {
  let students = getStudentsFromStorage();
  students.push(student);
  localStorage.setItem('students', JSON.stringify(students));
}

// Деректерді оқу (ҚАТЕ ОСЫ ЖЕРДЕ ТҮЗЕЛДІ)
function getStudentsFromStorage() {
  let students = localStorage.getItem('students'); // Дұрысы: localStorage.getItem
  return students ? JSON.parse(students) : [];
}

// Бет ашылғанда жүктеу
function loadStudents() {
  let students = getStudentsFromStorage();
  studentList.innerHTML = '';
  students.forEach(student => addStudentToTable(student));
}

// Өшіру
function deleteStudent(id) {
  let students = getStudentsFromStorage();
  students = students.filter(student => student.id !== id);
  localStorage.setItem('students', JSON.stringify(students));

  const row = document.querySelector(`tr[data-id="${id}"]`);
  if (row) row.remove();
}