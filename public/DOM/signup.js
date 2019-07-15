// console.log('looping')



$("#signup-button").on('click', function () {
  let username = $("#userEmail").val().trim()
  localStorage.setItem('username', username)
})

