// console.log('looping')



$("#signup-button").on('click', function () {
  let username = $("#userEmail").val().trim()
  localStorage.setItem('username', username)
})

$("#login-button").on('click', function () {
  console.log('checked')
  let username = $("#loginEmail").val().trim()
  localStorage.setItem('username', username)
})

$("#login-fail-button").on('click', function () {
  console.log('checked')
  let username = $("#loginEmail").val().trim()
  localStorage.setItem('username', username)
})

