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
// selectError.value = 'please'
selectError.selected = true
selectError.hidden = true
colorSelectElement.appendChild(selectError)
colorSelectElement.insertBefore(selectError, colorSelectElement.firstElementChild)

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
designOptionsElements[0].disabled = true
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
  const activity = e.target
  const activityTime = activity.getAttribute('data-day-and-time')
  const activityCost = activity.getAttribute('data-cost')

  for (let i = 0; i < activitiesInput.length; i++) {
    const checkboxDayTime = activitiesInput[i].getAttribute('data-day-and-time')
    const activityDescription = document.querySelectorAll('.activities label')
    if (activityTime === checkboxDayTime && activity !== activitiesInput[i]) {
      activitiesInput[i].disabled = true
      activityDescription[i].style.textDecoration = 'line-through'
      if (activity.checked) {
        activitiesInput[i].disabled = true
      } else {
        activitiesInput[i].disabled = false
        activityDescription[i].style.textDecoration = ''
      }
    }
  }
  if (activity.checked) {
    price.style.display = ''
    price.textContent = `Total: $${total = total + parseInt(activityCost)}`
  } else {
    price.textContent = `Total: $${total = total - parseInt(activityCost)}`
  }
  if (total === 0) {
    price.style.display = 'none'
  }
})

/** Payment Section */
const payment = document.querySelectorAll('#payment option')
const creditcard = document.querySelector('#credit-card')
const paypal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')
payment[0].disabled = true
payment[1].selected = true
paypal.hidden = true
bitcoin.hidden = true

document.querySelector('#payment').addEventListener('change', () => {
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
ccNum.placeholder = '0000 0000 0000 0000'
ccZip.placeholder = '00000'
ccCVV.placeholder = '000'

/**
 * nameValidator looks to make sure a name of any kind has been entered into the name field
 * otherwise it will create a placeholder message and create a red border
 */
const nameValidator = () => {
  let validName = false
  const nameValue = name.value
  if (nameValue !== '' || nameValue === null) {
    validName = true
  }

  if (validName) {
    name.style.borderColor = '#2a9d8f'
    document.querySelector('[for=name').textContent = 'Nice to meet you,'
    return true
  } else {
    name.style.borderColor = '#e76f51'
    document.querySelector('[for=name').textContent = 'Name: Username must have at least 1 character'
    return false
  }
}

/**
 * emailValidator looks to make sure an email has been entered
 * otherwise it will create a placeholder message and create a red border
 * the regular expression has been adapted from https://www.regular-expressions.info/email.html
 */
const emailValidator = () => {
  let validEmail = false
  const emailValue = email.value
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
  if (emailValue !== '' && emailRegex.test(emailValue)) {
    validEmail = true
  } else if (emailValue === '' || emailValue == null) {
    document.querySelector('[for=mail').textContent = 'Please type your email'
    return false
  }

  if (validEmail) {
    document.querySelector('[for=mail').textContent = 'Valid email'
    email.style.borderColor = '#2a9d8f'
    return true
  } else {
    document.querySelector('[for=mail').textContent = 'This email is invalid'
    email.style.borderColor = '#e76f51'
  }
}

const noSelectionMessage = document.createElement('div')
noSelectionMessage.textContent = 'please select at least one activity'
noSelectionMessage.style.fontStyle = 'bold'
noSelectionMessage.style.fontSize = '16px'
noSelectionMessage.style.color = '#e76f51'
noSelectionMessage.hidden = true
activities.appendChild(noSelectionMessage)

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
    activitiesLegend.style.color = '#e76f51'
    noSelectionMessage.hidden = false
    return false
  }
}

const creditCardValidator = () => {
  const ccNumValue = ccNum.value
  const validNum = /^\d{13,16}$/
  if (validNum.test(ccNumValue)) {
    ccNum.style.borderColor = '#2a9d8f'
    return true
  } else {
    ccNum.style.borderColor = '#e76f51'
    ccNum.placeholder = 'please enter your credit card number'
    return false
  }
}

const cvvValidator = () => {
  const CVVvalue = ccCVV.value
  const validCVV = /^\d{3}$/
  if (validCVV.test(CVVvalue)) {
    ccCVV.style.borderColor = '#2a9d8f'
    return true
  } else {
    ccCVV.style.borderColor = '#e76f51'
    return false
  }
}

const zipValidator = () => {
  const ccZipValue = ccZip.value
  const validZip = /^\d{5}$/
  if (validZip.test(ccZipValue)) {
    ccZip.style.borderColor = '#2a9d8f'
    return true
  } else {
    ccZip.style.borderColor = '#e76f51'
    return false
  }
}

name.addEventListener('keyup', nameValidator)
email.addEventListener('keyup', emailValidator)
ccNum.addEventListener('keyup', creditCardValidator)
ccCVV.addEventListener('keyup', cvvValidator)
ccZip.addEventListener('keyup', zipValidator)
activities.addEventListener('change', activitiesValidator)

form.addEventListener('submit', e => {
  if (!nameValidator()) {
    e.preventDefault()
  }
  if (!emailValidator()) {
    e.preventDefault()
  }
  if (!activitiesValidator()) {
    e.preventDefault()
  }
  if (payment[1].selected) {
    creditCardValidator()
    cvvValidator()
    zipValidator()
    if (!creditCardValidator() || !cvvValidator() || !zipValidator()) {
      e.preventDefault()
    }
  }
})
