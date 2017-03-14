$(document).ready(() => {
    console.log('script loaded');

// creating a new beer
$('.new-beer-form').on('submit', (e) =>{
  e.preventDefault();
  const beerName = $('.beer-input').val();
  // console.log(beerName);
  $.ajax({
    url: `/api/beers/fetchBeer/${beerName}`,
    method: 'GET',
    success: (response) =>{
      // console.log(response);
      // // console.log(response);
      response.forEach((response) =>{
        $('.error').remove();
        handleResponse(response);
      });

    }, error: (err) =>{
      // alert("Could not find beer. Try another one.");
      noBeer();
      console.log(err);
    }
  });
});

const noBeer = function () {
  $('.error').remove();
  $('.beer-div').remove();
  const error = $('<p class = "error">'+ "Beer could not be found. Try again." + '</p>');
  error.css('color', 'red');
  $('.search').append(error);
};

//adding a new beer to a div when search is clicked
   const handleResponse = function(response){
    const newName = response.name;
    const imagePath = response.labels.medium;
    const newAbv = response.abv;
    const newStyle = response.style.name;
    const newBrewery = response.breweries[0].name;
    const newId = response.id;
    appendBeer(newName, imagePath, newAbv, newStyle, newBrewery);
  };

  // appending the information from API fetch call to the page so we can see it
  const appendBeer = function(newName, imagePath, newAbv, newStyle, newBrewery){
    $('.beer-div').remove();
    $('.error').remove();
    const newBeerDiv = $('<div class="beer-div">');
    const header = $('<h1>'+ newName + '</h1>');
    const picture = $('<img>');
    picture.attr('src', imagePath);
    picture.addClass('label');
    const bAbv = $('<p class = "abv">' + newAbv + '</p>');
    const bStyle = $('<p class = "style">' + newStyle + '</p>');
    const bBrewery = $('<p class = "brewery">' + newBrewery + '</p>');
    newBeerDiv.append(header);
    newBeerDiv.append(picture);
    newBeerDiv.append(bAbv);
    newBeerDiv.append(bStyle);
    newBeerDiv.append(bBrewery);
    const $addButton = $('<button class="add-button"> Add New Beer </button>').click(() => {
    // console.log('hit');

  // select the values on the page to add into our html views
      let name = $('h1').text(),
          labels_medium = $('img.label').attr('src'),
          abv = parseInt($('p.abv').text()),
          style_name = $('p.style').text(),
          breweries_name = $('p.brewery').text();


      // get those values
      // put them in object
      const addBeer = {
        name: name,
        labels_medium: labels_medium,
        abv: abv,
        style_name : style_name,
        breweries_name : breweries_name,

      };
      // adding the beer to the database
      console.log(addBeer);
     $.ajax({
        url: `/api/beers/beers/`,
        method: 'POST',
        data: addBeer,
        success: (response) =>{
          // console.log(response);
          window.location.replace('/beers');
        }, error: (err) =>{
          console.log(err);
        }
      });
 });
    // appends the add button to the body when the information is pulled
    const bId = $()
    $(newBeerDiv).append($addButton);
    $('body').append(newBeerDiv);
  };

// editing a beer
$('.edit-beer-form').on('submit', e => {
  // prevents page from reloading when submitting the form
  e.preventDefault();
  // .val grabs the value out of the element
  const name = $('.beer-name-input').val(),
        abv = $('.beer-abv-input').val(),
        labels_medium = $('.beer-image-input').val(),
        style_name = $('.beer-style-input').val(),
        id = $('.beer-id-input').val(),
        breweries_name = $('.beer-brewery-input').val();

   const newBeerData = {
    name:name,
    abv:abv,
    labels_medium:labels_medium,
    id:id,
    style_name:style_name,
    breweries_name:breweries_name
  };
console.log(newBeerData);

 $.ajax({
    url: '/api/beers/beers/' + id,
    type: 'PUT',
    // this will be the req.body
    data: newBeerData,
    success: response =>{
      // console.log(response);
      // will send us to the pokemon id page
      window.location.replace('/beers/' + response.id);
    }, error: msg => {
      console.log(msg);
    }

  });

});

// deleting a beer
 $('.delete-beer').click(function () {
        id = $('.beer-id').attr('data-id')
        if (confirm('Are you sure you want to delete this beer?')) {
            $.ajax({
                url: '/api/beers/beers/' + id ,
                  type: 'DELETE'
                , success: function (data) {
                  // console.log(data);
                    window.location.replace('/beers/');
                }
                , error: function (error) {
                    console.log('error! ', error);
                }
            });
        };
    });

















}); // ends document.ready
