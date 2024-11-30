const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const path = require('path')

const app = express()

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { summary: 'none' })
})

app.post('/summarize', async (req, res) => {
    const inputText = req.body.inputText

    try {
        const answer = await axios.post(
            "https://api-inference.huggingface.co/models/slauw87/bart_summarisation",
            { inputs: inputText },
            { headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` } }
        )
        console.log('API Response:', answer.data);
        const summaryText = answer.data[0]?.summary_text || 'Summary not available';
        res.render('home', { summary: summaryText })
    } catch (error) {
        res.render('home', { summary: 'error generating summary' })
    }
})




module.exports = app
// app.listen(3000, () => {
//     console.log('Server is activated')
// })