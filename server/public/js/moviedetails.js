var movieObj;
// getMovie method for search movie in api
// ajax request is made for search
function getMovie() {
    console.log('getMovie');
    $.ajax({
        url: '/search',
        type: 'GET',
        data: {
            name: document.getElementById('movie').value
        },
        error: function() {
            $('#result').html('<p>Error occured</p>');
        },
        success: function(data) {
            console.log('success');
            // resultdata data is got by parsing res
            var result_data = $.parseJSON(data);
            var length = result_data.total_results;
            // the result data is viewing in table format
            var tableHtml = '';
            tableHtml += '<tr>';
            tableHtml += '<th>Title</th>';
            tableHtml += '<th>Poster</th>';
            tableHtml += '<th>Release Date</th>';
            tableHtml += '<th>Action</th>';
            for (var i = 0; i < length; i++) {

                let posterPath = 'http://image.tmdb.org/t/p/w185/' + result_data.results[i].poster_path;
                console.log(result_data.results[i].title);
                var newObj = {
                    Title: result_data.results[i].title,
                    Poster: posterPath,
                    Release_Date: result_data.results[i].release_date
                };
                movieObj = JSON.stringify(newObj);
                var parseobj = JSON.parse(movieObj);
                tableHtml += '<tr>';
                tableHtml += '<td>' + result_data.results[i].title + '</td>';
                tableHtml += '<td><img src=' + posterPath + '></td>';
                tableHtml += '<td>' + result_data.results[i].release_date + '</td>';
                tableHtml += "<td><button onclick='addFavourite(event)'  class='btn btn-success' id='addbtn' value='" + movieObj + "'>Add</button></td></tr>";
                tableHtml += '</tr>';
            }
            //the tableHTMl is passed in to an result id

            $('#result tbody').html(tableHtml);
            console.log(movieObj);
        }

    });
}
// addFavourite method is invoke by clicking add button
// ajax req for add method 
function addFavourite(event) {
    console.log('addFav');
    $.ajax({
        url: '/addFav',
        type: 'POST',
        data: {value:event.target.value,
        username: localStorage.getItem("username")},
        error: function(err) {
            alert("Error");
        },
        success: function(data) {
            // favourite movie is added in to db
            if (data.code === 11000) {
                alert("movie already added to the list");
            } else {
                alert("movie added");
            }
        }
    });
}

// favMovie method is invoked by clicking favourite method
// ajax req for viewFav method in router
function favMovie() {
    $.ajax({
        url: '/viewFav',
        type: 'GET',
        data :{username : localStorage.getItem("username")},
        success: function(data) {
            // favourite movies are viewed in tabular format
            var viewHTML = '';
            viewHTML += '<tr><td>Title</td><td>Poster</td><td>Release_Date</td><td>Action</td></tr>';
            for (var i in data) {
                var delValue = data[i].Title;
                viewHTML += 'tr';
                viewHTML += '<td>' + data[i].Title + '</td>';
                viewHTML += '<td><img src=' + data[i].Poster + '></td>';
                viewHTML += '<td>' + data[i].Release_Date + '</td>';
                viewHTML += '<td><button type="button" class="btn btn-warning" value=' + delValue + ' onclick="deleteMovie(event)">Delete</button></td>';
                viewHTML += '</tr>';

            }
            // viewHTML is passed in to result id
            $('#result tbody').html(viewHTML);
        }
    });
}

// delete method is invoke by clicking delete button in favourite
// ajax req for deleteFav method in router
function deleteMovie(event) {
    console.log(typeof event.target.value);
    $.ajax({
        url: '/deleteFav',
        type: 'GET',
        data: {Title:event.target.value,
         username : localStorage.getItem("username")},
        error: function(err) {
            alert("Error");
        },
        success: function(data) {
            alert('movie deleted');
        }
    });
}