//массив, куда будут добавляться все созданные карточки
let flashcardArray = [];

// если массив заполнен и мы можем получить из локального хранилища начение по ключу items,
if (localStorage.getItem('card')) {

    //тогда декодируем его из JSON формата в обычный
    JSON.parse(localStorage.getItem('card'))
} // иначе, если массив пустой, оставляем его просто пустым массивом





//показали окно добавления card
const createCards = document.getElementById('createCard');
function addCard() {
    createCards.style.visibility = "visible";
    createCards.className = "activeCreateCard"
}

//закрыли окно добавления card
function closeCard() {
    createCards.style.visibility = "hidden";
}

//поработали с удалением общим на иконке в header
document.getElementById('deleteCard').addEventListener('click', () => {
    //весь div в который будут создаваться новые карточки зачищаем
    const flashcardsAll = document.getElementById("fleshcards");
    flashcardsAll.innerHTML = '';
    //закрываем сразу первое окно добавления
    closeCard();

    //зачищаем наш массив с объектами введенных значений
    flashcardArray = [];

    //зачищаем локальное хранилище
    localStorage.clear();

})





//1111111111111111111111111111111111111111111
//достали кнопку save из окна добавления и добавили клик на фун-ю addFlashcard
document.getElementById("saveCard").addEventListener("click", () => {
    addFlashcard();
});






//333333333333333333333333333333333333
//создаем фун-ю, для стиполизации и добавления в HTML новой карты, которую мы запускаем в фунции ниже в конце
//передаем в нее vaLue значения, которые пользователь будет вводить в question и answer
//передаем в нее index (индекс объекта) номер по счету введнной карточки, чтобы при каждом создании новой карточки, с помощью замыкания, функция передавала в др. функцию значение индивидуального индекса
// по которому можно будет понять, что нужно удалить именно ту карточку, на которую мы кликаем,
// у каждой вновь созданной карточки будет передаваться свой индекс индивидуальной, кот она будет помнить при попытке удалении ее
//этот процесс, когда "одна функция внутри другой помнит индивуальные значения (лексическое окружение)" связан с замыканием
//проще: благодаря замыканию мы кликаем на минус карточки и удаляется именно эта карточка, а не та, которая была создана последней
function flashcardShow(value, index) {
    // создали див, в котором будет находится созраненная карта
    const flashcardDiv = document.createElement('div');

    //добавили заголовок вопроса
    const questionNew = document.createElement('h2');

    //в поле вопроса мы закидываем то значение, которое пользователь ввел в значение ключа Объекта с вводимыми значениями в поля вопроса и ответа
                                  // //создали объект с этими значениями,которые пользователь введет
                                  // let flashcardObject = {
                                  //     'my_question' : question.value,
                                  //     'my_answer'  : answer.value
    questionNew.textContent = value.my_question;


    //добавили заголовок ответа
    const answerNew = document.createElement('h2');
    answerNew.textContent = value.my_answer;

    //аналогично как указано выше
    answerNew.textContent = value.my_answer;

    //добавили минус,который будет удалять эту созданную карту
    const del = document.createElement('i');

    //присвоили класс
    flashcardDiv.className = "newFlashCard";
    del.className = "fas fa-minus";

    //Добавляем атрибуты, стилизуем
    questionNew.setAttribute("style", "border-top:1px solid blue; padding: 15px; margin-top:30px");
    answerNew.setAttribute("style", "text-align:center; display:none; color:blue");

    //добавляем в html
    flashcardDiv.appendChild(questionNew);
    flashcardDiv.appendChild(answerNew);
    flashcardDiv.appendChild(del);
    document.querySelector("#fleshcards").appendChild(flashcardDiv);

    //при нажатии на минус
    del.addEventListener('click', () => {
        //удаляем элемент из массива по индексу index (именно тот элемент массива (объект), на котором мы находимся в количестве 1(одного))
        flashcardArray.splice(index, 1);

        //сохраняем наше обновленное локальное хранилище, и преобразуем наше стрковое значение в формат JSON Для правильного хранения и преобразования
        localStorage.setItem('card', JSON.stringify(localStorage));

        //удаляем даннуую карточчку
        flashcardDiv.remove()

    })

    // при нажатии на новую, созданную карточку
    flashcardDiv.addEventListener("click", () => {
        // для того, чтобы при нажатии на карточку, показывал значение ответа
        //если дисплэй none (закрыт), то изменить на block (открыть), иначе изменить на none (закрыть)
        answerNew.style.display = answerNew.style.display === "none" ? 'block' : 'none'
    })

}






//2222222222222222222222222222222222
// эта фун-я выполнится сразу после кнопки save и сохранит внутри себя объект с введенными значениями
// и потом в конце запустится фун-я, передаем которая стилизует и добавит в html карту со значениями из этой функции
// та фун-я выше для стилизации и добавления в HTML будет помнить введеенные значения из этой фунции, ЭТО И ЕСТЬ ПРИНЦИП ЗАМЫКАНИЯ
function addFlashcard() {
    //доставли поля textarea
    const question = document.getElementById("questions");
    const answer = document.getElementById("answer");

    //создали объект с этими значениями,которые пользователь введет
    let flashcardObject = {
        //наименование ключей придумали сами: значения из полей ввода
        'my_question' : question.value,
        'my_answer'  : answer.value
    }

    //Добавили инф-ю о карте в массив
    flashcardArray.push(flashcardObject);

    //сохранили наш массив с флешкартой в локалльное хранилище с ключем card и значением преобразованным массивом в JSON файл
    //в значении по ключу card сейчас будет лежать объект с нашей картойчкой в виде [{"my_question":"введенное в поле вопроса","my_answer":"введенное в поле ответа"}]
    localStorage.setItem('card', JSON.stringify(flashcardArray));


    // в фун-ю, которая в себе включает стилизацию и добавление новой карточки + сохраняет отдельные значения введенной информации в виде объекта
    //если посмотреть на flashcard: {my_question: 'dd', my_answer: 'dd'}
                                  //{my_question: 'ff', my_answer: 'ff'}
                                  // {my_question: 'gg', my_answer: 'gg'}
    //пожтому мы вызываем фун-ю с добавлением новой карточки и передаем туда только последний введенный объект и только последний индекс
    flashcardShow(flashcardArray[flashcardArray.length - 1], flashcardArray.length - 1);

    // после зачищаем поля, чтобы вводить новые
    question.value = "";
    answer.value = "";

}

//метод фор ич выполнит функцию flashcardShow ко всем элементам массива flashcardArray
//а все элементы массива, это и есть объекты наших введенных карточек
flashcardArray.forEach(flashcardShow);
