import express from 'express'
import fetch from 'node-fetch'
import axios from 'axios'
import { exec } from 'child_process';
// import path from 'path';

let app = global.app = express();

function connect(PORT) {

    const codePath = path.join(__dirname, 'views', 'generateCode');
    
app.get('/', (req, res) => res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://am1uth.netlify.app/threads.css">
<style>
  header,p,.input-box,.button {
    font-family: 'Ariel', sans-serif; 
    letter-spacing: 2px;
  }
  .input-box { color: #999; }
  .input-box::placeholder {
    font-size: 12px; 
    text-align: center;
    }
   p { 
   color: rgba(255,255,255,0.6);
    font-size: 10px;
  } 
</style>

  <title>WhatsApp bot</title>
</head>
<body>
  <div class="container">
    <header>
    	<p>Devoloped by amruth<p>
      <h1>Devil Eye MD</h1>
    </header>
    <div class="posts">
    	<p>Devil Eye is a simple WhatsApp bot to send messages via API endpoints. You can validate numbers on this API. This bot is under beta stage so you can face many bugs and errors, kindly please contact and give feedbacks to solve the issues.</p>
    	<input type="number" placeholder="Enter phone number here.. " class="input-box"
    	<br><br>
    	<button class="button">Get Code</button>
    </div>
    </div>
    <footer>
      <p>&copy; 2023 <a href="https://am1uth.
netlify.app/">Amruth</a></p>
    </footer>
    <script>
    	let btn = document.getElementsByClassName("button")[0];
    	let input = document.getElementsByClassName("input-box")[0];
    let data = document.getElementsByClassName("posts")[0];
    btn.addEventListener('click',() => {
    if(input.value.length !== 10 || input.value.match(/1-9/)) alert("Invalid number");
    fetch(${codePath})
    .then(res => {
       data.innerHTML = "<h2>"+res.data+"</h2>";
      });
    });
</script>
</body>
</html>`));

    //   app.get('/', (req, res) => {
    //     const indexPath = path.join(__dirname, 'views', 'index.html');
    //     res.sendFile(indexPath);
    // });

    app.get('/nowa', async (req, res) => {
        let q = req.query.number, regex = /x/g
        if (!q) return res.send('Input Parameter Number Parameter')
        if (!q.match(regex)) return res.send('Parameter Number Must Fill With One Letter "x"')
        let random = q.match(regex).length, total = Math.pow(10, random), array = []
        for (let i = 0; i < total; i++) {
            let list = [...i.toString().padStart(random, '0')]
            let result = q.replace(regex, () => list.shift()) + '@s.whatsapp.net'
            if (await conn.onWhatsApp(result).then(v => (v[0] || {}).exists)) {
                let info = await conn.fetchStatus(result).catch(_ => { })
                array.push({ jid: result, exists: true, ...info })
            } else {
                array.push({ jid: result, exists: false })
            }
        }
        res.json({ result: array })
    })

    app.get('/speedtest', (req, res) => {
        exec('speedtest', (error, stdout, stderr) => {
            if (error) {
                res.status(500).send(`<p>Speedtest failed</p><p>Error: ${error.message}</p>`);
                return;
            }

            const htmlResponse = `
              <h2>Speedtest Results</h2>
              <pre>${stdout}</pre>
          `;

            res.status(200).send(htmlResponse);
        });
    });

    app.get('/ping', (req, res) => {
        res.status(200).send('Ping successful');
    });

    app.get('/ping2', async (req, res) => {
        const pingResults = [];

        for (let i = 0; i < 10; i++) {
            try {
                const response = await axios.get(`http://dono-03.danbot.host:2346`);
                pingResults.push(`Ping result ${i + 1}: ${response.data} ${response.status}<br />`);
            } catch (error) {
                pingResults.push(`Error pinging ${i + 1}: ${error}`);
            }
        }
        res.status(200).send(pingResults.join('\n\n\n'));
    });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
    

    app.listen(PORT, () => {
        keepAlive();
        console.log('App listened on port', PORT)
    });
}

function keepAlive() {
    let url = `https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    let url2 = 'http://dono-03.danbot.host:2346'
    if (/(\/\/|\.)undefined\./.test(url)) return
    setInterval(() => {
        fetch(url).catch(console.log)
    }, 30 * 1000)
    if (/(\/\/|\.)undefined\./.test(url2)) return
    setInterval(() => {
        fetch(url).catch(console.log)
    }, 30 * 1000)
}

function formatDate(n, locale = 'id') {
    let d = new Date(n)
    return d.toLocaleDateString(locale, { timeZone: 'Asia/Jakarta' })
}

export default connect
