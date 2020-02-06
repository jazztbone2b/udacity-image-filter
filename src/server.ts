import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  app.get('/filteredimage/', async (req, res) => {
    const { image_url } = req.query;

    console.log(image_url);
    // no url is found
    if (!image_url) {
      res.status(400).send('Image url is required.')
      return;
    }

    // filter image from url
    const filteredImage = await filterImageFromURL(image_url);

    try {
      // send our filtered image to client
      await res.status(200).sendFile(filteredImage, (err) => {
        if (err) {
          // error occurred while trying to process image
          return res.status(500).send('Unable to process image.');
        }

        // delete any files stored
        deleteLocalFiles([filteredImage]);
      });
    } catch (err) {
      res.status(500).send('An unexpected error occurred.');
    }
  
  });
  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{https://photos.app.goo.gl/vCHPeFk97DcLtu5Q6}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();