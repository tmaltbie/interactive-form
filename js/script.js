const form = document.querySelector('form')
form.reset()

const name = document.querySelector('#name') // selects name input field
name.focus() // when page loads, immediately focus name input field

const jobRole = document.querySelector('#title') // reference to job role menu
const otherInput = document.querySelector('#other-title') // reference to text input for the other option
otherInput.style.display = 'none'

jobRole.addEventListener('change', e => { // listener on job role menu, listening for a change
  if (e.target.value === 'other') { // if the target of the change is equal to 'other'
    otherInput.style.display = '' // reveal the text input
  } else {
    otherInput.style.display = 'none' // otherwise, hide the text input
  }
})
const colorDiv = document.querySelector('#colors-js-puns')
const colorSelectElement = document.querySelector('#color') // selects color menu
const colorOptionElements = document.querySelectorAll('#color option') // selects all color options
const pleaseSelect = document.createElement('option') // create new option
pleaseSelect.text = 'Please select a theme' // adds text to new option
pleaseSelect.value = 'please' // sets value
colorSelectElement.appendChild(pleaseSelect) // adds please select to color options
colorSelectElement.insertBefore(pleaseSelect, colorSelectElement.firstElementChild) // makes please select at top of options list
pleaseSelect.selected = true // initially shows please select option on site load
pleaseSelect.hidden = true // makes please select not selectable/not in list

// this function will hide all the t-shirt color options
const hideColorOptions = () => {
  for (let i = 0; i < colorOptionElements.length; i++) {
    colorOptionElements[i].hidden = true
  }
}
hideColorOptions() // call function to hide the colors

/** T-Shirt Selection */
const designSelectElement = document.querySelector('#design') // selects design drop down
const designOptionsElements = document.querySelectorAll('#design option') // selects design options
designOptionsElements[0].hidden = true // makes "select theme" not selectable
colorDiv.hidden = true // initially hides entire color div

// select a theme and show & reset corresponding tshirt designs
designSelectElement.addEventListener('change', () => {
  if (designOptionsElements[1].selected) {
    colorDiv.hidden = false
    hideColorOptions()
    for (let i = 0; i < 3; i++) {
      colorOptionElements[i].hidden = false
      colorOptionElements[0].selected = true
    }
  } else if (designOptionsElements[2].selected) {
    colorDiv.hidden = false
    hideColorOptions()
    for (let i = 3; i < 6; i++) {
      colorOptionElements[i].hidden = false
      colorOptionElements[3].selected = true
    }
  }
})

/** Select Activities Section */
const activities = document.querySelector('.activities') // ref to activities fieldset
const activitiesInput = document.querySelectorAll('.activities input') // get a reference to all the inputs
const activitiesLegend = document.querySelector('.activities legend') // reference to activities legend
let total = 0 // total cost of checked activites
const price = document.createElement('h4') // create header for total $
price.style.display = 'none'
activities.appendChild(price)

// get a reference to the activities fieldset with eventlistener for changes & event
document.querySelector('.activities').addEventListener('change', e => {
  const clicked = e.target
  const clickedDayTime = clicked.getAttribute('data-day-and-time')
  const clickedCost = clicked.getAttribute('data-cost')

  for (let i = 0; i < activitiesInput.length; i++) {
    const checkboxDayTime = activitiesInput[i].getAttribute('data-day-and-time')
    if (clickedDayTime === checkboxDayTime && clicked !== activitiesInput[i]) {
      activitiesInput[i].disabled = true
      if (clicked.checked) {
        activitiesInput[i].disabled = true
      } else {
        activitiesInput[i].disabled = false
      }
    }
  }
  // display total cost of selected activities
  if (clicked.checked) {
    price.style.display = ''
    price.textContent = `Total: $${total = total + parseInt(clickedCost)}`
  } else {
    price.textContent = `Total: $${total = total - parseInt(clickedCost)}`
  }
  if (total === 0) {
    price.style.display = 'none'
  }

  // activities validator
  // if (!clicked.checked) {
  //   activitiesLegend.style.color = 'red'
  // } else {
  //   activitiesLegend.style.color = ''
  // }
})

