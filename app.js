const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
//const hfInference = require('@huggingface/inference-api')
const app = express()

//write api key
//const hf = new hfInference('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')

const HUGGINGFACE_API_KEY = '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'

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home', { summary: 'none' })
})

// app.post('/summarize', async (req, res) => {
//     const inputText = req.body.inputText

//     try {
//         const result = await hf.summarization({
//             model: 't5-small',
//             inputs: inputText,
//             parameters: { max_length: 100 }
//         })
//         res.render('home', { summary: result.summary_text })
//     } catch (error) {
//         res.render('home', { summary: 'Error generating summary' })
//     }
// })


app.post('/summarize', async (req, res) => {
    const inputText = req.body.inputText

    try {
        const answer = await axios.post(
            "https://api-inference.huggingface.co/models/google-t5/t5-small",
            { inputs: inputText },
            { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
        )
        console.log('API Response:', answer.data);
        const summaryText = answer.data[0]?.translation_text || 'Summary not available';
        res.render('home', { summary: summaryText })
    } catch (error) {
        res.render('home', { summary: 'error generating summary' })
    }
})

app.listen(3000, () => {
    console.log('Server is activated')
})