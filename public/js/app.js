NodeList.prototype.forEach = Array.prototype.forEach;
const form = document.getElementById('form');

const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData;
    form.querySelectorAll('input').forEach((el) => {
        formData.append(el.name, el.value);
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/admin', true);
    xhr.onload = (event) => {
        if (event.currentTarget.status === 200) {
            const response = event.currentTarget.response;
            console.log(response);
        }
    };
    xhr.send(formData);

// xhr json https://learn.javascript.ru/xhr-forms
//     var xhr = new XMLHttpRequest();
//
//     var json = JSON.stringify({
//         name: "Виктор",
//         surname: "Цой"
//     });
//
//     xhr.open("POST", '/admin', true)
//     xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//
//     xhr.onload = (event) => {
//         if (event.currentTarget.status === 200) {
//             const response = event.currentTarget.response;
//             console.log(response);
//         }
//     };
//     xhr.send(json);

// Отсылаем объект в формате JSON и с Content-Type application/json
// Сервер должен уметь такой Content-Type принимать и раскодировать
    xhr.send(json);

    // xhr multipart/form-data  https://learn.javascript.ru/xhr-forms
//     var data = {
//         name: 'Виктор',
//         surname: 'Цой'
//     };
//
//     var boundary = String(Math.random()).slice(2);
//     var boundaryMiddle = '--' + boundary + '\r\n';
//     var boundaryLast = '--' + boundary + '--\r\n'
//
//     var body = ['\r\n'];
//     for (var key in data) {
//         // добавление поля
//         body.push('Content-Disposition: form-data; name="' + key + '"\r\n\r\n' + data[key] + '\r\n');
//     }
//
//     body = body.join(boundaryMiddle) + boundaryLast;
//
// // Тело запроса готово, отправляем
//
//     var xhr = new XMLHttpRequest();
//     xhr.open('POST', '/admin', true);
//
//     xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
//
//     xhr.onreadystatechange = function () {
//         if (this.readyState != 4) return;
//
//         alert(this.responseText);
//     };
//
//     xhr.send(body);


    // post xhr string
    // const formData = {};
    // form.querySelectorAll('input').forEach((el) => {
    //     formData[el.name] = el.value;
    // });
    //
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', '/admin', true);
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xhr.onload = (event) => {
    //     if (event.currentTarget.status === 200) {
    //         const response = event.currentTarget.response;
    //         console.log(response);
    //     }
    // };
    //
    // xhr.send(`name=${formData.name}&email=${formData.email}`);

    // jquery
    // $.ajax({
    //     type: 'POST',
    //     url: '/admin',
    //     // The key needs to match your method's input parameter (case-sensitive).
    //     data: JSON.stringify({ asd: 'aaa' }),
    //     contentType: 'application/json; charset=utf-8',
    //     dataType: 'json',
    //     success: (data) => {
    //         console.log(data);
    //     }
    // });
};
form.addEventListener('submit', submitForm);
