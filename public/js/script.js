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
      console.log(response);
      // // console.log(response);
      response.forEach((response) =>{
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
    const newStyle = response.style.name;
    const newBrewery = response.breweries[0].name;
    const newId = response.id;
    appendBeer(newName, imagePath, newAbv, newStyle, newBrewery);
  };

  const appendBeer = function(newName, imagePath, newAbv, newStyle, newBrewery){
    $('.beer-div').remove();
    const newBeerDiv = $('<div class="beer-div">');
    const header = $('<h5>'+ newName + '</h5>');
    const picture = $('<img>');
    picture.attr('src', imagePath);
    const bAbv = $('<p class = "abv">' + newAbv + '</p>');
    const bStyle = $('<p class = "style">' + newStyle + '</p>');
    const bBrewery = $('<p class = "brewery">' + newBrewery + '</p>');
    newBeerDiv.append(header);
    newBeerDiv.append(picture);
    newBeerDiv.append(bAbv);
    newBeerDiv.append(bStyle);
    newBeerDiv.append(bBrewery);
    const $addButton = $('<button class="add-button"> Add New Beer </button>').click(() => {
    console.log('hit');

  // select stuff
      let name = $('h5').text(),
          labels_medium = $('img').attr('src'),
          abv = parseInt($('p.abv').text()),
          style_name = $('p.style').text(),
          breweries_name = $('p.brewery').text();


      // get those values
      // put them in obj
      const addBeer = {
        name: name,
        labels_medium: labels_medium,
        abv: abv,
        style_name : style_name,
        breweries_name : breweries_name,
      };

      console.log(addBeer);
     $.ajax({
        url: `/api/beers/beers/`,
        method: 'POST',
        data: addBeer,
        success: (response) =>{
          console.log('bitches')
          console.log(response);
          window.location.replace('/beers');
        }, error: (err) =>{
          console.log(err);
        }
      });
 });

    const bId = $()
    $(newBeerDiv).append($addButton);
    $('body').append(newBeerDiv);
  };

// editing a beer
$('.edit-beer-form').on('submit', e => {
  // prevents page from reloading when submitting the form
  e.preventDefault();
  // .val grabs the value out of the element
  const editName = $('.beer-name-input').val(),
        editAbv = $('.beer-abv-input').val(),
        editStyleName = $('.beer-style-input').val(),
        editId = $('.beer-id-input').val(),
        editBrewery = $('.beer-brewery-input').val();

   const newBeerData = {
    editName:editName,
    editAbv:editAbv,
    editId:editId,
    editStyleName:editStyleName,
    editBrewery:editBrewery
  };
console.log(newBeerData);
 $.ajax({
    url: 'api/beers/' + editId,
    type: 'PUT',
    // this will be the req.body
    data: newBeerData,
    success: response =>{
      console.log(response);
      // will send us to the pokemon id page
      window.location.replace('/beers/' + response.editId);
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
                url: '/beers/' + id,
                  type: 'DELETE'
                , success: function (data) {
                  console.log(data);
                    window.location.replace('/beers');
                }
                , error: function (error) {
                    console.log('error! ', error);
                }
            });
        };
    });

// $('body').on('click', '.add-button', () => {
//         const beer = $('.beer-text').text();
//         console.log('hit');
//         $.ajax({
//             url: '/',
//             type: 'POST',
//             data: {
//                 text: beer
//             },
//             success: (res) => {
//                 console.log(res);
//                 window.location.replace('/beers/' + res.id);
//             },
//             error: (err) => {
//                 console.log(err);
//             }
//         });
//     });

// addBeer = (data) =>{
//   $('.beer-div').remove();
//         const $beerDiv = $('<div class="beer-div">');
//         const $beer = $('<p class="beer-text">');
//         $beer.text(data);
//         $beerDiv.append($beer);
//         $('body').append($beerDiv);
// };


// $('body').on('click', '.add-button', () => {
//   console.log('hit');

//   // select stuff
//   let name = $('h5').val(),
//       id = $('body').attr('data-id'),
//       image = $('img').val(),
//       abv = $('p.abv').val(),
//       ibu = $('p.ibu').val(),
//       styleName = $('p.style').val(),
//       breweryName = $('p.brewery').val();

//   // get those values
//   // put them in obj
//   const addBeer = {
//     id: id,
//     name: name,
//     image: image,
//     abv: abv,
//     ibu : ibu,
//     styleName : styleName,
//     breweryName : breweryName,
//   };
//   // select the data you need nd make obj
//  $.ajax({
//     url: `/api/beers/beers`,
//     method: 'POST',
//     data: JSON.stringify(addBeer),
//     success: (response) =>{
//       console.log('bitches')
//       console.log(response);
//       window.location.replace('/beers');
//     }, error: (err) =>{
//       console.log(err);
//     }
//   });
//  });




















}); // ends document.ready
