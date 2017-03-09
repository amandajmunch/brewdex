$(document).ready(() => {
    console.log('script loaded');


    //   $.ajax({
    //     url: '/api/fetchBeer',
    //     type: 'GET',
    //     success: (res) => {
    //         console.log(res);
    //     },
    //     error: (err) => {
    //         console.log(err);
    //     }
    // });

$('.edit-beer-form').on('submit', e => {
  // prevents page from reloading when submitting the form
  e.preventDefault();
  // .val grabs the value out of the element
  const editName = $('.beer-name-input').val(),
        editAbv = $('.beer-abv-input').val(),
        editIbu = $('.beer-ibu-input').val(),
        editStyleName = $('.beer-style-input').val(),
        editBrewery = $('.beer-brewery-input').val();

   const newBeerData = {
    editName,
    editAbv,
    editIbu,
    editStyleName,
    editBrewery
  };


 $.ajax({
    url: '/api/beers/',
    type: 'PUT',
    // this will be the req.body
    data: newBeerData,
    success: response =>{
      console.log(response);
      // will send us to the pokemon id page
      window.location.replace('/beers/' + response.id);
    }, error: msg => {
      console.log(msg);
    }

  });
});

// retrieving a beer from the BreweryDB database
$('.new-beer-form').on('submit', (e) =>{
  e.preventDefault();
  const beerName = $('.beer-input').val();
  // console.log(beerName);
  $.ajax({
    url: `/api/beers/fetchBeer/${beerName}`,
    method: 'GET',
    success: (response) =>{
      console.log(response);
      // // console.log(response);
      response.forEach((response) =>{
        console.log(response.name);
        console.log(response.abv);
        console.log(response.ibu);
        console.log(response.labels_medium);
        console.log(response.style_name);
        console.log(response.breweries_name);

        handleResponse(response);
      });

    }, error: (err) =>{
      console.log(err);
    }
  });
});





//adding a new beer to a div when search is clicked
   const handleResponse = function(response){
    const newName = response.name;
    const imagePath = response.labels.medium;
    const newAbv = response.abv;
    const newIbu = response.ibu;
    const newStyle = response.style.name;
    const newBrewery = response.breweries[0].name;
    appendBeer(newName, imagePath, newAbv, newIbu, newStyle, newBrewery);
  };

  const appendBeer = function(newName, imagePath, newAbv, newIbu, newStyle, newBrewery){
    $('.beer-div').remove();
    const newBeerDiv = $('<div class="beer-div">');
    const picture = $('<img>');
    picture.attr('src', imagePath);
    const header = $('<h5>'+ newName + '</h5>');
    const bAbv = $('<p>' + newAbv + '</p>');
    const bIbu = $('<p>' + newIbu + '</p>');
    const bStyle = $('<p>' + newStyle + '</p>');
    const bBrewery = $('<p>' + newBrewery + '</p>');
    newBeerDiv.append(header);
    newBeerDiv.append(picture);
    newBeerDiv.append(bAbv);
    newBeerDiv.append(bIbu);
    newBeerDiv.append(bStyle);
    newBeerDiv.append(bBrewery);
    const $addButton = $('<button class="add-button"> Add New Beer </button>');
    $('body').append($addButton);
    $('body').append(newBeerDiv);
  };


$('body').on('click', '.add-button', () => {
        const beer = $('.beer-text').text();
        console.log('hit');
        $.ajax({
            url: '/',
            type: 'POST',
            data: {
                text: beer
            },
            success: (res) => {
                console.log(res);
                window.location.replace('/beers/' + res.id);
            },
            error: (err) => {
                console.log(err);
            }
        });
    });























}); // ends document.ready
