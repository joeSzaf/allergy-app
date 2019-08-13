const allergyForm = document.querySelector('form')
const givenInput = document.querySelector('#given-input')
const familyInput = document.querySelector('#family-input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

allergyForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const given = givenInput.value
  const family = familyInput.value

  messageOne.textContent = "Loading..."
  messageTwo.textContent = ""

  fetch(`/allergies?given=${given}&family=${family}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else if (data.allergyData.length === 0 ) {
        messageOne.textContent = "There are no allergies on record for this name. Consider searching again."
      } else {
        messageOne.textContent = `${data.patient.givenName} ${data.patient.familyName} has ${data.allergyData.length} allergies:`
        let allergyHTML = ''
        data.allergyData.forEach(item => {
          allergyHTML += `<li>${item[1]} (code: ${item[0]})</li>`
        })
        messageTwo.innerHTML = allergyHTML
      }
    })
  })


})
