import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#gifKeyword').click(function() {
    const keyword = $('#keyword').val();
    const limit = $('#pageLimit').val();
    $('#keyword').val("");
    $('#pageLimit').val("");

    let request = new XMLHttpRequest();
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${keyword}&limit=${limit}&offset=0&rating=g&lang=en`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      } else if (this.readyState === 4 && this.status === 404) {
        $('.showErrors').text(`Please enter another keyword.`)
      }
    }

    request.open("GET", url, true);
    request.send();

    function getElements(response) {
      $('.showGif').html(`<img `)
    }

  });
});