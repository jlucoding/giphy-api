import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


$(document).ready(function() {
  $('#gifKeyword').click(function() {
    const keyword = $('#keyword').val();
    const limit = $('#limit').val();
    const limitInt = parseInt(limit);
    console.log(limitInt);
    $('#keyword').val("");
    $('#limit').val("");

    let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keyword}&limit=${limit}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response, limitInt);
      } else if (this.readyState === 4 && this.status === 404) {
        $('.showErrors').text(`Please enter another keyword.`);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response, limitInt) {
      let limitArray = [];
      let arrayIndex = limitArray.indexOf(limitInt);
      
      for (let i = 0; i <= limitInt; i++) {
        limitArray[i] = i;
      }
        console.log(limitArray);
      limitArray.forEach(function(arrayIndex) {
        let htmlIndex = (arrayIndex + 1);
        $('.showGif').append(`<a href=${response.data[arrayIndex].url} target="_blank">${keyword} ${htmlIndex} </a>`);
      });
    }
      // if (limitInt === 1) 
      // {
      //   $('.showGif').append(`<a href=${response.data[getIndex(limitInt)].url} target="_blank">${keyword} ${limit}</a>`);
      // } 
      // else if (limitInt > 1) 
      // {
      //   let limitArray = [];
      //   for (let i = 0; i <= limitInt; i++) {
      //     limitArray[i] = i;

      //   }
      //   console.log(limitArray);
      //   for (let i = 0; i < limitArray.length; i++) {
      //     let newIndex = limitArray[i];
      //     $('.showGif').append(`<a href=${response.data[getIndex(newIndex)].url} target="_blank">${keyword} ${newIndex} </a>`);
      //   }

        //create div with class for each data[i];
        //".showGif(limitInt)".html(`<a href=${response.data[getIndex(limitInt)].url} target="_blank">${keyword} ${limit}</a>`);
      // } else if (isNaN(limitInt)) {
      //   console.log('please put in a number!');
      // }

    // function getIndex(limitInt) {
    //   let index = (limitInt - 1);
    //   return index;
    // }
  });
});