/** Payment Section */
const payment = document.querySelectorAll('#payment option') // reference to all payment options
payment[0].hidden = true // "select payment method" unselectable

// reference to all payment options:
const creditcard = document.querySelector('#credit-card')
const paypal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')
// hide all the payment options:
creditcard.hidden = true
paypal.hidden = true
bitcoin.hidden = true

// when payment option is selected, show info about that option & hide others
document.querySelector('#payment').addEventListener('change', e => {
  if (payment[1].selected) {
    creditcard.hidden = false
    paypal.hidden = true
    bitcoin.hidden = true
  } else if (payment[2].selected) {
    creditcard.hidden = true
    paypal.hidden = false
    bitcoin.hidden = true
  } else if (payment[3].selected) {
    creditcard.hidden = true
    paypal.hidden = true
    bitcoin.hidden = false
  }
})

/** Validation Section */
const email = document.querySelector('#mail')
const ccNum = document.querySelector('#cc-num')
const ccZip = document.querySelector('#zip')
const ccCVV = document.querySelector('#cvv')

const nameValidator = () => {
  const nameValue = name.value
  if (nameValue !== '' || nameValue === null) {
    name.style.borderColor = 'green'
    return true
  } else {
    name.style.borderColor = 'red'
    name.placeholder = 'please enter your name'
    return false
  }
}

const emailValidator = () => {
  const emailValue = email.value
  const validEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  if (validEmail.test(emailValue)) {
    email.style.borderColor = 'green'
    return true
  } else {
    email.style.borderColor = 'red'
    email.placeholder = 'please enter your email'
    return false
  }
}

const activitiesValidator = () => {
  const noSelectionMessage = document.createElement('div')
  noSelectionMessage.textContent = 'please select at least one activity'
  noSelectionMessage.style.fontStyle = 'italic'
  noSelectionMessage.style.fontSize = '14px'
  noSelectionMessage.style.color = 'red'
  noSelectionMessage.hidden = true
  activitiesLegend.appendChild(noSelectionMessage)
  const activitiesCheckboxes = document.querySelectorAll('.activities input')
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    if (!activitiesCheckboxes[i].checked) {
      activitiesLegend.style.color = 'red'
      noSelectionMessage.hidden = false
    }
  }
}

const creditCardValidator = () => {
  const ccNumValue = ccNum.value
  const ccZipValue = ccZip.value
  const CVVvalue = ccCVV.value
  const validNum = /^\d{13,16}$/
  const validZip = /^\d{5}$/
  const validCVV = /^\d{3}$/

  if (payment[1].selected && validNum.test(ccNumValue)) {
    ccNum.style.borderColor = 'green'
  } else {
    ccNum.style.borderColor = 'red'
    ccNum.placeholder = 'please enter your credit card number'
  }

  if (payment[1].selected && validZip.test(ccZipValue)) {
    ccZip.style.borderColor = 'green'
  } else {
    ccZip.style.borderColor = 'red'
  }

  if (payment[1].selected && validCVV.test(CVVvalue)) {
    ccCVV.style.borderColor = 'green'
  } else {
    ccCVV.style.borderColor = 'red'
  }
}

name.addEventListener('blur', nameValidator)
email.addEventListener('blur', emailValidator)
ccNum.addEventListener('keyup', creditCardValidator)
ccCVV.addEventListener('keyup', creditCardValidator)

form.addEventListener('submit', e => {
  // nameValidator()
  if (!nameValidator()) {
    e.preventDefault()
    name.focus()
  }
  // emailValidator()
  if (!emailValidator()) {
    e.preventDefault()
    email.focus()
  }
  if (!activitiesValidator()) {
    e.preventDefault()
  }
  // creditCardValidator()
  if (!creditCardValidator()) {
    e.preventDefault()
    ccNum.focus()
  }
})