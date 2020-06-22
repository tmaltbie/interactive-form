const form = document.querySelector('form')
const name = document.querySelector('#name')
name.focus()

const jobRole = document.querySelector('#title')
const otherInput = document.querySelector('#other-title')
otherInput.style.display = 'none'

jobRole.addEventListener('change', e => {
  if (e.target.value === 'other') {
    otherInput.style.display = ''
  } else {
    otherInput.style.display = 'none'
  }
})

const colorDiv = document.querySelector('#colors-js-puns')
const colorSelectElement = document.querySelector('#color')
const colorOptionElements = document.querySelectorAll('#color option')
const selectError = document.createElement('option')
selectError.text = 'Please select a theme'
selectError.value = 'please'
selectError.selected = true
selectError.hidden = true
colorSelectElement.appendChild(selectError)
colorSelectElement.insertBefore(selectError, colorSelectElement.firstElementChild) // makes please select at top of options list

/**
 * hides all the t-shirt colors
 * simple function to loop through all the t-shirt color options so they cannot be selected
 * invoke the function afterward.
 */
const hideColorOptions = () => {
  for (let i = 0; i < colorOptionElements.length; i++) {
    colorOptionElements[i].hidden = true
  }
}

hideColorOptions()

/** T-Shirt Selection */
const designSelectElement = document.querySelector('#design')
const designOptionsElements = document.querySelectorAll('#design option')
designOptionsElements[0].hidden = true
colorDiv.hidden = true

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
const activities = document.querySelector('.activities')
const activitiesInput = document.querySelectorAll('.activities input')
const activitiesLegend = document.querySelector('.activities legend')
let total = 0
const price = document.createElement('h4')
price.style.display = 'none'
activities.appendChild(price)

activities.addEventListener('change', e => {
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
  if (clicked.checked) {
    price.style.display = ''
    price.textContent = `Total: $${total = total + parseInt(clickedCost)}`
  } else {
    price.textContent = `Total: $${total = total - parseInt(clickedCost)}`
  }
  if (total === 0) {
    price.style.display = 'none'
  }
})

/** Payment Section */
const payment = document.querySelectorAll('#payment option')
payment[0].hidden = true

const creditcard = document.querySelector('#credit-card')
const paypal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')

creditcard.hidden = true
paypal.hidden = true
bitcoin.hidden = true

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

/**
 * nameValidator looks to make sure a name of any kind has been entered into the name field
 * otherwise it will create a placeholder message and create a red border
 */
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

/**
 * emailValidator looks to make sure an email has been entered
 * otherwise it will create a placeholder message and create a red border
 * the regular expression has been adapted from https://www.regular-expressions.info/email.html
 */
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

const noSelectionMessage = document.createElement('div')
noSelectionMessage.textContent = 'please select at least one activity'
noSelectionMessage.style.fontStyle = 'italic'
noSelectionMessage.style.fontSize = '14px'
noSelectionMessage.style.color = 'red'
noSelectionMessage.hidden = true
activitiesLegend.appendChild(noSelectionMessage)

/**
 * activitiesValidator looks to make at least one activity has been selected
 * otherwise it will create div with an error message & change text color to red
 * code adapted from: https://stackoverflow.com/questions/11787665/making-sure-at-least-one-checkbox-is-checked/11788024#11788024
 */
const activitiesValidator = () => {
  const activitiesCheckboxes = document.querySelectorAll('.activities input')
  let isChecked = false
  for (let i = 0; i < activitiesCheckboxes.length; i++) {
    if (activitiesCheckboxes[i].checked) {
      isChecked = true
    }
  }
  if (isChecked) {
    activitiesLegend.style.color = ''
    noSelectionMessage.hidden = true
    return true
  } else {
    activitiesLegend.style.color = 'red'
    noSelectionMessage.hidden = false
    return false
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
ccZip.addEventListener('keyup', creditCardValidator)
activities.addEventListener('change', activitiesValidator)

form.addEventListener('submit', e => {
  if (!nameValidator()) {
    e.preventDefault()
    name.focus()
  }
  if (!emailValidator()) {
    e.preventDefault()
    email.focus()
  }
  if (!activitiesValidator()) {
    e.preventDefault()
  }
  if (!creditCardValidator()) {
    e.preventDefault()
  }
})

// what are these issues appearing in console?
// Unchecked runtime.lastError: The message port closed before a response was received.
// [Violation] Forced reflow while executing JavaScript took 31ms
