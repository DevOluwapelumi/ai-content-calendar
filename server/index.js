import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import openaiRoutes from './routes/openaiRoutes.js'; // Note the `.js` extension
import sheetsRoutes from './routes/sheetsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/generate', openaiRoutes);
app.use('/api/sheets', sheetsRoutes);

app.get('/', (req, res) => {
  res.send('AI Content Calendar API running');
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callOpenAI() {
  try {
    const response = await openai.createChatCompletion({ /* ... */ });
    console.log(response.data);
  } catch (err) {
    if (err.response?.status === 429) {
      console.warn("Rate limited, retrying in 5 seconds...");
      await sleep(5000);
      return callOpenAI();
    } else {
      throw err;
    }
  }
}


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

