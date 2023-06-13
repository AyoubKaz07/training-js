import * as dotenv from 'dotenv';

dotenv.config(); // load .env file

// import openai sdk
// hese classes are used to configure and interact with the OpenAI API.
import { Configuration, OpenAIApi } from 'openai';

/* set openai config */
const configuration = new Configuration({
  apiKey: process.env.OPENAI, // this was loaded from the .env file
});

const openai = new OpenAIApi(configuration);

import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/test', async (req, res) => {
  try {
    const prompt  = req.body.prompt ; // available from express.json middleware
  
    const AIresponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    })

    const image = AIresponse.data.data[0].url;

    res.send({ image });
  }
  catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message || 'You fucked up something');
  }
});

app.listen(8080, () => {console.log('listening on port 8080, http://localhost:8080/test')});
