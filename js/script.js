const name = document.querySelector('#name') // selects name input field
name.focus() // when page loads, immediately ets focus to name input field

const jobRole = document.querySelector('#title') // selects job role menu
const otherInput = document.querySelector('#other-title') // selects text input for the other option
otherInput.style.display = 'none'

jobRole.addEventListener('change', e => { // listener on job role menu, listening for a change
  if (e.target.value === 'other') { // if the target of the change is equal to 'other'
    otherInput.style.display = '' // reveal the text input
  } else {
    otherInput.style.display = 'none' // otherwise, hide the text input
  }
})

const colorSelectElement = document.querySelector('#color') // selects color menu
const colorOptionElements = document.querySelectorAll('#color option') // selects all color options
const pleaseSelect = document.createElement('option') // create new option
pleaseSelect.text = 'Please select a theme' // adds text to new option
pleaseSelect.value = 'please' // sets value
colorSelectElement.appendChild(pleaseSelect) // adds please select to color options
colorSelectElement.insertBefore(pleaseSelect, colorSelectElement.firstElementChild) // makes please select at top of options list
pleaseSelect.selected = true // initially shows please select option on site load
pleaseSelect.hidden = true // makes please select not selectable/not in list

// function that will hide all the color options
const hideColorOptions = () => {
  for (let i = 0; i < colorOptionElements.length; i++) {
    colorOptionElements[i].hidden = true
  }
}
hideColorOptions() // call function to hide the colors

const designSelectElement = document.querySelector('#design') // selects design drop down
const designOptionsElements = document.querySelectorAll('#design option') // selects design options
designOptionsElements[0].hidden = true // makes "select theme" not selectable

// select a theme and show & reset corresponding tshirt designs
designSelectElement.addEventListener('change', e => {
  if (designOptionsElements[1].selected === true) {
    hideColorOptions()
    for (let i = 0; i < 3; i++) {
      colorOptionElements[i].hidden = false
      colorOptionElements[0].selected = true
    }
  } else if (designOptionsElements[2].selected === true) {
    hideColorOptions()
    for (let i = 3; i < 6; i++) {
      colorOptionElements[i].hidden = false
      colorOptionElements[3].selected = true
    }
  }
})

const activities = document.querySelector('.activities') // ref to activities fieldset
const checkboxes = document.querySelectorAll('.activities input') // get a reference to all the inputs
let total = 0 // total cost of activites checked
const price = document.createElement('h4') // create header for total $
price.textContent = `Total: ${total}`
price.style.display = ''
activities.appendChild(price)

// get a reference to the activities fieldset with eventlistener for changes & event
document.querySelector('.activities').addEventListener('change', e => {
  const clicked = e.target
  const clickedDayTime = clicked.getAttribute('data-day-and-time')
  const clickedCost = clicked.getAttribute('data-cost')
  for (let i = 0; i < checkboxes.length; i++) {
    const checkboxDayTime = checkboxes[i].getAttribute('data-day-and-time')
    if (clickedDayTime === checkboxDayTime && clicked !== checkboxes[i]) {
      checkboxes[i].disabled = true
      if (clicked.checked) {
        checkboxes[i].disabled = true
      } else {
        checkboxes[i].disabled = false
      }
    }
  }

  if (clicked.checked) {
    total = total + parseInt(clickedCost)
  } else {
    total = total - parseInt(clickedCost)
  }
  console.log(total)
})
