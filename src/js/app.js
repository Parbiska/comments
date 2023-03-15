const form = document.forms[0]
const commentsContainer = document.getElementById('comments-container')
const errorContainer = document.getElementById('errorContainer')

form.onsubmit = (e) => {
	const area = form.elements.area
	const name = form.elements.name
	const isSetData = form.elements.checkbox.checked

	area.onclick = () => {
		errorContainer.innerHTML = ''
	}

	name.onclick = () => {
		errorContainer.innerHTML = ''
	}

	if (name.value.length < 2 || name.value.length > 16) {
		errorContainer.innerHTML =
			'Для отправку комментария введите в поле имени от 2 до 16 символов'
		name.focus()
		return false
	}

	if (area.value.length < 3 || area.value.length > 300) {
		errorContainer.innerHTML =
			'Для отправку комментария введите в поле комментария от 3 до 300 символов'
		area.focus()
		return false
	}

	const getCommentDate = (date) => {
		const day = date.getDate()
		let hours = date.getHours()
		let mins = date.getMinutes()

		hours = hours < 10 ? `0${hours}` : hours
		mins = mins < 10 ? `0${mins}` : mins

		const dateNow = new Date()

		if (day === dateNow.getDate()) return `Сегодня в ${hours}:${mins}`
		if (day === dateNow.getDate() - 1) return `Вчера в ${hours}:${mins}`

		return `${date.getFullYear()}/${
			date.getMonth() + 1
		}/${day} ${hours}:${mins}`
	}

	e.preventDefault()

	let date

	if (isSetData && form.elements.inputDate.value !== '') {
		console.log(form.elements.inputDate.value)
		date = new Date(form.elements.inputDate.valueAsNumber)
		date = getCommentDate(date)
	} else {
		date = new Date()
		date = getCommentDate(date)
	}

	commentsContainer.insertAdjacentHTML(
		'afterbegin',
		`
		<div class="comment">
			<div class="comment__name">${name.value}<span class="comment__date">${date}</span></div>
			
			<div class="comment__text">${area.value}</div>
			<div class="comment__actions">
				<div class="comment__action comment__like">
					<span></span>
					<img name="like" src="img/heart.svg" alt="Like">
				</div>
				<div class="comment__action comment__delete"><img name="delete" src="img/trash.svg" alt="delete"></div>
			</div>
        </div>
	`
	)

	document
		.querySelector('.comment__actions')
		.addEventListener('click', (e) => {
			switch (e.target.name) {
				case 'delete':
					e.target.closest('.comment').remove()
				case 'like':
					e.target.src = e.target.src.includes('img/heart.svg')
						? 'img/heart_red.svg'
						: 'img/heart.svg'
			}
		})

	errorContainer.innerHTML = ''
	name.value = ''
	area.value = ''
}

document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter' && !e.shiftKey) {
		form.elements.button.click()
	}
})

const inputDate = form.elements.inputDate

form.elements.checkbox.onclick = function () {
	const span = inputDate.previousElementSibling

	if (this.checked) {
		inputDate.hidden = false
		span.hidden = true
		return
	}
	inputDate.hidden = true
	span.hidden = false
}
