const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('common')); // let's see what 'common' format looks like

app.get('/apps', (req, res) => {
        const { sort, genres } = req.query;
        let result = playstore;

        if (!sort && !genres) {
            return res
            .json(playstore);
        }

        if (sort && !genres) {
          if (!['Rating', 'App'].includes(sort)) {
            return res
              .status(400)
              .send('Sort must be one of rating or app');
          }
          
            result.sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
            return res
            .json(result);

        }

        if (!sort && genres) {
            if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
              return res
                .status(400)
                .send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
            }

            let results2 = result
            .filter(app =>
              app
                 .Genres
                 .toLowerCase()
                 .includes(genres.toLowerCase()));
            return res
                 .json(results2);
        }
  
        if (sort && genres) {
            if (!['Rating', 'App'].includes(sort)) {
                return res
                  .status(400)
                  .send('Sort must be one of rating or app');
              }
            if (!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
                return res
                  .status(400)
                  .send('Genres must be one of Action, Puzzle, Strategy, Casual, Arcade, Card');
              }
  

            let results2 = result
            .filter(app =>
              app
                 .Genres
                 .toLowerCase()
                 .includes(genres.toLowerCase()));
            results2.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
            return res
            .json(results2);
    
        }
});

module.exports = app;