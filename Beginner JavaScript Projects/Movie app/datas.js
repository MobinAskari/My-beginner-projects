// https://www.omdbapi.com/?i=tt3896198&apikey=
// https://www.omdbapi.com/?t=breaking&apikey=

const datas = {
  movies: [
    {
      "Title": "Guardians of the Galaxy Vol. 2",
      "Year": "2017",
      "Rated": "PG-13",
      "Released": "05 May 2017",
      "Runtime": "136 min",
      "Genre": "Action, Adventure, Comedy",
      "Director": "James Gunn",
      "Writer": "James Gunn, Dan Abnett, Andy Lanning",
      "Actors": "Chris Pratt, Zoe Saldana, Dave Bautista",
      "Plot": "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
      "Language": "English",
      "Country": "United States",
      "Awards": "Nominated for 1 Oscar. 15 wins & 60 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "7.6/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "85%"
        },
        {
          "Source": "Metacritic",
          "Value": "67/100"
        }
      ],
      "Metascore": "67",
      "imdbRating": "7.6",
      "imdbVotes": "719,971",
      "imdbID": "tt3896198",
      "Type": "movie",
      "DVD": "22 Aug 2017",
      "BoxOffice": "$389,813,101",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True",
      "xp": "20"
    },
    {
      "Title": "Breaking",
      "Year": "2022",
      "Rated": "PG-13",
      "Released": "26 Aug 2022",
      "Runtime": "103 min",
      "Genre": "Crime, Drama, Thriller",
      "Director": "Abi Damaris Corbin",
      "Writer": "Abi Damaris Corbin, Kwame Kwei-Armah",
      "Actors": "John Boyega, Nicole Beharie, Selenis Leyva",
      "Plot": "A Marine war veteran faces mental and emotional challenges when he tries to reintegrate into civilian life.",
      "Language": "English",
      "Country": "United States",
      "Awards": "5 wins & 5 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYmRkNWJkNTktMzZmMi00NTg1LWJmYjUtZTQ0ZjMzNmRiMGFhXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "6.2/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "81%"
        },
        {
          "Source": "Metacritic",
          "Value": "66/100"
        }
      ],
      "Metascore": "66",
      "imdbRating": "6.2",
      "imdbVotes": "6,031",
      "imdbID": "tt12311620",
      "Type": "movie",
      "DVD": "N/A",
      "BoxOffice": "$2,806,359",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
    },
    {
      "Title": "1917",
      "Year": "2019",
      "Rated": "R",
      "Released": "10 Jan 2020",
      "Runtime": "119 min",
      "Genre": "Action, Drama, War",
      "Director": "Sam Mendes",
      "Writer": "Sam Mendes, Krysty Wilson-Cairns",
      "Actors": "Dean-Charles Chapman, George MacKay, Daniel Mays",
      "Plot": "April 6th, 1917. As an infantry battalion assembles to wage war deep in enemy territory, two soldiers are assigned to race against time and deliver a message that will stop 1,600 men from walking straight into a deadly trap.",
      "Language": "English, French, German",
      "Country": "United Kingdom, United States, India, Spain",
      "Awards": "Won 3 Oscars. 135 wins & 206 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTdmNTFjNDEtNzg0My00ZjkxLTg1ZDAtZTdkMDc2ZmFiNWQ1XkEyXkFqcGdeQXVyNTAzNzgwNTg@._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "8.2/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "88%"
        },
        {
          "Source": "Metacritic",
          "Value": "78/100"
        }
      ],
      "Metascore": "78",
      "imdbRating": "8.2",
      "imdbVotes": "621,446",
      "imdbID": "tt8579674",
      "Type": "movie",
      "DVD": "25 Dec 2019",
      "BoxOffice": "$159,227,644",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
    },
    {
      "Title": "Sicario",
      "Year": "2015",
      "Rated": "R",
      "Released": "02 Oct 2015",
      "Runtime": "121 min",
      "Genre": "Action, Crime, Drama",
      "Director": "Denis Villeneuve",
      "Writer": "Taylor Sheridan",
      "Actors": "Emily Blunt, Josh Brolin, Benicio Del Toro",
      "Plot": "An idealistic FBI agent is enlisted by a government task force to aid in the escalating war against drugs at the border area between the U.S. and Mexico.",
      "Language": "English, Spanish, Ukrainian",
      "Country": "United States, Mexico, Hong Kong",
      "Awards": "Nominated for 3 Oscars. 15 wins & 157 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjA5NjM3NTk1M15BMl5BanBnXkFtZTgwMzg1MzU2NjE@._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "7.6/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "92%"
        },
        {
          "Source": "Metacritic",
          "Value": "82/100"
        }
      ],
      "Metascore": "82",
      "imdbRating": "7.6",
      "imdbVotes": "447,835",
      "imdbID": "tt3397884",
      "Type": "movie",
      "DVD": "05 Jan 2016",
      "BoxOffice": "$46,889,293",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
    },
    {
      "Title": "Cinderella",
      "Year": "2015",
      "Rated": "PG",
      "Released": "13 Mar 2015",
      "Runtime": "105 min",
      "Genre": "Adventure, Drama, Family",
      "Director": "Kenneth Branagh",
      "Writer": "Chris Weitz, Charles Perrault",
      "Actors": "Lily James, Cate Blanchett, Richard Madden",
      "Plot": "When her father unexpectedly dies, young Ella finds herself at the mercy of her cruel stepmother and her scheming stepsisters. Never one to give up hope, Ella's fortunes begin to change after meeting a dashing stranger.",
      "Language": "English",
      "Country": "United Kingdom, United States",
      "Awards": "Nominated for 1 Oscar. 9 wins & 38 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxODYyODEzN15BMl5BanBnXkFtZTgwMDk4OTU0MzE@._V1_SX300.jpg",
      "Ratings": [
        {
          "Source": "Internet Movie Database",
          "Value": "6.9/10"
        },
        {
          "Source": "Rotten Tomatoes",
          "Value": "83%"
        },
        {
          "Source": "Metacritic",
          "Value": "67/100"
        }
      ],
      "Metascore": "67",
      "imdbRating": "6.9",
      "imdbVotes": "183,506",
      "imdbID": "tt1661199",
      "Type": "movie",
      "DVD": "15 Sep 2015",
      "BoxOffice": "$201,151,353",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
    },
  ],
}

export default datas;